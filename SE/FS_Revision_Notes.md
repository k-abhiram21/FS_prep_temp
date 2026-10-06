# Software Engineering: FS revision notes

For the screening test on **9 October 2026**. Scope: Process models · Agile & DevOps · Git & GitHub.

[All subject notes](../FS_SUBJECT_NOTES.md) · [Visual study website](../Subjects/visualize/README.md)

## How to use these notes

First compare process models. Then trace a change through Agile and CI/CD. Finish by tracing which file content Git stages, commits, and sends to a remote.

Read the quick table first. For each topic, cover the result and work through the example. Explain the MCQ trap in your own words. Finish with the short self-check at the end.

**Teaching provenance: ai explnation due to lack of material.** These are AI-authored explanations and examples, not verbatim college notes. Each topic identifies whether the selected college material covers it, covers it partly, or lacks a focused explanation. The label does not mean that every underlying topic is missing. The writing uses short, direct explanations inspired by ASD-STE100, with technical terms explained through concrete steps.

The notice gives topic names, not an exact question distribution. These notes are revision aids and do not predict the test paper.

## Quick recall

| Topic | Explain it this way |
|---|---|
| Verification / validation | Verification checks specified requirements. Validation checks intended user needs. |
| Increment / iteration | An increment adds usable capability. An iteration revises a solution. A team can do both. |
| Spiral | Identify risks and use evidence to choose the next development work. |
| Agile | Use working results and feedback to adapt. Useful plans and documents still have value. |
| Scrum events | Review: inspect the product outcome. Retrospective: improve how the team works. |
| CI / delivery / deployment | CI gives integration feedback. Delivery keeps changes releasable. Deployment also automates production release. |
| Git snapshot | A commit saves staged content. A later unstaged edit is excluded. |
| fetch / pull / push | Fetch obtains remote history. Pull fetches and integrates. Push sends local history to a remote. |
| Git / GitHub | Git manages version history. GitHub hosts repositories and collaboration features. |

## Reading order

1. What a software process controls
2. Waterfall, incremental and iterative
3. Prototypes, spiral and concurrent work
4. Agile values in a real change
5. Scrum: people, events and artifacts
6. DevOps and CI/CD
7. Git: working tree, staging and commits
8. Branches, merges and recovery
9. GitHub and remote collaboration

## 1. What a software process controls

**Main idea:** Follow a request from a need to maintained software.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A software process organizes the work needed to build and maintain software. It identifies activities, outputs, responsibilities, and checks.

A process model arranges those activities. A model can use sequential phases, repeated cycles, or small releases.

Consider a college attendance app. The team must agree on attendance rules before it can check whether the implemented app follows them.

### Worked example

```text
Need: record attendance
Requirement: one record per student per class
Check: reject a second record for the same class
```

**Result and interpretation:** A stated requirement gives the team a result that it can test.

### Follow the steps

1. **Agree on a need:** Students need attendance records. Identify the user and the problem first.
2. **Specify behavior:** One record per student and class. Replace a vague request with a checkable rule.
3. **Build and check:** Try to add a duplicate record. A test can compare the actual result with the requirement.
4. **Maintain:** Change the rules when the college changes its policy. Delivered software can require corrections and improvements.

**Why this works:** Testing compares observed behavior with the agreed requirement. Reviews can also inspect requirements and designs before executable code exists.

**MCQ trap:** A process model does not guarantee defect-free software. Teams still need appropriate skills, checks, and feedback.

| Distinction | Meaning |
|---|---|
| Requirement | The behavior that a user or system needs. |
| Design | The structure selected to produce that behavior. |
| Verification | Check whether an output meets its specified requirements. |
| Validation | Check whether the product meets the intended user needs. |

**College sources:** [Unit-1 Software Engineering (1).pdf](<../SE/Unit-1 Software Engineering (1).pdf>).

## 2. Waterfall, incremental and iterative

**Main idea:** Choose a model by how the work and feedback are arranged.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Waterfall organizes work into a sequence of phases. Changes to approved earlier work usually need controlled rework.

Incremental development delivers usable parts of the product. Iterative development revises a solution through repeated cycles. A team can use both.

For an attendance app, an increment could add reports after basic attendance works. An iteration could improve the existing attendance screen.

### Worked example

```text
Release 1: record attendance
Release 2: add monthly reports
Iteration: revise the attendance screen
```

