# Web Technologies: complete FS study guide

**Study this file directly. No earlier JavaScript or college-note reading is required.** It teaches JavaScript basics, JSON, callbacks, Promises, async/await, arrays, Sets, Maps, and the DOM. Examples in this subject use **JavaScript**. Read sections in order, calculate the outputs, and then attempt the included MCQs.

Test: **9 October 2026**. [Other subject guides](../FS_SUBJECT_NOTES.md).

**ai explnation due to lack of material** — this is AI-authored teaching. College examples cover callbacks, Promises, and async/await; JSON and DOM coverage is partial. The basic-language and collection explanations fill identified gaps.

## 1. Begin with values, variables, and objects

JavaScript runs instructions such as calculations, function calls, and page updates. A **value** is data, such as `5`, `"FS"`, or `true`. A **variable binding** connects a name to a value.

```javascript
let marks = 8;
marks = 9;
console.log(marks); // 9
```

`console.log` displays a value. A semicolon ends a statement here. `//` starts a comment. Strings can use single or double quotes. JavaScript is case-sensitive: `marks` and `Marks` are different names.

### let, const, and var

| Declaration | Scope and reassignment |
|---|---|
| `let` | Block scope; can be reassigned. |
| `const` | Block scope; cannot be reassigned. |
| `var` | Function scope, or a global binding when used at the top level of a classic script; does not create a separate binding for an ordinary block. |

A **block** is a group of statements inside `{}`. **Scope** is where a name can be used.

```javascript
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
// console.log(b); would throw ReferenceError: b is outside its scope.
```

`var` declarations are processed before their statements execute. The binding initially holds `undefined`; the assignment still happens at its written position.

```javascript
console.log(x); // undefined
var x = 5;
```

`let` and `const` cannot be accessed before initialization in their scope. That interval is the **temporal dead zone**. Such access throws `ReferenceError`; it does not print `undefined`.

### Types

The primitive types are number, string, boolean, undefined, null, bigint, and symbol. **Primitive** means the value is not an ordinary mutable object. Objects include arrays, functions, and objects with named properties.

- `undefined`: a value has not been supplied, for example a missing return value.
- `null`: an explicit “no value” choice.
- `NaN`: a number value representing an invalid numerical result.

```javascript
console.log(typeof 5);         // number
console.log(typeof "5");       // string
console.log(typeof undefined); // undefined
console.log(typeof null);      // object: a historical language behavior
console.log(typeof []);        // object
console.log(typeof (() => 1)); // function
```

A **property** is named data inside an object:

```javascript
const student = {name: "Asha", marks: 8};
student.marks = 9;
console.log(student.marks); // 9
```

`const` keeps the binding attached to that object. It does not freeze properties. Reassigning `student` to a different object would fail.

## 2. Operators, conversion, and conditions

**Coercion** means an operation converts a value to another type. Read the operator before predicting conversion.

```javascript
console.log("5" + 2);     // 52: string concatenation
console.log("5" - 2);     // 3: numerical conversion
console.log(5 / 2);       // 2.5: ordinary number division
console.log("5" == 5);    // true: equality permits coercion
console.log("5" === 5);   // false: strict equality keeps the type distinction
console.log(NaN === NaN); // false
```

`=` assigns. `==` compares with coercion rules. `===` compares without that equality coercion. `!==` is strict inequality.

### Objects compare by identity

```javascript
const a = {n: 1};
const b = {n: 1};
const c = a;
console.log(a === b); // false: separate objects
console.log(a === c); // true: the same object
```

Matching properties do not make two object references identical. An array is also an object: `[] === []` is false.

### Truthy and falsy

An `if` condition converts its value to a Boolean. Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Ordinary empty arrays and empty objects are truthy. So are the strings `"0"` and `"false"`.

```javascript
console.log(Boolean([]));      // true
console.log(Boolean("false")); // true
console.log(0 || 10);          // 10
console.log(0 ?? 10);          // 0
```

`||` uses the right operand if the left is falsy. `??` uses it only if the left is null or undefined. Thus `??` preserves zero when zero is valid data. `&&` stops when its left operand is falsy. These operators can return operand values, not only Booleans.

**Example:** `false && doWork()` does not call `doWork`. The left value already determines the outcome.

## 3. Conditions, loops, and functions

