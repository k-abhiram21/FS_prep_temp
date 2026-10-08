# WT: 180 hard JavaScript and DOM MCQs

**For the Pre-FS screening on 9 October 2026.** Prepared on 8 October. Scope: JavaScript Basics, JSON, Callbacks, Promises, Async/Await, Arrays, Sets & Maps, DOM. These are original study questions, not past-paper questions or predictions of the exam.

Learn from the [direct WT guide](FS_Revision_Notes.md), then use the [learning map](FS_WT_Learning_Map.md) to target deeper rules and sources. This bank extends the introductory guide/Atlas questions with close output alternatives, state changes, method-contract differences and error paths.

Choose **one best answer**. Each hidden answer explains its rule and every wrong option. Cover the code output, trace it, then identify the mistaken assumption behind each distractor. After a correct choice, also state the appropriate use case or repair: collecting results, avoiding mutation, preserving data, handling rejection or updating the intended nodes.

## Coverage

| Area | Questions | Focus |
|---|---|---|
| Basics/functions/strings | WT001-WT036 (36) | TDZ, scope, closures, defaults, this, coercion, short-circuiting and string-method boundaries |
| Arrays | WT037-WT078 (42) | Mutation/return values, callback contracts, short-circuiting, holes, shallow copies and copying alternatives |
| Sets and Maps | WT079-WT096 (18) | Equality, identity, insertion order, callback arguments and property-versus-entry operations |
| JSON | WT097-WT114 (18) | Grammar, omissions, null substitutions, cycles, round-trip losses, replacers and revivers |
| Callbacks/Promises/await | WT115-WT150 (36) | Execution order, result propagation, rejection scope, finally, combinators and wrong async predicates |
| DOM/events | WT151-WT180 (30) | Static/live collections, node identity, text/markup, properties/attributes, event phases and cancellation |

**Every question has executable code:** 150 language/async traces and 30 DOM traces. The latter include explicit HTML fixtures and require a real browser. Fifteen questions also require choosing a repair/use case, with independently executable fixes in the hidden answers. Six mixed sets cover each question exactly once. Correct positions are balanced across A/B/C/D.

**Supplements, after the core:** WT005, WT025, WT033, WT036, WT072, WT073, WT074, WT075, WT077, WT102, WT107, WT108, WT113, WT114, WT138, WT173. These include shallow freezing, grouped optional chaining, UTF-16 iteration, advanced defaults, newer copying/search methods, advanced JSON identity/serialization and passive listeners. They are useful breadth, not separately announced exam subtopics.

## Execution assumptions

- Each question is independent and starts fresh. JavaScript runs as **strict code in an ordinary classic script**, not a module or a Node CommonJS top-level wrapper. No globals or prototype modifications from another question exist.
- Only console.log output counts. Log arguments are converted to text and separated by one space. In choices, / separates lines; output itself does not contain those separators. For repair questions, a semicolon separates the current output from the proposed fix. JSON outputs and join calls avoid browser-console object-preview differences.
- Methods are available in the modern runtime used for validation: Node 26.10.0 and Chrome 154.0.8037.97. Newer copying methods are marked supplements; class emphasis should guide their priority.
- All displayed exceptions are caught in the snippet and logged by name. Timers here test sequencing, never an exact wall-clock delay. No process.nextTick, setImmediate, external I/O or real network race is assumed.
- For DOM questions, the displayed HTML is the complete initial body, with no additional body whitespace text nodes. Execute the JavaScript **after that body exists**, as a separate script. It is not part of the body fixture and cannot change child-count questions by adding a script child.
- Browser events are explicitly dispatched when shown. No automatic user clicks or default interactions are assumed. For rendered-text questions, the document is connected and the supplied CSS applies.

WT022 deliberately prints an empty-string operand, giving two consecutive spaces. Judge semantic values first; its exact text is shown in the hidden answer.

## Six mixed sets

Try one set in **30 minutes** with answers closed. This is a WT-only drill; the screening has 30 MCQs across all subjects. Allow more time while learning the longer traces. Review uncertain rules untimed, and reattempt with changed values rather than memorizing letters.

