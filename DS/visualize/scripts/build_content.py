#!/usr/bin/env python3
"""Build the offline question bank and source library from DS files."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parents[1] / "src" / "generated"
OUT.mkdir(parents=True, exist_ok=True)
CONTENT = OUT.parent / "content"

BANKS = [
    ("java", ROOT / "FS_Java_Hard_MCQ_Bank.md", r"^### (J\d{3}) — (.+)$"),
    ("daa", ROOT / "FS_DAA_MCQ_Bank.md", r"^### (Q\d+) — (.+)$"),
]


def parse_bank(bank: str, path: Path, header: str) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    question_re = re.compile(header)
    items = []
    section = "General"
    index = 0
    while index < len(lines):
        line = lines[index]
        if line.startswith("## "):
            section = line[3:].strip()
        match = question_re.match(line)
        if not match:
            index += 1
            continue
        qid, title = match.groups()
        index += 1
        body = []
        while index < len(lines) and not question_re.match(lines[index]) and not lines[index].startswith("## "):
            body.append(lines[index])
            index += 1
        block = "\n".join(body)
        before, _, detail = block.partition("<details>")
        detail = re.sub(r"<summary>.*?</summary>", "", detail, count=1, flags=re.S)
        detail = detail.replace("</details>", "").strip()
        answer_match = re.search(r"\*\*([A-D])(?:\.|\b)", detail)
        option_re = re.compile(r"^([A-D])\.\s+(.+?)\s*$")
        prompt_lines = []
        options = {}
        in_code = False
        for raw in before.splitlines():
            if raw.strip().startswith("```"):
                in_code = not in_code
            option = None if in_code else option_re.match(raw)
            if option:
                options[option.group(1)] = option.group(2).strip()
            else:
                prompt_lines.append(raw)
        if len(options) != 4 or not answer_match:
            raise ValueError(f"Could not parse {qid}: {len(options)} options, answer={bool(answer_match)}")
        items.append(
            {
                "id": qid,
                "bank": bank,
                "title": title,
                "topic": section,
                "prompt": "\n".join(prompt_lines).strip(),
                "options": options,
                "answer": answer_match.group(1),
                "explanation": detail,
                "source": path.name,
            }
        )
    return items


questions = [q for bank, path, header in BANKS for q in parse_bank(bank, path, header)]
if len(questions) != 410:
    raise ValueError(f"Expected 410 questions, found {len(questions)}")
notes_path = CONTENT / "question-notes.txt"
if notes_path.exists():
    note_lines = [line.split("|", 1) for line in notes_path.read_text(encoding="utf-8").splitlines() if line and not line.startswith("#")]
    notes = dict(note_lines)
    if len(notes) != len(note_lines) or set(notes) != {q["id"] for q in questions}:
        raise ValueError("Require exactly one rewritten explanation for every question")
    for q in questions:
        if q["id"] in notes:
            sentences = re.split(r"(?<=[.!?])\s+", notes[q["id"]])
            q["explanation"] = "\n\n".join(" ".join(sentences[i:i+3]) for i in range(0,len(sentences),3))
    unknown = set(notes) - {q["id"] for q in questions}
    if unknown:
        raise ValueError(f"Unknown explanation IDs: {unknown}")
    print(f"Rewritten explanations: {len(notes)}/{len(questions)}")
index = json.loads((ROOT / "validation" / "java_mcq_index.json").read_text(encoding="utf-8"))
for q in questions:
    if q["bank"] == "java":
        validation = index["questions"][int(q["id"][1:])-1]
        q["execution"] = {key: validation[key] for key in ("mode", "expected")}
(OUT / "questions.json").write_text(json.dumps(questions, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

documents = []
for path in sorted(ROOT.rglob("*")):
    if not path.is_file() or "visualize" in path.parts or "sources" in path.parts:
        continue
    if path.suffix not in {".md", ".cpp", ".hpp", ".java", ".py", ".json"}:
        continue
    relative = path.relative_to(ROOT).as_posix()
    documents.append(
        {
            "path": relative,
            "name": path.name,
            "type": "notes" if path.suffix == ".md" else "code / validation",
            "content": path.read_text(encoding="utf-8"),
        }
    )
(OUT / "documents.json").write_text(json.dumps(documents, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"Built {len(questions)} questions and {len(documents)} source documents (transcripts excluded)")

inventory = (ROOT / "LeetCode_Solved_Inventory.md").read_text(encoding="utf-8")
pool = (ROOT / "FS_LeetCode_Practice.md").read_text(encoding="utf-8")
metadata = {}
for match in re.finditer(r"^\| (\d+) \| (.+?) \| (Easy|Medium|Hard) \|", inventory, re.M):
    pid, name, difficulty = match.groups()
    metadata[int(pid)] = {"name": name, "difficulty": difficulty, "reportedSolved": True, "priority": "Later", "relation": "Reported solved inventory"}
for match in re.finditer(r"^\| (\d+) \| \[(.+?)\]\((.+?)\) \| (.+?) \| (.+?) \| (.+?) \|", pool, re.M):
    pid, name, url, status, priority, relation = match.groups()
    item = metadata.setdefault(int(pid), {"difficulty": "Not recorded", "reportedSolved": False})
    item.update(name=name, url=url, priority=priority, relation=relation)

algorithms = []
current = None
for line in (CONTENT / "algorithms.txt").read_text(encoding="utf-8").splitlines():
    if not line or line.startswith("#"):
        continue
    if line[0].isdigit():
        fields = line.split("|")
        if len(fields) != 9:
            raise ValueError(f"Expected 9 fields: {line}")
        pid, pattern, task, baseline, time, space, why, edge, example = fields
        current = dict(id=int(pid), pattern=pattern, task=task, baseline=baseline, time=time, space=space, why=why, edge=edge, example=example, **metadata[int(pid)])
        algorithms.append(current)
    elif line.startswith(">"):
        current["steps"] = line[1:].split(";")
    elif line.startswith("="):
        current["trace"] = [dict(zip(("state", "reason"), frame.split("~", 1))) for frame in line[1:].split("|")]
    elif line.startswith("?"):
        current["decision"] = dict(zip(("test", "yes", "no"), line[1:].split("|")))
ids = [p["id"] for p in algorithms]
if len(ids) != len(set(ids)) or set(ids) != set(metadata):
    raise ValueError("Problem guides must cover exactly the inventory and practice pool")
for p in algorithms:
    if not p.get("steps") or len(p.get("trace", [])) < 3 or not p.get("decision"):
        raise ValueError(f"Incomplete problem guide: {p['id']}")
    if "url" not in p:
        slug = re.sub(r"[^a-z0-9 -]", "", p["name"].lower()).replace(" ", "-")
        p["url"] = "https://leetcode.com/problems/" + slug + "/"
(OUT / "algorithms.json").write_text(json.dumps(algorithms, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"Built {len(algorithms)} complete problem guides")
