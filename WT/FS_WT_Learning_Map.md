# WT learning map: foundations, subtle differences and hard practice

Audited on **8 October 2026** for the screening on **9 October 2026**. Announced WT scope: **JavaScript Basics; JSON; Callbacks; Promises; Async/Await; Arrays, Sets & Maps; DOM**. The notice does not give detailed WT subtopics or a WT share of the 30 mixed-subject MCQs.

**Start with the [direct WT guide](FS_Revision_Notes.md), then the [80-question hard bank](FS_WT_Hard_MCQ_Bank.md).** The repository already teaches the foundation. The remaining preparation need is recognizing exact contracts, exceptions and state changes when similar-looking implementations differ.

The user's stated exam emphasis is deep understanding of small method differences. This map prioritizes those differences. The revised bank selects 80 of the existing questions. It covers all announced areas; this map also keeps reference notes on extra rules beyond that compact selection.

All 80 questions contain code scenarios. Thirteen also ask you to choose a fix/use case, with working repairs and expected outputs in the hidden answers. Four mixed sets contain 20 questions each; use the first set to diagnose weak rules before attempting the full bank.

## 1. What the existing materials actually cover

PDF references use **one-based viewer pages**. The PDF and DOCX versions were extracted separately so a shared filename did not hide either source. Relevant PDF diagrams/code images and a scanned mid-paper page were visually checked.

| Material | Relevant location | Assessment |
|---|---|---|
| [UNIT III PDF](UNIT%20III.pdf), 106 pages | pp. 14-18: asynchronous programming/callbacks; pp. 19-21: Node event loop; pp. 22-27: Promises/chains/combinators; pp. 27-29: async/await | Strongest college explanation for async foundations. Important examples are images; do not rely only on extracted text. The event-loop discussion is Node-specific. |
| [UNIT III DOCX](UNIT%20III.docx) | Introduction to Asynchronous Programming; Understanding Callbacks; Callbacks and Error-First Convention; Using Promises; Chaining Promises; Promise combinators; Async/Await Syntax | Editable counterpart with substantial Node/server material. Use named headings; Word pagination is not stable. It is not a complete JS language/array/DOM reference. |
| [MongoDB unit](Unit%201_MongoDB.pdf), 92 pages | pp. 8-10: JSON/BSON overview | JSON purpose and basic shape; little parse/stringify, reviver/replacer or round-trip behavior. BSON database operations are broader than the screening scope. |
| [MongoDB syllabus](Unit1_MongoDB_Syllabus.docx) | Understanding JSON and BSON | A topic outline, not an explanation of JavaScript JSON edge cases. |
| [Node syllabus](Unit2_NodeJs_Syllabus.pdf), 3 pages | p. 1: callbacks, Promise chaining, all/allSettled/race/any, async/await | Useful coverage checklist, not sufficient teaching by itself. The [(1) copy](Unit2_NodeJs_Syllabus%20%281%29.pdf) is byte-identical and does not add coverage. |
| [Class callbacks](examples/callback_functions/ex2.js) | Five forEach-style examples | Demonstrates synchronous callback use; little method comparison. The final example defines display2 but calls display instead, so it does not demonstrate the newly defined function. |
| [Promise examples](examples/promises/) | promises3, promises6, promises8, promises9 | Construction, chaining, color changes and all. promises3 defines saveToDb without calling it; several outcomes depend on Math.random. Do not memorize one output as universal. |
| [Async examples](examples/Async%26Await/) | ex1, ex5, ex6 | Async return, try/await/catch, awaited versus unawaited calls. ex6 prints generated numbers but resolves with no value; a later await would receive undefined. |
| [WT mid papers](WT%20Mid%20Papers.pdf), 6 pages | p. 2: function/Map iteration/arrays; p. 3: hoisting, destructuring, string methods, parameter defaults, declaration versus expression | Useful evidence of college question styles, mostly written-answer material. These are older college papers, not the announced FS paper. Other pages include broader HTML/CSS/Bootstrap/server content. |
| [Direct WT guide](FS_Revision_Notes.md) | Sections 1-12 and its 15 MCQs | Provides basics, JSON, Promise order/propagation, array returns/mutation, Set/Map identity and DOM/events. A useful coherent first pass. |
| [Subject Atlas lessons](../Subjects/visualize/src/content.mjs) and [questions](../Subjects/visualize/src/questions.mjs) | 12 WT lessons, 48 WT questions | Visual traces and introductory distinctions. Some questions overlap the direct guide; do not count those as 63 distinct questions. |