| Set | Basics | Arrays | Collections | JSON | Async | DOM | Attempt order |
|---|---:|---:|---:|---:|---:|---:|---|
| 1 | 6 | 7 | 3 | 3 | 6 | 5 | [WT028](#wt028), [WT174](#wt174), [WT143](#wt143), [WT080](#wt080), [WT015](#wt015), [WT031](#wt031), [WT038](#wt038), [WT058](#wt058), [WT099](#wt099), [WT049](#wt049), [WT052](#wt052), [WT104](#wt104), [WT129](#wt129), [WT056](#wt056), [WT103](#wt103), [WT019](#wt019), [WT126](#wt126), [WT169](#wt169), [WT146](#wt146), [WT152](#wt152), [WT006](#wt006), [WT156](#wt156), [WT001](#wt001), [WT165](#wt165), [WT120](#wt120), [WT086](#wt086), [WT064](#wt064), [WT090](#wt090), [WT045](#wt045), [WT133](#wt133) |
| 2 | 6 | 7 | 3 | 3 | 6 | 5 | [WT178](#wt178), [WT134](#wt134), [WT101](#wt101), [WT175](#wt175), [WT036](#wt036), [WT176](#wt176), [WT002](#wt002), [WT068](#wt068), [WT115](#wt115), [WT088](#wt088), [WT092](#wt092), [WT132](#wt132), [WT154](#wt154), [WT048](#wt048), [WT136](#wt136), [WT075](#wt075), [WT159](#wt159), [WT003](#wt003), [WT027](#wt027), [WT021](#wt021), [WT124](#wt124), [WT037](#wt037), [WT071](#wt071), [WT081](#wt081), [WT114](#wt114), [WT042](#wt042), [WT098](#wt098), [WT040](#wt040), [WT011](#wt011), [WT141](#wt141) |
| 3 | 6 | 7 | 3 | 3 | 6 | 5 | [WT172](#wt172), [WT085](#wt085), [WT127](#wt127), [WT065](#wt065), [WT084](#wt084), [WT167](#wt167), [WT112](#wt112), [WT030](#wt030), [WT113](#wt113), [WT017](#wt017), [WT012](#wt012), [WT014](#wt014), [WT177](#wt177), [WT041](#wt041), [WT062](#wt062), [WT122](#wt122), [WT150](#wt150), [WT179](#wt179), [WT082](#wt082), [WT008](#wt008), [WT148](#wt148), [WT149](#wt149), [WT131](#wt131), [WT151](#wt151), [WT024](#wt024), [WT043](#wt043), [WT076](#wt076), [WT046](#wt046), [WT039](#wt039), [WT102](#wt102) |
| 4 | 6 | 7 | 3 | 3 | 6 | 5 | [WT051](#wt051), [WT145](#wt145), [WT125](#wt125), [WT147](#wt147), [WT010](#wt010), [WT020](#wt020), [WT066](#wt066), [WT016](#wt016), [WT057](#wt057), [WT029](#wt029), [WT166](#wt166), [WT074](#wt074), [WT121](#wt121), [WT095](#wt095), [WT142](#wt142), [WT162](#wt162), [WT083](#wt083), [WT140](#wt140), [WT078](#wt078), [WT094](#wt094), [WT109](#wt109), [WT072](#wt072), [WT160](#wt160), [WT005](#wt005), [WT106](#wt106), [WT161](#wt161), [WT070](#wt070), [WT155](#wt155), [WT107](#wt107), [WT023](#wt023) |
| 5 | 6 | 7 | 3 | 3 | 6 | 5 | [WT013](#wt013), [WT119](#wt119), [WT097](#wt097), [WT105](#wt105), [WT123](#wt123), [WT108](#wt108), [WT025](#wt025), [WT164](#wt164), [WT180](#wt180), [WT047](#wt047), [WT128](#wt128), [WT050](#wt050), [WT157](#wt157), [WT168](#wt168), [WT035](#wt035), [WT153](#wt153), [WT067](#wt067), [WT130](#wt130), [WT060](#wt060), [WT063](#wt063), [WT089](#wt089), [WT059](#wt059), [WT004](#wt004), [WT061](#wt061), [WT022](#wt022), [WT137](#wt137), [WT096](#wt096), [WT034](#wt034), [WT116](#wt116), [WT093](#wt093) |
| 6 | 6 | 7 | 3 | 3 | 6 | 5 | [WT053](#wt053), [WT073](#wt073), [WT144](#wt144), [WT044](#wt044), [WT091](#wt091), [WT170](#wt170), [WT026](#wt026), [WT110](#wt110), [WT118](#wt118), [WT007](#wt007), [WT135](#wt135), [WT171](#wt171), [WT158](#wt158), [WT111](#wt111), [WT079](#wt079), [WT009](#wt009), [WT069](#wt069), [WT100](#wt100), [WT077](#wt077), [WT054](#wt054), [WT033](#wt033), [WT087](#wt087), [WT055](#wt055), [WT117](#wt117), [WT018](#wt018), [WT138](#wt138), [WT163](#wt163), [WT032](#wt032), [WT139](#wt139), [WT173](#wt173) |

Mistake log: expected output, decisive API rule, why the nearest distractor fails, and which implementation/use case that rule supports. Record partial understanding even when the guessed letter was correct.

## Basics, functions and strings

<a id="wt001"></a>
### WT001 — Nested declarations and first reads

What is the complete printed output?

```javascript
let score = 7;
{
  try { console.log(score); }
  catch (e) { console.log(e.name); }
  let score = 9;
}
console.log(score);
```

A. `ReferenceError / 9`

B. `undefined / 7`

C. `ReferenceError / 7`

D. `7 / 7`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
ReferenceError
7
```

The inner lexical declaration shadows the outer binding throughout its block, including its temporal dead zone. Catching the read error allows the final outer read.

**Why the other choices fail:**

- **A:** The inner binding does not replace the outer one.
- **B:** TDZ reads do not behave like initialized var bindings.
- **D:** The first read resolves to the uninitialized inner binding.

**Rule/source:** [MDN reference][let].

<!-- verify: {"kind": "js", "stdout": "ReferenceError\n7\n"} -->

</details>

<a id="wt002"></a>
### WT002 — Two typeof expressions

What is the complete printed output?

```javascript
console.log(typeof missingName);
try { console.log(typeof ready); }
catch (e) { console.log(e.name); }
let ready = 1;
```

A. `undefined / number`

B. `undefined / ReferenceError`

C. `undefined / undefined`

D. `ReferenceError only`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
undefined
ReferenceError
```

typeof on an unresolvable name returns the string undefined; typeof on a lexical binding in its TDZ throws.

**Why the other choices fail:**

- **A:** The initializer has not executed at the second read.
- **C:** The second name is declared but uninitialized.
- **D:** The unresolvable first name is safe with typeof.

**Rule/source:** [MDN reference][typeof].

<!-- verify: {"kind": "js", "stdout": "undefined\nReferenceError\n"} -->

</details>

<a id="wt003"></a>
### WT003 — Declarations inside a conditional block

What is the complete printed output?

```javascript
function read() {
  console.log(n);
  if (true) { var n = 4; let k = 8; }
  console.log(n, typeof k);
}
read();
```

A. `undefined / 4 undefined`

B. `undefined / undefined undefined`

C. `undefined / 4 number`

D. `ReferenceError only`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
undefined
4 undefined
```

The var binding is function-scoped and initially undefined. The let binding is confined to the if block.

**Why the other choices fail:**

- **B:** The assignment to function-scoped n does execute.
- **C:** k is outside its block.
- **D:** Reading a hoisted var before assignment is permitted.

**Rule/source:** [MDN reference][var].

<!-- verify: {"kind": "js", "stdout": "undefined\n4 undefined\n"} -->

</details>

<a id="wt004"></a>
### WT004 — Array operations through a const binding

What is the complete printed output?

```javascript
const a = [1];
a.push(2);
try { a = [3]; } catch (e) { console.log(e.name); }
console.log(a.join(","));
```

A. `TypeError / 3`

B. `1,2 only`

C. `TypeError / 1`

D. `TypeError / 1,2`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
TypeError
1,2
```

const protects the binding; it does not freeze the referenced array. The failed rebinding leaves the existing object reachable.

**Why the other choices fail:**

- **A:** A rejected assignment does not replace the binding.
- **B:** Assigning a new value to const fails.
- **C:** The earlier push is allowed.

**Rule/source:** [MDN reference][const].

<!-- verify: {"kind": "js", "stdout": "TypeError\n1,2\n"} -->

</details>

<a id="wt005"></a>
### WT005 — Assignments around Object.freeze

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const o = Object.freeze({inner: {n: 1}});
o.inner.n = 2;
try { o.inner = {n: 3}; } catch (e) { console.log(e.name); }
console.log(o.inner.n);
```

A. `TypeError / 1`

B. `2 only`

C. `TypeError / 3`

D. `TypeError / 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
TypeError
2
```

In strict code, replacing the frozen outer property throws. The nested object was not frozen and its mutation succeeds.

**Why the other choices fail:**

- **A:** Object.freeze did not recursively freeze inner.
- **B:** The outer property assignment throws in the stated strict environment.
- **C:** The failed replacement did not take effect.

**Rule/source:** [MDN reference][freeze].

<!-- verify: {"kind": "js", "stdout": "TypeError\n2\n"} -->

</details>

<a id="wt006"></a>
### WT006 — Destructuring initializers

What is the complete printed output?

```javascript
const {a = 5, b = 6, c = 7} = {a: 0, b: null};
console.log(a, b, c);
```

A. `0 null undefined`

B. `5 6 7`

C. `0 null 7`

D. `0 6 7`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
0 null 7
```

A destructuring initializer is used for undefined (including a missing property), not for zero or null.

**Why the other choices fail:**

- **A:** The missing c does trigger its initializer.
- **B:** Defaults are not truthiness fallbacks.
- **D:** null does not trigger this initializer.

**Rule/source:** [MDN reference][destructure].

<!-- verify: {"kind": "js", "stdout": "0 null 7\n"} -->

</details>

<a id="wt007"></a>
### WT007 — Calls with omitted, null and zero arguments

What is the complete printed output?

```javascript
function f(a = 2, b = a + 1) { return [a,b].map(String).join(","); }
console.log(f(undefined), f(null), f(0));
```

A. `2,3 null,3 0,3`

B. `undefined,NaN null,1 0,1`

C. `2,3 null,1 0,1`

D. `2,3 2,3 2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
2,3 null,1 0,1
```

Defaults apply to undefined. Later defaults can use earlier parameters; null + 1 and 0 + 1 are both 1.

**Why the other choices fail:**

- **A:** b is evaluated from the actual a on each call.
- **B:** The first a is replaced by its default.
- **D:** null and zero are supplied values.

**Rule/source:** [MDN reference][defaults].

<!-- verify: {"kind": "js", "stdout": "2,3 null,1 0,1\n"} -->

</details>

<a id="wt008"></a>
### WT008 — Calling two function bindings early

What is the complete printed output?

```javascript
console.log(declared());
try { console.log(expr()); } catch (e) { console.log(e.name); }
function declared() { return 4; }
var expr = function() { return 8; };
```

A. `4 / 8`

B. `4 / ReferenceError`

C. `4 / TypeError`

D. `ReferenceError only`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
4
TypeError
```

The declaration is callable before its written position. expr is a hoisted var whose current value is undefined, so calling it fails.

**Why the other choices fail:**

- **A:** The function expression assignment has not executed.
- **B:** expr exists; its non-callable value causes TypeError.
- **D:** The declaration is initialized in advance.

**Rule/source:** [MDN reference][functions].

<!-- verify: {"kind": "js", "stdout": "4\nTypeError\n"} -->

</details>

<a id="wt009"></a>
### WT009 — Two arrow body forms

What is the complete printed output?

```javascript
const x = () => {value: 3};
const y = () => ({value: 3});
console.log(x(), y().value);
```

A. `SyntaxError`

B. `[object Object] 3`

C. `undefined 3`

D. `3 3`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
undefined 3
```

The first braces are a function block with a label and no return. Parentheses make the second body an object-valued expression.

**Why the other choices fail:**

- **A:** The labelled statement is valid syntax.
- **B:** The first body is not an object expression.
- **D:** A labelled statement does not return its expression.

**Rule/source:** [MDN reference][arrow].

<!-- verify: {"kind": "js", "stdout": "undefined 3\n"} -->

</details>

<a id="wt010"></a>
### WT010 — A return statement across lines

What is the complete printed output?

```javascript
function f() {
  return
  {n: 9};
}
console.log(f());
```

A. `undefined`

B. `SyntaxError`

C. `[object Object]`

D. `9`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
undefined
```

A line terminator after return ends the return statement through automatic semicolon insertion. The following block is not its return value.

**Why the other choices fail:**

- **B:** This particular program is syntactically valid.
- **C:** The object-like block is separated from return.
- **D:** No property is returned.

**Rule/source:** [MDN reference][asi].

<!-- verify: {"kind": "js", "stdout": "undefined\n"} -->

</details>

<a id="wt011"></a>
### WT011 — Object updates inside a function

What is the complete printed output?

```javascript
const a = {n: 1};
function edit(x) {
  x.n++;
  x = {n: 9};
  x.n++;
}
edit(a);
console.log(a.n);
```

A. `2`

B. `1`

C. `9`

D. `10`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
2
```

The first mutation reaches the shared object. Reassigning the local parameter redirects only that parameter; its later mutation affects the new object.

**Why the other choices fail:**

- **B:** The first write is visible through a.
- **C:** The local reassignment does not redirect a.
- **D:** The last write targets the replacement object.

**Rule/source:** [MDN reference][functions].

<!-- verify: {"kind": "js", "stdout": "2\n"} -->

</details>

<a id="wt012"></a>
### WT012 — A retained function after reassignment

What is the complete printed output?

```javascript
let n = 1;
const read = () => n;
n = 5;
console.log(read());
```

A. `undefined`

B. `1`

C. `ReferenceError`

D. `5`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
5
```

The closure reads the current value of the captured binding when called, rather than a frozen copy from its creation.

**Why the other choices fail:**

- **A:** The enclosing binding remains accessible.
- **B:** Creation did not snapshot n.
- **C:** The binding is initialized and in scope.

**Rule/source:** [MDN reference][closures].

<!-- verify: {"kind": "js", "stdout": "5\n"} -->

</details>

<a id="wt013"></a>
### WT013 — Callbacks created in a var loop

What is the complete printed output?

```javascript
const f = [];
for (var i = 0; i < 3; i++) f.push(() => i);
console.log(f.map(fn => fn()).join(","));
```

A. `0,1,2`

B. `1,2,3`

C. `3,3,3`

D. `0,0,0`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
3,3,3
```

All closures refer to the same var binding; calls occur after the loop has advanced it to 3.

**Why the other choices fail:**

- **A:** That requires distinct per-iteration bindings or explicit snapshots.
- **B:** The callbacks are invoked after the whole loop.
- **D:** The binding is not frozen at its initial value.

**Rule/source:** [MDN reference][closures].

<!-- verify: {"kind": "js", "stdout": "3,3,3\n"} -->

</details>

<a id="wt014"></a>
### WT014 — Callbacks created in a let loop

What is the complete printed output?

```javascript
const f = [];
for (let i = 0; i < 3; i++) f.push(() => i);
console.log(f.map(fn => fn()).join(","));
```

A. `ReferenceError`

B. `0,1,2`

C. `1,2,3`

D. `3,3,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
0,1,2
```

A for loop with let creates the relevant per-iteration bindings. Each closure retains its iteration’s i.

**Why the other choices fail:**

- **A:** The closures retain access after the loop scope ends.
- **C:** These callbacks capture the values used for each body execution.
- **D:** That is the shared var version.

**Rule/source:** [MDN reference][closures].

<!-- verify: {"kind": "js", "stdout": "0,1,2\n"} -->

</details>

<a id="wt015"></a>
### WT015 — A property call and a detached call

What is the complete printed output?

```javascript
const o = {n: 6, read() {return this.n;}};
const f = o.read;
console.log(o.read());
try { console.log(f()); } catch (e) { console.log(e.name); }
```

A. `6 / TypeError`

B. `undefined / TypeError`

C. `6 / undefined`

D. `6 / 6`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
6
TypeError
```

A property call supplies o as this. The detached ordinary function call has undefined this in strict code.

**Why the other choices fail:**

- **B:** The first call does have the receiver o.
- **C:** Accessing n on undefined this throws before a value can be printed.
- **D:** A normal function does not permanently capture its receiver.

**Rule/source:** [MDN reference][this].

<!-- verify: {"kind": "js", "stdout": "6\nTypeError\n"} -->

</details>

<a id="wt016"></a>
### WT016 — An arrow called through a new receiver

What is the complete printed output?

```javascript
function make() { return () => this.n; }
const f = make.call({n: 4});
console.log(f.call({n: 9}));
```

A. `TypeError`

B. `4`

C. `undefined`

D. `9`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
4
```

The arrow closes over the this supplied to make. Calling the arrow with a different receiver cannot replace its lexical this.

**Why the other choices fail:**

- **A:** The retained this is a valid object.
- **C:** make received a real object with n.
- **D:** call does not rebind an arrow’s this.

**Rule/source:** [MDN reference][arrow].

<!-- verify: {"kind": "js", "stdout": "4\n"} -->

</details>

<a id="wt017"></a>
### WT017 — Creating and calling a bound function

What is the complete printed output?

```javascript
let calls = 0;
function sum(a,b) { calls++; return this.n+a+b; }
const f = sum.bind({n: 10}, 2);
console.log(calls, f(3), calls);
```

A. `0 13 1`

B. `0 15 1`

C. `0 15 0`

D. `1 15 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
0 15 1
```

bind creates a bound function with receiver and leading argument. It does not run sum until f is called. Console arguments are evaluated left to right.

**Why the other choices fail:**

- **A:** The bound argument 2 is included.
- **C:** Calling f increments calls before the last read.
- **D:** Binding is not an invocation.

**Rule/source:** [MDN reference][bind].

<!-- verify: {"kind": "js", "stdout": "0 15 1\n"} -->

</details>

<a id="wt018"></a>
### WT018 — Mixed numeric and string operations

What is the complete printed output?

```javascript
console.log(1 + 2 + "3", "1" + 2 + 3, "8" - 2 + 1);
```

A. `33 123 7`

B. `33 123 61`

C. `123 123 7`

D. `33 6 7`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
33 123 7
```

The first numeric addition makes 3 before concatenation. The second begins with a string. Subtraction converts the last string to a number.

**Why the other choices fail:**

- **B:** Subtraction produces a number before the last addition.
- **C:** The first two operands in the first expression are numeric.
- **D:** A leading string keeps concatenation.

**Rule/source:** [MDN reference][addition].

<!-- verify: {"kind": "js", "stdout": "33 123 7\n"} -->

</details>

<a id="wt019"></a>
### WT019 — Three tests on an empty array

What is the complete printed output?

```javascript
console.log([] == false, [] === false, Boolean([]));
```

A. `true false true`

B. `false false true`

C. `false false false`

D. `true true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
true false true
```

Loose equality converts the array through a primitive and compares numerical values. Strict equality keeps the type difference. The array object itself is truthy.

**Why the other choices fail:**

- **B:** The first loose comparison is true despite the object being truthy.
- **C:** An ordinary empty array is truthy, and the loose comparison converts it.
- **D:** Strict equality does not perform this conversion.

**Rule/source:** [MDN reference][equality].

<!-- verify: {"kind": "js", "stdout": "true false true\n"} -->

</details>

<a id="wt020"></a>
### WT020 — Comparisons involving null, undefined and zero

What is the complete printed output?

```javascript
console.log(null == undefined, null == 0, undefined == 0);
```

A. `false false false`

B. `true false false`

C. `true true false`

D. `true true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true false false
```

The loose equality rules specifically pair null with undefined. They do not equate either to zero.

**Why the other choices fail:**

- **A:** Loose equality does pair null with undefined.
- **C:** null == 0 is false.
- **D:** The special null/undefined pairing is not a numeric conversion to zero.

**Rule/source:** [MDN reference][equality].

<!-- verify: {"kind": "js", "stdout": "true false false\n"} -->

</details>

<a id="wt021"></a>
### WT021 — Strict equality and Object.is

What is the complete printed output?

```javascript
console.log(NaN === NaN, Object.is(NaN,NaN), Object.is(0,-0), 0 === -0);
```

A. `false true true true`

B. `false true false true`

C. `false false false true`

D. `true true false false`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false true false true
```

Strict equality rejects NaN equality but combines signed zeros. Object.is treats NaNs alike and distinguishes signed zero.

**Why the other choices fail:**

- **A:** Object.is distinguishes 0 from -0.
- **C:** Object.is does equate NaN with NaN.
- **D:** Strict equality differs on both NaN and signed zero.

**Rule/source:** [MDN reference][object-is].

<!-- verify: {"kind": "js", "stdout": "false true false true\n"} -->

</details>

<a id="wt022"></a>
### WT022 — Fallback and conditional expressions

What is the complete printed output?

```javascript
console.log(0 || 8, 0 ?? 8, "" && 9, "ok" && 0);
```

A. `8 8 false false`

B. `0 0 9 0`

C. `8 0 undefined 0`

D. `8 0  0`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
8 0  0
```

OR replaces a falsy zero; nullish coalescing preserves it. AND returns the first falsy operand, or its right operand. The empty string produces the double space in the log.

**Why the other choices fail:**

- **A:** These operations do not always return booleans; ?? preserves zero.
- **B:** OR treats zero as falsy; empty-string AND does not reach 9.
- **C:** The empty string remains the empty string, not undefined.

**Rule/source:** [MDN reference][logical].

<!-- verify: {"kind": "js", "stdout": "8 0  0\n"} -->

</details>

<a id="wt023"></a>
### WT023 — Increment operations behind logical operators

What is the complete printed output?

```javascript
let n = 0;
const a = false && ++n;
const b = true || ++n;
const c = 0 ?? ++n;
console.log(n, a, b, c);
```

A. `3 false true 1`

B. `0 false true 0`

C. `1 false true 1`

D. `0 false true false`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
0 false true 0
```

Each left operand already determines its expression’s result. Zero is non-nullish, so the final increment is skipped too.

**Why the other choices fail:**

- **A:** None of these right operands is evaluated.
- **C:** ?? does not replace zero.
- **D:** ?? returns the zero operand.

**Rule/source:** [MDN reference][logical].

<!-- verify: {"kind": "js", "stdout": "0 false true 0\n"} -->

</details>

<a id="wt024"></a>
### WT024 — Property reads with optional access

What is the complete printed output?

```javascript
const a = {n: 0};
console.log(a?.n ?? 5, a?.missing ?? 5, null?.n);
```

A. `0 5 null`

B. `5 5 undefined`

C. `0 undefined undefined`

D. `0 5 undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
0 5 undefined
```

A valid object is accessed normally; ?? preserves zero. A missing property and a nullish receiver both produce undefined at their respective accesses.

**Why the other choices fail:**

- **A:** An optional access on null produces undefined.
- **B:** Zero is not nullish.
- **C:** The ?? fallback replaces the missing property value.

**Rule/source:** [MDN reference][optional].

<!-- verify: {"kind": "js", "stdout": "0 5 undefined\n"} -->

</details>

<a id="wt025"></a>
### WT025 — Parenthesized and continuous property access

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const x = null;
console.log(x?.a.b);
try { console.log((x?.a).b); } catch(e) { console.log(e.name); }
```

A. `undefined / TypeError`

B. `null / TypeError`

C. `TypeError only`

D. `undefined / undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
undefined
TypeError
```

The continuous chain skips the remainder after the nullish receiver. Grouping produces undefined, then the separate .b access throws.

**Why the other choices fail:**

- **B:** Optional access returns undefined, not the original null.
- **C:** The first continuous chain does short-circuit.
- **D:** The grouped second access is no longer optional.

**Rule/source:** [MDN reference][optional].

<!-- verify: {"kind": "js", "stdout": "undefined\nTypeError\n"} -->

</details>

<a id="wt026"></a>
### WT026 — Whole-string and prefix conversions

What is the complete printed output?

```javascript
console.log(Number("12px"), parseInt("12px",10), Number(""), parseInt("",10));
```

A. `NaN 12 NaN NaN`

B. `12 12 0 0`

C. `NaN NaN 0 NaN`

D. `NaN 12 0 NaN`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
NaN 12 0 NaN
```

Number requires the whole nonempty text to be numeric, but the empty string converts to zero. parseInt reads a valid initial integer sequence, which is absent in the empty string.

**Why the other choices fail:**

- **A:** Number of the empty string is zero.
- **B:** Number does not accept the px suffix; empty parseInt has no integer prefix.
- **C:** parseInt can accept the numeric prefix before px.

**Rule/source:** [MDN reference][number].

<!-- verify: {"kind": "js", "stdout": "NaN 12 0 NaN\n"} -->

</details>

<a id="wt027"></a>
### WT027 — Two numeric validation functions

What is the complete printed output?

```javascript
console.log(isNaN("x"), Number.isNaN("x"), Number.isNaN(Number("x")));
```

A. `true false true`

B. `true false false`

C. `false false true`

D. `true true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
true false true
```

Global isNaN first coerces its input; Number.isNaN checks whether the original value is the numeric NaN value.

**Why the other choices fail:**

- **B:** The explicit Number conversion does produce NaN.
- **C:** Global isNaN converts the string to NaN.
- **D:** The string itself is not the number NaN.

**Rule/source:** [MDN reference][isnan].

<!-- verify: {"kind": "js", "stdout": "true false true\n"} -->

</details>

<a id="wt028"></a>
### WT028 — String extraction with unusual bounds

What is the complete printed output?

```javascript
const s = "abcdef";
console.log(JSON.stringify([s.slice(4,1), s.substring(4,1), s.slice(-2)]));
```

A. `["","bcd","abcdef"]`

B. `["bcd","bcd","ef"]`

C. `["","bcd","ef"]`

D. `["","", "ef"]`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
["","bcd","ef"]
```

slice does not swap reversed bounds and accepts a negative position. substring swaps its nonnegative start/end when necessary.

**Why the other choices fail:**

- **A:** The negative slice position is relative to the end.
- **B:** slice does not swap bounds.
- **D:** substring swaps these bounds, so it returns bcd.

**Rule/source:** [MDN reference][substring].

<!-- verify: {"kind": "js", "stdout": "[\"\",\"bcd\",\"ef\"]\n"} -->

</details>

<a id="wt029"></a>
### WT029 — Two transformations of one string

What is the complete printed output?

```javascript
const s = "  AbC  ";
const t = s.trim().toLowerCase();
console.log(JSON.stringify([s,t]));
```

A. `["  AbC  ","AbC"]`

B. `["  AbC  ","abc"]`

C. `["abc","abc"]`

D. `["AbC","abc"]`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
["  AbC  ","abc"]
```

Both methods return transformed strings. They do not mutate the original primitive string.

**Why the other choices fail:**

- **A:** The returned trimmed string is also lowercased.
- **C:** The original binding still contains its original string.
- **D:** Even trim did not modify s.

**Rule/source:** [MDN reference][trim].

<!-- verify: {"kind": "js", "stdout": "[\"  AbC  \",\"abc\"]\n"} -->

</details>

<a id="wt030"></a>
### WT030 — Two replacement calls

What is the complete printed output?

```javascript
const s = "aba";
console.log(s.replace("a","X"), s.replaceAll("a","X"), s);
```

A. `Xba Xba aba`

B. `Xba XbX XbX`

C. `Xba XbX aba`

D. `XbX XbX aba`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
Xba XbX aba
```

A string search in replace substitutes its first match. replaceAll substitutes all matches; neither mutates s.

**Why the other choices fail:**

- **A:** replaceAll handles both occurrences.
- **B:** String transformations do not mutate s.
- **D:** replace with a string search is not replaceAll.

**Rule/source:** [MDN reference][replace].

<!-- verify: {"kind": "js", "stdout": "Xba XbX aba\n"} -->

</details>

<a id="wt031"></a>
### WT031 — Searching at the beginning and for absence

Choose the pair with both the **current output** and a correct repair for this goal: test whether any supplied substring occurs, including at index zero. The printed output refers to the original code below, before repair.

```javascript
const s = "apple";
console.log(Boolean(s.indexOf("app")), s.includes("app"), s.indexOf("z"));
```

A. `false true -1 ; use Boolean(s.indexOf(needle))`

B. `false true -1 ; use s.indexOf(needle) > 0`

C. `false true -1 ; use s.indexOf(needle) === -1`

D. `false true -1 ; use s.includes(needle)`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
false true -1
```

indexOf returns a position, so the successful zero is falsy. includes returns a membership boolean. Absence is -1, which itself is truthy. For a presence decision, includes directly supplies the required boolean; indexOf is useful when the position itself matters.

**Why the other choices fail:**

- **A:** Index zero is falsy and the absent index -1 is truthy, so Boolean reverses these important cases.
- **B:** A match at index zero fails this condition; >= 0 would be valid.
- **C:** This tests absence rather than presence.

**Correct decision:** `false true -1 ; use s.includes(needle)`

**Repair code:**

```javascript
const s="apple";
console.log(s.includes("app"),s.includes("z"));
```

**Repair output:**

```text
true false
```

**Rule/source:** [MDN reference][str-includes].

<!-- verify: {"kind": "js", "stdout": "false true -1\n", "choice": "false true -1 ; use s.includes(needle)", "repair": {"code": "const s=\"apple\";\nconsole.log(s.includes(\"app\"),s.includes(\"z\"));", "stdout": "true false\n"}} -->

</details>

<a id="wt032"></a>
### WT032 — Splitting with a limit

What is the complete printed output?

```javascript
console.log(JSON.stringify("a,b,c".split(",",2)));
console.log("a,b,c".split(",",0).length);
```

A. `["a","b","c"] / 0`

B. `["a","b,c"] / 0`

C. `["a","b"] / 0`

D. `["a","b"] / 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
["a","b"]
0
```

The limit is the maximum number of returned substrings, not the number of separators to process. A zero limit yields no entries.

**Why the other choices fail:**

- **A:** The limit caps result length.
- **B:** The remainder is not preserved as a final limited field.
- **D:** A zero limit returns an empty array.

**Rule/source:** [MDN reference][split].

<!-- verify: {"kind": "js", "stdout": "[\"a\",\"b\"]\n0\n"} -->

</details>

<a id="wt033"></a>
### WT033 — Counting and iterating a non-BMP character

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const s = "A😀B";
console.log(s.length, [...s].length, s.slice(1,3));
```

A. `4 3 😀B`

B. `3 3 😀`

C. `4 4 😀`

D. `4 3 😀`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
4 3 😀
```

length and slice positions use UTF-16 code units. String iteration groups this surrogate pair into one code point.

**Why the other choices fail:**

- **A:** The end bound 3 is excluded.
- **B:** The emoji uses two code units.
- **C:** String iteration does not split this surrogate pair.

**Rule/source:** [MDN reference][string].

<!-- verify: {"kind": "js", "stdout": "4 3 \ud83d\ude00\n"} -->

</details>

<a id="wt034"></a>
### WT034 — Updating an object after spread

What is the complete printed output?

```javascript
const a = {inner:{n:1}, top:2};
const b = {...a};
b.inner.n = 7; b.top = 8;
console.log(a.inner.n, a.top, a === b);
```

A. `7 2 false`

B. `7 8 false`

C. `7 8 true`

D. `1 2 false`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
7 2 false
```

The outer object is copied, but inner remains a shared reference. Independent top assignments do not change a.

**Why the other choices fail:**

- **B:** Only the nested reference is shared.
- **C:** The outer objects and their top properties are separate.
- **D:** Spread does not deeply copy inner.

**Rule/source:** [MDN reference][spread].

<!-- verify: {"kind": "js", "stdout": "7 2 false\n"} -->

</details>

<a id="wt035"></a>
### WT035 — Enumerating an object with a prototype

What is the complete printed output?

```javascript
const o = Object.create({parent: 1});
o.own = 2;
const a = [];
for (const k in o) a.push(k);
console.log(a.sort().join(","), Object.keys(o).join(","));
```

A. `own,parent own,parent`

B. `parent own`

C. `own own`

D. `own,parent own`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
own,parent own
```

for...in can include inherited enumerable properties. Object.keys includes own enumerable string keys only. Sorting removes any dependence on key traversal order here.

**Why the other choices fail:**

- **A:** Object.keys excludes the inherited property.
- **B:** for...in includes own keys too.
- **C:** The inherited parent is enumerable.

**Rule/source:** [MDN reference][keys].

<!-- verify: {"kind": "js", "stdout": "own,parent own\n"} -->

</details>

<a id="wt036"></a>
### WT036 — Reading a later default parameter

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
function f(a = b, b = 2) { return a+b; }
try { console.log(f()); } catch(e) { console.log(e.name); }
```

A. `NaN`

B. `4`

C. `ReferenceError`

D. `TypeError`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
ReferenceError
```

The earlier parameter default reads the later parameter before it is initialized. Parameter initializers run in order.

**Why the other choices fail:**

- **A:** The later parameter is uninitialized, not merely a ready undefined value.
- **B:** The later default does not run before the read from a.
- **D:** The failure is access to an uninitialized binding.

**Rule/source:** [MDN reference][defaults].

<!-- verify: {"kind": "js", "stdout": "ReferenceError\n"} -->

</details>

## Array methods and state

<a id="wt037"></a>
### WT037 — Adding and removing array entries

What is the complete printed output?

```javascript
const a = [4]; const x = a.push(7,9); const y = a.pop();
console.log(x,y,a.join(","));
```

A. `3 2 4,7`

B. `9 9 4,7`

C. `3 9 4,7`

D. `3 9 4,7,9`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
3 9 4,7
```

push adds both arguments and returns the new length. pop removes and returns the final value.

**Why the other choices fail:**

- **A:** pop returns a value rather than remaining length.
- **B:** push returns length rather than the last added value.
- **D:** pop mutates the array.

**Rule/source:** [MDN reference][push].

<!-- verify: {"kind": "js", "stdout": "3 9 4,7\n"} -->

</details>

<a id="wt038"></a>
### WT038 — Two selection/edit operations

What is the complete printed output?

```javascript
const a = [0,1,2,3];
const b = a.slice(1,3); const c = a.splice(1,2,8);
console.log(JSON.stringify([a,b,c]));
```

A. `[[0,8,3],[1,2],[1,2]]`

B. `[[0,8],[1,2,3],[1,2,3]]`

C. `[[0,1,2,3],[1,2],[1,2]]`

D. `[[0,8,3],[1,2],[0,8,3]]`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
[[0,8,3],[1,2],[1,2]]
```

slice copies the half-open selection. splice removes two elements at index 1, inserts 8 and returns the removed elements.

**Why the other choices fail:**

- **B:** slice end is excluded; splice’s second argument is a count.
- **C:** splice changes a.
- **D:** splice returns removed values, not the new full array.

**Rule/source:** [MDN reference][splice].

<!-- verify: {"kind": "js", "stdout": "[[0,8,3],[1,2],[1,2]]\n"} -->

</details>

<a id="wt039"></a>
### WT039 — Two splice argument lists

What is the complete printed output?

```javascript
const a=[1,2,3], b=[1,2,3];
console.log(a.splice(1).join(","), b.splice(1,undefined,9).length);
console.log(a.join(","), b.join(","));
```

A. `2,3 2 / 1 1,9`

B. `2 0 / 1,3 1,9,2,3`

C. `2,3 0 / 1 1,2,3`

D. `2,3 0 / 1 1,9,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2,3 0
1 1,9,2,3
```

With deleteCount omitted, splice removes to the end. Explicit undefined converts to zero, so the second call only inserts.

**Why the other choices fail:**

- **A:** Explicit undefined is not the same as omission.
- **B:** Omitted deleteCount removes every following element.
- **C:** The second call inserts 9.

**Rule/source:** [MDN reference][splice].

<!-- verify: {"kind": "js", "stdout": "2,3 0\n1 1,9,2,3\n"} -->

</details>

<a id="wt040"></a>
### WT040 — Selecting with negative positions

What is the complete printed output?

```javascript
const a=[0,1,2,3,4];
console.log(a.slice(-3,-1).join(","), a.join(","));
```

A. `0,1,2 0,1,2,3,4`

B. `2,3,4 0,1,2,3,4`

C. `2,3 0,1,4`

D. `2,3 0,1,2,3,4`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2,3 0,1,2,3,4
```

Negative bounds count from length; the normalized range is [2,4). slice leaves a unchanged.

**Why the other choices fail:**

- **A:** Negative bounds are relative to length, not clamped to zero.
- **B:** The end is excluded.
- **C:** slice does not remove values from a.

**Rule/source:** [MDN reference][slice].

<!-- verify: {"kind": "js", "stdout": "2,3 0,1,2,3,4\n"} -->

</details>

<a id="wt041"></a>
### WT041 — Sorting a numeric array without a comparator

What is the complete printed output?

```javascript
const a=[2,11,3];
console.log(a.sort().join(","));
```

A. `2,3,11`

B. `3,2,11`

C. `2,11,3`

D. `11,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
11,2,3
```

The default ordering compares string representations, so 11 precedes 2. Numeric values do not automatically select a numeric comparator.

**Why the other choices fail:**

- **A:** That needs a numeric ascending comparator.
- **B:** No descending comparator is supplied.
- **C:** sort is not a no-op for this input.

**Rule/source:** [MDN reference][sort].

<!-- verify: {"kind": "js", "stdout": "11,2,3\n"} -->

</details>

<a id="wt042"></a>
### WT042 — Aliases around a sort call

What is the complete printed output?

```javascript
const a=[3,1,2], alias=a;
const b=a.sort((x,y)=>x-y);
console.log(a===b, alias.join(","));
```

A. `false 3,1,2`

B. `true 3,1,2`

C. `false 1,2,3`

D. `true 1,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
true 1,2,3
```

sort mutates and returns the same array. Existing aliases observe that mutation.

**Why the other choices fail:**

- **A:** That resembles a copying sort, not sort.
- **B:** The alias points to the sorted object.
- **C:** sort does not return a separate outer array.

**Rule/source:** [MDN reference][sort].

<!-- verify: {"kind": "js", "stdout": "true 1,2,3\n"} -->

</details>

<a id="wt043"></a>
### WT043 — A returned reversal and a later push

What is the complete printed output?

```javascript
const a=[1,2,3]; const b=a.reverse(); b.push(4);
console.log(a===b, a.join(","));
```

A. `false 1,2,3`

B. `false 3,2,1`

C. `true 3,2,1,4`

D. `true 3,2,1`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
true 3,2,1,4
```

reverse mutates and returns the receiver. Pushing through b changes a because they identify the same array.

**Why the other choices fail:**

- **A:** reverse is not toReversed.
- **B:** The result is not a separate copy.
- **D:** The later push acts on that same array.

**Rule/source:** [MDN reference][reverse].

<!-- verify: {"kind": "js", "stdout": "true 3,2,1,4\n"} -->

</details>

<a id="wt044"></a>
### WT044 — Array callback with a block body

What is the complete printed output?

```javascript
const a=[2,3].map(x=>{x*2;});
console.log(a.length, a[0], 0 in a);
```

A. `2 undefined false`

B. `0 undefined false`

C. `2 4 true`

D. `2 undefined true`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2 undefined true
```

The callback returns undefined twice. map creates real assigned entries for these returns; they are not holes.

**Why the other choices fail:**

- **A:** An undefined returned value creates an entry, not a hole.
- **B:** map does construct the result array.
- **C:** The block body has no return.

**Rule/source:** [MDN reference][map].

<!-- verify: {"kind": "js", "stdout": "2 undefined true\n"} -->

</details>

<a id="wt045"></a>
### WT045 — A parsing function used as a mapper

Choose the pair with both the **current output** and a correct repair for this goal: parse every input as a base-10 integer without exposing the array index as radix. The printed output refers to the original code below, before repair.

```javascript
const a=["10","10","10"].map(parseInt);
console.log(a.map(String).join(","));
console.log(["10","10","10"].map(x=>parseInt(x,10)).join(","));
```

A. `10,NaN,2 / 10,10,10 ; map(x => parseInt(x,10))`

B. `10,NaN,2 / 10,10,10 ; map(parseInt.bind(null))`

C. `10,NaN,2 / 10,10,10 ; map(parseInt,10)`

D. `10,NaN,2 / 10,10,10 ; map(x => parseInt(x,2))`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
10,NaN,2
10,10,10
```

map passes (value,index,array); parseInt interprets index as radix. Radix 0 infers decimal here, 1 is invalid, and binary 10 is 2. The wrapper fixes radix. Wrap callbacks whose parameter contracts conflict with the higher-order method; map itself still passes three arguments.

**Why the other choices fail:**

- **B:** Binding only this does not remove the extra index argument reaching parseInt.
- **C:** The second map argument is thisArg, not a radix supplied to the callback.
- **D:** This fixes the radix to binary, which produces 2 for these strings rather than decimal 10.

**Correct decision:** `10,NaN,2 / 10,10,10 ; map(x => parseInt(x,10))`

**Repair code:**

```javascript
console.log(["10","10","10"].map(x=>parseInt(x,10)).join(","));
```

**Repair output:**

```text
10,10,10
```

**Rule/source:** [MDN reference][map].

<!-- verify: {"kind": "js", "stdout": "10,NaN,2\n10,10,10\n", "choice": "10,NaN,2 / 10,10,10 ; map(x => parseInt(x,10))", "repair": {"code": "console.log([\"10\",\"10\",\"10\"].map(x=>parseInt(x,10)).join(\",\"));", "stdout": "10,10,10\n"}} -->

</details>

<a id="wt046"></a>
### WT046 — Updating an object returned by map

What is the complete printed output?

```javascript
const a=[{n:1}];
const b=a.map(x=>x);
b[0].n=4;
console.log(a===b,a[0]===b[0],a[0].n);
```

A. `false true 4`

B. `false false 1`

C. `true true 4`

D. `false true 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
false true 4
```

map creates a new outer array. Returning each original object preserves the object reference.

**Why the other choices fail:**

- **B:** map is not an automatic deep copy.
- **C:** The outer array is newly constructed.
- **D:** The shared object was mutated.

**Rule/source:** [MDN reference][map].

<!-- verify: {"kind": "js", "stdout": "false true 4\n"} -->

</details>

<a id="wt047"></a>
### WT047 — Updating an object selected by filter

What is the complete printed output?

```javascript
const a=[{n:1},{n:2}]; const b=a.filter(x=>x.n>1);
b[0].n=8;
console.log(a.length,b.length,a[1].n);
```

A. `2 1 2`

B. `1 1 8`

C. `2 1 8`

D. `2 2 8`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
2 1 8
```

filter makes a new selection array but retains references to selected objects. It does not remove elements from a.

**Why the other choices fail:**

- **A:** The selected object reference is shared.
- **B:** filter does not shrink the original.
- **D:** Only the second object satisfies the predicate.

**Rule/source:** [MDN reference][filter].

<!-- verify: {"kind": "js", "stdout": "2 1 8\n"} -->

</details>

<a id="wt048"></a>
### WT048 — Selecting values with Boolean

Choose the pair with both the **current output** and a correct repair for this goal: remove only null and undefined while retaining zero, false and the empty string. The printed output refers to the original code below, before repair.

```javascript
const a=[0,1,false,"",null,undefined,"0"];
console.log(JSON.stringify(a.filter(Boolean)));
```

A. `[1,"0"] ; filter(Boolean)`

B. `[1,"0"] ; filter(x => x !== undefined)`

C. `[1,"0"] ; filter(x => x !== null)`

D. `[1,"0"] ; filter(x => x != null)`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
[1,"0"]
```

Boolean removes every falsy value, not merely missing data. The string 0 remains truthy; numeric zero is removed. The intentional nullish test x != null excludes exactly null and undefined here; its equivalent strict predicate is x !== null && x !== undefined.

**Why the other choices fail:**

- **A:** Truthiness also removes zero, false and the empty string; those values are valid under this goal.
- **B:** This retains null, which the goal also requires removing.
- **C:** This retains undefined, which the goal also requires removing.

**Correct decision:** `[1,"0"] ; filter(x => x != null)`

**Repair code:**

```javascript
const a=[0,1,false,"",null,undefined,"0"];
console.log(JSON.stringify(a.filter(x=>x!=null)));
```

**Repair output:**

```text
[0,1,false,"","0"]
```

**Rule/source:** [MDN reference][filter].

<!-- verify: {"kind": "js", "stdout": "[1,\"0\"]\n", "choice": "[1,\"0\"] ; filter(x => x != null)", "repair": {"code": "const a=[0,1,false,\"\",null,undefined,\"0\"];\nconsole.log(JSON.stringify(a.filter(x=>x!=null)));", "stdout": "[0,1,false,\"\",\"0\"]\n"}} -->

</details>

<a id="wt049"></a>
### WT049 — Two accumulator initializations

What is the complete printed output?

```javascript
const a=[2,3]; let x=0,y=0;
const p=a.reduce((s,n)=>{x++;return s+n;});
const r=a.reduce((s,n)=>{y++;return s+n;},0);
console.log(p,r,x,y);
```

A. `5 5 1 1`

B. `5 5 2 2`

C. `3 5 1 2`

D. `5 5 1 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
5 5 1 2
```

Without an initial value, the first present element supplies the accumulator. With an initial value, both elements invoke the callback.

**Why the other choices fail:**

- **A:** The seeded version processes both entries.
- **B:** The first version uses 2 as its seed.
- **C:** The unseeded sum still includes its initial element.

**Rule/source:** [MDN reference][reduce].

<!-- verify: {"kind": "js", "stdout": "5 5 1 2\n"} -->

</details>

<a id="wt050"></a>
### WT050 — Two reductions of an empty array

What is the complete printed output?

```javascript
try { console.log([].reduce((a,b)=>a+b)); }
catch(e) { console.log(e.name); }
console.log([].reduce((a,b)=>a+b,0));
```

A. `TypeError / 0`

B. `undefined / 0`

C. `TypeError / undefined`

D. `0 / 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
TypeError
0
```

An empty array has no seed without an initial value. With a supplied initial accumulator, that value is returned without calling the callback.

**Why the other choices fail:**

- **B:** The unseeded call throws.
- **C:** The supplied seed is the result.
- **D:** Zero is not an implicit reduce seed.

**Rule/source:** [MDN reference][reduce].

<!-- verify: {"kind": "js", "stdout": "TypeError\n0\n"} -->

</details>

<a id="wt051"></a>
### WT051 — Reduction of a singleton array

What is the complete printed output?

```javascript
let calls=0;
const r=[7].reduce((a,b)=>{calls++;return a+b;});
console.log(r,calls);
```

A. `undefined 0`

B. `7 0`

C. `14 1`

D. `7 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
7 0
```

The sole present element becomes the initial accumulator; no later element remains to process.

**Why the other choices fail:**

- **A:** The element itself supplies the result.
- **C:** The same element is not added to itself.
- **D:** The seed is not passed through an unnecessary callback.

**Rule/source:** [MDN reference][reduce].

<!-- verify: {"kind": "js", "stdout": "7 0\n"} -->

</details>

<a id="wt052"></a>
### WT052 — Returning a boolean from an iteration callback

Choose the pair with both the **current output** and a correct repair for this goal: process 1 and 2, then stop before processing 3. The printed output refers to the original code below, before repair.

```javascript
const seen=[];
const r=[1,2,3].forEach(x=>{seen.push(x);if(x===2)return false;});
console.log(seen.join(","),r);
```

A. `1,2,3 undefined ; return undefined from the forEach callback at 2`

B. `1,2,3 undefined ; return true from the forEach callback at 2`

C. `1,2,3 undefined ; replace forEach with map and return false at 2`

D. `1,2,3 undefined ; use a for...of loop and break after processing 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1,2,3 undefined
```

The callback return ends that invocation only. forEach ignores callback results and returns undefined. An explicit loop permits break. A correctly written some callback is another option when a boolean early-stop contract suits the task.

**Why the other choices fail:**

- **A:** Changing the ignored callback value does not terminate the traversal.
- **B:** forEach ignores either boolean return; this still processes 3.
- **C:** map collects results but also ignores them for stopping purposes.

**Correct decision:** `1,2,3 undefined ; use a for...of loop and break after processing 2`

**Repair code:**

```javascript
const seen=[];
for(const x of [1,2,3]){seen.push(x);if(x===2)break;}
console.log(seen.join(","));
```

**Repair output:**

```text
1,2
```

**Rule/source:** [MDN reference][foreach].

<!-- verify: {"kind": "js", "stdout": "1,2,3 undefined\n", "choice": "1,2,3 undefined ; use a for...of loop and break after processing 2", "repair": {"code": "const seen=[];\nfor(const x of [1,2,3]){seen.push(x);if(x===2)break;}\nconsole.log(seen.join(\",\"));", "stdout": "1,2\n"}} -->

</details>

<a id="wt053"></a>
### WT053 — Tracking a some callback

What is the complete printed output?

```javascript
let calls=0;
const r=[1,2,3].some(x=>{calls++;return x===2;});
console.log(r,calls);
```

A. `2 2`

B. `true 2`

C. `false 2`

D. `true 3`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true 2
```

some stops after finding a truthy predicate result. It does not call the predicate for 3.

**Why the other choices fail:**

- **A:** some returns a boolean, not the matching value.
- **C:** The second element satisfies the predicate.
- **D:** The third call is skipped.

**Rule/source:** [MDN reference][some].

<!-- verify: {"kind": "js", "stdout": "true 2\n"} -->

</details>

<a id="wt054"></a>
### WT054 — Two predicates on an empty array

What is the complete printed output?

```javascript
let calls=0;
console.log([].every(()=>{calls++;return false;}),[].some(()=>{calls++;return true;}),calls);
```

A. `true true 0`

B. `false false 0`

C. `true false 0`

D. `true false 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
true false 0
```

No counterexample exists for empty every; no witness exists for empty some. Neither callback runs.

**Why the other choices fail:**

- **A:** some needs at least one matching entry.
- **B:** every is true on the empty array.
- **D:** There are no elements to invoke callbacks on.

**Rule/source:** [MDN reference][every].

<!-- verify: {"kind": "js", "stdout": "true false 0\n"} -->

</details>

<a id="wt055"></a>
### WT055 — Value search and position search

Choose the pair with both the **current output** and a correct repair for this goal: distinguish a matched undefined element at index zero from no match. The printed output refers to the original code below, before repair.

```javascript
const a=[undefined,2];
console.log(a.find(x=>x===undefined), a.findIndex(x=>x===undefined), a.findIndex(x=>x===9));
```

A. `undefined 0 -1 ; check findIndex(predicate) !== -1`

B. `undefined 0 -1 ; check Boolean(findIndex(predicate))`

C. `undefined 0 -1 ; check findIndex(predicate) > 0`

D. `undefined 0 -1 ; check find(predicate) !== undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
undefined 0 -1
```

The found value may itself be undefined. findIndex separately identifies the matched zero position and the absent match. Use a result whose absence sentinel cannot be confused with an allowed successful value, and compare that sentinel explicitly.

**Why the other choices fail:**

- **B:** Index zero is falsy and absent -1 is truthy; this loses the distinction in the wrong direction.
- **C:** This excludes a valid match at index zero.
- **D:** A successfully matched undefined element fails this condition.

**Correct decision:** `undefined 0 -1 ; check findIndex(predicate) !== -1`

**Repair code:**

```javascript
const a=[undefined,2];
console.log(a.findIndex(x=>x===undefined)!==-1,a.findIndex(x=>x===9)!==-1);
```

**Repair output:**

```text
true false
```

**Rule/source:** [MDN reference][find].

<!-- verify: {"kind": "js", "stdout": "undefined 0 -1\n", "choice": "undefined 0 -1 ; check findIndex(predicate) !== -1", "repair": {"code": "const a=[undefined,2];\nconsole.log(a.findIndex(x=>x===undefined)!==-1,a.findIndex(x=>x===9)!==-1);", "stdout": "true false\n"}} -->

</details>

<a id="wt056"></a>
### WT056 — Membership tests involving NaN and signed zero

What is the complete printed output?

```javascript
const a=[NaN,0];
console.log(a.includes(NaN),a.indexOf(NaN),a.includes(-0));
```

A. `false -1 true`

B. `true -1 false`

C. `true 0 true`

D. `true -1 true`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
true -1 true
```

includes uses SameValueZero, which equates NaNs and signed zeros. indexOf uses strict equality and does not find NaN.

**Why the other choices fail:**

- **A:** includes can find NaN.
- **B:** Signed zeros compare alike for includes.
- **C:** indexOf cannot find NaN through strict equality.

**Rule/source:** [MDN reference][includes].

<!-- verify: {"kind": "js", "stdout": "true -1 true\n"} -->

</details>

<a id="wt057"></a>
### WT057 — Membership tests on an unassigned position

What is the complete printed output?

```javascript
const a=Array(2);
console.log(a.includes(undefined),a.indexOf(undefined),0 in a);
```

A. `false -1 false`

B. `true 0 false`

C. `true 0 true`

D. `true -1 false`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
true -1 false
```

includes reads empty positions as undefined. indexOf skips absent entries. No property exists at index 0.

**Why the other choices fail:**

- **A:** includes does not skip these positions.
- **B:** indexOf skips holes.
- **C:** Reading undefined does not prove an assigned property.

**Rule/source:** [MDN reference][includes].

<!-- verify: {"kind": "js", "stdout": "true -1 false\n"} -->

</details>

<a id="wt058"></a>
### WT058 — Transforming an array with missing positions

What is the complete printed output?

```javascript
const a=Array(2);
const b=a.map(()=>9), c=Array.from(a,()=>9);
console.log(b.length,0 in b,c.join(","),0 in c);
```

A. `2 false , false`

B. `2 true 9,9 true`

C. `0 false 9,9 true`

D. `2 false 9,9 true`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2 false 9,9 true
```

map skips missing entries and leaves corresponding holes. Array.from’s iteration reads values and invokes its mapping function for both positions.

**Why the other choices fail:**

- **A:** Array.from materializes these entries.
- **B:** map did not visit a hole.
- **C:** The mapped sparse result retains length 2.

**Rule/source:** [MDN reference][from].

<!-- verify: {"kind": "js", "stdout": "2 false 9,9 true\n"} -->

</details>

<a id="wt059"></a>
### WT059 — Selecting from a sparse array

What is the complete printed output?

```javascript
const a=[,undefined,3];
const b=a.filter(()=>true);
console.log(b.length,0 in b,b[0],b[1]);
```

A. `1 true 3 undefined`

B. `3 false undefined undefined`

C. `2 false undefined 3`

D. `2 true undefined 3`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2 true undefined 3
```

filter skips the hole but visits the explicitly present undefined. It appends the selected values densely.

**Why the other choices fail:**

- **A:** The predicate also selects the real undefined entry.
- **B:** filter does not preserve a position for the hole.
- **C:** The selected undefined is a present entry.

**Rule/source:** [MDN reference][filter].

<!-- verify: {"kind": "js", "stdout": "2 true undefined 3\n"} -->

</details>

<a id="wt060"></a>
### WT060 — Position search on a sparse array

What is the complete printed output?

```javascript
const a=Array(2);let calls=0;
const r=a.findIndex(x=>{calls++;return x===undefined;});
console.log(r,calls);
```

A. `-1 2`

B. `-1 0`

C. `0 2`

D. `0 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
0 1
```

findIndex examines index 0 as undefined and stops when the predicate is true. Unlike map, this method visits empty positions.

**Why the other choices fail:**

- **A:** The first undefined read satisfies the predicate.
- **B:** findIndex does not skip these holes.
- **C:** It short-circuits on the first match.

**Rule/source:** [MDN reference][find].

<!-- verify: {"kind": "js", "stdout": "0 1\n"} -->

</details>

<a id="wt061"></a>
### WT061 — Deleting and editing indexed entries

What is the complete printed output?

```javascript
const a=[1,2,3],b=[1,2,3];
delete a[1]; b.splice(1,1);
console.log(a.length,1 in a,b.length,b[1]);
```

A. `3 false 2 3`

B. `3 false 2 undefined`

C. `3 true 2 3`

D. `2 false 2 3`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
3 false 2 3
```

delete removes the property without changing length or shifting positions. splice removes and shifts later elements.

**Why the other choices fail:**

- **B:** splice shifts 3 into index 1.
- **C:** delete leaves an absent property, not an assigned undefined.
- **D:** delete does not reduce array length.

**Rule/source:** [MDN reference][array].

<!-- verify: {"kind": "js", "stdout": "3 false 2 3\n"} -->

</details>

<a id="wt062"></a>
### WT062 — Reducing and extending length

What is the complete printed output?

```javascript
const a=[1,2,3];a.length=1;a.length=3;
console.log(a.length,1 in a,a[2]);
```

A. `1 false undefined`

B. `3 false undefined`

C. `3 true 3`

D. `3 true undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
3 false undefined
```

Shrinking deleted the tail entries. Re-expanding length creates empty positions, not restored values.

**Why the other choices fail:**

- **A:** The second assignment expands length again.
- **C:** Deleted entries are not restored on expansion.
- **D:** Expansion creates holes, not assigned undefined values.

**Rule/source:** [MDN reference][array].

<!-- verify: {"kind": "js", "stdout": "3 false undefined\n"} -->

</details>

<a id="wt063"></a>
### WT063 — Appending during traversal

What is the complete printed output?

```javascript
const a=[1,2], seen=[];
a.forEach(x=>{seen.push(x);a.push(9);});
console.log(seen.join(","),a.length);
```

A. `1 3`

B. `1,2 2`

C. `1,2 4`

D. `1,2,9,9 6`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
1,2 4
```

The original length determines the visited index range. Appended entries outside that range are not visited.

**Why the other choices fail:**

- **A:** Both original indices are present and visited.
- **B:** The callback’s mutations still take effect.
- **D:** Appended indices are outside the original range.

**Rule/source:** [MDN reference][foreach].

<!-- verify: {"kind": "js", "stdout": "1,2 4\n"} -->

</details>

<a id="wt064"></a>
### WT064 — Updating a later entry during traversal

What is the complete printed output?

```javascript
const a=[1,2,3],seen=[];
a.forEach((x,i)=>{seen.push(x);if(i===0)a[1]=8;});
console.log(seen.join(","));
```

A. `1,8,3`

B. `1,8`

C. `8,8,3`

D. `1,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
1,8,3
```

Although the range is fixed initially, future values are read at their visit. The overwrite affects index 1.

**Why the other choices fail:**

- **B:** No length change or deletion prevents visiting index 2.
- **C:** The first x was read before the mutation.
- **D:** forEach does not snapshot every value at entry.

**Rule/source:** [MDN reference][foreach].

<!-- verify: {"kind": "js", "stdout": "1,8,3\n"} -->

</details>

<a id="wt065"></a>
### WT065 — Deleting a later entry during traversal

What is the complete printed output?

```javascript
const a=[1,2,3],seen=[];
a.forEach((x,i)=>{seen.push(x);if(i===0)delete a[1];});
console.log(seen.join(","),a.length);
```

A. `1,3 2`

B. `1,2,3 3`

C. `1,undefined,3 3`

D. `1,3 3`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1,3 3
```

The method checks whether each indexed property exists when reached. The deleted middle property is skipped, and length stays 3.

**Why the other choices fail:**

- **A:** delete does not shrink length.
- **B:** The middle property is removed before its visit.
- **C:** forEach skips absent entries rather than visiting their undefined reads.

**Rule/source:** [MDN reference][foreach].

<!-- verify: {"kind": "js", "stdout": "1,3 3\n"} -->

</details>

<a id="wt066"></a>
### WT066 — Value iteration and key enumeration

What is the complete printed output?

```javascript
const a=[,2],seen=[];
for(const x of a)seen.push(String(x));
console.log(seen.join(","),Object.keys(a).join(","));
```

A. `undefined,2 0,1`

B. `0,1 1`

C. `undefined,2 1`

D. `2 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
undefined,2 1
```

for...of uses array value iteration, including an undefined read for the hole. Object.keys lists only the present index.

**Why the other choices fail:**

- **A:** The undefined read did not create an index property.
- **B:** for...of yields values, not keys.
- **D:** Value iteration does not skip the hole.

**Rule/source:** [MDN reference][array].

<!-- verify: {"kind": "js", "stdout": "undefined,2 1\n"} -->

</details>

<a id="wt067"></a>
### WT067 — Updating a nested array after concatenation

What is the complete printed output?

```javascript
const a=[[1]], b=a.concat([2]);
b[0].push(3);
console.log(JSON.stringify(a),JSON.stringify(b));
```

A. `[[1,3]] [[1,3],2]`

B. `[[1,3],2] [[1,3],2]`

C. `[[1]] [[1,3],2]`

D. `[[1,3]] [[1,3],[2]]`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
[[1,3]] [[1,3],2]
```

The original nested array is shared into the new outer result. The argument [2] is concatenated as an element 2.

**Why the other choices fail:**

- **B:** a’s outer array does not gain 2.
- **C:** The nested array is not deeply copied.
- **D:** Ordinary array arguments to concat are spread one level.

**Rule/source:** [MDN reference][concat].

<!-- verify: {"kind": "js", "stdout": "[[1,3]] [[1,3],2]\n"} -->

</details>

<a id="wt068"></a>
### WT068 — Flattening nested arrays at two depths

What is the complete printed output?

```javascript
const a=[1,,[2,,[3]]];
console.log(JSON.stringify(a.flat()),JSON.stringify(a.flat(2)));
```

A. `[1,[2,[3]]] [1,2,[3]]`

B. `[1,2,3] [1,2,3]`

C. `[1,2,[3]] [1,2,3]`

D. `[1,null,2,null,[3]] [1,null,2,null,3]`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
[1,2,[3]] [1,2,3]
```

The default depth is one. Encountered empty slots are omitted, but deeper nested arrays remain until enough depth is requested.

**Why the other choices fail:**

- **A:** Each depth count controls one nesting level.
- **B:** Default flat does not flatten the remaining nested [3].
- **D:** flat removes the encountered holes.

**Rule/source:** [MDN reference][flat].

<!-- verify: {"kind": "js", "stdout": "[1,2,[3]] [1,2,3]\n"} -->

</details>

<a id="wt069"></a>
### WT069 — Mapping to nested arrays

What is the complete printed output?

```javascript
console.log(JSON.stringify([1,2].flatMap(x=>[[x,x*2]])));
```

A. `[1,2,2,4]`

B. `[1,2]`

C. `[[[1,2]],[[2,4]]]`

D. `[[1,2],[2,4]]`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
[[1,2],[2,4]]
```

Each callback returns a one-element outer array containing a pair. One level is removed; the pair arrays remain.

**Why the other choices fail:**

- **A:** flatMap does not recursively flatten the pair arrays.
- **B:** Both elements of each returned pair remain.
- **C:** The callback’s outer level is flattened.

**Rule/source:** [MDN reference][flatmap].

<!-- verify: {"kind": "js", "stdout": "[[1,2],[2,4]]\n"} -->

</details>

<a id="wt070"></a>
### WT070 — Initializing an array with one object

Choose the pair with both the **current output** and a correct repair for this goal: create three separate mutable objects, so changing the first leaves the other two unchanged. The printed output refers to the original code below, before repair.

```javascript
const a=Array(3).fill({n:0});
a[0].n=7;
console.log(a.map(x=>x.n).join(","),a[0]===a[1]);
```

A. `7,7,7 true ; Array.from({length:3}).fill({n:0})`

B. `7,7,7 true ; [...Array(3).fill({n:0})]`

C. `7,7,7 true ; Array(3).map(() => ({n:0}))`

D. `7,7,7 true ; Array.from({length:3}, () => ({n:0}))`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
7,7,7 true
```

fill stores the same supplied object at every position. It does not call an object factory separately. A factory invocation per element creates separate object identities. Copying only the array cannot undo existing aliasing.

**Why the other choices fail:**

- **A:** fill still supplies one shared object to every position.
- **B:** Spreading creates a different outer array but retains the shared object references.
- **C:** map skips all three holes; no objects are created, and a[0].n fails.

**Correct decision:** `7,7,7 true ; Array.from({length:3}, () => ({n:0}))`

**Repair code:**

```javascript
const a=Array.from({length:3},()=>({n:0}));
a[0].n=7;
console.log(a.map(x=>x.n).join(","),a[0]===a[1]);
```

**Repair output:**

```text
7,0,0 false
```

**Rule/source:** [MDN reference][fill].

<!-- verify: {"kind": "js", "stdout": "7,7,7 true\n", "choice": "7,7,7 true ; Array.from({length:3}, () => ({n:0}))", "repair": {"code": "const a=Array.from({length:3},()=>({n:0}));\na[0].n=7;\nconsole.log(a.map(x=>x.n).join(\",\"),a[0]===a[1]);", "stdout": "7,0,0 false\n"}} -->

</details>

<a id="wt071"></a>
### WT071 — Initializing an array with a factory

What is the complete printed output?

```javascript
const a=Array.from({length:2},()=>({n:0}));
a[0].n=4;
console.log(a[0]===a[1],a.map(x=>x.n).join(","));
```

A. `false 4,4`

B. `false 4,0`

C. `true 4,4`

D. `false 0,0`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false 4,0
```

The mapping function executes separately and creates a fresh object each time, unlike fill with one object.

**Why the other choices fail:**

- **A:** The second object was not mutated.
- **C:** Separate object-literal evaluations create separate identities.
- **D:** The first write succeeds.

**Rule/source:** [MDN reference][from].

<!-- verify: {"kind": "js", "stdout": "false 4,0\n"} -->

</details>

<a id="wt072"></a>
### WT072 — Sorting a copy containing objects

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const a=[{n:2},{n:1}];
const b=a.toSorted((x,y)=>x.n-y.n);
b[0].n=8;
console.log(a.map(x=>x.n).join(","),b.map(x=>x.n).join(","),a===b);
```

A. `2,8 8,2 false`

B. `2,1 8,2 false`

C. `8,2 8,2 true`

D. `2,8 2,8 false`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
2,8 8,2 false
```

toSorted preserves the original ordering in a new outer array. The object that originally occupied a[1] is still shared.

**Why the other choices fail:**

- **B:** Copying the container does not detach objects.
- **C:** That would describe mutating sort.
- **D:** The new array initially places the n=1 object first.

**Rule/source:** [MDN reference][tosorted].

<!-- verify: {"kind": "js", "stdout": "2,8 8,2 false\n"} -->

</details>

<a id="wt073"></a>
### WT073 — Reversing a copy and appending

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const a=[1,2,3];const b=a.toReversed();b.push(4);
console.log(a.join(","),b.join(","));
```

A. `3,2,1 3,2,1,4`

B. `1,2,3 3,2,1,4`

C. `3,2,1,4 3,2,1,4`

D. `1,2,3 1,2,3,4`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
1,2,3 3,2,1,4
```

toReversed returns a reversed copy. A later structural mutation of b does not alter a.

**Why the other choices fail:**

- **A:** The original is not reversed.
- **C:** That would require a shared outer array.
- **D:** The copy is reversed.

**Rule/source:** [MDN reference][toreversed].

<!-- verify: {"kind": "js", "stdout": "1,2,3 3,2,1,4\n"} -->

</details>

<a id="wt074"></a>
### WT074 — Editing a copied array

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const a=[1,2,3];
const b=a.toSpliced(1,1,9);
console.log(a.join(","),b.join(","));
```

A. `1,2,3 1,9,3`

B. `1,9,3 2`

C. `1,9,3 1,9,3`

D. `1,2,3 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
1,2,3 1,9,3
```

toSpliced leaves a unchanged and returns a modified copy. Its result contract differs from splice’s removed-elements array.

**Why the other choices fail:**

- **B:** That is the mutating splice contract.
- **C:** The receiver is not modified.
- **D:** The copying method returns the resulting array.

**Rule/source:** [MDN reference][tospliced].

<!-- verify: {"kind": "js", "stdout": "1,2,3 1,9,3\n"} -->

</details>

<a id="wt075"></a>
### WT075 — Replacing a position in a copy

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const a=[1,2,3];const b=a.with(-1,9);
console.log(a.join(","),b.join(","));
```

A. `1,2,3 1,2,9`

B. `1,2,3 1,2,3,9`

C. `1,2,9 1,2,9`

D. `1,2,3 9,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
1,2,3 1,2,9
```

with interprets -1 relative to length and returns a copy with that entry replaced.

**Why the other choices fail:**

- **B:** It replaces rather than appends.
- **C:** with does not mutate the receiver.
- **D:** The negative index denotes the final entry.

**Rule/source:** [MDN reference][with].

<!-- verify: {"kind": "js", "stdout": "1,2,3 1,2,9\n"} -->

</details>

<a id="wt076"></a>
### WT076 — Negative relative index and property lookup

What is the complete printed output?

```javascript
const a=[4,5];
console.log(a.at(-1),a[-1]);
a[-1]=8;
console.log(a.at(-1),a[-1],a.length);
```

A. `5 undefined / 5 8 2`

B. `5 5 / 8 8 2`

C. `5 undefined / 8 8 3`

D. `undefined undefined / undefined 8 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
5 undefined
5 8 2
```

at uses relative indexing. Bracket -1 accesses the string property -1, which is not an array index and does not extend length.

**Why the other choices fail:**

- **B:** Negative bracket access is not relative indexing.
- **C:** The negative property does not replace the last indexed element or extend length.
- **D:** at accepts a negative relative index.

**Rule/source:** [MDN reference][at].

<!-- verify: {"kind": "js", "stdout": "5 undefined\n5 8 2\n"} -->

</details>

<a id="wt077"></a>
### WT077 — Two position-search directions

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const a=[2,4,2];
console.log(a.findIndex(x=>x===2),a.findLastIndex(x=>x===2));
```

A. `0 -1`

B. `0 0`

C. `0 2`

D. `2 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
0 2
```

The first method searches ascending indices; the second searches descending indices. Each returns an index, not the value.

**Why the other choices fail:**

- **A:** There is a matching final entry.
- **B:** findLastIndex starts at the end.
- **D:** findIndex returns position 0, not value 2.

**Rule/source:** [MDN reference][findlast].

<!-- verify: {"kind": "js", "stdout": "0 2\n"} -->

</details>

<a id="wt078"></a>
### WT078 — Selecting and transforming with one callback

What is the complete printed output?

```javascript
const a=[1,2,3];
console.log(a.filter(x=>x*2).join(","),a.map(x=>x*2).join(","));
```

A. `1,2,3 1,2,3`

B. `2,4,6 2,4,6`

C. `1,2,3 2,4,6`

D. `2 2,4,6`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
1,2,3 2,4,6
```

The nonzero predicate values are truthy, so filter keeps every original number. map instead collects the returned doubled numbers.

**Why the other choices fail:**

- **A:** map does collect the transformations.
- **B:** filter does not replace elements with predicate returns.
- **D:** The predicate is not a divisibility check.

**Rule/source:** [MDN reference][filter].

<!-- verify: {"kind": "js", "stdout": "1,2,3 2,4,6\n"} -->

</details>

## Sets and Maps

<a id="wt079"></a>
### WT079 — Constructing a Set from special numeric values

What is the complete printed output?

```javascript
const s=new Set([NaN,NaN,0,-0]);
console.log(s.size,s.has(NaN),s.has(-0));
```

A. `4 false true`

B. `2 false true`

C. `3 true true`

D. `2 true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2 true true
```

Set uses SameValueZero: both NaNs identify one value and both zeros identify another.

**Why the other choices fail:**

- **A:** Repeated values are combined under the Set equality rule.
- **B:** Set can recognize NaN.
- **C:** Signed zeros do not create separate entries.

**Rule/source:** [MDN reference][set].

<!-- verify: {"kind": "js", "stdout": "2 true true\n"} -->

</details>

<a id="wt080"></a>
### WT080 — Constructing a Set from object values

What is the complete printed output?

```javascript
const a={n:1};const s=new Set([a,a,{n:1}]);
console.log(s.size,s.has({n:1}),s.has(a));
```

A. `1 true true`

B. `2 false true`

C. `3 false true`

D. `2 true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
2 false true
```

The repeated a reference is one entry; the separate object literal is another. A fresh literal in has is neither stored object.

**Why the other choices fail:**

- **A:** Set does not compare object properties structurally.
- **C:** The same a reference is not stored twice.
- **D:** The has argument is a newly created object.

**Rule/source:** [MDN reference][set].

<!-- verify: {"kind": "js", "stdout": "2 false true\n"} -->

</details>

<a id="wt081"></a>
### WT081 — Two Set operations and their results

What is the complete printed output?

```javascript
const s=new Set([1]);
console.log(s.add(2)===s,s.delete(1),s.delete(1),s.size);
```

A. `false true false 1`

B. `true true false 1`

C. `true true false 2`

D. `true true true 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true true false 1
```

add returns the Set. delete reports whether it removed an existing entry; the second deletion finds nothing.

**Why the other choices fail:**

- **A:** add returns the receiver, not a new Set.
- **C:** The first deletion removed 1.
- **D:** An absent entry cannot be deleted again.

**Rule/source:** [MDN reference][set].

<!-- verify: {"kind": "js", "stdout": "true true false 1\n"} -->

</details>

<a id="wt082"></a>
### WT082 — Updating Set membership and iteration

What is the complete printed output?

```javascript
const s=new Set(["a","b"]);
s.add("a");s.delete("a");s.add("a");
console.log([...s].join(","));
```

A. `b,a`

B. `b`

C. `a,b`

D. `a,b,a`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
b,a
```

Adding an existing entry initially leaves its order unchanged. Removing it and inserting it anew puts it at the end.

**Why the other choices fail:**

- **B:** The final add inserts a again.
- **C:** The later re-insertion moves a to the end.
- **D:** Set does not retain duplicates.

**Rule/source:** [MDN reference][set].

<!-- verify: {"kind": "js", "stdout": "b,a\n"} -->

</details>

<a id="wt083"></a>
### WT083 — Inspecting Set callback arguments

What is the complete printed output?

```javascript
const seen=[];
new Set(["x","y"]).forEach((value,key)=>seen.push(value+":"+key));
console.log(seen.join(","));
```

A. `x:0,y:1`

B. `x:undefined,y:undefined`

C. `x:x,y:y`

D. `0:x,1:y`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
x:x,y:y
```

Set forEach supplies the value twice, followed by the Set. Its second parameter is not a numeric index.

**Why the other choices fail:**

- **A:** That imports the Array forEach argument contract.
- **B:** The second parameter is supplied.
- **D:** The first parameter is also the value.

**Rule/source:** [MDN reference][set-foreach].

<!-- verify: {"kind": "js", "stdout": "x:x,y:y\n"} -->

</details>

<a id="wt084"></a>
### WT084 — Inspecting two collection sizes

What is the complete printed output?

```javascript
const s=new Set([1,1,2]);
console.log(s.size,s.length,Array.from(s).length);
```

A. `2 undefined 3`

B. `2 2 2`

C. `3 undefined 3`

D. `2 undefined 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2 undefined 2
```

size counts Set entries. A normal Set has no array length property; conversion yields an array of two values.

**Why the other choices fail:**

- **A:** Array.from iterates the unique stored entries.
- **B:** Set does not expose array length.
- **C:** Duplicate 1 is combined.

**Rule/source:** [MDN reference][set].

<!-- verify: {"kind": "js", "stdout": "2 undefined 2\n"} -->

</details>

<a id="wt085"></a>
### WT085 — Two Map keys with similar text

What is the complete printed output?

```javascript
const m=new Map();m.set(1,"number");m.set("1","string");
console.log(m.size,m.get(1),m.get("1"));
```

A. `2 number string`

B. `1 number number`

C. `1 string string`

D. `2 string number`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
2 number string
```

Map does not coerce its keys into property strings. These keys have different types and remain distinct.

**Why the other choices fail:**

- **B:** The string key does not overwrite the numeric key.
- **C:** That resembles ordinary object property-key coercion.
- **D:** Each lookup retains its original key type.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "2 number string\n"} -->

</details>

<a id="wt086"></a>
### WT086 — Two Map lookups and presence checks

What is the complete printed output?

```javascript
const m=new Map([["x",undefined]]);
console.log(m.get("x"),m.get("y"),m.has("x"),m.has("y"));
```

A. `undefined null true false`

B. `undefined undefined true false`

C. `undefined undefined false false`

D. `undefined undefined true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
undefined undefined true false
```

Both lookups produce undefined, but has distinguishes a present association with that value from an absent association.

**Why the other choices fail:**

- **A:** Missing get returns undefined.
- **C:** The x key is present.
- **D:** The y key was never inserted.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "undefined undefined true false\n"} -->

</details>

<a id="wt087"></a>
### WT087 — Updating an existing Map key

What is the complete printed output?

```javascript
const m=new Map([["a",1],["b",2]]);
m.set("a",9);
console.log([...m.keys()].join(","),m.size,m.get("a"));
```

A. `a,b 2 1`

B. `a,b,a 3 9`

C. `a,b 2 9`

D. `b,a 2 9`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
a,b 2 9
```

Updating an existing key changes its value without appending a new key or moving its insertion position.

**Why the other choices fail:**

- **A:** The value is replaced.
- **B:** The existing key is reused.
- **D:** A value update is not deletion and re-insertion.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "a,b 2 9\n"} -->

</details>

<a id="wt088"></a>
### WT088 — Removing and restoring a Map key

What is the complete printed output?

```javascript
const m=new Map([["a",1],["b",2]]);
m.delete("a");m.set("a",3);
console.log([...m.keys()].join(","));
```

A. `b`

B. `b,a`

C. `a,b`

D. `a,b,a`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
b,a
```

Deleting removes the earlier association; setting the absent key creates a new insertion at the end.

**Why the other choices fail:**

- **A:** The final set inserts a again.
- **C:** The old insertion position no longer exists.
- **D:** The deleted entry is not retained.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "b,a\n"} -->

</details>

<a id="wt089"></a>
### WT089 — Changing an object used as a key

What is the complete printed output?

```javascript
const key={id:1};const m=new Map([[key,"saved"]]);
key.id=2;
console.log(m.get(key),m.get({id:2}),m.size);
```

A. `saved saved 1`

B. `undefined saved 1`

C. `saved undefined 1`

D. `saved undefined 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
saved undefined 1
```

The object’s identity remains unchanged despite property mutation. A new object with matching properties is a different key.

**Why the other choices fail:**

- **A:** Fresh matching objects are not identical keys.
- **B:** Map keys do not relocate by structural contents.
- **D:** Changing the stored key object’s property does not insert another association.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "saved undefined 1\n"} -->

</details>

<a id="wt090"></a>
### WT090 — Inspecting Map callback arguments

What is the complete printed output?

```javascript
const a=[];
new Map([["x",5]]).forEach((first,second)=>a.push(first+":"+second));
console.log(a.join(","));
```

A. `5:x`

B. `x:0`

C. `5:0`

D. `x:5`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
5:x
```

Map forEach uses (value,key,map), unlike iteration entries which are [key,value].

**Why the other choices fail:**

- **B:** Neither argument contract matches that output.
- **C:** The second argument is the key, not an index.
- **D:** That is entry-pair order, not callback argument order.

**Rule/source:** [MDN reference][map-foreach].

<!-- verify: {"kind": "js", "stdout": "5:x\n"} -->

</details>

<a id="wt091"></a>
### WT091 — Destructuring Map iteration results

What is the complete printed output?

```javascript
const m=new Map([["x",5],["y",6]]);
const a=[];for(const [k,v] of m)a.push(k+v);
console.log(a.join(","));
```

A. `x5,y6`

B. `x,y`

C. `5x,6y`

D. `0x,1y`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
x5,y6
```

The default Map iterator yields [key,value] pairs in insertion order.

**Why the other choices fail:**

- **B:** Both destructured values contribute.
- **C:** Entry order is key first.
- **D:** The keys are not invented numeric indices.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "x5,y6\n"} -->

</details>

<a id="wt092"></a>
### WT092 — A property assignment on a Map object

What is the complete printed output?

```javascript
const m=new Map();
m["x"]=4;
console.log(m.get("x"),m.has("x"),m["x"],m.size);
```

A. `4 false 4 0`

B. `4 true 4 1`

C. `undefined false 4 0`

D. `undefined false undefined 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
undefined false 4 0
```

Bracket assignment creates an ordinary property on the Map object; it does not modify the Map’s key/value entries.

**Why the other choices fail:**

- **A:** get consults entries, not the ordinary x property.
- **B:** Only set changes this collection association.
- **D:** The ordinary x property does exist.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "undefined false 4 0\n"} -->

