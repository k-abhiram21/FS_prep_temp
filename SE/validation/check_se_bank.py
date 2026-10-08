#!/usr/bin/env python3
"""Check SE bank structure and execute traces in isolated temporary fixtures.

Uses the standard library, Git, Bash and a Java 17+ JDK.
Remote examples use temporary local bare repositories.
"""

from collections import Counter
from concurrent.futures import ThreadPoolExecutor
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import time
from urllib.parse import unquote, urlparse

SE = Path(__file__).resolve().parents[1]
BANK = SE / "FS_SE_Hard_MCQ_Bank.md"
FENCE = chr(96) * 3


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def parse_bank():
    md = BANK.read_text(encoding="utf-8")
    blocks = re.findall(
        r"^### SE(\d{3}) — ([^\n]+)\n(.*?)(?=^### SE\d{3}|\Z)",
        md, re.M | re.S,
    )
    require([int(n) for n, _, _ in blocks] == list(range(1, 121)),
            "Expected SE001–SE120 exactly once, in order.")
    require(md.count("<details>") == md.count("</details>") == 120,
            "Expected one closed answer disclosure per question.")
    answers = Counter()
    executable = []
    for n, title, block in blocks:
        label = "SE" + n
        require(block.count("<details>") == block.count("</details>") == 1,
                f"{label}: invalid disclosure.")
        before, hidden = block.split("<details>", 1)
        explanation, after = hidden.split("</details>", 1)
        options = re.findall(r"^([ABCD])\. (.*?)\s*$", before, re.M)
        require([letter for letter, _ in options] == list("ABCD"),
                f"{label}: expected exactly four choices.")
        require(len({text for _, text in options}) == 4,
                f"{label}: repeated choice.")
        correct = re.findall(r"^\*\*Correct: ([ABCD]) — (.+)\*\*$",
                             explanation, re.M)
        require(len(correct) == 1, f"{label}: expected one hidden answer.")
        letter, text = correct[0]
        require(dict(options)[letter] == text, f"{label}: answer/choice mismatch.")
        wrong = re.findall(r"^- \*\*([ABCD]):\*\* (.+)$", explanation, re.M)
        require(sorted(key for key, _ in wrong) == sorted(set("ABCD") - {letter}),
                f"{label}: each distractor needs its own explanation.")
        require("**Correct:" not in before + after, f"{label}: exposed answer.")
        require("**Rule/source:**" in explanation, f"{label}: missing source.")
        answers[letter] += 1
        metadata = re.findall(r"<!-- verify: (.+?) -->", explanation)
        code = re.findall(r"^" + FENCE + r"(java|bash)\n(.*?)\n" + FENCE,
                          before, re.M | re.S)
        require(len(code) == len(metadata) <= 1,
                f"{label}: code/verification metadata mismatch.")
        if metadata:
            spec = json.loads(metadata[0])
            require(spec["kind"] in {"git", "java"} and spec["exit"] == 0
                    and isinstance(spec["stdout"], str),
                    f"{label}: invalid verification specification.")
            language, source = code[0]
            require(language == {"git": "bash", "java": "java"}[spec["kind"]],
                    f"{label}: wrong code language.")
            executable.append((label, title, source, spec))
    require(answers == Counter(dict.fromkeys("ABCD", 30)),
            f"Answer positions are not balanced: {dict(answers)}")
    require(Counter(item[3]["kind"] for item in executable)
            == Counter(git=37, java=13), "Expected 37 Git and 13 Java traces.")

    practice = re.findall(r"^\| ([1-4]) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \| (.+) \|$",
                          md, re.M)
    require([row[0] for row in practice] == list("1234"), "Missing practice set.")
    covered = []
    for set_number, *columns in practice:
        ids = [int(n) for n in re.findall(r"\[SE(\d{3})\]\(#se\d{3}\)", columns[-1])]
        require(len(ids) == len(set(ids)) == 30, f"Set {set_number}: expected 30 unique IDs.")
        counts = [sum(start <= n <= end for n in ids)
                  for start, end in [(1, 24), (25, 54), (55, 80), (81, 120)]]
        require(counts == [int(x) for x in columns[:-1]], f"Set {set_number}: bad topic counts.")
        covered.extend(ids)
    require(sorted(covered) == list(range(1, 121)), "Sets must cover each question exactly once.")

    # Ignore code and metadata before checking Markdown links.
    prose = re.sub(r"^" + FENCE + r"[^\n]*\n.*?^" + FENCE + r"\s*$",
                   "", md, flags=re.M | re.S)
    prose = re.sub(r"<!--.*?-->", "", prose, flags=re.S)
    definitions = dict(re.findall(r"^\[([^\]]+)\]: (\S+)$", prose, re.M))
    references = re.findall(r"\[[^\]\n]+\]\[([^\]\n]+)\]", prose)
    require(all(key in definitions for key in references), "Undefined reference link.")
    anchors = set(re.findall(r'<a id="([^"]+)"></a>', md))
    for destination in list(definitions.values()) + re.findall(r"\[[^\]\n]+\]\(([^)]+)\)", prose):
        if destination.startswith("#"):
            require(destination[1:] in anchors, f"Broken anchor: {destination}")
        elif destination.startswith("https://"):
            require(bool(urlparse(destination).netloc), f"Malformed URL: {destination}")
        else:
            require((SE / unquote(destination.split("#")[0])).is_file(),
                    f"Missing local source: {destination}")
    return executable


