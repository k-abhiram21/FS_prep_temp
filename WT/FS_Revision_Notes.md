# Web Technologies: FS revision notes

For the screening test on **9 October 2026**. Scope: JavaScript · JSON · Async code · Collections · DOM.

[All subject notes](../FS_SUBJECT_NOTES.md) · [Visual study website](../Subjects/visualize/README.md)

## How to use these notes

Use JavaScript for this subject, even though you will use Java for coding problems. Trace variable values first. Then trace function calls, Promise jobs, array methods, and DOM changes.

Read the quick table first. For each topic, cover the result and work through the example. Explain the MCQ trap in your own words. Finish with the short self-check at the end.

**Teaching provenance: ai explnation due to lack of material.** These are AI-authored explanations and examples, not verbatim college notes. Each topic identifies whether the selected college material covers it, covers it partly, or lacks a focused explanation. The label does not mean that every underlying topic is missing. The writing uses short, direct explanations inspired by ASD-STE100, with technical terms explained through concrete steps.

The notice gives topic names, not an exact question distribution. These notes are revision aids and do not predict the test paper.

## Quick recall

| Topic | Explain it this way |
|---|---|
| const | Prevents rebinding. It does not freeze the contents of an object or array. |
| === | Does not coerce different operand types into equality. Object comparisons still use identity. |
| JSON | Text format: double-quoted keys and strings; no functions, comments, or trailing commas. |
| Callback | A function passed for another operation to call. It can run synchronously. |
| Promise | Its executor runs synchronously. A registered then handler runs later as a Promise job. |
| async / await | An async call returns a Promise. await suspends that function, not the whole program. |
| map / filter / reduce | Transform each element / select elements / combine elements into a result. |
| Set / Map | Store unique values / associate keys with values. Read their size with .size. |
| DOM | The live document tree. Selecting an element can return null. |
| Events | target identifies the event origin. currentTarget identifies the current listener element. |

## Reading order

1. JavaScript variables and scope
2. Types, coercion and equality
3. Functions, returns and shared objects
4. JSON: text to data and back
5. Callbacks: who calls the function?
6. Promises and execution order
7. Promise chains, catch and all
8. Async/await without hidden magic
9. Array methods: transform, select, combine
10. Sets and Maps
11. DOM: selecting and changing a page
12. DOM events and propagation

## 1. JavaScript variables and scope

**Main idea:** Track the binding separately from the object it refers to.

**ai explnation due to lack of material**

**Material basis:** A focused explanation of this topic was not identified in the selected college material. This section is a supplement.

let creates a block-scoped binding that can be reassigned. const creates a block-scoped binding that cannot be reassigned.

const does not freeze an object or array. The binding can keep pointing to the same object while that object’s contents change.

var is scoped to its function or global context rather than an ordinary block. Accessing let or const before initialization causes a ReferenceError.

### Worked example

```text
const scores = [4];
scores.push(7);
console.log(scores.length);
```

**Result and interpretation:** 2. The same array now contains two elements.

### Follow the steps

1. **Create an array:** Object A contains [4]. The array literal creates an object.
2. **Bind scores:** scores refers to A. const prevents reassignment of this binding.
3. **Push 7:** A now contains [4, 7]. push changes the array contents.
4. **Read length:** scores.length is 2. The binding still refers to A.

**Why this works:** The binding and the object are different things. Preventing reassignment does not prevent changes inside the object.

**MCQ trap:** Do not say that const makes every value immutable. Strings and numbers are primitive values; arrays and ordinary objects have mutable contents.

| Distinction | Meaning |
|---|---|
| let | Use when the binding must receive another value. |
| const | Use when the binding will keep its initial value. |
| var | An ordinary block does not create a separate var scope. |

**Official references:** [MDN: grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types).

## 2. Types, coercion and equality

**Main idea:** Read the operator before predicting a conversion.

**ai explnation due to lack of material**

**Material basis:** A focused explanation of this topic was not identified in the selected college material. This section is a supplement.

JavaScript can convert values during an operation. The + operator can join strings, while subtraction requires numeric conversion.