</details>

<a id="wt093"></a>
### WT093 — Map construction with repeated keys

What is the complete printed output?

```javascript
const m=new Map([["a",1],["b",2],["a",3]]);
console.log(m.size,[...m.keys()].join(","),[...m.values()].join(","));
```

A. `2 a,b 3,2`

B. `2 b,a 2,3`

C. `2 a,b 1,2`

D. `3 a,b,a 1,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
2 a,b 3,2
```

Repeated insertion updates a’s value while retaining its original key position.

**Why the other choices fail:**

- **B:** Overwriting a does not move its position.
- **C:** The later value for a wins.
- **D:** Map cannot retain duplicate keys as separate associations.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "2 a,b 3,2\n"} -->

</details>

<a id="wt094"></a>
### WT094 — Updating a value after Map construction

What is the complete printed output?

```javascript
const a=new Map([["x",{n:1}]]);
const b=new Map(a);
b.get("x").n=7;b.set("y",2);
console.log(a.size,b.size,a.get("x").n,a===b);
```

A. `2 2 7 false`

B. `1 2 1 false`

C. `1 2 7 false`

D. `2 2 7 true`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
1 2 7 false
```

The entry container is new, but the value reference is shared. Adding y to b does not add it to a.

**Why the other choices fail:**

- **A:** b’s structural insertion does not affect a.
- **B:** Constructing from entries does not deeply copy values.
- **D:** The Maps are different containers.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "1 2 7 false\n"} -->

</details>

<a id="wt095"></a>
### WT095 — Map insertion with special numeric keys

What is the complete printed output?

```javascript
const m=new Map([[NaN,1],[NaN,2],[0,3],[-0,4]]);
console.log(m.size,m.get(NaN),m.get(0));
```

A. `3 2 3`

B. `4 undefined 3`

C. `2 1 3`

D. `2 2 4`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2 2 4
```

