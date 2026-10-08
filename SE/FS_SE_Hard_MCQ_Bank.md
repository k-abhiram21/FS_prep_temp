# SE: 80 hard scenario MCQs

**Pre-FS screening: 9 October 2026.** Scope: **Process Models; Agile & DevOps; Git & GitHub**. Revised on 8 October. This existing bank was reduced from 120 to 80 selected questions and renumbered. It covers every announced SE area with fewer repeated cases and shorter wording.

Choose **one best answer**. Answers stay hidden below each question. Read the correct rule and the explanation of your nearest wrong choice. Use the [direct study guide](FS_Revision_Notes.md) first if a term is new; the [learning map][map] gives college pages and selected sources. Scrum rules follow the 2020 Scrum Guide; Git rules follow the official manuals.

## Coverage

| Area | Questions | Focus |
|---|---|---|
| Process models | SE001-SE016 (16) | Model choice, iteration/increments, prototypes, risk, overlap and feedback |
| Agile and Scrum | SE017-SE036 (20) | Values, roles, Goal/Done, events, artifacts, WIP, TDD and refactoring |
| DevOps | SE037-SE054 (18) | CI/delivery/deployment, checks, approvals, artifacts, rollout and feedback |
| Git and GitHub | SE055-SE080 (26) | Staging, diffs, undo, branches, merges, conflicts, remote state and PRs |

**31 code traces:** 8 Java pipeline questions (SE045-SE052) and 23 Git command questions (SE055-SE077). The Java programs apply the policy stated in each question. Process models use choices and one stated transition rule.

## Four mixed sets of 20

Try one set in **20 minutes** with answers closed, then review mistakes. Longer code questions may take extra time while learning. These are subject-only drills; the exam's 30 MCQs cover all subjects. Every bank question appears in exactly one set.

