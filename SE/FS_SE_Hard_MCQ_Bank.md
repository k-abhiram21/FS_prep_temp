# SE: 120 hard scenario MCQs

**For the Pre-FS screening on 9 October 2026.** Scope: **Process Models; Agile & DevOps; Git & GitHub**. Prepared on 8 October. These are original practice questions, not previous-paper questions or a prediction of the paper. The announced 30 MCQs cover all subjects; the 30-question sets here are SE-only drills.

Choose **one best answer** using the stated conditions. Answers and explanations are hidden beneath each question. Close alternatives test distinctions and state changes; no answer depends on an unstated branch, release policy or environment. Read the explanation of the closest wrong option even when you answer correctly.

Learn the basics from the [direct SE study guide](FS_Revision_Notes.md), or revise with [Subject Atlas](../Subjects/visualize/README.md). Use the [SE learning map][map] for PDF pages, current repository coverage and selected deeper readings. The map corrects oversimplifications in the PDFs; this bank uses the **2020 Scrum Guide** for Scrum rules and the official Git manuals for command semantics.

## Coverage and priority

| Area | Questions | Main reasoning |
|---|---|---|
| Process models | SE001–SE024 (24) | Model selection, iterative/incremental distinction, prototyping evidence, risk-driven cycles, concurrency and verification |
| Agile and Scrum | SE025–SE054 (30) | Values, accountabilities, goals, scope, Done, events, artifacts, flow and engineering practices |
| DevOps | SE055–SE080 (26) | CI/CD boundaries, feedback, environments, artifact identity and pipeline gate failures |
| Git and GitHub | SE081–SE120 (40) | HEAD/index/working tree, undo, branch topology, conflicts, remote state and contribution workflow |

**50 executable traces:** 13 standalone Java questions (SE064–SE076) and 37 Git command questions (SE081–SE117). The Java programs model explicitly stated pipeline policies; they are not implementations of GitHub Actions scheduling. Process models are assessed through decisions and a supplied state-transition rule, rather than unrelated coding algorithms.

**Lower-priority supplements:** SE023–SE024 (V-model/RAD), SE052 (supplied flow calculation), SE104 (conflict index stages), SE115–SE117 (stash/amend/tags). These add useful depth but are not separately named in the notice. Study the main questions first if time is short. Reset/restore and fetch/merge reasoning strengthen the announced Git topic where the college notes are shallow.

## Four mixed practice sets

For exam pacing, attempt a set in **30 minutes**, with answers closed. For learning, allow extra time for the longer traces and review untimed. On a second attempt, explain the decisive state or rule before opening the answer. Each question appears in exactly one set.