SameValueZero combines repeated NaN keys and signed-zero keys. Each later insertion updates the existing value.

**Why the other choices fail:**

- **A:** The zero keys also combine and update.
- **B:** Map key comparison is not strict NaN equality with separate zeros.
- **C:** The later values replace the earlier ones.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "2 2 4\n"} -->

</details>

<a id="wt096"></a>
### WT096 — Serializing a Map and its entries

Choose the pair with both the **current output** and a correct repair for this goal: round-trip the shown string-key Map through JSON while reconstructing a Map with its entry intact. The printed output refers to the original code below, before repair.

```javascript
const m=new Map([["x",1]]);
console.log(JSON.stringify(m),JSON.stringify([...m]));
```

A. `{} [["x",1]] ; serialize m, parse it, then pass that object to new Map`

B. `{} [["x",1]] ; serialize [...m], parse it, then pass those entries to new Map`

C. `{} [["x",1]] ; serialize [...m], then use JSON.parse alone as the restored Map`

D. `{} [["x",1]] ; serialize [...m.keys()], then pass the parsed keys to new Map`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
{} [["x",1]]
```

Default JSON serialization sees ordinary enumerable own properties, not the internal Map entries. Converting entries to an array supplies JSON-compatible structure. The entry-array representation works for the shown JSON-compatible key/value data; it is not a universal identity-preserving Map codec.

**Why the other choices fail:**

- **A:** Default serialization is {}, and the parsed ordinary object is not an iterable of key/value pairs.
- **C:** Parsing creates an array of entry arrays, not a Map; get/has are unavailable on that result.
- **D:** Keys alone are not key/value entry pairs and omit the associated value.

**Correct decision:** `{} [["x",1]] ; serialize [...m], parse it, then pass those entries to new Map`

**Repair code:**

```javascript
const m=new Map([["x",1]]);
const restored=new Map(JSON.parse(JSON.stringify([...m])));
console.log(restored instanceof Map,restored.get("x"));
```

**Repair output:**

```text
true 1
```

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{} [[\"x\",1]]\n", "choice": "{} [[\"x\",1]] ; serialize [...m], parse it, then pass those entries to new Map", "repair": {"code": "const m=new Map([[\"x\",1]]);\nconst restored=new Map(JSON.parse(JSON.stringify([...m])));\nconsole.log(restored instanceof Map,restored.get(\"x\"));", "stdout": "true 1\n"}} -->

</details>

## JSON

<a id="wt097"></a>
### WT097 — Parsing three JSON roots

What is the complete printed output?

```javascript
const a=JSON.parse("7"),b=JSON.parse("null");
console.log(typeof a,b,JSON.parse('"ok"'));
```

A. `string null ok`

B. `number null ok`

C. `SyntaxError`

D. `number undefined ok`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
number null ok
```