**Coverage conclusion:** the original college sources are strongest for async work, shallow for JSON and scattered for language/collections/DOM. The newer guide and Atlas already fill many teaching gaps. Use external references to resolve the deeper rules below, rather than replacing the entire guide with several long courses.

## 2. Depth to aim for, topic by topic

“Foundation” means the current guide explains the idea with examples. “Deeper practice” means you can predict a changed scenario and explain why a similar method or implementation fails.

| Area | Current foundation | Deeper practice target, including extra reference rules | Bank examples |
|---|---|---|---|
| Bindings and scope | Guide 1, 3; Atlas variables | Hoisting versus initialization; inner TDZ shadowing; typeof exception; const mutation versus rebinding; captured bindings | WT001-WT003, WT007-WT008 |
| Defaults and function results | Guide 3; mid-paper prompts | Undefined versus null/zero; later parameter defaults; arrow expression/block; newline after return; mutation versus reassignment | WT004-WT006 |
| this and callbacks | Guide 3, 5 | Property call versus detached function; lexical arrow this; bind versus invocation; function identity | WT009, WT051-WT053, WT079 |
| Conversion and equality | Guide 2 | Operator-specific conversion; loose equality versus truthiness; null/undefined; NaN/signed zero; logical operands and side effects | WT010-WT013 |
| String methods | Limited college prompts; selected guide basics | Slice/substring bounds; trim/case methods preserve original; replace/replaceAll; index zero; split limit; code units versus iteration | WT014-WT016 |
| Array result contracts | Guide 9; Atlas arrays | Return length/value/removed array/new array/boolean/index/undefined; choose transformation, selection, accumulation or search | WT017-WT030 |
| Array identity and mutation | Guide 9 gives shallow copy, splice/sort | Shared nested objects; alias effects; future entry changes during callbacks; length truncation; fill versus factories | WT021-WT024, WT034-WT036 |
| Sparse arrays | Little explanatory coverage located in college sources or guide | Hole versus explicit undefined; skipped callbacks versus undefined reads; retained length versus compact selection | WT022, WT032-WT034, WT035 |
| Set and Map | Guide 10; Atlas collections | SameValueZero versus strict equality; object identity; insert/update/reinsert order; callback signatures; property versus entry | WT037-WT042 |
| JSON | Guide 4 adds syntax and omissions | Primitive root, undefined at different positions, non-finite numbers, cycles versus sharing, lost identity/types, replacer/reviver contracts | WT043-WT050 |
| Callback timing and completion | College examples and Guide 5 | Synchronous versus deferred; passing versus deliberate callback factory invocation; missing return after error; callback return scope | WT051-WT054 |
| Promise construction and chaining | College pp. 22-27; Guide 6-7 | Executor now/reaction later; resolve versus return; new Promise identity; non-callable handlers; sibling rejection handler versus later catch | WT055-WT059 |
| Cleanup and combinators | Guide 7; college outlines | finally outcome preservation and failure replacement; all input order/cancellation; allSettled records; race versus any; empty inputs | WT060-WT064 |
| Async/await | College pp. 27-29; Guide 8 | Start before first await; rejection versus synchronous throw; return await inside local try; sequential starts; wrong async array predicates | WT065-WT068 |
| DOM selection and collections | Guide 11; color example | Selector syntax versus literal IDs; null versus empty list versus invalid syntax; static/live membership; text nodes; NodeList versus Array | WT069-WT070, WT080 |
| DOM update contracts | Guide 11 gives text/HTML/create/append/remove | Move versus clone; listener/node identity after HTML replacement; fragments; rendered text; dataset strings; attribute versus current property | WT071-WT075 |
| DOM events | Guide 12 | Capture/target/bubble; stop versus immediate stop versus cancellation; passive/cancelable; removal identity/capture; once; synchronous dispatch | WT076-WT079 |

## 3. Compare methods with the right questions

For every API, ask: **What does it return? What can it mutate? What arguments reach its callback? Does it stop early? What does absence mean? What happens with asynchronous callback results?**

### Arrays