| Set | Process | Agile | DevOps | Git | Questions in attempt order |
|---|---:|---:|---:|---:|---|
| 1 | 6 | 8 | 6 | 10 | [SE038](#se038), [SE104](#se104), [SE098](#se098), [SE061](#se061), [SE043](#se043), [SE006](#se006), [SE051](#se051), [SE003](#se003), [SE020](#se020), [SE114](#se114), [SE073](#se073), [SE064](#se064), [SE039](#se039), [SE083](#se083), [SE076](#se076), [SE100](#se100), [SE085](#se085), [SE008](#se008), [SE068](#se068), [SE029](#se029), [SE002](#se002), [SE017](#se017), [SE033](#se033), [SE035](#se035), [SE056](#se056), [SE025](#se025), [SE081](#se081), [SE108](#se108), [SE090](#se090), [SE086](#se086) |
| 2 | 6 | 8 | 6 | 10 | [SE111](#se111), [SE072](#se072), [SE032](#se032), [SE096](#se096), [SE030](#se030), [SE047](#se047), [SE024](#se024), [SE103](#se103), [SE099](#se099), [SE026](#se026), [SE071](#se071), [SE075](#se075), [SE107](#se107), [SE093](#se093), [SE095](#se095), [SE049](#se049), [SE013](#se013), [SE113](#se113), [SE044](#se044), [SE066](#se066), [SE050](#se050), [SE094](#se094), [SE074](#se074), [SE010](#se010), [SE012](#se012), [SE042](#se042), [SE106](#se106), [SE016](#se016), [SE065](#se065), [SE019](#se019) |
| 3 | 6 | 7 | 7 | 10 | [SE037](#se037), [SE118](#se118), [SE059](#se059), [SE057](#se057), [SE119](#se119), [SE031](#se031), [SE023](#se023), [SE102](#se102), [SE018](#se018), [SE063](#se063), [SE089](#se089), [SE060](#se060), [SE070](#se070), [SE001](#se001), [SE015](#se015), [SE055](#se055), [SE048](#se048), [SE011](#se011), [SE097](#se097), [SE041](#se041), [SE053](#se053), [SE045](#se045), [SE067](#se067), [SE084](#se084), [SE022](#se022), [SE110](#se110), [SE120](#se120), [SE109](#se109), [SE052](#se052), [SE091](#se091) |
| 4 | 6 | 7 | 7 | 10 | [SE079](#se079), [SE007](#se007), [SE117](#se117), [SE054](#se054), [SE077](#se077), [SE028](#se028), [SE116](#se116), [SE004](#se004), [SE115](#se115), [SE058](#se058), [SE101](#se101), [SE087](#se087), [SE088](#se088), [SE021](#se021), [SE046](#se046), [SE105](#se105), [SE062](#se062), [SE005](#se005), [SE082](#se082), [SE080](#se080), [SE009](#se009), [SE027](#se027), [SE036](#se036), [SE112](#se112), [SE040](#se040), [SE069](#se069), [SE078](#se078), [SE092](#se092), [SE014](#se014), [SE034](#se034) |

For each error, record: your choice, the decisive rule or state transition, why the closest distractor fails, and the result of a later reattempt. A high score on memorized choices is weaker evidence than solving the same state change with fresh values.

## Assumptions for executable questions

### Java traces

Every Java block is a complete independent Java 17 program named Main. Standard Java boolean evaluation and operator precedence apply. Only supplied state, thresholds and policy conditions may be assumed. A printed true does not itself prove a deployment actually occurred; interpret the variable named in that question.

### Base Git fixture

Every Git question starts independently in a new local repository unless it names the remote fixture:

- Current branch is main, with exactly one commit, whose subject is base.
- The only tracked path is f.txt, with bytes A followed by a newline. HEAD, index and working tree agree; status is clean.
- There are no remotes, untracked files, custom hooks or command aliases. Commands run in the repository root.
- A local dummy author identity is configured; line-ending conversion and signing are disabled. Bash and a modern Git with switch/restore are available.
- A failed command does **not** implicitly stop the script. Later lines continue unless the code explicitly branches or exits. Every question starts fresh.

In answer choices, **/** separates printed lines. Status spaces matter: M followed by two spaces describes an index change; a leading space then M describes a working-tree change. clean means status produces no output. HEAD denotes the current commit, and :f.txt addresses the index entry.

### Remote Git fixture

This adds a temporary local bare server, registered as origin, with its main branch at the same base commit. Local main tracks origin/main, initially at base. A peer clone also starts clean on main at base. Both repositories have a dummy author identity. SE_REMOTE is the absolute server directory; SE_PEER is the absolute peer directory. Each remote question starts with a fresh fixture. All push/fetch examples use these local temporary paths; running the validator does not contact GitHub.

## Questions

## Process models

<a id="se001"></a>
### SE001 — Lifecycle is not a phase-ordering rule

A project includes requirements, design, implementation, testing and maintenance. A manager concludes that merely using these activities proves the team follows Waterfall. Which judgement is strongest?

A. The conclusion is unsupported: the organization and repetition of activities identify the model.

B. The activity list establishes a sequential model because every lifecycle concern is represented.

C. The maintenance activity establishes an iterative model because post-release correction revisits code.

D. Requirements preceding the first implementation establishes Waterfall even if later cycles revisit both.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The conclusion is unsupported: the organization and repetition of activities identify the model.**

The same lifecycle concerns can be arranged sequentially, iteratively or concurrently. Naming the concerns does not establish their control flow.

**Why the other choices fail:**

- **B:** Completeness of the list does not establish whether activities overlap or repeat.
- **C:** Maintenance alone does not identify the organization of the original development process.
- **D:** An initial requirements discussion also fits iterative development; the later organization matters.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se002"></a>
### SE002 — Choose by constraints, not industry

Two banking projects differ. X implements a stable, fully specified reporting rule with formal phase approval. Y experiments with an unproven fraud-detection technique whose feasibility is uncertain. Which recommendation best uses the stated evidence?

A. Both must use Spiral because every banking project is high-risk.

B. A sequential plan may fit X; risk-driven exploration deserves priority in Y.

C. Y should postpone feasibility assessment until final acceptance testing.

D. Both must use Waterfall because banks require documents.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — A sequential plan may fit X; risk-driven exploration deserves priority in Y.**

Stability and approval constraints support a sequential plan for X. Y needs uncertainty reduction before committing to a full implementation.

**Why the other choices fail:**

- **A:** A domain label does not establish the specific uncertainty or risk of each project.
- **C:** That delays discovery of the uncertainty that could invalidate the whole plan.
- **D:** Documentation requirements do not prohibit experimentation or risk-driven cycles.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se003"></a>
### SE003 — Two dimensions of repeated development

Release 1 supports search. Release 2 adds payment and also revises the search interface after feedback. Which description captures both changes without conflating terms?

A. Combining the changes makes the process Waterfall.

B. Both changes are only iterative because a second release exists.

C. Adding payment is incremental; revising search is iterative; the overall approach combines both.

D. Both are only incremental because any revision is a new feature.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Adding payment is incremental; revising search is iterative; the overall approach combines both.**

An increment adds capability. Iteration revisits existing work. One development cycle can contain both.

**Why the other choices fail:**

- **A:** No strictly sequential phase organization is established.
- **B:** Repeated release alone does not erase the addition of new functionality.
- **D:** Improving an existing capability need not add a distinct capability.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se004"></a>
### SE004 — A successful prototype can be discarded

A disposable UI prototype reveals that users need a different workflow. The team discards its quick implementation and designs the production system using what it learned. What is the best assessment?

A. The prototype should be deployed unchanged because users approved its appearance.

B. Discarding code proves that requirements were already complete.

C. It failed because every successful prototype must evolve into production.

D. The prototype succeeded in reducing requirement uncertainty, even though its code was discarded.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The prototype succeeded in reducing requirement uncertainty, even though its code was discarded.**

A learning prototype is evaluated by the understanding it creates, not by how many prototype lines survive in production.

**Why the other choices fail:**

- **A:** Interface feedback does not establish production quality, safety or maintainability.
- **B:** The discovered workflow is evidence of new understanding.
- **C:** That confuses disposable and evolutionary prototyping.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se005"></a>
### SE005 — Evolutionary prototype and accumulated debt

A team evolves a quick prototype directly into the product. The UI is well liked, but its temporary data model cannot enforce required consistency. Which next action addresses the actual risk?

A. Replace it with a disposable prototype and assume that the new process label eliminates consistency risk.

B. Use the successful UI feedback as the baseline and defer consistency checks to production monitoring.

C. Rework the production design and verify the constraints before relying on the prototype as the product.

D. Preserve the temporary model until deployment; evolutionary prototyping requires architectural continuity.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Rework the production design and verify the constraints before relying on the prototype as the product.**

Evolutionary development still requires engineering quality. User enthusiasm for one aspect is not evidence that the architecture meets all constraints.

**Why the other choices fail:**

- **A:** Discarding one implementation can help, but a label alone does not demonstrate that the next design enforces the constraints.
- **B:** UI feedback does not establish the required consistency property; monitoring does not supply missing enforcement.
- **D:** Evolutionary prototyping permits correction. Continuity is not a requirement to retain known design defects.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se006"></a>
### SE006 — What makes a spiral cycle risk-driven?

Team A repeats design, code and test every month. Team B first examines objectives and alternatives, addresses the cycle's dominant risks, then chooses development work and plans the next cycle. Which conclusion follows?

A. Both demonstrate Spiral: each repeated test cycle automatically constitutes a risk-analysis phase.

B. B demonstrates only incremental development, because resolving a risk always adds a production feature.

C. Only A demonstrates Spiral: B has preliminary planning, so its cycle is necessarily sequential Waterfall.

D. B demonstrates the distinguishing risk-driven logic; repetition alone does not establish it for A.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — B demonstrates the distinguishing risk-driven logic; repetition alone does not establish it for A.**

A loop in a schedule is not sufficient. Risk assessment changes what evidence and development work the spiral cycle needs.

**Why the other choices fail:**

- **A:** Testing and repetition alone do not establish that risks drive objectives, alternatives and work selection.
- **B:** Risk reduction can involve analysis or experiments without a feature release.
- **C:** Planning within a risk-driven cycle is compatible with Spiral.

**Rule/source:** [Sommerville: spiral development][spiral].

</details>

<a id="se007"></a>
### SE007 — Choose the experiment that attacks the risk

A product's biggest uncertainty is whether a new sensor interface can meet a 20 ms response bound. The interface screens and user roles are already clear. Which first-cycle activity is most justified?

A. Remove the response bound from the plan without consulting stakeholders.

B. Build a small timing experiment around the uncertain sensor integration.

C. Prototype the already understood screens first, because stakeholder visibility should always outrank technical feasibility.

D. Implement all features before measuring latency.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Build a small timing experiment around the uncertain sensor integration.**

The experiment directly tests the dominant technical uncertainty and can change feasibility or design decisions.

**Why the other choices fail:**

- **A:** Deleting a constraint is not the same as satisfying or legitimately renegotiating it.
- **C:** That does not test the dominant timing uncertainty. Stakeholder visibility alone does not establish that the product can meet the constraint.
- **D:** That invests broadly before resolving the feasibility issue.

**Rule/source:** [Sommerville: spiral development][spiral].

</details>

<a id="se008"></a>
### SE008 — Concurrency does not mean absence of dependency

UI design, backend construction and testing of completed components overlap. A payment API change then forces revisions in two activities. What does concurrent development require here?

A. Overlapping activities remove the need for baselines because each activity can accept any API version independently.

B. Coordinated state changes and dependency management while activities continue to overlap.

C. The API change proves that overlap was impossible; concurrency requires all interfaces to remain permanently fixed.

D. Every activity must return to requirements, including unaffected completed components, before any work resumes.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Coordinated state changes and dependency management while activities continue to overlap.**

Concurrency allows activities to occupy different states. A change in one can still affect others and require review/revision.

**Why the other choices fail:**

- **A:** Different concurrent states still need consistent dependencies and coordination.
- **C:** Concurrency does not guarantee no changes; it requires managing their effects.
- **D:** The scenario establishes affected dependencies, not a mandatory global restart.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se009"></a>
### SE009 — An umbrella activity is not a final phase

A team performs configuration control and risk reviews during requirements, design, construction and deployment. A student calls this four unnecessary repetitions of a final phase. Which response is best?

A. These are cross-cutting support activities, so their recurrence across framework activities is expected.

B. Run these activities only at formal phase boundaries, since changes within a phase cannot affect a baseline.

C. Correct: configuration control must happen only before requirements.

D. Correct: risk work belongs only after deployment.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — These are cross-cutting support activities, so their recurrence across framework activities is expected.**

Umbrella activities support the process throughout development rather than being a single terminal step.

**Why the other choices fail:**

- **B:** Relevant changes and risks can arise during a phase; cross-cutting control is not limited to a terminal or boundary activity.
- **C:** Changes and baselines need control throughout development.
- **D:** Early risk work can prevent costly wrong commitments.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se010"></a>
### SE010 — Flexibility does not waive verification

After each prototype demonstration, a customer asks for changes. The team welcomes changes but stops regression testing to maintain speed. Which criticism is most precise?

A. Prototypes never need any testing because they are not always production systems.

B. Welcoming change guarantees that previously working functions cannot break.

C. All customer changes prove the team must adopt Waterfall immediately.

D. Feedback-driven change is compatible with the model, but omitting verification can make later versions unreliable.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Feedback-driven change is compatible with the model, but omitting verification can make later versions unreliable.**

Adaptation and quality are separate obligations. Frequent change increases the need to check that accepted behaviour still works.

**Why the other choices fail:**

- **A:** Tests can still be essential to evaluate the behaviour being explored.
- **B:** Change can introduce regressions regardless of the process label.
- **C:** Change alone does not establish that a sequential model would fit.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se011"></a>
### SE011 — An increment must deliver coherent capability

A team calls its database-only delivery the first usable increment, although users cannot execute any task until the UI and service arrive months later. Under a plan promising early user value, what is the main problem?

A. The database-only delivery meets the promise if it passes its own tests, because internal correctness establishes user usability.

B. Calling the delivery an iteration makes the absence of a usable workflow irrelevant to the stated early-value promise.

C. The only valid increment would include the entire final feature set, since partial functionality cannot be coherent.

D. The partition delivers a technical layer rather than the promised end-to-end usable capability.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The partition delivers a technical layer rather than the promised end-to-end usable capability.**

A layer can be useful internally, but that is different from delivering the early user capability promised by this plan.

**Why the other choices fail:**

- **A:** Internal tests do not establish that users can complete the promised end-to-end task.
- **B:** Changing the label does not satisfy the promised capability.
- **C:** A subset of capabilities can still be coherent and usable.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se012"></a>
### SE012 — Delivery is not synonymous with production release

An iteration yields a usable, tested increment. A marketing constraint postpones production launch. Which inference is justified?

A. No iteration occurred because production traffic stayed unchanged.

B. The increment is necessarily incomplete solely because marketing delayed release.

C. The increment can still be usable even though the business has not released it to production.

D. A postponed release retroactively makes all work sequential Waterfall.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The increment can still be usable even though the business has not released it to production.**

Engineering readiness and a business release decision are different conditions.

**Why the other choices fail:**

- **A:** Iteration concerns development/refinement, not mandatory production timing.
- **B:** The stated delay is external to its engineering completion.
- **D:** A release decision does not redefine the organization of development.

**Rule/source:** [Scrum.org: increment][increment].

</details>

<a id="se013"></a>
### SE013 — Stable requirements with unstable technology

Requirements are signed off, but an untested storage technology may not satisfy them. Which argument most directly challenges choosing a fully committed sequential plan merely because requirements are stable?

A. Requirement sign-off is enough; feasibility becomes relevant only if the customer later changes desired behaviour.

B. Technical feasibility uncertainty still needs early evidence, despite stable desired behaviour.

C. The project must abandon all planned phases because any technical risk makes structured planning invalid.

D. A final acceptance test is the best first feasibility check because earlier experiments cannot use a complete requirement baseline.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Technical feasibility uncertainty still needs early evidence, despite stable desired behaviour.**

Requirement stability answers what is wanted; it does not establish whether the chosen technology can deliver it.

**Why the other choices fail:**

- **A:** Even a fixed desired behaviour can be infeasible on the selected technology.
- **C:** The evidence supports early uncertainty reduction, not an absolute prohibition on phases or planning.
- **D:** A focused experiment can test the uncertain property much earlier, avoiding a costly commitment.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se014"></a>
### SE014 — Read the feedback location

Plan X first shows users executable behaviour after all features are built. Plan Y shows a working slice after each capability is completed. Both run unit tests. Which risk is Y more directly reducing?

A. Every possible production incident.

B. The need to define any acceptance condition.

C. The need to integrate capabilities.

D. Late discovery that implemented behaviour does not meet users' actual needs.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Late discovery that implemented behaviour does not meet users' actual needs.**

Early user feedback can reveal misunderstandings before all capabilities depend on them. Unit tests alone may check the wrong understood requirements.

**Why the other choices fail:**

- **A:** User feedback cannot eliminate all operational failures.
- **B:** Feedback complements explicit acceptance reasoning.
- **C:** Incremental deliveries still need integration.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se015"></a>
### SE015 — Controlled backtracking in a sequential plan

During system testing in a sequential project, the team discovers a design error and returns to design under formal change control. Which assessment avoids the PDF's oversimplified absolute?

A. Because the team can return to design, the cost and feedback limitations of sequential development disappear.

B. The correction proves that the project was iterative from inception, regardless of how all other work was organized.

C. Change approval transfers all verification responsibility to the approver, so retesting affected behaviour is redundant.

D. Rework is possible, but reopening prior decisions can impose cost and coordination overhead.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Rework is possible, but reopening prior decisions can impose cost and coordination overhead.**

Sequential planning discourages uncontrolled backtracking; it does not make correction physically impossible.

**Why the other choices fail:**

- **A:** The possibility of rework does not remove its engineering or coordination cost.
- **B:** A local rework loop does not establish the organizing model of the whole project.
- **C:** Approval authorizes or controls a change; it does not establish implementation correctness.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se016"></a>
### SE016 — Separate progress evidence from paperwork

Two teams have completed the same number of design pages. One has a verified usable slice; the other has no executable behaviour. What can be concluded without inventing a universal productivity score?

A. The first has additional evidence of usable behaviour; document counts alone do not establish equal product progress.

B. Page count proves identical completion.

C. The first system must be bug-free.

D. The first must have lower total project cost, because executable evidence always makes development cheaper.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The first has additional evidence of usable behaviour; document counts alone do not establish equal product progress.**

Work-product quantity and validated capability measure different things. The evidence supports a limited comparison, not a claim about all quality or cost.

**Why the other choices fail:**

- **B:** Document volume does not establish equivalent functionality.
- **C:** A verified slice does not prove the whole system has no defects.
- **D:** The evidence establishes a usable slice, not total cost. Obtaining that evidence has a cost, and other work may remain.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se017"></a>
### SE017 — Prototype fidelity and valid inference

A prototype uses fabricated responses to test navigation. Users complete the workflow quickly. Which inference would exceed the evidence?

A. The real backend can sustain the required peak transaction load.

B. The backend remains a separate uncertainty.

C. The workflow deserves further refinement using feedback.

D. Users could follow the demonstrated navigation.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The real backend can sustain the required peak transaction load.**

Navigation evidence from fabricated responses does not measure backend throughput. A separate representative performance experiment is needed.

**Why the other choices fail:**

- **B:** It was not exercised representatively.
- **C:** Feedback is precisely the prototype's purpose.
- **D:** That is directly supported by the observed task.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se018"></a>
### SE018 — An event changes an activity state

In this explicitly defined concurrent model, reviewPass sends UnderReview to Baselined; reviewFail sends it to AwaitingChanges; editing sends AwaitingChanges to UnderRevision. Starting at UnderReview, events are reviewFail then editing. Which final state and interpretation are correct?

A. Baselined; any completed review is an approval.

B. UnderRevision; the activity is being corrected after review feedback.

C. Done; two events always complete an activity.

D. AwaitingChanges; editing cannot affect state.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — UnderRevision; the activity is being corrected after review feedback.**

Follow both transitions: UnderReview -> AwaitingChanges -> UnderRevision. Other activities can occupy unrelated states.

**Why the other choices fail:**

- **A:** reviewFail is expressly different from reviewPass.
- **C:** Completion depends on transition meaning, not event count.
- **D:** The supplied transition explicitly makes it affect state.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se019"></a>
### SE019 — Risk resolution can select different development work

A spiral cycle identifies UI uncertainty; a later cycle identifies safety-proof uncertainty. Must both cycles use the same implementation technique to remain spiral development?

A. Yes; changing techniques invalidates every earlier risk assessment.

B. Yes; every cycle must release exactly one new user feature.

C. No, because risk assessment is optional decoration.

D. No; risk-driven cycles can select different development/validation techniques for their dominant risks.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — No; risk-driven cycles can select different development/validation techniques for their dominant risks.**

The organizing principle is risk-driven choice, not repeating an identical construction recipe.

**Why the other choices fail:**

- **A:** Different risks can require different evidence.
- **B:** A cycle can focus on feasibility, design or other risk-reducing work.
- **C:** Risk assessment is central to the distinction.

**Rule/source:** [Sommerville: spiral development][spiral].

</details>

<a id="se020"></a>
### SE020 — Incremental integration is not optional

Each delivered capability passes isolated tests, but a later shared authentication change breaks two earlier capabilities. Which improvement most directly addresses the failure mode?

A. Require stronger isolated tests of the new authentication component and treat their pass as sufficient evidence for earlier capabilities.

B. Verify only the newest capability after each increment, because earlier acceptance permanently certifies all future combinations.

C. Check integrated behaviour and regressions as shared components and new increments change.

D. Freeze the previously delivered tests because an accepted increment cannot acquire a regression from future work.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Check integrated behaviour and regressions as shared components and new increments change.**

Individually correct capabilities can interact incorrectly through shared dependencies. Existing increments must remain coherent with new work.

**Why the other choices fail:**

- **A:** The failure is in interactions with earlier capabilities; stronger isolation alone does not demonstrate their integration.
- **B:** Acceptance of an earlier version does not certify combinations with future changes.
- **D:** A later shared change can alter earlier behaviour. Those tests remain valuable.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se021"></a>
### SE021 — Process change versus product change

After repeated review delays, a team changes its review workflow. No user feature changes. Which description is most accurate?

A. Review delay is irrelevant to engineering because no code failed.

B. It is process improvement that may later affect delivery; it is not itself evidence of a new product capability.

C. It is impossible to improve a process without rewriting all software.

D. A new review meeting automatically creates a product increment.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — It is process improvement that may later affect delivery; it is not itself evidence of a new product capability.**

Improving how work is performed and adding what the product does are distinct changes.

**Why the other choices fail:**

- **A:** Coordination and feedback latency can affect delivery and defect discovery.
- **C:** Workflow changes can occur without changing product code.
- **D:** An event is not usable product capability.

**Rule/source:** [College PDF audit and topic map][map].

</details>

<a id="se022"></a>
### SE022 — Distinguishing a learning milestone from a release

A risk experiment proves a required cryptographic component is infeasible on the selected hardware. No product is released, but the team avoids six months of planned implementation. Which measure best captures the cycle's immediate contribution?

A. Zero value, because no production feature shipped.

B. Proof that prototyping is always cheaper than every other activity.

C. A consequential feasibility uncertainty was resolved before a costly commitment.

D. Guaranteed final success, because one risk is now known.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A consequential feasibility uncertainty was resolved before a costly commitment.**

Useful risk reduction can produce a decision to change or abandon a plan. Feature count alone misses that value.

**Why the other choices fail:**

- **A:** That ignores avoided investment based on new evidence.
- **B:** One experiment cannot establish a universal cost ordering.
- **D:** Other risks remain, and the current plan may need replacement.

**Rule/source:** [Sommerville: spiral development][spiral].

</details>

<a id="se023"></a>
### SE023 — V-model does not put all testing at the end

*Supplement: lower priority than the main syllabus questions.*

In a V-model discussion, a student says testing starts to matter only after coding, so requirements need no acceptance-test planning. Which correction is strongest?

A. Every test level checks exactly the same property.

B. Development concerns are paired with corresponding verification/validation concerns; test thinking should inform earlier decisions.

C. V-model guarantees that changing a requirement is free.

D. V-model eliminates the need to implement the system.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Development concerns are paired with corresponding verification/validation concerns; test thinking should inform earlier decisions.**

The V relationship connects development stages to appropriate testing. It is more than an extra test box after coding.

**Why the other choices fail:**

- **A:** Different levels address different integration and requirement concerns.
- **C:** The model retains a structured, relatively inflexible organization.
- **D:** Verification/validation structure does not replace construction.

**Rule/source:** [IBM: SDLC models][sdlc].

</details>

<a id="se024"></a>
### SE024 — RAD and an unsuitable feedback assumption

*Supplement: lower priority than the main syllabus questions.*

A proposal recommends rapid prototyping and short feedback cycles, but the only users who can evaluate the workflows will be unavailable for months. Which condition most directly weakens the proposal?

A. Its feedback mechanism cannot operate at the proposed cadence.

B. Rapid internal coding alone supplies the missing user validation, so the feedback availability does not matter.

C. Detailed estimates of every prototype screen automatically compensate for the missing workflow evaluations.

D. The team must choose sequential development solely because rapid approaches cannot document decisions.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Its feedback mechanism cannot operate at the proposed cadence.**

Rapid feedback-dependent refinement requires access to meaningful feedback. The proposed cadence lacks that enabling condition.

**Why the other choices fail:**

- **B:** Implementation speed does not establish that the workflows satisfy the evaluators.
- **C:** Estimates do not provide the behavioural feedback the proposal requires.
- **D:** Documentation is compatible with rapid approaches; the stated issue is feedback access.

**Rule/source:** [IBM: SDLC models][sdlc].

</details>

## Agile and Scrum

<a id="se025"></a>
### SE025 — Documentation that enables change

An Agile team maintains a short interface contract because other teams need it to integrate safely. Someone demands its deletion: “working software over documentation.” Which response best applies the value?

A. Keep useful documentation while prioritizing working outcomes; the value is a preference, not a ban.

B. Make complete documentation the primary progress measure, since a useful contract means documentation always outranks working behaviour.

C. Delete it once the first build works; Agile values make future cross-team coordination documents unnecessary.

D. Replace the written contract with conversation and assume this alone guarantees the same coordination evidence.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Keep useful documentation while prioritizing working outcomes; the value is a preference, not a ban.**

The Manifesto retains value in documentation and plans. The contract has a stated coordination purpose.

**Why the other choices fail:**

- **B:** Useful documentation does not reverse the stated preference for working outcomes.
- **C:** A working build does not remove the stated integration purpose of the contract.
- **D:** Conversation can help, but the scenario supplies a concrete need for the contract; replacing it does not automatically preserve that support.

**Rule/source:** [Agile Manifesto][manifesto].

</details>

<a id="se026"></a>
### SE026 — Welcoming a change is not adding unlimited work

A late request is valuable, but capacity and the delivery date are fixed. Which response best combines adaptability with a sustainable plan?

A. Discuss value and tradeoffs, reorder work, and adjust scope rather than promising all old and new work unchanged.

B. Stop measuring working outcomes and count requests accepted.

C. Reject every late request because the original plan exists.

D. Accept everything and mandate indefinite overtime.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Discuss value and tradeoffs, reorder work, and adjust scope rather than promising all old and new work unchanged.**

Responding to change requires a feasible revised plan, not unlimited capacity. Priorities and scope can change.

**Why the other choices fail:**

- **B:** Request count does not show delivered value.
- **C:** That suppresses feedback rather than evaluating it.
- **D:** That ignores capacity and sustainable pace.

**Rule/source:** [Agile principles][principles].

</details>

<a id="se027"></a>
### SE027 — A timebox constrains time, not permission to ship defects

A team cannot finish all forecast items within a fixed Sprint. It can meet the Sprint Goal by dropping one optional item. Which response best preserves the relevant constraints?

A. Extend the Sprint automatically until all selected items finish.

B. Lower the Definition of Done only for this Sprint to count everything.

C. Cancel immediately whenever any forecast item is at risk.

D. Renegotiate work toward the Sprint Goal while preserving quality and the timebox.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Renegotiate work toward the Sprint Goal while preserving quality and the timebox.**

The work plan can adapt; quality should not be lowered merely to make every forecast item appear complete.

**Why the other choices fail:**

- **A:** That defeats the fixed-length event.
- **B:** That hides incomplete quality rather than delivering usable work.
- **C:** A missed forecast item does not necessarily make the Sprint Goal obsolete.

**Rule/source:** [Scrum.org: sprint backlog][sprintbacklog].

</details>

<a id="se028"></a>
### SE028 — Busy teams and weak outcome evidence

Team X reports 100% utilization and twice as many completed tickets, but users still cannot perform the intended workflow. Which conclusion is best supported?

A. Full utilization establishes short delivery lead time because busy people cannot create queues.

B. The ticket count establishes value if ticket completion is recorded consistently, even when the workflow is unusable.

C. Activity measures alone do not establish delivery of useful working software.

D. The workflow failure proves all completed tickets were worthless, including any independently useful technical work.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Activity measures alone do not establish delivery of useful working software.**

The observed workflow failure is directly relevant to the outcome. Utilization and ticket counts may describe activity without demonstrating value.

**Why the other choices fail:**

- **A:** Highly utilized people can accumulate waiting work and produce long lead times.
- **B:** Consistent measurement of activity does not turn it into evidence of user value.
- **D:** The evidence defeats the claimed working outcome; it does not establish zero value for every activity.

**Rule/source:** [Agile principles][principles].

</details>

<a id="se029"></a>
### SE029 — Delegation versus accountability

The Product Owner asks an analyst to draft backlog descriptions and collect stakeholder input. Who remains accountable for effective Product Backlog management?

A. The analyst and Product Owner jointly become a Product Owner committee for the same product.

B. The Product Owner, even when some work is delegated.

C. The analyst inherits Product Owner accountability for each item they describe, while the original Product Owner keeps only ordering.

D. Accountability moves to the Scrum Master once the work crosses a role boundary.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The Product Owner, even when some work is delegated.**

Delegating tasks does not transfer the named accountability.

**Why the other choices fail:**

- **A:** Delegation does not turn the Product Owner into a committee.
- **C:** Delegating descriptions does not partition the named Product Owner accountability into new accountabilities.
- **D:** The Scrum Master does not inherit Product Backlog management from delegation.

**Rule/source:** [Scrum.org: product owner][po].

</details>

<a id="se030"></a>
### SE030 — Removing an impediment without taking over

An external approval delay blocks the team. The Scrum Master helps establish an effective approval route, then lets Developers decide how to reorganize their work. Which interpretation is strongest?

A. Developers can ignore quality because the Scrum Master handled the obstacle.

B. This supports team effectiveness and self-management without converting the Scrum Master into a task dispatcher.

C. The Scrum Master must avoid all external coordination.

D. The Scrum Master must assign every technical task personally.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — This supports team effectiveness and self-management without converting the Scrum Master into a task dispatcher.**

Enabling removal of impediments is compatible with Developers controlling their work plan.

**Why the other choices fail:**

- **A:** Quality obligations remain regardless of who helps remove a blocker.
- **C:** Organizational obstacles can require coordination.
- **D:** That is not implied by facilitation or impediment removal.

**Rule/source:** [Scrum.org: scrum master][sm].

</details>

<a id="se031"></a>
### SE031 — Who chooses how much and how?

During Sprint Planning, the Product Owner explains the most valuable work. A director then fixes both a mandatory item count and each Developer's technical solution. Which correction best matches Scrum?

A. Developers select feasible work in discussion with the Product Owner and decide how to turn it into an Increment.

B. Developers must ignore product value when selecting work.

C. The Scrum Master must make the technical decisions instead.

D. The Product Owner must implement every selected item.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Developers select feasible work in discussion with the Product Owner and decide how to turn it into an Increment.**

Value input is essential, but the forecast and technical work plan are not unilaterally dictated by the director.

**Why the other choices fail:**

- **B:** Selection still involves discussion with the Product Owner and the Sprint purpose.
- **C:** Replacing one dispatcher with another does not support self-management.
- **D:** Ordering/value accountability is not sole implementation responsibility.

**Rule/source:** [Scrum.org: what is sprint planning][planning].

</details>

<a id="se032"></a>
### SE032 — A Sprint Backlog is more than a selected list

A team records only the IDs of selected Product Backlog items. It has no stated Sprint objective and no delivery plan. What is missing from its Sprint Backlog representation?

A. All future Product Backlog items.

B. A mandatory specific commercial task-board product.

C. A guarantee that requirements never change.

D. The Sprint Goal and an actionable plan for delivering the selected work.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The Sprint Goal and an actionable plan for delivering the selected work.**

The artifact connects why, what and how, rather than being only a list of item IDs.

**Why the other choices fail:**

- **A:** That is the broader product backlog, not the Sprint plan.
- **B:** A vendor tool is not required.
- **C:** The plan can adapt as more is learned.

**Rule/source:** [Scrum.org: sprint backlog][sprintbacklog].

</details>

<a id="se033"></a>
### SE033 — Change work without changing the objective

The Sprint Goal is reliable checkout. Developers discover that replacing an optional cosmetic item with a payment-retry fix is necessary. The Product Owner agrees; quality is maintained. Which assessment is best?

A. Scope can be renegotiated within the Sprint when the Sprint Goal is preserved.

B. The team must lower quality to justify the substitution.

C. The Product Owner may replace the Sprint Goal daily without consequences.

D. Any item change invalidates Scrum.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Scope can be renegotiated within the Sprint when the Sprint Goal is preserved.**

The goal supplies coherence while the exact work can adapt to new understanding.

**Why the other choices fail:**

- **B:** Quality does not need to be reduced for legitimate scope adaptation.
- **C:** Protecting the existing goal is a constraint in the scenario.
- **D:** That treats a forecast as an unchangeable contract.

**Rule/source:** [Scrum.org: sprint backlog][sprintbacklog].

</details>

<a id="se034"></a>
### SE034 — Cancellation authority and the actual trigger

A regulation makes the Sprint Goal obsolete. Developers can still finish all originally selected tasks, but those tasks would pursue the obsolete objective. Which action fits the stated situation?

A. Completion of all task estimates prevents cancellation under every circumstance.

B. The Product Owner may cancel the Sprint because its Goal has become obsolete.

C. The Sprint must continue because cancellation is never permitted.

D. Only the Scrum Master may cancel any Sprint.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The Product Owner may cancel the Sprint because its Goal has become obsolete.**

Finishing old tasks is not sufficient justification to pursue an invalid objective. The cancellation authority is specific.

**Why the other choices fail:**

- **A:** Task feasibility does not make an obsolete objective valuable.
- **C:** Obsolescence is a recognized reason for cancellation.
- **D:** That is not the specified authority.

**Rule/source:** [Scrum Guide (2020)][scrum].

</details>

<a id="se035"></a>
### SE035 — Acceptance of a feature is not the entire Done condition

A stakeholder accepts a feature demo. The team's Definition of Done also requires integration tests, which are failing. Can the feature count as part of the Increment?

A. No; it can count only after production launch even if all Done checks later pass before that launch.

B. Yes; acceptance certifies value, and value automatically overrides a failing Definition of Done check.

C. No; stakeholder acceptance of the demo does not remove the unmet Done requirements.

D. Yes; count it now and put the integration-test repair into a separately estimated next-Sprint item.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — No; stakeholder acceptance of the demo does not remove the unmet Done requirements.**

The stated common quality criterion remains unsatisfied even if one stakeholder likes the demonstrated behaviour.

**Why the other choices fail:**

- **A:** Production release is not required solely for an Increment to meet Done. The current obstacle is failing checks.
- **B:** Acceptance of demonstrated value and satisfying the common quality criterion are distinct.
- **D:** Reclassifying the remaining work does not make this item meet the current Definition of Done.

**Rule/source:** [Scrum.org: definition done][done].

</details>

<a id="se036"></a>
### SE036 — The combined Increment must work

A new capability works alone but breaks a previously Done capability when integrated. Which claim is most defensible?

A. Defer all integration responsibility to operations while treating development completion as sufficient for Done.

B. Count only the new capability as Done; previously Done work is outside the quality boundary for every later Increment.

C. Isolated success does not establish a usable, verified additive Increment.

D. Count the combined Increment as usable because isolated unit success is stronger than the failing integration evidence.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Isolated success does not establish a usable, verified additive Increment.**

New work must work with the prior product; an integration regression defeats that evidence.

**Why the other choices fail:**

- **A:** A usable product Increment cannot be established merely by handing unresolved integration to operations.
- **B:** An Increment must work with prior Increments; earlier Done status does not excuse a newly introduced regression.
- **D:** The integration failure directly contradicts the claimed usable combination.

**Rule/source:** [Scrum.org: increment][increment].

</details>

<a id="se037"></a>
### SE037 — Release before the Review

An Increment meets Done on Tuesday. Its safe release is valuable immediately. Sprint Review is Friday. Does Scrum itself require the team to wait until Friday solely because the Review has not occurred?

A. Yes; multiple Increments within one Sprint are prohibited.

B. Yes; every production release must be authorized in the Review.

C. No; the Review is not a mandatory release gate.

D. No; therefore security and other stated quality requirements may be skipped.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — No; the Review is not a mandatory release gate.**

A usable Increment may be delivered earlier. Other organizational release policies could still impose gates, but none are given here.

**Why the other choices fail:**

- **A:** More than one Increment can be created.
- **B:** That adds a rule not supplied by Scrum.
- **D:** Release timing flexibility does not waive Done or other constraints.

**Rule/source:** [Scrum.org: increment][increment].

</details>

<a id="se038"></a>
### SE038 — Product adaptation or work-process adaptation?

Meeting X uses stakeholder feedback to reconsider upcoming product work. Meeting Y examines review delays and agrees on a better collaboration practice. Which pairing is best?

A. X is Retrospective; Y is Review.

B. Both are Daily Scrum because any feedback is daily planning.

C. Neither is allowed to change anything after inspection.

D. X aligns with Sprint Review; Y aligns with Sprint Retrospective.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — X aligns with Sprint Review; Y aligns with Sprint Retrospective.**

X concerns product outcomes and future direction; Y concerns improving the way the team works.

**Why the other choices fail:**

- **A:** That reverses their main purposes.
- **B:** The stakeholders/product adaptation and process improvement distinguish these meetings.
- **C:** Inspection should inform adaptation.

**Rule/source:** [Scrum.org: Sprint Review][reviewretro]; [Scrum.org: Sprint Retrospective][retro].

</details>

<a id="se039"></a>
### SE039 — Daily Scrum without the three-question script

Developers hold a 15-minute Daily Scrum focused on progress toward the Sprint Goal and the next actionable plan, using a board rather than yesterday/today/blockers questions. Which judgement fits the defined rules?

A. Valid only if the Scrum Master assigns each person's next task.

B. Invalid because the Sprint Backlog cannot be adapted daily.

C. The format can be valid; the purpose matters and the three-question script is not mandatory.

D. Invalid solely because the three questions were not asked.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The format can be valid; the purpose matters and the three-question script is not mandatory.**

Developers can choose a useful structure while preserving the goal-focused purpose and timebox.

**Why the other choices fail:**

- **A:** The event supports Developers' self-management.
- **B:** Daily inspection can inform adaptation.
- **D:** That treats one technique as a compulsory rule.

**Rule/source:** [Scrum.org: daily scrum][daily].

</details>

<a id="se040"></a>
### SE040 — A Product Owner doing Sprint work

The Product Owner is actively working on an item in the Sprint Backlog and joins the Daily Scrum. In what capacity does the stated exception permit participation?

A. Never, because role labels prohibit any contribution to Sprint items.

B. As a substitute for the Sprint Review's stakeholders.

C. As a Developer contributing to the Sprint work, rather than as a manager collecting status.

D. Only as the chair who approves each update.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — As a Developer contributing to the Sprint work, rather than as a manager collecting status.**

Participation follows the work contribution, not an entitlement to control a reporting meeting.

**Why the other choices fail:**

- **A:** The explicit active-work exception allows participation as a Developer.
- **B:** Daily planning and stakeholder product review serve different purposes.
- **D:** The event is not a managerial approval ritual.

**Rule/source:** [Scrum.org: daily scrum][daily].

</details>

<a id="se041"></a>
### SE041 — Refinement and formal events

A team continually splits and clarifies future backlog items. Someone declares its weekly refinement meeting a sixth formal Scrum event that every Scrum team must schedule identically. Which correction is most accurate?

A. Refinement is ongoing work, but that particular meeting is not an additional formal Scrum event.

B. Refinement becomes a formal event whenever it has a recurring calendar invitation and a fixed timebox.

C. Refinement is prohibited during a Sprint because only selected items may be discussed before the Sprint ends.

D. The Product Owner must perform all refinement alone because Developers may not size future work.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Refinement is ongoing work, but that particular meeting is not an additional formal Scrum event.**

A team can use a meeting to refine items without turning that implementation technique into a universal formal event.

**Why the other choices fail:**

- **B:** Scheduling a technique does not add a formal event to Scrum.
- **C:** Ongoing refinement can clarify future work during a Sprint.
- **D:** Developers doing the work are responsible for sizing; refinement can involve collaboration.

**Rule/source:** [Scrum.org: product backlog][productbacklog].

</details>

<a id="se042"></a>
### SE042 — Upper limits are not required meeting lengths

For a one-month Sprint, Planning is completed effectively in six hours. A manager demands two idle hours because the Guide specifies a maximum of eight. Which response is best?

A. The team must wait exactly eight hours even after the purpose is achieved.

B. The Sprint must be shortened by two hours to compensate.

C. Planning may never use more than fifteen minutes.

D. A maximum timebox is an upper bound, not a required duration.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A maximum timebox is an upper bound, not a required duration.**

Finishing the event's purpose within six hours does not require filling eight. Shorter Sprints usually have shorter events.

**Why the other choices fail:**

- **A:** That confuses maximum with fixed minimum duration.
- **B:** An event ending earlier does not mechanically alter the Sprint length.
- **C:** That is the Daily Scrum timebox, not Planning's maximum.

**Rule/source:** [Scrum.org: what is sprint planning][planning].

</details>

<a id="se043"></a>
### SE043 — Artifact, commitment and optional aid

Which set correctly separates the formal Sprint artifact, its commitment, and an optional forecasting aid?

A. Sprint Goal; Sprint Backlog; Increment.

B. Sprint Backlog; Sprint Goal; burn-down chart.

C. Burn-down chart; Scrum Master; Product Backlog.

D. Product Backlog; Definition of Done; Sprint Review.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Sprint Backlog; Sprint Goal; burn-down chart.**

The artifact is the work plan, its commitment supplies the objective, and a chart can help inspect progress.

**Why the other choices fail:**

- **A:** The first two are reversed; Increment is a formal artifact, not merely an aid.
- **C:** Neither the chart nor a person supplies this artifact/commitment pairing.
- **D:** Product Backlog pairs with Product Goal; Review is an event.

**Rule/source:** [Scrum.org: scrum artifacts][artifacts].

</details>

<a id="se044"></a>
### SE044 — Quality standards under deadline pressure

The organization requires security checks in the common Done standard. A team proposes ignoring them for one Sprint to raise its completed-item count. Which judgement follows?

A. The item count overrides the quality criterion.

B. The team cannot use a weaker Done standard to count insecure unfinished work as Done.

C. Only the Product Owner's satisfaction matters.

D. The team must never add any stronger quality condition.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The team cannot use a weaker Done standard to count insecure unfinished work as Done.**

Organization-wide Done standards are a minimum. Scope/capacity choices must not disguise unmet required quality.

**Why the other choices fail:**

- **A:** A metric does not authorize weaker required quality.
- **C:** Stakeholder value and shared quality criteria are distinct.
- **D:** Teams may apply more stringent measures; the proposed weakening is the problem.

**Rule/source:** [Scrum.org: definition done][done].

</details>

<a id="se045"></a>
### SE045 — One product across multiple Scrum teams

Three Scrum teams work on the same product. Each wants a different Product Owner and unrelated Product Goal, while claiming to pursue one coherent product. Which arrangement aligns most directly with the Guide?

A. Share the Product Goal, Product Backlog and Product Owner for that product.

B. Keep a single Product Owner but require identical Sprint Goals and identical technical tasks in all three teams.

C. Use a shared Definition of Done while keeping independent Product Owners and unrelated Product Goals for the same product.

D. Use a shared Product Goal but independent ordered Product Backlogs and Product Owners; goal alignment replaces the other shared elements.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Share the Product Goal, Product Backlog and Product Owner for that product.**

A coherent product direction and ordered source of work support coordination across its teams.

**Why the other choices fail:**

- **B:** Shared product direction does not require identical Sprint-level objectives and local technical work.
- **C:** Common quality is useful but does not replace shared product direction, ordering and accountability.
- **D:** For the same product, the Guide specifies the shared Product Goal, Product Backlog and Product Owner.

**Rule/source:** [Scrum.org: scrum team][team].

</details>

<a id="se046"></a>
### SE046 — Cross-functional team, not identical specialists

A Scrum team collectively has the skills to deliver a usable Increment. Individual members specialize but collaborate across boundaries. A student rejects this because each person cannot independently perform every skill. Which correction is best?

A. Every member must independently be able to perform every delivery skill; otherwise the team cannot be cross-functional.

B. Cross-functionality concerns the team's collective capability; identical skills in every individual are not required.

C. Cross-functionality is established by having every skill somewhere in the organization even when the team cannot deliver a usable Increment.

D. Specialization implies a Scrum Master must assign work, because self-management applies only to generalists.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Cross-functionality concerns the team's collective capability; identical skills in every individual are not required.**

Self-management and collaboration can combine different expertise within a coherent team.

**Why the other choices fail:**

- **A:** Cross-functionality is a collective team property, not an identical-skill requirement.
- **C:** Organizational skill availability alone does not establish the stated team capability.
- **D:** Different expertise does not eliminate Developers’ self-management.

**Rule/source:** [Scrum.org: scrum team][team].

</details>

<a id="se047"></a>
### SE047 — An unfinished forecast does not extend a Sprint

A fixed two-week Sprint ends with one selected item unfinished. The Sprint Goal remains meaningful and some other work is Done. Which response preserves the timebox?

A. Automatically select the unfinished item first next Sprint because the previous forecast permanently establishes its priority.

B. End the Sprint on schedule and make the unfinished work transparent for future planning.

C. Extend only the development work by one day while keeping the Sprint label unchanged; this preserves the actual timebox.

D. Count the unfinished item in the Increment because other work meets the Sprint Goal and quality can be averaged across items.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — End the Sprint on schedule and make the unfinished work transparent for future planning.**

A Sprint is fixed length. An incomplete item is not completed merely because its estimated finish is close.

**Why the other choices fail:**

- **A:** Future selection reflects current ordering and feasible planning; it is not automatic carryover.
- **C:** Changing the effective Sprint end still extends the timebox.
- **D:** Meeting the Goal with other work does not make unfinished work satisfy Done.

**Rule/source:** [Scrum Guide (2020)][scrum].

</details>

<a id="se048"></a>
### SE048 — Future selection is not automatic carryover

An unfinished item returns to the Product Backlog. A higher-value need has since emerged. Which conclusion is safest?

A. It must always be selected first regardless of changed value.

B. It may never be selected again because it missed a Sprint.

C. The unfinished item is reconsidered in the ordered backlog; it is not guaranteed automatic selection next Sprint.

D. It is already part of the Increment because some work was invested.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The unfinished item is reconsidered in the ordered backlog; it is not guaranteed automatic selection next Sprint.**

Future work should reflect current product ordering and feasible planning, rather than mechanically preserving the old forecast.

**Why the other choices fail:**

- **A:** That treats prior selection as permanent priority.
- **B:** There is no such permanent prohibition.
- **D:** Investment does not establish Done.

**Rule/source:** [Scrum.org: product backlog][productbacklog].

</details>

<a id="se049"></a>
### SE049 — Inspection without adaptation

A team exposes reliable defect data and reviews it regularly, but refuses to adjust any practice even when repeated failures are understood. Which empirical mechanism is specifically incomplete?

A. Inspection, solely because reviews happen regularly.

B. Version control, because every process issue is a Git problem.

C. Adaptation: inspection findings are not changing decisions or practices.

D. Transparency, solely because the data is numerical.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Adaptation: inspection findings are not changing decisions or practices.**

Transparency and inspection supply evidence; action on consequential evidence supplies adaptation.

**Why the other choices fail:**

- **A:** Regular reviews are evidence of inspection, although their quality could vary.
- **B:** No repository-history defect is stated.
- **D:** Numerical data can be transparent if its meaning is clear.

**Rule/source:** [Scrum Guide (2020)][scrum].

</details>

<a id="se050"></a>
### SE050 — Shared accountability after specialization

A tester on the Scrum team identifies a severe defect. Other Developers say quality is solely the tester's accountability and continue counting the item as usable. Which response best fits the team structure?

A. The tester alone owns the quality result; Developers may count the item as usable if their own assigned tasks are finished.

B. Specialized work does not remove Developers' shared responsibility for creating a usable Increment.

C. The Scrum Master inherits all product-quality accountability whenever Developers disagree about a defect.

D. The Product Owner can certify the defect-free state by changing the item’s priority, without any new quality evidence.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Specialized work does not remove Developers' shared responsibility for creating a usable Increment.**

Having testing expertise does not isolate all quality responsibility in one person.

**Why the other choices fail:**

- **A:** Task completion by specialists does not establish the shared usable Increment.
- **C:** A disagreement does not make the Scrum Master the exclusive quality owner.
- **D:** Changing ordering does not change the product’s behaviour or satisfy missing quality evidence.

**Rule/source:** [Scrum.org: scrum team][team].

</details>

<a id="se051"></a>
### SE051 — Blocked work still consumes WIP

A team defines WIP as all started-but-unfinished items and sets a limit of 3. There are two active items and one blocked item. No exception policy exists. Which action respects the definition?

A. Raise the limit silently whenever an item blocks.

B. Start another item because only active items count.

C. Help unblock or finish existing work before starting a fourth item.

D. Move the blocked item to an invisible list and count it as finished.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Help unblock or finish existing work before starting a fourth item.**

All three existing items consume WIP under the stated definition; blocked does not mean finished.

**Why the other choices fail:**

- **A:** That bypasses the stated policy rather than managing the constraint.
- **B:** That substitutes a different WIP definition.
- **D:** Hiding work does not finish it.

**Rule/source:** [The Kanban Guide][kanban].

</details>

<a id="se052"></a>
### SE052 — A flow calculation and its assumptions

*Supplement: lower priority than the main syllabus questions.*

For a stable observation window, use average WIP = average throughput × average cycle time. WIP is 8 items and throughput is 2 items/day. What follows, without claiming the next item must finish on that date?

A. Cycle time is 0.25 days because throughput/WIP is the required formula.

B. Average cycle time is 16 days and every item requires exactly 16.

C. Average cycle time is 4 days; this aggregate does not guarantee an individual item's completion time.

D. Every item will finish in exactly 4 days.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Average cycle time is 4 days; this aggregate does not guarantee an individual item's completion time.**

Compute 8 / 2. An average under the stated stable-window relationship is not a per-item deadline.

**Why the other choices fail:**

- **A:** That inverse ratio has the wrong dimension for time.
- **B:** Both the arithmetic and the deterministic interpretation are wrong.
- **D:** A correct average still permits variation among items.

**Rule/source:** [The Kanban Guide][kanban].

</details>

<a id="se053"></a>
### SE053 — The first TDD failure must be meaningful

A team writes a new test before implementing a feature. The test passes immediately because it never executes the missing behaviour. Which repair most directly restores the intended feedback?

A. Keep the passing test and declare the feature implemented.

B. Require the failure to be an unrelated syntax error.

C. Delete all existing tests before writing code.

D. Make the test exercise the intended behaviour and observe the relevant failure before implementing it.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Make the test exercise the intended behaviour and observe the relevant failure before implementing it.**

A test that cannot detect the missing feature provides weak evidence. The initial failure checks that the test distinguishes absence from implementation.

**Why the other choices fail:**

- **A:** A pass from an ineffective test does not demonstrate the feature.
- **B:** The failure should be relevant to the intended behaviour, not arbitrary breakage.
- **C:** That removes regression evidence.

**Rule/source:** [Agile Alliance: TDD][tdd].

</details>

<a id="se054"></a>
### SE054 — Refactoring versus a changed contract

A method is reorganized internally, but for an allowed input it now returns a different externally visible result. The team calls this behaviour-preserving refactoring. Which judgement is strongest?

A. It is necessarily a correct feature change because the new result appears in a smaller implementation.

B. The changed allowed-input behaviour contradicts that claim; investigate a defect or an intended feature change.

C. Passing unrelated existing tests proves equivalence for the changed allowed input, even if those tests never exercise it.

D. It remains behaviour-preserving because the public signature is unchanged and callers compile.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The changed allowed-input behaviour contradicts that claim; investigate a defect or an intended feature change.**

A refactoring preserves externally observable behaviour. A new result requires separate justification.

**Why the other choices fail:**

- **A:** Size does not establish intent or correctness of the behavioural change.
- **C:** A pass from tests that do not distinguish the changed behaviour cannot prove equivalence for it.
- **D:** A matching signature does not establish matching externally visible results.

**Rule/source:** [Agile Alliance: refactoring][refactor].

</details>

## DevOps

<a id="se055"></a>
### SE055 — Installing a tool without changing the handoff

An organization installs a deployment server, but developers still throw unverified builds over a wall and operations alone handles incidents without feedback to development. What is the strongest diagnosis?

A. Eliminating every operational specialist is required, because shared responsibility means every person must have identical skills.

B. Faster one-way handoff alone fixes the stated problem because development responsibility ends when a build leaves its machine.

C. Automation alone has not established the collaboration and feedback aspects of DevOps.

D. The deployment server establishes the collaboration model; operational feedback is an optional later optimization.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Automation alone has not established the collaboration and feedback aspects of DevOps.**

A tool can accelerate an unchanged handoff. Shared product/operational learning is a separate organizational concern.

**Why the other choices fail:**

- **A:** Shared responsibility can coexist with specialist expertise.
- **B:** That retains the missing operational learning loop described in the scenario.
- **D:** Automation does not establish the missing collaboration and feedback practices.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se056"></a>
### SE056 — Manual production decision, automated execution

Every passing change is built, tested and made ready for production. A person selects when to release; the chosen deployment then runs automatically. Which classification is most precise?

A. Continuous delivery, with an automated deployment mechanism and a manual release decision.

B. CI only, because production execution is automated.

C. Neither delivery nor deployment can contain automated steps.

D. Continuous deployment, because no commands are typed after approval.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Continuous delivery, with an automated deployment mechanism and a manual release decision.**

Automation after approval does not remove the manual production-release gate.

**Why the other choices fail:**

- **B:** The stated release-ready preparation extends beyond integration checks.
- **C:** The issue is the release gate, not a ban on automation.
- **D:** The human release decision is still present.

**Rule/source:** [Atlassian: CI vs delivery vs deployment][cicd].

</details>

<a id="se057"></a>
### SE057 — Nightly integration of long-lived branches

Developers keep branches isolated for weeks. Nightly jobs test each branch separately; the mainline is integrated only at the end of the month. Which missing practice is most directly relevant to CI?

A. An automated UI screenshot is sufficient to establish integration.

B. Every branch must be publicly hosted for CI to exist.

C. Frequent integration into the shared line with checks on the combined changes.

D. CI means deploying every branch directly to production.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Frequent integration into the shared line with checks on the combined changes.**

Automating isolated tests does not give early evidence that independently evolving changes work together.

**Why the other choices fail:**

- **A:** It does not necessarily test the combined shared code.
- **B:** Public visibility is not the integration requirement.
- **D:** Integration and production deployment are separate practices.

**Rule/source:** [Fowler: continuous integration][ci].

</details>

<a id="se058"></a>
### SE058 — A green pipeline can still have a production gate

A green pipeline always publishes a deployable artifact. Production waits for a release-manager decision. Someone says artifact publication proves automatic production deployment. Which observation defeats the claim?

A. Publishing an artifact means nothing was built.

B. A deployable artifact and an actual production transition are different events.

C. A release manager prevents any automated testing.

D. A green check proves all possible behaviours are correct.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — A deployable artifact and an actual production transition are different events.**

The scenario explicitly keeps the production decision manual; readiness is not evidence that production changed.

**Why the other choices fail:**

- **A:** Publication can follow a real build.
- **C:** Approval and automated checks can coexist.
- **D:** The check establishes only the evidence its checks provide.

**Rule/source:** [Continuous Delivery][delivery].

</details>

<a id="se059"></a>
### SE059 — Monitoring cannot guarantee absence of incidents

A team adds uptime alerts and latency dashboards. Its proposal promises zero outages because monitoring is continuous. Which correction best matches the evidence?

A. Monitoring can improve detection and response, but does not guarantee that failures cannot occur.

B. Continuous production monitoring certifies all untested changes, so pre-release verification is no longer useful.

C. The monitoring layer supplies incident recovery even though no response mechanism is described.

D. Monitoring guarantees prevention if the dashboard refresh period is shorter than the average incident duration.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Monitoring can improve detection and response, but does not guarantee that failures cannot occur.**

Observing a system and preventing every possible incident are different capabilities.

**Why the other choices fail:**

- **B:** Observing live behaviour does not replace checks before exposure.
- **C:** Detection and recovery are different capabilities.
- **D:** Faster observation can improve detection, but does not establish prevention of every failure.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se060"></a>
### SE060 — Containerization versus a release policy

A team packages software in containers but deploys irregularly by hand without systematic integration tests. Which conclusion is warranted?

A. Container packaging alone does not establish CI or continuous deployment.

B. Manual release always prevents reproducible packaging.

C. The presence of a container proves tests passed for the current commit.

D. Containers automatically create a correct CI policy.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Container packaging alone does not establish CI or continuous deployment.**

A packaging mechanism does not decide integration frequency, verification or production gating.

**Why the other choices fail:**

- **B:** Reproducibility and a manual release decision can coexist.
- **C:** Packaging can occur without those checks.
- **D:** The integration practice is separately specified.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se061"></a>
### SE061 — Test once, promote the same artifact

Staging tests artifact digest X. Production rebuilds from the same source commit, but a dependency has changed, producing digest Y. Which inference is unsafe?

A. Passing evidence for X proves that Y has identical tested contents and behaviour.

B. Reproducible inputs could reduce the discrepancy.

C. The team should identify the actual artifact being promoted.

D. The source commit is the same while build outputs differ.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Passing evidence for X proves that Y has identical tested contents and behaviour.**

Rebuilding can change the artifact through dependencies or build inputs. Source equality alone does not establish artifact equality.

**Why the other choices fail:**

- **B:** Controlling inputs helps, although the scenario has not established it.
- **C:** That addresses the evidence-to-deployment link.
- **D:** That is directly stated.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

</details>

<a id="se062"></a>
### SE062 — A passing check for the wrong revision

Commit A passed all checks. Commit B changed a critical file but has not been checked. The release screen displays A's green result beside B. Which rule most directly prevents this evidence mismatch?

A. Treat every green result on the repository as interchangeable.

B. Require the required checks to refer to the exact candidate revision/artifact.

C. Compare only the author name of the commits.

D. Ignore check identity whenever B is newer.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Require the required checks to refer to the exact candidate revision/artifact.**

A check establishes evidence for its tested input. Reusing A's result as B's certification is an invalid transfer.

**Why the other choices fail:**

- **A:** The candidate content can differ.
- **C:** Common authorship does not establish equal contents.
- **D:** Recency does not prove verification.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

</details>

<a id="se063"></a>
### SE063 — Fast deployment and fast learning are different

Deployments are frequent, but incidents cannot be traced to versions and failures are never discussed. Which improvement most directly restores useful operational feedback?

A. Record deployed-version identity and use incident evidence to improve the development/release process.

B. Use the developer name and build date alone, because these identify the tested bytes even after a rebuild.

C. Remove logs to keep the pipeline green.

D. Increase deployment count while retaining no version identity.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Record deployed-version identity and use incident evidence to improve the development/release process.**

A short deployment interval alone does not provide traceable learning about failures.

**Why the other choices fail:**

- **B:** Attribution and dates need not uniquely identify the source revision or built artifact. They cannot by themselves prove that the deployed bytes were tested.
- **C:** That hides outcomes.
- **D:** That can increase activity without diagnostic evidence.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se064"></a>
### SE064 — A permissive gate hidden inside a plausible expression

Java17. Each boolean represents a required passing check. The intended policy requires all three. What prints, and which gate violates the policy?

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

B. true true; a successful build implies tests passed.

C. true false; security is checked only by the first expression.

D. false true; the second gate lets security success bypass failed tests.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — false true; the second gate lets security success bypass failed tests.**

The conjunction is false. The final OR in the second expression makes security alone sufficient.

**Why the other choices fail:**

- **A:** Java boolean operators do not infer conceptual relationships.
- **B:** The tests variable is explicitly false.
- **C:** Both use security; their combination rules differ.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "false true\n", "exit": 0} -->

</details>

<a id="se065"></a>
### SE065 — A skipped check is not a passing check

Java17. test() represents running an automated suite. What prints, and what evidence was actually gathered?

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

B. false 1; every expression always evaluates all check functions.

C. true 0; not running tests is equivalent to passing them.

D. true 1; test() overwrites the build result.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — false 0; the failed build short-circuits the test invocation.**

The right operand of && is not evaluated after a false left operand. No test result was produced in this run.

**Why the other choices fail:**

- **B:** && short-circuits in Java.
- **C:** Absence of execution is not positive verification evidence.
- **D:** It is not invoked, and && does not assign to build.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "false 0\n", "exit": 0} -->

</details>

<a id="se066"></a>
### SE066 — Printing STOP does not stop control flow

Java17. The safety policy forbids deployment after failed tests. Which output and defect follow?

```java
public class Main {
    public static void main(String[] args) {
        boolean tests = false;
        if (!tests) System.out.println("STOP");
        System.out.println("DEPLOY");
    }
}
```

A. STOP then DEPLOY; an early return or guarding the deployment is missing.

B. STOP only; the word STOP halts the program.

C. DEPLOY only; the negation makes the condition false.

D. No output; failed tests automatically throw a Java exception.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — STOP then DEPLOY; an early return or guarding the deployment is missing.**

The print reports failure but does not terminate execution. The next statement is unconditional.

**Why the other choices fail:**

- **B:** A printed string has no control-flow effect.
- **C:** !false is true.
- **D:** The boolean value does not throw an exception.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "STOP\nDEPLOY\n", "exit": 0} -->

</details>

<a id="se067"></a>
### SE067 — Approval bound to the wrong artifact

Java17. policy requires passing tests AND approval for the candidate artifact. What prints?

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

A. true; any earlier approval authorizes every later artifact.

B. true; testing automatically updates approved to B.

C. false; approval for A does not approve candidate B.

D. Compilation fails because two equals calls cannot be joined.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — false; approval for A does not approve candidate B.**

Test identity matches, but approval identity does not. The conjunction therefore fails.

**Why the other choices fail:**

- **A:** That is not the given policy.
- **B:** No assignment changes approved.
- **D:** Both return booleans, which && can combine.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "false\n", "exit": 0} -->

</details>

<a id="se068"></a>
### SE068 — Anything except failure is too broad

Java17. Required checks must explicitly PASS. What prints for the skipped test suite?

```java
public class Main {
    enum Result { PASS, FAIL, SKIP }
    public static void main(String[] args) {
        Result tests = Result.SKIP;
        boolean naive = tests != Result.FAIL;
        boolean strict = tests == Result.PASS;
        System.out.println(naive + " " + strict);
    }
}
```

A. true true; every non-failure is a verified pass.

B. false true; equality tests whether any enum value exists.

C. false false; SKIP and FAIL are identical enum values.

D. true false; the naive predicate treats missing evidence as success.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — true false; the naive predicate treats missing evidence as success.**

SKIP differs from FAIL but is not PASS. An explicit required-success predicate closes that gap.

**Why the other choices fail:**

- **A:** The required policy explicitly demands PASS.
- **B:** Equality tests this exact constant, not existence.
- **C:** They are distinct constants.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true false\n", "exit": 0} -->

</details>

<a id="se069"></a>
### SE069 — A missing dependency edge

Java17. This miniature pipeline defines booleans as job success. Production must depend on both build and unit checks. What prints and what dependency is missing?

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

A. true true; the path to deployment never incorporates the failed unit check.

B. false true; packaging must fail even when its only dependency passes.

C. true false; a variable named unit automatically gates deployJob.

D. false false; every false variable propagates to all jobs.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — true true; the path to deployment never incorporates the failed unit check.**

There is no dependency on unit in either assignment. Incorporating unit into the required path is necessary.

**Why the other choices fail:**

- **B:** The package expression is build, which is true.
- **C:** Java does not infer dependencies from names.
- **D:** Only explicitly used dependencies affect the values.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true true\n", "exit": 0} -->

</details>

<a id="se070"></a>
### SE070 — A successful artifact waiting for release

Java17. STAGED means ready in pre-production; LIVE means production changed. What is printed and which CD behaviour does this run illustrate?

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

A. STAGED; this proves production deployment is fully automatic.

B. LIVE; passing checks imply approval.

C. NONE; a missing approval cancels all staging work.

D. STAGED; release readiness with a manual production gate.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — STAGED; release readiness with a manual production gate.**

The first branch executes; the production branch does not. The successful preparation is distinct from production release.

**Why the other choices fail:**

- **A:** The run demonstrates the remaining approval condition.
- **B:** humanApproval is explicitly false.
- **C:** No statement resets state to NONE.

**Rule/source:** [Continuous Delivery][delivery].

<!-- verify: {"kind": "java", "stdout": "STAGED\n", "exit": 0} -->

</details>

<a id="se071"></a>
### SE071 — The later completion can contain the older change

Java17. Run N is the newer revision and finishes first; run O is older and finishes second. This controller publishes on every completion. What is the final live revision and the race?

```java
public class Main {
    static String live = "base";
    static void completed(String revision) { live = revision; }
    public static void main(String[] args) {
        completed("N");
        completed("O");
        System.out.println(live);
    }
}
```

A. Compilation fails because revisions must be numeric hashes.

B. N; the controller compares revision recency automatically.

C. base; concurrent-run scenarios cannot be represented sequentially.

D. O; completion order overwrote the newer release with the older revision.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — O; completion order overwrote the newer release with the older revision.**

The last assignment wins in this controller. It has no freshness or sequencing check.

**Why the other choices fail:**

- **A:** Strings are valid identifiers in the stated toy controller.
- **B:** The method contains no such comparison.
- **C:** The shown calls explicitly model the observed completion order.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "O\n", "exit": 0} -->

</details>

<a id="se072"></a>
### SE072 — Rebuilding after verification changes the object of evidence

Java17. Each build invocation intentionally produces a different artifact ID. What prints, and what is the evidence gap?

```java
public class Main {
    static int sequence;
    static String build() { return "artifact-" + ++sequence; }
    public static void main(String[] args) {
        String tested = build();
        String deployed = build();
        System.out.println(tested.equals(deployed));
    }
}
```

A. true; identical method names guarantee identical outputs.

B. true; String.equals compares only the artifact prefix.

C. false; therefore both artifacts are necessarily defective.

D. false; the deployed artifact is not the one whose identity was tested.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — false; the deployed artifact is not the one whose identity was tested.**

The calls produce artifact-1 and artifact-2. Promoting the tested artifact avoids this particular mismatch.

**Why the other choices fail:**

- **A:** The method has changing state.
- **B:** It compares the complete string contents.
- **C:** Different identity does not by itself prove a defect; it invalidates the evidence transfer.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "false\n", "exit": 0} -->

</details>

<a id="se073"></a>
### SE073 — Aggregate health can hide a failed canary

Java17. Canary receives 10 requests with 2 errors; the other 90 requests have none. Rollout policy requires canary error fraction <= 0.05. Which printed decision is policy-correct?

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

B. true true; 2 errors is always below a 5% threshold.

C. false false; both fractions are above 5%.

D. true false; only the second decision uses the required canary denominator.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — true false; only the second decision uses the required canary denominator.**

Aggregation dilutes the new version's 20% rate to 2%. Under the supplied policy the rollout should not advance.

**Why the other choices fail:**

- **A:** Its same error count over fewer requests makes the rate higher.
- **B:** A rate depends on its denominator.
- **C:** 2/100 is 2%, not above 5%.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true false\n", "exit": 0} -->

</details>

<a id="se074"></a>
### SE074 — Deployment and feature exposure are separate switches

Java17. deployed means the binary exists in production; enabled controls user exposure. What prints?

```java
public class Main {
    public static void main(String[] args) {
        boolean deployed = true, enabled = false;
        boolean exposed = deployed && enabled;
        System.out.println(deployed + " " + exposed);
    }
}
```

A. false false; disabling a flag automatically removes the deployed binary.

B. true true; flags cannot affect exposure.

C. false true; exposure can occur with neither required condition.

D. true false; the version can be deployed while the feature remains unexposed.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — true false; the version can be deployed while the feature remains unexposed.**

Both conditions are needed for exposed in this model; deployment alone is insufficient.

**Why the other choices fail:**

- **A:** No assignment changes deployed.
- **B:** The expression explicitly uses enabled.
- **C:** That reverses the given values and conjunction.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true false\n", "exit": 0} -->

</details>

<a id="se075"></a>
### SE075 — A rollback acts on the defined state only

Java17. The controller restores the previous binary after a failed smoke check. What prints, and what has this code actually restored?

```java
public class Main {
    public static void main(String[] args) {
        String previous = "v1", live = "v2";
        boolean smoke = false;
        if (!smoke) live = previous;
        System.out.println(live);
    }
}
```

A. v1; the binary identifier is restored, with no demonstrated database/data rollback.

B. No output; assigning previous deletes the variable.

C. v1; every external side effect is necessarily reversed too.

D. v2; smoke=false means success.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — v1; the binary identifier is restored, with no demonstrated database/data rollback.**

Only live is changed. Nothing in the snippet changes schemas, data or compatibility constraints.

**Why the other choices fail:**

- **B:** It copies a String reference into live.
- **C:** The snippet supplies no such reversal.
- **D:** The failure branch executes.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "v1\n", "exit": 0} -->

</details>

<a id="se076"></a>
### SE076 — Operator precedence creates an approval bypass

Java17. All three conditions are intended to be required. Which output and repair follow?

```java
public class Main {
    public static void main(String[] args) {
        boolean build = false, tests = false, approved = true;
        boolean deploy = build && tests || approved;
        System.out.println(deploy);
    }
}
```

A. false; approval cannot override anything in the shown code.

B. false; approved is unused because the left side is false.

C. true; require build && tests && approved to enforce the stated policy.

D. true; adding parentheses as (build && tests) || approved repairs the policy.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — true; require build && tests && approved to enforce the stated policy.**

&& binds tighter than ||, so approved alone makes the shown expression true.

**Why the other choices fail:**

- **A:** The final OR explicitly makes it an alternative.
- **B:** || evaluates its right side when the left is false.
- **D:** That only states the existing grouping more clearly.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

<!-- verify: {"kind": "java", "stdout": "true\n", "exit": 0} -->

</details>

<a id="se077"></a>
### SE077 — Identical source, different environment

A tested service works in staging but fails in production because its required environment configuration differs. Which conclusion best distinguishes what the test established?

A. Source identity makes all environments behaviourally identical.

B. The staging result is useful evidence for its tested conditions, but does not establish production configuration correctness.

C. Testing should be abandoned because it cannot guarantee every environment.

D. The staging result must have been fabricated.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — The staging result is useful evidence for its tested conditions, but does not establish production configuration correctness.**

An environment-dependent failure can occur without a source-code difference. Configuration needs its own checks and controlled promotion.

**Why the other choices fail:**

- **A:** Dependencies and configuration can influence execution.
- **C:** Limited evidence remains useful; its scope must be understood.
- **D:** A real pass in different conditions is consistent with this failure.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

<a id="se078"></a>
### SE078 — Infrastructure as code is more than saving a screenshot

Team A stores reviewable declarative environment definitions in version control and applies them reproducibly. Team B keeps screenshots of manually configured servers. Which difference most directly supports infrastructure-as-code practices?

A. A reviewable definition guarantees a correct environment even if the definition itself contains an error.

B. A can review and reproduce the defined state through code-driven changes; screenshots alone do not provide that mechanism.

C. Screenshots are equally actionable definitions because showing the final state establishes how to reproduce every dependency.

D. Versioned definitions prove that applied environments cannot drift, so runtime verification can be removed.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — A can review and reproduce the defined state through code-driven changes; screenshots alone do not provide that mechanism.**

Versioned actionable definitions can support repeatability and change review. A picture documents a state without defining how to recreate it.

**Why the other choices fail:**

- **A:** Reviewability and reproducibility are useful mechanisms, not guarantees that the desired definition is correct.
- **C:** A picture of state need not specify reproducible actions or dependencies.
- **D:** Versioning desired state does not by itself establish actual state.

**Rule/source:** [Microsoft: infrastructure as code][iac].

</details>

<a id="se079"></a>
### SE079 — A required check must not be silently advisory

Policy says security checks must pass before promotion. The job reports failure, but the pipeline treats that job as advisory and continues. Which repair addresses the policy defect most directly?

A. Run the same ignored check twice.

B. Delete the failure result to preserve a green summary.

C. Make that result a required success condition on the promotion path.

D. Keep promotion dependent only on build success, but require security failure reports to be reviewed after deployment.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Make that result a required success condition on the promotion path.**

Merely executing a check is insufficient if its failure cannot affect the release decision.

**Why the other choices fail:**

- **A:** Two advisory failures can still be bypassed.
- **B:** That hides evidence rather than enforcing policy.
- **D:** That moves the decision past the stated before-promotion boundary. The security result must influence promotion itself.

**Rule/source:** [GitHub: workflow jobs and dependencies][pipeline].

</details>

<a id="se080"></a>
### SE080 — Health feedback and a reversible decision

A newly deployed version breaches a stated error threshold. The team has a tested, compatible previous version and a rollback procedure. Which response most directly closes the feedback loop?

A. Continue promotion because deployment frequency is the sole quality measure.

B. Suppress the threshold alert until users stop complaining.

C. Assume the previous version is always compatible even without the stated compatibility evidence.

D. Use the threshold evidence to halt promotion or roll back under the procedure, then investigate the cause.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Use the threshold evidence to halt promotion or roll back under the procedure, then investigate the cause.**

Monitoring becomes actionable when evidence changes operational decisions and informs subsequent fixes.

**Why the other choices fail:**

- **A:** Frequency does not override the stated health condition.
- **B:** That removes feedback.
- **C:** This scenario supplies compatibility; it should not be generalized to every rollback.

**Rule/source:** [Microsoft: DevOps][devops].

</details>

## Git and GitHub

<a id="se081"></a>
### SE081 — Stage B, edit C, commit which version?

Use the base Git fixture. Lines printed are committed content, working content, then porcelain status. What are they?

```bash
printf 'B\n' > f.txt
git add f.txt
printf 'C\n' > f.txt
git commit -qm staged
git show HEAD:f.txt
cat f.txt
git status --porcelain
```

A. C / C / clean

B. B / B / clean

C. B / C / ` M f.txt`

D. A / C / `MM f.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: C — B / C / ` M f.txt`**

add captured B. The later edit remains C in the working tree. The ordinary commit saves the staged version, leaving an unstaged modification.

**Why the other choices fail:**

- **A:** A normal commit does not automatically restage the later edit.
- **B:** Committing does not overwrite the working file with its staged contents.
- **D:** The commit did happen, so HEAD and the index now contain B.

**Rule/source:** [Git: add][git-add].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "B\nC\n M f.txt\n", "exit": 0} -->

</details>

<a id="se082"></a>
### SE082 — Why plain diff can be empty

Use the base fixture. Only the three filename lists are observed, in command order; an empty list prints nothing. Which lists contain f.txt?

```bash
printf 'B\n' > f.txt
git add f.txt
git diff --name-only
git diff --staged --name-only
git diff HEAD --name-only
```

A. Plain diff is empty; staged diff and HEAD diff each list f.txt.

B. All three list f.txt.

C. All are empty because add creates a commit.

D. Only plain diff lists f.txt.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Plain diff is empty; staged diff and HEAD diff each list f.txt.**

The working tree and index both contain B, while HEAD contains A. Therefore only the comparisons against HEAD show a difference.

**Why the other choices fail:**

- **B:** Plain diff compares B with B here.
- **C:** add updates the index, not HEAD.
- **D:** That reverses the comparison endpoints.

**Rule/source:** [Git: diff][git-diff].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "f.txt\nf.txt\n", "exit": 0} -->

</details>

<a id="se083"></a>
### SE083 — Commit -a and a genuinely new file

Use the base fixture. What committed content and remaining status print?

```bash
printf 'B\n' > f.txt
printf 'N\n' > new.txt
git commit -qam tracked
git show HEAD:f.txt
git status --porcelain
```

A. B / clean

B. B / `?? new.txt`

C. A / ` M f.txt` and `?? new.txt`

D. N / clean

<details>
<summary>Answer and reasoning</summary>

**Correct: B — B / `?? new.txt`**

commit -a stages modifications/deletions of tracked files, but does not automatically include a genuinely untracked new file.

**Why the other choices fail:**

- **A:** new.txt was not staged or previously tracked.
- **C:** -a includes the tracked modification.
- **D:** f.txt and new.txt are distinct paths; no replacement occurs.

**Rule/source:** [Git: commit][git-commit].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "B\n?? new.txt\n", "exit": 0} -->

</details>

<a id="se084"></a>
### SE084 — Unstage without losing the edit

Use the base fixture. Printed values are index content, working content and status. What follows?

```bash
printf 'B\n' > f.txt
git add f.txt
git restore --staged f.txt
git show :f.txt
cat f.txt
git status --porcelain
```

A. A / A / clean

B. B / A / `MM f.txt`

C. B / B / `M  f.txt`

D. A / B / ` M f.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / B / ` M f.txt`**

With --staged and no source, restore resets this index path from HEAD. It keeps the working edit.

**Why the other choices fail:**

- **A:** That would also restore the working file, which the command does not request.
- **B:** The command targets the index, not the working tree.
- **C:** That describes the state before unstaging.

**Rule/source:** [Git: restore][git-restore].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nB\n M f.txt\n", "exit": 0} -->

</details>

<a id="se085"></a>
### SE085 — Restore defaults to the index for a working file

Use the base fixture. Printed values are HEAD content, index content, working content and status. Which sequence is correct?

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

C. A / A / A / clean

D. B / B / B / clean

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A / B / B / `M  f.txt`**

Plain restore replaces the working file from the index in this case. It discards C, keeps staged B, and does not change HEAD.

**Why the other choices fail:**

- **B:** That is the state before restore.
- **C:** That would restore both locations from HEAD, which was not requested.
- **D:** restore does not create a commit.

**Rule/source:** [Git: restore][git-restore].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nB\nB\nM  f.txt\n", "exit": 0} -->

</details>

<a id="se086"></a>
### SE086 — Soft reset with three distinct snapshots

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

A. B / A / D

B. A / A / A

C. A / C / D

D. A / A / D

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A / C / D**

Soft reset moves the current branch to the parent commit while leaving index and working contents as they were.

**Why the other choices fail:**

- **A:** This reset does move HEAD; it does not simply unstage a path.
- **B:** That is the hard-reset state for this tracked path.
- **D:** That is the corresponding mixed-reset state.

**Rule/source:** [Git: reset][git-reset].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nC\nD\n", "exit": 0} -->

</details>

<a id="se087"></a>
### SE087 — Mixed reset uses the target for the index

Use the base fixture. Output below is HEAD/index/working after resetting B to its parent. Which sequence prints?

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

A. A / A / D

B. B / A / D

C. A / A / A

D. A / C / D

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A / A / D**

Mixed reset moves the branch and resets the index to the target, while retaining working content D.

**Why the other choices fail:**

- **B:** HEAD also moves to A in this form.
- **C:** That discards the working edit as a hard reset would.
- **D:** That preserves the index as a soft reset would.

**Rule/source:** [Git: reset][git-reset].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nA\nD\n", "exit": 0} -->

</details>

<a id="se088"></a>
### SE088 — Hard reset does not mean deleting every untracked path

Use the base fixture. u.txt is an unrelated untracked path that obstructs no tracked path. Output is HEAD/index/working f.txt, then u.txt. Which sequence prints?

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

C. A / A / D / U

D. A / A / A / U

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / A / A / U**

The tracked path is reset in all three locations. This unrelated untracked file remains; do not generalize that to untracked obstructions that hard reset may remove.

**Why the other choices fail:**

- **A:** Hard reset is not a blanket clean of every unrelated untracked file.
- **B:** That preserves index and working edits as soft reset would.
- **C:** That preserves the tracked working edit as mixed reset would.

**Rule/source:** [Git: reset][git-reset].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nA\nA\nU\n", "exit": 0} -->

</details>

<a id="se089"></a>
### SE089 — Path reset is not a branch rewind

Use the base fixture. What HEAD/index/working contents print after resetting this path?

```bash
printf 'B\n' > f.txt
git add f.txt
printf 'C\n' > f.txt
git reset -q HEAD -- f.txt
git show HEAD:f.txt
git show :f.txt
cat f.txt
```

A. A / A / C

B. A / B / C

C. A / A / A

D. C / C / C

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A / A / C**

The path form updates the index entry from HEAD without changing HEAD or the working file.

**Why the other choices fail:**

- **B:** The index entry is reset, so it is not left at B.
- **C:** The path form does not restore the working content.
- **D:** Resetting a path does not commit the working content.

**Rule/source:** [Git: reset][git-reset].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nA\nC\n", "exit": 0} -->

</details>

<a id="se090"></a>
### SE090 — Revert preserves the original commit in history

Use the base fixture. The outputs are file content, reachable commit count, then whether the B commit remains an ancestor. Which sequence prints?

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

B. A / 1 / removed

C. B / 2 / retained

D. A / 2 / removed

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A / 3 / retained**

The base, B and inverse commit are all reachable. Revert undoes the change through a new commit rather than rewinding the branch.

**Why the other choices fail:**

- **B:** That resembles resetting to the base instead of reverting.
- **C:** The inverse commit does restore A here.
- **D:** Revert neither deletes B nor replaces it with the inverse at the same history position.

**Rule/source:** [Git: revert][git-revert].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\n3\nretained\n", "exit": 0} -->

</details>

<a id="se091"></a>
### SE091 — Untracked does not appear in ordinary diff

Use the base fixture. Which filename/status output follows?

```bash
printf 'N\n' > new.txt
git diff --name-only
git status --porcelain
```

A. Only `A  new.txt`

B. No output at all

C. Only `?? new.txt`; plain diff prints no filename.

D. new.txt then `?? new.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Only `?? new.txt`; plain diff prints no filename.**

The new file has no tracked/index version for the ordinary diff. status still reports it as untracked.

**Why the other choices fail:**

- **A:** No add command staged it.
- **B:** status reports the untracked file.
- **D:** That assumes ordinary diff includes untracked file content.

**Rule/source:** [Git: diff][git-diff].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "?? new.txt\n", "exit": 0} -->

</details>

<a id="se092"></a>
### SE092 — Ignoring an already tracked file

Use the base fixture. f.txt is already tracked. Output is tracked filename list then remaining status. What prints?

```bash
printf 'f.txt\n' > .gitignore
git add .gitignore
git commit -qm ignore-rule
printf 'B\n' > f.txt
git ls-files f.txt
git status --porcelain
```

A. No output; the file is now untracked and hidden.

B. Only `?? f.txt`

C. f.txt / clean

D. f.txt / ` M f.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: D — f.txt / ` M f.txt`**

Adding an ignore rule does not remove an existing tracked path from the index. Its tracked modification remains visible.

**Why the other choices fail:**

- **A:** Ignore rules do not automatically untrack existing files.
- **B:** The path remains tracked, not newly untracked.
- **C:** The tracked content did change.

**Rule/source:** [Git: ignore rules][gitignore].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "f.txt\n M f.txt\n", "exit": 0} -->

</details>

<a id="se093"></a>
### SE093 — Add -u is not add every new file

Use the base fixture. Which committed f.txt content and status remain?

```bash
printf 'B\n' > f.txt
printf 'N\n' > new.txt
git add -u
git commit -qm update-tracked
git show HEAD:f.txt
git status --porcelain
```

A. B / `?? new.txt`

B. A / ` M f.txt` and `?? new.txt`

C. B / clean

D. N / `?? f.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: A — B / `?? new.txt`**

-u updates tracked entries, including modifications/removals, but does not add a genuinely new untracked path.

**Why the other choices fail:**

- **B:** -u does stage the tracked modification.
- **C:** That would require staging new.txt too.
- **D:** The command does not exchange the roles or contents of the paths.

**Rule/source:** [Git: add][git-add].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "B\n?? new.txt\n", "exit": 0} -->

</details>

<a id="se094"></a>
### SE094 — Stage a deletion and a new path together

Use the base fixture. Which filename list is committed after the commands?

```bash
rm f.txt
printf 'G\n' > g.txt
git add -A
git commit -qm replace-path
git ls-tree --name-only HEAD
```

A. Only f.txt.

B. Only g.txt.

C. f.txt and g.txt.

D. Neither path; add -A stages only modifications.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Only g.txt.**

add -A records the tracked deletion and the new file. The committed tree has g.txt and no f.txt.

**Why the other choices fail:**

- **A:** The new path was included, and the old one removed.
- **C:** The deletion was staged too.
- **D:** -A also handles additions and removals.

**Rule/source:** [Git: add][git-add].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "g.txt\n", "exit": 0} -->

</details>

<a id="se095"></a>
### SE095 — The current directory is a pathspec boundary

Use the base fixture. After the initial subdirectory commit, two tracked files change. What printed committed contents and status remain?

```bash
mkdir sub
printf 'X\n' > sub/x.txt
git add sub/x.txt
git commit -qm sub-base
printf 'B\n' > f.txt
printf 'Y\n' > sub/x.txt
cd sub
git add .
git commit -qm sub-only
cd ..
git show HEAD:f.txt
git show HEAD:sub/x.txt
git status --porcelain
```

A. B / Y / clean

B. B / X / modified sub/x.txt

C. A / X / modifications to both files

D. A / Y / ` M f.txt`

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / Y / ` M f.txt`**

The dot pathspec covers sub at the add location. It does not stage the changed parent-directory f.txt.

**Why the other choices fail:**

- **A:** That would stage the root modification too.
- **B:** That reverses which path the dot selects.
- **C:** The subdirectory edit was staged and committed.

**Rule/source:** [Git: add][git-add].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nY\n M f.txt\n", "exit": 0} -->

</details>

<a id="se096"></a>
### SE096 — Create a branch without switching

Use the base fixture. Output is current branch, dev's latest subject, then main's latest subject. Which sequence prints?

```bash
git branch dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
git branch --show-current
git log -1 --format=%s dev
git log -1 --format=%s main
```

A. dev / B / base

B. main / base / B

C. main / B / B

D. dev / base / B

<details>
<summary>Answer and reasoning</summary>

**Correct: B — main / base / B**

branch dev creates a reference at the existing base but leaves main checked out. The new commit moves main, not dev.

**Why the other choices fail:**

- **A:** That would require switching to dev before committing.
- **C:** A non-current branch does not automatically follow new main commits.
- **D:** The branch creation did not change the current branch.

**Rule/source:** [Git: branch][git-branch].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "main\nbase\nB\n", "exit": 0} -->

</details>

<a id="se097"></a>
### SE097 — Create-and-switch changes where the next commit lands

Use the base fixture. Output is current branch, main content, then dev content. Which sequence prints?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
git branch --show-current
git show main:f.txt
git show dev:f.txt
```

A. dev / A / B

B. main / B / A

C. main / A / B

D. dev / B / B

<details>
<summary>Answer and reasoning</summary>

**Correct: A — dev / A / B**

switch -c creates dev and checks it out. The new commit advances dev while main remains at the base.

**Why the other choices fail:**

- **B:** That describes committing on main instead.
- **C:** The command does switch the current branch.
- **D:** Switching does not make main follow dev's commits.

**Rule/source:** [Git: switch][git-switch].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "dev\nA\nB\n", "exit": 0} -->

</details>

<a id="se098"></a>
### SE098 — A working edit can travel across a safe switch

Use the base fixture. main and dev start at the same commit. What branch, working content and main committed content print?

```bash
git branch dev
printf 'B\n' > f.txt
git switch -q dev
git branch --show-current
cat f.txt
git show main:f.txt
```

A. main / B / A

B. dev / B / A

C. dev / A / A

D. dev / B / B

<details>
<summary>Answer and reasoning</summary>

**Correct: B — dev / B / A**

The switch can preserve this uncommitted edit because both branches have the same starting tracked content. The edit was never committed to main.

**Why the other choices fail:**

- **A:** Not all dirty working trees prohibit switching.
- **C:** Switch does not automatically discard the safe working edit.
- **D:** Working changes do not automatically create a main commit.

**Rule/source:** [Git: switch][git-switch].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "dev\nB\nA\n", "exit": 0} -->

</details>

<a id="se099"></a>
### SE099 — A switch that would overwrite a local edit

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

A. switched / dev / C

B. refused / dev / C

C. refused / main / C

D. switched / dev / B

<details>
<summary>Answer and reasoning</summary>

**Correct: C — refused / main / C**

The target branch would overwrite a conflicting local edit. Without an explicit discard/merge option, the switch is refused and the edit retained.

**Why the other choices fail:**

- **A:** Here the target requires a different f.txt version, unlike the safe-switch case.
- **B:** A refused switch leaves the current branch unchanged.
- **D:** That would discard the edit without the required request.

**Rule/source:** [Git: switch][git-switch].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "refused\nmain\nC\n", "exit": 0} -->

</details>

<a id="se100"></a>
### SE100 — Merge direction follows the current branch

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

A. A / B; main was not updated.

B. B / A; branch contents are exchanged.

C. B / B; naming main makes it the destination.

D. A / A; merge overwrites dev with the source snapshot.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — A / B; main was not updated.**

While dev is current, merge main brings main into dev. Since main is already an ancestor, there is nothing to add; it does not move main.

**Why the other choices fail:**

- **B:** No exchange operation is performed.
- **C:** The current branch is the destination, not the named argument.
- **D:** Merge does not simply replace the branch with its ancestor's content.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nB\n", "exit": 0} -->

</details>

<a id="se101"></a>
### SE101 — A fast-forward need not create a merge commit

Use the base fixture. Output is total reachable commits, then number of parents of HEAD. Which sequence prints?

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

A. 3 / 2

B. 2 / 1

C. 2 / 2

D. 1 / 0

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 2 / 1**

main is an ancestor of dev, so the reference moves forward to the existing feature commit. Its single parent remains the base.

**Why the other choices fail:**

- **A:** That assumes a new merge commit instead of the allowed fast-forward.
- **C:** The existing ordinary feature commit does not gain a parent when a branch reference moves.
- **D:** The feature commit is reachable after the update.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "2\n1\n", "exit": 0} -->

</details>

<a id="se102"></a>
### SE102 — Explicitly require a merge commit

Use the base fixture. Compared with the previous topology, --no-ff changes which output?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm feature
git switch -q main
git merge --no-ff -qm merge-feature dev
git rev-list --count HEAD
git show -s --format=%P HEAD | awk '{print NF}'
```

A. 2 / 1

B. 3 / 2

C. 3 / 1

D. 4 / 2

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 3 / 2**

The option creates a merge commit even though fast-forwarding was possible. That commit points to the old main and dev tips.

**Why the other choices fail:**

- **A:** That is the fast-forward result without the forced merge commit.
- **C:** A merge commit has the two branch-tip parents here.
- **D:** No independent additional commit was created before the merge.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "3\n2\n", "exit": 0} -->

</details>

<a id="se103"></a>
### SE103 — Divergence without a content conflict

Use the base fixture. main and dev make independent commits affecting different files. Which file contents, commit count and HEAD parent count print?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm feature
git switch -q main
printf 'G\n' > g.txt
git add g.txt
git commit -qm local
git merge -qm joined dev
cat f.txt
cat g.txt
git rev-list --count HEAD
git show -s --format=%P HEAD | awk '{print NF}'
```

A. B / G / 3 / 1

B. A / G / 4 / 2

C. B / G / 4 / 2

D. A / G / 2 / 1; every divergence must conflict

<details>
<summary>Answer and reasoning</summary>

**Correct: C — B / G / 4 / 2**

The base, two divergent commits and merge commit are reachable. Disjoint file changes merge cleanly; divergence is not synonymous with conflict.

**Why the other choices fail:**

- **A:** That assumes fast-forward despite divergent commits.
- **B:** The merge includes dev's change to f.txt.
- **D:** Divergence concerns ancestry; conflict concerns incompatible changes.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "B\nG\n4\n2\n", "exit": 0} -->

</details>

<a id="se104"></a>
### SE104 — Three-way conflict versions in the index

*Supplement: lower priority than the main syllabus questions.*

Use the base fixture. Both branches replace the same original line differently. After the failed merge, output is index stages 1, 2 and 3 for f.txt. Which contents print?

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
git show :1:f.txt
git show :2:f.txt
git show :3:f.txt
```

A. A / B / C

B. C / C / B

C. A / C / C

D. A / C / B: common base, current-side version, merged-side version.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / C / B: common base, current-side version, merged-side version.**

The three versions explain why Git cannot automatically choose the intended replacement. The merge has not created a completed new commit.

**Why the other choices fail:**

- **A:** That reverses the current and incoming sides for this normal merge.
- **B:** The base remains A; it is not the current tip.
- **C:** The incoming dev side has B.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nC\nB\n", "exit": 0} -->

</details>

<a id="se105"></a>
### SE105 — Editing the markers is not recording a resolution

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

A. No unmerged filename / C / R

B. f.txt / B / R

C. f.txt / C / R; the index is still unmerged.

D. No unmerged filename / R / R

<details>
<summary>Answer and reasoning</summary>

**Correct: C — f.txt / C / R; the index is still unmerged.**

The edit changes the working file only. Staging the resolved path is still needed before completing the merge commit.

**Why the other choices fail:**

- **A:** That assumes removing markers automatically resolves the index entries.
- **B:** HEAD is still the current main tip C, not dev.
- **D:** That assumes an automatic commit after editing.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "f.txt\nC\nR\n", "exit": 0} -->

</details>

<a id="se106"></a>
### SE106 — Stage the resolution, then finish the merge

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

B. R / 2

C. R / 1

D. B / 0

<details>
<summary>Answer and reasoning</summary>

**Correct: B — R / 2**

Staging collapses the conflict entries to the chosen resolution. The completed merge commit records both parents.

**Why the other choices fail:**

- **A:** The resolved R content was staged and committed.
- **C:** This is completing a pending normal merge, not an unrelated ordinary single-parent commit.
- **D:** Neither the incoming version nor a root commit is created here.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "R\n2\n", "exit": 0} -->

</details>

<a id="se107"></a>
### SE107 — Abort a merge that began clean

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

A. C / C / B

B. C / B / B

C. A / A / B

D. C / C / A

<details>
<summary>Answer and reasoning</summary>

**Correct: A — C / C / B**

Aborting restores the pre-merge main state here and leaves the existing dev commit intact. The clean starting condition avoids ambiguity about unrelated local edits.

**Why the other choices fail:**

- **B:** That would leave incoming content in the working file.
- **C:** Abort does not rewind main's independent C commit.
- **D:** Abort does not delete dev's commit.

**Rule/source:** [Git: merge][git-merge].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "C\nC\nB\n", "exit": 0} -->

</details>

<a id="se108"></a>
### SE108 — Fetch updates remote-tracking knowledge, not the current branch

Use the remote fixture. A peer commits and pushes B. After this repository fetches, output is HEAD, origin/main, and working content. Which sequence prints?

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

A. B / A / B

B. B / B / B

C. A / B / A

D. A / A / A

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A / B / A**

The ordinary fetch updates origin/main to the server tip. It does not integrate the change into current main or replace the working file.

**Why the other choices fail:**

- **A:** That reverses local versus remote-tracking behaviour.
- **B:** That adds integration/checkout effects not performed by this fetch.
- **D:** The remote-tracking reference was updated.

**Rule/source:** [Git: fetch][git-fetch].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "A\nB\nA\n", "exit": 0} -->

</details>

<a id="se109"></a>
### SE109 — An explicit fast-forward pull

Use the remote fixture, with no local divergent commit. Which HEAD and working contents print?

```bash
printf 'B\n' > "$SE_PEER/f.txt"
git -C "$SE_PEER" add f.txt
git -C "$SE_PEER" commit -qm peer-B
git -C "$SE_PEER" push -q origin main
git pull --ff-only -q origin main
git show HEAD:f.txt
cat f.txt
```

A. A / B

B. B / A

C. A / A

D. B / B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — B / B**

The explicit pull fetches and fast-forwards the current main because its old tip is an ancestor of the server tip.

**Why the other choices fail:**

- **A:** The successful fast-forward changes the local branch tip too.
- **B:** The clean tracked working file is updated with the successful integration.
- **C:** That describes fetch without integration.

**Rule/source:** [Git: pull][git-pull].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "B\nB\n", "exit": 0} -->

</details>

<a id="se110"></a>
### SE110 — Fast-forward-only refuses divergence, even without a file conflict

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

A. refused / peer-G / A

B. integrated / peer-G / A

C. integrated / a new merge commit / B

D. refused / local-B / B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — refused / local-B / B**

Neither tip is an ancestor of the other. --ff-only refuses a merge/rebase solution even though the changes might merge cleanly.

**Why the other choices fail:**

- **A:** A refused integration does not move local main to the peer tip.
- **B:** That would overwrite the local divergent commit without the requested topology rule.
- **C:** --ff-only explicitly refuses creating a merge commit.

**Rule/source:** [Git: pull][git-pull].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "refused\nlocal-B\nB\n", "exit": 0} -->

</details>

<a id="se111"></a>
### SE111 — Push does not publish the working file

Use the remote fixture. f.txt changes without a commit. Output is server main content and local working content. Which sequence prints?

```bash
printf 'B\n' > f.txt
git push -q origin main
git --git-dir="$SE_REMOTE" show main:f.txt
cat f.txt
```

A. B / A

B. A / B

C. A / A

D. B / B

<details>
<summary>Answer and reasoning</summary>

**Correct: B — A / B**

The pushed branch still refers to the A commit. Working-directory edits are not part of that history.

**Why the other choices fail:**

- **A:** Neither automatic commit nor local discard is performed.
- **C:** Push does not discard the local working edit.
- **D:** That assumes push stages and commits local edits.

**Rule/source:** [Git: push][git-push].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "A\nB\n", "exit": 0} -->

</details>

<a id="se112"></a>
### SE112 — A remote connection is not fetched history

Use the remote fixture, then remove origin and its tracking references as shown. Which state before and content after fetch print?

```bash
git remote remove origin
git remote add upstream "$SE_REMOTE"
if git rev-parse --verify refs/remotes/upstream/main >/dev/null 2>&1; then echo present; else echo absent; fi
git fetch -q upstream
git show upstream/main:f.txt
```

A. absent / B

B. present / B

C. present / A

D. absent / A

<details>
<summary>Answer and reasoning</summary>

**Correct: D — absent / A**

Adding the ordinary remote records a connection. The later fetch acquires/updates the remote-tracking history; the add here did not include a fetch option.

**Why the other choices fail:**

- **A:** No B commit exists in this scenario.
- **B:** Both the pre-fetch existence and content claims lack support.
- **C:** That gives an ordinary remote add the effect of an immediate fetch.

**Rule/source:** [Git: remote][git-remote].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "absent\nA\n", "exit": 0} -->

</details>

<a id="se113"></a>
### SE113 — Explicit push source overrides the checked-out feature branch

Use the remote fixture. dev gets B, but the command explicitly pushes main. Output is server main content and local HEAD content. What prints?

```bash
git switch -q -c dev
printf 'B\n' > f.txt
git add f.txt
git commit -qm dev-B
git push -q origin main
git --git-dir="$SE_REMOTE" show main:f.txt
git show HEAD:f.txt
```

A. B / B

B. A / A

C. A / B

D. B / A

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A / B**

The explicit source main still refers to A. Being checked out on dev does not change which source was named.

**Why the other choices fail:**

- **A:** That substitutes the current branch for the explicit source main.
- **B:** The local HEAD remains dev at B.
- **D:** Push does not move HEAD back to main or publish dev as main here.

**Rule/source:** [Git: push][git-push].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "A\nB\n", "exit": 0} -->

</details>

<a id="se114"></a>
### SE114 — A rejected push does not undo local commits

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

B. rejected / C / B

C. accepted / C / C

D. rejected / A / B

<details>
<summary>Answer and reasoning</summary>

**Correct: B — rejected / C / B**

The server refuses a non-fast-forward update. The rejected publication leaves both the local C commit and server B commit in their respective repositories.

**Why the other choices fail:**

- **A:** Rejection does not remove the server's already accepted peer commit.
- **C:** No force/integration step authorized replacing the divergent server history.
- **D:** Rejection does not rewind the local branch.

**Rule/source:** [Git: push][git-push].

<!-- verify: {"kind": "git", "fixture": "remote", "stdout": "rejected\nC\nB\n", "exit": 0} -->

</details>

<a id="se115"></a>
### SE115 — Default stash and the untracked file

*Supplement: lower priority than the main syllabus questions.*

Use the base fixture. After the default stash operation, what working tracked content and status remain?

```bash
printf 'B\n' > f.txt
printf 'N\n' > new.txt
git stash push -q
cat f.txt
git status --porcelain
```

A. B / clean

B. B / `?? new.txt`

C. A / `?? new.txt`

D. A / clean

<details>
<summary>Answer and reasoning</summary>

**Correct: C — A / `?? new.txt`**

The default operation saves the tracked working change and restores that path, but does not include the untracked file without the appropriate option.

**Why the other choices fail:**

- **A:** That reverses which kind of change the default invocation handles.
- **B:** The tracked edit was stashed.
- **D:** That would also stash the untracked file, which this invocation does not request.

**Rule/source:** [Git: stash][git-stash].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\n?? new.txt\n", "exit": 0} -->

</details>

<a id="se116"></a>
### SE116 — Amend replaces the tip rather than appending a third commit

*Supplement: lower priority than the main syllabus questions.*

Use the base fixture. Changing the message is guaranteed to change commit content here. What reachable count and identity result print?

```bash
printf 'B\n' > f.txt
git add f.txt
git commit -qm old-message
se_old=$(git rev-parse HEAD)
git commit --amend -qm new-message
git rev-list --count HEAD
if [ "$se_old" = "$(git rev-parse HEAD)" ]; then echo same; else echo different; fi
```

A. 3 / different

B. 2 / different

C. 2 / same

D. 1 / different

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 2 / different**

Amend creates a replacement tip with changed metadata/message, retaining the base as its parent. The old tip is not an extra ancestor of the new one.

**Why the other choices fail:**

- **A:** That describes appending an ordinary new commit.
- **C:** The changed message changes the commit object identity.
- **D:** The original base remains an ancestor.

**Rule/source:** [Git: commit][git-commit].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "2\ndifferent\n", "exit": 0} -->

</details>

<a id="se117"></a>
### SE117 — A tag does not follow a moving branch

*Supplement: lower priority than the main syllabus questions.*

Use the base fixture. Output is tagged content then current HEAD content. What prints?

```bash
git tag release
printf 'B\n' > f.txt
git add f.txt
git commit -qm B
git show release:f.txt
git show HEAD:f.txt
```

A. B / B

B. B / A

C. A / A

D. A / B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / B**

The lightweight tag remains at the base object. The current branch advances when the new commit is made.

**Why the other choices fail:**

- **A:** Tags do not automatically track branch movement.
- **B:** That reverses the fixed tag and moving branch.
- **C:** The new commit does advance current HEAD.

**Rule/source:** [Git: tag][git-tag].

<!-- verify: {"kind": "git", "fixture": "base", "stdout": "A\nB\n", "exit": 0} -->

</details>

<a id="se118"></a>
### SE118 — Fork, clone and branch create different kinds of separation

You need an independently owned GitHub repository for a contribution, a local checkout to edit, and an isolated line of commits in that checkout. Which sequence names those distinct mechanisms?

A. Fork on GitHub, clone the fork locally, then create a feature branch.

B. Open a PR first; this automatically creates and commits all local edits.

C. Branch on GitHub, then git pull creates a separately owned repository.

D. Clone alone necessarily creates a new repository under your GitHub account.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Fork on GitHub, clone the fork locally, then create a feature branch.**

The fork supplies the separately owned hosted repository, clone supplies the local repository, and branch supplies a commit reference for development.

**Why the other choices fail:**

- **B:** A PR proposes existing changes; it does not perform the stated local editing workflow.
- **C:** A branch is not a repository ownership copy; pull integrates fetched work.
- **D:** A local clone does not create an independently owned hosted fork.

**Rule/source:** [GitHub: forks][fork].

</details>

<a id="se119"></a>
### SE119 — A pull request is not git pull

A contributor opens a PR, receives feedback, and pushes another commit to its source branch. The project's policy requires review and checks on the current candidate. Which judgement is safest?

A. git pull is the Git command that creates a GitHub PR.

B. Opening the PR already merged the code into the destination.

C. Once a PR opens, later source-branch commits can never affect it.

D. The proposal now includes updated branch work; earlier evidence must be evaluated against the current candidate under that policy.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — The proposal now includes updated branch work; earlier evidence must be evaluated against the current candidate under that policy.**

A PR is a review/integration proposal. It is not the local git pull command, and a review of an older candidate cannot simply prove the changed candidate is acceptable.

**Why the other choices fail:**

- **A:** It fetches/integrates repository history instead.
- **B:** Opening and merging are distinct actions.
- **C:** Updating the proposal through its source branch is part of the workflow.

**Rule/source:** [GitHub flow][flow].

</details>

<a id="se120"></a>
### SE120 — Commit identity is not server authorization

A student configures user.name and user.email to match a maintainer. The student has no credentials or write permission for that maintainer's GitHub repository. Which inference is correct?

A. Matching user.email automatically permits pushing as that maintainer.

B. Without GitHub access, local commits are impossible.

C. The fields set commit identity metadata; they do not grant remote write authorization.

D. Setting user.name opens and merges a PR.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — The fields set commit identity metadata; they do not grant remote write authorization.**

Attribution configuration and authentication/access control serve different purposes.

**Why the other choices fail:**

- **A:** Metadata is not proof of authorization.
- **B:** Local version-control operations can work offline.
- **D:** Configuration does not perform those workflow actions.

**Rule/source:** [Git: config][git-config].

</details>

## Validation and source notes

The validator reads the code directly from this Markdown, checks question/answer structure and practice-set coverage, then runs every Git trace in an isolated temporary repository and compiles/runs every Java trace. It compares exact output, including status spaces. Executable checks verify the supplied traces; conceptual answers also require review against the stated scenario and linked rules.

From the repository root, run:

```bash
python3 SE/validation/check_se_bank.py
```

Validated using Git 2.56.0 and Java 17. External rules were checked on 8 October 2026. The examples and distractors are original; source links support the underlying rules. Where a calculation or transition policy is supplied in the question, follow that policy rather than infer one from a product name.

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
[git-remote]: https://git-scm.com/docs/git-remote
[git-reset]: https://git-scm.com/docs/git-reset
[git-restore]: https://git-scm.com/docs/git-restore
[git-revert]: https://git-scm.com/docs/git-revert
[git-stash]: https://git-scm.com/docs/git-stash
[git-switch]: https://git-scm.com/docs/git-switch
[git-tag]: https://git-scm.com/docs/git-tag
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
[sdlc]: https://www.ibm.com/think/topics/sdlc
[sm]: https://www.scrum.org/resources/what-is-a-scrum-master
[spiral]: https://software-engineering-book.com/web/spiral-model/
[sprintbacklog]: https://www.scrum.org/resources/what-is-a-sprint-backlog
[tdd]: https://agilealliance.org/glossary/tdd/
[team]: https://www.scrum.org/resources/scrum-team