| Set | Process | Agile | DevOps | Git | Attempt order |
|---|---:|---:|---:|---:|---|
| 1 | 4 | 5 | 4 | 7 | [SE016](#se016), [SE013](#se013), [SE064](#se064), [SE020](#se020), [SE048](#se048), [SE077](#se077), [SE058](#se058), [SE042](#se042), [SE050](#se050), [SE054](#se054), [SE070](#se070), [SE003](#se003), [SE033](#se033), [SE073](#se073), [SE002](#se002), [SE060](#se060), [SE024](#se024), [SE062](#se062), [SE022](#se022), [SE017](#se017) |
| 2 | 4 | 5 | 4 | 7 | [SE069](#se069), [SE080](#se080), [SE025](#se025), [SE015](#se015), [SE044](#se044), [SE056](#se056), [SE052](#se052), [SE046](#se046), [SE079](#se079), [SE036](#se036), [SE011](#se011), [SE071](#se071), [SE074](#se074), [SE008](#se008), [SE032](#se032), [SE027](#se027), [SE005](#se005), [SE037](#se037), [SE018](#se018), [SE075](#se075) |
| 3 | 4 | 5 | 5 | 6 | [SE038](#se038), [SE055](#se055), [SE061](#se061), [SE028](#se028), [SE012](#se012), [SE031](#se031), [SE047](#se047), [SE066](#se066), [SE010](#se010), [SE021](#se021), [SE076](#se076), [SE023](#se023), [SE053](#se053), [SE049](#se049), [SE067](#se067), [SE043](#se043), [SE009](#se009), [SE007](#se007), [SE078](#se078), [SE035](#se035) |
| 4 | 4 | 5 | 5 | 6 | [SE039](#se039), [SE019](#se019), [SE059](#se059), [SE034](#se034), [SE029](#se029), [SE045](#se045), [SE001](#se001), [SE057](#se057), [SE068](#se068), [SE040](#se040), [SE004](#se004), [SE041](#se041), [SE063](#se063), [SE014](#se014), [SE026](#se026), [SE065](#se065), [SE051](#se051), [SE006](#se006), [SE072](#se072), [SE030](#se030) |

For a mistake, write the rule you missed and why the closest wrong choice fails. Reattempt with changed values when possible.

## Code assumptions

### Java

Each Java block is a separate complete Java 17 program named Main. Use only the supplied values and release policy. A printed true means the shown expression is true; check what that variable represents.

### Base Git fixture

Every Git question starts fresh unless it says to use the remote fixture:

- The branch is main with one commit named base.
- The only tracked file is f.txt, containing A and a newline. HEAD, index and working file agree; status is clean.
- There are no remotes, untracked files, custom hooks or aliases. Run commands in the repository root.
- A dummy local author is set. Line-ending conversion and signing are off. Bash and a modern Git with switch/restore are available.
- A failed command does not stop later lines unless the script says so.

In choices, **/** separates printed lines. Status spaces matter: M in the first column means a staged change; M in the second means a working-file change. clean means no status output. HEAD is the current commit; :f.txt reads the index (staged snapshot).

### Remote Git fixture

Start with the base fixture plus a temporary local bare server called origin. Server main, local main and a peer clone all start at base; local main tracks origin/main. Both clones use dummy authors. SE_REMOTE is the server's absolute path; SE_PEER is the peer clone's absolute path. Each question starts fresh. These examples use local temporary repositories.

## Process models

<a id="se001"></a>
### SE001 — Identifying a process model

A team uses requirements, design, coding, testing and maintenance. A manager says this list proves it uses Waterfall. Which answer is best?

A. Maintenance alone proves the original process was iterative.

B. The list is not enough; check how the activities are arranged and repeated.

C. Starting with requirements proves Waterfall, even if later cycles repeat both requirements and design.

D. The complete list proves the process is sequential.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The list is not enough; check how the activities are arranged and repeated.**

These activities appear in many models. Their order, overlap and repeated use tell you which model the team follows.

**Why the other choices fail:**

- **A:** Maintenance alone does not identify the organization of the original development process.
- **C:** An initial requirements discussion also fits iterative development; the later organization matters.
- **D:** Completeness of the list does not show whether activities overlap or repeat.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se002"></a>
### SE002 — Two projects in the same industry

Banking project X has stable requirements and formal approval at each phase. Project Y uses an untested fraud-detection method. Which plan best fits these facts?

A. A sequential plan may suit X; Y should focus on reducing technical risk.

B. Y should first test feasibility during final acceptance testing.

C. Both must use Spiral because all banking projects have the same risk.

D. Both must use Waterfall because banks need documents.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A sequential plan may suit X; Y should focus on reducing technical risk.**

Stable requirements and phase approvals may suit a sequential plan. Y should test its uncertain technology before committing to the full system.

**Why the other choices fail:**

- **B:** That delays discovery of the uncertainty that could invalidate the whole plan.
- **C:** A domain label does not show the specific uncertainty or risk of each project.
- **D:** Documentation requirements do not prohibit experimentation or risk-driven cycles.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se003"></a>
### SE003 — Adding a feature and revising a feature

Release 1 has search. Release 2 adds payment and improves search after feedback. Which description fits both changes?

A. Both are only incremental because every revision is a new feature.

B. Both changes are only iterative because there is a second release.

C. The two changes make this Waterfall.

D. Adding payment is incremental; improving search is iterative. The approach uses both.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Adding payment is incremental; improving search is iterative. The approach uses both.**

Incremental work adds capability. Iterative work improves existing work. A cycle can do both.

**Why the other choices fail:**

- **A:** Improving an existing capability need not add a distinct capability.
- **B:** Repeated release alone does not erase the addition of new functionality.
- **C:** No strictly sequential phase organization is shown.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se004"></a>
### SE004 — Discarding a prototype

A quick UI prototype shows that users need a different workflow. The team discards its code and uses the findings to design the real system. Was the prototype useful?

A. It should be released unchanged because users liked its appearance.

B. It failed because every useful prototype must become the final product.

C. Yes; it reduced uncertainty about requirements even though its code was discarded.

D. Discarding the code proves the requirements were complete from the start.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Yes; it reduced uncertainty about requirements even though its code was discarded.**

A throwaway prototype succeeds when it answers the learning question. Its code does not need to become production code.

**Why the other choices fail:**

- **A:** Interface feedback does not show production quality, safety or maintainability.
- **B:** That confuses disposable and evolutionary prototyping.
- **D:** The discovered workflow is evidence of new understanding.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se005"></a>
### SE005 — Turning a prototype into a product

A team turns a quick prototype into the product. Users like the UI, but its temporary data model cannot enforce required consistency rules. What should the team do next?

A. Keep the temporary model because evolutionary prototyping forbids major design changes.

B. Build another throwaway prototype and assume the new process name removes the risk.

C. Fix the production design and verify the rules before using it as the product.

D. Keep the UI feedback and postpone consistency checks until production.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Fix the production design and verify the rules before using it as the product.**

Good UI feedback does not prove that the data model is safe. An evolving prototype still needs sound design and checks.

**Why the other choices fail:**

- **A:** Evolutionary prototyping permits correction. Continuity is not a requirement to retain known design defects.
- **B:** Discarding one implementation can help, but a label alone does not demonstrate that the next design enforces the constraints.
- **D:** UI feedback does not show the required consistency property; monitoring does not supply missing enforcement.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se006"></a>
### SE006 — Repeated cycles and Spiral

Team A repeats design, code and test monthly. Team B reviews goals and options, tackles the main risks, then chooses development work and plans the next cycle. Which conclusion follows?

A. B is only incremental because resolving a risk always adds a usable feature.

B. Only A uses Spiral; B's planning makes it Waterfall.

C. B shows risk-driven planning; A's repetition alone does not prove Spiral.

D. Both use Spiral because repeated testing automatically counts as risk analysis.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — B shows risk-driven planning; A's repetition alone does not prove Spiral.**

Spiral uses risk to guide the work in each cycle. Repeating activities alone does not show that risk guides the process.

**Why the other choices fail:**

- **A:** Risk reduction can involve analysis or experiments without a feature release.
- **B:** Planning within a risk-driven cycle is compatible with Spiral.
- **D:** Testing and repetition alone do not show that risks drive objectives, alternatives and work selection.

**Rule/source:** [Sommerville: spiral development][spiral].

</details>

<a id="se007"></a>
### SE007 — Choosing the first experiment

The main risk is whether a new sensor interface can respond within 20 ms. The screens and user roles are already clear. Which activity should come first?

A. Prototype the known screens first because visible UI work must always come first.

B. Run a small timing experiment on the sensor connection.

C. Remove the timing requirement without asking stakeholders.

D. Implement every feature before measuring response time.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Run a small timing experiment on the sensor connection.**

Test the uncertain sensor timing directly. The result can change whether the design is feasible.

**Why the other choices fail:**

- **A:** That does not test the dominant timing uncertainty. Stakeholder visibility alone does not show that the product can meet the constraint.
- **C:** Deleting a constraint is not the same as satisfying or legitimately renegotiating it.
- **D:** That invests broadly before resolving the feasibility issue.

**Rule/source:** [Sommerville: spiral development][spiral].

</details>

<a id="se008"></a>
### SE008 — Activities that overlap

UI design, backend coding and testing overlap. A payment API change affects two activities. What does concurrent development need here?

A. Coordinate the affected states and dependencies while work continues to overlap.

B. Allow each activity to use any API version without coordination.

C. Restart every activity from requirements, including unaffected work.

D. Treat the API change as proof that concurrent work was impossible.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Coordinate the affected states and dependencies while work continues to overlap.**

Activities can overlap and still depend on each other. A shared change needs coordination and checks in the affected work.

**Why the other choices fail:**

- **B:** Different concurrent states still need consistent dependencies and coordination.
- **C:** The scenario shows affected dependencies, not a mandatory global restart.
- **D:** Concurrency does not guarantee no changes; it requires managing their effects.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se009"></a>
### SE009 — Checks across the lifecycle

A team does configuration control and risk reviews during requirements, design, coding and deployment. Are these unnecessary repeats of a final phase?

A. Yes; risk reviews belong only after deployment.

B. Yes; changes within a phase cannot affect a baseline, so checks belong only at phase boundaries.

C. No; these support activities are expected across the development process.

D. Yes; configuration control belongs only before requirements.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — No; these support activities are expected across the development process.**

These are umbrella activities: they support several stages of development rather than forming one final step.

**Why the other choices fail:**

- **A:** Early risk work can prevent costly wrong commitments.
- **B:** Relevant changes and risks can arise during a phase; cross-cutting control is not limited to a terminal or boundary activity.
- **D:** Changes and baselines need control throughout development.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se010"></a>
### SE010 — Changes after a demo

A team accepts changes after each prototype demo but stops regression testing to save time. What is the main problem?

A. Accepting feedback guarantees that existing features still work.

B. The process allows feedback, but skipping checks can make later versions unreliable.

C. Prototypes never need tests.

D. Any customer change means the team must switch to Waterfall.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The process allows feedback, but skipping checks can make later versions unreliable.**

Changing the product is allowed. The team still needs to check that the changes have not broken working features.

**Why the other choices fail:**

- **A:** Change can introduce regressions regardless of the process label.
- **C:** Tests can still be essential to evaluate the behaviour being explored.
- **D:** Change alone does not show that a sequential model would fit.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se011"></a>
### SE011 — An early usable increment

A plan promises early user value. Its first delivery is only a database; users cannot perform any task until the UI and service arrive months later. What is wrong with calling it a usable increment?

A. Calling it an iteration removes the need to meet the early-value promise.

B. It delivers one technical layer rather than the promised usable capability.

C. A valid increment must contain every final feature.

D. Passing the database tests alone proves users can use the delivery.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — It delivers one technical layer rather than the promised usable capability.**

A technical layer may help the team internally. It does not yet deliver the usable workflow promised to users.

**Why the other choices fail:**

- **A:** Changing the label does not satisfy the promised capability.
- **C:** A subset of capabilities can still be coherent and usable.
- **D:** Internal tests do not show that users can complete the promised end-to-end task.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se012"></a>
### SE012 — Rework in a sequential project

System testing finds a design error in a sequential project. The team returns to design through formal change control. Which statement is best?

A. Approval means the affected behavior does not need retesting.

B. Rework is possible, but changing earlier decisions can add cost and coordination.

C. Returning to design removes all cost and feedback limits of sequential work.

D. One correction proves the whole project was iterative from the start.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Rework is possible, but changing earlier decisions can add cost and coordination.**

A sequential plan can allow correction. Reopening earlier decisions can still cost time and require extra coordination.

**Why the other choices fail:**

- **A:** Approval authorizes or controls a change; it does not show implementation correctness.
- **C:** The possibility of rework does not remove its engineering or coordination cost.
- **D:** A local rework loop does not show the organizing model of the whole project.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se013"></a>
### SE013 — What a UI prototype proves

A prototype uses made-up responses to test navigation. Users finish the workflow quickly. Which claim goes beyond the evidence?

A. Users could follow the navigation shown in the demo.

B. User feedback can help improve the workflow.

C. The real backend can handle the required peak transaction load.

D. Backend performance still needs a separate check.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The real backend can handle the required peak transaction load.**

This test shows how users navigate the demo. It does not measure the real backend's performance.

**Why the other choices fail:**

- **A:** That is directly supported by the observed task.
- **B:** Feedback is precisely the prototype's purpose.
- **D:** It was not exercised representatively.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se014"></a>
### SE014 — Following activity states

Use these rules: reviewPass changes UnderReview to Baselined; reviewFail changes it to AwaitingChanges; editing changes AwaitingChanges to UnderRevision. Start at UnderReview and apply reviewFail, then editing. What is the final state?

A. Baselined; finishing a review always means approval.

B. UnderRevision; the activity is being fixed after review feedback.

C. Done; any two events finish an activity.

D. AwaitingChanges; editing does not change the state.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — UnderRevision; the activity is being fixed after review feedback.**

Apply both rules in order: UnderReview -> AwaitingChanges -> UnderRevision. Other activities need not be in the same state.

**Why the other choices fail:**

- **A:** reviewFail is expressly different from reviewPass.
- **C:** Completion depends on transition meaning, not event count.
- **D:** The supplied transition explicitly makes it affect state.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se015"></a>
### SE015 — A shared change breaks earlier work

Each capability passes its own tests. A later authentication change breaks two earlier capabilities. Which improvement best addresses this problem?

A. Test only the newest capability; earlier acceptance covers all future combinations.

B. Treat the new authentication component's tests as enough evidence for all earlier features.

C. Freeze old tests because a previously accepted increment cannot later break.

D. Check integrated behavior and regressions as shared components and increments change.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Check integrated behavior and regressions as shared components and increments change.**

Features can pass separate tests and still fail together. Check integration and earlier behavior when shared components change.

**Why the other choices fail:**

- **A:** Acceptance of an earlier version does not certify combinations with future changes.
- **B:** The failure is in interactions with earlier capabilities; stronger isolation alone does not demonstrate their integration.
- **C:** A later shared change can alter earlier behaviour. Those tests remain valuable.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se016"></a>
### SE016 — Improving the review process

A team changes its review workflow after repeated delays. No user feature changes. What kind of improvement is this?

A. A process improvement that may help delivery, but does not itself add product capability.

B. Adding a review meeting automatically creates a product increment.

C. A process can improve only if all software is rewritten.

D. Review delays do not matter because no code failed.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A process improvement that may help delivery, but does not itself add product capability.**

Changing how the team works is a process improvement. It does not by itself add a product feature.

**Why the other choices fail:**

- **B:** An event is not usable product capability.
- **C:** Workflow changes can occur without changing product code.
- **D:** Coordination and feedback latency can affect delivery and defect discovery.

**Rule/source:** [College PDF audit and topic map][map].

</details>

## Agile and Scrum

<a id="se017"></a>
### SE017 — Useful Agile documentation

An Agile team keeps a short interface contract so other teams can integrate safely. Someone says to delete it because Agile values working software over documentation. Which response is best?

A. Make complete documents the main progress measure because this contract is useful.

B. Replace it with conversation and assume that gives the same reliable agreement.

C. Delete it after the first build because future coordination needs no documents.

D. Keep the useful contract and give working software priority. The value is not a ban.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Keep the useful contract and give working software priority. The value is not a ban.**

The Agile value gives working software priority; it does not ban useful documents. This contract helps teams work together.

**Why the other choices fail:**

- **A:** Useful documentation does not reverse the stated preference for working outcomes.
- **B:** Conversation can help, but the scenario supplies a concrete need for the contract; replacing it does not automatically preserve that support.
- **C:** A working build does not remove the stated integration purpose of the contract.

**Rule/source:** [Agile Manifesto][manifesto].

</details>

<a id="se018"></a>
### SE018 — A valuable late request

A late request is useful, but capacity and the delivery date are fixed. Which response is best?

A. Measure progress only by the number of requests accepted.

B. Discuss value and tradeoffs, reorder work and adjust scope instead of promising everything.

C. Reject every late request because a plan already exists.

D. Accept all requests and require unlimited overtime.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Discuss value and tradeoffs, reorder work and adjust scope instead of promising everything.**

Adapt the plan within real limits. New work may require changing priorities or removing lower-value work.

**Why the other choices fail:**

- **A:** Request count does not show delivered value.
- **C:** That suppresses feedback rather than evaluating it.
- **D:** That ignores capacity and sustainable pace.

**Rule/source:** [Agile principles][principles].

</details>

<a id="se019"></a>
### SE019 — Too much work for the Sprint

A team cannot finish every planned item within the Sprint. It can still meet the Sprint Goal by dropping an optional item. What should it do?

A. Renegotiate the work while keeping the Goal, quality and timebox.

B. Extend the Sprint until all items finish.

C. Cancel whenever any planned item is at risk.

D. Lower the Definition of Done for this Sprint.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Renegotiate the work while keeping the Goal, quality and timebox.**

Adjust the work while protecting the Sprint Goal, quality and fixed Sprint length.

**Why the other choices fail:**

- **B:** That defeats the fixed-length event.
- **C:** A missed forecast item does not necessarily make the Sprint Goal obsolete.
- **D:** That hides incomplete quality rather than delivering usable work.

**Rule/source:** [Scrum.org: sprint backlog][sprintbacklog].

</details>

<a id="se020"></a>
### SE020 — Delegating backlog work

The Product Owner asks an analyst to write backlog descriptions and collect stakeholder input. Who remains accountable for effective Product Backlog management?

A. The analyst takes accountability for drafted items; the Product Owner keeps only ordering.

B. The analyst and Product Owner become a joint Product Owner committee.

C. The Product Owner, even when tasks are delegated.

D. The Scrum Master takes accountability when work crosses a role boundary.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The Product Owner, even when tasks are delegated.**

The Product Owner can delegate tasks but keeps the accountability.

**Why the other choices fail:**

- **A:** Delegating descriptions does not partition the named Product Owner accountability into new accountabilities.
- **B:** Delegation does not turn the Product Owner into a committee.
- **D:** The Scrum Master does not inherit Product Backlog management from delegation.

**Rule/source:** [Scrum.org: product owner][po].

</details>

<a id="se021"></a>
### SE021 — Helping remove a blocker

An external approval delay blocks the team. The Scrum Master helps fix the approval route. Developers then decide how to reorganize their work. Which statement is best?

A. The Scrum Master must never coordinate with people outside the team.

B. The Scrum Master must personally assign every technical task.

C. This supports effectiveness and self-management without making the Scrum Master a task manager.

D. Developers may ignore quality because the blocker is fixed.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — This supports effectiveness and self-management without making the Scrum Master a task manager.**

The Scrum Master helps the team work effectively. Developers still manage their own work plan.

**Why the other choices fail:**

- **A:** Organizational obstacles can require coordination.
- **B:** That is not implied by facilitation or impediment removal.
- **D:** Quality obligations remain regardless of who helps remove a blocker.

**Rule/source:** [Scrum.org: scrum master][sm].

</details>

<a id="se022"></a>
### SE022 — Choosing Sprint work

At Sprint Planning, the Product Owner explains the most valuable work. A director then sets a required item count and each Developer's technical solution. Which correction matches Scrum?

A. Developers choose feasible work with the Product Owner and decide how to create the Increment.

B. Developers must ignore product value when choosing work.

C. The Scrum Master must choose the technical solutions.

D. The Product Owner must implement every selected item.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Developers choose feasible work with the Product Owner and decide how to create the Increment.**

Developers discuss value with the Product Owner, choose feasible work and plan how to build it.

**Why the other choices fail:**

- **B:** Selection still involves discussion with the Product Owner and the Sprint purpose.
- **C:** Replacing one dispatcher with another does not support self-management.
- **D:** Ordering/value accountability is not sole implementation responsibility.

**Rule/source:** [Scrum.org: what is sprint planning][planning].

</details>

<a id="se023"></a>
### SE023 — The Sprint Backlog

A team records only the IDs of selected backlog items. It has no Sprint objective and no delivery plan. What is missing?

A. A promise that requirements never change.

B. Every future Product Backlog item.

C. A particular commercial task-board tool.

D. The Sprint Goal and a practical plan for the selected work.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The Sprint Goal and a practical plan for the selected work.**

The Sprint Backlog contains the Goal (why), selected work (what) and delivery plan (how).

**Why the other choices fail:**

- **A:** The plan can adapt as more is learned.
- **B:** That is the broader product backlog, not the Sprint plan.
- **C:** A vendor tool is not required.

**Rule/source:** [Scrum.org: sprint backlog][sprintbacklog].

</details>

<a id="se024"></a>
### SE024 — Changing Sprint scope

The Sprint Goal is reliable checkout. Developers need to replace an optional visual change with a payment-retry fix. The Product Owner agrees and quality stays the same. Is this allowed?

A. Yes; the Product Owner may also replace the Sprint Goal every day.

B. Yes; scope can be renegotiated while preserving the Sprint Goal.

C. Only if the team lowers quality.

D. No; changing any selected item breaks Scrum.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Yes; scope can be renegotiated while preserving the Sprint Goal.**

The exact work can change as the team learns, provided it protects the Sprint Goal.

**Why the other choices fail:**

- **A:** Protecting the existing goal is a constraint in the scenario.
- **C:** Quality does not need to be reduced for legitimate scope adaptation.
- **D:** That treats a forecast as an unchangeable contract.

**Rule/source:** [Scrum.org: sprint backlog][sprintbacklog].

</details>

<a id="se025"></a>
### SE025 — An obsolete Sprint Goal

A new regulation makes the Sprint Goal obsolete. Developers can still finish the old tasks, but those tasks serve the obsolete Goal. What action fits Scrum?

A. Finishing all task estimates prevents cancellation in every case.

B. The Sprint must continue because cancellation is never allowed.

C. The Product Owner may cancel because the Sprint Goal is obsolete.

D. Only the Scrum Master may cancel a Sprint.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The Product Owner may cancel because the Sprint Goal is obsolete.**

The Product Owner may cancel when the Sprint Goal becomes obsolete. Completing old tasks does not make that Goal useful again.

**Why the other choices fail:**

- **A:** Task feasibility does not make an obsolete objective valuable.
- **B:** Obsolescence is a recognized reason for cancellation.
- **D:** That is not the specified authority.

**Rule/source:** [Scrum Guide (2020)][scrum].

</details>

<a id="se026"></a>
### SE026 — Accepted but not Done

A stakeholder accepts a feature demo. The Definition of Done also requires integration tests, which are failing. Can this feature count as part of the Increment?

A. No; the unmet Definition of Done still applies.

B. Yes; stakeholder acceptance overrides failing Done checks.

C. No; it must wait for production launch even if all Done checks pass earlier.

D. Yes; count it now and schedule the failing-test fix next Sprint.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — No; the unmet Definition of Done still applies.**

The feature has not met Done. A stakeholder's approval does not remove the stated quality requirements.

**Why the other choices fail:**

- **B:** Acceptance of demonstrated value and satisfying the common quality rule are distinct.
- **C:** Production release is not required solely for an Increment to meet Done. The current obstacle is failing checks.
- **D:** Reclassifying the remaining work does not make this item meet the current Definition of Done.

**Rule/source:** [Scrum.org: definition done][done].

</details>

<a id="se027"></a>
### SE027 — Releasing before Sprint Review

An Increment meets Done on Tuesday and is safe to release. Sprint Review is Friday. Does Scrum itself require waiting until Friday just because the Review has not happened?

A. Yes; a Sprint may contain only one Increment.

B. No; Sprint Review is not a required release gate.

C. Yes; Sprint Review must approve every production release.

D. No; this also lets the team skip security and other quality checks.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — No; Sprint Review is not a required release gate.**

Sprint Review is not a required release gate. A Done Increment may be released earlier. A separate company policy could add a gate, but none is given here.

**Why the other choices fail:**

- **A:** More than one Increment can be created.
- **C:** That adds a rule not supplied by Scrum.
- **D:** Release timing flexibility does not waive Done or other constraints.

**Rule/source:** [Scrum.org: increment][increment].

</details>

<a id="se028"></a>
### SE028 — Review or Retrospective

Meeting X uses stakeholder feedback to reconsider future product work. Meeting Y addresses review delays and improves team collaboration. Which pairing fits?

A. Neither meeting may change anything after inspection.

B. X is Retrospective; Y is Review.

C. Both are Daily Scrum because all feedback is daily planning.

D. X fits Sprint Review; Y fits Sprint Retrospective.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — X fits Sprint Review; Y fits Sprint Retrospective.**

Review looks at product outcomes and future direction. Retrospective improves how the team works.

**Why the other choices fail:**

- **A:** Inspection should inform adaptation.
- **B:** That reverses their main purposes.
- **C:** The stakeholders/product adaptation and process improvement distinguish these meetings.

**Rule/source:** [Scrum.org: Sprint Review][reviewretro]; [Scrum.org: Sprint Retrospective][retro].

</details>

<a id="se029"></a>
### SE029 — A different Daily Scrum format

Developers use a board for a 15-minute Daily Scrum about the Sprint Goal and their next work plan. They do not use the yesterday/today/blockers questions. Is the format valid?

A. It can be valid; the purpose matters and the three questions are optional.

B. No; the three questions are required.

C. Only if the Scrum Master assigns each person's next task.

D. No; the Sprint Backlog cannot change daily.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — It can be valid; the purpose matters and the three questions are optional.**

Developers may choose the format. It must still serve the Daily Scrum's purpose and timebox; the three-question script is optional.

**Why the other choices fail:**

- **B:** That treats one technique as a compulsory rule.
- **C:** The event supports Developers' self-management.
- **D:** Daily inspection can inform adaptation.

**Rule/source:** [Scrum.org: daily scrum][daily].

</details>

<a id="se030"></a>
### SE030 — Backlog refinement

A team splits and clarifies future backlog items. Someone calls its weekly refinement meeting a sixth formal Scrum event that every team must hold in the same way. What is the best correction?

A. Refinement is ongoing work; this meeting is not another formal Scrum event.

B. Only the Product Owner may refine or size future work.

C. Any repeating meeting with a timebox becomes a formal Scrum event.

D. Refinement is forbidden during a Sprint.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Refinement is ongoing work; this meeting is not another formal Scrum event.**

Refinement is ongoing work. A team may use a meeting for it, but that does not add a formal Scrum event.

**Why the other choices fail:**

- **B:** Developers doing the work are responsible for sizing; refinement can involve collaboration.
- **C:** Scheduling a technique does not add a formal event to Scrum.
- **D:** Ongoing refinement can clarify future work during a Sprint.

**Rule/source:** [Scrum.org: product backlog][productbacklog].

</details>

<a id="se031"></a>
### SE031 — Artifact, commitment and optional tool

Which order correctly names the Sprint artifact, its commitment and an optional forecasting tool?

A. Product Backlog; Definition of Done; Sprint Review.

B. Sprint Goal; Sprint Backlog; Increment.

C. Sprint Backlog; Sprint Goal; burn-down chart.

D. Burn-down chart; Scrum Master; Product Backlog.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Sprint Backlog; Sprint Goal; burn-down chart.**

Sprint Backlog is the artifact. Sprint Goal is its commitment. A burn-down chart can help track progress but is optional.

**Why the other choices fail:**

- **A:** Product Backlog pairs with Product Goal; Review is an event.
- **B:** The first two are reversed; Increment is a formal artifact, not merely an aid.
- **D:** Neither the chart nor a person supplies this artifact/commitment pairing.

**Rule/source:** [Scrum.org: scrum artifacts][artifacts].

</details>

<a id="se032"></a>
### SE032 — Skills across a Scrum team

A Scrum team has all skills needed to deliver a usable Increment. Members specialize but work together. Must every member personally have every skill?

A. Specialists cannot self-manage, so the Scrum Master must assign their tasks.

B. No; skills anywhere in the company are enough even if this team cannot deliver.

C. No; the team needs the skills together, not identical skills in each person.

D. Yes; every member must independently perform every delivery skill.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — No; the team needs the skills together, not identical skills in each person.**

Cross-functional means the team has the needed skills together. It does not mean every person has identical skills.

**Why the other choices fail:**

- **A:** Different expertise does not eliminate Developers’ self-management.
- **B:** Organizational skill availability alone does not show the stated team capability.
- **D:** Cross-functionality is a collective team property, not an identical-skill requirement.

**Rule/source:** [Scrum.org: scrum team][team].

</details>

<a id="se033"></a>
### SE033 — An unfinished item at Sprint end

A fixed two-week Sprint ends with one item unfinished. The Goal remains useful and other work is Done. Which action keeps the timebox?

A. Add one development day but keep calling it a two-week Sprint.

B. Always select the unfinished item first next Sprint because its old priority is permanent.

C. Count the unfinished item because other items meet the Goal.

D. End on time and make unfinished work visible for future planning.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — End on time and make unfinished work visible for future planning.**

End the Sprint on schedule. Make unfinished work visible and plan it again based on current priorities; do not count it as Done.

**Why the other choices fail:**

- **A:** Changing the effective Sprint end still extends the timebox.
- **B:** Future selection reflects current ordering and feasible planning; it is not automatic carryover.
- **C:** Meeting the Goal with other work does not make unfinished work satisfy Done.

**Rule/source:** [Scrum Guide (2020)][scrum].

</details>

<a id="se034"></a>
### SE034 — Counting blocked work

WIP means all started-but-unfinished items. The limit is 3. Two items are active and one is blocked; there is no exception rule. What respects the limit?

A. Start another item because only active items count.

B. Help unblock or finish existing work before starting a fourth item.

C. Silently raise the limit whenever an item is blocked.

D. Hide the blocked item and count it as finished.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Help unblock or finish existing work before starting a fourth item.**

All three items count under this definition. Blocked work is still unfinished work.

**Why the other choices fail:**

- **A:** That substitutes a different WIP definition.
- **C:** That bypasses the stated policy rather than managing the constraint.
- **D:** Hiding work does not finish it.

**Rule/source:** [The Kanban Guide][kanban].

</details>

<a id="se035"></a>
### SE035 — A test that passes too early

A team writes a test before implementing a feature. It passes immediately because it never runs the missing behavior. What is the best fix for TDD?

A. Test the intended behavior and observe its failure before implementing it.

B. Keep the passing test and mark the feature complete.

C. Make the test fail with an unrelated syntax error.

D. Delete all old tests before coding.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Test the intended behavior and observe its failure before implementing it.**

The test must detect the missing behavior. First observe the relevant failure, then implement the behavior and make the test pass.

**Why the other choices fail:**

- **B:** A pass from an ineffective test does not demonstrate the feature.
- **C:** The failure should be relevant to the intended behaviour, not arbitrary breakage.
- **D:** That removes regression evidence.

**Rule/source:** [Agile Alliance: TDD][tdd].

</details>

<a id="se036"></a>
### SE036 — A claimed refactoring

A team reorganizes a method internally. For an allowed input, it now returns a different visible result. Can it call this behavior-preserving refactoring?

A. No; investigate whether the changed result is a bug or an intended feature change.

B. Yes; keeping the same method signature is enough.

C. Yes; unrelated passing tests prove the changed input still behaves the same.

D. Yes; shorter code proves the new result is correct.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — No; investigate whether the changed result is a bug or an intended feature change.**

Refactoring preserves visible behavior. A changed result may be a bug or a planned feature change, but needs separate explanation.

**Why the other choices fail:**

- **B:** A matching signature does not show matching externally visible results.
- **C:** A pass from tests that do not distinguish the changed behaviour cannot prove equivalence for it.
- **D:** Size does not show intent or correctness of the behavioural change.

**Rule/source:** [Agile Alliance: refactoring][refactor].

</details>

## DevOps

<a id="se037"></a>
### SE037 — A deployment tool and team habits

A company installs a deployment server. Developers still hand over unverified builds, and operations handles incidents without sending feedback to development. What does this show?

A. Automation alone has not created DevOps collaboration and feedback.

B. DevOps requires removing every operations specialist.

C. The deployment server proves collaboration; operations feedback is optional.

D. A faster one-way handoff fixes this because development has no responsibility afterward.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Automation alone has not created DevOps collaboration and feedback.**

A tool can automate the same old handoff. DevOps also needs collaboration, shared responsibility and feedback.

**Why the other choices fail:**

- **B:** Shared responsibility can coexist with specialist expertise.
- **C:** Automation does not show the missing collaboration and feedback practices.
- **D:** That keeps the missing operational learning loop described in the scenario.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se038"></a>
### SE038 — Manual release, automated deployment

Each passing change is built, tested and ready for production. A person chooses when to release it; deployment then runs automatically. What is this?

A. Continuous delivery: automated deployment after a manual release decision.

B. CI only, because production deployment is automated.

C. Neither delivery nor deployment can use automation.

D. Continuous deployment, because nobody types commands after approval.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Continuous delivery: automated deployment after a manual release decision.**

This is continuous delivery. The release decision is still manual, even though the approved deployment runs automatically.

**Why the other choices fail:**

- **B:** The stated release-ready preparation extends beyond integration checks.
- **C:** The issue is the release gate, not a ban on automation.
- **D:** The human release decision is still present.

**Rule/source:** [Atlassian: CI vs delivery vs deployment][cicd].

</details>

<a id="se039"></a>
### SE039 — Nightly checks on separate branches

Developers keep branches separate for weeks. Nightly jobs test each branch, but the branches join main only at month-end. Which CI practice is missing?

A. An automated UI screenshot alone proves integration.

B. Every branch must deploy straight to production.

C. All branches must be publicly hosted.

D. Frequent integration into the shared branch with checks on combined changes.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Frequent integration into the shared branch with checks on combined changes.**

CI needs frequent integration and checks on the combined work. Separate passing branches may still fail when joined.

**Why the other choices fail:**

- **A:** It does not necessarily test the combined shared code.
- **B:** Integration and production deployment are separate practices.
- **C:** Public visibility is not the integration requirement.

**Rule/source:** [Fowler: continuous integration][ci].

</details>

<a id="se040"></a>
### SE040 — An artifact and a production release

A green pipeline publishes a deployable artifact. Production still waits for a release manager. Why does publication not prove automatic production deployment?

A. A green result proves every possible behavior is correct.

B. Publishing an artifact means no build happened.

C. A deployable artifact and an actual production change are different events.

D. A release manager makes automated tests impossible.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A deployable artifact and an actual production change are different events.**

Being ready to deploy is different from actually changing production. The release decision is manual here.

**Why the other choices fail:**

- **A:** The check shows only the evidence its checks provide.
- **B:** Publication can follow a real build.
- **D:** Approval and automated checks can coexist.

**Rule/source:** [Continuous Delivery][delivery].

</details>

<a id="se041"></a>
### SE041 — What monitoring can guarantee

A team adds uptime alerts and latency dashboards. It claims this guarantees zero outages. Which correction is best?

A. Fast dashboard refresh guarantees prevention.

B. Monitoring improves detection and response but does not guarantee zero failures.

C. The dashboards provide recovery even though no response mechanism is described.

D. Monitoring proves untested changes are safe, so release checks can stop.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Monitoring improves detection and response but does not guarantee zero failures.**

Monitoring helps detect problems and guide a response. It does not prevent every possible failure.

**Why the other choices fail:**

- **A:** Faster observation can improve detection, but does not show prevention of every failure.
- **C:** Detection and recovery are different capabilities.
- **D:** Observing live behaviour does not replace checks before exposure.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se042"></a>
### SE042 — Containers and release practices

A team uses containers but deploys by hand at irregular times and has no regular integration tests. Which conclusion follows?

A. A container proves the current commit passed its tests.

B. Containers automatically create a correct CI policy.

C. Manual releases always prevent repeatable packaging.

D. Containers alone do not prove CI or continuous deployment.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Containers alone do not prove CI or continuous deployment.**

Containers package software. They do not by themselves provide CI, passing checks or automatic release rules.

**Why the other choices fail:**

- **A:** Packaging can occur without those checks.
- **B:** The integration practice is separately specified.
- **C:** Reproducibility and a manual release decision can coexist.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se043"></a>
### SE043 — Rebuilding after tests

Staging tests artifact X. Production rebuilds the same source commit, but a changed dependency produces artifact Y. Which claim is unsafe?

A. Repeatable build inputs could reduce the difference.

B. Tests passing for X prove that Y has the same tested contents and behavior.

C. The source commit stayed the same but the build output changed.

D. The team should identify which artifact it is releasing.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Tests passing for X prove that Y has the same tested contents and behavior.**

The rebuild changed the tested artifact. The same source commit does not guarantee the same build inputs or output.

**Why the other choices fail:**

- **A:** Controlling inputs helps, although the scenario has not shown it.
- **C:** That is directly stated.
- **D:** That addresses the evidence-to-deployment link.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

</details>

<a id="se044"></a>
### SE044 — A green result from an older commit

Commit A passed checks. Commit B changes a critical file but has not been checked. The release screen shows A's green result beside B. Which rule prevents the mistake?

A. Treat all green results in the repository as interchangeable.

B. Require the checks to match the candidate revision or artifact.

C. Ignore check identity when B is newer.

D. Compare only the commit author names.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Require the checks to match the candidate revision or artifact.**

A passing check applies to its tested input. Require evidence for the exact revision or artifact being released.

**Why the other choices fail:**

- **A:** The candidate content can differ.
- **C:** Recency does not prove verification.
- **D:** Common authorship does not show equal contents.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

</details>

<a id="se045"></a>
### SE045 — Two deployment conditions

Java 17. Each boolean is a required check. The policy needs all three checks to pass. What prints, and which expression breaks the policy?

```java
public class Main {
    public static void main(String[] args) {
        boolean build = true, tests = false, security = true;
        boolean strict = build && tests && security;
        boolean flawed = (build && tests) || security;
        System.out.println(strict + " " + flawed);
    }
}
```

A. false false; OR behaves like AND when checks are related.

B. false true; the second gate lets security success bypass failed tests.

C. true true; a successful build implies tests passed.

D. true false; security is checked only by the first expression.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — false true; the second gate lets security success bypass failed tests.**

All three joined with AND produce false. In the second expression, security alone can make the OR result true.

**Why the other choices fail:**

- **A:** Java boolean operators do not infer conceptual relationships.
- **C:** The tests variable is explicitly false.
- **D:** Both use security; their combination rules differ.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "false true\n", "exit": 0} -->

</details>

<a id="se046"></a>
### SE046 — Did the tests run?

Java 17. test() runs a test suite. What prints, and which checks actually ran?

```java
public class Main {
    static int checks;
    static boolean test() { checks++; return true; }
    public static void main(String[] args) {
        boolean build = false;
        boolean ready = build && test();
        System.out.println(ready + " " + checks);
    }
}
```

A. false 0; the failed build short-circuits the test invocation.

B. true 1; test() overwrites the build result.

C. true 0; not running tests is equivalent to passing them.

D. false 1; every expression always evaluates all check functions.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — false 0; the failed build short-circuits the test invocation.**

After a false left side, && skips its right side. test() never ran, so there is no test result from this run.

**Why the other choices fail:**

- **B:** It is not invoked, and && does not assign to build.
- **C:** Absence of execution is not positive verification evidence.
- **D:** && short-circuits in Java.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "false 0\n", "exit": 0} -->

</details>

<a id="se047"></a>
### SE047 — Failure reporting and execution

Java 17. Deployment must stop after failed tests. What prints, and what is the bug?

```java
public class Main {
    public static void main(String[] args) {
        boolean tests = false;
        if (!tests) System.out.println("STOP");
        System.out.println("DEPLOY");
    }
}
```

A. No output; failed tests automatically throw a Java exception.

B. DEPLOY only; the negation makes the condition false.

C. STOP then DEPLOY; an early return or guarding the deployment is missing.

D. STOP only; the word STOP halts the program.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — STOP then DEPLOY; an early return or guarding the deployment is missing.**

Printing STOP does not stop execution. The following deployment statement still runs.

**Why the other choices fail:**

- **A:** The boolean value does not throw an exception.
- **B:** !false is true.
- **D:** A printed string has no control-flow effect.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "STOP\nDEPLOY\n", "exit": 0} -->

</details>

<a id="se048"></a>
### SE048 — Tests and approval for an artifact

Java 17. The candidate needs passing tests and approval for that same artifact. What prints?

```java
public class Main {
    public static void main(String[] args) {
        String tested = "B", candidate = "B", approved = "A";
        boolean ready = tested.equals(candidate)
                     && approved.equals(candidate);
        System.out.println(ready);
    }
}
```

A. false; approval for A does not approve candidate B.

B. Compilation fails because two equals calls cannot be joined.

C. true; testing automatically updates approved to B.

D. true; any earlier approval authorizes every later artifact.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — false; approval for A does not approve candidate B.**

The test ID matches the candidate, but the approval ID does not. Both are required, so the result is false.

**Why the other choices fail:**

- **B:** Both return booleans, which && can combine.
- **C:** No assignment changes approved.
- **D:** That is not the given policy.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "false\n", "exit": 0} -->

</details>

<a id="se049"></a>
### SE049 — Job dependencies

Java 17. Each boolean means a job succeeded. Production must depend on both build and unit tests. What prints, and which dependency is missing?

```java
public class Main {
    public static void main(String[] args) {
        boolean build = true, unit = false;
        boolean packageJob = build;
        boolean deployJob = packageJob;
        System.out.println(packageJob + " " + deployJob);
    }
}
```

A. false true; packaging must fail even when its only dependency passes.

B. true false; a variable named unit automatically gates deployJob.

C. false false; every false variable propagates to all jobs.

D. true true; the path to deployment never incorporates the failed unit check.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — true true; the path to deployment never incorporates the failed unit check.**

Neither assignment requires unit to pass. Add that required condition to the path leading to production.

**Why the other choices fail:**

- **A:** The package expression is build, which is true.
- **B:** Java does not infer dependencies from names.
- **C:** Only explicitly used dependencies affect the values.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true true\n", "exit": 0} -->

</details>

<a id="se050"></a>
### SE050 — Ready for production or live?

Java 17. STAGED means ready before production; LIVE means production changed. What prints, and which release behavior does it show?

```java
public class Main {
    public static void main(String[] args) {
        boolean checks = true, humanApproval = false;
        String state = "NONE";
        if (checks) state = "STAGED";
        if (checks && humanApproval) state = "LIVE";
        System.out.println(state);
    }
}
```

A. NONE; a missing approval cancels all staging work.

B. LIVE; passing checks imply approval.

C. STAGED; release readiness with a manual production gate.

D. STAGED; this proves production deployment is fully automatic.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — STAGED; release readiness with a manual production gate.**

The STAGED branch runs, but the LIVE branch does not. Preparing a release did not release it to production.

**Why the other choices fail:**

- **A:** No statement resets state to NONE.
- **B:** humanApproval is explicitly false.
- **D:** The run demonstrates the remaining approval condition.

**Rule/source:** [Continuous Delivery][delivery].

<!-- verify: {"kind": "java", "stdout": "STAGED\n", "exit": 0} -->

</details>

<a id="se051"></a>
### SE051 — Canary and total error rates

Java 17. The canary gets 10 requests with 2 errors. The other 90 requests have no errors. Rollout requires the canary error fraction to be at most 0.05. Which printed decision follows that policy?

```java
public class Main {
    public static void main(String[] args) {
        double canaryError = 2.0 / 10;
        double aggregateError = 2.0 / 100;
        System.out.println((aggregateError <= 0.05) + " "
                         + (canaryError <= 0.05));
    }
}
```

A. false true; the canary contains fewer requests, so its rate must be lower.

B. true false; only the second decision uses the required canary denominator.

C. true true; 2 errors is always below a 5% threshold.

D. false false; both fractions are above 5%.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — true false; only the second decision uses the required canary denominator.**

The canary fails on 20% of its requests. Combining all traffic hides that as 2%. The stated canary policy requires stopping.

**Why the other choices fail:**

- **A:** Its same error count over fewer requests makes the rate higher.
- **C:** A rate depends on its denominator.
- **D:** 2/100 is 2%, not above 5%.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true false\n", "exit": 0} -->

</details>

<a id="se052"></a>
### SE052 — AND, OR and approval

Java 17. The policy requires all three conditions. What prints, and which fix enforces the policy?

```java
public class Main {
    public static void main(String[] args) {
        boolean build = false, tests = false, approved = true;
        boolean deploy = build && tests || approved;
        System.out.println(deploy);
    }
}
```

A. true; adding parentheses as (build && tests) || approved repairs the policy.

B. false; approved is unused because the left side is false.

C. false; approval cannot override anything in the shown code.

D. true; require build && tests && approved to enforce the stated policy.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — true; require build && tests && approved to enforce the stated policy.**

&& runs before ||. In the shown expression, approved alone can make the result true; use AND for all required conditions.

**Why the other choices fail:**

- **A:** That only states the existing grouping more clearly.
- **B:** || evaluates its right side when the left is false.
- **C:** The final OR explicitly makes it an alternative.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true\n", "exit": 0} -->

</details>

<a id="se053"></a>
### SE053 — Code and screenshots for infrastructure

Team A versions environment definitions and applies them in a repeatable way. Team B saves screenshots of manually configured servers. What advantage does A have?

A. Versioned definitions prevent all runtime drift, so verification is unnecessary.

B. A can review and recreate the defined state through code; screenshots alone do not provide that process.

C. A versioned definition guarantees correctness even if it contains an error.

D. Screenshots define every step and dependency needed to recreate the state.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — A can review and recreate the defined state through code; screenshots alone do not provide that process.**

Code can define how to create the environment and support review of changes. A screenshot shows a state without giving that procedure.

**Why the other choices fail:**

- **A:** Versioning desired state does not by itself show actual state.
- **C:** Reviewability and reproducibility are useful mechanisms, not guarantees that the desired definition is correct.
- **D:** A picture of state need not specify reproducible actions or dependencies.

**Rule/source:** [Microsoft: infrastructure as code][iac].

</details>

<a id="se054"></a>
### SE054 — Responding to rollout feedback

A new version exceeds the allowed error rate. A tested, compatible old version and a rollback procedure are available. What response best uses this feedback?

A. Hide the alert until users stop complaining.

B. Assume any old version is compatible even without evidence.

C. Stop promotion or roll back under the procedure, then investigate.

D. Keep promoting because release frequency is the only quality measure.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Stop promotion or roll back under the procedure, then investigate.**

Use the measured failure to change the rollout decision, then investigate and fix the cause.

**Why the other choices fail:**

- **A:** That removes feedback.
- **B:** This scenario supplies compatibility; it should not be generalized to every rollback.
- **D:** Frequency does not override the stated health condition.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

## Git and GitHub

<a id="se055"></a>
### SE055 — Staging, editing and committing

Use the base Git fixture. Lines printed are committed content, working content, then short Git status. What are they?

```bash
printf 'B\n' > f.txt
git add f.txt
printf 'C\n' > f.txt
git commit -qm staged
git show HEAD:f.txt
cat f.txt
git status --porcelain
```

A. A / C / `MM f.txt`

B. B / C / ` M f.txt`

C. C / C / clean

D. B / B / clean

<details>
<summary>Answer and reasoning</summary>

**Correct: B — B / C / ` M f.txt`**

git add saved B in the index. Editing the working file to C did not update the index. The commit saves B and leaves C as an unstaged edit.

**Why the other choices fail:**

- **A:** The commit did happen, so HEAD and the index now contain B.
- **C:** A normal commit does not automatically restage the later edit.
- **D:** Committing does not overwrite the working file with its staged contents.

**Rule/source:** [Git: add][git-add].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "B\nC\n M f.txt\n", "exit": 0} -->

</details>

<a id="se056"></a>
### SE056 — Three diff commands

Use the base fixture. Only the three filename lists are observed, in command order; an empty list prints nothing. Which lists show f.txt?

```bash
printf 'B\n' > f.txt
git add f.txt
git diff --name-only
git diff --staged --name-only
git diff HEAD --name-only
```

A. All are empty because add creates a commit.

B. Plain diff is empty; staged diff and HEAD diff each list f.txt.

C. Only plain diff lists f.txt.

D. All three list f.txt.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Plain diff is empty; staged diff and HEAD diff each list f.txt.**

The working file and index both contain B, so ordinary diff is empty. Both differ from HEAD, which still contains A.

**Why the other choices fail:**

- **A:** add updates the index, not HEAD.
- **C:** That reverses the comparison endpoints.
- **D:** Plain diff compares B with B here.

**Rule/source:** [Git: diff][git-diff].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "f.txt\nf.txt\n", "exit": 0} -->

</details>

<a id="se057"></a>
### SE057 — Committing a new file with -a

Use the base fixture. What committed content and remaining status print?

```bash
printf 'B\n' > f.txt
printf 'N\n' > new.txt
git commit -qam tracked
git show HEAD:f.txt
git status --porcelain
```

A. N / clean

B. B / clean

C. B / `?? new.txt`

D. A / ` M f.txt` and `?? new.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: C — B / `?? new.txt`**

commit -a stages changes and deletions in tracked files. It does not add the new, untracked file.

**Why the other choices fail:**

- **A:** f.txt and new.txt are distinct paths; no replacement occurs.
- **B:** new.txt was not staged or previously tracked.
- **D:** -a includes the tracked modification.

**Rule/source:** [Git: commit][git-commit].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "B\n?? new.txt\n", "exit": 0} -->

</details>

<a id="se058"></a>
### SE058 — Unstaging a file

Use the base fixture. Printed values are index content, working content and status. What prints?

```bash
printf 'B\n' > f.txt
git add f.txt
git restore --staged f.txt
git show :f.txt
cat f.txt
git status --porcelain
```

A. B / B / `M  f.txt`

B. A / A / clean

C. A / B / ` M f.txt`

D. B / A / `MM f.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A / B / ` M f.txt`**

restore --staged uses HEAD as its default source. The index returns to A, but the working edit stays B.

**Why the other choices fail:**

- **A:** That describes the state before unstaging.
- **B:** That would also restore the working file, which the command does not request.
- **D:** The command targets the index, not the working tree.

**Rule/source:** [Git: restore][git-restore].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nB\n M f.txt\n", "exit": 0} -->

</details>

<a id="se059"></a>
### SE059 — Restoring a working file

Use the base fixture. Printed values are HEAD content, index content, working content and status. What prints?

```bash
printf 'B\n' > f.txt
git add f.txt
printf 'C\n' > f.txt
git restore f.txt
git show HEAD:f.txt
git show :f.txt
cat f.txt
git status --porcelain
```

A. A / B / B / `M  f.txt`

B. A / B / C / `MM f.txt`

C. B / B / B / clean

D. A / A / A / clean

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A / B / B / `M  f.txt`**

Here, plain restore copies the index into the working file. It replaces C with B and leaves HEAD at A.

**Why the other choices fail:**

- **B:** That is the state before restore.
- **C:** restore does not create a commit.
- **D:** That would restore both locations from HEAD, which was not requested.

**Rule/source:** [Git: restore][git-restore].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nB\nB\nM  f.txt\n", "exit": 0} -->

</details>

<a id="se060"></a>
### SE060 — Soft reset

Use the base fixture. After committing B, stage C and leave D in the working file. Following the reset, what HEAD/index/working values print?

```bash
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
printf 'C\n' > f.txt
git add f.txt
printf 'D\n' > f.txt
git reset --soft HEAD~1
git show HEAD:f.txt
git show :f.txt
cat f.txt
```

A. A / A / A

B. A / A / D

C. A / C / D

D. B / A / D

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A / C / D**

Soft reset moves the branch to its parent commit. It leaves the index at C and the working file at D.

**Why the other choices fail:**

- **A:** That is the hard-reset state for this tracked path.
- **B:** That is the corresponding mixed-reset state.
- **D:** This reset does move HEAD; it does not simply unstage a path.

**Rule/source:** [Git: reset][git-reset].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nC\nD\n", "exit": 0} -->

</details>

<a id="se061"></a>
### SE061 — Mixed reset

Use the base fixture. Output below is HEAD/index/working after resetting B to its parent. What prints?

```bash
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
printf 'C\n' > f.txt
git add f.txt
printf 'D\n' > f.txt
git reset --mixed HEAD~1 >/dev/null
git show HEAD:f.txt
git show :f.txt
cat f.txt
```

A. A / A / A

B. B / A / D

C. A / C / D

D. A / A / D

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / A / D**

Mixed reset moves the branch and index to the target commit. It keeps the working file at D.

**Why the other choices fail:**

- **A:** That discards the working edit as a hard reset would.
- **B:** HEAD also moves to A in this form.
- **C:** That preserves the index as a soft reset would.

**Rule/source:** [Git: reset][git-reset].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nA\nD\n", "exit": 0} -->

</details>

<a id="se062"></a>
### SE062 — Hard reset and an untracked file

Use the base fixture. u.txt is an unrelated untracked path that obstructs no tracked path. Output is HEAD/index/working f.txt, then u.txt. What prints?

```bash
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
printf 'C\n' > f.txt
git add f.txt
printf 'D\n' > f.txt
printf 'U\n' > u.txt
git reset --hard HEAD~1 >/dev/null
git show HEAD:f.txt
git show :f.txt
cat f.txt
cat u.txt
```

A. A / A / A / file missing

B. A / C / D / U

C. A / A / A / U

D. A / A / D / U

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A / A / A / U**

Hard reset resets the tracked file in HEAD, index and working tree. This unrelated untracked file stays; an untracked path blocking a tracked path could be removed.

**Why the other choices fail:**

- **A:** Hard reset is not a blanket clean of every unrelated untracked file.
- **B:** That preserves index and working edits as soft reset would.
- **D:** That preserves the tracked working edit as mixed reset would.

**Rule/source:** [Git: reset][git-reset].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nA\nA\nU\n", "exit": 0} -->

</details>

<a id="se063"></a>
### SE063 — Revert and commit history

Use the base fixture. The outputs are file content, reachable commit count, then whether the B commit remains an ancestor. What prints?

```bash
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
se_bad=$(git rev-parse HEAD)
git revert --no-edit HEAD >/dev/null
cat f.txt
git rev-list --count HEAD
if git merge-base --is-ancestor "$se_bad" HEAD; then echo retained; else echo removed; fi
```

A. A / 3 / retained

B. B / 2 / retained

C. A / 1 / removed

D. A / 2 / removed

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A / 3 / retained**

Revert adds a commit that reverses the change. Base, B and the new reversal commit remain in history.

**Why the other choices fail:**

- **B:** The inverse commit does restore A here.
- **C:** That resembles resetting to the base instead of reverting.
- **D:** Revert neither deletes B nor replaces it with the inverse at the same history position.

**Rule/source:** [Git: revert][git-revert].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\n3\nretained\n", "exit": 0} -->

</details>

<a id="se064"></a>
### SE064 — Ignoring a tracked file

Use the base fixture. f.txt is already tracked. Output is tracked filename list then remaining status. What prints?

```bash
printf 'f.txt\n' > .gitignore
git add .gitignore
git commit -qm ignore-rule
printf 'B\n' > f.txt
git ls-files f.txt
git status --porcelain
```

A. f.txt / ` M f.txt`

B. No output; the file is now untracked and hidden.

C. Only `?? f.txt`

D. f.txt / clean

<details>
<summary>Answer and reasoning</summary>

**Correct: A — f.txt / ` M f.txt`**

An ignore rule does not untrack a file. The already tracked f.txt still shows its change.

**Why the other choices fail:**

- **B:** Ignore rules do not automatically untrack existing files.
- **C:** The path remains tracked, not newly untracked.
- **D:** The tracked content did change.

**Rule/source:** [Git: ignore rules][gitignore].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "f.txt\n M f.txt\n", "exit": 0} -->

</details>

<a id="se065"></a>
### SE065 — Staging with -u

Use the base fixture. Which committed f.txt content and status remain?

```bash
printf 'B\n' > f.txt
printf 'N\n' > new.txt
git add -u
git commit -qm update-tracked
git show HEAD:f.txt
git status --porcelain
```

A. A / ` M f.txt` and `?? new.txt`

B. N / `?? f.txt`

C. B / `?? new.txt`

D. B / clean

<details>
<summary>Answer and reasoning</summary>

**Correct: C — B / `?? new.txt`**

add -u updates tracked entries, including deletions. It does not add a new, untracked path.

**Why the other choices fail:**

- **A:** -u does stage the tracked modification.
- **B:** The command does not exchange the roles or contents of the paths.
- **D:** That would require staging new.txt too.

**Rule/source:** [Git: add][git-add].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "B\n?? new.txt\n", "exit": 0} -->

</details>

<a id="se066"></a>
### SE066 — Creating a branch

Use the base fixture. Output is current branch, dev's latest subject, then main's latest subject. What prints?

```bash
git branch dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
git branch --show-current
git log -1 --format=%s dev
git log -1 --format=%s main
```

A. dev / base / B

B. dev / B / base

C. main / B / B

D. main / base / B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — main / base / B**

branch dev creates a branch at base without switching. The next commit advances main, while dev stays at base.

**Why the other choices fail:**

- **A:** The branch creation did not change the current branch.
- **B:** That would require switching to dev before committing.
- **C:** A non-current branch does not automatically follow new main commits.

**Rule/source:** [Git: branch][git-branch].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "main\nbase\nB\n", "exit": 0} -->

</details>

<a id="se067"></a>
### SE067 — Switching with a local edit

Use the base fixture. main and dev start at the same commit. What branch, working content and main committed content print?

```bash
git branch dev
printf 'B\n' > f.txt
git switch -q dev
git branch --show-current
cat f.txt
git show main:f.txt
```

A. dev / B / B

B. dev / A / A

C. main / B / A

D. dev / B / A

<details>
<summary>Answer and reasoning</summary>

**Correct: D — dev / B / A**

Both branches start with the same tracked content, so this switch can keep the local edit. That edit was never committed to main.

**Why the other choices fail:**

- **A:** Working changes do not automatically create a main commit.
- **B:** Switch does not automatically discard the safe working edit.
- **C:** Not all dirty working trees prohibit switching.

**Rule/source:** [Git: switch][git-switch].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "dev\nB\nA\n", "exit": 0} -->

</details>

<a id="se068"></a>
### SE068 — A switch with conflicting edits

Use the base fixture. dev has B; main has A with an uncommitted C. Which result prints for the attempted switch?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm dev-B
git switch -q main
printf 'C\n' > f.txt
if git switch -q dev >/dev/null 2>&1; then echo switched; else echo refused; fi
git branch --show-current
cat f.txt
```

A. refused / dev / C

B. switched / dev / B

C. switched / dev / C

D. refused / main / C

<details>
<summary>Answer and reasoning</summary>

**Correct: D — refused / main / C**

Switching would overwrite a conflicting local edit. Git refuses the switch and keeps that edit.

**Why the other choices fail:**

- **A:** A refused switch leaves the current branch unchanged.
- **B:** That would discard the edit without the required request.
- **C:** Here the target requires a different f.txt version, unlike the safe-switch case.

**Rule/source:** [Git: switch][git-switch].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "refused\nmain\nC\n", "exit": 0} -->

</details>

<a id="se069"></a>
### SE069 — Choosing the merge direction

Use the base fixture. The stated goal is to update main with dev's change. What main/dev contents print, and did this command achieve that goal?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm dev-B
git merge -q main >/dev/null
git show main:f.txt
git show dev:f.txt
```

A. B / B; naming main makes it the destination.

B. B / A; branch contents are exchanged.

C. A / A; merge overwrites dev with the source snapshot.

D. A / B; main was not updated.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / B; main was not updated.**

With dev checked out, merge main brings main into dev. It does not update main. Here main is already an ancestor, so nothing changes.

**Why the other choices fail:**

- **A:** The current branch is the destination, not the named argument.
- **B:** No exchange operation is performed.
- **C:** Merge does not simply replace the branch with its ancestor's content.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nB\n", "exit": 0} -->

</details>

<a id="se070"></a>
### SE070 — Fast-forward merge

Use the base fixture. Output is total reachable commits, then number of parents of HEAD. What prints?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm feature
git switch -q main
git merge --ff-only -q dev
git rev-list --count HEAD
git show -s --format=%P HEAD | awk '{print NF}'
```

A. 2 / 1

B. 2 / 2

C. 3 / 2

D. 1 / 0

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 2 / 1**

main can move forward to the existing dev commit. No new merge commit is needed, and HEAD still has one parent.

**Why the other choices fail:**

- **B:** The existing ordinary feature commit does not gain a parent when a branch reference moves.
- **C:** That assumes a new merge commit instead of the allowed fast-forward.
- **D:** The feature commit is reachable after the update.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "2\n1\n", "exit": 0} -->

</details>

<a id="se071"></a>
### SE071 — Editing a conflicted file

Use the base fixture. After the conflict is manually edited to R, what unmerged filename and HEAD/working contents print?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm theirs
git switch -q main
printf 'C\n' > f.txt
git add f.txt
git commit -qm ours
git merge dev >/dev/null 2>&1
printf 'R\n' > f.txt
git diff --name-only --diff-filter=U
git show HEAD:f.txt
cat f.txt
```

A. f.txt / C / R; the index is still unmerged.

B. f.txt / B / R

C. No unmerged filename / R / R

D. No unmerged filename / C / R

<details>
<summary>Answer and reasoning</summary>

**Correct: A — f.txt / C / R; the index is still unmerged.**

Editing the file changes only the working copy. git add must record the resolution before the merge can finish.

**Why the other choices fail:**

- **B:** HEAD is still the current main tip C, not dev.
- **C:** That assumes an automatic commit after editing.
- **D:** That assumes removing markers automatically resolves the index entries.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "f.txt\nC\nR\n", "exit": 0} -->

</details>

<a id="se072"></a>
### SE072 — Completing a merge

Use the base fixture. After resolving the same conflict and completing the merge, what content and parent count print?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm theirs
git switch -q main
printf 'C\n' > f.txt
git add f.txt
git commit -qm ours
git merge dev >/dev/null 2>&1
printf 'R\n' > f.txt
git add f.txt
git commit -qm resolved
git show HEAD:f.txt
git show -s --format=%P HEAD | awk '{print NF}'
```

A. C / 2

B. B / 0

C. R / 1

D. R / 2

<details>
<summary>Answer and reasoning</summary>

**Correct: D — R / 2**

git add records the chosen resolution. The completed merge commit has both branch tips as parents.

**Why the other choices fail:**

- **A:** The resolved R content was staged and committed.
- **B:** Neither the incoming version nor a root commit is created here.
- **C:** This is completing a pending normal merge, not an unrelated ordinary single-parent commit.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "R\n2\n", "exit": 0} -->

</details>

<a id="se073"></a>
### SE073 — Aborting a merge

Use the base fixture; the working tree is clean immediately before the merge attempt. After abort, what HEAD, working and dev contents print?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm theirs
git switch -q main
printf 'C\n' > f.txt
git add f.txt
git commit -qm ours
git merge dev >/dev/null 2>&1
git merge --abort
git show HEAD:f.txt
cat f.txt
git show dev:f.txt
```

A. C / B / B

B. A / A / B

C. C / C / A

D. C / C / B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — C / C / B**

Because the merge started clean, abort returns main to its earlier state. The separate dev commit stays intact.

**Why the other choices fail:**

- **A:** That would leave incoming content in the working file.
- **B:** Abort does not rewind main's independent C commit.
- **C:** Abort does not delete dev's commit.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "C\nC\nB\n", "exit": 0} -->

</details>

<a id="se074"></a>
### SE074 — Fetching a peer's commit

Use the remote fixture. A peer commits and pushes B. After this repository fetches, output is HEAD, origin/main, and working content. What prints?

```bash
printf 'B\n' > "$SE_PEER/f.txt"
git -C "$SE_PEER" add f.txt
git -C "$SE_PEER" commit -qm peer-B
git -C "$SE_PEER" push -q origin main
git fetch -q origin
git show HEAD:f.txt
git show origin/main:f.txt
cat f.txt
```

A. B / B / B

B. A / A / A

C. B / A / B

D. A / B / A

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / B / A**

fetch updates origin/main from the server. It does not merge that change into main or change the working file.

**Why the other choices fail:**

- **A:** That adds integration/checkout effects not performed by this fetch.
- **B:** The remote-tracking reference was updated.
- **C:** That reverses local versus remote-tracking behaviour.

**Rule/source:** [Git: fetch][git-fetch].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "A\nB\nA\n", "exit": 0} -->

</details>

<a id="se075"></a>
### SE075 — Pull with --ff-only

Use the remote fixture. Local and peer commits affect different files but diverge in ancestry. Which result prints?

```bash
printf 'B\n' > f.txt
git add f.txt
git commit -qm local-B
printf 'G\n' > "$SE_PEER/g.txt"
git -C "$SE_PEER" add g.txt
git -C "$SE_PEER" commit -qm peer-G
git -C "$SE_PEER" push -q origin main
if git pull --ff-only -q origin main >/dev/null 2>&1; then echo integrated; else echo refused; fi
git log -1 --format=%s HEAD
git show HEAD:f.txt
```

A. integrated / a new merge commit / B

B. integrated / peer-G / A

C. refused / peer-G / A

D. refused / local-B / B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — refused / local-B / B**

The branches have diverged. --ff-only refuses even if the edits could merge without a content conflict.

**Why the other choices fail:**

- **A:** --ff-only explicitly refuses creating a merge commit.
- **B:** That would overwrite the local divergent commit without the requested topology rule.
- **C:** A refused integration does not move local main to the peer tip.

**Rule/source:** [Git: pull][git-pull].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "refused\nlocal-B\nB\n", "exit": 0} -->

</details>

<a id="se076"></a>
### SE076 — Pushing without committing

Use the remote fixture. f.txt changes without a commit. Output is server main content and local working content. What prints?

```bash
printf 'B\n' > f.txt
git push -q origin main
git --git-dir="$SE_REMOTE" show main:f.txt
cat f.txt
```

A. B / B

B. A / A

C. B / A

D. A / B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / B**

Push sends commit history. The branch still points to A; the uncommitted working edit is not sent.

**Why the other choices fail:**

- **A:** That assumes push stages and commits local edits.
- **B:** Push does not discard the local working edit.
- **C:** Neither automatic commit nor local discard is performed.

**Rule/source:** [Git: push][git-push].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "A\nB\n", "exit": 0} -->

</details>

<a id="se077"></a>
### SE077 — A rejected push

Use the remote fixture. Peer and local main replace the same base line differently. No force push is used. What result, local and server contents print?

```bash
printf 'B\n' > "$SE_PEER/f.txt"
git -C "$SE_PEER" add f.txt
git -C "$SE_PEER" commit -qm peer-B
git -C "$SE_PEER" push -q origin main
printf 'C\n' > f.txt
git add f.txt
git commit -qm local-C
if git push -q origin main >/dev/null 2>&1; then echo accepted; else echo rejected; fi
git show HEAD:f.txt
git --git-dir="$SE_REMOTE" show main:f.txt
```

A. rejected / C / A

B. accepted / C / C

C. rejected / C / B

D. rejected / A / B

<details>
<summary>Answer and reasoning</summary>

**Correct: C — rejected / C / B**

The push would overwrite divergent server history, so it is rejected. Local C and server B both stay where they are.

**Why the other choices fail:**

- **A:** Rejection does not remove the server's already accepted peer commit.
- **B:** No force/integration step authorized replacing the divergent server history.
- **D:** Rejection does not rewind the local branch.

**Rule/source:** [Git: push][git-push].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "rejected\nC\nB\n", "exit": 0} -->

</details>

<a id="se078"></a>
### SE078 — Fork, clone and branch

You need your own GitHub copy for a contribution, a local repository to edit, and a separate line of commits there. Which sequence provides these?

A. Fork on GitHub, clone the fork, then create a feature branch.

B. Create a branch, then use git pull to create your own GitHub repository.

C. Clone alone always creates a repository under your GitHub account.

D. Open a PR first; it automatically creates and commits your local edits.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Fork on GitHub, clone the fork, then create a feature branch.**

Fork creates your hosted copy. Clone creates the local repository. A branch provides a separate line of development.

**Why the other choices fail:**

- **B:** A branch is not a repository ownership copy; pull integrates fetched work.
- **C:** A local clone does not create an independently owned hosted fork.
- **D:** A PR proposes existing changes; it does not perform the stated local editing workflow.

**Rule/source:** [GitHub: forks][fork].

</details>

<a id="se079"></a>
### SE079 — Updating a pull request

A contributor opens a PR, gets feedback and pushes another commit to its source branch. Policy requires review and checks on the current candidate. Which statement is correct?

A. Later commits to the source branch can never change an open PR.

B. The PR includes the new work; assess earlier review and checks against the current candidate.

C. Opening a PR already merges it into the target branch.

D. git pull creates a GitHub PR.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The PR includes the new work; assess earlier review and checks against the current candidate.**

A PR proposes changes for review and merging. New source-branch commits update it. Earlier checks may not cover the changed candidate.

**Why the other choices fail:**

- **A:** Updating the proposal through its source branch is part of the workflow.
- **C:** Opening and merging are distinct actions.
- **D:** It fetches/integrates repository history instead.

**Rule/source:** [GitHub flow][flow].

</details>

<a id="se080"></a>
### SE080 — Commit identity and access

A student sets user.name and user.email to a maintainer's values but has no credentials or write access to that maintainer's repository. What prints?

A. Setting user.name opens and merges a PR.

B. The fields set commit identity; they do not grant remote write access.

C. Without GitHub access, local commits are impossible.

D. Matching user.email grants permission to push as the maintainer.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The fields set commit identity; they do not grant remote write access.**

These fields label commits. Authentication and repository permissions control remote access.

**Why the other choices fail:**

- **A:** Configuration does not perform those workflow actions.
- **C:** Local version-control operations can work offline.
- **D:** Metadata is not proof of authorization.

**Rule/source:** [Git: config][git-config].

</details>

## Validation and sources

The validator reads this Markdown, checks choices/hidden answers/links and the four sets, then runs the 23 Git traces in fresh temporary repositories and the 8 Java programs. It checks exact output, including status spaces. Code and fixture conditions are retained from the larger bank.

```bash
python3 SE/validation/check_se_bank.py
```

Validated with Git 2.56.0 and Java 17. Source rules were checked on 8 October 2026. The questions are original practice, not past-paper questions. For a stated calculation or policy, use the rule supplied in that question.

[artifacts]: https://www.scrum.org/resources/scrum-artifacts
[ci]: https://martinfowler.com/articles/continuousIntegration.html
[cicd]: https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment
[daily]: https://www.scrum.org/resources/what-is-a-daily-scrum
[delivery]: https://continuousdelivery.com/
[devops]: https://learn.microsoft.com/en-us/devops/what-is-devops
[done]: https://www.scrum.org/resources/definition-done
[flow]: https://docs.github.com/en/get-started/using-github/github-flow
[fork]: https://docs.github.com/en/pull-requests/reference/forks
[git-add]: https://git-scm.com/docs/git-add
[git-branch]: https://git-scm.com/docs/git-branch
[git-commit]: https://git-scm.com/docs/git-commit
[git-config]: https://git-scm.com/docs/git-config
[git-diff]: https://git-scm.com/docs/git-diff
[git-fetch]: https://git-scm.com/docs/git-fetch
[git-merge]: https://git-scm.com/docs/git-merge
[git-pull]: https://git-scm.com/docs/git-pull
[git-push]: https://git-scm.com/docs/git-push
[git-reset]: https://git-scm.com/docs/git-reset
[git-restore]: https://git-scm.com/docs/git-restore
[git-revert]: https://git-scm.com/docs/git-revert
[git-switch]: https://git-scm.com/docs/git-switch
[gitignore]: https://git-scm.com/docs/gitignore
[iac]: https://learn.microsoft.com/en-us/devops/what-is-devops
[increment]: https://www.scrum.org/resources/what-is-an-increment
[kanban]: https://kanbanguides.org/the-kanban-guide/2025.5/
[manifesto]: https://agilemanifesto.org/iso/en/manifesto.html
[map]: FS_SE_Learning_Map.md
[pipeline]: https://docs.github.com/en/actions/get-started/understand-github-actions
[planning]: https://www.scrum.org/resources/what-is-sprint-planning
[po]: https://www.scrum.org/resources/what-is-a-product-owner
[principles]: https://agilemanifesto.org/principles.html
[productbacklog]: https://www.scrum.org/resources/what-is-a-product-backlog
[refactor]: https://agilealliance.org/glossary/refactoring/
[retro]: https://www.scrum.org/resources/what-is-a-sprint-retrospective
[reviewretro]: https://www.scrum.org/resources/what-is-a-sprint-review
[scrum]: https://scrumguides.org/scrum-guide.html
[sm]: https://www.scrum.org/resources/what-is-a-scrum-master
[spiral]: https://software-engineering-book.com/web/spiral-model/
[sprintbacklog]: https://www.scrum.org/resources/what-is-a-sprint-backlog
[tdd]: https://agilealliance.org/glossary/tdd/
[team]: https://www.scrum.org/resources/scrum-team