```javascript
let total = 0;
for (let i = 0; i < 3; i++) {
  total += i;
}
console.log(total); // 3
```

Trace: add 0, then 1, then 2. The failed condition at `i = 3` does not run the body.

| Form | Behavior |
|---|---|
| `if / else` | Select a branch based on a condition. |
| `while` | Check before each iteration; the body can run zero times. |
| `do...while` | Check after the body; it runs at least once. |
| `for...of` | Read iterable values, such as array elements. |
| `for...in` | Enumerate enumerable property keys, potentially including inherited keys. |
| `break / continue` | Exit the loop / skip the rest of the current iteration. |

Use `for...of` when you want array values. `for...in` supplies keys rather than the values themselves.

A **function** groups work so it can be called. A **parameter** is a name inside its definition. An **argument** is the value supplied by a call. `return` supplies the call's result.

```javascript
function double(n) { return n * 2; }
const triple = n => n * 3;
const missing = n => { n * 2; };
console.log(double(4)); // 8
console.log(triple(4)); // 12
console.log(missing(4)); // undefined
```

An arrow expression body returns its expression. An arrow block body needs an explicit `return` to supply a value. A normal call that reaches the end without returning a value produces `undefined`.

### Shared objects and closures

```javascript
const item = {count: 1};
function change(x) {
  x.count = 2;
  x = {count: 9};
}
change(item);
console.log(item.count); // 2
```

The parameter receives the argument value, which here is an object reference. Initially `item` and `x` reach the same object. A property write changes that shared object. Reassigning `x` changes only the local binding.

A **closure** is a function that can continue using bindings from its surrounding scope:

```javascript
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
console.log(next()); // 1
console.log(next()); // 2
```

Both calls use the same captured `count`. It is not recreated for each call to `next`.

Arrow functions also obtain `this` from their surrounding scope. Ordinary function `this` depends on how the function is called. Do not assume an arrow is identical to a normal method in every context.

## 4. JSON: distinguish text from usable data

**JSON**, JavaScript Object Notation, is a text format for exchanging data. It supports objects, arrays, strings, numbers, booleans, and null.

Valid JSON:

```json
{"name":"Asha","marks":[8,9],"passed":true,"comment":null}
```

Rules: keys and strings use double quotes; comments, functions, undefined, single-quoted strings, and trailing commas are not valid JSON syntax. A JavaScript object literal has broader syntax and is not itself JSON text.

```javascript
const text = '{"marks":[8,9]}';
const data = JSON.parse(text);
console.log(data.marks[1]); // 9
console.log(JSON.stringify(data)); // {"marks":[8,9]}
```

`parse` converts valid text into a JavaScript value. `stringify` produces JSON text. Invalid JSON passed to `parse` throws `SyntaxError`.

**Serialization** means producing a transferable representation. It has limits:

```javascript
JSON.stringify({a: undefined, b: 2}); // '{"b":2}'
JSON.stringify([undefined, 2]);       // '[null,2]'
```

An undefined object property is omitted; an undefined array entry becomes null. Circular references normally cause `stringify` to throw. Therefore JSON serialization is not a universal copy method that preserves every JavaScript feature.

## 5. Callbacks: passing a function for someone else to call

A **callback** is a function supplied to another operation so that operation can call it.

```javascript
function show(n) { console.log(n); }
[2, 4].forEach(show);
console.log("done");
// 2, then 4, then done, on separate lines.
```

`forEach` calls `show` during iteration. This is a **synchronous callback**: those calls complete before the next statement.

```javascript
setTimeout(() => console.log("later"), 0);
console.log("now");
// now, then later
```

The timer schedules a callback for later. A zero delay does not mean interrupting the current statements immediately.

**Passing versus calling:** `show` is the function value. `show(2)` calls it now and supplies its return value. If an API expects a callback, pass the function, for example `() => show(2)`.

Multiple nested asynchronous callbacks can make sequencing and error handling hard to follow. Promises describe the eventual result in a form that can be chained.

## 6. Promises: states and execution order

A **Promise** represents an eventual result. Its states are **pending**, **fulfilled** with a successful result, and **rejected** with a failure reason. Fulfilled and rejected are both **settled** states. Settlement is not reversed.

```javascript
const p = new Promise((resolve, reject) => {
  resolve(5);
});
p.then(value => console.log(value)); // eventually prints 5
```

