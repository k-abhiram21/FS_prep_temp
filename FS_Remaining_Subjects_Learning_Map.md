# CN, AI, Java, Python and DAA: compact banks and learning map

Prepared **8 October 2026** for the **9 October** screening test. These five banks contain **70 questions each**, 350 in total. They complement the existing [80 SE questions](SE/FS_SE_Hard_MCQ_Bank.md) and [80 WT questions](WT/FS_WT_Hard_MCQ_Bank.md). Java and Python are separate banks within the announced Programming subject. The question counts are study allocations, not exam weightage.

**AI update, 9 October:** your test report adds RNN, LSTM, GRU and autoencoders to the preparation scope. The [40-question supplement](AI/FS_AI_Sequence_Autoencoder_Supplement.md) supplies short notes, worked gates/shapes and primary readings; these 40 are additional to the 350 questions below.

Every new bank has four choices, one best answer, hidden worked reasoning, explanations of the alternative traps, source references, a topic index, and three mixed sets of 20 plus one of 10. Code questions specify their language and inputs. Computational questions specify units, conventions and assumptions. The difficulty comes from competing plausible rules, boundary cases and state changes; the wording stays short.

**ai explnation due to lack of material** — original supplementary teaching is included where the college sources are shallow or absent. This label does not mean all college material is missing. Exact code in the selected DAA traces comes from our earlier original bank; it is not a transcription of the lecturer's screen.

| Bank | Questions | Main learning task |
|---|---:|---|
| [Computer Networks](CN/FS_CN_Hard_MCQ_Bank.md) | 70 | Separate layer responsibilities, calculate signal/delay quantities, trace error checks, windows and access protocols. |
| [Artificial Intelligence](AI/FS_AI_Hard_MCQ_Bank.md) | 70 | Match task/output/loss contracts; calculate derivatives, updates and metrics; trace 24 TensorFlow/Keras examples. |
| [Java programming](Programming/FS_Java_Hard_MCQ_Bank.md) | 70 | Trace every program; distinguish compile failure, runtime exception and normal output. |
| [Python programming](Programming/FS_Python_Hard_MCQ_Bank.md) | 70 | Track objects, names, lazy evaluation and method contracts in every question. |
| [Data Structures and Algorithms](DS/FS_DAA_Hard_MCQ_Bank.md) | 70 | Combine proofs and complexity with 40 selected Java algorithm traces. |

The notice names CN and AI subtopics, but gives **no detailed Java, Python or DAA subtopic list**. For those three, the map follows current revision notes, the college DAA units and documented lectures, with common foundations added explicitly. The banks cover that preparation scope; no finite selection establishes all possible exam questions. No new standalone coding assignments are added outside recursion, arrays/strings and greedy.

## A realistic final-day route

1. Use each bank's coverage table to find weak areas. Start with the first 10 mixed-set questions in each bank, about 50 questions overall; this samples the banks and does not replace whole-topic revision.
2. Review missed explanations untimed. Write **rule → closest wrong choice → smallest counterexample**. Read the direct guide only when the explanation needs more background.
3. Continue in blocks of 10–15 from weaker topics. For a calculation, recompute it with changed values; for code, identify the first line where your trace went wrong.
4. Build a final 30-question mixed mock across all subjects. The exam allows 30 minutes for 30 MCQs. Long learning traces can take more than a minute, so practice skipping and returning.

External sources below are targeted repair readings. Do not begin an entire new course the night before the exam. Existing larger DAA banks remain available for later study; the new 70-question bank is the compact route.

## Computer Networks: coverage and depth

Reviewed [Unit I](CN/CN_UNIT_1_NOTES.docx), [Unit II](<CN/CN UNIT-2 NOTES.docx>) and the [direct CN guide](CN/FS_Revision_Notes.md). DOCX text was extracted, including framing, Hamming, windows and ALOHA examples.

