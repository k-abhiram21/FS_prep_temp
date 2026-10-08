# Software Engineering: complete FS study guide

**Study this file directly. You do not need to read the college PDFs first.** It teaches the announced topics: process models, Agile and DevOps, Git and GitHub. Read sections 1–9 in order, answer the included MCQs, and use section 10 for final recall.

Test: **9 October 2026**. [Other subject guides](../FS_SUBJECT_NOTES.md).

**Deeper practice:** after learning these explanations, use the [80 hard SE scenario MCQs](FS_SE_Hard_MCQ_Bank.md), with simpler wording, hidden reasoning and four mixed sets of 20. The [learning map](FS_SE_Learning_Map.md) identifies the college coverage, what this guide already fills, and selected external readings for deeper rules.

**ai explnation due to lack of material** — the explanations and examples are AI-authored. The college SE units cover the main topics. This label identifies added teaching; it does not mean those sources are absent.

## 1. What software engineering does

Software engineering is an organized way to develop, deliver, and maintain software. The team must understand the problem, decide how the software will work, write it, check its behavior, and handle later changes.

Use one example throughout this guide: a college needs an attendance application.

| Activity | What the team does |
|---|---|
| Requirements | Agree that each student can have only one attendance record per class. |
| Design | Decide which records, screens, and permission checks will implement that rule. |
| Implementation | Write the program. |
| Testing | Try to add a duplicate; check that the app rejects it. |
| Deployment | Make the app available for teachers to use. |
| Maintenance | Correct defects or adapt the app when the college changes its rules. |

A **requirement** states needed behavior or a constraint. A **process** organizes the development activities. A **process model** arranges them into phases, cycles, or releases. The **software development life cycle**, or SDLC, is the product's development and maintenance path.

### The generic process framework

The college notes use five framework activities:

1. **Communication:** understand users and other stakeholders. A stakeholder is someone affected by the product or its development.
2. **Planning:** estimate work, arrange people and time, and consider risks.
3. **Modeling:** describe requirements and design.
4. **Construction:** write code and test it.
5. **Deployment:** deliver the result, support users, and obtain feedback.

These activities can repeat. They do not require every project to use a rigid sequence.

**Umbrella activities** run across the project. Examples are tracking progress, managing risks, reviewing quality, keeping documentation, and controlling versions. A **task set** identifies the tasks, outputs, and checks needed for an activity. Construction might include writing a permission check, reviewing it, and running its tests.

The layered view has a **quality focus** as its foundation, a **process** that organizes work, **methods** for performing technical work, and **tools** that support it. Installing a tool does not guarantee quality.

### Verification and validation

**Verification** asks whether an output meets its specified requirements. **Validation** asks whether the product meets the user's intended needs.

- Checking that the app rejects duplicate records verifies the stated rule.
- Teachers finding that they cannot correct mistaken attendance exposes an unmet user need during validation.

A program can implement its specification correctly while that specification misses an important need. Reviews can verify requirements or designs before executable code exists.

**Maintenance types:** corrective fixes a defect; adaptive responds to an environment change; perfective improves features or performance; preventive reduces future maintenance problems. A change can serve more than one purpose.

## 2. Process models: understand the order of work

### Waterfall

```text
Requirements → design → implementation → testing → deployment → maintenance
```

The team plans phases and checks their outputs before moving forward. This can suit well-understood requirements and projects needing clear phase records. A late requirement change can force earlier outputs to be revised.

**Example:** after design approval, the college asks for attendance corrections. Requirements, screens, permissions, and tests can all need rework. Waterfall does not physically forbid returning to an earlier phase; its planned structure makes changes more controlled and potentially costly.

### Incremental and iterative development

An **increment** adds usable capability:

```text
Release 1: record attendance
Release 2: add monthly reports
Release 3: add authorized corrections
```

Users receive a useful part before the whole product is complete. The design must allow the parts to work together.

An **iteration** is a cycle that revises a solution. The attendance screen works, but users find it confusing. The next cycle improves that screen.

Incremental describes **added capability**. Iterative describes **repeated improvement**. A project can do both in the same release.