The function passed to `new Promise` is its **executor**. It runs synchronously. `resolve` supplies an outcome; it can also adopt another Promise's result. `reject` supplies a failure. A `.then` handler runs later, including when its Promise is already fulfilled.

### Trace synchronous work, Promise jobs, then a timer

```javascript
console.log("A");
new Promise(resolve => {
  console.log("B");
  resolve("C");
}).then(value => console.log(value));
setTimeout(() => console.log("T"), 0);
console.log("D");
// A, B, D, C, T — each on a separate line
```

1. Print A.
2. Run the executor immediately; print B and fulfill the Promise with C.
3. Register the reaction and schedule the timer.
4. Finish current synchronous work; print D.
5. Run the queued Promise reaction; print C.
6. Run the timer callback; print T.

Promise reactions use the **microtask** queue. In this ordinary example, the microtask checkpoint runs after current synchronous work and before the next timer task. A pending Promise is not itself a separate thread.

## 7. Promise chains and failures

`.then` returns a new Promise. The handler's outcome determines that next Promise:

| Handler action | Next Promise |
|---|---|
| Return a value | Fulfills with that value. |
| Return a Promise | Follows that Promise's eventual result. |
| Throw an error | Rejects with the error. |
| Return no value normally | Fulfills with undefined. |

```javascript
Promise.resolve(3)
  .then(x => x * 2)
  .then(x => { throw new Error("stop"); })
  .catch(() => 9)
  .then(x => console.log(x)); // 9
```

Trace: 3 becomes 6; the next handler throws; `catch` handles the rejection and returns 9; the final handler receives 9. A normal return from `catch` recovers the chain. Throwing from it would keep the path rejected.

**Missing-return trap:** if a handler starts an asynchronous operation but does not return its Promise, the outer chain does not wait for it through that handler's return value.

| Combining method | Outcome |
|---|---|
| `Promise.all` | Fulfills when all fulfill, with values in input order; rejects if an input rejects. |
| `Promise.allSettled` | Waits for all outcomes, including rejections. |
| `Promise.race` | Follows the first input to settle. |

`Promise.all` does not automatically cancel other operations after a rejection. Input order of successful results is different from completion order.

`.finally` runs cleanup after settlement. A normal return usually preserves the prior outcome; throwing or returning a rejecting Promise can replace it with a rejection.

## 8. async and await

An **async function always returns a Promise**. Returning `5` from it creates a Promise that fulfills with 5.

```javascript
async function task() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
  return 5;
}
const result = task();
console.log("C");
// A, C, B
// result is a Promise, not the number 5.
```

The call starts executing immediately. `await` suspends this function and arranges a later continuation. The caller continues and prints C. The function later resumes and prints B. Even awaiting an already fulfilled Promise resumes asynchronously.

```javascript
async function read() {
  try {
    await Promise.reject(new Error("bad"));
  } catch (error) {
    return "recovered";
  }
}
read().then(console.log); // recovered
```

A rejected awaited Promise throws inside the async function. `try/catch` can handle it there. If it remains unhandled, the async function's returned Promise rejects.

For independent operations, start both before waiting for the combined result:

```javascript
// getA and getB are assumed to be functions returning Promises.
const aPromise = getA();
const bPromise = getB();
const [a, b] = await Promise.all([aPromise, bPromise]);
```

This fragment belongs inside an async function or a suitable module. Sequential `await getA(); await getB();` starts B only after A completes. Do not overlap work that depends on the earlier result.

**forEach trap:** `forEach(async x => ...)` does not wait for the returned Promises. Use an awaited `for...of` loop for deliberate sequential work, or `Promise.all(values.map(...))` for independent work.

## 9. Arrays: choose the result you need

An array is an ordered collection. Indices start at zero. `[8,9]` has length 2, and its last index is 1.

| Method | Result | Changes the original array? |
|---|---|---|
| `push(x)` | New length | Yes: adds at the end. |
| `pop()` | Removed last value, or undefined if empty | Yes. |
| `map(fn)` | Array of callback results | Not by the method itself. |
| `filter(fn)` | Array of selected original elements | Not by the method itself. |
| `reduce(fn, initial)` | Accumulated result | Depends on callback actions. |
| `forEach(fn)` | undefined | Callback can cause effects. |
| `slice(start,end)` | Shallow selection; end excluded | No. |
| `splice(start,count,...)` | Array of removed elements | Yes: removes/inserts. |
| `sort(compare)` | The sorted original array | Yes. |
| `find(fn)` | First matching value, or undefined | Not by the method itself. |
| `includes(x)` | Boolean membership result | No. |