| Topic | College coverage | Depth supplied in the compact bank |
|---|---|---|
| OSI | Broad responsibilities, layers and devices are covered. Real-protocol placement and scope need care. | CN001–012: local MAC versus final IP, local reliability versus end-to-end delivery, logical peers, service/protocol distinction, bridges and broadcast boundaries. |
| Physical Layer | Media, transmission modes and multiplexing are useful. Capacity, unit handling and delay calculations are less developed. | CN013–030: baud/bit rate, Nyquist/Shannon assumptions, dB conversion, transmission/propagation, store-and-forward, bandwidth-delay product, encoding and multiplexing costs. |
| Data Link error checks | Framing, parity, CRC, checksum and Hamming have substantial definitions/examples. | CN031–050: exact stuffing, XOR division, undetected patterns, end-around carry, distance guarantees, parity placement and syndrome order. |
| ARQ and access | Unit II covers Stop-and-Wait, GBN, SR, sliding windows, ALOHA, CSMA and Ethernet. | CN051–070: lost ACKs, premature timers, accepted versus delivered frames, modulo windows, cumulative versus individual ACKs, utilization, access timing and frame padding. |

**Corrections and conventions:** the Unit II discussion mixes SR-style buffering with a cumulative delivery-ACK variant. Standard SR questions in this bank explicitly define individual ACKs; GBN questions define whether an ACK is the last accepted or next expected number. The piggyback prose also reverses an ACK direction in one explanation: B→A data acknowledges earlier A→B data. These distinctions are taught rather than silently inheriting inconsistent wording. The capacity examples use idealized stated models, not a promise that any physical link attains its bound.