### Prototyping and evolutionary development

A **prototype** is an early representation used to learn. It can be a clickable screen or a small working experiment.

1. Users cannot explain the report they need.
2. The team shows a sample report.
3. Users request daily details instead of monthly totals.
4. The team revises the requirement before building the full report.

A **throwaway prototype** is discarded after learning. An **evolutionary prototype** is improved into the product. A quickly built prototype can need substantial redesign and testing before production use.

**Trap:** a prototype answers an early question. It does not prove that the complete product is ready.

### Spiral model

A **risk** is an uncertain event or condition that can harm the project. Spiral organizes repeated cycles around risks:

```text
Set objectives → identify and reduce risks → develop and check → plan next cycle
```

Suppose reports may be too slow for 50,000 students. Build a small performance experiment before choosing the full design. Use its result to select the next work.

Spiral is recognized by **risk analysis**, rather than repetition alone. It can suit large or uncertain projects, but assessing risks requires effort and skill.

### Concurrent development

Related activities can have different states at the same time. One feature can be in testing, another in design, and a third waiting for a requirement decision. The model records states such as active, under review, awaiting changes, and completed.

Concurrency permits overlap. Dependencies still apply: a test needs behavior that has been defined and implemented.

### Choose by the question's clue

| Main clue | Relevant model or idea |
|---|---|
| Planned sequence of phases | Waterfall |
| Usable functionality arrives in parts | Incremental |
| An existing solution is revised through cycles | Iterative |
| An early sample clarifies unclear requirements | Prototyping |
| Each cycle evaluates risks before choosing work | Spiral |
| Activities occupy different states concurrently | Concurrent development |

No model guarantees defect-free software or is best for every project.

## 3. Agile: use feedback to guide the next work

Agile approaches make useful changes in short cycles and adapt using evidence. If the college changes its correction policy, the team discusses the effect, adjusts priorities, implements a small change, and checks it with teachers.

The four value preferences concern:

- People and their collaboration, with tools and processes supporting them.
- Working software, with useful documentation supporting understanding.
- Customer collaboration, with contracts supporting the relationship.
- Responding to change, with plans providing revisable guidance.

The lower-priority item still has value. Agile does not remove planning, documentation, testing, or responsibility.

### The twelve principles in plain language

1. Deliver useful software early and keep delivering value.
2. Respond to requirement changes, including late changes.
3. Deliver working results frequently.
4. Keep business people and developers in regular collaboration.
5. Support motivated people and trust them to do the work.
6. Use direct conversation to communicate effectively.
7. Judge progress through working software.
8. Maintain a sustainable pace.
9. Keep improving technical quality and design.
10. Avoid work that does not need to be done.
11. Let capable teams organize their work and contribute to design decisions.
12. Reflect on the working process and adjust it regularly.

**Example:** twenty completed slides do not establish that attendance correction works. A checked feature that teachers can use is stronger evidence of product progress.