def isolated_environment():
    env = {key: value for key, value in os.environ.items()
           if not key.startswith("GIT_")
           and key not in {"BASH_ENV", "ENV", "SHELLOPTS", "BASHOPTS",
                           "JAVA_TOOL_OPTIONS", "JDK_JAVA_OPTIONS", "_JAVA_OPTIONS"}}
    env.update(GIT_CONFIG_NOSYSTEM="1", GIT_CONFIG_GLOBAL="/dev/null",
               GIT_TERMINAL_PROMPT="0", GIT_EDITOR="true", GIT_TEMPLATE_DIR="",
               LC_ALL="C", TZ="UTC")
    return env


def run(command, cwd, env, timeout=15, check=False):
    result = subprocess.run(command, cwd=cwd, env=env, text=True,
                            capture_output=True, timeout=timeout)
    if check and result.returncode:
        raise RuntimeError(f"{command!r} failed: {result.stderr[:1500]}")
    return result


def configure(repo, env):
    settings = {"user.name": "FS", "user.email": "fs@example.invalid",
                "core.autocrlf": "false", "commit.gpgsign": "false",
                "tag.gpgsign": "false", "core.hooksPath": "/dev/null",
                "pull.rebase": "false"}
    for key, value in settings.items():
        run(["git", "config", "--local", key, value], repo, env, check=True)


def git_fixture(root, mode, env):
    require(mode in {"base", "remote"}, f"Unknown fixture: {mode}")
    repo = root / "work"
    repo.mkdir()
    run(["git", "init", "-q", "--initial-branch=main"], repo, env, check=True)
    configure(repo, env)
    (repo / "f.txt").write_text("A\n", encoding="utf-8")
    run(["git", "add", "f.txt"], repo, env, check=True)
    run(["git", "commit", "-qm", "base"], repo, env, check=True)
    if mode == "remote":
        server, peer = root / "server.git", root / "peer"
        run(["git", "init", "-q", "--bare", "--initial-branch=main", str(server)],
            root, env, check=True)
        run(["git", "remote", "add", "origin", str(server)], repo, env, check=True)
        run(["git", "push", "-qu", "origin", "main"], repo, env, check=True)
        run(["git", "clone", "-q", str(server), str(peer)], root, env, check=True)
        configure(peer, env)
        env.update(SE_REMOTE=str(server), SE_PEER=str(peer))
    return repo


def check_trace(item):
    label, title, source, spec = item
    env = isolated_environment()
    try:
        with tempfile.TemporaryDirectory(prefix=f"fs-{label.lower()}-", dir="/tmp") as temp:
            root = Path(temp)
            if spec["kind"] == "git":
                repo = git_fixture(root, spec["fixture"], env)
                script = root / "trace.sh"
                script.write_text(source + "\n", encoding="utf-8")
                result = run(["bash", "--noprofile", "--norc", str(script)], repo, env)
            else:
                (root / "Main.java").write_text(source + "\n", encoding="utf-8")
                run(["javac", "--release", "17", "Main.java"], root, env, check=True)
                result = run(["java", "-cp", str(root), "Main"], root, env)
            if result.returncode != spec["exit"] or result.stdout != spec["stdout"]:
                return {"id": label, "title": title, "expected": spec["stdout"],
                        "stdout": result.stdout, "exit": result.returncode,
                        "stderr": result.stderr[:2000]}
    except Exception as error:
        return {"id": label, "title": title, "error": str(error)}
    return None


def main():
    started = time.monotonic()
    executable = parse_bank()
    print("PASS: 120 questions; four choices and hidden explanations each; four complete mixed sets.",
          flush=True)
    for binary in ("git", "bash", "javac", "java"):
        require(shutil.which(binary), f"Required program not found: {binary}")
    with ThreadPoolExecutor(max_workers=4) as pool:
        failures = [result for result in pool.map(check_trace, executable) if result]
    print(json.dumps({"git_traces": 37, "java_traces": 13, "failures": failures,
                      "elapsed_seconds": round(time.monotonic() - started, 2)}, indent=2))
    require(not failures, f"{len(failures)} executable trace(s) failed.")
    print("PASS: all 50 executable outputs matched exactly in isolated temporary fixtures.")


if __name__ == "__main__":
    main()