Callbacks can mutate shared data even when `map` or `filter` creates a new outer array.

```javascript
const a = [1, 2, 3];
const b = a.map(x => x * 2).filter(x => x > 2);
const sum = b.reduce((total, x) => total + x, 0);
console.log(b);   // [4, 6]
console.log(sum); // 10
console.log(a);   // [1, 2, 3]
```

Map produces `[2,4,6]`; filter keeps 4 and 6; reduce starts at 0, then accumulates 4, then 10. Supplying an initial accumulator makes an empty-array sum well-defined. Reducing an empty array without an initial value throws `TypeError`.

```javascript
const a = [10, 2, 30];
a.sort();                // [10, 2, 30]: default string comparison
a.sort((x, y) => x - y);  // [2, 10, 30]: numeric ascending comparison
```

The comparator's sign determines ordering; the numeric difference need not be exactly −1 or 1.

**Shallow-copy example:** `[...a]` creates a new outer array. If a contains an object, both arrays still reach that object. Changing its property affects both views.

## 10. Sets and Maps

A **Set** stores distinct values. A **Map** associates each key with a value. Both iterate in insertion order.

```javascript
const seen = new Set(["SE", "WT", "SE"]);
console.log(seen.size);      // 2
console.log(seen.has("WT")); // true
seen.add("CN");
seen.delete("SE");
```

Adding an existing primitive value does not create another entry. Separate object literals remain separate values. For collection key equality, repeated NaN is treated as the same value, even though `NaN === NaN` is false.

```javascript
const marks = new Map();
marks.set("SE", 8);
marks.set("SE", 9);
console.log(marks.size);      // 1
console.log(marks.get("SE")); // 9
console.log(marks.has("AI")); // false
```

A second write to an existing key replaces its value. `get` on an absent key returns undefined. Use `has` when you need to distinguish an absent key from a key explicitly mapped to undefined.

Map keys can be objects. Two separately created `{id:1}` objects are different keys. Use `.size` for Set and Map; arrays use `.length`.

## 11. DOM: change the live page

**DOM**, Document Object Model, represents a document as a tree of nodes. An element such as a paragraph is a node; it can contain text or other nodes. JavaScript uses `document` to find and change the live browser document.

**HTML** describes page elements using tags. `<p>Waiting</p>` is a paragraph containing text; `<button>Add</button>` is a button. An attribute such as `id="status"` names an element for selection. A `<script>` element contains or loads JavaScript.

| Operation | Meaning |
|---|---|
| `document.querySelector("#status")` | First element with the id status, or null. |
| `document.querySelectorAll(".item")` | Static NodeList of elements with class item. |
| `document.getElementById("status")` | Element with that id, or null. |
| `node.textContent = text` | Replace content with literal text. |
| `node.innerHTML = markup` | Parse markup as HTML. |
| `document.createElement("li")` | Create an element; it is not yet attached to the document. |
| `parent.append(child)` | Attach a child. |
| `node.classList.add("active")` | Add a CSS class. |
| `node.remove()` | Remove that node from its parent. |

`#` indicates an id selector; `.` indicates a class selector. An id should identify one element; a class can be shared.

```html
<p id="status">Waiting</p>
<script>
  const p = document.querySelector("#status");
  if (p) p.textContent = "Ready";
</script>
```

The script appears after the paragraph, so the element exists when selected. The displayed text becomes Ready. The original HTML file on disk is not rewritten.

A script placed before its elements can get null. Use suitable loading order, a deferred external script, or a `DOMContentLoaded` listener. A missing selection is null; reading a property from it throws an error.

**Text versus markup:** setting `textContent` to `"<b>FS</b>"` displays the literal characters. Setting `innerHTML` to that string creates a bold element. Use the operation matching the intended data.

A NodeList is not automatically an Array with every Array method. `Array.from(list)` can create an array. `querySelectorAll` is static: it does not automatically collect later-added matches. Some other DOM collections are live.

An ordinary Node.js program does not automatically provide a browser's `document`.

## 12. Events: register now, run on interaction

An **event** describes an occurrence such as a click. An **event listener** is a function registered to run when the event is dispatched.