**Result and interpretation:** New functionality is an increment. Improvement of an existing solution is an iteration.

### Follow the steps

1. **Requirements:** Attendance rules are agreed. This trace shows a simplified Waterfall path.
2. **Design:** Choose records, screens and validation rules. Define how the app will implement the agreed behavior.
3. **Implement and test:** Build the design and check duplicate handling. Phase outputs guide the next activity.
4. **Deliver and maintain:** Release the app and process later changes. Later changes can require controlled rework.

**Why this works:** A smaller release can provide feedback before the entire product is complete. A sequential plan can make agreed phase outputs easier to track.

**MCQ trap:** Do not interpret Waterfall as physically preventing every return to an earlier phase. The key distinction is its planned phase structure.

| Distinction | Meaning |
|---|---|
| Waterfall | Plan sequential phases; changes can cause earlier work to be repeated. |
| Incremental | Add usable functionality in successive releases. |
| Iterative | Revise the solution using feedback. |
| Choice | Consider uncertainty, risks, user access, and release constraints. |

**College sources:** [Unit-1 Software Engineering (1).pdf](<../SE/Unit-1 Software Engineering (1).pdf>).

## 3. Prototypes, spiral and concurrent work

**Main idea:** Use feedback and risk to decide what to do next.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A prototype lets users examine an early version or model. It can reveal requirements that were difficult to state in advance.

A throwaway prototype is discarded after learning. An evolutionary prototype is developed further. Neither choice makes an untested shortcut production-ready.

The spiral model organizes repeated cycles around objectives, risks, development, and planning. Risk analysis is its central feature.

Concurrent development allows related activities to have different states at the same time. It does not mean that dependencies disappear.

### Worked example

```text
Risk: users may misunderstand the report
Experiment: show a sample report
Finding: users need a daily view
Decision: revise the design before building the full report
```

**Result and interpretation:** The experiment removes uncertainty before a larger investment.

### Follow the steps

1. **Set objectives:** Create an attendance report users can interpret. State what this cycle must achieve.
2. **Evaluate risk:** Users may need daily details rather than totals. Identify a specific uncertainty.
3. **Develop and check:** Show a small report prototype to users. Collect evidence about that uncertainty.
4. **Plan the next cycle:** Build the daily view with the confirmed requirement. Use the result to select the next work.

**Why this works:** A small experiment can expose a costly mistake early. The next cycle uses what the team learned rather than blindly repeating the same plan.

**MCQ trap:** Spiral is not simply Waterfall drawn as a circle. Identify the risk and the action used to reduce it.

| Distinction | Meaning |
|---|---|
| Prototype | Explore a question with an early representation. |
| Spiral | Choose development work after evaluating risk. |
| Concurrent | Track overlapping activities and their states. |

**College sources:** [Unit-1 Software Engineering (1).pdf](<../SE/Unit-1 Software Engineering (1).pdf>).

## 4. Agile values in a real change

**Main idea:** Connect early delivery, feedback and adaptation.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Agile approaches use short feedback cycles to respond to change. Working software provides evidence that the team has delivered useful behavior.

Agile values people, working software, collaboration, and responding to change. Plans, tools, contracts, and documentation can still have value.

Suppose the college changes an attendance rule. The team discusses the effect, revises priorities, implements a small change, and checks it with users.

### Worked example

```text
Original rule: mark attendance once
New need: allow an authorized correction
Small delivery: add an audited correction action
```

**Result and interpretation:** Feedback can change the next priority without removing the need for tests.

### Follow the steps

1. **Prioritize:** An authorized correction is the highest-value change. Select a small useful result.
2. **Build a small change:** Record who corrected attendance and why. Deliver enough behavior for a meaningful check.
3. **Inspect with users:** Teachers try the correction flow. Check whether the result solves the real problem.
4. **Adapt the next plan:** Clarify permissions before the next change. Use feedback to revise priorities.

**Why this works:** Frequent usable results let users check actual behavior. The team can adjust before it spends months following an incorrect assumption.

**MCQ trap:** Agile does not mean no planning, no documentation, or no discipline. A team must still manage quality and a sustainable workload.

| Distinction | Meaning |
|---|---|
| Plan | Useful guidance that can change when evidence changes. |
| Feedback | Information from users, tests, and delivered behavior. |
| Adaptation | Adjust the work after inspecting that information. |