Valid JSON text need not start with an object or array. Numeric, null and string roots are permitted.

**Why the other choices fail:**

- **A:** Parsing numerical text produces a number.
- **C:** All three root values are valid JSON.
- **D:** JSON null maps to null.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "number null ok\n"} -->

</details>

<a id="wt098"></a>
### WT098 — Parsing two object-shaped texts

What is the complete printed output?

```javascript
for(const s of ['{"x":1}','{x:1}','{"x":1,}']) {
  try { console.log(JSON.parse(s).x); }
  catch(e) { console.log(e.name); }
}
```

A. `1 / 1 / 1`

B. `1 / SyntaxError / 1`

C. `SyntaxError / SyntaxError / SyntaxError`

D. `1 / SyntaxError / SyntaxError`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1
SyntaxError
SyntaxError
```

JSON requires quoted property names and disallows trailing commas. JavaScript object-literal permissiveness does not transfer to JSON text.

**Why the other choices fail:**

- **A:** The latter two texts violate JSON syntax.
- **B:** Trailing commas are not permitted.
- **C:** The first text is valid.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "1\nSyntaxError\nSyntaxError\n"} -->

</details>

<a id="wt099"></a>
### WT099 — Serializing unsupported values in two containers

What is the complete printed output?

```javascript
console.log(JSON.stringify({a:undefined,b:()=>1,c:2}));
console.log(JSON.stringify([undefined,()=>1,2]));
```

A. `TypeError`

B. `{"c":2} / [2]`

C. `{"c":2} / [null,null,2]`

D. `{"a":null,"b":null,"c":2} / [null,null,2]`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
{"c":2}
[null,null,2]
```

Unsupported property values are omitted from ordinary objects; unsupported indexed values become null in arrays to preserve positions.

**Why the other choices fail:**

- **A:** These values do not by themselves make stringify throw.
- **B:** The array positions are preserved as null.
- **D:** The object properties are omitted.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"c\":2}\n[null,null,2]\n"} -->

</details>

<a id="wt100"></a>
### WT100 — Two top-level serialization calls

What is the complete printed output?

```javascript
const s=JSON.stringify(undefined);
console.log(typeof s,s);
console.log(JSON.stringify(null));
```

A. `TypeError only`

B. `undefined undefined / null`

C. `string undefined / null`

D. `string null / null`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
undefined undefined
null
```

stringify(undefined) returns the JavaScript value undefined, not the string undefined. null has valid JSON text.

**Why the other choices fail:**

- **A:** This input returns undefined rather than throwing.
- **C:** The first result is not a string.
- **D:** undefined is not serialized as top-level null.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "undefined undefined\nnull\n"} -->

</details>

<a id="wt101"></a>
### WT101 — Serializing unusual numeric values

What is the complete printed output?

```javascript
console.log(JSON.stringify({a:NaN,b:Infinity,c:-0}));
console.log(JSON.stringify([NaN,Infinity]));
```

A. `{"a":null,"b":null,"c":0} / [null,null]`

B. `{"a":NaN,"b":Infinity,"c":-0} / [NaN,Infinity]`

C. `TypeError`

D. `{} / []`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
{"a":null,"b":null,"c":0}
[null,null]
```

JSON has no NaN or infinity numerical literals, so stringify substitutes null. Its zero representation loses negative-zero distinction.

**Why the other choices fail:**

- **B:** Those numerical tokens are not valid JSON.
- **C:** They do not trigger the BigInt/cycle error contract.
- **D:** These numeric values are converted rather than omitted.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"a\":null,\"b\":null,\"c\":0}\n[null,null]\n"} -->

</details>

<a id="wt102"></a>
### WT102 — Serializing a BigInt with two policies

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
try { console.log(JSON.stringify({n:2n})); }
catch(e) { console.log(e.name); }
console.log(JSON.stringify({n:2n},(k,v)=>typeof v==="bigint"?v.toString():v));
```

A. `TypeError / {"n":2}`

B. `{"n":null} / {"n":"2"}`

C. `{"n":2} / {"n":"2"}`

D. `TypeError / {"n":"2"}`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
TypeError
{"n":"2"}
```

With no custom BigInt serialization hook, default stringify rejects BigInt. The replacer explicitly converts this value to a string, retaining a policy-defined representation.

**Why the other choices fail:**

- **A:** The replacer returns a string, not a number.
- **B:** The default is an error, not a null substitution.
- **C:** Default stringify does not silently downcast BigInt.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "TypeError\n{\"n\":\"2\"}\n"} -->

</details>

<a id="wt103"></a>
### WT103 — Two object graphs for serialization

What is the complete printed output?

```javascript
const child={n:1};
console.log(JSON.stringify({a:child,b:child}));
const x={};x.self=x;
try { JSON.stringify(x); } catch(e) { console.log(e.name); }
```

A. `{"a":{"n":1},"b":{"n":1}} only`

B. `{"a":{"n":1},"b":{"n":1}} / TypeError`

C. `TypeError only`

D. `{"a":{"n":1},"b":null} / TypeError`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
{"a":{"n":1},"b":{"n":1}}
TypeError
```

Sharing a child between two acyclic paths is serializable. A reference back to an active ancestor creates a cycle and fails default serialization.

**Why the other choices fail:**

- **A:** The second graph is genuinely circular.
- **C:** The first graph is shared but acyclic.
- **D:** Repeated references are not automatically replaced by null.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"a\":{\"n\":1},\"b\":{\"n\":1}}\nTypeError\n"} -->

</details>

<a id="wt104"></a>
### WT104 — Object comparisons after a JSON round trip

What is the complete printed output?

```javascript
const x={n:1};const a={p:x,q:x};
const b=JSON.parse(JSON.stringify(a));
console.log(a.p===a.q,b.p===b.q,b.p.n);
```

A. `true true 1`

B. `true false undefined`

C. `false false 1`

D. `true false 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
true false 1
```

The JSON tree repeats content but does not encode identity sharing. Parsing creates separate object instances for the two positions.

**Why the other choices fail:**

- **A:** JSON has no reference-identity mechanism.
- **B:** The data property itself is preserved.
- **C:** The original p and q share x.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "true false 1\n"} -->

</details>

<a id="wt105"></a>
### WT105 — Inspecting a parsed date representation

What is the complete printed output?

```javascript
const d=new Date("2020-01-02T00:00:00.000Z");
const x=JSON.parse(JSON.stringify({d}));
console.log(typeof x.d,x.d instanceof Date,x.d);
```

A. `string true 2020-01-02T00:00:00.000Z`

B. `string false 2020-01-02T00:00:00.000Z`

C. `object true 2020-01-02T00:00:00.000Z`

D. `object false [object Object]`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
string false 2020-01-02T00:00:00.000Z
```

Date’s normal toJSON returns an ISO string. Parsing does not recreate a Date unless explicit revival is applied.

**Why the other choices fail:**

- **A:** A string is not a Date instance.
- **C:** The class is not encoded automatically.
- **D:** The default Date hook provides string content.

**Rule/source:** [MDN reference][date-json].

<!-- verify: {"kind": "js", "stdout": "string false 2020-01-02T00:00:00.000Z\n"} -->

</details>

<a id="wt106"></a>
### WT106 — Transforming a parsed property with a reviver

What is the complete printed output?

```javascript
const x=JSON.parse('{"a":1,"b":2}',(k,v)=>k==="a"?undefined:v);
console.log(Object.keys(x).join(","),x.a,x.b);
```

A. `b undefined 2`

B. `a,b 1 2`

C. `a,b undefined 2`

D. `b null 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
b undefined 2
```

Returning undefined from the reviver for a removes that property. It is not retained as an assigned undefined property.

**Why the other choices fail:**

- **B:** The reviver’s return value affects the parsed result.
- **C:** The reviver deletes a rather than assigning undefined.
- **D:** Absence reads undefined.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "b undefined 2\n"} -->

</details>

<a id="wt107"></a>
### WT107 — A reviver and the empty key

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const x=JSON.parse('{"a":1}',(k,v)=>k===""?undefined:v);
console.log(x);
```

A. `null`

B. `undefined`

C. `[object Object]`

D. `SyntaxError`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
undefined
```

The reviver is called for the root with an empty key. Returning undefined there replaces the whole parsed result with undefined.

**Why the other choices fail:**

- **A:** undefined is not transformed into null.
- **C:** The root return value is not ignored.
- **D:** The input is valid; the reviver controls the result.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "undefined\n"} -->

</details>

<a id="wt108"></a>
### WT108 — Combining toJSON and a replacer

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const x={toJSON(){return {n:2};},raw:9};
console.log(JSON.stringify(x,(k,v)=>k==="n"?v*3:v));
```

A. `{"raw":9}`

B. `{"n":2}`

C. `{"n":6}`

D. `{"n":6,"raw":9}`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
{"n":6}
```

The object’s toJSON supplies the serialization value first. The replacer then transforms its n property; raw is not in that supplied value.

**Why the other choices fail:**

- **A:** The toJSON hook is not ignored.
- **B:** The replacer does transform n.
- **D:** raw is absent from the hook’s result.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"n\":6}\n"} -->

</details>

<a id="wt109"></a>
### WT109 — A replacer list in a nested object

What is the complete printed output?

```javascript
console.log(JSON.stringify({a:1,b:{a:2,c:3}},["a","b"]));
```

A. `{"a":1,"b":{}}`

B. `{"a":1}`

C. `{"a":1,"b":{"a":2,"c":3}}`

D. `{"a":1,"b":{"a":2}}`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
{"a":1,"b":{"a":2}}
```

The property list selects eligible object keys throughout serialization, not only at the root. c is excluded from the nested object.

**Why the other choices fail:**

- **A:** The nested a also appears in the allowed list.
- **B:** b is selected and its nested a is selected.
- **C:** The list is not root-only.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"a\":1,\"b\":{\"a\":2}}\n"} -->

</details>

<a id="wt110"></a>
### WT110 — A replacer returning undefined

What is the complete printed output?

```javascript
console.log(JSON.stringify({a:1,b:2},(k,v)=>k==="a"?undefined:v));
console.log(JSON.stringify([1,2],(k,v)=>k==="0"?undefined:v));
```

A. `{"a":null,"b":2} / [null,2]`

B. `{"b":2} / [null,2]`

C. `undefined / undefined`

D. `{"b":2} / [2]`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
{"b":2}
[null,2]
```

A replacement undefined follows the same position-sensitive serialization rules: omit the ordinary property, preserve the array slot as null.

**Why the other choices fail:**

- **A:** Object a is omitted.
- **C:** The root replacer return remains the original structure.
- **D:** The indexed slot is preserved.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"b\":2}\n[null,2]\n"} -->

</details>

<a id="wt111"></a>
### WT111 — Two array states during JSON serialization

What is the complete printed output?

```javascript
const a=[,undefined];
console.log(0 in a,1 in a,JSON.stringify(a));
```

A. `true true [null,null]`

B. `false false [null,null]`

C. `false true [null,null]`

D. `false true [null]`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
false true [null,null]
```

The array still distinguishes absent and present indices, but JSON serialization collapses both to null at these positions.

**Why the other choices fail:**

- **A:** Serialization does not turn the original hole into a property.
- **B:** Index 1 is explicitly assigned.
- **D:** Both positions remain represented.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "false true [null,null]\n"} -->

</details>

<a id="wt112"></a>
### WT112 — Parsing a function-shaped string

What is the complete printed output?

```javascript
const x=JSON.parse('{"f":"() => 7"}');
console.log(typeof x.f);
try { x.f(); } catch(e) { console.log(e.name); }
```

A. `function / TypeError`

B. `string / TypeError`

C. `string / SyntaxError`

D. `function / 7`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
string
TypeError
```

The quoted function-like text remains a string. JSON.parse does not compile it into a callable function.

**Why the other choices fail:**

- **A:** The parsed property is not a function.
- **C:** The JSON is valid; the attempted call fails by type.
- **D:** Parsing does not execute JavaScript source text.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "string\nTypeError\n"} -->

</details>

<a id="wt113"></a>
### WT113 — Comparing a numeric value after a JSON round trip

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const x=JSON.parse(JSON.stringify(-0));
console.log(Object.is(x,-0),Object.is(x,0));
```

A. `false false`

B. `false true`

C. `true true`

D. `true false`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false true
```

stringify represents -0 as the JSON text 0. Parsing that text yields positive zero.

**Why the other choices fail:**

- **A:** The result is still a numerical zero.
- **C:** Object.is does not identify both signed zeros alike.
- **D:** The signed-zero distinction was lost.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "false true\n"} -->

</details>

<a id="wt114"></a>
### WT114 — An object with string and symbol keys

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
const k=Symbol("id");const a={[k]:1,x:2};
console.log(Object.getOwnPropertySymbols(a).length,JSON.stringify(a));
```

A. `1 {"id":1,"x":2}`

B. `0 {"x":2}`

C. `1 {"x":2}`

D. `1 {}`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
1 {"x":2}
```

The symbol-keyed property exists, but default JSON object serialization considers enumerable string-keyed properties.

**Why the other choices fail:**

- **A:** A symbol description is not a serialized property name.
- **B:** The symbol property exists on the original object.
- **D:** The ordinary x property is serialized.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "1 {\"x\":2}\n"} -->

</details>

## Callbacks, Promises and async/await

<a id="wt115"></a>
### WT115 — Passing a callback to a local operation

What is the complete printed output?

```javascript
function use(cb){console.log("A");cb();console.log("C");}
use(()=>console.log("B"));console.log("D");
```

A. `B / A / C / D`

B. `A / B / C / D`

C. `A / C / B / D`

D. `A / C / D / B`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
A
B
C
D
```

This supplied use function calls its callback synchronously. Callback describes a function’s role, not a timing guarantee.

**Why the other choices fail:**

- **A:** Passing the arrow does not call it before use.
- **C:** The callback executes before C.
- **D:** Nothing in use schedules deferred execution.

**Rule/source:** [MDN reference][callback].

<!-- verify: {"kind": "js", "stdout": "A\nB\nC\nD\n"} -->

</details>

<a id="wt116"></a>
### WT116 — Evaluating a callback factory argument

What is the complete printed output?

```javascript
function make(){console.log("made");return ()=>console.log("run");}
function use(cb){console.log("use");cb();}
use(make());
```

A. `made / run / use`

B. `made / use / TypeError`

C. `use / made / run`

D. `made / use / run`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
made
use
run
```

make is invoked while evaluating the argument and returns the callback actually passed to use. Calling during argument evaluation is valid here because the returned value is deliberately callable.

**Why the other choices fail:**

- **A:** make returns the arrow without running it.
- **B:** make deliberately returns a function, not undefined.
- **C:** Arguments are evaluated before use is invoked.

**Rule/source:** [MDN reference][callback].

<!-- verify: {"kind": "js", "stdout": "made\nuse\nrun\n"} -->

</details>

<a id="wt117"></a>
### WT117 — An error-first operation with two completion sites

Choose the pair with both the **current output** and a correct repair for this goal: report exactly one completion when the shown error exists. The printed output refers to the original code below, before repair.

```javascript
function work(cb){
  const error=new Error("bad");
  if(error)cb(error);
  cb(null,7);
}
work((err,value)=>console.log(err?"error":value));
```

A. `error / 7 ; return from the callback body after logging error`

B. `error / 7 ; use if(error) cb(error); else cb(error), then keep cb(null,7)`

C. `error / 7 ; use if(error) return cb(error)`

D. `error / 7 ; wrap the first cb(error) in Promise.resolve(...) without returning`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
error
7
```

Calling cb(error) reports an outcome but does not exit work. A return after that call prevents the unintended second completion. Return from the function that would perform the second completion, not just from its callback.

**Why the other choices fail:**

- **A:** That exits the callback only; work resumes and invokes the callback again.
- **B:** Neither branch returns from work, so the later success callback still runs.
- **D:** Wrapping its return value does not exit work or suppress the second invocation.

**Correct decision:** `error / 7 ; use if(error) return cb(error)`

**Repair code:**

```javascript
function work(cb){
 const error=new Error("bad");
 if(error)return cb(error);
 cb(null,7);
}
work((err,value)=>console.log(err?"error":value));
```

**Repair output:**

```text
error
```

**Rule/source:** [MDN reference][callback].

<!-- verify: {"kind": "js", "stdout": "error\n7\n", "choice": "error / 7 ; use if(error) return cb(error)", "repair": {"code": "function work(cb){\n const error=new Error(\"bad\");\n if(error)return cb(error);\n cb(null,7);\n}\nwork((err,value)=>console.log(err?\"error\":value));", "stdout": "error\n"}} -->

</details>

<a id="wt118"></a>
### WT118 — Error handling around a scheduled callback

What is the complete printed output?

```javascript
try {
  setTimeout(()=>{
    try { throw new Error("later"); }
    catch(e){console.log("inner");}
  },0);
} catch(e){console.log("outer");}
console.log("scheduled");
```

A. `outer / scheduled`

B. `inner / scheduled`

C. `scheduled / inner`

D. `scheduled / outer`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
scheduled
inner
```