```html
<button id="count">Add</button>
<script>
  let count = 0;
  const button = document.querySelector("#count");
  button.addEventListener("click", () => {
    count += 1;
    button.textContent = String(count);
  });
</script>
```

Registering does not call the handler. First click: count becomes 1 and the button displays 1. Second click: the same captured binding becomes 2. This uses the closure idea from section 3.

For an event that **bubbles**, listeners can run on the target and then ancestors. If a span inside a button is clicked:

- `event.target` identifies the span where the event originated.
- `event.currentTarget` identifies the button while its listener runs.

`preventDefault()` cancels a cancelable default action, such as a link navigation. `stopPropagation()` stops further propagation along the event path. Stopping propagation does not automatically cancel a default action. Not every event bubbles.

**Registration trap:** pass `handler`, not `handler()`. The latter calls the function during registration and supplies its result.

## Final recall sheet

- let/const have block scope; var has function scope. const does not freeze objects.
- Read types and operators before predicting coercion. Object equality uses identity.
- Function with no returned value → undefined; async function → Promise.
- JSON parse: text to value. Stringify: value to text, with serialization limits.
- Callback can run synchronously or later.
- Promise executor runs now; then reactions run later.
- Return a Promise so its chain can follow the work. A catch can recover with a value.
- Await pauses one async function; the caller can continue.
- Map transforms, filter selects, reduce accumulates, forEach performs effects.
- Slice copies a selection; splice and sort mutate. Default sort compares strings.
- Set stores unique values; Map stores key/value associations; both use size.
- DOM is the live tree; selector can return null; textContent writes literal text.
- target is the event origin; currentTarget is the current listener's element.

## Included MCQ practice

Try the outputs on paper before opening the answer. For a mistake, return to the corresponding explanation in this file.

<!-- FS-MCQ-START -->

**ai explnation due to lack of material** — original study questions, not past-paper questions. There are 15 questions in this file.

### Question 1

What does this print?

```javascript
const a = [1]; a.push(2); console.log(a.length);
```

- **A.** 1
- **B.** A required TypeError from push
- **C.** undefined
- **D.** 2

<details>
<summary>Answer and explanation</summary>

**D. 2**

const prevents reassignment of a. push changes the existing array, which is allowed. The array has two elements afterward. A declaration constraint on a binding does not freeze the object’s contents.

</details>

### Question 2

Which expression is false?

- **A.** "5" === 5
- **B.** Boolean([])
- **C.** Boolean({})
- **D.** 5 === 5

<details>
<summary>Answer and explanation</summary>

**A. "5" === 5**

Strict equality does not coerce the string to a number, so the different types make this comparison false. Empty arrays and objects are truthy. Comparing the number 5 with itself is true.

</details>

### Question 3

A function changes its parameter from object A to a new object B. Does that assignment redirect the caller’s binding?

- **A.** The original object must be deleted
- **B.** No; it reassigns the local parameter binding
- **C.** Yes, every reference everywhere changes
- **D.** Yes, but only for const callers

<details>
<summary>Answer and explanation</summary>

**B. No; it reassigns the local parameter binding**

Reassigning the parameter changes the value held by that local binding. The caller’s binding can continue pointing to A. This differs from mutating A’s properties through the original reference.

</details>

### Question 4

Why is JSON stringify/parse not a universal deep-copy method?

- **A.** JSON supports all JavaScript values
- **B.** Parsing always returns the original reference
- **C.** Some values are omitted or changed, and circular references can cause failure
- **D.** It preserves every function and prototype exactly

<details>
<summary>Answer and explanation</summary>

**C. Some values are omitted or changed, and circular references can cause failure**

JSON represents a restricted data format. It does not preserve functions or object prototypes, and stringify can fail on a circular reference. It can copy suitable JSON-compatible data, but its limitations must match the input contract.

</details>

### Question 5

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

### Question 6

Which are the three basic Promise states?

- **A.** Pending, fulfilled, rejected
- **B.** Started, compiled, deployed
- **C.** Waiting, staged, committed
- **D.** Open, closed, forked

<details>
<summary>Answer and explanation</summary>

**A. Pending, fulfilled, rejected**

A Promise begins pending, then can settle as fulfilled or rejected. Settled refers to either final state. State changes do not restart the Promise after settlement.

</details>

### Question 7

