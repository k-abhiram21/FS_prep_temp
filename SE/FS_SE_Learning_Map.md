# SE learning map for the FS screening

Audited on **8 October 2026** against your notice for **9 October 2026**. The SE scope is **Process Models; Agile & DevOps; Git & GitHub**. SE is in the MCQ section. The notice gives 30 MCQs across all subjects and does not specify an SE question count, difficulty, or detailed subtopic list.

**Assessment:** the college PDFs introduce every named SE area. They are a useful starting point, but topic presence is not the same as sufficient depth. Process models have the strongest explanatory coverage. Scrum needs precise rules, DevOps needs corrections to its Agile comparison, and Git needs command/state reasoning beyond reading screenshots.

**Latest repository update checked:** after integrating remote commit fb95774, the [direct SE study guide](FS_Revision_Notes.md) and [Subject Atlas](../Subjects/visualize/README.md) are also available. The direct guide already fills many PDF gaps: iterative/incremental distinctions, throwaway prototypes, Scrum commitments/Done, release versus Review, CI/CD, staging/diff, reset modes and fetch/pull. Start there for teaching. The remaining need is deeper application, conflicting conditions and multi-step traces, which the new bank supplies.

This map distinguishes what the files actually teach from recommended supplementary depth. The latter is a preparation judgement, not a prediction of the paper.

**Practice:** use the [120 hard SE scenario MCQs](FS_SE_Hard_MCQ_Bank.md) after each topic. The bank has hidden reasoning, four mixed sets of 30 and verified Git/Java traces. Its lower-priority supplements are marked so you can prioritize the announced topics before the screening.

## 1. Sources and how to use them

| Source | Relevant PDF pages | What to use |
|---|---|---|
| [Unit 1: Software Engineering](Unit-1%20Software%20Engineering%20%281%29.pdf), 55 pages | **15-20** | Layered technology, generic framework and umbrella activities: brief foundations |
| Same Unit 1 | **20-33** | SDLC, Waterfall, incremental, iterative, prototype, spiral and concurrent models |
| Same Unit 1 | **34-45** | Agile values/principles, framework introductions and Scrum |
| Same Unit 1 | **46-55** | Agile/DevOps comparison, lifecycle, CI/CD, pipeline and tool examples |
| [Unit 2: Understanding Requirements](Unit-2%20Understanding%20Requirements.pdf), 66 pages | **30-50** | VCS, Git/GitHub, working tree/index/repository, local commands and remote configuration |
| Same Unit 2 | **57-66** | Clone, push, pull, fork, patch and merge-conflict examples |
| [Direct SE study guide](FS_Revision_Notes.md) | **Sections 1-10; included MCQs** | Explanations, an attendance-app example, recall sheet and 15 introductory questions |
| [Subject Atlas SE lessons](../Subjects/visualize/src/content.mjs) and [question source](../Subjects/visualize/src/questions.mjs) | **Nine SE lessons; 36 SE questions** | Visual walkthroughs and foundation checks; some questions overlap the direct guide, so these are not 51 distinct questions |

All page numbers are **one-based PDF viewer pages**, not the printed footers; Unit 2's footer numbering repeatedly restarts. I checked the relevant extracted text and rendered pages, including model diagrams and Git screenshots. Sprint Planning appears in the Unit 1 p. 44 diagram, but has little explanatory treatment. Unit 2 pp. 51-54 and 56 are mostly setup screenshots; p. 55 explains SSH keys.

For this screening, defer Unit 1 pp. 1-14's extended introductory material and Unit 2 pp. 1-29's requirements/SRS/feasibility discussion. They are broader college content, rather than separate topics named in your SE notice. Read a small definition only if needed to understand a process-model question.

## 2. College PDF coverage and target depth

Depth labels describe the source, not your current proficiency:

- **Good foundation:** definition, steps, examples and tradeoffs are explained; add comparisons and fresh scenarios.
- **Partial:** the idea appears, but important distinctions or procedures need supplementation.
- **Recognition only:** names or short descriptions; insufficient for a detailed scenario.
- **Gap:** no substantive explanation located in the relevant pages, including their visuals.