The scheduling call finishes before the timer callback runs. The later throw is handled by the callback’s own catch.

**Why the other choices fail:**

- **A:** The outer catch does not surround the callback’s later execution.
- **B:** The callback is deferred.
- **D:** The callback’s own catch handles the throw.

**Rule/source:** [MDN reference][timeout].

<!-- verify: {"kind": "js", "stdout": "scheduled\ninner\n"} -->

</details>

<a id="wt119"></a>
### WT119 — Three function levels and one return

What is the complete printed output?

```javascript
function read(cb){cb(5);}
function outer(){read(x=>x*2);}
console.log(outer());
```

A. `Promise`

B. `5`

C. `10`

D. `undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
undefined
```

The callback returns 10 to read, which ignores it. outer also has no return; callback return values do not automatically propagate through other functions.

**Why the other choices fail:**

- **A:** No async function or Promise contract is supplied.
- **B:** The supplied callback receives 5, but outer does not return it.
- **C:** No enclosing function returns the callback’s result.

**Rule/source:** [MDN reference][callback].

<!-- verify: {"kind": "js", "stdout": "undefined\n"} -->

</details>

<a id="wt120"></a>
### WT120 — A reaction that queues another microtask

What is the complete printed output?

```javascript
console.log("S");
Promise.resolve().then(()=>{
  console.log("P");queueMicrotask(()=>console.log("Q"));
});
setTimeout(()=>console.log("T"),0);
console.log("E");
```

A. `S / P / Q / E / T`

B. `S / E / P / T / Q`

C. `S / E / T / P / Q`

D. `S / E / P / Q / T`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
S
E
P
Q
T
```

Synchronous code finishes first. The Promise reaction then queues another microtask, which is drained before the later timer task.

**Why the other choices fail:**

- **A:** Promise reactions do not interrupt current synchronous work.
- **B:** The newly queued microtask runs before the next timer task.
- **C:** The microtask checkpoint precedes that timer task.

**Rule/source:** [MDN reference][microtasks].

<!-- verify: {"kind": "js", "stdout": "S\nE\nP\nQ\nT\n"} -->

</details>

<a id="wt121"></a>
### WT121 — Logging around Promise construction

What is the complete printed output?

```javascript
console.log("A");
const p=new Promise(resolve=>{console.log("B");resolve("C");});
p.then(console.log);
console.log("D");
```

A. `A / D / B / C`

B. `A / B / C / D`

C. `A / B / D / C`

D. `B / A / D / C`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
A
B
D
C
```

Construction invokes the executor synchronously. The registered fulfillment reaction runs after the current synchronous work.

**Why the other choices fail:**

- **A:** The executor is not deferred.
- **B:** The reaction is deferred even though p is fulfilled.
- **D:** A is printed before construction.

**Rule/source:** [MDN reference][promise].

<!-- verify: {"kind": "js", "stdout": "A\nB\nD\nC\n"} -->

</details>

<a id="wt122"></a>
### WT122 — Resolving and continuing an executor

What is the complete printed output?

```javascript
new Promise((resolve,reject)=>{
  resolve(1);console.log("after");reject(2);
}).then(x=>console.log(x));
console.log("sync");
```

A. `after / sync / 1`

B. `after / 1 / sync`

C. `sync / 1`

D. `after / sync / 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
after
sync
1
```

resolve does not exit the executor. The first resolution locks the outcome; the subsequent reject does not replace it.

**Why the other choices fail:**

- **B:** The fulfillment reaction runs asynchronously.
- **C:** The executor continues and prints after.
- **D:** The later reject cannot override the earlier resolution.

**Rule/source:** [MDN reference][promise].

<!-- verify: {"kind": "js", "stdout": "after\nsync\n1\n"} -->

</details>

<a id="wt123"></a>
### WT123 — Resolving and throwing inside an executor

What is the complete printed output?

```javascript
new Promise(resolve=>{
  resolve(4);throw new Error("late");
}).then(x=>console.log(x),e=>console.log(e.message));
```

A. `late`

B. `4`

C. `Unhandled exception`

D. `4 / late`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
4
```

The executor’s exception attempts rejection, but resolution has already locked the fulfilled outcome.

**Why the other choices fail:**

- **A:** The throw cannot undo the earlier resolution.
- **C:** The constructor handles the executor exception; the settled outcome remains 4.
- **D:** This Promise does not settle twice.

**Rule/source:** [MDN reference][promise].

<!-- verify: {"kind": "js", "stdout": "4\n"} -->

</details>

<a id="wt124"></a>
### WT124 — Identity and results around then

What is the complete printed output?

```javascript
const p=Promise.resolve(2);
const r=p.then(x=>x+3);
console.log(p===r);
r.then(console.log);
```

A. `true / 5`

B. `false / 5`

C. `5 / false`

D. `false / 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false
5
```

then immediately returns a different Promise; its eventual value follows the handler’s returned 5.

**Why the other choices fail:**

- **A:** The original Promise is not mutated into the chain result.
- **C:** The identity read is synchronous; the reaction is later.
- **D:** The handler’s return determines the result.

**Rule/source:** [MDN reference][then].

<!-- verify: {"kind": "js", "stdout": "false\n5\n"} -->

</details>

<a id="wt125"></a>
### WT125 — A non-function then argument

What is the complete printed output?

```javascript
Promise.resolve(3).then(9).then(console.log);
```

A. `undefined`

B. `3`

C. `9`

D. `TypeError`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
3
```

A non-callable fulfillment handler is replaced by the pass-through behavior. It does not overwrite the value with 9.

**Why the other choices fail:**

- **A:** The fulfillment value passes through.
- **C:** A literal is not a callback returning that literal.
- **D:** A non-function handler is ignored, not called.

**Rule/source:** [MDN reference][then].

<!-- verify: {"kind": "js", "stdout": "3\n"} -->

</details>

<a id="wt126"></a>
### WT126 — A throw and two error-handler positions

Choose the pair with both the **current output** and a correct repair for this goal: handle the fulfilled handler's thrown Error X with a handler that prints handled X. The printed output refers to the original code below, before repair.

```javascript
Promise.resolve(1)
 .then(()=>{throw new Error("X");},()=>console.log("same"))
 .catch(e=>console.log("next",e.message));
```

A. `next X ; attach .catch(e => console.log("handled",e.message)) to the Promise returned by then`

B. `next X ; attach that handler only to the original Promise.resolve(1)`

C. `next X ; put that handler only in the second argument of the same then`

D. `next X ; use .finally(e => console.log("handled",e.message))`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
next X
```

The sibling rejection handler responds to rejection of the incoming Promise. The fulfilled handler’s throw rejects the new returned Promise, handled by the following catch. Place error handling downstream of the stage that can fail. A sibling failure handler cannot observe its partner's newly produced rejection.

**Why the other choices fail:**

- **B:** The original Promise remains fulfilled; the handler throw rejects a different returned Promise.
- **C:** The same then rejection handler observes the incoming Promise, which is fulfilled in this scenario.
- **D:** finally receives no rejection argument; reading e.message would throw and cleanup would not recover X.

**Correct decision:** `next X ; attach .catch(e => console.log("handled",e.message)) to the Promise returned by then`

**Repair code:**

```javascript
Promise.resolve(1)
 .then(()=>{throw new Error("X");})
 .catch(e=>console.log("handled",e.message));
```

**Repair output:**

```text
handled X
```

**Rule/source:** [MDN reference][then].

<!-- verify: {"kind": "js", "stdout": "next X\n", "choice": "next X ; attach .catch(e => console.log(\"handled\",e.message)) to the Promise returned by then", "repair": {"code": "Promise.resolve(1)\n .then(()=>{throw new Error(\"X\");})\n .catch(e=>console.log(\"handled\",e.message));", "stdout": "handled X\n"}} -->

</details>

<a id="wt127"></a>
### WT127 — A catch return and a following handler

What is the complete printed output?

```javascript
Promise.reject("bad").catch(()=>7).then(x=>console.log(x+1));
```

A. `No output`

B. `8`

C. `7`

D. `bad`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
8
```

Returning normally from catch changes the downstream path to fulfillment with 7; the next fulfillment handler receives it.

**Why the other choices fail:**

- **A:** The downstream fulfillment handler does run after recovery.
- **C:** The next handler adds 1.
- **D:** The catch replaced the rejection with a successful result.

**Rule/source:** [MDN reference][catch].

<!-- verify: {"kind": "js", "stdout": "8\n"} -->

</details>

<a id="wt128"></a>
### WT128 — Throwing from a rejection handler

What is the complete printed output?

```javascript
Promise.reject("A").catch(e=>{throw e+"B";})
 .then(()=>console.log("ok"))
 .catch(console.log);
```

A. `AB / ok`

B. `ok`

C. `AB`

D. `A`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
AB
```

Throwing from the first catch rejects the returned Promise with AB. The intervening fulfillment handler is skipped.

**Why the other choices fail:**

- **A:** A skipped fulfillment handler does not run after the later catch.
- **B:** The catch did not return normally.
- **D:** The thrown reason was changed to AB.

**Rule/source:** [MDN reference][catch].

<!-- verify: {"kind": "js", "stdout": "AB\n"} -->

</details>

<a id="wt129"></a>
### WT129 — Returning a value from cleanup

What is the complete printed output?

```javascript
Promise.resolve(5).finally(()=>9).then(console.log);
```

A. `undefined`

B. `5 / 9`

C. `5`

D. `9`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
5
```

A normal finally callback completion preserves the prior fulfillment value; its returned 9 is not a transformation.

**Why the other choices fail:**

- **A:** The earlier fulfillment value is retained.
- **B:** Only the final log prints; finally itself does not log.
- **D:** That would be a transforming then callback.

**Rule/source:** [MDN reference][finally].

<!-- verify: {"kind": "js", "stdout": "5\n"} -->

</details>

<a id="wt130"></a>
### WT130 — Two rejection reasons around cleanup

What is the complete printed output?

```javascript
Promise.reject("original")
 .finally(()=>Promise.reject("cleanup"))
 .catch(console.log);
```

A. `cleanup`

B. `original / cleanup`

C. `original`

D. `undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
cleanup
```

A rejection returned from finally rejects its returned Promise with the cleanup reason, replacing the earlier outcome.

**Why the other choices fail:**

- **B:** The one attached catch receives the final rejection.
- **C:** A failing cleanup can replace the earlier outcome.
- **D:** The returned rejecting Promise is adopted.

**Rule/source:** [MDN reference][finally].

<!-- verify: {"kind": "js", "stdout": "cleanup\n"} -->

</details>

<a id="wt131"></a>
### WT131 — Releasing pending cleanup work

What is the complete printed output?

```javascript
let release;
const cleanup=new Promise(r=>{release=r;});
const p=Promise.resolve(5).finally(()=>cleanup);
p.then(x=>console.log("value",x));
console.log("release");release(9);
```

A. `release / value 9`

B. `value 5 / release`

C. `release / value 5`

D. `release only`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
release
value 5
```

The cleanup Promise must fulfill before p forwards its original value 5. The cleanup’s success value 9 does not replace that value.

**Why the other choices fail:**

- **A:** A fulfilled finally result is not a value transform.
- **B:** The downstream reaction is asynchronous and gated by cleanup.
- **D:** cleanup is explicitly fulfilled, so the chain can finish.

**Rule/source:** [MDN reference][finally].

<!-- verify: {"kind": "js", "stdout": "release\nvalue 5\n"} -->

</details>

<a id="wt132"></a>
### WT132 — Completing two inputs in a different order

What is the complete printed output?

```javascript
let a,b;
const p=new Promise(r=>a=r),q=new Promise(r=>b=r);
Promise.all([p,q]).then(x=>console.log(x.join(",")));
b("B");a("A");
```

A. `A`

B. `B,A`

C. `A,B`

D. `B`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
A,B
```

Even though q fulfills first, Promise.all stores outcomes in iterable input order.

**Why the other choices fail:**

- **A:** It collects both successful values.
- **B:** Completion order does not reorder results.
- **D:** all waits for both fulfillments.

**Rule/source:** [MDN reference][all].

<!-- verify: {"kind": "js", "stdout": "A,B\n"} -->

</details>

<a id="wt133"></a>
### WT133 — A rejected aggregate and a delayed input

What is the complete printed output?

```javascript
const slow=new Promise(r=>setTimeout(()=>{console.log("finished");r(2);},0));
Promise.all([Promise.reject("bad"),slow]).catch(console.log);
```

A. `finished / bad`

B. `bad only`

C. `bad / finished`

D. `finished only`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
bad
finished
```

The aggregate rejects promptly. The already scheduled slow operation still runs because no cancellation mechanism was requested.

**Why the other choices fail:**

- **A:** The immediate rejection reaction precedes the later timer.
- **B:** Promise.all does not cancel slow.
- **D:** The aggregate rejection is handled and logged.

**Rule/source:** [MDN reference][all].

<!-- verify: {"kind": "js", "stdout": "bad\nfinished\n"} -->

</details>

<a id="wt134"></a>
### WT134 — Mixed outcomes under allSettled

What is the complete printed output?

```javascript
Promise.allSettled([Promise.reject("E"),Promise.resolve(4)])
 .then(r=>console.log(r[0].status,r[0].reason,r[1].status,r[1].value));
```

A. `rejected E fulfilled 4`

B. `fulfilled 4 rejected E`

C. `E only`

D. `rejected undefined fulfilled 4`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
rejected E fulfilled 4
```

allSettled fulfills with outcome records in input order. A rejected record uses reason; a fulfilled record uses value.

**Why the other choices fail:**

- **B:** Result order is not completion order.
- **C:** An input rejection does not reject this aggregate.
- **D:** The rejected record has its reason E.

**Rule/source:** [MDN reference][allsettled].

<!-- verify: {"kind": "js", "stdout": "rejected E fulfilled 4\n"} -->

</details>

<a id="wt135"></a>
### WT135 — Two combinators with settled inputs

What is the complete printed output?

```javascript
const bad=Promise.reject("E"),good=Promise.resolve("V");
(async()=>{
  try{console.log(await Promise.race([bad,good]));}
  catch(e){console.log("race",e);}
  console.log("any",await Promise.any([bad,good]));
})();
```

A. `race E only`

B. `race E / any E`

C. `race E / any V`

D. `race V / any V`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
race E
any V
```

For these already settled inputs, race observes the first queued rejection. any ignores rejections while a fulfillment remains available.

**Why the other choices fail:**

- **A:** The catch recovers and execution continues to any.
- **B:** any seeks a fulfillment, which good supplies.
- **D:** race does not ignore the first rejection.

**Rule/source:** [MDN reference][any].

<!-- verify: {"kind": "js", "stdout": "race E\nany V\n"} -->

</details>

<a id="wt136"></a>
### WT136 — All input rejections under any

What is the complete printed output?

```javascript
Promise.any([Promise.reject("A"),Promise.reject("B")])
 .catch(e=>console.log(e.name,e.errors.join(",")));
```

A. `A`

B. `Error B`

C. `AggregateError A,B`

D. `AggregateError B,A`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
AggregateError A,B
```

When every input rejects, any rejects with AggregateError containing reasons in input order.

**Why the other choices fail:**

- **A:** That resembles a first-rejection policy, not any’s all-failed result.
- **B:** The aggregate does not just forward the last reason.
- **D:** Its reasons follow input order.

**Rule/source:** [MDN reference][any].

<!-- verify: {"kind": "js", "stdout": "AggregateError A,B\n"} -->

</details>

<a id="wt137"></a>
### WT137 — No inputs to three combinators

What is the complete printed output?

```javascript
let settled=false;
Promise.race([]).then(()=>settled=true,()=>settled=true);
(async()=>{
 console.log((await Promise.all([])).length);
 try{await Promise.any([]);}catch(e){console.log(e.name);}
 console.log(settled);
})();
```

A. `0 / false`

B. `TypeError only`

C. `0 / AggregateError / false`

D. `0 / AggregateError / true`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
0
AggregateError
false
```

all of no inputs fulfills with an empty array. any of no inputs rejects because no success exists. race of no inputs stays pending.

**Why the other choices fail:**

- **A:** The empty any rejects and logs its error type.
- **B:** Empty iterables are valid inputs with method-specific outcomes.
- **D:** The empty race has no input settlement to follow.

**Rule/source:** [MDN reference][race].

<!-- verify: {"kind": "js", "stdout": "0\nAggregateError\nfalse\n"} -->

</details>

<a id="wt138"></a>
### WT138 — Adopting a pending inner Promise

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

```javascript
let release;
const inner=new Promise(r=>release=r);
const outer=new Promise((resolve,reject)=>{resolve(inner);reject("late");});
outer.then(console.log,e=>console.log("error",e));
release(8);
```

A. `error late`

B. `undefined`

C. `8`

D. `8 / error late`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
8
```

Resolving outer to inner locks its outcome to inner, while it awaits inner’s settlement. The later reject is ignored.

**Why the other choices fail:**

- **A:** Resolution adoption already locked the result.
- **B:** The adopted Promise eventually fulfills with 8.
- **D:** Only one eventual outcome is possible.

**Rule/source:** [MDN reference][promise].

<!-- verify: {"kind": "js", "stdout": "8\n"} -->

</details>

<a id="wt139"></a>
### WT139 — Comparing an async return with its input Promise

What is the complete printed output?

```javascript
const p=Promise.resolve(1);
async function f(){return p;}
console.log(Promise.resolve(p)===p,f()===p);
```

A. `true false`

B. `false true`

C. `false false`

D. `true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
true false
```

With the same native constructor, Promise.resolve returns p. An async call returns its own Promise, which follows p but has different identity.

**Why the other choices fail:**

- **B:** Both identity judgments are reversed.
- **C:** Promise.resolve of this native Promise preserves it.
- **D:** An async return adopts outcome rather than returning the same reference.

**Rule/source:** [MDN reference][async].

<!-- verify: {"kind": "js", "stdout": "true false\n"} -->

</details>

<a id="wt140"></a>
### WT140 — Awaiting a numeric value

What is the complete printed output?

```javascript
async function f(){console.log("A");await 0;console.log("B");}
f();console.log("C");
```

A. `C / A / B`

B. `A / C / B`

C. `A / B / C`

D. `A / C`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
A
C
B
```

The async body begins immediately. await arranges an asynchronous continuation even for a non-Promise value.

**Why the other choices fail:**

- **A:** The body starts immediately when f is called.
- **C:** Awaiting a primitive is not a synchronous continuation.
- **D:** The continuation is scheduled and does run.

**Rule/source:** [MDN reference][await].

<!-- verify: {"kind": "js", "stdout": "A\nC\nB\n"} -->

</details>

<a id="wt141"></a>
### WT141 — Calling an async function that throws

What is the complete printed output?

```javascript
async function f(){throw new Error("X");}
try{f().catch(e=>console.log(e.message));console.log("after");}
catch(e){console.log("outer");}
```

A. `outer`

B. `after / X`

C. `X / after`

D. `after only`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
after
X
```

Even a throw before the first await becomes rejection of f’s returned Promise. Its catch reaction runs later.

**Why the other choices fail:**

- **A:** The async throw is not a synchronous caller exception.
- **C:** The rejection handler runs asynchronously.
- **D:** The attached handler does receive the rejection.

**Rule/source:** [MDN reference][async].

<!-- verify: {"kind": "js", "stdout": "after\nX\n"} -->

</details>

<a id="wt142"></a>
### WT142 — Awaiting rejection inside a local try

What is the complete printed output?

```javascript
async function f(){
 try{return await Promise.reject("X");}
 catch(e){return "fixed";}
}
f().then(console.log);
```

A. `fixed`

B. `undefined`

C. `X`

D. `Unhandled rejection`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
fixed
```

Await turns the rejection into a throw at the await point, within this try. The catch returns a successful recovery value.

**Why the other choices fail:**

- **B:** The catch explicitly returns fixed.
- **C:** The local catch handles the awaited rejection.
- **D:** The async function fulfills after recovery.

**Rule/source:** [MDN reference][await].

<!-- verify: {"kind": "js", "stdout": "fixed\n"} -->

</details>

<a id="wt143"></a>
### WT143 — Returning rejection inside a local try

Choose the pair with both the **current output** and a correct repair for this goal: make this local catch recover the rejection and fulfill f() with fixed. The printed output refers to the original code below, before repair.

```javascript
async function f(){
 try{return Promise.reject("X");}
 catch(e){return "fixed";}
}
f().then(console.log,e=>console.log("rejected",e));
```

A. `rejected X ; add finally { return Promise.reject("X"); }`

B. `rejected X ; replace return Promise.reject("X") with return await Promise.reject("X")`

C. `rejected X ; return Promise.reject("X").then(x => x)`

D. `rejected X ; use Promise.resolve(Promise.reject("X")) without await`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
rejected X
```

No local await throws inside this try. f’s returned Promise adopts the rejection, observed by the caller’s rejection handler. Here return await is necessary for the desired local error boundary, even though both forms adopt outcomes at the caller boundary.

**Why the other choices fail:**

- **A:** A finally return would override the previous outcome with a rejection; it does not route that rejection into the existing catch.
- **C:** This still returns a rejected Promise without a local await throwing inside try.
- **D:** Promise.resolve adopts the rejection; it does not synchronously throw it into the local catch.

