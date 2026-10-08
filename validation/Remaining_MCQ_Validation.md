# Compact remaining-subject MCQ validation

Verified **8 October 2026**. The [coverage and source audit](../FS_Remaining_Subjects_Learning_Map.md) explains the teaching scope and review limits.

| Check | Result |
|---|---|
| Bank structure | Five banks × 70 questions = 350. IDs are contiguous and unique within each bank. Four distinct options, one matching hidden answer, 70 balanced detail blocks, source references and four mixed sets covering each bank exactly once. |
| Java | 110 snippets: 94 normal outputs, 11 expected compile failures and 5 expected runtime exceptions. All matched using `javac --release 17` and OpenJDK 17.0.20.1. |
| Python | 70 scripts: 62 normal outputs and 8 expected exceptions. All matched using Python 3.14.7. The bank uses Python 3.10+ language contracts; other versions were not separately run. |
| TensorFlow/Keras | 24 snippets: 22 normal results, 1 expected dtype error and 1 expected consumed-tape error. All matched on TensorFlow CPU 2.16.1, Keras 3.15.1, NumPy 1.26.4, Python 3.12.14. |
| CN/AI arithmetic | 39 selected answer comparisons passed. Includes units/delays, stuffing, Hamming parity/syndrome, checksum carry, CRC construction, windows, metric denominators, loss and finite-difference gradient checks. CRC burst detection was exhaustively checked for the selected degree-3 generator over the bounded test span. |
| Prose and assumptions | Reviewed layer scope, ACK conventions, logits/target contracts, language/API rules and selected DAA explanations against local evidence and linked primary references. Runtime checks do not prove all theoretical claims. |

The validator extracts executable blocks **from the Markdown being studied**. Its [index](remaining_mcq_checks.json) stores expected outcomes and check modes; it does not hold a second copy of the code or complete questions. DAA's 40 selected Java blocks preserve the earlier bank's code and expected execution fixtures. Thirty additional DAA questions cover conceptual foundations and proofs.

Reproduce the standard-library checks:

```bash
python3 validation/check_remaining_mcq_banks.py
python3 validation/check_remaining_numerics.py
```

The first command explicitly skips TensorFlow unless given a suitable interpreter. For the recorded TensorFlow baseline, create a temporary environment using Python 3.12 and install `tensorflow-cpu==2.16.1` and `keras==3.15.1`; then run:

```bash
python3 validation/check_remaining_mcq_banks.py --tf-python /path/to/temporary-env/bin/python
```

The temporary TensorFlow installation is outside the repository. No model training on external data, site dependency update, or change to SE/WT banks is required for these materials.