| Topic to learn | Evidence in our materials | Depth covered | What you should be able to do |
|---|---|---|---|
| Process/framework/SDLC; framework versus umbrella activities | U1 pp. 15-21 | Good foundation | Distinguish the lifecycle from a model that organizes it; identify ongoing QA/risk/configuration work versus a development activity |
| Waterfall | U1 pp. 22-23, 25 | Good foundation, with absolute claims to qualify | Explain sequential phases, stable-requirement fit, late feedback and cost of change; select it from stated project constraints |
| Incremental | U1 pp. 23-25 | Good foundation | Explain delivery in functional portions, early value and integration tradeoffs |
| Iterative versus incremental | U1 pp. 26-27; incremental example pp. 24-25 | Partial: the iterative definition blends both | Separate refining an existing solution from adding functionality; recognize that a process can do both |
| Prototyping | U1 pp. 27-29 | Good introduction; partial variants | Explain how feedback clarifies uncertain requirements; distinguish a disposable prototype from one evolved into the product |
| Spiral | U1 pp. 29-30 | Good risk-management introduction; partial formal structure | Identify risk as the driver; connect objectives, alternatives, risk reduction, development and next-cycle planning |
| Concurrent development | U1 pp. 31-33, state diagram p. 31 | Good foundation | Explain overlapping activities and interpret activity states/transitions; distinguish this from a fixed phase sequence |
| Agile values and principles | U1 pp. 34-38 | Good foundation | Apply collaboration, feedback, change, working software and sustainable pace to scenarios; avoid equating Agile with no planning/documentation |
| Scrum accountabilities and events | U1 pp. 42-45 | Partial | Distinguish Product Owner, Scrum Master and Developers; know each event's purpose and who makes decisions |
| Scrum artifacts, commitments and Done | U1 pp. 43-44 | Partial: backlogs/increment explained; goals/Done omitted | Separate formal artifacts from optional charts; learn the commitments and use Done as a quality criterion |
| Kanban, XP, Lean, other frameworks | U1 pp. 39-41 | Recognition only | Compare flow/WIP, engineering practices and waste reduction; recognize remaining names without studying every framework deeply |
| DevOps culture and Agile relationship | U1 pp. 46, 48-50 | Partial; p. 46 needs correction | Explain shared responsibility, automation and feedback; show how Agile and DevOps can work together |
| CI, continuous delivery, continuous deployment | U1 pp. 49, 51-53 | Useful foundation; approval boundary needs emphasis | Classify a pipeline by what happens automatically and whether production release needs a human decision |
| Pipeline, testing, operations and monitoring | U1 pp. 50-55 | Good introduction; little failure reasoning | Trace commit/build/test/release/operate/monitor; explain what a failed check prevents and how feedback leads to fixes |
| VCS types and Git versus GitHub | U2 pp. 30-37 | Good introduction, with oversimplified analogies | Contrast local/centralized/distributed VCS; separate version control from hosting and review |
| Staging, commits, status, diff and log | U2 pp. 34, 38-42, 46-47 | Partial for state questions | Trace tracked/untracked, staged/unstaged and committed states; determine exactly which file version a commit saves |
| Branch, HEAD, switching and merging | U2 pp. 43-49 | Basic commands covered; graph reasoning is a gap | Distinguish create from create-and-switch, identify merge direction, explain fast-forward versus a merge commit |
| Undo commands | U2 p. 48 | Revert covered; reset/restore distinctions are a gap | Choose between undoing a commit, unstaging a change and restoring a file; recognize reset modes at a basic level |
| Remotes, clone/fetch/pull/push | U2 p. 50, pp. 57-61 | Partial: no separate fetch/state lesson | Separate local commits from remote publication; distinguish fetching from integration; distinguish a local branch from a remote-tracking reference |
| Forks, PRs, conflicts and ignoring files | U2 pp. 36, 62-66 | Fork/conflict introduction; PR procedure shallow; ignore rules a gap | Explain fork versus clone versus branch, PR versus pull; finish a conflict resolution; know what `.gitignore` does |

**Recommended priority:** strengthen the partial rows before adding unrelated SE chapters. The existing materials are sufficient to begin learning; they do not justify the older guide's blanket claim that no supplementary Git material is needed.

### What the added repository material already fixes

These assessments refer to the current guide and Atlas source, rather than the older PDFs:

| Area | Current repository teaching | Depth still useful for hard MCQs |
|---|---|---|
| Process models | Guide section 2 and Atlas process/model/evolution lessons explain selection cues, iteration versus increments, disposable prototypes, risk and concurrency | Tradeoffs with several simultaneous constraints, limits of prototype evidence, specific risk experiments and activity-state transitions: bank SE001-SE024 |
| Agile/Scrum | Guide sections 3-4 include the values/principles, accountabilities, artifacts/commitments, Done, event purposes, empiricism and release-before-Review distinction | Delegation, cancellation authority, scope versus Goal, organization-wide Done minimums, multiple teams, timebox/format exceptions and unfinished work: SE025-SE054 |
| DevOps | Guide section 5 and Atlas explain culture, CI/delivery/deployment, human approval, blocking tests and monitoring | Checks on the wrong revision, stale approval, skipped checks, artifact mismatches, faulty boolean gates and rollout denominators: SE055-SE080 |
| Git local state | Guide sections 6-7 explain staged snapshots, diff endpoints, restore defaults, ignore rules, reset modes and ancestry | Simultaneous HEAD/index/working differences, partial staging, tracked versus untracked paths and commit/parent counts: SE081-SE107 |
| Git collaboration | Guide section 8 and Atlas distinguish fetch/pull/push, forks/PRs, conflicts and rejected pushes | Exact local/remote-tracking/server states, fast-forward-only refusal, staged conflict resolution and rejected publication: SE108-SE120, plus conflict questions SE104-SE107 |

The guide's 15 questions and Atlas's 36 SE questions mainly test identification and one-step distinctions. They are useful first checks; the new 120-question bank adds original scenarios and executable traces rather than counting those existing questions again. External readings below are targeted references for the deeper rules, not a requirement to read every source before using the direct guide.

## 3. What depth is enough for this preparation?

### A. Process models: compare, select and justify

For each college model, learn its main organizing idea, requirement stability, timing of feedback/usable delivery, risk treatment, one advantage and one limitation. Given a fresh scenario, explain which constraint makes a model suitable. A domain name alone is not enough: two banking projects can have different uncertainty and risk.

Use this compact comparison while reading:

| Model | Main idea | Scenario cue to reason about |
|---|---|---|
| Waterfall | Sequential phases | Requirements are stable; formal phase outputs matter |
| Incremental | Deliver functionality in portions | A useful core must be delivered early |
| Iterative | Revisit and refine | The solution needs repeated improvement |
| Prototype | Explore with a preliminary version | Users cannot yet describe what they need clearly |
| Spiral | Let risk guide successive cycles | Significant uncertainty requires explicit risk reduction |
| Concurrent | Activities evolve in overlapping states | Different activities/components progress together |

These are starting cues from the college material, not automatic selection rules. Add the qualifications below, especially for iteration and spiral.