**Correct decision:** `rejected X ; replace return Promise.reject("X") with return await Promise.reject("X")`

**Repair code:**

```javascript
async function f(){
 try{return await Promise.reject("X");}
 catch(e){return "fixed";}
}
f().then(console.log,e=>console.log("rejected",e));
```

**Repair output:**

```text
fixed
```

**Rule/source:** [MDN reference][async].

<!-- verify: {"kind": "js", "stdout": "rejected X\n", "choice": "rejected X ; replace return Promise.reject(\"X\") with return await Promise.reject(\"X\")", "repair": {"code": "async function f(){\n try{return await Promise.reject(\"X\");}\n catch(e){return \"fixed\";}\n}\nf().then(console.log,e=>console.log(\"rejected\",e));", "stdout": "fixed\n"}} -->

</details>

<a id="wt144"></a>
### WT144 — A wait around asynchronous forEach callbacks

Choose the pair with both the **current output** and a correct repair for this goal: finish both delayed additions sequentially before logging the total. The printed output refers to the original code below, before repair.

```javascript
(async()=>{
 let total=0;
 await [1,2].forEach(async x=>{await new Promise(r=>setTimeout(r,0));total+=x;});
 console.log(total);
 setTimeout(()=>console.log(total),0);
})();
```

A. `0 / 3 ; await [1,2].map(async x => ...) directly`

B. `0 / 3 ; put another await before the existing forEach call`

C. `0 / 3 ; replace forEach with a for...of loop that awaits each delayed addition`

D. `0 / 3 ; return total from each async forEach callback`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
0
3
```

forEach returns undefined. Awaiting that result does not collect its callback Promises. Both callback timers were registered before the final reporting timer. A sequential for...of loop supplies the requested ordering. For independent work, collecting callback Promises and awaiting Promise.all can also wait for completion, but does not impose sequential starts.

**Why the other choices fail:**

- **A:** map returns an array, not an aggregation Promise; awaiting that array does not await its entries.
- **B:** Awaiting undefined again does not collect or wait for the callback Promises.
- **D:** forEach still ignores those returned Promises and returns undefined.

**Correct decision:** `0 / 3 ; replace forEach with a for...of loop that awaits each delayed addition`

**Repair code:**

```javascript
(async()=>{
 let total=0;
 for(const x of [1,2]){await new Promise(r=>setTimeout(r,0));total+=x;}
 console.log(total);
})();
```

**Repair output:**

```text
3
```

**Rule/source:** [MDN reference][foreach].

<!-- verify: {"kind": "js", "stdout": "0\n3\n", "choice": "0 / 3 ; replace forEach with a for...of loop that awaits each delayed addition", "repair": {"code": "(async()=>{\n let total=0;\n for(const x of [1,2]){await new Promise(r=>setTimeout(r,0));total+=x;}\n console.log(total);\n})();", "stdout": "3\n"}} -->

</details>

<a id="wt145"></a>
### WT145 — Inspecting asynchronous map results

What is the complete printed output?

```javascript
const a=[1,2].map(async x=>x*2);
console.log(a[0] instanceof Promise);
Promise.all(a).then(x=>console.log(x.join(",")));
```

A. `true / [object Promise],[object Promise]`

B. `true / 2,4`

C. `false / 2,4`

D. `true / 1,2`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true
2,4
```

Each async callback returns a Promise. map collects those Promises; Promise.all collects their fulfilled values.

**Why the other choices fail:**

- **A:** all unwraps their outcomes.
- **C:** The intermediate entries are Promises, not raw numbers.
- **D:** The callback doubles the values.

**Rule/source:** [MDN reference][all].

<!-- verify: {"kind": "js", "stdout": "true\n2,4\n"} -->

</details>

<a id="wt146"></a>
### WT146 — Selecting with an asynchronous predicate

Choose the pair with both the **current output** and a correct repair for this goal: select only inputs whose awaited predicate is true, preserving input order. The printed output refers to the original code below, before repair.

```javascript
const a=[1,2,3].filter(async x=>x>1);
console.log(a.join(","));
```

A. `1,2,3 ; await Promise.all(a.filter(predicate))`

B. `1,2,3 ; await Promise.all(a.map(predicate)), then filter a using the corresponding booleans`

C. `1,2,3 ; await a.filter(predicate)`

D. `1,2,3 ; filter with x => Boolean(predicate(x))`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
1,2,3
```

Every callback immediately returns a Promise object, which is truthy. filter does not await the eventual boolean. Compute asynchronous predicate results first, then use synchronous booleans for selection. Retain the original input/index correspondence.

**Why the other choices fail:**

- **A:** The entries are already the selected original numbers; awaiting them does not undo the incorrect selection.
- **C:** filter has already selected using truthy Promise objects before this await sees the returned array.
- **D:** Each returned Promise is still truthy; wrapping it in Boolean does not read its fulfillment value.

**Correct decision:** `1,2,3 ; await Promise.all(a.map(predicate)), then filter a using the corresponding booleans`

**Repair code:**

```javascript
(async()=>{
 const a=[1,2,3],predicate=async x=>x>1;
 const keep=await Promise.all(a.map(predicate));
 console.log(a.filter((_,i)=>keep[i]).join(","));
})();
```

**Repair output:**

```text
2,3
```

**Rule/source:** [MDN reference][filter].

<!-- verify: {"kind": "js", "stdout": "1,2,3\n", "choice": "1,2,3 ; await Promise.all(a.map(predicate)), then filter a using the corresponding booleans", "repair": {"code": "(async()=>{\n const a=[1,2,3],predicate=async x=>x>1;\n const keep=await Promise.all(a.map(predicate));\n console.log(a.filter((_,i)=>keep[i]).join(\",\"));\n})();", "stdout": "2,3\n"}} -->

</details>

<a id="wt147"></a>
### WT147 — An asynchronous universal predicate

Choose the pair with both the **current output** and a correct repair for this goal: test whether every input passes after awaiting the predicate results. The printed output refers to the original code below, before repair.

```javascript
console.log([1,2].every(async x=>x<0));
```

A. `true ; call every(Boolean) on a.map(predicate) without awaiting its entries`

B. `true ; await a.every(predicate)`

C. `true ; negate a.some(predicate)`

D. `true ; await Promise.all(a.map(predicate)), then call every(Boolean) on the boolean results`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
true
```

every tests the returned Promise objects immediately, and both are truthy. Their eventual false values are not awaited. The selected repair is the correct general method, including an all-true case; an accidentally correct false for these specific inputs is insufficient. This eager version evaluates every predicate rather than asynchronously stopping early.

**Why the other choices fail:**

- **A:** The mapped entries are Promise objects and all are truthy.
- **B:** every already returned true after inspecting Promise truthiness; await cannot recompute its decision.
- **C:** some immediately sees a truthy Promise and returns true, so negation returns false even when all awaited predicates would pass.

**Correct decision:** `true ; await Promise.all(a.map(predicate)), then call every(Boolean) on the boolean results`

**Repair code:**

```javascript
(async()=>{
 const a=[1,2],predicate=async x=>x<0;
 const results=await Promise.all(a.map(predicate));
 console.log(results.every(Boolean));
})();
```

**Repair output:**

```text
false
```

**Rule/source:** [MDN reference][every].

<!-- verify: {"kind": "js", "stdout": "true\n", "choice": "true ; await Promise.all(a.map(predicate)), then call every(Boolean) on the boolean results", "repair": {"code": "(async()=>{\n const a=[1,2],predicate=async x=>x<0;\n const results=await Promise.all(a.map(predicate));\n console.log(results.every(Boolean));\n})();", "stdout": "false\n"}} -->

</details>

<a id="wt148"></a>
### WT148 — Two calls separated by awaits

What is the complete printed output?

```javascript
function job(name){console.log("start",name);return Promise.resolve(name);}
(async()=>{
 await job("A");await job("B");console.log("end");
})();
console.log("caller");
```

A. `start A / caller / end / start B`

B. `start A / start B / caller / end`

C. `start A / caller / start B / end`

D. `caller / start A / start B / end`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
start A
caller
start B
end
```

B is invoked only after the awaited A completes. The caller continues during that first suspension.

**Why the other choices fail:**

- **A:** The second await precedes end.
- **B:** B was not started before the first await.
- **D:** The async body starts synchronously.

**Rule/source:** [MDN reference][await].

<!-- verify: {"kind": "js", "stdout": "start A\ncaller\nstart B\nend\n"} -->

</details>

<a id="wt149"></a>
### WT149 — Two calls before a combined wait

What is the complete printed output?

```javascript
function job(name){console.log("start",name);return Promise.resolve(name);}
(async()=>{
 const a=job("A"),b=job("B");await Promise.all([a,b]);console.log("end");
})();
console.log("caller");
```

A. `start A / start B / end / caller`

B. `start A / start B / caller / end`

C. `start A / caller / start B / end`

D. `caller / start A / start B / end`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
start A
start B
caller
end
```

Both calls execute before the combined await. They can be in flight independently while the caller proceeds.

**Why the other choices fail:**

- **A:** The awaited continuation is later.
- **C:** That would be sequential invocation after separate awaits.
- **D:** The body does not defer its initial calls.

**Rule/source:** [MDN reference][all].

<!-- verify: {"kind": "js", "stdout": "start A\nstart B\ncaller\nend\n"} -->

</details>

<a id="wt150"></a>
### WT150 — A logging error handler and its next stage

What is the complete printed output?

```javascript
Promise.reject("bad")
 .catch(e=>{console.log("handled");})
 .then(x=>console.log(x));
```

A. `handled / bad`

B. `handled / undefined`

C. `handled only`

D. `handled / handled`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
handled
undefined
```

The catch handler completes normally without a return value. It recovers to fulfillment with undefined; logging is not a returned recovery value.

**Why the other choices fail:**

- **A:** The rejection does not automatically remain after a normal catch.
- **C:** The next fulfillment handler runs with undefined.
- **D:** console output is not the handler’s return value.

**Rule/source:** [MDN reference][catch].

<!-- verify: {"kind": "js", "stdout": "handled\nundefined\n"} -->

</details>

## DOM and events

<a id="wt151"></a>
### WT151 — Two ways to locate an ID

What is the complete printed output?

Initial body HTML:
```html
<p id="x">A</p>
```

```javascript
console.log(document.getElementById("x")!==null,
 document.getElementById("#x")===null,
 document.querySelector("#x").tagName);
```

A. `true false P`

B. `true true P`

C. `true true null`

D. `false true P`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true true P
```

getElementById takes the literal ID value. querySelector takes selector syntax, where # introduces an ID selector.

**Why the other choices fail:**

- **A:** No literal ID named #x exists.
- **C:** The CSS selector #x matches.
- **D:** The literal x ID lookup succeeds.

**Rule/source:** [MDN reference][selectors].

<!-- verify: {"kind": "dom", "stdout": "true true P\n"} -->

</details>

<a id="wt152"></a>
### WT152 — Two saved collections after insertion

What is the complete printed output?

Initial body HTML:
```html
<p class="item">A</p>
```

```javascript
const s=document.querySelectorAll(".item");
const l=document.getElementsByClassName("item");
const n=document.createElement("p");n.className="item";document.body.append(n);
console.log(s.length,l.length);
```

A. `1 1`

B. `2 2`

C. `2 1`

D. `1 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1 2
```

querySelectorAll returns a static membership snapshot. getElementsByClassName returns a live collection that includes the later match.

**Why the other choices fail:**

- **A:** The HTMLCollection is live.
- **B:** The static NodeList does not gain a member.
- **C:** That reverses the two API contracts.

**Rule/source:** [MDN reference][collections].

<!-- verify: {"kind": "dom", "stdout": "1 2\n"} -->

</details>

<a id="wt153"></a>
### WT153 — Inspecting a saved selection after removal

What is the complete printed output?

Initial body HTML:
```html
<p class="item">A</p><p class="item">B</p>
```

```javascript
const s=document.querySelectorAll(".item");
s[0].remove();
console.log(s.length,s[0].isConnected,document.querySelectorAll(".item").length);
```

A. `2 true 1`

B. `2 false 1`

C. `2 false 2`

D. `1 false 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
2 false 1
```

The saved NodeList retains the original membership and node references. The removed node is disconnected, while a new query sees one current match.

**Why the other choices fail:**

- **A:** The stored node can be disconnected.
- **C:** The fresh query reflects the removal.
- **D:** The original NodeList is not live.

**Rule/source:** [MDN reference][selectors].

<!-- verify: {"kind": "dom", "stdout": "2 false 1\n"} -->

</details>

<a id="wt154"></a>
### WT154 — Removing nodes through an indexed collection

What is the complete printed output?

Initial body HTML:
```html
<p class="item">A</p><p class="item">B</p><p class="item">C</p>
```

```javascript
const l=document.getElementsByClassName("item");
for(let i=0;i<l.length;i++)l[i].remove();
console.log(l.length,l[0].textContent);
```

A. `1 C`

B. `2 B`

C. `0 undefined`

D. `1 B`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1 B
```

After removing A, B shifts to index 0. Incrementing i visits C at index 1, leaving B. Snapshotting the collection or repeatedly removing index 0 avoids this particular skip.

**Why the other choices fail:**

- **A:** C is the second removal.
- **B:** Both A and C are removed.
- **C:** The shifting live collection causes a skip.

**Rule/source:** [MDN reference][collections].

<!-- verify: {"kind": "dom", "stdout": "1 B\n"} -->

</details>

<a id="wt155"></a>
### WT155 — Inspecting a mixed-content parent's children

What is the complete printed output?

Initial body HTML:
```html
<div id="p">A<span>B</span>C</div>
```

```javascript
const p=document.getElementById("p");
console.log(p.childNodes.length,p.children.length,p.firstChild.nodeType,p.firstElementChild.tagName);
```

A. `3 1 3 SPAN`

B. `1 1 1 SPAN`

C. `3 3 3 SPAN`

D. `3 1 1 SPAN`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
3 1 3 SPAN
```

The parent has text A, one span element, then text C. children filters to elements; nodeType 3 identifies a text node.

**Why the other choices fail:**

- **B:** childNodes also includes the text nodes.
- **C:** children does not include text.
- **D:** firstChild is the initial text node.

**Rule/source:** [MDN reference][children].

<!-- verify: {"kind": "dom", "stdout": "3 1 3 SPAN\n"} -->

</details>

<a id="wt156"></a>
### WT156 — Writing markup-shaped content in two ways

What is the complete printed output?

Initial body HTML:
```html
<p id="p"></p>
```

```javascript
const p=document.getElementById("p");
p.textContent="<b>X</b>";
console.log(p.children.length,p.textContent);
p.innerHTML="<b>X</b>";
console.log(p.children.length,p.textContent);
```

A. `0 <b>X</b> / 1 X`

B. `0 <b>X</b> / 0 <b>X</b>`

C. `0 X / 1 X`

D. `1 X / 1 X`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
0 <b>X</b>
1 X
```

textContent writes literal text. innerHTML parses the supplied markup into an element, whose text content is X.

**Why the other choices fail:**

- **B:** The second operation does parse HTML.
- **C:** The first literal includes the angle-bracket text.
- **D:** The first operation does not parse HTML.

**Rule/source:** [MDN reference][textcontent].

<!-- verify: {"kind": "dom", "stdout": "0 <b>X</b>\n1 X\n"} -->

</details>

<a id="wt157"></a>
### WT157 — A stored button after HTML reassignment

What is the complete printed output?

Initial body HTML:
```html
<div id="p"><button>A</button></div>
```

```javascript
const p=document.getElementById("p"),old=p.firstElementChild;
let n=0;old.addEventListener("click",()=>n++);
p.innerHTML=p.innerHTML;
const fresh=p.firstElementChild;
fresh.click();old.click();
console.log(old===fresh,old.isConnected,n);
```

A. `true true 2`

B. `false false 1`

C. `false false 0`

D. `false false 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false false 1
```

Parsing the same markup creates a new button without the old addEventListener registration. The detached old button still exists and its own click can invoke its retained listener.

**Why the other choices fail:**

- **A:** Identical markup does not preserve node identity.
- **C:** Detachment does not erase the old node’s listener registration.
- **D:** The new node does not inherit that registration.

**Rule/source:** [MDN reference][innerhtml].

<!-- verify: {"kind": "dom", "stdout": "false false 1\n"} -->

</details>

<a id="wt158"></a>
### WT158 — Appending an already attached node

What is the complete printed output?

Initial body HTML:
```html
<div id="a"><span id="x">X</span></div><div id="b"></div>
```

```javascript
const a=document.getElementById("a"),b=document.getElementById("b"),x=document.getElementById("x");
const r=b.appendChild(x);
console.log(a.children.length,b.children.length,r===x,x.parentElement===b);
```

A. `1 1 true false`

B. `1 1 false true`

C. `0 1 false true`

D. `0 1 true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
0 1 true true
```

An existing node is moved, not cloned, and appendChild returns that node.

**Why the other choices fail:**

- **A:** The node’s parent changes.
- **B:** Moving does not leave a copied child in a.
- **C:** The returned value is the same node.

**Rule/source:** [MDN reference][appendchild].

<!-- verify: {"kind": "dom", "stdout": "0 1 true true\n"} -->

</details>

<a id="wt159"></a>
### WT159 — Clicking an original and a deep clone

What is the complete printed output?

Initial body HTML:
```html
<button id="b"><span>X</span></button>
```

```javascript
const b=document.getElementById("b");let n=0;
b.addEventListener("click",()=>n++);
const c=b.cloneNode(true);
document.body.append(c);b.click();c.click();
console.log(n,c.children.length,b===c);
```

A. `2 1 true`

B. `1 0 false`

C. `2 1 false`

D. `1 1 false`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1 1 false
```

Deep clone copies the descendant span but not listeners installed with addEventListener. It creates a distinct node. The copied ID can also cause duplicate IDs in the document.

**Why the other choices fail:**

- **A:** Cloning does not reuse identity or the installed listener.
- **B:** The true argument copies descendants.
- **C:** The registered listener is not copied.

**Rule/source:** [MDN reference][clone].

<!-- verify: {"kind": "dom", "stdout": "1 1 false\n"} -->

</details>

<a id="wt160"></a>
### WT160 — A fragment before and after insertion

What is the complete printed output?

Initial body HTML:
```html
<!-- empty body -->
```

```javascript
const f=document.createDocumentFragment();
f.append(document.createElement("i"),document.createElement("b"));
document.body.append(f);
console.log(f.childNodes.length,document.body.children.length,f.parentNode);
```

A. `0 2 null`

B. `0 1 null`

C. `2 1 [object HTMLBodyElement]`

D. `2 2 null`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
0 2 null
```

The fragment’s children move into the document. The fragment itself remains detached and empty.

**Why the other choices fail:**

- **B:** Both children are inserted separately.
- **C:** The fragment is not inserted as an ordinary containing element.
- **D:** The children do not remain in the fragment.

**Rule/source:** [MDN reference][fragment].

<!-- verify: {"kind": "dom", "stdout": "0 2 null\n"} -->

</details>

<a id="wt161"></a>
### WT161 — Appending a string and then a Node

What is the complete printed output?

Initial body HTML:
```html
<p id="p"></p>
```

```javascript
const p=document.getElementById("p");
const r=p.append("A"),t=document.createTextNode("B");
console.log(r,p.appendChild(t)===t,p.textContent);
try{p.appendChild("C");}catch(e){console.log(e.name);}
```

A. `undefined true AB only`

B. `undefined true AB / TypeError`

C. `A true AB / TypeError`

D. `undefined false AB / TypeError`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
undefined true AB
TypeError
```

append accepts strings and returns undefined. appendChild requires a Node and returns that Node.

**Why the other choices fail:**

- **A:** A plain string is not a Node for appendChild.
- **C:** append does not return the inserted text.
- **D:** appendChild returns the same supplied node.

**Rule/source:** [MDN reference][append].

<!-- verify: {"kind": "dom", "stdout": "undefined true AB\nTypeError\n"} -->

</details>

<a id="wt162"></a>
### WT162 — Reading text from a styled element

What is the complete printed output?

Initial body HTML:
```html
<div id="p">A<span style="display:none">B</span>C</div>
```

```javascript
const p=document.getElementById("p");
console.log(p.textContent,p.innerText);
```

A. `ABC ABC`

B. `AC ABC`

C. `AC AC`

D. `ABC AC`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
ABC AC
```

textContent includes hidden descendant text. For this connected, rendered element, innerText reflects rendering and excludes the display:none span.

**Why the other choices fail:**

- **A:** This connected element’s innerText excludes the hidden span.
- **B:** That reverses the two contracts.
- **C:** textContent is not restricted to visible rendered text.

**Rule/source:** [MDN reference][innertext].

<!-- verify: {"kind": "dom", "stdout": "ABC AC\n"} -->

</details>

<a id="wt163"></a>
### WT163 — Three class toggle calls

What is the complete printed output?

Initial body HTML:
```html
<p id="p" class="x"></p>
```

```javascript
const p=document.getElementById("p");
console.log(p.classList.toggle("x",false),p.classList.toggle("y",true),p.className);
```

A. `true true x y`

B. `false true y`

C. `false false y`

D. `false true x y`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false true y
```

A force of false ensures absence and returns false; true ensures presence and returns true. It is not a request to invert regardless of current state.

