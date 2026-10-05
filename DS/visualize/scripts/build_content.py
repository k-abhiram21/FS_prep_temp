#!/usr/bin/env python3
"""Build the offline question bank and source library from DS files."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parents[1] / "src" / "generated"
OUT.mkdir(parents=True, exist_ok=True)

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
(OUT / "questions.json").write_text(json.dumps(questions, ensure_ascii=False, separators=(",", ":")))

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
(OUT / "documents.json").write_text(json.dumps(documents, ensure_ascii=False, separators=(",", ":")))
print(f"Built {len(questions)} questions and {len(documents)} source documents (transcripts excluded)")