**Small optional breadth check:** V-model and RAD are not substantively taught in these PDFs, and your notice only says “Process Models.” Learn their distinguishing ideas if time remains, especially if your screening classes mentioned them: V-model associates development stages with testing; RAD emphasizes rapid prototyping and feedback. This is supplementary breadth, not a confirmed requirement. [IBM's SDLC model overview](https://www.ibm.com/think/topics/sdlc)

### B. Agile: apply the ideas; make Scrum precise

Understand why Agile values feedback and working software while still allowing plans, tools and documentation. The college values/principles pages are useful; check their meaning against the [original Manifesto](https://agilemanifesto.org/iso/en/manifesto.html) and [12 principles](https://agilemanifesto.org/principles.html).

For Scrum, learn the three accountabilities, five events, three artifacts and their commitments. Understand backlog ordering versus Sprint planning, Review versus Retrospective, and usable work versus unfinished work. Learn the pillars and values after these basics. The PDF's diagrams introduce the workflow, but do not supply all the rules. Use the [official Scrum Guide](https://scrumguides.org/scrum-guide.html); the shorter official explanations of [artifacts](https://www.scrum.org/resources/scrum-artifacts), [Review](https://www.scrum.org/resources/what-is-a-sprint-review) and [Retrospective](https://www.scrum.org/resources/what-is-a-sprint-retrospective) are useful lookup references.

For XP and Kanban, go one level deeper than names: pair programming, TDD/refactoring/CI; visual flow, pull and limits on work in progress. For Lean, recognize reducing waste. Defer SAFe/LeSS/Crystal/DSDM details until after the screening unless your classes emphasized them. Selected sections **2.3 and 2.5**, rather than the whole chapter, in [Valente's author-published processes chapter](https://softengbook.org/chapter2) cover XP and Kanban.

### C. DevOps: follow a change from commit to operation

Explain why collaboration, automation and production feedback matter. Recognize tool categories from U1 p. 49, but prioritize their purpose over memorizing a long brand list. Learn basic pipeline reasoning: a failed test should stop promotion; a successful build alone does not prove production readiness; monitoring helps detect and diagnose live problems. The overall lifecycle is described in [Microsoft's DevOps introduction](https://learn.microsoft.com/en-us/devops/what-is-devops).

Distinguish these three cases:

- **CI:** frequent integration checked with automated builds/tests.
- **Continuous delivery:** passing changes remain ready to release; a production release decision can be manual.
- **Continuous deployment:** passing changes reach production automatically, without a manual release gate.

Classify scenarios by the production gate, not just by the presence of automation. [Atlassian's CI/delivery/deployment comparison](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

### D. Git/GitHub: trace state, rather than memorize command names

Prioritize what changes in the working tree, index, local history and remote after each operation. Cover `init`, `clone`, `status`, `add`, `commit`, the diff variants, `log`, `branch`, `checkout`/`switch`, `merge`, `remote`, `fetch`, `pull`, `push`, `revert`, `restore` and basic `reset`. Learn `HEAD` and branch pointers to understand these operations. [Pro Git: file states and staging](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository), [branch pointers](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

Be able to explain a simple contribution flow: branch, commit, push, open a PR, discuss/review changes, merge. A fork is useful when contributing without write access to the original repository; it is not required for every PR. [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)

Learn `.gitignore` as a small gap repair: ignore rules affect intentionally untracked files; adding a tracked file to that list does not automatically stop tracking it. [Git ignore documentation](https://git-scm.com/docs/gitignore)

## 4. Corrections and qualifications to read alongside the PDFs

| Source location | Issue | Learn this instead |
|---|---|---|
| U1 pp. 21-23 | SDLC is presented as inherently ordered; Waterfall says you cannot go back | SDLC names lifecycle concerns; a model arranges them. Sequential Waterfall makes revisiting earlier work costly/controlled, rather than logically impossible. [IBM SDLC](https://www.ibm.com/think/topics/sdlc) |
| U1 pp. 23, 39, 45 | Broad claims that a model is unsuitable for large/complex work | Treat these as simplified limitations. Suitability depends on risk, uncertainty, coordination and constraints, not size alone. Scrum explicitly addresses complex problems. [Scrum Guide](https://scrumguides.org/scrum-guide.html) |
| U1 pp. 26-27 | Iterative development is explained using incremental feature delivery | Iteration refines; increments add functionality. They can coexist. Do not use the words as exact synonyms. |
| U1 pp. 27-29 | Prototype is treated mainly as something repeatedly refined into a final system | Distinguish disposable learning prototypes from evolutionary ones; a prototype need not become production code. Spiral can use throwaway prototypes. [Sommerville's spiral explanation](https://software-engineering-book.com/web/spiral-model/) |
| U1 pp. 29-30 | Spiral steps mostly repeat the generic framework | Retain the risk emphasis. Also recognize the classic sectors: objectives; risk assessment/reduction; development/validation; planning. [Sommerville's spiral explanation](https://software-engineering-book.com/web/spiral-model/) |
| U1 pp. 39, 41 | Agile is described as a collection of frameworks or work divided into “frameworks” | Agile provides values/principles; Scrum and other approaches put them into practice. Work items are not themselves frameworks. [Agile Manifesto](https://agilemanifesto.org/iso/en/manifesto.html) |
| U1 pp. 42-45 | Scrum terminology mixes team/Developers; charts/boards appear under artifacts; Daily Scrum gives three fixed questions | The formal artifacts are Product Backlog, Sprint Backlog and Increment; charts/boards are optional aids. [Artifacts](https://www.scrum.org/resources/scrum-artifacts). A Sprint is one month or less. [Scrum Guide](https://scrumguides.org/scrum-guide.html). The Daily Scrum is 15 minutes for Developers, with no mandatory three-question format. [Daily Scrum](https://www.scrum.org/resources/what-is-a-daily-scrum) |
| U1 pp. 43-45 | Goals/Done and change rules lack depth | Commitments: Product Goal, Sprint Goal, Definition of Done. [Artifacts](https://www.scrum.org/resources/scrum-artifacts). Scope can be renegotiated without endangering the Sprint Goal; an Increment must meet Done. [Scrum Guide](https://scrumguides.org/scrum-guide.html). Review inspects the product/outcome; Retrospective improves how the team works. [Review](https://www.scrum.org/resources/what-is-a-sprint-review), [Retrospective](https://www.scrum.org/resources/what-is-a-sprint-retrospective) |
| U1 p. 46 | Agile supposedly stops after deployment; DevOps supposedly guarantees no downtime or makes every person do all roles | Agile and DevOps can be combined. DevOps promotes collaboration/shared responsibility and reliable operations; it does not guarantee zero incidents or require identical responsibilities for everyone. [Microsoft DevOps](https://learn.microsoft.com/en-us/devops/what-is-devops) |
| U2 pp. 30-37 | Git/VCS supposedly record every modification and prevent conflicts | Git records committed snapshots, not every save. Collaboration can still produce conflicts requiring resolution. [Pro Git staging](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository), [merge conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) |
| U2 p. 42 | `git diff` is first described against staging, then against the last commit | Plain `git diff`: working tree versus index. `git diff --staged`: index versus HEAD. `git diff HEAD`: working tree versus HEAD, combining staged and unstaged tracked-file changes. [Git diff reference](https://git-scm.com/docs/git-diff) |
| U2 pp. 49, 64 | Example edit/commit flows omit `git add` | An ordinary commit records staged content. If you stage a file and then edit it again, the later edit is excluded unless staged again. [Pro Git staging](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) |
| U2 pp. 43-45 | Branch is called a separate project copy | A branch is a movable reference to a commit. `git branch name` creates it but does not switch; `checkout -b name` or `switch -c name` does both. A merge brings the named branch into the current one. [Pro Git branches](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell), [merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) |
| U2 p. 60 | Pull is presented only as fetch plus merge | Pull fetches and then integrates according to options/configuration: merging or rebasing. Specify the mode in a practice scenario; do not assume every pull creates a merge commit. [Git pull reference](https://git-scm.com/docs/git-pull) |
| U2 pp. 65-66 | Conflict markers are shown, but completion is not explained | Resolve the content, remove markers, stage resolved files, then finish the merge commit. Editing markers alone does not finish the operation. [Pro Git merge conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) |

For undo questions, distinguish reverting a commit from resetting a branch/index or restoring file contents. The PDF's revert explanation is useful, but not a complete undo lesson. Read [Pro Git: Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things), then the opening description and `--soft`, `--mixed`, `--hard` options in [git reset](https://git-scm.com/docs/git-reset). [git revert](https://git-scm.com/docs/git-revert) is the precise reference for reversing a commit.

Lower-priority correction: U2 p. 65 shows `git apply` for a `format-patch` file. Applying its changes is possible, but that does not recreate a commit. `git am` applies an email-format patch as a commit with its metadata. The conflict list also overstates when renames/file-mode changes cause conflicts; they do not invariably conflict. You do not need the full advanced taxonomy before FS. [git apply](https://git-scm.com/docs/git-apply), [git am](https://git-scm.com/docs/git-am)

## 5. Selected external reading: use these for the gaps

The links below were checked live on 8 October 2026. Read the named portions, rather than complete books or courses. Time estimates are suggested study blocks, not measured course durations.

The priority labels identify gaps in the older college PDFs. If the direct guide has already resolved a distinction for you, use its explanation and consult the corresponding external rule when a hard-bank question exposes uncertainty.

| Priority | Source and selected portion | Why use it |
|---|---|---|
| Essential correction | [Agile Manifesto](https://agilemanifesto.org/iso/en/manifesto.html) and [principles](https://agilemanifesto.org/principles.html): 5-10 min | Short original statements; correct “Agile means no documentation/plans” |
| Essential gap repair | [Official Scrum Guide](https://scrumguides.org/scrum-guide.html): Scrum Team, Events, Artifacts; 20-30 min | Precise accountabilities, commitments, timeboxes, Done and adaptation rules |
| Essential correction | [CI vs delivery vs deployment](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment): the three definition sections; 10 min | Understand the manual production gate |
| Essential gap repair | Pro Git **2.2** [Recording Changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository), **2.4** [Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things), **2.5** [Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes); 25-35 min | Staging snapshots, undoing, fetch/pull/push distinctions |
| Essential gap repair | Pro Git **3.1** [Branches](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell), **3.2** [Branching/Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging); 15-20 min | HEAD, branch graphs, fast-forward, divergence and conflict completion |
| Useful GitHub depth | [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow): branch/commit/PR/review/merge; 5-10 min | The college notes describe PRs briefly, but lack a worked review flow |
| Useful process correction | [Sommerville: Spiral](https://software-engineering-book.com/web/spiral-model/); 5 min | Clear risk-driven cycle and sectors; compact alternative to a long report |
| If framework names feel shallow | [Valente: Processes](https://softengbook.org/chapter2), sections 2.3 and 2.5; 10-15 min | XP engineering practices and Kanban flow/WIP |
| If Agile/DevOps comparison is confusing | [Microsoft: What is DevOps?](https://learn.microsoft.com/en-us/devops/what-is-devops), culture/lifecycle/practices; 10 min | Collaboration, operations, feedback and Agile as a compatible practice |
| Optional recognition | [IBM: SDLC](https://www.ibm.com/think/topics/sdlc), V-model and RAD subsections; 5 min | Modest process-model breadth beyond the PDFs |
| Optional connection | [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions), overview/components; 5 min | Connect GitHub to CI/CD; recognize workflow, event, job, step and runner |

Use command manuals linked in the corrections as lookup sources, not cover-to-cover reading. Advanced rebase, reflog recovery, Git internals, complex GitHub Actions YAML, Docker/Kubernetes administration and full DevOps projects can wait until after the screening unless explicitly emphasized in your classes.

## 6. A study route for today

These are alternative SE blocks, not extra work to stack on top of each other. Leave time for the other five MCQ subject groups and coding revision; their weights were not supplied.

| Block | Focused time | Action |
|---|---:|---|
| Process models | 30 min | Direct guide sections 1-2; compare models from memory, then attempt selected SE001-SE024 scenarios |
| Agile and Scrum | 40 min | Guide sections 3-4; use the linked Scrum rules for difficult SE025-SE054 cases |
| DevOps | 25 min | Guide section 5; trace selected SE064-SE076 programs and identify the production gate |
| Git and GitHub | 55 min | Guide sections 6-8; trace selected staging, reset, branch and remote questions on paper before opening explanations |
| Mixed practice | 30 min | Attempt hard-bank Set 1 with answers closed; record wrong/uncertain questions for later review |
| **Total** | **180 min** | A focused pass and diagnostic set, not completion of all 120 questions; reading speed and starting knowledge vary |

If you have only **90 minutes**, use 20 min process models, 25 min Agile/Scrum, 15 min DevOps, 20 min Git state/remote differences and 10 min recall. Start with the corresponding direct-guide sections and test a few changed scenarios; use external sources only to resolve unclear rules. This compressed route will not cover all supplementary depth.

## 7. Closed-book checks: when to move on

These are original learning checks, not past questions or guaranteed exam topics.

1. A team first delivers browsing/cart, then payment. How is that different from repeatedly redesigning the same checkout flow? Identify incremental versus iterative work.
2. Users are unsure about the UI; another project has major technical/security uncertainty. Explain the different purposes of prototyping and spiral risk reduction.
3. Which Scrum accountability orders the Product Backlog? Who plans the work in the Sprint Backlog? Why is the Scrum Master not a task-assigning project manager?
4. Explain Review versus Retrospective. Is a burn-down chart a formal artifact? Does “code written but failing quality checks” count as an Increment?
5. A pipeline builds/tests and prepares releases automatically, but a person approves production. Which kind of CD is it? What changes if that gate is removed?
6. A tracked file starts at version A. You edit to B, stage, then edit to C and commit normally. Which version is committed? What remains in the working tree? Which comparisons do the three diff forms show?
7. A teammate pushes a commit. After you fetch it, has your current local branch necessarily changed? Contrast fetch, pull, commit and push.
8. Explain branch versus clone versus fork and PR versus pull. After resolving merge markers, what steps finish the merge?
9. A published commit is wrong. How does a revert differ from resetting your local branch? How would you unstage a file while keeping its edits?

Move on when you can answer with a reason and handle a changed scenario without the PDF open. Revisit the relevant gap source when you cannot; finishing every page is not the completion criterion.