Strict equality, ===, compares values without the coercion used by ==. Distinct object references do not become equal because their contents match.

Falsy primitive values include false, 0, an empty string, null, undefined, and NaN. An empty array or object is truthy.

### Worked example

```text
console.log("5" + 2);
console.log("5" - 2);
console.log("5" === 5);
```

**Result and interpretation:** 52
3
false

### Follow the steps

1. **Inspect operands:** Left is the string "5"; right is the number 2. Start with actual values and types.
2. **Apply +:** The numeric value is converted to text. This operation joins strings.
3. **Apply - separately:** The string "5" becomes the number 5. Subtraction performs numeric conversion.
4. **Compare strictly:** "5" === 5 is false. The types differ.

**Why this works:** The first operation has a string operand and joins text. The second converts the numeric string. Strict equality keeps the type distinction.

**MCQ trap:** typeof null returns "object" for historical reasons. This result does not mean that null is an ordinary object with readable properties.

| Distinction | Meaning |
|---|---|
| + with a string | Can perform string concatenation. |
| - | Converts operands to numbers for subtraction. |
| === | Avoids equality coercion. |
| [] === [] | false, because the literals create separate objects. |

**Official references:** [MDN: expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators).

## 3. Functions, returns and shared objects

**Main idea:** Follow a call and see which data can change.

**ai explnation due to lack of material**

**Material basis:** A focused explanation of this topic was not identified in the selected college material. This section is a supplement.

A function receives arguments and can return a result. Without an executed return value, a normal function call produces undefined.

JavaScript passes argument values. When an argument is an object reference, the function can use that reference to change the shared object.

Reassigning the parameter changes the local binding. It does not redirect the caller’s binding to the replacement object.

### Worked example

```text
const item = {count: 1};
function change(x) {
  x.count = 2;
  x = {count: 9};
}
change(item);
console.log(item.count);
```

**Result and interpretation:** 2. The property mutation affects the original object; the parameter reassignment does not.

### Follow the steps

1. **Call:** item and x refer to object A. The reference value is copied into the parameter.
2. **Mutate:** A.count becomes 2. Both bindings can observe the changed property.
3. **Reassign locally:** x refers to object B with count 9. item still refers to A.
4. **Read caller state:** item.count is 2. The caller’s binding did not change.

**Why this works:** The caller and parameter initially refer to the same object. A property write changes that object. A local reassignment only changes one binding.

**MCQ trap:** An arrow function with a block body needs an explicit return for a value. x => {x * 2} returns undefined.

| Distinction | Meaning |
|---|---|
| Mutation | Change the contents of an existing object. |
| Reassignment | Make one binding hold a different value. |
| Return | Supply the result of the call. |

**Official references:** [MDN: grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types).

## 4. JSON: text to data and back

**Main idea:** Check syntax before using the parsed value.

**ai explnation due to lack of material**

**Material basis:** The selected college material provides only part of this topic. The explanation fills the identified gaps.

JSON is a text format for exchanging data. Its values can be objects, arrays, strings, numbers, booleans, or null.

Object keys and string values use double quotes. Comments, undefined, functions, and trailing commas are not valid JSON syntax.

JSON.parse reads JSON text and returns a JavaScript value. JSON.stringify produces JSON text from a supported JavaScript value.

Serialization does not preserve every JavaScript feature. For example, an undefined object property is omitted.

### Worked example

```text
const text = '{"name":"Asha","marks":[8,9]}';
const student = JSON.parse(text);
console.log(student.marks[1]);
```

**Result and interpretation:** 9. The input is text; the parsed result is an object containing an array.

### Follow the steps

1. **Receive text:** A string contains name and marks. Text does not support object-property access by itself.
2. **Parse:** Validate the JSON syntax. Invalid syntax stops with a SyntaxError.
3. **Read data:** marks[1] is 9. The parsed array uses zero-based indexing.
4. **Serialize:** JSON.stringify can produce outgoing text. Only supported data is represented.

**Why this works:** Parsing validates the text structure and creates usable values. A string that merely looks like an object is still a string until parsed.