Promise.all receives [slowA, fastB]. Both fulfill. Which order does its result array use?

- **A.** Only the last completed result
- **B.** Input order: A result, then B result
- **C.** Completion order: B, then A
- **D.** Random order

<details>
<summary>Answer and explanation</summary>

**B. Input order: A result, then B result**

Promise.all preserves the input positions in its fulfillment array. Completion order does not reorder those results. It fulfills only after all the inputs fulfill.

</details>

### Question 8

Two independent operations should overlap. Which plan allows that?

- **A.** Block the browser with an infinite loop
- **B.** Replace both operations with forEach and assume it waits
- **C.** Start both operations, then await their combined Promises
- **D.** Await the first before starting the second

<details>
<summary>Answer and explanation</summary>

**C. Start both operations, then await their combined Promises**

Starting both operations before awaiting permits their underlying work to overlap when supported. Awaiting one before starting the next serializes those starts. Independence must be real; dependencies can require sequential work.

</details>

### Question 9

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

### Question 10

A Map receives set("a",1), then set("a",2). What are its size and value for a?

- **A.** Size 1; value 2
- **B.** Size 2; value 1
- **C.** Size 2; value [1,2]
- **D.** Size 0; value undefined

<details>
<summary>Answer and explanation</summary>

**A. Size 1; value 2**

The same primitive key identifies the existing association. The second set replaces its value without adding a second key. The Map therefore has one entry whose value is 2.

</details>

### Question 11

Is the NodeList from querySelectorAll automatically updated when later matching nodes are added?

- **A.** It updates the original HTML file on disk
- **B.** No; it is a static NodeList
- **C.** Yes; it is always live
- **D.** Only if the nodes are paragraphs

<details>
<summary>Answer and explanation</summary>

**B. No; it is a static NodeList**

querySelectorAll takes a static selection of matches. Later matching elements do not automatically join that list. Other DOM collection APIs can return live collections, so identify the particular API before tracing behavior.

</details>

### Question 12

A listener increments one captured count from 0 on each click. What is count after three clicks?

- **A.** 0
- **B.** A new independent value for each call
- **C.** 3
- **D.** 1

<details>
<summary>Answer and explanation</summary>

**C. 3**

The listener keeps access to the same captured binding. Each call adds one to its current value, giving 1, then 2, then 3. Registering the listener once does not reset the count for each event.

</details>

### Question 13

What does this print? console.log(0 || 10, 0 ?? 10);

- **A.** 10 0
- **B.** 0 10
- **C.** 10 10
- **D.** 0 0

<details>
<summary>Answer and explanation</summary>

**A. 10 0**

Zero is falsy, so || chooses 10. Zero is neither null nor undefined, so ?? keeps it. Use nullish fallback when a valid zero should survive. Both operations can return operand values rather than a Boolean.

</details>

### Question 14

A script logs A, registers a fulfilled Promise handler that logs P, schedules a zero-delay timer that logs T, and logs B. What is the order in this ordinary example?

- **A.** A, B, T, P
- **B.** A, B, P, T
- **C.** A, P, T, B
- **D.** P, A, B, T

<details>
<summary>Answer and explanation</summary>

**B. A, B, P, T**

Current synchronous work prints A and B. The fulfilled Promise reaction runs as a microtask after that work. The timer callback runs in a later task. A zero timer delay does not interrupt current statements.

</details>

### Question 15

What does JSON.stringify([undefined, 2]) produce?

- **A.** "[2]"
- **B.** A JavaScript Map
- **C.** "[null,2]"
- **D.** "[undefined,2]"

<details>
<summary>Answer and explanation</summary>

**C. "[null,2]"**

An undefined array entry becomes null in this serialization. In contrast, an undefined object property is omitted. The result is JSON text, not an Array or Map, so read the return type as well as the contents.

</details>

<!-- FS-MCQ-END -->

## Optional source references

These are evidence and extra references; they are not required earlier reading.

- [College WT Unit III](<UNIT III.pdf>): callbacks, Promises, async/await; viewer pages 15–29.
- [College JSON source](<Unit 1_MongoDB.pdf>): viewer page 8; the remaining MongoDB content is outside this guide.
- [MDN: grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types), [operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators), [loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration).
- [MDN: JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections), [Sets and Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections).
- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [Promise chains](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).
- [MDN: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