**College sources:** [Unit-1 Software Engineering (1).pdf](<../SE/Unit-1 Software Engineering (1).pdf>).

**Official references:** [Agile Manifesto: principles](https://agilemanifesto.org/iso/en/principles.html).

## 5. Scrum: people, events and artifacts

**Main idea:** Distinguish the goal, the work, and the feedback events.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Scrum is a framework for work on complex problems. A Scrum Team includes a Product Owner, a Scrum Master, and Developers.

The Product Owner is accountable for maximizing product value. The Scrum Master helps establish Scrum and improve team effectiveness. Developers create a usable Increment.

The Product Backlog contains ordered product work. The Sprint Backlog contains the Sprint Goal, selected items, and the delivery plan.

A Sprint lasts one month or less. The Sprint Review inspects the product outcome. The Retrospective examines how the team worked.

### Worked example

```text
Sprint Goal: teachers can correct attendance
Selected work: permission check, correction screen, audit record
Done: the Increment meets the Definition of Done
```

**Result and interpretation:** Completing selected tasks is insufficient if the result is not usable and does not meet the Definition of Done.

### Follow the steps

1. **Product Backlog:** The correction feature is ordered by value. The Product Owner manages the product direction.
2. **Sprint Planning:** The team sets a correction-related Sprint Goal. Select work and plan how to deliver it.
3. **Develop an Increment:** Build, test and meet the Definition of Done. Inspect progress during the Sprint.
4. **Review and improve:** Inspect the product, then the way the team worked. Review and Retrospective answer different questions.

**Why this works:** The artifacts make the product direction, current plan, and delivered result visible. Each event provides a specific opportunity to inspect or adapt.

**MCQ trap:** The Daily Scrum is for Developers to inspect progress toward the Sprint Goal. It is not defined as a manager status-report meeting.

| Distinction | Meaning |
|---|---|
| Planning | Decide why the Sprint is valuable, what can be done, and how. |
| Daily Scrum | Inspect progress and adapt the current plan. |
| Review | Inspect the outcome with stakeholders. |
| Retrospective | Improve quality and effectiveness of the team’s work. |

**College sources:** [Unit-1 Software Engineering (1).pdf](<../SE/Unit-1 Software Engineering (1).pdf>).

**Official references:** [Official Scrum Guide](https://scrumguides.org/scrum-guide.html).

## 6. DevOps and CI/CD

**Main idea:** Follow a change through checks and release decisions.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

DevOps connects development and operations through shared responsibility, feedback, and automation. A tool alone does not create this cooperation.

Continuous integration combines frequent changes with automated build and test feedback. A failing check must receive attention before promotion.

Continuous delivery keeps verified changes ready for release. Continuous deployment also automates production release after the required checks pass.

Monitoring checks behavior after release. A successful build does not prove that a live service meets every user need.

### Worked example

```text
Change → review → build → tests → release decision → deployment → monitoring
```

**Result and interpretation:** An automatic production release distinguishes continuous deployment from a delivery process with manual approval.

### Follow the steps

1. **Commit and review:** A correction feature is accepted. Save and inspect the change.
2. **Build:** The pipeline produces the application artifact. Use a repeatable process.
3. **Check:** Blocking tests pass. A failed check stops promotion.
4. **Release and observe:** Release the verified change and measure behavior. Approval can be manual or automatic, depending on the process.

**Why this works:** Small changes and repeatable checks can reveal defects earlier. Operational feedback helps the team identify problems that pre-release checks did not reveal.

**MCQ trap:** CI is not the same as production deployment. A green build can still wait for an approval or a scheduled release.

| Distinction | Meaning |
|---|---|
| CI | Integrate changes and obtain automated build/test feedback. |
| Continuous delivery | Keep verified changes releasable; promotion can require approval. |
| Continuous deployment | Automate production promotion after the configured gates. |

**College sources:** [Unit-1 Software Engineering (1).pdf](<../SE/Unit-1 Software Engineering (1).pdf>).

**Official references:** [Microsoft: DevOps](https://learn.microsoft.com/en-us/devops/what-is-devops).

## 7. Git: working tree, staging and commits

**Main idea:** Predict exactly which edit a commit will save.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

The working tree contains the files you edit. The staging area records the content selected for the next commit.

A commit records the staged snapshot and its history relationships. It does not automatically include every later edit in the working tree.

If you edit a file after git add, the staged version and the current file can differ. Check both differences before committing.

### Worked example

```text
Edit report.txt to A
git add report.txt
Edit report.txt to B
git commit -m "Save report"
```

**Result and interpretation:** The commit saves A. B remains as a working-tree change.

### Follow the steps

1. **Edit:** Working tree = A. The edit is not staged yet.
2. **Stage:** Index = A. git add selects the current file content.
3. **Edit again:** Working tree = B; index = A. The second edit does not replace the staged snapshot automatically.
4. **Commit:** HEAD records A; B remains changed. The commit records the index.

**Why this works:** Staging lets you select a coherent snapshot. Git can record that snapshot even when other unfinished edits remain in the working tree.

**MCQ trap:** git commit saves locally. It does not upload the commit to GitHub. git push transfers commits to a configured remote.

| Distinction | Meaning |
|---|---|
| git diff | Compare unstaged working-tree changes with the index. |
| git diff --cached | Compare the staged content with HEAD. |
| git status | Summarize tracked, staged and untracked state. |
| git log | Inspect recorded commit history. |

**College sources:** [Unit-2 Understanding Requirements.pdf](<../SE/Unit-2 Understanding Requirements.pdf>).

**Official references:** [Pro Git: recording changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).

## 8. Branches, merges and recovery

**Main idea:** Treat a branch as a name for a commit history.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A Git branch is a movable reference to a commit. Creating a branch does not duplicate every file into another physical folder.

A fast-forward merge moves a branch reference to a descendant commit. A three-way merge combines changes using a common ancestor.

A conflict requires a decision when Git cannot combine edits automatically. Resolve the content, stage it, and finish the merge.

git revert creates a new commit that reverses a chosen commit’s effect. git reset changes references and can also change the index or files.

### Worked example

```text
main: A → B
feature: A → B → C
Merge feature into main: main can move from B to C.
```

**Result and interpretation:** This merge can fast-forward because main has no separate commit after B.

### Follow the steps

1. **Common history:** Both names point at B. The feature begins from the current shared commit.
2. **Feature commit:** feature points at C; main remains at B. A commit advances the current branch.
3. **Check ancestry:** B is an ancestor of C. There is no divergent main commit in this example.
4. **Fast-forward:** main now points at C. No new merge commit is required for this path.

**Why this works:** History relationships determine the merge operation. File contents alone do not tell you whether a fast-forward is possible.

**MCQ trap:** A conflict is not automatically a lost file. Inspect both intended changes before selecting the resolved result. Revert does not erase the old commit.

| Distinction | Meaning |
|---|---|
| Branch | A movable name pointing to a commit. |
| Merge | Integrate another history into the current branch. |
| Revert | Record an inverse change as a new commit. |
| Reset | Move the current branch; effects depend on the mode. |

**College sources:** [Unit-2 Understanding Requirements.pdf](<../SE/Unit-2 Understanding Requirements.pdf>).

**Official references:** [Pro Git: recording changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).

## 9. GitHub and remote collaboration

**Main idea:** Separate local history from a hosted repository.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

Git is the version-control system. GitHub hosts repositories and provides collaboration features such as pull requests and reviews.

clone creates a local copy of a repository and configures a remote. fetch updates remote-tracking information without integrating it into your current branch.

pull fetches and then integrates, usually by merge or rebase according to configuration. push requests an update to a remote branch.

A fork is a hosted repository copy. A branch is a reference inside a repository. A pull request proposes a change for discussion and integration.

### Worked example

```text
Local: commit C
Remote: commit B
git push origin main
Remote can move to C if permissions and history checks allow it.
```

**Result and interpretation:** Local and remote branch states can differ until they exchange commits.

### Follow the steps

1. **Clone:** A local repository starts from the hosted history. Download the repository and configure origin.
2. **Commit locally:** The local branch gains C. Saving local history does not publish it.
3. **Push:** The remote accepts C. History and permissions must allow the update.
4. **Collaborate:** A pull request can request review. Review and merge are separate collaboration actions.

**Why this works:** The separation lets developers work locally and share reviewed history later. A remote can reject a push when it would overwrite divergent history.

**MCQ trap:** A pull request does not automatically merge itself. git pull is a Git operation; a GitHub pull request is a collaboration object.

| Distinction | Meaning |
|---|---|
| fetch | Download objects and update remote-tracking references. |
| pull | Fetch, then integrate into the current branch. |
| push | Request a remote branch update. |
| fork | Create a hosted copy under another owner. |

**College sources:** [Unit-2 Understanding Requirements.pdf](<../SE/Unit-2 Understanding Requirements.pdf>).

**Official references:** [Pro Git: recording changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).

## Self-check: one question per topic

**ai explnation due to lack of material** — original revision questions, not past-paper questions. Try them before opening the answer. The full website provides four questions per topic.

### 1. What a software process controls

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

### 2. Waterfall, incremental and iterative

A later release adds reports to an already usable attendance app. Which term best describes the added capability?

- **A.** Compiler optimization
- **B.** Packet encapsulation
- **C.** A Git merge conflict
- **D.** Increment

<details>
<summary>Answer and explanation</summary>

**D. Increment**

An increment adds usable capability. An iteration revises a solution through a cycle. This release introduces reports that the earlier usable product did not provide. The two approaches can occur together, but the added capability is an increment.

</details>

### 3. Prototypes, spiral and concurrent work

What is the defining emphasis of the spiral model?

- **A.** Never examining requirements
- **B.** Using a circular user interface
- **C.** Deploying before every test
- **D.** Evaluating and reducing risks during repeated cycles

<details>
<summary>Answer and explanation</summary>

**D. Evaluating and reducing risks during repeated cycles**

A spiral cycle identifies objectives, evaluates risks, performs appropriate development work, and plans the next cycle. Its risk emphasis distinguishes it from simply repeating a fixed list of phases.

</details>

### 4. Agile values in a real change

Which action best uses an Agile feedback cycle?

- **A.** Ignore feedback until the entire product is finished
- **B.** Avoid every written requirement
- **C.** Choose tools instead of discussing user needs
- **D.** Deliver a small useful change, inspect it with users, then revise priorities

<details>
<summary>Answer and explanation</summary>

**D. Deliver a small useful change, inspect it with users, then revise priorities**

A small usable result provides evidence. Users can check its actual behavior, and the team can adjust its next plan. Agile does not remove planning or documentation; it uses them alongside feedback and adaptation.

</details>

### 5. Scrum: people, events and artifacts

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

### 6. DevOps and CI/CD

A pipeline builds and tests changes, then waits for a human production approval. Which distinction applies?

- **A.** It necessarily performs continuous deployment
- **B.** It cannot perform CI
- **C.** It has no release process
- **D.** It supports continuous delivery; production promotion is not fully automatic

<details>
<summary>Answer and explanation</summary>

**D. It supports continuous delivery; production promotion is not fully automatic**

Continuous delivery keeps verified changes ready for release and can retain an approval step. Continuous deployment also automates production promotion after the required gates. A build/test pipeline can provide CI in either arrangement.

</details>

### 7. Git: working tree, staging and commits

You stage file content A, then edit it to B without staging again. What does the next ordinary commit record for that file?

- **A.** B automatically
- **B.** Both as separate commits automatically
- **C.** Neither because a second edit is forbidden
- **D.** A

<details>
<summary>Answer and explanation</summary>

**D. A**

git add selected content A for the index. Editing the working-tree file afterward does not replace that selection. The commit records A, and the unstaged difference toward B remains in the working tree.

</details>

### 8. Branches, merges and recovery

What is a Git branch at the history level?

- **A.** A mandatory physical copy of every file
- **B.** A separate GitHub account
- **C.** A syntax rule for JavaScript
- **D.** A movable reference to a commit

<details>
<summary>Answer and explanation</summary>

**D. A movable reference to a commit**

The branch name points to a commit. Making a commit on that branch advances the reference. Git can switch the working tree to another branch without creating a second physical project folder.

</details>

### 9. GitHub and remote collaboration

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

## Source reading targets

- [Unit-1 Software Engineering (1).pdf](<../SE/Unit-1 Software Engineering (1).pdf>) — Process models, Agile and DevOps; viewer pages 15–55.
- [Unit-2 Understanding Requirements.pdf](<../SE/Unit-2 Understanding Requirements.pdf>) — Git and GitHub; viewer pages 30–50 and 57–66.

College files can include material outside the announced topics. Read the selected sections. The examples above use fixed inputs for explanation; some original class examples use random outcomes.