| External reading | Read for |
|---|---|
| [MIT 6.02 readings](https://ocw.mit.edu/courses/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/pages/readings/) | Error-correcting codes, communication channels, shared media and reliable delivery. Use the linked notes by topic. |
| [MIT 6.263 Data Communication Networks lecture notes](https://ocw.mit.edu/courses/6-263j-data-communication-networks-fall-2002/pages/lecture-notes/) | Lectures 2–3 on framing, detection, ARQ and window reasoning. |
| [RFC 1662: PPP framing](https://www.rfc-editor.org/rfc/rfc1662.html) | Sections 4–5: octet/bit transparency and order of stuffing/FCS processing. Its exact escaping rules differ from the explicitly defined toy byte-framing question. |
| [RFC 1071: Internet checksum](https://www.rfc-editor.org/rfc/rfc1071.html) | One's-complement addition and end-around carry. Real word size is 16 bits; bank arithmetic uses labeled 8-bit teaching examples. |

## Artificial Intelligence: coverage and depth

Reviewed [Unit I Part 1](AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf), [Part 2](AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf), [supervised-learning notes](AI/SUPERVISED_LEARNING_REGRESSION.pdf), and the [direct AI guide](AI/FS_Revision_Notes.md). Text extraction was cross-checked against rendered pages; Part 1 page 53 confirms its high-level computational-graph/autodifferentiation treatment.

| Topic | Existing depth | Depth supplied in the compact bank |
|---|---|---|
| Regression | Prediction equations, MSE, gradient descent and logistic-regression introduction are present; the separate supervised notes add regularization. | AI001–014: linear in parameters, error reduction conventions, numerical gradients, simultaneous updates, overshoot, scaling, leakage, negative R² and duplicate-feature identifiability. |
| Classification | Class tasks and a MNIST-style workflow are covered. Decisions, probability losses and metrics need more edge cases. | AI015–030: exact threshold boundaries, precision/recall denominators, imbalance, F1, confusion axes, sparse/one-hot labels, logits, confidence, calibration and undefined metrics. |
| ANN | Neurons, activations, layers and backpropagation have substantial descriptive coverage. | AI031–046: complete forward/chain-rule calculations, parameter counts, XOR, affine-layer collapse, vanishing gradients, symmetry, batch counts, dropout and BatchNorm modes. |
| TensorFlow | Part 1 pages 52–54 introduce tensors, graphs and differentiation. Part 2 supplies a basic model workflow. API and shape behavior are comparatively shallow. | AI047–070: 24 executable traces covering broadcasting errors, reshape/reduction, dtype failures, GradientTape scopes, disconnected gradients, Dense/Flatten, datasets, compile/fit/evaluate/predict and optimizer updates. |

The original bank followed the four announced headings. Your 9 October report showed that this selection missed RNN, LSTM, GRU and autoencoders. The [supplement](AI/FS_AI_Sequence_Autoencoder_Supplement.md) now covers those four, including gates, temporal gradients, state/mask contracts, reconstruction and related AE variants. The local PDFs offer brief mentions rather than full architecture lessons (Part 1, PDF viewer page 59); primary sources fill that gap. L2 and dropout are supporting ANN training concepts. TensorFlow examples deliberately use **2.16.1 with Keras 3**, a stable stated API baseline rather than claiming it is the newest release.

| External reading | Read for |
|---|---|
| [Google ML Crash Course: gradient descent](https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent) | Weight/bias gradients, loss conventions and learning-rate effects. Convexity alone does not make every finite step safe; see the overshoot counterexample. |
| [Google: classification metrics](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) | Metric denominators, threshold tradeoffs and imbalance. |
| [Google: L2 regularization](https://developers.google.com/machine-learning/crash-course/overfitting/regularization) and [activations](https://developers.google.com/machine-learning/crash-course/neural-networks/activation-functions) | Training penalties and why hidden nonlinearities matter. |
| [TensorFlow tensors](https://www.tensorflow.org/guide/tensor) and [autodifferentiation](https://www.tensorflow.org/guide/autodiff) | Shapes, broadcasting, watched values, recording scope and missing gradients. |
| [TensorFlow training/evaluation guide](https://www.tensorflow.org/guide/keras/training_with_built_in_methods) | Build/compile/fit/evaluate/predict and dataset contracts. |
| [Dense API](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense), [sparse categorical loss](https://www.tensorflow.org/api_docs/python/tf/keras/losses/SparseCategoricalCrossentropy), [Dropout](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dropout), [BatchNorm](https://keras.io/api/layers/normalization_layers/batch_normalization/) | Exact parameter, target, logits and mode contracts. |

## Programming: Java and Python

No dedicated college language-fundamentals pack was found in the inspected material. The [Java guide](Programming/Java_FS_Revision_Notes.md) and [Python guide](Programming/Python_FS_Revision_Notes.md) provide a foundation, but their six self-checks each do not cover deep method differences. The earlier [160 Java algorithm questions](DS/FS_Java_Hard_MCQ_Bank.md) mainly teach DAA; the new Programming Java bank teaches the language itself.

| Java coverage | Bank IDs | New depth |
|---|---|---|
| Types, arithmetic and control | JV001–014 | Overflow before widening, promotion, narrowing, evaluation order, shifts, float special values, definite assignment and fallthrough. |
| Strings, arrays and sharing | JV015–026 | Constant concatenation, regex/literal differences, UTF-16, split limits, shallow copies, covariant array stores and pass-by-value. |
| Collections/generics | JV027–042 | remove overloads, primitive-array varargs, fixed-size/unmodifiable views, mapped null, computeIfAbsent, comparator equality, queue ends and wildcard restrictions. |
| Methods/OOP | JV043–060 | Widening versus boxing, ambiguous null, static overload versus dynamic override, hidden fields, early dispatch, initialization, checked exceptions and equality signatures. |
| Exceptions/input/API | JV061–070 | Pending returns, catch ordering, token-versus-line input, insertion-point encoding, safe comparators, iterator removal and suppressed resource failures. |

Read [JLS 17 expressions](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html) for JV001–014 and overload selection; [classes](https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html) for JV043–060; [statements](https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html) for control/exceptions. For a method you confuse, consult its exact [Java 17 collection API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html) or [String API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html), including return value and exception sections.

| Python coverage | Bank IDs | New depth |
|---|---|---|
| Numbers, truth and control | PY001–012 | Floor/modulo sign, arbitrary precision, power precedence, operand-returning booleans, numeric-key equality and loop else. |
| Strings/sequences | PY013–024 | Code points/bytes, slice clipping/step, split/strip/find contracts, mutator returns and nested mutability. |
| Sharing/dicts/sets | PY025–038 | Repeated-row aliases, shallow copies, += partial effects, insertion/reinsertion, eager defaults, live views and recursive hashability. |
| Functions/iterators | PY039–052 | Persistent/captured defaults, local-name classification, nonlocal, late binding, comprehension scope, lazy map/zip/generators and parameter kinds. |
| Classes/exceptions/input | PY053–070 | Class/instance attributes, bound methods, dynamic lookup, equality/hash rules, finally, exception-name cleanup, deletion, stable sorting and short-circuit iteration. |

Use [Python built-in types](https://docs.python.org/3/library/stdtypes.html) for exact method contracts; [expression rules](https://docs.python.org/3/reference/expressions.html) for grouping/evaluation; [function definitions](https://docs.python.org/3/tutorial/controlflow.html) for defaults and parameter kinds; [classes](https://docs.python.org/3/tutorial/classes.html) and [exceptions](https://docs.python.org/3/tutorial/errors.html) for name lookup and error handling. Examples avoid implementation-specific set order and wrapper/string interning guesses.

## DAA: compact selection from the existing material

Reviewed the two [college units](DS/college/), the [lecture coverage map](DS/FS_Lecture_Coverage.md), [concept notes](DS/FS_Concept_Notes.md), [250-question concept bank](DS/FS_DAA_MCQ_Bank.md), [160-question Java bank](DS/FS_Java_Hard_MCQ_Bank.md), and its executable validation index. Unit I includes D&C, sorting, recurrences, majority and power; Unit II includes search applications, greedy, MST and shortest paths. Some Unit II PDF text renders poorly, so the corrected notes and documented lecture map are useful companions.

| Coverage | Bank IDs | Depth and source boundary |
|---|---|---|
| Complexity/core structures | DA001–008 | Tight versus loose bounds, harmonic loops, amortization, output costs, linked deletion, BST degeneration, heaps and worst-case hashing. Common core-structure supplements fill gaps in the algorithm-heavy lectures. |
| Recurrences/guarantees | DA009–013 | Recursion trees, subtractive recurrences, active stack versus calls, randomized quicksort and sufficient memo state. |
| Greedy contracts | DA014–018 | Fractional/0-1 knapsack counterexample, coin-system failure, interval exchange rule, stock transaction contract and Dijkstra's negative-edge failure. Interval selection is a marked study extension in the earlier material. |
| Invariants | DA019–024 | Binary-search monotonicity, majority verification, Prim/Dijkstra differences, BFS assumptions, disconnected MST and sort stability. |
| Trees/backtracking | DA025–030 | Height convention, recursive balance, saved-state snapshots, path-local undo, Hamiltonian closure and pruning assumptions. |
| Selected code | DA031–070 | Forty existing Java traces cover recursion, product-prefix state, stable merge, density comparison, Maximum Swap, power, strobogrammatic centre, search/Koko/median/LCP, copying, Dijkstra/Prim/DSU/Kruskal, BFS/DFS/grids, trees, N-Queens, Hamiltonian closure, braces, bit operations and assignment search. Each identifies its original J-number and evidence. |

The earlier large banks are retained as deeper references. The compact bank is the recommended remaining-time route. [MIT 6.006 lecture notes](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/) add official explanations of structures, hashing, search, graph invariants and dynamic programming/memoization. Full DP or extra graph implementations are not newly assigned as coding practice for this test.

## Validation and limits

Run from the repository root:

```bash
python3 validation/check_remaining_mcq_banks.py
```

This checks 350 question IDs, options, hidden answers, source references, mixed-set membership, all 110 Java snippets and all 70 Python snippets. It reports TensorFlow as skipped unless you supply an interpreter with TensorFlow installed:

```bash
python3 validation/check_remaining_mcq_banks.py --tf-python /path/to/tensorflow-env/bin/python
```

The TensorFlow path executes all 24 examples, including expected failures, with fresh per-question namespaces. The original DAA Java code is preserved; its source expected outputs remain the fixtures. The validator does not claim to prove asymptotic arguments or every prose distractor. [Numerical checks](validation/check_remaining_numerics.py) independently calculate selected CN/AI worked results and compare them with the bank's chosen answers.

Initial verification used Java 17, Python 3.14.7 and a temporary Python 3.12 environment containing TensorFlow CPU 2.16.1, Keras 3.15.1 and NumPy 1.26.4. TensorFlow dependencies are **not** added to either visualization site or required to read the banks. Exact execution results are recorded after the checks finish in [validation notes](validation/Remaining_MCQ_Validation.md).
