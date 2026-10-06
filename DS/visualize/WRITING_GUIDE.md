# Explanation style

The teaching content uses an ASD-STE100-informed software-writing style. It does not claim audited dictionary compliance.

The reference is [ASD-STE100 Issue 9, 15 January 2025](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf). The official [overview](https://www.asd-ste100.org/about_STE.html) explains the controlled language and subject-specific terminology.

Use these authoring checks:

- Keep procedural sentences within 20 words where practical. Give one action per step. Put necessary conditions before actions.
- Keep descriptive sentences within 25 words. Introduce one topic per paragraph. Limit each paragraph to six sentences.
- Use active voice, complete grammar, and consistent terms.
- Introduce a concrete example before dense terminology. Explain why a state change occurs.
- Retain the contract, strict comparisons, numeric types, and failure conditions.
- State uncertainty where evidence is incomplete. Distinguish expected, worst-case, and amortized costs.
- Treat code identifiers, mathematical notation, and defined algorithm names as technical terminology. Do not rename API symbols to simplify prose.

These choices draw on rules 3.6, 4.4–4.5, 5.1–5.4, 6.1–6.6, and 9.4. Dictionary review remains a separate task.

The original source archive remains unchanged. Its preserved wording is evidence, not rewritten teaching content.

# Content and validation

`src/content/algorithms.txt` has 173 individually authored guides. This is the union of 144 reported solved IDs and 29 extra practice IDs. “Complete” refers to that repository collection, not every LeetCode problem or the entire FS syllabus.

Each guide has a contract, a baseline, a procedure, a correctness reason, costs, boundaries, a three-state example, and a critical-decision diagram. The diagram isolates one comparison; it does not pretend to show every operation.

`src/content/question-notes.txt` has one individually rewritten explanation for every bank question. The builder checks exact coverage of all 410 IDs. It preserves the original options and answer keys.

`src/content/concepts.js` contains 31 longer concept explanations. `glossary.js` defines the recurring terms with examples. `java-solutions.js` contains 24 reference methods. Other guides explicitly identify their Java section as a construction plan.

`java-guidance.js` covers every method category with suitable Java state, collection types, and implementation checks. These construction notes are separate from the tested reference methods.

Technical costs use conventional fixed-width operation assumptions unless the guide states another model. Output size is included or excluded explicitly. Original Java-bank snippets and their output contracts remain unchanged.