| Method family | Result and use case | Tiny distinction that changes the answer |
|---|---|---|
| map / forEach | map collects returned transformed values; forEach performs effects and returns undefined | A block body without return produces actual undefined entries; return false does not break forEach. Neither awaits async callbacks. |
| filter / map | filter selects original values; map collects callback returns | A truthy predicate result is not the replacement value. filter(Boolean) removes valid zero and false as well as missing data. |
| find / findIndex | First matching value / its index | undefined can mean a found undefined value or no match; index -1 disambiguates absence. Zero is a successful index. |
| some / every | Existential / universal boolean test, with early stopping | Empty some is false; empty every is true. An async predicate returns a truthy Promise rather than an awaited boolean. |
| includes / indexOf | Membership boolean / position or -1 | includes finds NaN and reads holes as undefined; indexOf uses strict equality and skips absent indices. |
| slice / splice | Shallow selection copy / mutating removal/insertion with removed values returned | End bound versus deletion count; omitted deleteCount versus explicit undefined; slice preserves the original. |
| sort / toSorted | Mutating order / sorted copy | Default ordering uses strings; numeric order needs a comparator. Both can share nested objects. |
| reverse / toReversed | Mutating reversal / reversed copy | An alias observes reverse; it does not share the new outer array from toReversed. |
| splice / toSpliced | Removed values / modified copy | The copying version returns the resulting array rather than the removed subset. |
| reduce | Accumulated value | The initial value changes callback count and empty-input behavior. It is not always zero, numeric or a fresh object. |
| fill / Array.from factory | Reuse one supplied value / call mapping function separately | fill({}) shares one object at all positions; returning a fresh object literal per mapping call avoids that aliasing. |
| flat / flatMap | Flatten chosen depth / map then flatten one level | Neither implies recursive flattening to every depth. Encountered holes are omitted. |

**Sparse-array rule:** do not generalize one method’s behavior to all methods. A hole reads as undefined but is absent according to the in operator. map preserves holes, filter compacts selected present entries, forEach skips holes, find/findIndex visit them, and value iteration reads them. An explicit undefined entry is present. JSON may obscure the distinction by serializing both positions as null.

### Strings, collections and JSON

| Comparison | Meaning to preserve |
|---|---|
| String slice / substring | slice uses negative positions and does not swap reversed bounds; substring normalizes and can swap bounds. Both return strings and leave the original unchanged. |
| replace / replaceAll | A string search in replace replaces once; replaceAll handles every match. This bank’s examples use literal search strings, not regex-specific behavior. |
| indexOf / includes | Index zero is falsy despite a successful search; -1 is truthy despite absence. Use the contract matching your test. |
| == / === / Object.is / SameValueZero | These are distinct equality rules. Do not infer Set/Map key behavior solely from NaN === NaN or signed-zero Object.is results. |
| Map set/get/has versus bracket properties | Brackets use ordinary object properties, not Map entries. has distinguishes a missing key from one mapped to undefined. |
| Array/Map/Set forEach arguments | Array: value/index/array. Map: value/key/map. Set: value/value/set. Default Map iteration instead yields key/value pairs. |
| JSON parse / stringify | Text-to-data versus data-to-text. Some values are omitted, converted or rejected. A round trip is not a universal identity/type-preserving clone. |
| Replacer / reviver | Serialization policy versus parsing transformation. Returning undefined can omit/delete a property; the root callback also matters. |

### Async and DOM

| Comparison | Meaning to preserve |
|---|---|
| Calling / passing / returning a callback | Evaluating f() happens now. Passing f defers invocation to the receiving operation. A factory call is valid if it intentionally returns the required callback. |
| resolve / return | Resolving a Promise does not exit its executor. Returning a Promise from a chain handler makes the next stage follow that work. |
| then(success,failure) / then(success).catch(failure) | The sibling failure handler responds to incoming rejection. A following catch can also handle a throw from success. |
| catch / finally | catch can recover with a value. Successful finally cleanup usually preserves the previous outcome; failed cleanup can replace it. |
| all / allSettled / race / any | All successes / all outcome records / first settlement / first fulfillment. Result array order follows inputs. Aggregation does not itself cancel work. |
| return p / return await p inside try | Both adopt outcomes at the function boundary, but only the local await turns this rejection into a throw within that local try. |
| Await callback collection / await forEach | Awaiting forEach’s undefined result does not collect its callbacks. Use deliberately sequential loops or an awaited collection of Promises for independent work. |
| querySelector / querySelectorAll / getElementsByClassName | First or null / static NodeList / live HTMLCollection. A valid miss differs from invalid CSS syntax. |
| textContent / innerHTML / innerText | Literal descendant text / parsed markup / rendering-aware text. The hidden/connected state matters for innerText. |
| append / appendChild / cloneNode | Strings accepted with undefined return / Node required with same Node returned / new identity without installed addEventListener registrations. |
| target / currentTarget | Origin of the dispatched event / node whose listener is currently executing. |
| preventDefault / stopPropagation / stopImmediatePropagation | Cancel a cancelable default / stop travel to other nodes / also stop later listeners on the current node. |