**Why the other choices fail:**

- **A:** The force false removes x.
- **C:** The successful ensured presence returns true.
- **D:** x does not remain after the removal.

**Rule/source:** [MDN reference][classlist].

<!-- verify: {"kind": "dom", "stdout": "false true y\n"} -->

</details>

<a id="wt164"></a>
### WT164 — Assigning and deleting a dataset property

What is the complete printed output?

Initial body HTML:
```html
<p id="p"></p>
```

```javascript
const p=document.getElementById("p");
p.dataset.count=5;
console.log(typeof p.dataset.count,p.getAttribute("data-count"));
delete p.dataset.count;
console.log(p.hasAttribute("data-count"));
```

A. `string 5 / false`

B. `string 5 / true`

C. `number 5 / false`

D. `string null / false`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
string 5
false
```

dataset converts assigned values to strings and reflects data-* attributes. Deleting its named property removes the corresponding attribute.

**Why the other choices fail:**

- **B:** delete removes the reflected attribute.
- **C:** dataset does not retain numerical type.
- **D:** The assignment reflects data-count.

**Rule/source:** [MDN reference][dataset].

<!-- verify: {"kind": "dom", "stdout": "string 5\nfalse\n"} -->

</details>

<a id="wt165"></a>
### WT165 — Assigning an input's current value

What is the complete printed output?

Initial body HTML:
```html
<input id="i" value="old">
```

```javascript
const i=document.getElementById("i");i.value="new";
console.log(i.value,i.getAttribute("value"),i.defaultValue);
```

A. `new old old`

B. `new old new`

C. `old old old`

D. `new new new`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
new old old
```

value is the current control value; the attribute supplies the defaultValue and remains old after this property assignment.

**Why the other choices fail:**

- **B:** defaultValue reflects the unchanged attribute.
- **C:** The current property assignment takes effect.
- **D:** Assigning the current value does not rewrite the value attribute here.

**Rule/source:** [MDN reference][inputvalue].

<!-- verify: {"kind": "dom", "stdout": "new old old\n"} -->

</details>

<a id="wt166"></a>
### WT166 — A disabled attribute and a property assignment

What is the complete printed output?

Initial body HTML:
```html
<button id="b" disabled="false">X</button>
```

```javascript
const b=document.getElementById("b");
console.log(b.disabled,b.getAttribute("disabled"));
b.disabled=false;
console.log(b.hasAttribute("disabled"));
```

A. `true true / false`

B. `false false / false`

C. `true false / false`

D. `true false / true`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
true false
false
```

Presence of the boolean disabled attribute makes it true even when its text is false. Assigning the reflected property false removes the attribute.

**Why the other choices fail:**

- **A:** getAttribute returns the actual attribute string false.
- **B:** Boolean attribute semantics use presence, not the literal text false.
- **D:** The property false removes the reflected attribute.

**Rule/source:** [MDN reference][disabled].

<!-- verify: {"kind": "dom", "stdout": "true false\nfalse\n"} -->

</details>

<a id="wt167"></a>
### WT167 — Event origin and executing listener

What is the complete printed output?

Initial body HTML:
```html
<button id="b"><span id="s">X</span></button>
```

```javascript
const b=document.getElementById("b"),s=document.getElementById("s");
b.addEventListener("click",e=>console.log(e.target.id,e.currentTarget.id));
s.dispatchEvent(new MouseEvent("click",{bubbles:true}));
```

A. `b s`

B. `b b`

C. `s b`

D. `s s`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
s b
```

The bubbling event originates on the span. During the button listener, currentTarget is the button and target remains the span.

**Why the other choices fail:**

- **A:** That reverses origin and listener location.
- **B:** target is not overwritten to the ancestor listener node.
- **D:** currentTarget identifies the listener’s button.

**Rule/source:** [MDN reference][event-target].

<!-- verify: {"kind": "dom", "stdout": "s b\n"} -->

</details>

<a id="wt168"></a>
### WT168 — Three event registrations along a path

What is the complete printed output?

Initial body HTML:
```html
<div id="p"><button id="b">X</button></div>
```

```javascript
const p=document.getElementById("p"),b=document.getElementById("b");
p.addEventListener("x",()=>console.log("capture"),true);
p.addEventListener("x",()=>console.log("bubble"));
b.addEventListener("x",()=>console.log("target"));
b.dispatchEvent(new Event("x",{bubbles:true}));
```

A. `target / capture / bubble`

B. `capture / target / bubble`

C. `capture / bubble / target`

D. `target / bubble`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
capture
target
bubble
```

The ancestor capture listener runs on the way to the target; the target listener follows; the ancestor bubble listener runs afterward.

**Why the other choices fail:**

- **A:** Capture precedes the target phase.
- **C:** Bubbling follows the target.
- **D:** The capture listener is registered with true.

**Rule/source:** [MDN reference][events].

<!-- verify: {"kind": "dom", "stdout": "capture\ntarget\nbubble\n"} -->

</details>

<a id="wt169"></a>
### WT169 — Two button listeners and an ancestor listener

Choose the pair with both the **current output** and a correct repair for this goal: prevent both the later listener on the button and the parent listener from running. The printed output refers to the original code below, before repair.

Initial body HTML:
```html
<div id="p"><button id="b">X</button></div>
```

```javascript
const p=document.getElementById("p"),b=document.getElementById("b");
b.addEventListener("x",e=>{console.log("one");e.stopPropagation();});
b.addEventListener("x",()=>console.log("two"));
p.addEventListener("x",()=>console.log("parent"));
b.dispatchEvent(new Event("x",{bubbles:true}));
```

A. `one / two ; keep stopPropagation but set bubbles:false on the event`

B. `one / two ; keep stopPropagation and return false from the addEventListener callback`

C. `one / two ; replace stopPropagation with preventDefault`

D. `one / two ; replace stopPropagation with stopImmediatePropagation in the first button listener`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
one
two
```

stopPropagation prevents further propagation to other nodes. It does not suppress later listeners on the current node. Choose the event control matching the goal: immediate propagation stopping also suppresses later same-node listeners.

**Why the other choices fail:**

- **A:** This suppresses travel to ancestors but not the second listener on the target button.
- **B:** addEventListener ignores the callback return; the next same-node listener still runs.
- **C:** This event was not created cancelable, and cancellation would not stop listener traversal anyway.

**Correct decision:** `one / two ; replace stopPropagation with stopImmediatePropagation in the first button listener`

**Repair code:**

```javascript
const p=document.getElementById("p"),b=document.getElementById("b");
b.addEventListener("x",e=>{console.log("one");e.stopImmediatePropagation();});
b.addEventListener("x",()=>console.log("two"));
p.addEventListener("x",()=>console.log("parent"));
b.dispatchEvent(new Event("x",{bubbles:true}));
```

**Repair output:**

```text
one
```

**Rule/source:** [MDN reference][stop].

<!-- verify: {"kind": "dom", "stdout": "one\ntwo\n", "choice": "one / two ; replace stopPropagation with stopImmediatePropagation in the first button listener", "repair": {"code": "const p=document.getElementById(\"p\"),b=document.getElementById(\"b\");\nb.addEventListener(\"x\",e=>{console.log(\"one\");e.stopImmediatePropagation();});\nb.addEventListener(\"x\",()=>console.log(\"two\"));\np.addEventListener(\"x\",()=>console.log(\"parent\"));\nb.dispatchEvent(new Event(\"x\",{bubbles:true}));", "stdout": "one\n"}} -->

</details>

<a id="wt170"></a>
### WT170 — Immediate propagation control during dispatch

What is the complete printed output?

Initial body HTML:
```html
<div id="p"><button id="b">X</button></div>
```

```javascript
const p=document.getElementById("p"),b=document.getElementById("b");
b.addEventListener("x",e=>{console.log("one");e.stopImmediatePropagation();});
b.addEventListener("x",()=>console.log("two"));
p.addEventListener("x",()=>console.log("parent"));
b.dispatchEvent(new Event("x",{bubbles:true}));
```

A. `one / two`

B. `one / two / parent`

C. `one / parent`

D. `one`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
one
```

The immediate stop suppresses later listeners on that node and further propagation.

**Why the other choices fail:**

- **A:** That is the ordinary stopPropagation distinction.
- **B:** The stop call affects both kinds of later dispatch.
- **C:** Further propagation is also stopped.

**Rule/source:** [MDN reference][stop-immediate].

<!-- verify: {"kind": "dom", "stdout": "one\n"} -->

</details>

<a id="wt171"></a>
### WT171 — Cancellation and an ancestor listener

What is the complete printed output?

Initial body HTML:
```html
<div id="p"><button id="b">X</button></div>
```

```javascript
const p=document.getElementById("p"),b=document.getElementById("b");
b.addEventListener("x",e=>e.preventDefault());
p.addEventListener("x",e=>console.log(e.defaultPrevented));
console.log(b.dispatchEvent(new Event("x",{bubbles:true,cancelable:true})));
```

A. `true / false`

B. `false / true`

C. `true / true`

D. `false only`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
true
false
```

The parent still receives the event and sees its cancellation flag. dispatchEvent returns false when a cancelable event was canceled.

**Why the other choices fail:**

- **B:** The target listener does cancel this cancelable event.
- **C:** A canceled dispatch reports false.
- **D:** preventDefault does not stop the parent listener.

**Rule/source:** [MDN reference][prevent].

<!-- verify: {"kind": "dom", "stdout": "true\nfalse\n"} -->

</details>

<a id="wt172"></a>
### WT172 — Cancellation on an ordinary Event

What is the complete printed output?

Initial body HTML:
```html
<button id="b">X</button>
```

```javascript
const b=document.getElementById("b");
b.addEventListener("x",e=>{e.preventDefault();console.log(e.defaultPrevented);});
console.log(b.dispatchEvent(new Event("x",{cancelable:false})));
```

A. `false / false`

B. `true / false`

C. `true / true`

D. `false / true`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
false
true
```

preventDefault has no cancellation effect on a noncancelable event. The dispatch is not canceled and reports true.

**Why the other choices fail:**

- **A:** The dispatch was not canceled.
- **B:** That assumes cancelability despite the explicit false.
- **C:** defaultPrevented remains false.

**Rule/source:** [MDN reference][prevent].

<!-- verify: {"kind": "dom", "stdout": "false\ntrue\n"} -->

</details>

<a id="wt173"></a>
### WT173 — Cancellation inside a passive listener

*Supplement: lower priority than core distinctions.*

What is the complete printed output?

Initial body HTML:
```html
<button id="b">X</button>
```

```javascript
const b=document.getElementById("b");
b.addEventListener("x",e=>{e.preventDefault();console.log(e.defaultPrevented);},{passive:true});
console.log(b.dispatchEvent(new Event("x",{cancelable:true})));
```

A. `false / true`

B. `true / false`

C. `true / true`

D. `false / false`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
false
true
```

The explicit passive contract prevents this listener from canceling the event, despite its cancelable flag. Browser diagnostics are not console.log output.

**Why the other choices fail:**

- **B:** Passive overrides the listener’s attempted cancellation.
- **C:** The defaultPrevented flag remains false.
- **D:** The attempted cancellation did not take effect.

**Rule/source:** [MDN reference][events].

<!-- verify: {"kind": "dom", "stdout": "false\ntrue\n"} -->

</details>

<a id="wt174"></a>
### WT174 — Two attempts to remove a callback

Choose the pair with both the **current output** and a correct repair for this goal: remove the registration before the first dispatch, leaving the count at zero. The printed output refers to the original code below, before repair.

Initial body HTML:
```html
<button id="b">X</button>
```

```javascript
const b=document.getElementById("b");let n=0;
const f=()=>n++;b.addEventListener("x",f);
b.removeEventListener("x",()=>n++);
b.dispatchEvent(new Event("x"));
b.removeEventListener("x",f);b.dispatchEvent(new Event("x"));
console.log(n);
```

A. `1 ; use removeEventListener("x",f) for the first removal`

B. `1 ; use removeEventListener("x",f,true)`

C. `1 ; use removeEventListener("x",f.bind(b))`

D. `1 ; use removeEventListener("x",() => f())`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
1
```

The new arrow used for the first removal is a different function. The second removal uses f and succeeds. Retain the original function reference and match its capture flag when removing a listener.

**Why the other choices fail:**

- **B:** The registration uses capture false; a true removal does not match it.
- **C:** bind creates another function identity, even if its target behavior resembles f.
- **D:** A wrapper function is distinct from the registered f.

**Correct decision:** `1 ; use removeEventListener("x",f) for the first removal`

**Repair code:**

```javascript
const b=document.getElementById("b");let n=0;
const f=()=>n++;b.addEventListener("x",f);
b.removeEventListener("x",f);b.dispatchEvent(new Event("x"));
console.log(n);
```

**Repair output:**

```text
0
```

**Rule/source:** [MDN reference][remove-listener].

<!-- verify: {"kind": "dom", "stdout": "1\n", "choice": "1 ; use removeEventListener(\"x\",f) for the first removal", "repair": {"code": "const b=document.getElementById(\"b\");let n=0;\nconst f=()=>n++;b.addEventListener(\"x\",f);\nb.removeEventListener(\"x\",f);b.dispatchEvent(new Event(\"x\"));\nconsole.log(n);", "stdout": "0\n"}} -->

</details>

<a id="wt175"></a>
### WT175 — Removing a captured registration

What is the complete printed output?

Initial body HTML:
```html
<div id="p"><button id="b">X</button></div>
```

```javascript
const p=document.getElementById("p"),b=document.getElementById("b");let n=0;
const f=()=>n++;p.addEventListener("x",f,true);
p.removeEventListener("x",f,false);
b.dispatchEvent(new Event("x",{bubbles:true}));
p.removeEventListener("x",f,true);
b.dispatchEvent(new Event("x",{bubbles:true}));
console.log(n);
```

A. `3`

B. `0`

C. `2`

D. `1`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1
```

Removal must match event type, callback identity and capture flag. The false removal does not match the captured registration.

**Why the other choices fail:**

- **A:** The listener is only registered once.
- **B:** The first removal has the wrong capture flag.
- **C:** The matching true removal succeeds.

**Rule/source:** [MDN reference][remove-listener].

<!-- verify: {"kind": "dom", "stdout": "1\n"} -->

</details>

<a id="wt176"></a>
### WT176 — Repeated and distinct callback registrations

What is the complete printed output?

Initial body HTML:
```html
<button id="b">X</button>
```

```javascript
const b=document.getElementById("b");let n=0;const f=()=>n++;
b.addEventListener("x",f);b.addEventListener("x",f);
b.addEventListener("x",()=>n++);b.addEventListener("x",()=>n++);
b.dispatchEvent(new Event("x"));console.log(n);
```

A. `4`

B. `2`

C. `3`

D. `1`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
3
```

The duplicate type/callback/capture registration for f is ignored. Each separate arrow is a different callback identity and is registered.

**Why the other choices fail:**

- **A:** The identical f registration is deduplicated.
- **B:** The fresh arrows are both separately registered.
- **D:** Only the duplicate f is ignored, not all matching event types.

**Rule/source:** [MDN reference][events].

<!-- verify: {"kind": "dom", "stdout": "3\n"} -->

</details>

<a id="wt177"></a>
### WT177 — Two dispatches with two registration options

What is the complete printed output?

Initial body HTML:
```html
<button id="b">X</button>
```

```javascript
const b=document.getElementById("b");let a=0,c=0;
b.addEventListener("x",()=>a++,{once:true});
b.addEventListener("x",()=>c++);
b.dispatchEvent(new Event("x"));b.dispatchEvent(new Event("x"));
console.log(a,c);
```

A. `1 1`

B. `1 2`

C. `2 2`

D. `0 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
1 2
```

once affects only the corresponding registration. The ordinary listener remains for both events.

**Why the other choices fail:**

- **A:** The second registration has no once option.
- **C:** The once listener is removed after the first invocation.
- **D:** once still permits its first invocation.

**Rule/source:** [MDN reference][events].

<!-- verify: {"kind": "dom", "stdout": "1 2\n"} -->

</details>

<a id="wt178"></a>
### WT178 — Logging around manual dispatch

What is the complete printed output?

Initial body HTML:
```html
<button id="b">X</button>
```

```javascript
const b=document.getElementById("b");
b.addEventListener("x",()=>console.log("listener"));
console.log("before");b.dispatchEvent(new Event("x"));console.log("after");
```

A. `before / listener / after`

B. `listener / before / after`

C. `before / after`

D. `before / after / listener`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
before
listener
after
```

Manual dispatchEvent performs listener dispatch before returning. Registering the listener earlier did not invoke it.

**Why the other choices fail:**

- **B:** Registration did not invoke the callback.
- **C:** The supplied event reaches the listener.
- **D:** Manual dispatch is not queued as a later timer.

**Rule/source:** [MDN reference][dispatch].

<!-- verify: {"kind": "dom", "stdout": "before\nlistener\nafter\n"} -->

</details>

<a id="wt179"></a>
### WT179 — A missing selector and an invalid selector

What is the complete printed output?

Initial body HTML:
```html
<p>A</p>
```

```javascript
console.log(document.querySelector(".missing"));
try{document.querySelector("[");}catch(e){console.log(e.name);}
console.log(document.querySelectorAll(".missing").length);
```

A. `null / SyntaxError / 0`

B. `null / SyntaxError / undefined`

C. `null / null / 0`

D. `undefined / SyntaxError / 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
null
SyntaxError
0
```

A valid selector with no match returns null (or an empty NodeList for all). Invalid selector syntax throws a DOMException named SyntaxError.

**Why the other choices fail:**

- **B:** An empty NodeList has length zero.
- **C:** Invalid syntax is not a normal miss.
- **D:** The single-query miss contract is null.

**Rule/source:** [MDN reference][selectors].

<!-- verify: {"kind": "dom", "stdout": "null\nSyntaxError\n0\n"} -->

</details>

<a id="wt180"></a>
### WT180 — Array operations on a saved query result

What is the complete printed output?

Initial body HTML:
```html
<p>A</p><p>B</p>
```

```javascript
const l=document.querySelectorAll("p");
console.log(Array.isArray(l),typeof l.forEach,typeof l.map);
console.log(Array.from(l,x=>x.textContent).join(","));
```

A. `false function undefined / A,B`

B. `false function undefined / [object HTMLParagraphElement],[object HTMLParagraphElement]`

C. `true function function / A,B`

D. `false undefined undefined / A,B`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
false function undefined
A,B
```

A NodeList is a separate collection interface with forEach, not all Array methods. Array.from produces an array and can map the nodes during conversion.

**Why the other choices fail:**

- **B:** The mapping function explicitly reads each textContent.
- **C:** NodeList is not an Array.
- **D:** This modern NodeList does expose forEach.

**Rule/source:** [MDN reference][nodelist].

<!-- verify: {"kind": "dom", "stdout": "false function undefined\nA,B\n"} -->

</details>

## Validation

The validator parses this Markdown as the source of truth, checks all choices/hidden answers/links and the six mixed sets, runs the 150 language snippets in fresh Node VM contexts, and executes all 180 snippets in fresh browser pages when full validation is requested. It additionally checks 13 language repairs and 2 DOM repairs in fresh contexts. Browser tests include the 30 HTML fixtures. No network requests or existing browser profile are needed.

With Node, Playwright and a supported browser installed:

```bash
node WT/validation/check_wt_bank.mjs
```

For language-only checks without browser dependencies:

```bash
node WT/validation/check_wt_bank.mjs --node-only
```

The latter checks 150 language snippets and 13 repairs, and explicitly leaves the 30 DOM questions plus 2 DOM repairs unverified. Full validation was performed for this bank. To select an existing browser, set WT_BROWSER_EXE to its executable path. NODE_PATH can locate Playwright in a separately installed runtime. No dependency installation is performed by the validator.

The independent runtime checks verify outputs. Explanations additionally identify the relevant contracts and why each distractor violates the supplied scenario. A passing bank is preparation evidence, not a guarantee about your exam score.

[addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[allsettled]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
[any]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
[append]: https://developer.mozilla.org/en-US/docs/Web/API/Element/append
[appendchild]: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[arrow]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[asi]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar
[async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[at]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
[await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[bind]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[callback]: https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
[catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[children]: https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
[classlist]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
[clone]: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
[closures]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
[collections]: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
[concat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
[const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[dataset]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
[date-json]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
[defaults]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
[destructure]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
[disabled]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled
[dispatch]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
[equality]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
[event-target]: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
[events]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[every]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
[fill]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
[filter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
[find]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
[findlast]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex
[flat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
[flatmap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
[foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
[fragment]: https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
[freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[from]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
[functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
[includes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
[innerhtml]: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
[innertext]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
[inputvalue]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value
[isnan]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
[keys]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
[let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[logical]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators
[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[map-foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
[map-object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[microtasks]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
[nodelist]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
[optional]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
[parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[prevent]: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[push]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
[race]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[reduce]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
[remove-listener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
[replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[reverse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
[selectors]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
[set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[set-foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
[slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[some]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
[sort]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[splice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
[split]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
[spread]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[stop]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
[stop-immediate]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
[str-includes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[stringify]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[substring]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
[textcontent]: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
[then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[this]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
[timeout]: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
[toreversed]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed
[tosorted]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
[tospliced]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
[trim]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
[typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
[var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[with]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with