Official basis: [Agile principles](https://agilemanifesto.org/principles.html). This is a teaching paraphrase.

### Recognize common approaches

| Approach | Recognizing feature |
|---|---|
| Scrum | Sprints, defined accountabilities, artifacts, and inspection events. |
| Kanban | Visualize workflow and limit work in progress. A board alone does not establish effective flow. |
| Extreme Programming, XP | Pair programming, test-driven development, refactoring, and continuous integration. |
| Lean | Reduce waste and improve the flow of useful value. |
| Feature-Driven Development, FDD | Organize development around small client-valued features. |

**Test-driven development:** write a failing test for needed behavior, implement enough to pass, then improve the code while tests continue to pass. **Refactoring:** improve code structure while preserving intended observable behavior.

## 4. Scrum: who does what, and what is inspected?

A **Sprint** is a fixed-length cycle of one month or less. The team works toward a Sprint Goal and produces usable product results.

| Accountability | Responsibility |
|---|---|
| Product Owner | Maximize product value and manage the ordered Product Backlog. |
| Scrum Master | Help establish Scrum and improve team effectiveness. |
| Developers | Create the usable Increment and adapt their delivery plan. |

An **artifact** makes work or results visible:

| Artifact | Meaning | Associated commitment |
|---|---|---|
| Product Backlog | Ordered product work | Product Goal |
| Sprint Backlog | Sprint Goal, selected work, and delivery plan | Sprint Goal |
| Increment | Usable product result | Definition of Done |

The **Definition of Done** states the required quality conditions. Completing many tasks does not replace those conditions.

| Event | Purpose |
|---|---|
| Sprint Planning | Decide why the Sprint matters, what can be done, and how. |
| Daily Scrum | Developers inspect progress toward the Sprint Goal and adjust their plan; 15 minutes. |
| Sprint Review | Inspect the product outcome with stakeholders and adapt future work. |
| Sprint Retrospective | Improve how the team works. |

**Worked distinction:** teachers try the feature and suggest a permission change: Review. Developers identify slow code reviews and agree to review smaller changes: Retrospective.

Scrum relies on **transparency** (make work visible), **inspection** (examine evidence), and **adaptation** (adjust after learning). Its values are commitment, focus, openness, respect, and courage.

An Increment can be delivered before the Sprint ends. The Review is not a mandatory release gate. The Daily Scrum is not defined as a manager status meeting.

Rule reference: [official Scrum Guide](https://scrumguides.org/scrum-guide.html). College examples of two-to-four-week Sprints do not replace the official one-month-or-less limit.

## 5. DevOps and CI/CD

**Development** builds and changes the product. **Operations** runs it and observes behavior. **DevOps** connects those responsibilities through cooperation, automation, and feedback.

```text
Edit → commit → review → build → automated checks → release decision
     → deploy → observe real behavior → improve
```

A **build** turns source into a usable artifact, such as an application package. A **pipeline** arranges automated steps. **Deployment** places a version in an environment. **Monitoring** collects evidence about running behavior, such as errors or response time.

| Term | Meaning | Example |
|---|---|---|
| Continuous integration, CI | Integrate frequent changes with automated build/test feedback. | A commit triggers compilation and checks. |
| Continuous delivery | Keep verified changes ready for production release. | Checks pass, but a person approves promotion. |
| Continuous deployment | Automatically promote changes after the required checks pass. | Release proceeds without a manual production decision. |

**CD** can mean delivery or deployment. Identify whether production promotion is automatic.

**Failure trace:** a duplicate-attendance test fails. A blocking check should stop promotion. The team corrects the change and obtains fresh evidence. Compilation alone cannot establish correct behavior.

**After release:** monitoring finds failed corrections for one teacher role. Operational feedback creates the next development task. Automation helps repeat steps, but it cannot prove that the selected requirements meet every user need.

## 6. Git: understand the three places where content lives

**Git** records version history. A **repository** stores commits and metadata. A **commit** records a snapshot of selected content and links to earlier commits. **HEAD** normally identifies the currently checked-out branch's latest commit.

| Place | What it holds |
|---|---|
| Working tree | Files you are editing. |
| Staging area, or index | Content selected for the next commit. |
| Repository history | Saved commit snapshots. |

### The important Git trace

Start with a file containing `A`:

1. Run `git add notes.txt`. The index now contains `A`.
2. Edit the working file to `B`. The index still contains `A`.
3. Run `git commit`. The commit saves `A`.
4. The working file still contains the unstaged edit `B`.

**Why:** `git add` selects content at that moment. Committing does not silently include later unstaged edits.

| Command | What to predict |
|---|---|
| `git status` | Lists staged, unstaged, and untracked changes. |
| `git add file` | Selects current file content for a future commit. |
| `git diff` | Compares working content with staged content. |
| `git diff --staged` | Compares staged content with the current commit. |
| `git commit` | Records the staged snapshot. |
| `git log` | Displays commit history. |
| `git restore --staged file` | Restores the index entry from HEAD by default; keeps the working edit. |
| `git restore file` | Restores working content from the index by default; can discard an unstaged edit. |

An **untracked file** has not been added to Git's tracking. `.gitignore` rules affect matching untracked files; they do not automatically stop tracking an already committed file.

A local commit works without GitHub or an internet connection. Uploading it is a later action.

## 7. Branches, merges, and recovery

A **branch** is a movable name pointing to a commit. A new branch initially shares its starting commit's history.

```text
          C  main
         /
A ── B
         \
          D  feature
```

Both branches share A and B. Main receives C; feature receives D.

| Command | Action |
|---|---|
| `git switch -c feature` | Create a branch and switch to it. |
| `git switch main` | Switch to an existing branch. |
| `git merge feature` | Integrate feature into the currently checked-out branch. |

If main is still at B and feature has advanced to D, main can move directly to D. This is a **fast-forward**: B is already an ancestor of D.

If main has C and feature has D, the histories diverged. A normal non-fast-forward merge can combine changes in a new commit with both tips as parents. Their common base helps Git determine what each side changed.

A **merge conflict** means Git cannot automatically reconcile a change. Inspect both versions, choose or combine the intended content, remove conflict markers, stage the result, and finish the merge. History is not automatically lost.

| Recovery term | Main distinction |
|---|---|
| `revert` | Creates a new commit reversing a previous change; preserves the history record. |
| `reset` | Moves a branch/reference and can change the index and working tree, depending on mode. |
| `stash` | Temporarily stores suitable uncommitted changes. |
| `rebase` | Replays commits onto another base, producing new commit identities. |

Reset **soft** keeps index and working edits; **mixed** resets the index and keeps working edits; **hard** resets both to the selected commit and can discard local tracked edits. In an MCQ, identify which places the operation changes.

## 8. GitHub and remote collaboration

**GitHub** hosts repositories and collaboration features. A **remote** is a named connection to another repository. `origin` is a conventional name, not a mandatory special server.

| Command or feature | Meaning |
|---|---|
| `clone` | Create a local repository copy and obtain its history. |
| `fetch` | Obtain remote history and update remote-tracking references; does not itself merge into the checked-out branch. |
| `pull` | Fetch, then integrate using the configured merge or rebase behavior. |
| `push` | Send local history and request remote reference updates. |
| Fork | A hosted repository copy under another account or namespace. |
| Pull request, PR | A request to review and integrate changes between branches. |

**Worked path:** clone → create a feature branch → edit → stage → commit → push → open a PR → review and integrate.

A PR does not itself merge changes. A fork is a hosted repository copy; a branch is a line of history within a repository. `pull` and “pull request” describe different actions.

A push can be rejected when the remote has newer history that the proposed update would overwrite. Obtain and integrate the changes, resolve conflicts if needed, then retry.

## 9. Apply the ideas to one scenario

The college requests authorized attendance corrections:

1. Specify permitted staff and the required audit record.
2. Prototype the workflow if users cannot explain it clearly.
3. Deliver a usable feature as an increment; revise it through later iterations.
4. In Scrum, order the work in the Product Backlog and plan a Sprint Goal.
5. Commit staged changes in Git and push them for GitHub review.
6. Use CI checks; identify whether release requires approval or occurs automatically.
7. Validate the workflow with teachers and monitor behavior after release.

For a scenario MCQ, identify the described action before selecting its name.

## 10. Final recall sheet

- Framework: communication, planning, modeling, construction, deployment.
- Verification checks specified requirements; validation checks user needs.
- Waterfall: phases. Incremental: added capability. Iterative: repeated improvement.
- Prototype: learn early. Spiral: manage risks. Concurrent: overlapping activity states.
- Agile: frequent working results and adaptation, with useful planning and documentation.
- Scrum Review inspects the product; Retrospective improves teamwork.
- CI gives integration feedback; delivery keeps releases ready; deployment automates production promotion.
- Working tree → `add` → index → `commit` → local history → `push` → remote.
- A commit saves staged content. Fetch obtains; pull obtains and integrates.
- Fast-forward follows existing ancestry; a merge can combine divergent histories.
- Revert records a reversal; reset modes can move history and alter local state.
- Git manages versions; GitHub provides hosting and collaboration.

## Included MCQ practice

Answer before opening the explanation. For a wrong answer, return to the matching section above. The concepts needed for every question are explained in this guide.

<!-- FS-MCQ-START -->

**ai explnation due to lack of material** — original study questions, not past-paper questions. There are 15 questions in this file.

### Question 1

A team checks whether its attendance app prevents duplicate records, as specified. What is it checking?

- **A.** Whether the market wants any attendance app
- **B.** Whether GitHub has a new release
- **C.** Whether the team uses a particular process model
- **D.** Verification

<details>
<summary>Answer and explanation</summary>

**D. Verification**

The duplicate rule is a specified requirement. Comparing implemented behavior with that rule is verification. Checking whether the app solves the intended user need is validation. A process model describes how work is arranged; it does not replace either check.

</details>

### Question 2

A team revises the existing attendance screen after feedback. What is the most direct description?

- **A.** An iteration improves the current solution
- **B.** A new network layer is created
- **C.** All software history is discarded
- **D.** No development work has occurred

<details>
<summary>Answer and explanation</summary>

**A. An iteration improves the current solution**

The team repeats a development cycle to improve an existing solution. That is iteration. An increment emphasizes added product capability; this example focuses on improving the current screen.

</details>

### Question 3

What happens to a throwaway prototype after it has served its purpose?

- **A.** It proves every requirement is complete
- **B.** It is discarded rather than becoming the production implementation
- **C.** It must always be deployed unchanged
- **D.** It becomes a Git remote

<details>
<summary>Answer and explanation</summary>

**B. It is discarded rather than becoming the production implementation**

A throwaway prototype is built to answer a question. Its implementation is discarded after the team learns from it. An evolutionary prototype follows a different plan and is developed further with suitable quality work.

</details>

### Question 4

Which is stronger evidence of product progress?

- **A.** The number of installed tools alone
- **B.** A plan with no implemented behavior
- **C.** A working attendance correction that users can inspect
- **D.** A large count of slides alone

<details>
<summary>Answer and explanation</summary>

**C. A working attendance correction that users can inspect**

Working behavior lets users evaluate whether the intended capability exists. Documents and tools can help the work, but their quantity alone does not demonstrate that the product solves the user’s problem.

</details>

### Question 5

Which event primarily examines how the team worked and how it can improve?

- **A.** Sprint Review
- **B.** A Git push
- **C.** JSON parsing
- **D.** Sprint Retrospective

<details>
<summary>Answer and explanation</summary>

**D. Sprint Retrospective**

The Retrospective focuses on quality and team effectiveness. The Sprint Review focuses on the product outcome and possible adaptations. Confusing the two hides whether the question concerns the product or the working process.

</details>

### Question 6

A blocking automated test fails. What should the described pipeline do?

- **A.** Stop promotion and provide feedback for correction
- **B.** Promote anyway because the build exists
- **C.** Delete all tests
- **D.** Treat failure as a successful approval

<details>
<summary>Answer and explanation</summary>

**A. Stop promotion and provide feedback for correction**

A blocking check is a release condition. Failing that condition stops promotion. The team uses the result to correct the change; generating an artifact alone is not evidence that the checked requirement passed.

</details>

### Question 7

Does git commit itself upload a commit to GitHub?

- **A.** Only when the file is Java
- **B.** No; it records local history
- **C.** Yes; every repository always has GitHub access
- **D.** Yes; staging uploads the content

<details>
<summary>Answer and explanation</summary>

**B. No; it records local history**

An ordinary commit records a local snapshot. Publishing to a configured remote uses push and depends on access and remote history. Git can be used without GitHub or even without a remote.

</details>

### Question 8

Git reports a merge conflict in one file. What does this mean?

- **A.** The branch name is invalid in every case
- **B.** The file can never be repaired
- **C.** Git needs a decision to combine the conflicting edits
- **D.** Both complete histories are automatically lost

<details>
<summary>Answer and explanation</summary>

**C. Git needs a decision to combine the conflicting edits**

A conflict identifies content Git could not combine automatically. Inspect the intended changes, edit the resolved result, stage it, and complete the merge. A conflict is not proof that the histories or file are irrecoverable.

</details>

### Question 9

Which operation downloads remote history without integrating it into the current branch?

- **A.** git pull in every configuration
- **B.** git commit
- **C.** git add
- **D.** git fetch

<details>
<summary>Answer and explanation</summary>

**D. git fetch**

Fetch retrieves objects and updates remote-tracking references. It does not itself integrate the fetched changes into the current branch. Pull combines fetching with a configured integration action, commonly merge or rebase.

</details>

### Question 10

Which framework activity primarily establishes the needs of users and stakeholders?

- **A.** Only compilation
- **B.** Only version tagging
- **C.** Communication
- **D.** Only deployment

<details>
<summary>Answer and explanation</summary>

**C. Communication**

Communication identifies the need through discussion. Planning arranges work, modeling describes requirements/design, construction builds and tests, and deployment delivers and obtains feedback. Start by matching the described action to its purpose.

</details>

### Question 11

A team replaces support for an obsolete operating environment after that environment changes. Which maintenance purpose is most directly described?

- **A.** Corrective only
- **B.** A merge conflict
- **C.** Throwaway prototyping
- **D.** Adaptive

<details>
<summary>Answer and explanation</summary>

**D. Adaptive**

Adaptive maintenance responds to a changed environment. Corrective maintenance fixes a defect; perfective improves features or performance; preventive reduces future maintenance problems. The environment change is the deciding clue here.

</details>

### Question 12

Which approach is most directly associated with visualizing workflow and limiting work in progress?

- **A.** Kanban
- **B.** Waterfall phase approval only
- **C.** CRC checking
- **D.** A Git hard reset

<details>
<summary>Answer and explanation</summary>

**A. Kanban**

Kanban makes the workflow and current work visible and uses work-in-progress limits to help manage flow. A board is a supporting mechanism, not proof by itself that flow is effective. Scrum emphasizes Sprints and its defined events and artifacts.

</details>

### Question 13

A file contains A when staged. You then edit it to B and commit without staging again. Which content is saved?

- **A.** No content can be committed
- **B.** A
- **C.** B automatically
- **D.** Both versions as the same file content

<details>
<summary>Answer and explanation</summary>

**B. A**

Staging selected A at that moment. Editing the working tree to B did not update the index. A normal commit records the staged snapshot, so B remains an unstaged working edit. Stage again if the intended next snapshot must contain B.

</details>

### Question 14

Main is at B; feature is at D, and B is an ancestor of D. What can a fast-forward integration do?

- **A.** Always require a new two-parent commit
- **B.** Automatically upload D to GitHub
- **C.** Move main directly to D
- **D.** Delete B from every history

<details>
<summary>Answer and explanation</summary>

**C. Move main directly to D**

The feature history already includes main history. Moving the main reference to D includes the added history without reconciling divergent changes. This is a local history operation; uploading still requires a separate remote action.

</details>

### Question 15

Which Git reset mode moves the selected reference while preserving both the index and working edits?

- **A.** Hard
- **B.** Mixed
- **C.** Fetch
- **D.** Soft

<details>
<summary>Answer and explanation</summary>

**D. Soft**

Soft reset preserves index and working-tree content. Mixed resets the index while keeping working edits. Hard resets both to the selected commit and can discard local tracked edits. Fetch obtains remote history rather than selecting a reset mode.

</details>

<!-- FS-MCQ-END -->

## Optional source references

These document the guide's basis. You do not need to read them before studying this file.

- [College SE Unit 1](<Unit-1 Software Engineering (1).pdf>): framework, models, Agile, DevOps; viewer pages 15–55.
- [College SE Unit 2](<Unit-2 Understanding Requirements.pdf>): Git/GitHub; viewer pages 30–50 and 57–66.
- [Pro Git: recording changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).
- [Git restore reference](https://git-scm.com/docs/git-restore).
- [Microsoft: DevOps](https://learn.microsoft.com/en-us/devops/what-is-devops).
