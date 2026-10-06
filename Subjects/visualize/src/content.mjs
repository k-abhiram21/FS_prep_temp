export const aiLabel = 'ai explnation due to lack of material';
export const subjects = {
  SE: {name:'Software Engineering', color:'#168377', brief:'Process models · Agile & DevOps · Git & GitHub', icon:'◇'},
  WT: {name:'Web Technologies', color:'#386dcc', brief:'JavaScript · JSON · Async code · Collections · DOM', icon:'⌘'},
  CN: {name:'Computer Networks', color:'#b57b21', brief:'OSI model · Physical Layer · Data Link Layer', icon:'⇄'},
  AI: {name:'Artificial Intelligence', color:'#8b5dc1', brief:'Regression · Classification · TensorFlow · ANN', icon:'✳'}
};
export const official = {
  jsTypes:['MDN: grammar and types','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types'],
  jsOps:['MDN: expressions and operators','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators'],
  json:['MDN: JSON','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON'],
  arrays:['MDN: indexed collections','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections'],
  keyed:['MDN: Sets and Maps','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections'],
  dom:['MDN: DOM','https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model'],
  events:['MDN: event listeners','https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener'],
  promises:['MDN: promises','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises'],
  async:['MDN: async functions','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function'],
  git:['Pro Git: recording changes','https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository'],
  agile:['Agile Manifesto: principles','https://agilemanifesto.org/iso/en/principles.html'],
  scrum:['Official Scrum Guide','https://scrumguides.org/scrum-guide.html'],
  devops:['Microsoft: DevOps','https://learn.microsoft.com/en-us/devops/what-is-devops'],
  capacity:['MIT: Physical Layer','https://fab.cba.mit.edu/classes/865.24/topics/computing/comms/phy.html'],
  shannon:['MIT OCW: digital communication notes','https://ocw.mit.edu/courses/6-451-principles-of-digital-communication-ii-spring-2005/bb895c1dee9ce0b39d6846e0aa984981_MIT6_451S05_FullLecNotes.pdf'],
  regression:['TensorFlow: regression','https://www.tensorflow.org/tutorials/keras/regression'],
  classification:['TensorFlow: classification','https://www.tensorflow.org/tutorials/keras/classification'],
  gradients:['TensorFlow: automatic differentiation','https://www.tensorflow.org/guide/autodiff']
};
// Each lesson has a concrete trace, limits, a comparison and source provenance.
const L=(id,subject,title,summary,basis,sources,refs,explain,example,output,why,trap,compare,trace)=>({id,subject,title,summary,basis,sources,refs,explain,example,output,why,trap,compare,trace});
const T=(title,state,reason)=>({title,state,reason});
export const lessons=[
L('se-process','SE','What a software process controls','Follow a request from a need to maintained software.','college',['se-unit1'],[],[
  'A software process organizes the work needed to build and maintain software. It identifies activities, outputs, responsibilities, and checks.',
  'A process model arranges those activities. A model can use sequential phases, repeated cycles, or small releases.',
  'Consider a college attendance app. The team must agree on attendance rules before it can check whether the implemented app follows them.'
], 'Need: record attendance\nRequirement: one record per student per class\nCheck: reject a second record for the same class','A stated requirement gives the team a result that it can test.',
'Testing compares observed behavior with the agreed requirement. Reviews can also inspect requirements and designs before executable code exists.',
'A process model does not guarantee defect-free software. Teams still need appropriate skills, checks, and feedback.',
[['Requirement','The behavior that a user or system needs.'],['Design','The structure selected to produce that behavior.'],['Verification','Check whether an output meets its specified requirements.'],['Validation','Check whether the product meets the intended user needs.']],
[T('Agree on a need','Students need attendance records.','Identify the user and the problem first.'),T('Specify behavior','One record per student and class.','Replace a vague request with a checkable rule.'),T('Build and check','Try to add a duplicate record.','A test can compare the actual result with the requirement.'),T('Maintain','Change the rules when the college changes its policy.','Delivered software can require corrections and improvements.')]),
L('se-models','SE','Waterfall, incremental and iterative','Choose a model by how the work and feedback are arranged.','college',['se-unit1'],[],[
'Waterfall organizes work into a sequence of phases. Changes to approved earlier work usually need controlled rework.',
'Incremental development delivers usable parts of the product. Iterative development revises a solution through repeated cycles. A team can use both.',
'For an attendance app, an increment could add reports after basic attendance works. An iteration could improve the existing attendance screen.'
], 'Release 1: record attendance\nRelease 2: add monthly reports\nIteration: revise the attendance screen','New functionality is an increment. Improvement of an existing solution is an iteration.',
'A smaller release can provide feedback before the entire product is complete. A sequential plan can make agreed phase outputs easier to track.',
'Do not interpret Waterfall as physically preventing every return to an earlier phase. The key distinction is its planned phase structure.',
[['Waterfall','Plan sequential phases; changes can cause earlier work to be repeated.'],['Incremental','Add usable functionality in successive releases.'],['Iterative','Revise the solution using feedback.'],['Choice','Consider uncertainty, risks, user access, and release constraints.']],
[T('Requirements','Attendance rules are agreed.','This trace shows a simplified Waterfall path.'),T('Design','Choose records, screens and validation rules.','Define how the app will implement the agreed behavior.'),T('Implement and test','Build the design and check duplicate handling.','Phase outputs guide the next activity.'),T('Deliver and maintain','Release the app and process later changes.','Later changes can require controlled rework.')]),
L('se-evolution','SE','Prototypes, spiral and concurrent work','Use feedback and risk to decide what to do next.','college',['se-unit1'],[],[
'A prototype lets users examine an early version or model. It can reveal requirements that were difficult to state in advance.',
'A throwaway prototype is discarded after learning. An evolutionary prototype is developed further. Neither choice makes an untested shortcut production-ready.',
'The spiral model organizes repeated cycles around objectives, risks, development, and planning. Risk analysis is its central feature.',
'Concurrent development allows related activities to have different states at the same time. It does not mean that dependencies disappear.'
], 'Risk: users may misunderstand the report\nExperiment: show a sample report\nFinding: users need a daily view\nDecision: revise the design before building the full report','The experiment removes uncertainty before a larger investment.',
'A small experiment can expose a costly mistake early. The next cycle uses what the team learned rather than blindly repeating the same plan.',
'Spiral is not simply Waterfall drawn as a circle. Identify the risk and the action used to reduce it.',
[['Prototype','Explore a question with an early representation.'],['Spiral','Choose development work after evaluating risk.'],['Concurrent','Track overlapping activities and their states.']],
[T('Set objectives','Create an attendance report users can interpret.','State what this cycle must achieve.'),T('Evaluate risk','Users may need daily details rather than totals.','Identify a specific uncertainty.'),T('Develop and check','Show a small report prototype to users.','Collect evidence about that uncertainty.'),T('Plan the next cycle','Build the daily view with the confirmed requirement.','Use the result to select the next work.')]),
L('se-agile','SE','Agile values in a real change','Connect early delivery, feedback and adaptation.','college',['se-unit1'],['agile'],[
'Agile approaches use short feedback cycles to respond to change. Working software provides evidence that the team has delivered useful behavior.',
'Agile values people, working software, collaboration, and responding to change. Plans, tools, contracts, and documentation can still have value.',
'Suppose the college changes an attendance rule. The team discusses the effect, revises priorities, implements a small change, and checks it with users.'
], 'Original rule: mark attendance once\nNew need: allow an authorized correction\nSmall delivery: add an audited correction action','Feedback can change the next priority without removing the need for tests.',
'Frequent usable results let users check actual behavior. The team can adjust before it spends months following an incorrect assumption.',
'Agile does not mean no planning, no documentation, or no discipline. A team must still manage quality and a sustainable workload.',
[['Plan','Useful guidance that can change when evidence changes.'],['Feedback','Information from users, tests, and delivered behavior.'],['Adaptation','Adjust the work after inspecting that information.']],
[T('Prioritize','An authorized correction is the highest-value change.','Select a small useful result.'),T('Build a small change','Record who corrected attendance and why.','Deliver enough behavior for a meaningful check.'),T('Inspect with users','Teachers try the correction flow.','Check whether the result solves the real problem.'),T('Adapt the next plan','Clarify permissions before the next change.','Use feedback to revise priorities.')]),
L('se-scrum','SE','Scrum: people, events and artifacts','Distinguish the goal, the work, and the feedback events.','college',['se-unit1'],['scrum'],[
'Scrum is a framework for work on complex problems. A Scrum Team includes a Product Owner, a Scrum Master, and Developers.',
'The Product Owner is accountable for maximizing product value. The Scrum Master helps establish Scrum and improve team effectiveness. Developers create a usable Increment.',
'The Product Backlog contains ordered product work. The Sprint Backlog contains the Sprint Goal, selected items, and the delivery plan.',
'A Sprint lasts one month or less. The Sprint Review inspects the product outcome. The Retrospective examines how the team worked.'
], 'Sprint Goal: teachers can correct attendance\nSelected work: permission check, correction screen, audit record\nDone: the Increment meets the Definition of Done','Completing selected tasks is insufficient if the result is not usable and does not meet the Definition of Done.',
'The artifacts make the product direction, current plan, and delivered result visible. Each event provides a specific opportunity to inspect or adapt.',
'The Daily Scrum is for Developers to inspect progress toward the Sprint Goal. It is not defined as a manager status-report meeting.',
[['Planning','Decide why the Sprint is valuable, what can be done, and how.'],['Daily Scrum','Inspect progress and adapt the current plan.'],['Review','Inspect the outcome with stakeholders.'],['Retrospective','Improve quality and effectiveness of the team’s work.']],
[T('Product Backlog','The correction feature is ordered by value.','The Product Owner manages the product direction.'),T('Sprint Planning','The team sets a correction-related Sprint Goal.','Select work and plan how to deliver it.'),T('Develop an Increment','Build, test and meet the Definition of Done.','Inspect progress during the Sprint.'),T('Review and improve','Inspect the product, then the way the team worked.','Review and Retrospective answer different questions.')]),
L('se-devops','SE','DevOps and CI/CD','Follow a change through checks and release decisions.','college',['se-unit1'],['devops'],[
'DevOps connects development and operations through shared responsibility, feedback, and automation. A tool alone does not create this cooperation.',
'Continuous integration combines frequent changes with automated build and test feedback. A failing check must receive attention before promotion.',
'Continuous delivery keeps verified changes ready for release. Continuous deployment also automates production release after the required checks pass.',
'Monitoring checks behavior after release. A successful build does not prove that a live service meets every user need.'
], 'Change → review → build → tests → release decision → deployment → monitoring','An automatic production release distinguishes continuous deployment from a delivery process with manual approval.',
'Small changes and repeatable checks can reveal defects earlier. Operational feedback helps the team identify problems that pre-release checks did not reveal.',
'CI is not the same as production deployment. A green build can still wait for an approval or a scheduled release.',
[['CI','Integrate changes and obtain automated build/test feedback.'],['Continuous delivery','Keep verified changes releasable; promotion can require approval.'],['Continuous deployment','Automate production promotion after the configured gates.']],
[T('Commit and review','A correction feature is accepted.','Save and inspect the change.'),T('Build','The pipeline produces the application artifact.','Use a repeatable process.'),T('Check','Blocking tests pass.','A failed check stops promotion.'),T('Release and observe','Release the verified change and measure behavior.','Approval can be manual or automatic, depending on the process.')]),
L('se-git-state','SE','Git: working tree, staging and commits','Predict exactly which edit a commit will save.','college',['se-unit2'],['git'],[
'The working tree contains the files you edit. The staging area records the content selected for the next commit.',
'A commit records the staged snapshot and its history relationships. It does not automatically include every later edit in the working tree.',
'If you edit a file after git add, the staged version and the current file can differ. Check both differences before committing.'
], 'Edit report.txt to A\ngit add report.txt\nEdit report.txt to B\ngit commit -m "Save report"','The commit saves A. B remains as a working-tree change.',
'Staging lets you select a coherent snapshot. Git can record that snapshot even when other unfinished edits remain in the working tree.',
'git commit saves locally. It does not upload the commit to GitHub. git push transfers commits to a configured remote.',
[['git diff','Compare unstaged working-tree changes with the index.'],['git diff --cached','Compare the staged content with HEAD.'],['git status','Summarize tracked, staged and untracked state.'],['git log','Inspect recorded commit history.']],
[T('Edit','Working tree = A.','The edit is not staged yet.'),T('Stage','Index = A.','git add selects the current file content.'),T('Edit again','Working tree = B; index = A.','The second edit does not replace the staged snapshot automatically.'),T('Commit','HEAD records A; B remains changed.','The commit records the index.')]),
L('se-branches','SE','Branches, merges and recovery','Treat a branch as a name for a commit history.','college',['se-unit2'],['git'],[
'A Git branch is a movable reference to a commit. Creating a branch does not duplicate every file into another physical folder.',
'A fast-forward merge moves a branch reference to a descendant commit. A three-way merge combines changes using a common ancestor.',
'A conflict requires a decision when Git cannot combine edits automatically. Resolve the content, stage it, and finish the merge.',
'git revert creates a new commit that reverses a chosen commit’s effect. git reset changes references and can also change the index or files.'
], 'main: A → B\nfeature: A → B → C\nMerge feature into main: main can move from B to C.','This merge can fast-forward because main has no separate commit after B.',
'History relationships determine the merge operation. File contents alone do not tell you whether a fast-forward is possible.',
'A conflict is not automatically a lost file. Inspect both intended changes before selecting the resolved result. Revert does not erase the old commit.',
[['Branch','A movable name pointing to a commit.'],['Merge','Integrate another history into the current branch.'],['Revert','Record an inverse change as a new commit.'],['Reset','Move the current branch; effects depend on the mode.']],
[T('Common history','Both names point at B.','The feature begins from the current shared commit.'),T('Feature commit','feature points at C; main remains at B.','A commit advances the current branch.'),T('Check ancestry','B is an ancestor of C.','There is no divergent main commit in this example.'),T('Fast-forward','main now points at C.','No new merge commit is required for this path.')]),
L('se-github','SE','GitHub and remote collaboration','Separate local history from a hosted repository.','college',['se-unit2'],['git'],[
'Git is the version-control system. GitHub hosts repositories and provides collaboration features such as pull requests and reviews.',
'clone creates a local copy of a repository and configures a remote. fetch updates remote-tracking information without integrating it into your current branch.',
'pull fetches and then integrates, usually by merge or rebase according to configuration. push requests an update to a remote branch.',
'A fork is a hosted repository copy. A branch is a reference inside a repository. A pull request proposes a change for discussion and integration.'
], 'Local: commit C\nRemote: commit B\ngit push origin main\nRemote can move to C if permissions and history checks allow it.','Local and remote branch states can differ until they exchange commits.',
'The separation lets developers work locally and share reviewed history later. A remote can reject a push when it would overwrite divergent history.',
'A pull request does not automatically merge itself. git pull is a Git operation; a GitHub pull request is a collaboration object.',
[['fetch','Download objects and update remote-tracking references.'],['pull','Fetch, then integrate into the current branch.'],['push','Request a remote branch update.'],['fork','Create a hosted copy under another owner.']],
[T('Clone','A local repository starts from the hosted history.','Download the repository and configure origin.'),T('Commit locally','The local branch gains C.','Saving local history does not publish it.'),T('Push','The remote accepts C.','History and permissions must allow the update.'),T('Collaborate','A pull request can request review.','Review and merge are separate collaboration actions.')]),

L('wt-variables','WT','JavaScript variables and scope','Track the binding separately from the object it refers to.','gap',[],['jsTypes'],[
'let creates a block-scoped binding that can be reassigned. const creates a block-scoped binding that cannot be reassigned.',
'const does not freeze an object or array. The binding can keep pointing to the same object while that object’s contents change.',
'var is scoped to its function or global context rather than an ordinary block. Accessing let or const before initialization causes a ReferenceError.'
], 'const scores = [4];\nscores.push(7);\nconsole.log(scores.length);','2. The same array now contains two elements.',
'The binding and the object are different things. Preventing reassignment does not prevent changes inside the object.',
'Do not say that const makes every value immutable. Strings and numbers are primitive values; arrays and ordinary objects have mutable contents.',
[['let','Use when the binding must receive another value.'],['const','Use when the binding will keep its initial value.'],['var','An ordinary block does not create a separate var scope.']],
[T('Create an array','Object A contains [4].','The array literal creates an object.'),T('Bind scores','scores refers to A.','const prevents reassignment of this binding.'),T('Push 7','A now contains [4, 7].','push changes the array contents.'),T('Read length','scores.length is 2.','The binding still refers to A.')]),
L('wt-operators','WT','Types, coercion and equality','Read the operator before predicting a conversion.','gap',[],['jsOps'],[
'JavaScript can convert values during an operation. The + operator can join strings, while subtraction requires numeric conversion.',
'Strict equality, ===, compares values without the coercion used by ==. Distinct object references do not become equal because their contents match.',
'Falsy primitive values include false, 0, an empty string, null, undefined, and NaN. An empty array or object is truthy.'
], 'console.log("5" + 2);\nconsole.log("5" - 2);\nconsole.log("5" === 5);','52\n3\nfalse',
'The first operation has a string operand and joins text. The second converts the numeric string. Strict equality keeps the type distinction.',
'typeof null returns "object" for historical reasons. This result does not mean that null is an ordinary object with readable properties.',
[['+ with a string','Can perform string concatenation.'],['-','Converts operands to numbers for subtraction.'],['===','Avoids equality coercion.'],['[] === []','false, because the literals create separate objects.']],
[T('Inspect operands','Left is the string "5"; right is the number 2.','Start with actual values and types.'),T('Apply +','The numeric value is converted to text.','This operation joins strings.'),T('Apply - separately','The string "5" becomes the number 5.','Subtraction performs numeric conversion.'),T('Compare strictly','"5" === 5 is false.','The types differ.')]),
L('wt-functions','WT','Functions, returns and shared objects','Follow a call and see which data can change.','gap',[],['jsTypes'],[
'A function receives arguments and can return a result. Without an executed return value, a normal function call produces undefined.',
'JavaScript passes argument values. When an argument is an object reference, the function can use that reference to change the shared object.',
'Reassigning the parameter changes the local binding. It does not redirect the caller’s binding to the replacement object.'
], 'const item = {count: 1};\nfunction change(x) {\n  x.count = 2;\n  x = {count: 9};\n}\nchange(item);\nconsole.log(item.count);','2. The property mutation affects the original object; the parameter reassignment does not.',
'The caller and parameter initially refer to the same object. A property write changes that object. A local reassignment only changes one binding.',
'An arrow function with a block body needs an explicit return for a value. x => {x * 2} returns undefined.',
[['Mutation','Change the contents of an existing object.'],['Reassignment','Make one binding hold a different value.'],['Return','Supply the result of the call.']],
[T('Call','item and x refer to object A.','The reference value is copied into the parameter.'),T('Mutate','A.count becomes 2.','Both bindings can observe the changed property.'),T('Reassign locally','x refers to object B with count 9.','item still refers to A.'),T('Read caller state','item.count is 2.','The caller’s binding did not change.')]),
L('wt-json','WT','JSON: text to data and back','Check syntax before using the parsed value.','partial',['wt-json'],['json'],[
'JSON is a text format for exchanging data. Its values can be objects, arrays, strings, numbers, booleans, or null.',
'Object keys and string values use double quotes. Comments, undefined, functions, and trailing commas are not valid JSON syntax.',
'JSON.parse reads JSON text and returns a JavaScript value. JSON.stringify produces JSON text from a supported JavaScript value.',
'Serialization does not preserve every JavaScript feature. For example, an undefined object property is omitted.'
], 'const text = \'{"name":"Asha","marks":[8,9]}\';\nconst student = JSON.parse(text);\nconsole.log(student.marks[1]);','9. The input is text; the parsed result is an object containing an array.',
'Parsing validates the text structure and creates usable values. A string that merely looks like an object is still a string until parsed.',
'JSON.parse throws a SyntaxError for invalid JSON. JSON.stringify can throw for circular references; it is not a universal deep-copy operation.',
[['Parse','Text → a JavaScript value.'],['Stringify','A JavaScript value → JSON text.'],['JSON object','Uses quoted keys and JSON-compatible values.']],
[T('Receive text','A string contains name and marks.','Text does not support object-property access by itself.'),T('Parse','Validate the JSON syntax.','Invalid syntax stops with a SyntaxError.'),T('Read data','marks[1] is 9.','The parsed array uses zero-based indexing.'),T('Serialize','JSON.stringify can produce outgoing text.','Only supported data is represented.')]),
L('wt-callbacks','WT','Callbacks: who calls the function?','Passing a function does not tell you when it will run.','college',['wt-async','wt-example-12'],[],[
'A callback is a function passed to another operation so that operation can call it. It can run immediately or later.',
'forEach calls its callback during array iteration. A timer callback runs later after the current work and the relevant scheduling conditions.',
'Pass the function when the operation needs a callback. Calling it while passing the argument gives the operation its result instead.'
], 'function show(x) { console.log(x); }\n[2, 4].forEach(show);\nconsole.log("done");','2\n4\ndone',
'forEach invokes show once for each present element in this array. Those calls complete before execution reaches the final statement.',
'A callback is not automatically asynchronous. Also, forEach does not wait for promises returned by an async callback.',
[['show','The function value; another operation can call it.'],['show(2)','A call now; the expression produces its return value.'],['Synchronous callback','Runs as part of the current operation.'],['Asynchronous callback','Runs after the operation schedules later work.']],
[T('Pass the function','forEach receives show.','No show call occurs in the argument expression.'),T('First callback','show(2) prints 2.','forEach supplies the first array value.'),T('Second callback','show(4) prints 4.','The next present element is processed.'),T('Continue','Print done.','The synchronous iteration has finished.')]),
L('wt-promises','WT','Promises and execution order','Separate synchronous work from later reactions.','college',['wt-async'],['promises'],[
'A Promise represents an eventual result. It starts pending and can settle as fulfilled or rejected. Settlement cannot be reversed.',
'The executor passed to new Promise runs synchronously. A .then reaction runs asynchronously after the current synchronous work completes.',
'A fulfilled Promise can carry a value. A rejected Promise carries a reason. Attach a rejection handler when a failure can occur.'
], 'console.log("A");\nPromise.resolve("B").then(x => console.log(x));\nconsole.log("C");','A\nC\nB',
'Registering a reaction does not run it inline. The current statements finish first, then the queued Promise reaction can execute.',
'A pending Promise is not a background thread. The platform or operation determines how the underlying work is performed.',
[['Pending','No final result yet.'],['Fulfilled','The Promise has a successful result.'],['Rejected','The Promise has a failure reason.'],['Settled','Either fulfilled or rejected.']],
[T('Print A','Output = A.','Run the first synchronous statement.'),T('Register a reaction','The reaction for B is queued.','The Promise is already fulfilled, but its reaction is not run inline.'),T('Print C','Output = A, C.','Complete the synchronous statements.'),T('Run the reaction','Output = A, C, B.','Process the queued reaction after the current work.')]),
L('wt-chains','WT','Promise chains, catch and all','Return the next result so the chain can follow it.','college',['wt-async'],['promises'],[
'then returns a new Promise. A handler’s returned value fulfills that next Promise. A returned Promise makes the chain follow its eventual result.',
'A thrown error rejects the next Promise. catch can handle a rejection; a normal return from catch can recover the chain.',
'Promise.all fulfills with results in input order when every input fulfills. It rejects when an input rejects, but does not automatically cancel the other work.'
], 'Promise.resolve(3)\n  .then(x => x * 2)\n  .then(x => { throw new Error("stop"); })\n  .catch(() => 9)\n  .then(x => console.log(x));','9. The catch handler recovers by returning 9.',
'Each step passes a result or failure to the next Promise. Returning a value from catch switches this path back to fulfillment.',
'If a handler starts a Promise but does not return it, the outer chain cannot wait for that operation through the returned value.',
[['Return a value','The next Promise fulfills with that value.'],['Return a Promise','The next Promise follows its outcome.'],['Throw','The next Promise rejects.'],['catch returns normally','The following step can receive a recovered value.']],
[T('Fulfill','The initial value is 3.','The first reaction receives 3.'),T('Transform','The next value is 6.','The handler returns x * 2.'),T('Reject','The handler throws stop.','The rejection travels to catch.'),T('Recover','catch returns 9; the final handler prints 9.','A normal return creates a fulfilled continuation.')]),
L('wt-async','WT','Async/await without hidden magic','Pause one async function while other work continues.','college',['wt-async'],['async'],[
'An async function returns a Promise. A returned ordinary value becomes the Promise’s fulfillment value.',
'await suspends that async function until its awaited value is available. It does not block the entire JavaScript environment.',
'If the awaited Promise rejects, await throws inside the async function. Use try/catch to handle the rejection at that point.'
], 'async function task() {\n  console.log("A");\n  await Promise.resolve();\n  console.log("B");\n}\ntask();\nconsole.log("C");','A\nC\nB',
'The function runs synchronously until await. The caller continues, then the function resumes in a later Promise-related continuation.',
'Awaiting operations one after another can serialize them. When independent operations can overlap, start both before awaiting their combined results.',
[['async return','Always supplies a Promise to the caller.'],['await','Pauses the current async function.'],['try/catch','Can handle a rejection thrown by await.']],
[T('Enter task','Print A.','Calling task begins executing its body.'),T('Reach await','Suspend task.','Arrange a later continuation.'),T('Continue caller','Print C.','The caller is not blocked by the suspended function.'),T('Resume task','Print B.','The awaited fulfilled value is now available to the continuation.')]),
L('wt-arrays','WT','Array methods: transform, select, combine','Choose the method by the shape of the result.','gap',[],['arrays'],[
'map creates an array from callback results. filter creates an array containing values that pass a test. reduce combines values into one result.',
'forEach performs callback calls and returns undefined. It is useful for side effects, not for collecting a returned result array.',
'slice returns a shallow selection. splice changes the array. sort changes the array and compares strings by default unless given a comparator.'
], 'const values = [1, 2, 3];\nconst result = values.map(x => x * 2).filter(x => x > 2);\nconsole.log(result);','[4, 6]. map creates [2, 4, 6]; filter keeps values greater than 2.',
'The methods have different contracts. Choose transformation for map, selection for filter, and accumulated state for reduce.',
'A shallow array copy still shares nested objects. For numeric ascending order, use a comparator such as (a, b) => a - b.',
[['map','One callback result for each visited element.'],['filter','Keep an element when the predicate is truthy.'],['reduce','Carry an accumulator through the visited elements.'],['forEach','Perform effects; no result array is returned.']],
[T('Input','values = [1, 2, 3].','Start from a fixed dense array.'),T('Map','Mapped values = [2, 4, 6].','Multiply each value by 2.'),T('Filter','Keep 4 and 6.','Only these values satisfy x > 2.'),T('Result','result = [4, 6]; values remains [1, 2, 3].','These callbacks do not mutate the input.')]),
L('wt-sets-maps','WT','Sets and Maps','Decide whether you need unique values or keyed values.','gap',[],['keyed'],[
'A Set stores unique values. A Map stores key/value pairs. Both preserve insertion order during iteration.',
'Use Set when you need membership or duplicate removal. Use Map when a value must be found using a key.',
'Map keys can be objects. Two different objects remain different keys even when their properties are equal. Adding an existing primitive key replaces its value.'
], 'const seen = new Set(["SE", "WT", "SE"]);\nconst marks = new Map();\nmarks.set("SE", 8);\nmarks.set("SE", 9);\nconsole.log(seen.size, marks.size, marks.get("SE"));','2 1 9',
'The duplicate Set value adds no new entry. The second Map write updates the value associated with the existing key.',
'Use .size for Set and Map, rather than array .length. Objects use identity as keys; property similarity does not merge them.',
[['Set.add(value)','Store a unique value.'],['Set.has(value)','Check membership.'],['Map.set(key, value)','Insert or replace an associated value.'],['Map.get(key)','Read the associated value, or undefined when absent.']],
[T('Create Set','seen contains SE and WT.','The repeated SE value is not a new unique value.'),T('Insert Map key','SE → 8.','Create one key/value association.'),T('Update Map key','SE → 9.','The existing key receives a replacement value.'),T('Read sizes','seen.size = 2; marks.size = 1.','The two collections count different kinds of entries.')]),
L('wt-dom','WT','DOM: selecting and changing a page','Treat the document as nodes rather than a string.','partial',['wt-example-13'],['dom'],[
'The DOM represents a document as a tree of nodes. JavaScript can select nodes, read properties, and change the displayed page.',
'querySelector returns the first matching element or null. querySelectorAll returns a static NodeList of matching elements.',
'textContent assigns text. innerHTML parses markup. Use textContent when you intend to display ordinary text, especially input from a user.'
], '<p id="status">Waiting</p>\n\nconst node = document.querySelector("#status");\nif (node) node.textContent = "Ready";','The paragraph displays Ready. The original HTML file on disk is not rewritten.',
'The selected element is a live node in the current document. Changing its text updates what the browser displays.',
'Check for null when an element might not exist. A browser provides document; an ordinary Node.js script does not provide a browser DOM.',
[['querySelector','First match, or null.'],['querySelectorAll','A static list of matches.'],['textContent','Write text without interpreting it as HTML.'],['createElement and append','Create a node and attach it to the document.']],
[T('Document tree','A paragraph node contains Waiting.','The browser has parsed the HTML.'),T('Select','Find the node with id status.','The selector #status identifies an id.'),T('Check existence','The selected node is not null.','Guard against a missing element.'),T('Update text','The paragraph now contains Ready.','The live document changes.')]),
L('wt-events','WT','DOM events and propagation','Register a handler, then follow the event path.','gap',[],['events'],[
'addEventListener registers a function for an event. The browser calls the function when that event is dispatched to the relevant target.',
'For events that bubble, the event can travel from a target to its ancestors. event.target identifies the original target. currentTarget identifies the current listener’s node.',
'preventDefault cancels a cancelable default action. stopPropagation stops further propagation; it does not automatically cancel the default action.'
], '<button id="count">Add</button>\nlet count = 0;\nconst button = document.querySelector("#count");\nbutton.addEventListener("click", () => {\n  count += 1;\n  button.textContent = String(count);\n});','After two dispatched clicks, the button displays 2.',
'The handler closes over the count binding. Each click updates the same binding, so the value persists across calls.',
'Pass the handler function rather than calling it during registration. Not every DOM event bubbles; inspect the event type when tracing propagation.',
[['target','The node at which the event originated.'],['currentTarget','The node whose listener is currently running.'],['preventDefault','Cancel a cancelable default action.'],['stopPropagation','Stop the event from continuing along its propagation path.']],
[T('Register','The click listener is stored.','Registration does not invoke the handler.'),T('First click','count becomes 1.','The browser dispatches the event and calls the handler.'),T('Second click','count becomes 2.','The same captured binding is updated.'),T('Display','The button text is 2.','textContent writes the current count.')]),

L('cn-osi','CN','The seven OSI layers','Locate a responsibility before naming its layer.','college',['cn-unit1'],[],[
'The OSI model separates networking responsibilities into seven layers. It is a reference model, not a guarantee that every protocol has a perfect one-layer mapping.',
'From the top, the layers are Application, Presentation, Session, Transport, Network, Data Link, and Physical.',
'For exam questions, identify the responsibility: application services, representation, sessions, end-to-end transport, routing, local frames, or signals.'
], 'User data → application handling → representation → session control\n→ transport units → network packets → local frames → signals','On receipt, the destination processes corresponding information upward.',
'Each layer offers services to the layer above while using services below. This separation makes responsibilities easier to reason about.',
'A router is primarily associated with Layer 3 forwarding. A bridge or ordinary Ethernet switch is primarily associated with Layer 2 forwarding. Real devices can have additional functions.',
[['Application / Presentation / Session','Application services / data representation / dialogue control.'],['Transport','End-to-end transport services, such as segmentation and reliability where provided.'],['Network','Logical addressing and routing.'],['Data Link / Physical','Local-link frames / signals and transmission.']],
[T('Application data','A user message is prepared.','The top layers handle the application and its representation.'),T('Transport and Network','Transport units are carried in network packets.','End-to-end transport and routing have different responsibilities.'),T('Data Link','A packet is carried in a local frame.','The frame belongs to one link.'),T('Physical','Signals carry the frame’s bits.','The medium transports physical signals.')]),
L('cn-encapsulation','CN','Encapsulation and local delivery','Distinguish the end-to-end packet from each link’s frame.','college',['cn-unit1'],[],[
'Encapsulation adds control information around data as it moves down the stack. Decapsulation processes that information as data moves up.',
'A routed packet can cross several links. At a router, the incoming link frame is processed and a new outgoing link frame is constructed.',
'A MAC address identifies a link-layer interface within its addressing system. An IP address supports network-layer addressing. These roles are different.'
], 'Host A → Router → Host B\nLink 1 frame destination: router interface\nLink 2 frame destination: Host B interface','The next-hop frame destination changes between links.',
'A link frame only needs to reach the next device on that link. Routing determines the next step toward the network destination.',
'Do not claim that a packet remains byte-for-byte unchanged at a router. Fields such as IPv4 TTL change; address translation can also change addresses.',
[['Hub / repeater','Primarily Physical Layer signal handling.'],['Bridge / ordinary switch','Primarily forwards local frames using link addresses.'],['Router','Primarily forwards packets using network-layer information.']],
[T('Build first frame','A addresses the local frame to the router.','Host B is reached through a next hop.'),T('Receive at router','Process the incoming frame.','The local-link delivery has completed.'),T('Route the packet','Select the outgoing interface and next hop.','Use network-layer forwarding information.'),T('Build next frame','Construct a frame for the next link.','Local-link control information is replaced.')]),
L('cn-media','CN','Media and direction of transmission','Separate the medium from the communication mode.','college',['cn-unit1'],[],[
'Guided media carry signals through a physical path, such as twisted pair, coaxial cable, or optical fiber. Unguided media use wireless propagation.',
'Simplex permits transmission in one direction. Half duplex permits both directions at different times. Full duplex permits both directions at the same time.',
'The communication mode describes direction and timing. It does not by itself identify the cable type or application protocol.'
], 'One-way broadcast: simplex\nPush-to-talk exchange: half duplex\nSimultaneous two-way conversation: full duplex','The important test is whether both sides can transmit at the same time.',
'A shared use of time or physical paths constrains transmission. The mode tells you which simultaneous actions the link supports.',
'Full duplex does not mean each direction has unlimited capacity. Optical fiber avoids electrical interference but still has physical limits.',
[['Twisted pair','Electrical signals on twisted conductors.'],['Coaxial cable','Electrical signals with a central conductor and shielding.'],['Optical fiber','Light through a guided optical path.'],['Wireless','Electromagnetic propagation without a dedicated cable path.']],
[T('Identify the channel','Two stations share a half-duplex link.','Both directions are supported.'),T('A transmits','B receives while A sends.','The shared channel is used in one direction.'),T('Change direction','A stops before B sends.','The example permits a direction change.'),T('B transmits','A receives B’s response.','The stations do not transmit simultaneously.')]),
L('cn-multiplex','CN','Multiplexing: sharing one link','Track which resource separates the users.','college',['cn-unit1'],[],[
'Multiplexing combines several signals or data streams on one link. The receiver uses the agreed separation to recover them.',
'Frequency-division multiplexing separates frequency bands. Time-division multiplexing separates time slots. Wavelength-division multiplexing separates optical wavelengths.',
'In synchronous TDM, a fixed slot can remain allocated when its source is idle. Statistical TDM can allocate capacity to active sources.'
], 'TDM frame: [A slot][B slot][C slot]\nA sends a1, B sends b1, C sends c1\nReceiver assigns each slot to its configured source.','The slot position identifies the source in this fixed-slot example.',
'An agreed schedule prevents the receiver from mixing the sources. The same principle applies to separated frequency bands or wavelengths.',
'Do not confuse multiplexing with a specific medium-access contention rule. An FDM channel does not require users to alternate fixed time slots.',
[['FDM','Different frequency bands.'],['TDM','Different time slots.'],['WDM','Different optical wavelengths.'],['Statistical TDM','Capacity assigned according to active traffic.']],
[T('Separate sources','A has a1; B has b1; C has c1.','Each source produces independent data.'),T('Assign slots','The order is A, B, C.','The sender and receiver share the schedule.'),T('Transmit one stream','Send [a1][b1][c1].','Use one link in successive time slots.'),T('Demultiplex','Recover a1 for A, b1 for B, c1 for C.','Interpret each slot using the agreed schedule.')]),
L('cn-signals','CN','Signals, encoding and capacity','Use units and assumptions before applying a formula.','gap',[],['capacity','shannon'],[
'Bit rate counts bits per second. Symbol rate counts transmitted symbols per second. One symbol can represent more than one bit.',
'Line coding represents bits using signal levels or transitions. Manchester coding uses a middle-of-bit transition; state the convention before mapping a transition to 0 or 1.',
'For an ideal noiseless low-pass channel, the textbook Nyquist bound is 2B log2(M) bits/s. B is bandwidth in hertz; M is the number of distinguishable signal levels.',
'For a bandwidth-limited AWGN channel, Shannon capacity is B log2(1 + S/N). S/N must be a linear power ratio, not a decibel value.'
], 'B = 3000 Hz; S/N = 15\nC = 3000 × log2(16)\nC = 12000 bits/s','12 kbit/s is the theoretical capacity for these stated Shannon-model inputs.',
'The logarithm counts the available information under the model. More bandwidth or a better signal-to-noise ratio can increase this bound.',
'Actual throughput includes coding and protocol constraints. Capacity is not a promise of application speed. This supplement is possible Physical Layer coverage, not confirmed exam emphasis.',
[['Bit rate','Bits per second.'],['Symbol rate','Symbols per second.'],['SNR in dB','10 log10(S/N); convert before substitution.'],['Encoding convention','For this lesson, Manchester 0 is high-to-low; 1 is low-to-high.']],
[T('State the model','Use the bandwidth-limited AWGN capacity formula.','Do not mix ideal-noiseless and noisy-channel assumptions.'),T('Read the units','B = 3000 Hz; S/N = 15, linear.','A decibel input would need conversion.'),T('Calculate','log2(1 + 15) = 4.','Compute the logarithm before multiplying.'),T('Interpret','C = 12000 bits/s.','This is a model bound, not measured application throughput.')]),
L('cn-framing','CN','Framing and stuffing','Keep payload patterns distinct from frame boundaries.','college',['cn-unit1'],[],[
'Framing marks where a link-layer frame starts and ends. Without a boundary rule, a receiver cannot reliably separate adjacent variable-length frames.',
'Byte stuffing escapes special data bytes. Bit stuffing can insert a 0 after five consecutive data 1 bits so the payload cannot imitate the flag.',
'The receiver reverses the stuffing rule. Stuffing protects interpretation of boundaries; it does not by itself detect or correct every transmission error.'
], 'Data bits: 111111\nAfter five consecutive 1 bits, insert 0\nStuffed data: 1111101','The inserted 0 is removed when the receiver decodes the stuffed payload.',
'The inserted bit breaks the special run within payload data. A separately transmitted flag remains distinguishable under the protocol rule.',
'Count consecutive data 1 bits correctly, and restart the count after a 0. Do not apply payload stuffing to the boundary flag itself.',
[['Framing','Identify the limits of a frame.'],['Byte stuffing','Escape special bytes inside payload data.'],['Bit stuffing','Insert bits according to a payload rule.'],['Error detection','Use redundancy to identify certain corruptions.']],
[T('Read data','The payload is 111111.','This trace contains six consecutive 1 bits.'),T('Count five 1 bits','The transmitted prefix is 11111.','The stuffing threshold has been reached.'),T('Insert a 0','The transmitted prefix is 111110.','Break the run before sending the next data bit.'),T('Send the last bit','Stuffed payload is 1111101.','The receiver removes the inserted 0 to recover the data.')]),
L('cn-errors','CN','Parity, checksum and CRC','Detection means an error is noticed, not repaired.','college',['cn-unit1'],[],[
'Error detection adds redundant information so the receiver can check certain changes. The guarantees depend on the code and the error pattern.',
'Even parity makes the total count of 1 bits even. It detects any odd number of flipped bits, but can miss an even number.',
'A checksum combines data using a defined arithmetic rule. A CRC uses polynomial division over binary values, where subtraction is XOR.',
'For CRC generation, append zeros equal to the generator degree, divide, and append the remainder. A nonzero receiver remainder indicates a detected error.'
], 'Data = 1011; generator = 1011\nAppend three zeros: 1011000\nDivide with XOR: remainder 000\nCodeword = 1011000','A zero remainder means the check found no error; it does not prove that every bit is correct.',
'Valid codewords satisfy a relation. Some corruptions violate it and are detected. Other corruptions can turn one valid codeword into another.',
'Do not call CRC a correction method. State the generator and bit convention before doing a numerical trace.',
[['Parity','A small check with limited error-pattern coverage.'],['Checksum','Arithmetic redundancy defined by a checksum scheme.'],['CRC','A polynomial-based detection check.']],
[T('Choose generator','Generator bits are 1011; degree is 3.','The leading term determines the appended-zero count.'),T('Extend data','1011 becomes 1011000.','Append three zeros before division.'),T('Divide with XOR','The remainder is 000.','This chosen example is exactly divisible.'),T('Append the remainder','Transmit codeword 1011000.','The receiver repeats the agreed check.')]),
L('cn-hamming','CN','Hamming code and single-bit correction','Use the syndrome to locate an error under a stated limit.','college',['cn-unit1'],[],[
'Hamming codes use parity checks at selected positions. Under the single-bit error assumption, the failed checks identify the bit position.',
'For m data bits, choose r check bits so 2^r ≥ m + r + 1. The syndrome must represent every single-bit position and the no-error result.',
'An ordinary distance-3 Hamming code corrects one bit. An extended Hamming code with overall parity supports single-error correction and double-error detection.'
], 'm = 4\nr = 2: 4 < 7, insufficient\nr = 3: 8 ≥ 8, sufficient\nHamming(7,4) has four data bits and three check bits.','Three check bits are sufficient for the standard single-error-correcting arrangement.',
'The check results form a binary syndrome. With exactly one flipped bit, that syndrome matches the parity-check column for its position.',
'If multiple bits can be wrong, blindly flipping the syndrome position can miscorrect. State the code variant and error assumption.',
[['Parity positions','In a common arrangement, positions 1, 2 and 4 hold check bits.'],['Syndrome','Combined parity-check results.'],['Ordinary Hamming','Distance 3; single-bit correction.'],['Extended Hamming','Extra overall parity; SECDED behavior.']],
[T('Count data','m = 4.','The payload has four data bits.'),T('Try two checks','2^2 = 4; m + r + 1 = 7.','There are not enough syndrome outcomes.'),T('Try three checks','2^3 = 8; m + r + 1 = 8.','The inequality now holds.'),T('Use seven positions','Four data bits plus three check bits.','This is the Hamming(7,4) size.')]),
L('cn-stopwait','CN','Stop-and-Wait ARQ','Retry without delivering the same frame twice.','college',['cn-unit2'],[],[
'Flow control limits how much data a sender can have outstanding. Error control handles lost or damaged data, often using acknowledgments and retries.',
'Stop-and-Wait sends one frame and waits for its acknowledgment. A timeout can cause the sender to transmit that frame again.',
'Sequence numbers let the receiver distinguish a new frame from a duplicate. Alternating 0 and 1 is sufficient for the usual Stop-and-Wait model.'
], 'Send frame 0 → receiver accepts it\nACK is lost → sender times out\nSend frame 0 again → receiver recognizes a duplicate\nReceiver acknowledges without delivering the payload twice.','A retry can be necessary even when the first data frame arrived successfully.',
'The sender cannot distinguish a lost frame from a lost acknowledgment using silence alone. The sequence number prevents duplicate application delivery.',
'A timeout means the sender did not obtain the expected acknowledgment in time. It does not prove which message was lost.',
[['Flow control','Avoid overrunning the receiver.'],['Error control','Recover from loss or detected corruption.'],['ACK','Confirm reception according to the protocol.'],['Sequence number','Distinguish data instances and duplicates.']],
[T('Send frame 0','The sender has one outstanding frame.','It waits for an acknowledgment.'),T('Accept frame','The receiver delivers the payload once.','It now expects the next sequence number.'),T('Lose ACK','The sender times out and retries frame 0.','The sender has not confirmed success.'),T('Handle duplicate','The receiver acknowledges but does not redeliver.','The sequence number identifies the retry.')]),
L('cn-windows','CN','Go-Back-N and Selective Repeat','Compare what is retried after a missing frame.','college',['cn-unit2'],[],[
'A sliding window allows several frames to be outstanding. This can keep a link busy while acknowledgments are in transit.',
'In the standard Go-Back-N model, the receiver accepts frames in order and discards out-of-order frames. The sender retransmits from the missing frame onward.',
'Selective Repeat can buffer acceptable out-of-order frames and retransmit only the missing or damaged frames.',
'With k-bit sequence numbers, textbook limits are at most 2^k − 1 for the Go-Back-N sender window and at most 2^(k−1) for equal Selective Repeat windows.'
], 'Frames 0, 1, 2, 3 are sent; frame 1 is lost\nGBN: frames 2 and 3 are discarded; resend 1, 2, 3\nSR: buffer 2 and 3; resend 1','The retransmission and buffering rules distinguish the protocols.',
'Selective Repeat uses more receiver state to avoid repeating correctly received frames. Sequence-space limits prevent old frames from being confused with new ones.',
'State whether an ACK number means the last received frame or the next expected frame. Both conventions exist; do not mix them in a trace.',
[['Go-Back-N','Cumulative acknowledgment and in-order acceptance in the standard model.'],['Selective Repeat','Separate acknowledgment/buffering of acceptable frames.'],['Window','The allowed range of outstanding sequence numbers.']],
[T('Send a window','Frames 0, 1, 2, 3 are transmitted.','Several frames are outstanding.'),T('Lose frame 1','Frame 0 arrives; frame 1 does not.','The receiver has a gap.'),T('Receive later frames','GBN discards 2 and 3; SR can buffer them.','The receiver rule determines useful saved work.'),T('Recover','GBN resends 1–3; SR resends 1.','This trace uses the usual textbook variants.')]),
L('cn-access','CN','ALOHA, CSMA/CD and CSMA/CA','Choose a rule for sharing a medium.','college',['cn-unit2'],[],[
'A shared medium needs a rule for competing transmitters. ALOHA sends without first sensing the channel; a collision can require a random retry.',
'Slotted ALOHA allows starts only at slot boundaries. Under its ideal textbook model, its maximum throughput is 1/e, about 36.8%. Pure ALOHA reaches 1/(2e), about 18.4%.',
'CSMA senses before sending. CSMA/CD detects collisions during transmission on suitable shared half-duplex Ethernet. CSMA/CA uses avoidance techniques for wireless access.',
'Sensing does not eliminate every collision. Propagation delay and hidden stations can prevent a sender from knowing the complete current situation.'
], 'A and B sense an idle shared half-duplex link\nBoth start before either signal reaches the other\nA collision occurs\nCSMA/CD stations stop and use backoff.','Two stations can each observe idle yet still collide.',
'The channel information reaches a station after propagation delay. A retry delay reduces the chance that competing stations restart together.',
'Modern switched full-duplex Ethernet does not use collision detection for ordinary frame transmission. CSMA/CA reduces collision risk; it cannot guarantee none.',
[['Pure ALOHA','Send at arbitrary times; larger collision-vulnerable interval.'],['Slotted ALOHA','Start at slot boundaries.'],['CSMA/CD','Sense, transmit, detect collision, stop and back off.'],['CSMA/CA','Use sensing, waiting/backoff and acknowledgments; RTS/CTS can be optional.']],
[T('Sense','A and B each observe idle.','Neither has yet received the other’s signal.'),T('Transmit','Both stations begin sending.','Carrier sensing alone did not serialize the starts.'),T('Detect collision','The shared half-duplex signals overlap.','This example uses CSMA/CD-capable shared Ethernet.'),T('Back off','Stop and retry after selected delays.','The random delays reduce repeated simultaneous attempts.')]),

L('ai-tasks','AI','Data, targets and learning tasks','Decide what the output means before choosing a model.','college',['ai-part2','ai-regression'],[],[
'Supervised learning uses examples with inputs and known target values. The model learns a mapping that should also work on unseen examples.',
'Regression predicts a numerical quantity, such as a price. Classification predicts a category, such as spam or not spam.',
'A category can be stored as a number. A label 0 or 1 does not automatically make the task regression.',
'Split data before fitting data-dependent preprocessing. Fit transformations on training data, then apply them to validation and test data.'
], 'Input: hours studied\nRegression target: predicted examination score\nClassification target: pass or fail','The meaning of the target determines the learning task.',
'The target contract determines appropriate outputs, losses, and evaluation. Numeric storage alone does not specify the task.',
'Repeatedly selecting a model based on test results leaks information from the test set. Keep a final test set for a later evaluation.',
[['Feature','An input used to make a prediction.'],['Target / label','The known outcome used during supervised training.'],['Training set','Examples used to fit parameters.'],['Validation / test','Model selection feedback / later evaluation of the selected model.']],
[T('Define output','Choose score or pass/fail.','These contracts need different prediction interpretations.'),T('Split examples','Create separate training, validation and test sets.','Preserve unseen examples for evaluation.'),T('Fit on training data','Learn parameters and preprocessing from training examples.','Avoid using future evaluation information.'),T('Evaluate','Compare predictions with unseen targets.','Training success alone is insufficient.')]),
L('ai-regression','AI','Regression and mean squared error','Calculate a prediction and measure its numerical error.','college',['ai-part2','ai-regression'],['regression'],[
'A simple linear regression model predicts y-hat = w x + b. The weight controls the slope, and the bias controls the intercept.',
'The residual is the difference between an actual target and its prediction. Mean squared error averages the squared residuals.',
'Squaring prevents positive and negative errors from canceling. It also makes large residuals contribute more strongly than small ones.'
], 'Actual: [10, 20, 30]\nPredicted: [8, 22, 29]\nResiduals: [2, -2, 1]\nMSE = (4 + 4 + 1) / 3','MSE = 3.',
'The average uses squared magnitudes rather than signed differences. Every selected squared error contributes a nonnegative amount.',
'A linear output is common for unrestricted numerical predictions. MSE is a loss value, not an accuracy percentage, and has squared target units.',
[['Weight w','Changes prediction as x changes.'],['Bias b','Shifts the prediction even when x is zero.'],['MSE','Average squared numerical error.'],['MAE','Average absolute numerical error.']],
[T('Predict','The model outputs 8, 22, 29.','Compare predictions with the matching targets.'),T('Subtract','Residuals are 2, -2, 1.','Use the same actual-minus-predicted convention throughout.'),T('Square','Squared residuals are 4, 4, 1.','Signs no longer cancel.'),T('Average','9 / 3 = 3.','Divide by the number of predictions.')]),
L('ai-classification','AI','Classification and logistic regression','Distinguish a score, a probability and a class decision.','college',['ai-part2','ai-regression'],['classification'],[
'A classifier predicts categories. Binary classification has two alternatives. Multiclass classification selects among more than two mutually exclusive classes.',
'Binary logistic regression applies a sigmoid to a linear score. Despite its name, it is normally used for classification.',
'A threshold converts a probability into a class decision. A threshold of 0.5 is common, but the costs of different errors can justify another threshold.',
'For mutually exclusive classes, softmax can normalize scores into values that sum to one. Multilabel tasks can instead use separate sigmoid outputs.'
], 'P(spam) = 0.70\nRule: predict spam if probability ≥ 0.50\nPrediction: spam','The 0.70 score becomes a class only after applying the decision rule.',
'The model estimates a score from features. The decision rule connects that score to the required output category.',
'A high score is not a guarantee that this particular prediction is correct. Threshold choice and probability calibration are separate concerns.',
[['Binary','Choose between two classes.'],['Multiclass','Choose one of several mutually exclusive classes.'],['Multilabel','Several labels can be true for the same example.'],['Logistic regression','A classification model based on a transformed linear score.']],
[T('Read features','An email is represented by numeric features.','The text must be converted into usable inputs.'),T('Calculate a score','The model computes a weighted score.','Weights and bias define this calculation.'),T('Apply sigmoid','The estimated spam probability is 0.70.','Map the score into the interval between 0 and 1.'),T('Apply the threshold','0.70 ≥ 0.50, so predict spam.','The threshold creates the discrete decision.')]),
L('ai-neuron','AI','An artificial neuron','Multiply, add a bias, then apply an activation.','college',['ai-part1'],[],[
'An artificial neuron combines inputs using weights, adds a bias, and applies an activation function.',
'The pre-activation value is z = sum(w_i x_i) + b. The output is f(z). The activation determines how the combined value becomes an output.',
'Weights are learned parameters. A negative weight reduces the weighted sum for a positive input, but its practical effect depends on the other inputs.'
], 'x = [2, 3]; w = [0.5, -1]; b = 1\nz = 2 × 0.5 + 3 × (-1) + 1 = -1\nReLU(z) = max(0, -1)','The neuron output is 0 when its activation is ReLU.',
'Each multiplication measures one input’s contribution. The bias shifts the combined value; the activation then transforms it.',
'Do not apply the activation separately to each input in this neuron formula. Also, a biological-neuron analogy does not describe every implementation detail.',
[['Input','A feature or an output from an earlier layer.'],['Weight','A multiplier learned during training.'],['Bias','An added learned offset.'],['Activation','The function applied to the combined value.']],
[T('Multiply','Contributions are 1 and -3.','Use the corresponding input and weight pairs.'),T('Sum','The weighted sum is -2.','Combine all contributions.'),T('Add bias','z = -2 + 1 = -1.','The bias shifts the sum.'),T('Activate','ReLU(-1) = 0.','The negative input is mapped to zero.')]),
L('ai-activations','AI','Activation functions and output contracts','Choose the function by the required behavior.','college',['ai-part1','ai-part2'],[],[
'ReLU returns max(0, z). Sigmoid returns a value between 0 and 1. tanh returns a value between -1 and 1.',
'Nonlinear hidden activations allow a network to represent relationships that stacked linear transformations alone cannot represent.',
'Output choices depend on the task. Linear outputs are common for regression, sigmoid for binary probability, and softmax for mutually exclusive classes.'
], 'z = [-2, 0, 3]\nReLU(z) = [0, 0, 3]\nFor equal softmax scores [0, 0], outputs are [0.5, 0.5].','Activation changes the representation; the chosen output contract determines its interpretation.',
'Composition of linear transformations remains linear. A nonlinear transformation changes the family of relationships that the network can express.',
'Softmax is not the usual choice for independent multilabel decisions. Loss functions must agree with whether the model returns probabilities or raw logits.',
[['ReLU','Zero for a negative input; identity for a positive input.'],['Sigmoid','One bounded output, often for binary probability.'],['Softmax','Normalize a vector for mutually exclusive classes.'],['Linear','No activation transformation; useful for unrestricted numerical output.']],
[T('Read hidden score','z = -2.','This value was produced by weights and a bias.'),T('Apply ReLU','The hidden output becomes 0.','A negative score is suppressed.'),T('Build output scores','The final layer produces equal scores [0, 0].','These are two class scores in a separate output example.'),T('Apply softmax','Probabilities become [0.5, 0.5].','The normalized outputs sum to one.')]),
L('ai-ann','AI','ANN layers and parameter counts','Follow shapes and count weights before training.','college',['ai-part1','ai-part2'],[],[
'An artificial neural network connects layers of units. A Dense layer connects each input feature to each unit in that layer.',
'With n inputs and m units, a Dense layer has n × m weights. With one bias per unit, it also has m biases.',
'The total is (n + 1) × m when biases are enabled. The batch dimension counts examples; it does not multiply the number of model parameters.'
], 'Dense layer: 3 input features, 4 units\nWeights = 3 × 4 = 12\nBiases = 4\nTotal trainable parameters = 16','Each example produces four outputs from this layer.',
'Every output unit needs one weight for each input plus its own bias. The same learned parameters are reused for every example in a batch.',
'Flatten changes shape without learning Dense weights. More parameters can increase capacity but do not guarantee better unseen-data performance.',
[['Input layer','Supplies features.'],['Hidden layer','Builds intermediate representations.'],['Output layer','Produces predictions with the task’s shape.'],['Batch dimension','The number of examples processed together.']],
[T('Read input shape','One example has 3 features.','Count features independently of batch size.'),T('Connect units','Each of 4 units receives all 3 features.','The layer needs 12 weights.'),T('Add biases','Each unit has one bias.','There are 4 more parameters.'),T('Count and output','16 parameters; 4 outputs per example.','Weights are shared across the batch.')]),
L('ai-training','AI','Loss, gradients and parameter updates','Separate measuring error from changing parameters.','college',['ai-part1','ai-part2'],['gradients'],[
'Forward propagation calculates a prediction from the current parameters. A loss compares that prediction with the training target.',
'Backpropagation calculates gradients through the network using the chain rule. An optimizer uses those gradients to update parameters.',
'A gradient describes how the loss changes locally with a parameter. Gradient descent subtracts a learning-rate-scaled gradient.',
'For one squared-error example, prediction is w x. The chain rule combines the loss change per prediction with the prediction change per weight.',
'An epoch is one pass through the training data. A batch is a group of examples used for an update in mini-batch training.'
], 'x = 1; target = 0.5; w = 2; bias = 0\nprediction = w × x = 2\nloss = (prediction - target)² = 2.25\ngradient = 2 × (prediction - target) × x = 3\nlearning rate = 0.1\nw_new = 2 - 0.1 × 3','w_new = 1.7.',
'The positive gradient says a small increase in w would increase the local loss. Subtracting the gradient moves in the opposite local direction.',
'A large learning rate can overshoot. An update is not guaranteed to reduce every individual example’s loss or find the global best solution.',
[['Forward pass','Produce predictions.'],['Loss','Measure disagreement with targets.'],['Backpropagation','Calculate gradients.'],['Optimizer','Apply a parameter-update rule.']],
[T('Forward pass','With x = 1 and w = 2, prediction is 2.','The bias is zero in this one-weight example.'),T('Measure loss','Target is 0.5; squared loss is 2.25.','Square the difference 2 - 0.5.'),T('Calculate gradient','The gradient for w is 2 × (2 - 0.5) × 1 = 3.','The chain rule multiplies 2 × prediction error by the input x.'),T('Update','w becomes 1.7.','Subtract 0.1 × 3 from the old weight.')]),
L('ai-tensorflow','AI','TensorFlow and Keras workflow','Distinguish model setup, training, evaluation and prediction.','college',['ai-part1','ai-part2'],['classification','gradients'],[
'TensorFlow provides tensor operations and tools for automatic differentiation. A tensor has a shape and a data type.',
'tf.keras provides higher-level model building and training interfaces. Sequential arranges layers in a sequence.',
'compile configures the optimizer, loss, and metrics. fit trains on provided examples. evaluate reports metrics on supplied data. predict produces outputs.',
'GradientTape records suitable operations to calculate derivatives. TensorFlow code here is conceptual Python; this website does not run a TensorFlow runtime.'
], 'import tensorflow as tf\nmodel = tf.keras.Sequential([\n    tf.keras.Input(shape=(3,)),\n    tf.keras.layers.Dense(4, activation="relu"),\n    tf.keras.layers.Dense(1)\n])\nmodel.compile(optimizer="adam", loss="mse")\n# model.fit(x_train, y_train, epochs=5)\n# model.evaluate(x_test, y_test)','This model maps three features to one regression output. Training needs compatible numeric arrays.',
'The layer shapes specify the calculation. compile selects how to measure and update it. fit performs updates; prediction alone does not train the model.',
'For cross-entropy, match from_logits to the actual output representation. This example uses a linear regression output and MSE, not a classification output.',
[['Tensor','An array-like numerical value with shape and dtype.'],['compile','Configure training choices.'],['fit','Perform training with supplied data.'],['evaluate / predict','Report metrics / produce model outputs.']],
[T('Build','Create layers for 3 features and 1 output.','The model structure determines compatible shapes.'),T('Compile','Configure Adam and MSE.','No training examples are processed by this configuration step.'),T('Fit','Update parameters using training examples.','Targets must match the output contract.'),T('Evaluate and predict','Measure unseen-data performance, then use outputs.','Metrics and raw predictions are different results.')]),
L('ai-evaluation','AI','Accuracy, confusion matrices and overfitting','Check unseen behavior and the cost of errors.','college',['ai-part2','ai-regression'],[],[
'Accuracy is the fraction of correct predictions. It can be misleading when one class is much more common than another.',
'Precision is TP/(TP + FP). Recall is TP/(TP + FN). State which class is treated as positive before interpreting these values.',
'Overfitting occurs when the model fits training-specific patterns that do not generalize well. Compare training and validation behavior rather than training performance alone.',
'Regularization, suitable model capacity, better data, and early stopping can help. No single method guarantees generalization.'
], '100 emails: 90 not spam, 10 spam\nPredict not spam for every email\nCorrect = 90; accuracy = 90%\nSpam recall = 0 / 10 = 0','High accuracy can coexist with failure to detect every spam email.',
'The common negative class dominates the correct-count total. A class-specific metric reveals the failures hidden by the overall percentage.',
'When a denominator is zero, a precision or recall value needs an explicit handling convention. The test set must remain separate from repeated model selection.',
[['TP / FP','Positive prediction that is correct / incorrect.'],['FN','A true positive-class example predicted negative.'],['Precision','Of predicted positives, how many are actually positive?'],['Recall','Of actual positives, how many were found?']],
[T('Count classes','There are 90 negatives and 10 positives.','Treat spam as the positive class.'),T('Predict all negative','All 10 positive examples are missed.','There are no positive predictions.'),T('Calculate accuracy','90 / 100 = 90%.','Most examples belong to the negative class.'),T('Calculate recall','TP = 0; FN = 10; recall = 0.','The classifier detects no spam despite high accuracy.')])
];
export const glossary = [
['Increment','A usable addition to product capability.','Adding reports after attendance entry works.'],['Iteration','A cycle that revises a solution.','Improve the existing attendance screen after feedback.'],['Artifact','An identifiable output used to inspect work.','A Sprint Backlog makes the current plan visible.'],['CI','Frequent integration with automated build and test feedback.','A commit triggers checks.'],['Staging area','Selected file content for the next Git commit.','git add selects the current content.'],['Branch','A movable reference to a commit.','A feature branch advances when it receives a commit.'],['Callback','A function passed for another operation to call.','forEach calls a supplied function.'],['Promise reaction','A handler scheduled for a Promise result.','then runs after current synchronous work.'],['Mutation','A change inside an existing object.','push adds an element to an array.'],['Coercion','Conversion used by a language operation.','"5" - 2 converts the string to a number.'],['DOM','A node-based representation of a document.','A paragraph node has textContent.'],['Frame','A link-layer unit with boundaries and control information.','A packet is carried in a frame across one link.'],['Bit rate','The number of transmitted bits per second.','12000 bits/s is 12 kbit/s.'],['Symbol','One transmitted signal choice.','Four distinct choices can encode two bits per symbol.'],['ACK','An acknowledgment with a protocol-defined meaning.','A sender retries when its expected ACK does not arrive.'],['Syndrome','The combined parity-check result.','Under a single-bit assumption, it can identify the flipped bit.'],['Feature','An input to a model.','Hours studied can be a feature.'],['Target','The known outcome used for supervised training.','The actual score is a regression target.'],['Parameter','A model value adjusted during training.','A neuron weight or bias.'],['Hyperparameter','A training or model choice selected outside the learned parameter values.','A learning rate or hidden-layer width.'],['Loss','A quantity measuring prediction disagreement.','MSE averages squared numerical errors.'],['Gradient','A derivative that describes local change.','Gradient 3 means a small positive parameter change increases local loss.'],['Logit','A raw class score before a probability transformation.','A binary sigmoid can transform a logit into a probability.'],['Epoch','One pass through the training examples.','Five epochs reuse the training set in five passes.'],['Generalization','Useful performance on examples not used for fitting.','Evaluate a selected model on separate test examples.'],['AWGN','Additive white Gaussian noise, a stated communication-channel model.','The Shannon capacity example assumes this channel model.']
].map(([term,definition,example])=>({term,definition,example}));