**MCQ trap:** JSON.parse throws a SyntaxError for invalid JSON. JSON.stringify can throw for circular references; it is not a universal deep-copy operation.

| Distinction | Meaning |
|---|---|
| Parse | Text → a JavaScript value. |
| Stringify | A JavaScript value → JSON text. |
| JSON object | Uses quoted keys and JSON-compatible values. |

**College sources:** [Unit 1_MongoDB.pdf](<../WT/Unit 1_MongoDB.pdf>).

**Official references:** [MDN: JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

## 5. Callbacks: who calls the function?

**Main idea:** Passing a function does not tell you when it will run.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A callback is a function passed to another operation so that operation can call it. It can run immediately or later.

forEach calls its callback during array iteration. A timer callback runs later after the current work and the relevant scheduling conditions.

Pass the function when the operation needs a callback. Calling it while passing the argument gives the operation its result instead.

### Worked example

```text
function show(x) { console.log(x); }
[2, 4].forEach(show);
console.log("done");
```

**Result and interpretation:** 2
4
done

### Follow the steps

1. **Pass the function:** forEach receives show. No show call occurs in the argument expression.
2. **First callback:** show(2) prints 2. forEach supplies the first array value.
3. **Second callback:** show(4) prints 4. The next present element is processed.
4. **Continue:** Print done. The synchronous iteration has finished.

**Why this works:** forEach invokes show once for each present element in this array. Those calls complete before execution reaches the final statement.

**MCQ trap:** A callback is not automatically asynchronous. Also, forEach does not wait for promises returned by an async callback.

| Distinction | Meaning |
|---|---|
| show | The function value; another operation can call it. |
| show(2) | A call now; the expression produces its return value. |
| Synchronous callback | Runs as part of the current operation. |
| Asynchronous callback | Runs after the operation schedules later work. |

**College sources:** [UNIT III.pdf](<../WT/UNIT III.pdf>); [ex2.js](<../WT/examples/callback_functions/ex2.js>).

## 6. Promises and execution order

**Main idea:** Separate synchronous work from later reactions.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

A Promise represents an eventual result. It starts pending and can settle as fulfilled or rejected. Settlement cannot be reversed.

The executor passed to new Promise runs synchronously. A .then reaction runs asynchronously after the current synchronous work completes.

A fulfilled Promise can carry a value. A rejected Promise carries a reason. Attach a rejection handler when a failure can occur.

### Worked example

```text
console.log("A");
Promise.resolve("B").then(x => console.log(x));
console.log("C");
```

**Result and interpretation:** A
C
B

### Follow the steps

1. **Print A:** Output = A. Run the first synchronous statement.
2. **Register a reaction:** The reaction for B is queued. The Promise is already fulfilled, but its reaction is not run inline.
3. **Print C:** Output = A, C. Complete the synchronous statements.
4. **Run the reaction:** Output = A, C, B. Process the queued reaction after the current work.

**Why this works:** Registering a reaction does not run it inline. The current statements finish first, then the queued Promise reaction can execute.

**MCQ trap:** A pending Promise is not a background thread. The platform or operation determines how the underlying work is performed.

| Distinction | Meaning |
|---|---|
| Pending | No final result yet. |
| Fulfilled | The Promise has a successful result. |
| Rejected | The Promise has a failure reason. |
| Settled | Either fulfilled or rejected. |

**College sources:** [UNIT III.pdf](<../WT/UNIT III.pdf>).

**Official references:** [MDN: promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

## 7. Promise chains, catch and all

**Main idea:** Return the next result so the chain can follow it.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

then returns a new Promise. A handler’s returned value fulfills that next Promise. A returned Promise makes the chain follow its eventual result.

A thrown error rejects the next Promise. catch can handle a rejection; a normal return from catch can recover the chain.

Promise.all fulfills with results in input order when every input fulfills. It rejects when an input rejects, but does not automatically cancel the other work.

### Worked example

```text
Promise.resolve(3)
  .then(x => x * 2)
  .then(x => { throw new Error("stop"); })
  .catch(() => 9)
  .then(x => console.log(x));
```

**Result and interpretation:** 9. The catch handler recovers by returning 9.

### Follow the steps

1. **Fulfill:** The initial value is 3. The first reaction receives 3.
2. **Transform:** The next value is 6. The handler returns x * 2.
3. **Reject:** The handler throws stop. The rejection travels to catch.
4. **Recover:** catch returns 9; the final handler prints 9. A normal return creates a fulfilled continuation.

**Why this works:** Each step passes a result or failure to the next Promise. Returning a value from catch switches this path back to fulfillment.

**MCQ trap:** If a handler starts a Promise but does not return it, the outer chain cannot wait for that operation through the returned value.

| Distinction | Meaning |
|---|---|
| Return a value | The next Promise fulfills with that value. |
| Return a Promise | The next Promise follows its outcome. |
| Throw | The next Promise rejects. |
| catch returns normally | The following step can receive a recovered value. |

**College sources:** [UNIT III.pdf](<../WT/UNIT III.pdf>).

**Official references:** [MDN: promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

## 8. Async/await without hidden magic

**Main idea:** Pause one async function while other work continues.

**ai explnation due to lack of material**

**Material basis:** The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.

An async function returns a Promise. A returned ordinary value becomes the Promise’s fulfillment value.

await suspends that async function until its awaited value is available. It does not block the entire JavaScript environment.

If the awaited Promise rejects, await throws inside the async function. Use try/catch to handle the rejection at that point.

### Worked example

```text
async function task() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
task();
console.log("C");
```

**Result and interpretation:** A
C
B

### Follow the steps

1. **Enter task:** Print A. Calling task begins executing its body.
2. **Reach await:** Suspend task. Arrange a later continuation.
3. **Continue caller:** Print C. The caller is not blocked by the suspended function.
4. **Resume task:** Print B. The awaited fulfilled value is now available to the continuation.

**Why this works:** The function runs synchronously until await. The caller continues, then the function resumes in a later Promise-related continuation.

**MCQ trap:** Awaiting operations one after another can serialize them. When independent operations can overlap, start both before awaiting their combined results.

| Distinction | Meaning |
|---|---|
| async return | Always supplies a Promise to the caller. |
| await | Pauses the current async function. |
| try/catch | Can handle a rejection thrown by await. |

**College sources:** [UNIT III.pdf](<../WT/UNIT III.pdf>).

**Official references:** [MDN: async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

## 9. Array methods: transform, select, combine

**Main idea:** Choose the method by the shape of the result.

**ai explnation due to lack of material**

**Material basis:** A focused explanation of this topic was not identified in the selected college material. This section is a supplement.

map creates an array from callback results. filter creates an array containing values that pass a test. reduce combines values into one result.

forEach performs callback calls and returns undefined. It is useful for side effects, not for collecting a returned result array.

slice returns a shallow selection. splice changes the array. sort changes the array and compares strings by default unless given a comparator.

### Worked example

```text
const values = [1, 2, 3];
const result = values.map(x => x * 2).filter(x => x > 2);
console.log(result);
```

**Result and interpretation:** [4, 6]. map creates [2, 4, 6]; filter keeps values greater than 2.

### Follow the steps

1. **Input:** values = [1, 2, 3]. Start from a fixed dense array.
2. **Map:** Mapped values = [2, 4, 6]. Multiply each value by 2.
3. **Filter:** Keep 4 and 6. Only these values satisfy x > 2.
4. **Result:** result = [4, 6]; values remains [1, 2, 3]. These callbacks do not mutate the input.

**Why this works:** The methods have different contracts. Choose transformation for map, selection for filter, and accumulated state for reduce.

**MCQ trap:** A shallow array copy still shares nested objects. For numeric ascending order, use a comparator such as (a, b) => a - b.

| Distinction | Meaning |
|---|---|
| map | One callback result for each visited element. |
| filter | Keep an element when the predicate is truthy. |
| reduce | Carry an accumulator through the visited elements. |
| forEach | Perform effects; no result array is returned. |

**Official references:** [MDN: indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections).

## 10. Sets and Maps

**Main idea:** Decide whether you need unique values or keyed values.

**ai explnation due to lack of material**

**Material basis:** A focused explanation of this topic was not identified in the selected college material. This section is a supplement.

A Set stores unique values. A Map stores key/value pairs. Both preserve insertion order during iteration.

Use Set when you need membership or duplicate removal. Use Map when a value must be found using a key.

Map keys can be objects. Two different objects remain different keys even when their properties are equal. Adding an existing primitive key replaces its value.

### Worked example

```text
const seen = new Set(["SE", "WT", "SE"]);
const marks = new Map();
marks.set("SE", 8);
marks.set("SE", 9);
console.log(seen.size, marks.size, marks.get("SE"));
```

**Result and interpretation:** 2 1 9

### Follow the steps

1. **Create Set:** seen contains SE and WT. The repeated SE value is not a new unique value.
2. **Insert Map key:** SE → 8. Create one key/value association.
3. **Update Map key:** SE → 9. The existing key receives a replacement value.
4. **Read sizes:** seen.size = 2; marks.size = 1. The two collections count different kinds of entries.

**Why this works:** The duplicate Set value adds no new entry. The second Map write updates the value associated with the existing key.

**MCQ trap:** Use .size for Set and Map, rather than array .length. Objects use identity as keys; property similarity does not merge them.

| Distinction | Meaning |
|---|---|
| Set.add(value) | Store a unique value. |
| Set.has(value) | Check membership. |
| Map.set(key, value) | Insert or replace an associated value. |
| Map.get(key) | Read the associated value, or undefined when absent. |

**Official references:** [MDN: Sets and Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections).

## 11. DOM: selecting and changing a page

**Main idea:** Treat the document as nodes rather than a string.

**ai explnation due to lack of material**

**Material basis:** The selected college material provides only part of this topic. The explanation fills the identified gaps.

The DOM represents a document as a tree of nodes. JavaScript can select nodes, read properties, and change the displayed page.

querySelector returns the first matching element or null. querySelectorAll returns a static NodeList of matching elements.

textContent assigns text. innerHTML parses markup. Use textContent when you intend to display ordinary text, especially input from a user.

### Worked example

```text
<p id="status">Waiting</p>

const node = document.querySelector("#status");
if (node) node.textContent = "Ready";
```

**Result and interpretation:** The paragraph displays Ready. The original HTML file on disk is not rewritten.

### Follow the steps

1. **Document tree:** A paragraph node contains Waiting. The browser has parsed the HTML.
2. **Select:** Find the node with id status. The selector #status identifies an id.
3. **Check existence:** The selected node is not null. Guard against a missing element.
4. **Update text:** The paragraph now contains Ready. The live document changes.

**Why this works:** The selected element is a live node in the current document. Changing its text updates what the browser displays.

**MCQ trap:** Check for null when an element might not exist. A browser provides document; an ordinary Node.js script does not provide a browser DOM.

| Distinction | Meaning |
|---|---|
| querySelector | First match, or null. |
| querySelectorAll | A static list of matches. |
| textContent | Write text without interpreting it as HTML. |
| createElement and append | Create a node and attach it to the document. |

**College sources:** [index7.html](<../WT/examples/promises/index7.html>).

**Official references:** [MDN: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

## 12. DOM events and propagation

**Main idea:** Register a handler, then follow the event path.

**ai explnation due to lack of material**

**Material basis:** A focused explanation of this topic was not identified in the selected college material. This section is a supplement.

addEventListener registers a function for an event. The browser calls the function when that event is dispatched to the relevant target.

For events that bubble, the event can travel from a target to its ancestors. event.target identifies the original target. currentTarget identifies the current listener’s node.

preventDefault cancels a cancelable default action. stopPropagation stops further propagation; it does not automatically cancel the default action.

### Worked example

```text
<button id="count">Add</button>
let count = 0;
const button = document.querySelector("#count");
button.addEventListener("click", () => {
  count += 1;
  button.textContent = String(count);
});
```

**Result and interpretation:** After two dispatched clicks, the button displays 2.

### Follow the steps

1. **Register:** The click listener is stored. Registration does not invoke the handler.
2. **First click:** count becomes 1. The browser dispatches the event and calls the handler.
3. **Second click:** count becomes 2. The same captured binding is updated.
4. **Display:** The button text is 2. textContent writes the current count.

**Why this works:** The handler closes over the count binding. Each click updates the same binding, so the value persists across calls.

**MCQ trap:** Pass the handler function rather than calling it during registration. Not every DOM event bubbles; inspect the event type when tracing propagation.

| Distinction | Meaning |
|---|---|
| target | The node at which the event originated. |
| currentTarget | The node whose listener is currently running. |
| preventDefault | Cancel a cancelable default action. |
| stopPropagation | Stop the event from continuing along its propagation path. |

**Official references:** [MDN: event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## Additional basics: conditions and loops

**ai explnation due to lack of material** — additional JavaScript fundamentals for the broad “JavaScript Basics” topic.

An `if` condition converts its value to a Boolean. Values such as `false`, `0`, `""`, `null`, `undefined`, and `NaN` are falsy. Empty arrays and empty objects are truthy. A string containing `"false"` is also truthy.

`for...of` reads iterable values, such as array elements. `for...in` enumerates enumerable property keys; it can include inherited keys. Use `for...of` when you want the values in an array.

```javascript
const a = [3, 5];
let total = 0;
for (const value of a) total += value;
console.log(total); // 8
console.log(Boolean([])); // true
console.log(0 || 10); // 10
console.log(0 ?? 10); // 0
```

`||` uses the right operand when the left operand is falsy. `??` uses it only when the left operand is `null` or `undefined`. Both short-circuit. This difference matters when zero is a valid value.

A `while` loop checks its condition before each iteration. A `do...while` loop checks it after the body, so the body runs at least once. `break` exits the loop. `continue` skips the remaining body of the current iteration.

For an output question, write down the value before the condition, after the body, and after the update. Do not count a failed final condition as another execution of the body.

References: [MDN: loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration), [MDN: nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).

## Self-check: one question per topic

**ai explnation due to lack of material** — original revision questions, not past-paper questions. Try them before opening the answer. The full website provides four questions per topic.

### 1. JavaScript variables and scope

What does this print?
const a = [1]; a.push(2); console.log(a.length);

- **A.** 1
- **B.** A required TypeError from push
- **C.** undefined
- **D.** 2

<details>
<summary>Answer and explanation</summary>

**D. 2**

const prevents reassignment of a. push changes the existing array, which is allowed. The array has two elements afterward. A declaration constraint on a binding does not freeze the object’s contents.

</details>

### 2. Types, coercion and equality

What are the results of "6" + 2 and "6" - 2?

- **A.** 8 and 4
- **B.** "62" and "4"
- **C.** 8 and "62"
- **D.** "62" and 4

<details>
<summary>Answer and explanation</summary>

**D. "62" and 4**

The + operation joins text because one operand is a string. Subtraction converts the numeric string to a number. Read each operator’s conversion behavior rather than assuming every operation uses the same rule.

</details>

### 3. Functions, returns and shared objects

What does this print?
const twice = x => { x * 2; };
console.log(twice(3));

- **A.** 6
- **B.** 3
- **C.** A mandatory SyntaxError
- **D.** undefined

<details>
<summary>Answer and explanation</summary>

**D. undefined**

The arrow function has a block body and no return statement. Evaluating x * 2 does not automatically return it. An expression body, x => x * 2, would return 6 for this input.

</details>

### 4. JSON: text to data and back

Which string contains valid JSON?

- **A.** {name:"Asha"}
- **B.** {"name":"Asha",}
- **C.** {"value":undefined}
- **D.** {"name":"Asha","active":true}

<details>
<summary>Answer and explanation</summary>

**D. {"name":"Asha","active":true}**

JSON object keys use double quotes. JSON permits booleans but does not permit an undefined value or a trailing comma. The valid string can be parsed into an object.

</details>

### 5. Callbacks: who calls the function?

Is every callback asynchronous?

- **A.** Yes, a callback always creates a thread
- **B.** Yes, forEach always waits one second
- **C.** No callback can ever run later
- **D.** No; a callback can run synchronously or later

<details>
<summary>Answer and explanation</summary>

**D. No; a callback can run synchronously or later**

Callback describes a passed function’s role. It does not specify timing. forEach calls its callback synchronously for this ordinary iteration, while a timer schedules a callback for later execution.

</details>

### 6. Promises and execution order

What is the output order?
console.log("A"); Promise.resolve().then(()=>console.log("B")); console.log("C");

- **A.** A, B, C
- **B.** B, A, C
- **C.** C, B, A
- **D.** A, C, B

<details>
<summary>Answer and explanation</summary>

**D. A, C, B**

The two direct log statements run synchronously. The Promise reaction is queued and runs after the current synchronous work. A Promise that is already fulfilled still schedules its then reaction rather than running it inline.

</details>

### 7. Promise chains, catch and all

What reaches the final handler?
Promise.resolve(3).then(x => x * 2).then(x => console.log(x));

- **A.** 3
- **B.** undefined
- **C.** A required rejection
- **D.** 6

<details>
<summary>Answer and explanation</summary>

**D. 6**

The first handler returns 6. then creates a next Promise that fulfills with that return value, so the final handler receives 6. Omitting the return in a block-bodied handler would change the result.

</details>

### 8. Async/await without hidden magic

What does an async function return to its caller?

- **A.** Only an ordinary number
- **B.** A callback without a result
- **C.** Always undefined
- **D.** A Promise

<details>
<summary>Answer and explanation</summary>

**D. A Promise**

An async function wraps its result in a Promise. An ordinary returned value fulfills it, while an unhandled thrown error rejects it. The caller must handle the Promise contract.

</details>

### 9. Array methods: transform, select, combine

What is [1,2,3].map(x=>x*2).filter(x=>x>2)?

- **A.** [2,4,6]
- **B.** [2,3]
- **C.** 6
- **D.** [4,6]

<details>
<summary>Answer and explanation</summary>

**D. [4,6]**

map first produces [2,4,6]. filter then retains values greater than 2, leaving [4,6]. Neither method here combines the elements into a single number.

</details>

### 10. Sets and Maps

What is new Set([2,2,3]).size?

- **A.** 3
- **B.** 1
- **C.** undefined
- **D.** 2

<details>
<summary>Answer and explanation</summary>

**D. 2**

The Set stores unique values. The repeated number 2 does not create another entry, so the entries are 2 and 3. Set uses size for the entry count.

</details>

### 11. DOM: selecting and changing a page

What does querySelector return when there is no matching element?

- **A.** An empty array
- **B.** A new element
- **C.** undefined in every case
- **D.** null

<details>
<summary>Answer and explanation</summary>

**D. null**

querySelector returns the first matching element or null. Check that result before writing properties when a match is not guaranteed. querySelectorAll has a different contract: a NodeList of all matches.

</details>

### 12. DOM events and propagation

Which registers a callback correctly?

- **A.** button.addEventListener("click", handle())
- **B.** button.addEventListener("click", null())
- **C.** button.addEventListener(handle(), "click")
- **D.** button.addEventListener("click", handle)

<details>
<summary>Answer and explanation</summary>

**D. button.addEventListener("click", handle)**

Pass the function value handle. Calling handle() during registration passes its result instead, unless that result is intentionally a handler. The event type belongs in the first argument.

</details>

## Source reading targets

- [Unit 1_MongoDB.pdf](<../WT/Unit 1_MongoDB.pdf>) — Introductory JSON; viewer page 8. Other MongoDB chapters are outside this site.
- [UNIT III.pdf](<../WT/UNIT III.pdf>) — Callbacks, promises and async/await; viewer pages 15–29.
- [ex2.js](<../WT/examples/callback_functions/ex2.js>) — Original class example; examples can have random outcomes. Teaching traces use fixed inputs.
- [index7.html](<../WT/examples/promises/index7.html>) — Original class example; examples can have random outcomes. Teaching traces use fixed inputs.

College files can include material outside the announced topics. Read the selected sections. The examples above use fixed inputs for explanation; some original class examples use random outcomes.