## 4. Corrections and evidence boundaries in the class materials

- Unit III pp. 15-16 emphasize asynchronous callbacks. The callback example in the repository also demonstrates synchronous invocation; a callback is not necessarily asynchronous.
- Unit III pp. 19-21 describe Node phases and nextTick. Do not transfer a Node CommonJS example to browser/module execution without checking the environment. The timeout/immediate ordering is explicitly variable in one example; the fixed illustrative trace on p. 21 is not a universal timing promise. The bank avoids that host-dependent race.
- The JSON/BSON overview is not a parse/stringify edge-case lesson. “JSON-like MongoDB document” does not mean every JavaScript object or BSON value is valid JSON text.
- Color-change code uses the browser document; it does not run in plain Node without a DOM. Its h1 assignment is undeclared in the example, so strict execution needs an explicit declaration and a matching element.
- The Promise database examples use random decisions. A function named saveToDb models an outcome; it does not demonstrate an actual database write. The bank substitutes explicit values and errors.
- A log that says a timer “completed” does not imply its Promise fulfilled with the logged number. ex6 calls resolve() with no argument.

Original source files are preserved. The deeper bank uses explicit environments and complete fixtures to prevent an unstated condition from deciding an answer.

## 5. Selected sources: learn the rule, then test a changed case

Use the relevant reference’s **description, return value, exceptions and examples**, not only its short introductory sentence. The following primary documentation was checked on 8 October; each bank answer also links the specific API reference.

| Topic | Reading | Focus |
|---|---|---|
| Language foundation | [MDN grammar/types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types), [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) | Scope, declaration/initialization, return behavior and argument values |
| Binding capture | [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures), [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) | Captured bindings and lexical this |
| Equality | [Loose equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality), [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) | Actual conversion rules, NaN and signed zero |
| Array overview | [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections), [Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | Method groups, property presence and sparse arrays |
| Callback traps | [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) | Callback arguments, return requirements, skipped versus visited holes |
| Copying methods | [toSpliced](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced) and the related toSorted/toReversed/with links | Copying versus mutating contracts; lower priority after core methods |
| Set/Map | [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) | Identity, SameValueZero, insertion order and callback/iterator contracts |
| JSON | [parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), [stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) | Syntax, unsupported values, cycles, reviver/replacer |
| Promise propagation | [then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then), [finally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally), [any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) | Handler outcomes, cleanup and first-success versus first-settlement |
| Await | [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) | Promise identity, suspension, rejection and local try/catch |
| DOM selections | [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) | Snapshot membership, missing/invalid selectors and conversion to Array |
| DOM node/text operations | [cloneNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode), [innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) | Identity, retained registrations and rendered versus descendant text |
| Events | [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener), [stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) | Callback/capture matching, passive/once and same-node listeners |
| Host boundary | [Node event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick), [browser microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) | Host-specific scheduling assumptions; useful to qualify the college examples |

MongoDB CRUD/aggregation, Express, HTTP servers, deployment, Bootstrap/CSS frameworks, libuv internals, workers and advanced regular expressions are broader material. Prioritize the announced JS/JSON/async/collections/DOM rules before those. Legacy string substr and newer language proposals are optional recognition unless emphasized in class.

## 6. A focused route for today

This is a **WT block**, not a plan for the entire two-hour exam or every subject.

| Time | Task |
|---|---|
| 25 minutes | Guide 1-3; predict binding/default/this/coercion examples and read the string comparison table above |
| 30 minutes | Guide 9-10; compare return values, mutation, holes and identity in the array/collection matrix |
| 20 minutes | Guide 4; serialize objects versus arrays and explain what a JSON round trip loses |
| 35 minutes | Guide 5-8; draw the current stack, queued reactions and chain value/rejection after every step |
| 25 minutes | Guide 11-12; separate collection membership, node identity, attribute/current property and event phase |
| 30 minutes | Mixed Set 1 with answers closed (20 minutes), then review for 10 minutes |
| 15 minutes | Review only wrong/uncertain rules, then reattempt a changed example |
| **180 minutes** | Foundation plus diagnosis; this does not complete all 80 questions |

For **90 minutes**, use 15 basics/strings, 20 arrays/collections, 10 JSON, 20 async, 15 DOM, 10 targeted recall. Leave extra method rules in this map until the main differences are reliable. These are suggested allocations, not measured learning times.

After a wrong answer, write: (1) the value/state before the step, (2) the API contract, (3) the value/state afterward, (4) why the nearest distractor would require a different method or condition. Move on when you can explain the changed case without memorized output.
