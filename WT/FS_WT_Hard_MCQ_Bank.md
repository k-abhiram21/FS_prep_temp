# WT: 80 hard JavaScript and DOM MCQs

**Pre-FS screening: 9 October 2026.** Scope: **JavaScript Basics; JSON; Callbacks; Promises; Async/Await; Arrays, Sets & Maps; DOM**. Revised on 8 October. This existing bank was reduced from 180 to 80 selected questions and renumbered. It covers every announced WT area with fewer repeated cases and shorter wording.

Choose **one best answer**. Each hidden answer explains the correct rule and every wrong option. Start with the [direct WT guide](FS_Revision_Notes.md) when needed. The [learning map](FS_WT_Learning_Map.md) compares similar methods and links selected sources.

## Coverage

| Area | Questions | Focus |
|---|---|---|
| Basics/functions/strings | WT001-WT016 (16) | Scope, defaults, returns, closures, this, conversion and string methods |
| Arrays | WT017-WT036 (20) | Mutation, callback arguments, selection, search, holes and shared objects |
| Sets and Maps | WT037-WT042 (6) | Equality, object identity, key types, lookup and callback arguments |
| JSON | WT043-WT050 (8) | Syntax, omissions, numbers, cycles and round-trip changes |
| Callbacks/Promises/await | WT051-WT068 (18) | Timing, result/error flow, cleanup, combinators and async method traps |
| DOM/events | WT069-WT080 (12) | Collections, text/HTML, node identity, properties and event handling |

All **80 questions contain code**: 68 language/async questions and 12 DOM questions with HTML fixtures. **13 questions also ask for a fix**, with working repair code in their hidden answers. The four mixed sets cover every question once.

## Execution assumptions

- Each question starts fresh. Run JavaScript as a **strict classic script**, not a module or a Node CommonJS wrapper.
- Count only console.log output. Its arguments become text separated by one space. In choices, / separates lines. For repair questions, the semicolon separates the original output from the proposed fix.
- Validation uses Node 26.10.0 and Chrome 154.0.8037.97. Timer questions test order, not an exact delay. No external I/O, network race, process.nextTick or setImmediate is assumed.
- Shown exceptions are caught by the code. For DOM questions, the HTML is the entire starting body, with no extra whitespace nodes. Run the JS afterward as a separate script outside that body.
- Only the events shown in the code occur. Text-reading examples use a connected document with the supplied CSS.

WT012 prints an empty-string value, which creates two consecutive spaces. Its hidden answer shows the exact output.

## Four mixed sets of 20

Try one set in **20 minutes** with answers closed, then review mistakes. These are WT-only drills; the exam's 30 MCQs cover all subjects. Take extra time while learning longer traces. Every bank question appears in exactly one set.

| Set | Basics | Arrays | Collections | JSON | Async | DOM | Attempt order |
|---|---:|---:|---:|---:|---:|---:|---|
| 1 | 4 | 5 | 2 | 2 | 4 | 3 | [WT021](#wt021), [WT062](#wt062), [WT027](#wt027), [WT026](#wt026), [WT041](#wt041), [WT078](#wt078), [WT010](#wt010), [WT048](#wt048), [WT012](#wt012), [WT061](#wt061), [WT055](#wt055), [WT050](#wt050), [WT011](#wt011), [WT080](#wt080), [WT023](#wt023), [WT040](#wt040), [WT077](#wt077), [WT009](#wt009), [WT059](#wt059), [WT032](#wt032) |
| 2 | 4 | 5 | 2 | 2 | 4 | 3 | [WT064](#wt064), [WT079](#wt079), [WT025](#wt025), [WT039](#wt039), [WT043](#wt043), [WT068](#wt068), [WT071](#wt071), [WT030](#wt030), [WT052](#wt052), [WT054](#wt054), [WT022](#wt022), [WT016](#wt016), [WT038](#wt038), [WT005](#wt005), [WT072](#wt072), [WT007](#wt007), [WT024](#wt024), [WT044](#wt044), [WT004](#wt004), [WT033](#wt033) |
| 3 | 4 | 5 | 1 | 2 | 5 | 3 | [WT031](#wt031), [WT029](#wt029), [WT053](#wt053), [WT076](#wt076), [WT006](#wt006), [WT020](#wt020), [WT035](#wt035), [WT008](#wt008), [WT047](#wt047), [WT057](#wt057), [WT060](#wt060), [WT063](#wt063), [WT074](#wt074), [WT037](#wt037), [WT075](#wt075), [WT013](#wt013), [WT067](#wt067), [WT034](#wt034), [WT049](#wt049), [WT003](#wt003) |
| 4 | 4 | 5 | 1 | 2 | 5 | 3 | [WT028](#wt028), [WT065](#wt065), [WT014](#wt014), [WT019](#wt019), [WT070](#wt070), [WT051](#wt051), [WT056](#wt056), [WT069](#wt069), [WT073](#wt073), [WT045](#wt045), [WT042](#wt042), [WT002](#wt002), [WT018](#wt018), [WT015](#wt015), [WT001](#wt001), [WT036](#wt036), [WT046](#wt046), [WT017](#wt017), [WT066](#wt066), [WT058](#wt058) |

For each mistake, note the value or state, the method rule, and why the nearest wrong choice fails.

## Basics, functions and strings

<a id="wt001"></a>
### WT001 — Nested declarations and first reads

What prints?

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

C. `7 / 7`

D. `ReferenceError / 7`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
ReferenceError
7
```

The inner let hides the outer score for the whole block. Before the inner declaration runs, reading it throws ReferenceError. The outer score is still 7 afterward.

**Why the other choices fail:**

- **A:** The inner binding does not replace the outer one.
- **B:** TDZ reads do not behave like initialized var bindings.
- **C:** The first read resolves to the uninitialized inner binding.

**Rule/source:** [MDN reference][let].

<!-- verify: {"kind": "js", "stdout": "ReferenceError\n7\n"} -->

</details>

<a id="wt002"></a>
### WT002 — Declarations inside a conditional block

What prints?

```javascript
function read() {
  console.log(n);
  if (true) { var n = 4; let k = 8; }
  console.log(n, typeof k);
}
read();
```

A. `undefined / 4 number`

B. `undefined / undefined undefined`

C. `ReferenceError only`

D. `undefined / 4 undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
undefined
4 undefined
```

var belongs to the function and starts as undefined. let belongs to the block, so the read outside that block cannot access it.

**Why the other choices fail:**

- **A:** k is outside its block.
- **B:** The assignment to function-scoped n does execute.
- **C:** Reading a hoisted var before assignment is permitted.

**Rule/source:** [MDN reference][var].

<!-- verify: {"kind": "js", "stdout": "undefined\n4 undefined\n"} -->

</details>

<a id="wt003"></a>
### WT003 — Array operations through a const binding

What prints?

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

const prevents assigning a different array to the variable. It still allows changes inside the existing array. The failed reassignment leaves that array in place.

**Why the other choices fail:**

- **A:** A rejected assignment does not replace the binding.
- **B:** Assigning a new value to const fails.
- **C:** The earlier push is allowed.

**Rule/source:** [MDN reference][const].

<!-- verify: {"kind": "js", "stdout": "TypeError\n1,2\n"} -->

</details>

<a id="wt004"></a>
### WT004 — Calls with omitted, null and zero arguments

What prints?

```javascript
function f(a = 2, b = a + 1) { return [a,b].map(String).join(","); }
console.log(f(undefined), f(null), f(0));
```

A. `2,3 2,3 2,3`

B. `2,3 null,3 0,3`

C. `2,3 null,1 0,1`

D. `undefined,NaN null,1 0,1`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
2,3 null,1 0,1
```

A default runs for undefined, not null or zero. A later default can use an earlier parameter. Both null + 1 and 0 + 1 give 1.

**Why the other choices fail:**

- **A:** null and zero are supplied values.
- **B:** b is evaluated from the actual a on each call.
- **D:** The first a is replaced by its default.

**Rule/source:** [MDN reference][defaults].

<!-- verify: {"kind": "js", "stdout": "2,3 null,1 0,1\n"} -->

</details>

<a id="wt005"></a>
### WT005 — Two arrow body forms

What prints?

```javascript
const x = () => {value: 3};
const y = () => ({value: 3});
console.log(x(), y().value);
```

A. `SyntaxError`

B. `3 3`

C. `[object Object] 3`

D. `undefined 3`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
undefined 3
```

The first braces form a function body with a label and no return. Parentheses make the second body an object expression that the arrow returns.

**Why the other choices fail:**

- **A:** The labelled statement is valid syntax.
- **B:** A labelled statement does not return its expression.
- **C:** The first body is not an object expression.

**Rule/source:** [MDN reference][arrow].

<!-- verify: {"kind": "js", "stdout": "undefined 3\n"} -->

</details>

<a id="wt006"></a>
### WT006 — A return statement across lines

What prints?

```javascript
function f() {
  return
  {n: 9};
}
console.log(f());
```

A. `9`

B. `[object Object]`

C. `SyntaxError`

D. `undefined`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
undefined
```

The newline ends the return statement. The function returns undefined; the following block is not its returned value.

**Why the other choices fail:**

- **A:** No property is returned.
- **B:** The object-like block is separated from return.
- **C:** This particular program is syntactically valid.

**Rule/source:** [MDN reference][asi].

<!-- verify: {"kind": "js", "stdout": "undefined\n"} -->

</details>

<a id="wt007"></a>
### WT007 — A retained function after reassignment

What prints?

```javascript
let n = 1;
const read = () => n;
n = 5;
console.log(read());
```

A. `5`

B. `undefined`

C. `1`

D. `ReferenceError`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
5
```

The function reads the captured variable when called. It does not save a copy of that variable's earlier value.

**Why the other choices fail:**

- **B:** The enclosing binding remains accessible.
- **C:** Creation did not snapshot n.
- **D:** The binding is initialized and in scope.

**Rule/source:** [MDN reference][closures].

<!-- verify: {"kind": "js", "stdout": "5\n"} -->

</details>

<a id="wt008"></a>
### WT008 — Callbacks created in a var loop

What prints?

```javascript
const f = [];
for (var i = 0; i < 3; i++) f.push(() => i);
console.log(f.map(fn => fn()).join(","));
```

A. `3,3,3`

B. `0,1,2`

C. `0,0,0`

D. `1,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
3,3,3
```

Every callback shares the same var binding. By the time the callbacks run, i is 3. A for loop declared with let would give each iteration its own binding.

**Why the other choices fail:**

- **B:** That requires distinct per-iteration bindings or explicit snapshots.
- **C:** The binding is not frozen at its initial value.
- **D:** The callbacks are invoked after the whole loop.

**Rule/source:** [MDN reference][closures].

<!-- verify: {"kind": "js", "stdout": "3,3,3\n"} -->

</details>

<a id="wt009"></a>
### WT009 — A property call and a detached call

What prints?

```javascript
const o = {n: 6, read() {return this.n;}};
const f = o.read;
console.log(o.read());
try { console.log(f()); } catch (e) { console.log(e.name); }
```

A. `6 / undefined`

B. `6 / TypeError`

C. `6 / 6`

D. `undefined / TypeError`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
6
TypeError
```

Calling o.method() supplies o as this. The detached call has undefined this in this strict script, so the property read fails.

**Why the other choices fail:**

- **A:** Accessing n on undefined this throws before a value can be printed.
- **C:** A normal function does not permanently capture its receiver.
- **D:** The first call does have the receiver o.

**Rule/source:** [MDN reference][this].

<!-- verify: {"kind": "js", "stdout": "6\nTypeError\n"} -->

</details>

<a id="wt010"></a>
### WT010 — Mixed numeric and string operations

What prints?

```javascript
console.log(1 + 2 + "3", "1" + 2 + 3, "8" - 2 + 1);
```

A. `33 123 7`

B. `123 123 7`

C. `33 123 61`

D. `33 6 7`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
33 123 7
```

Evaluate left to right. The first numeric addition gives 3 before string joining starts. Starting with a string joins text immediately. Subtraction converts the string to a number.

**Why the other choices fail:**

- **B:** The first two operands in the first expression are numeric.
- **C:** Subtraction produces a number before the last addition.
- **D:** A leading string keeps concatenation.

**Rule/source:** [MDN reference][addition].

<!-- verify: {"kind": "js", "stdout": "33 123 7\n"} -->

</details>

<a id="wt011"></a>
### WT011 — Three tests on an empty array

What prints?

```javascript
console.log([] == false, [] === false, Boolean([]));
```

A. `false false false`

B. `true false true`

C. `false false true`

D. `true true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true false true
```

== converts the array to a primitive before comparing numeric values. === does not use that conversion. The array object itself is truthy, even when empty.

**Why the other choices fail:**

- **A:** An ordinary empty array is truthy, and the loose comparison converts it.
- **C:** The first loose comparison is true despite the object being truthy.
- **D:** Strict equality does not perform this conversion.

**Rule/source:** [MDN reference][equality].

<!-- verify: {"kind": "js", "stdout": "true false true\n"} -->

</details>

<a id="wt012"></a>
### WT012 — Fallback and conditional expressions

What prints?

```javascript
console.log(0 || 8, 0 ?? 8, "" && 9, "ok" && 0);
```

A. `8 8 false false`

B. `0 0 9 0`

C. `8 0  0`

D. `8 0 undefined 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
8 0  0
```

|| uses the right side when the left side is falsy. ?? does so only for null or undefined. && returns an operand, not always a boolean. The empty string creates two spaces.

**Why the other choices fail:**

- **A:** These operations do not always return booleans; ?? preserves zero.
- **B:** OR treats zero as falsy; empty-string AND does not reach 9.
- **D:** The empty string remains the empty string, not undefined.

**Rule/source:** [MDN reference][logical].

<!-- verify: {"kind": "js", "stdout": "8 0  0\n"} -->

</details>

<a id="wt013"></a>
### WT013 — Whole-string and prefix conversions

What prints?

```javascript
console.log(Number("12px"), parseInt("12px",10), Number(""), parseInt("",10));
```

A. `12 12 0 0`

B. `NaN 12 NaN NaN`

C. `NaN NaN 0 NaN`

D. `NaN 12 0 NaN`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
NaN 12 0 NaN
```

Number converts the whole string; an empty string becomes zero. parseInt reads an integer prefix, and finds none in an empty string.

**Why the other choices fail:**

- **A:** Number does not accept the px suffix; empty parseInt has no integer prefix.
- **B:** Number of the empty string is zero.
- **C:** parseInt can accept the numeric prefix before px.

**Rule/source:** [MDN reference][number].

<!-- verify: {"kind": "js", "stdout": "NaN 12 0 NaN\n"} -->

</details>

<a id="wt014"></a>
### WT014 — String extraction with unusual bounds

What prints?

```javascript
const s = "abcdef";
console.log(JSON.stringify([s.slice(4,1), s.substring(4,1), s.slice(-2)]));
```

A. `["bcd","bcd","ef"]`

B. `["","bcd","ef"]`

C. `["","", "ef"]`

D. `["","bcd","abcdef"]`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
["","bcd","ef"]
```

slice keeps the given order of bounds and supports negative positions. substring swaps reversed nonnegative bounds. Neither changes the original string.

**Why the other choices fail:**

- **A:** slice does not swap bounds.
- **C:** substring swaps these bounds, so it returns bcd.
- **D:** The negative slice position is relative to the end.

**Rule/source:** [MDN reference][substring].

<!-- verify: {"kind": "js", "stdout": "[\"\",\"bcd\",\"ef\"]\n"} -->

</details>

<a id="wt015"></a>
### WT015 — Two replacement calls

What prints?

```javascript
const s = "aba";
console.log(s.replace("a","X"), s.replaceAll("a","X"), s);
```

A. `Xba XbX aba`

B. `XbX XbX aba`

C. `Xba Xba aba`

D. `Xba XbX XbX`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
Xba XbX aba
```

With a string search, replace changes the first match; replaceAll changes every match. Both return a new string and leave s unchanged.

**Why the other choices fail:**

- **B:** replace with a string search is not replaceAll.
- **C:** replaceAll handles both occurrences.
- **D:** String transformations do not mutate s.

**Rule/source:** [MDN reference][replace].

<!-- verify: {"kind": "js", "stdout": "Xba XbX aba\n"} -->

</details>

<a id="wt016"></a>
### WT016 — Searching at the beginning and for absence

What prints in the **original code**, and which fix meets this goal: test whether a substring is present, including at index zero?

```javascript
const s = "apple";
console.log(Boolean(s.indexOf("app")), s.includes("app"), s.indexOf("z"));
```

A. `false true -1 ; use Boolean(s.indexOf(needle))`

B. `false true -1 ; use s.indexOf(needle) === -1`

C. `false true -1 ; use s.includes(needle)`

D. `false true -1 ; use s.indexOf(needle) > 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
false true -1
```

indexOf returns a position: a match at zero is falsy, while missing -1 is truthy. includes gives the membership boolean directly. Use it when you need presence rather than position.

**Why the other choices fail:**

- **A:** Index zero is falsy and the absent index -1 is truthy, so Boolean reverses these important cases.
- **B:** This tests absence rather than presence.
- **D:** A match at index zero fails this condition; >= 0 would be valid.

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

## Array methods

<a id="wt017"></a>
### WT017 — Adding and removing array entries

What prints?

```javascript
const a = [4]; const x = a.push(7,9); const y = a.pop();
console.log(x,y,a.join(","));
```

A. `3 9 4,7,9`

B. `9 9 4,7`

C. `3 9 4,7`

D. `3 2 4,7`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
3 9 4,7
```

push adds the arguments and returns the new length. pop removes the last item and returns that item.

**Why the other choices fail:**

- **A:** pop mutates the array.
- **B:** push returns length rather than the last added value.
- **D:** pop returns a value rather than remaining length.

**Rule/source:** [MDN reference][push].

<!-- verify: {"kind": "js", "stdout": "3 9 4,7\n"} -->

</details>

<a id="wt018"></a>
### WT018 — Two selection/edit operations

What prints?

```javascript
const a = [0,1,2,3];
const b = a.slice(1,3); const c = a.splice(1,2,8);
console.log(JSON.stringify([a,b,c]));
```

A. `[[0,8,3],[1,2],[0,8,3]]`

B. `[[0,1,2,3],[1,2],[1,2]]`

C. `[[0,8,3],[1,2],[1,2]]`

D. `[[0,8],[1,2,3],[1,2,3]]`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
[[0,8,3],[1,2],[1,2]]
```

slice returns a selection without changing the array. splice removes two items at index 1, inserts 8, and returns the removed items.

**Why the other choices fail:**

- **A:** splice returns removed values, not the new full array.
- **B:** splice changes a.
- **D:** slice end is excluded; splice’s second argument is a count.

**Rule/source:** [MDN reference][splice].

<!-- verify: {"kind": "js", "stdout": "[[0,8,3],[1,2],[1,2]]\n"} -->

</details>

<a id="wt019"></a>
### WT019 — Two splice argument lists

What prints?

```javascript
const a=[1,2,3], b=[1,2,3];
console.log(a.splice(1).join(","), b.splice(1,undefined,9).length);
console.log(a.join(","), b.join(","));
```

A. `2,3 0 / 1 1,9,2,3`

B. `2,3 2 / 1 1,9`

C. `2 0 / 1,3 1,9,2,3`

D. `2,3 0 / 1 1,2,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
2,3 0
1 1,9,2,3
```

Leaving out deleteCount removes everything from start onward. Passing undefined explicitly makes deleteCount zero, so that call only inserts.

**Why the other choices fail:**

- **B:** Explicit undefined is not the same as omission.
- **C:** Omitted deleteCount removes every following element.
- **D:** The second call inserts 9.

**Rule/source:** [MDN reference][splice].

<!-- verify: {"kind": "js", "stdout": "2,3 0\n1 1,9,2,3\n"} -->

</details>

<a id="wt020"></a>
### WT020 — Sorting a numeric array without a comparator

What prints?

```javascript
const a=[2,11,3];
console.log(a.sort().join(","));
```

A. `11,2,3`

B. `2,11,3`

C. `2,3,11`

D. `3,2,11`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
11,2,3
```

Default sort compares string forms. That puts 11 before 2. Use a numeric comparator when you want numeric order.

**Why the other choices fail:**

- **B:** sort is not a no-op for this input.
- **C:** That needs a numeric ascending comparator.
- **D:** No descending comparator is supplied.

**Rule/source:** [MDN reference][sort].

<!-- verify: {"kind": "js", "stdout": "11,2,3\n"} -->

</details>

<a id="wt021"></a>
### WT021 — Aliases around a sort call

What prints?

```javascript
const a=[3,1,2], alias=a;
const b=a.sort((x,y)=>x-y);
console.log(a===b, alias.join(","));
```

A. `true 1,2,3`

B. `false 3,1,2`

C. `false 1,2,3`

D. `true 3,1,2`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
true 1,2,3
```

sort changes the original array and returns that same array. Any alias sees the change.

**Why the other choices fail:**

- **B:** That resembles a copying sort, not sort.
- **C:** sort does not return a separate outer array.
- **D:** The alias points to the sorted object.

**Rule/source:** [MDN reference][sort].

<!-- verify: {"kind": "js", "stdout": "true 1,2,3\n"} -->

</details>

<a id="wt022"></a>
### WT022 — Array callback with a block body

What prints?

```javascript
const a=[2,3].map(x=>{x*2;});
console.log(a.length, a[0], 0 in a);
```

A. `2 undefined true`

B. `0 undefined false`

C. `2 4 true`

D. `2 undefined false`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
2 undefined true
```

The callback has no return, so map writes undefined at both visited positions. Those entries exist; they are not holes.

**Why the other choices fail:**

- **B:** map does construct the result array.
- **C:** The block body has no return.
- **D:** An undefined returned value creates an entry, not a hole.

**Rule/source:** [MDN reference][map].

<!-- verify: {"kind": "js", "stdout": "2 undefined true\n"} -->

</details>

<a id="wt023"></a>
### WT023 — A parsing function used as a mapper

What prints in the **original code**, and which fix meets this goal: parse every input as base 10 without using its index as radix?

```javascript
const a=["10","10","10"].map(parseInt);
console.log(a.map(String).join(","));
console.log(["10","10","10"].map(x=>parseInt(x,10)).join(","));
```

A. `10,NaN,2 / 10,10,10 ; map(x => parseInt(x,2))`

B. `10,NaN,2 / 10,10,10 ; map(parseInt,10)`

C. `10,NaN,2 / 10,10,10 ; map(parseInt.bind(null))`

D. `10,NaN,2 / 10,10,10 ; map(x => parseInt(x,10))`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
10,NaN,2
10,10,10
```

map passes value, index and array. parseInt treats the index as its radix: 0 gives decimal here, 1 is invalid, and binary 10 is 2. A wrapper can fix the radix at 10.

**Why the other choices fail:**

- **A:** This fixes the radix to binary, which produces 2 for these strings rather than decimal 10.
- **B:** The second map argument is thisArg, not a radix supplied to the callback.
- **C:** Binding only this does not remove the extra index argument reaching parseInt.

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

<a id="wt024"></a>
### WT024 — Updating an object returned by map

What prints?

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

map makes a new outer array, but returning each original object keeps those object references shared.

**Why the other choices fail:**

- **B:** map is not an automatic deep copy.
- **C:** The outer array is newly constructed.
- **D:** The shared object was mutated.

**Rule/source:** [MDN reference][map].

<!-- verify: {"kind": "js", "stdout": "false true 4\n"} -->

</details>

<a id="wt025"></a>
### WT025 — Selecting values with Boolean

What prints in the **original code**, and which fix meets this goal: remove only null and undefined, keeping zero, false and empty strings?

```javascript
const a=[0,1,false,"",null,undefined,"0"];
console.log(JSON.stringify(a.filter(Boolean)));
```

A. `[1,"0"] ; filter(x => x != null)`

B. `[1,"0"] ; filter(x => x !== null)`

C. `[1,"0"] ; filter(Boolean)`

D. `[1,"0"] ; filter(x => x !== undefined)`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
[1,"0"]
```

Boolean removes all falsy values, including valid zero, false and empty strings. x != null removes only null and undefined here; x !== null && x !== undefined is the strict equivalent.

**Why the other choices fail:**

- **B:** This keeps undefined, which the goal also requires removing.
- **C:** Truthiness also removes zero, false and the empty string; those values are valid under this goal.
- **D:** This keeps null, which the goal also requires removing.

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

<a id="wt026"></a>
### WT026 — Two accumulator initializations

What prints?

```javascript
const a=[2,3]; let x=0,y=0;
const p=a.reduce((s,n)=>{x++;return s+n;});
const r=a.reduce((s,n)=>{y++;return s+n;},0);
console.log(p,r,x,y);
```

A. `5 5 1 1`

B. `3 5 1 2`

C. `5 5 1 2`

D. `5 5 2 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
5 5 1 2
```

Without an initial value, the first present item becomes the accumulator. With an initial value, both items call the callback.

**Why the other choices fail:**

- **A:** The seeded version processes both entries.
- **B:** The unseeded sum still includes its initial element.
- **D:** The first version uses 2 as its seed.

**Rule/source:** [MDN reference][reduce].

<!-- verify: {"kind": "js", "stdout": "5 5 1 2\n"} -->

</details>

<a id="wt027"></a>
### WT027 — Two reductions of an empty array

What prints?

```javascript
try { console.log([].reduce((a,b)=>a+b)); }
catch(e) { console.log(e.name); }
console.log([].reduce((a,b)=>a+b,0));
```

A. `TypeError / undefined`

B. `undefined / 0`

C. `0 / 0`

D. `TypeError / 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
TypeError
0
```

An empty array without an initial value cannot supply an accumulator, so reduce throws. With an initial value, reduce returns it without calling the callback.

**Why the other choices fail:**

- **A:** The supplied seed is the result.
- **B:** The unseeded call throws.
- **C:** Zero is not an implicit reduce seed.

**Rule/source:** [MDN reference][reduce].

<!-- verify: {"kind": "js", "stdout": "TypeError\n0\n"} -->

</details>

<a id="wt028"></a>
### WT028 — Returning a boolean from an iteration callback

What prints in the **original code**, and which fix meets this goal: process 1 and 2, then stop before 3?

```javascript
const seen=[];
const r=[1,2,3].forEach(x=>{seen.push(x);if(x===2)return false;});
console.log(seen.join(","),r);
```

A. `1,2,3 undefined ; replace forEach with map and return false at 2`

B. `1,2,3 undefined ; use a for...of loop and break after processing 2`

C. `1,2,3 undefined ; return undefined from the forEach callback at 2`

D. `1,2,3 undefined ; return true from the forEach callback at 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
1,2,3 undefined
```

Returning from a callback ends only that call. forEach ignores its return and keeps going. A for...of loop allows break; a suitable some callback can also stop early.

**Why the other choices fail:**

- **A:** map collects results but also ignores them for stopping purposes.
- **C:** Changing the ignored callback value does not terminate the traversal.
- **D:** forEach ignores either boolean return; this still processes 3.

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

<a id="wt029"></a>
### WT029 — Two predicates on an empty array

What prints?

```javascript
let calls=0;
console.log([].every(()=>{calls++;return false;}),[].some(()=>{calls++;return true;}),calls);
```

A. `false false 0`

B. `true false 2`

C. `true false 0`

D. `true true 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
true false 0
```

Empty every is true because no item fails. Empty some is false because no item passes. Neither calls the predicate.

**Why the other choices fail:**

- **A:** every is true on the empty array.
- **B:** There are no elements to invoke callbacks on.
- **D:** some needs at least one matching entry.

**Rule/source:** [MDN reference][every].

<!-- verify: {"kind": "js", "stdout": "true false 0\n"} -->

</details>

<a id="wt030"></a>
### WT030 — Value search and position search

What prints in the **original code**, and which fix meets this goal: tell a matching undefined value at index zero apart from no match?

```javascript
const a=[undefined,2];
console.log(a.find(x=>x===undefined), a.findIndex(x=>x===undefined), a.findIndex(x=>x===9));
```

A. `undefined 0 -1 ; check findIndex(predicate) > 0`

B. `undefined 0 -1 ; check find(predicate) !== undefined`

C. `undefined 0 -1 ; check Boolean(findIndex(predicate))`

D. `undefined 0 -1 ; check findIndex(predicate) !== -1`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
undefined 0 -1
```

find returns undefined both for this matching value and for absence. findIndex returns 0 for this match and -1 for absence; compare against -1 explicitly.

**Why the other choices fail:**

- **A:** This excludes a valid match at index zero.
- **B:** A successfully matched undefined element fails this condition.
- **C:** Index zero is falsy and absent -1 is truthy; this loses the distinction in the wrong direction.

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

<a id="wt031"></a>
### WT031 — Membership tests involving NaN and signed zero

What prints?

```javascript
const a=[NaN,0];
console.log(a.includes(NaN),a.indexOf(NaN),a.includes(-0));
```

A. `true -1 true`

B. `false -1 true`

C. `true -1 false`

D. `true 0 true`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
true -1 true
```

includes can find NaN and treats signed zeros as equal. indexOf uses strict equality, which cannot match NaN.

**Why the other choices fail:**

- **B:** includes can find NaN.
- **C:** Signed zeros compare alike for includes.
- **D:** indexOf cannot find NaN through strict equality.

**Rule/source:** [MDN reference][includes].

<!-- verify: {"kind": "js", "stdout": "true -1 true\n"} -->

</details>

<a id="wt032"></a>
### WT032 — Membership tests on an unassigned position

What prints?

```javascript
const a=Array(2);
console.log(a.includes(undefined),a.indexOf(undefined),0 in a);
```

A. `false -1 false`

B. `true 0 false`

C. `true -1 false`

D. `true 0 true`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
true -1 false
```

includes reads a hole as undefined. indexOf skips missing entries. The read value does not mean an actual property exists at index 0.

**Why the other choices fail:**

- **A:** includes does not skip these positions.
- **B:** indexOf skips holes.
- **D:** Reading undefined does not prove an assigned property.

**Rule/source:** [MDN reference][includes].

<!-- verify: {"kind": "js", "stdout": "true -1 false\n"} -->

</details>

<a id="wt033"></a>
### WT033 — Transforming an array with missing positions

What prints?

```javascript
const a=Array(2);
const b=a.map(()=>9), c=Array.from(a,()=>9);
console.log(b.length,0 in b,c.join(","),0 in c);
```

A. `0 false 9,9 true`

B. `2 true 9,9 true`

C. `2 false , false`

D. `2 false 9,9 true`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
2 false 9,9 true
```

map skips missing entries and keeps holes in the result. Array.from reads both positions and calls its mapper for both, creating actual entries.

**Why the other choices fail:**

- **A:** The mapped sparse result keeps length 2.
- **B:** map did not visit a hole.
- **C:** Array.from materializes these entries.

**Rule/source:** [MDN reference][from].

<!-- verify: {"kind": "js", "stdout": "2 false 9,9 true\n"} -->

</details>

<a id="wt034"></a>
### WT034 — Updating a later entry during traversal

What prints?

```javascript
const a=[1,2,3],seen=[];
a.forEach((x,i)=>{seen.push(x);if(i===0)a[1]=8;});
console.log(seen.join(","));
```

A. `1,8`

B. `1,2,3`

C. `1,8,3`

D. `8,8,3`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
1,8,3
```

The method fixes its starting index range, but reads values when it reaches them. Changing a later entry changes the value that its callback sees.

**Why the other choices fail:**

- **A:** No length change or deletion prevents visiting index 2.
- **B:** forEach does not snapshot every value at entry.
- **D:** The first x was read before the mutation.

**Rule/source:** [MDN reference][foreach].

<!-- verify: {"kind": "js", "stdout": "1,8,3\n"} -->

</details>

<a id="wt035"></a>
### WT035 — Flattening nested arrays at two depths

What prints?

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

flat defaults to depth 1. It removes holes it reaches, but keeps arrays nested beyond that depth until a greater depth is used.

**Why the other choices fail:**

- **A:** Each depth count controls one nesting level.
- **B:** Default flat does not flatten the remaining nested [3].
- **D:** flat removes the encountered holes.

**Rule/source:** [MDN reference][flat].

<!-- verify: {"kind": "js", "stdout": "[1,2,[3]] [1,2,3]\n"} -->

</details>

<a id="wt036"></a>
### WT036 — Initializing an array with one object

What prints in the **original code**, and which fix meets this goal: make three separate objects so editing the first leaves the others unchanged?

```javascript
const a=Array(3).fill({n:0});
a[0].n=7;
console.log(a.map(x=>x.n).join(","),a[0]===a[1]);
```

A. `7,7,7 true ; Array(3).map(() => ({n:0}))`

B. `7,7,7 true ; [...Array(3).fill({n:0})]`

C. `7,7,7 true ; Array.from({length:3}, () => ({n:0}))`

D. `7,7,7 true ; Array.from({length:3}).fill({n:0})`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
7,7,7 true
```

fill puts the same object reference in every position. Copying that array still shares the objects. Array.from with a factory that returns a fresh object creates separate objects.

**Why the other choices fail:**

- **A:** map skips all three holes; no objects are created, and a[0].n fails.
- **B:** Spreading creates a different outer array but keeps the shared object references.
- **D:** fill still supplies one shared object to every position.

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

## Sets and Maps

<a id="wt037"></a>
### WT037 — Constructing a Set from special numeric values

What prints?

```javascript
const s=new Set([NaN,NaN,0,-0]);
console.log(s.size,s.has(NaN),s.has(-0));
```

A. `3 true true`

B. `2 true true`

C. `4 false true`

D. `2 false true`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
2 true true
```

Set uses SameValueZero: repeated NaNs count once, and positive and negative zero count as one value.

**Why the other choices fail:**

- **A:** Signed zeros do not create separate entries.
- **C:** Repeated values are combined under the Set equality rule.
- **D:** Set can recognize NaN.

**Rule/source:** [MDN reference][set].

<!-- verify: {"kind": "js", "stdout": "2 true true\n"} -->

</details>

<a id="wt038"></a>
### WT038 — Constructing a Set from object values

What prints?

```javascript
const a={n:1};const s=new Set([a,a,{n:1}]);
console.log(s.size,s.has({n:1}),s.has(a));
```

A. `3 false true`

B. `2 false true`

C. `2 true true`

D. `1 true true`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
2 false true
```

The same object reference counts once; a different object with equal-looking contents counts separately. A fresh object passed to has is not either stored object.

**Why the other choices fail:**

- **A:** The same a reference is not stored twice.
- **C:** The has argument is a newly created object.
- **D:** Set does not compare object properties structurally.

**Rule/source:** [MDN reference][set].

<!-- verify: {"kind": "js", "stdout": "2 false true\n"} -->

</details>

<a id="wt039"></a>
### WT039 — Two Map keys with similar text

What prints?

```javascript
const m=new Map();m.set(1,"number");m.set("1","string");
console.log(m.size,m.get(1),m.get("1"));
```

A. `1 number number`

B. `1 string string`

C. `2 number string`

D. `2 string number`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
2 number string
```

Map keeps key types. A numeric key and a string key with similar text remain separate keys.

**Why the other choices fail:**

- **A:** The string key does not overwrite the numeric key.
- **B:** That resembles ordinary object property-key coercion.
- **D:** Each lookup keeps its original key type.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "2 number string\n"} -->

</details>

<a id="wt040"></a>
### WT040 — Two Map lookups and presence checks

What prints?

```javascript
const m=new Map([["x",undefined]]);
console.log(m.get("x"),m.get("y"),m.has("x"),m.has("y"));
```

A. `undefined undefined true true`

B. `undefined null true false`

C. `undefined undefined false false`

D. `undefined undefined true false`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
undefined undefined true false
```

get returns undefined for both a missing key and a key stored with undefined. has tells those cases apart.

**Why the other choices fail:**

- **A:** The y key was never inserted.
- **B:** Missing get returns undefined.
- **C:** The x key is present.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "undefined undefined true false\n"} -->

</details>

<a id="wt041"></a>
### WT041 — Inspecting Map callback arguments

What prints?

```javascript
const a=[];
new Map([["x",5]]).forEach((first,second)=>a.push(first+":"+second));
console.log(a.join(","));
```

A. `x:5`

B. `x:0`

C. `5:x`

D. `5:0`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
5:x
```

Map forEach passes value, key, then map. Map entry iteration instead gives key, value pairs. Array forEach passes value/index/array; Set passes value/value/set.

**Why the other choices fail:**

- **A:** That is entry-pair order, not callback argument order.
- **B:** Neither argument contract matches that output.
- **D:** The second argument is the key, not an index.

**Rule/source:** [MDN reference][map-foreach].

<!-- verify: {"kind": "js", "stdout": "5:x\n"} -->

</details>

<a id="wt042"></a>
### WT042 — A property assignment on a Map object

What prints?

```javascript
const m=new Map();
m["x"]=4;
console.log(m.get("x"),m.has("x"),m["x"],m.size);
```

A. `4 false 4 0`

B. `undefined false 4 0`

C. `4 true 4 1`

D. `undefined false undefined 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
undefined false 4 0
```

Bracket assignment creates an ordinary object property on the Map. It does not add a Map entry; use set for that.

**Why the other choices fail:**

- **A:** get consults entries, not the ordinary x property.
- **C:** Only set changes this collection association.
- **D:** The ordinary x property does exist.

**Rule/source:** [MDN reference][map-object].

<!-- verify: {"kind": "js", "stdout": "undefined false 4 0\n"} -->

</details>

## JSON

<a id="wt043"></a>
### WT043 — Parsing three JSON roots

What prints?

```javascript
const a=JSON.parse("7"),b=JSON.parse("null");
console.log(typeof a,b,JSON.parse('"ok"'));
```

A. `number undefined ok`

B. `SyntaxError`

C. `string null ok`

D. `number null ok`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
number null ok
```

JSON can contain a number, null or string at its root. It does not have to begin with an object or array.

**Why the other choices fail:**

- **A:** JSON null maps to null.
- **B:** All three root values are valid JSON.
- **C:** Parsing numerical text produces a number.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "number null ok\n"} -->

</details>

<a id="wt044"></a>
### WT044 — Parsing two object-shaped texts

What prints?

```javascript
for(const s of ['{"x":1}','{x:1}','{"x":1,}']) {
  try { console.log(JSON.parse(s).x); }
  catch(e) { console.log(e.name); }
}
```

A. `1 / SyntaxError / 1`

B. `1 / SyntaxError / SyntaxError`

C. `SyntaxError / SyntaxError / SyntaxError`

D. `1 / 1 / 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
1
SyntaxError
SyntaxError
```

JSON needs quoted property names and forbids trailing commas. JavaScript object syntax allows more forms than JSON text does.

**Why the other choices fail:**

- **A:** Trailing commas are not permitted.
- **C:** The first text is valid.
- **D:** The latter two texts violate JSON syntax.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "1\nSyntaxError\nSyntaxError\n"} -->

</details>

<a id="wt045"></a>
### WT045 — Serializing unsupported values in two containers

What prints?

```javascript
console.log(JSON.stringify({a:undefined,b:()=>1,c:2}));
console.log(JSON.stringify([undefined,()=>1,2]));
```

A. `{"a":null,"b":null,"c":2} / [null,null,2]`

B. `TypeError`

C. `{"c":2} / [2]`

D. `{"c":2} / [null,null,2]`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
{"c":2}
[null,null,2]
```

Unsupported object-property values are omitted. Unsupported array entries become null so positions remain. Top-level stringify(undefined) returns undefined, not JSON text.

**Why the other choices fail:**

- **A:** The object properties are omitted.
- **B:** These values do not by themselves make stringify throw.
- **C:** The array positions are preserved as null.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"c\":2}\n[null,null,2]\n"} -->

</details>

<a id="wt046"></a>
### WT046 — Serializing unusual numeric values

What prints?

```javascript
console.log(JSON.stringify({a:NaN,b:Infinity,c:-0}));
console.log(JSON.stringify([NaN,Infinity]));
```

A. `{} / []`

B. `{"a":null,"b":null,"c":0} / [null,null]`

C. `{"a":NaN,"b":Infinity,"c":-0} / [NaN,Infinity]`

D. `TypeError`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
{"a":null,"b":null,"c":0}
[null,null]
```

JSON has no NaN or infinity number forms, so stringify writes null for them. It also writes negative zero as 0.

**Why the other choices fail:**

- **A:** These numeric values are converted rather than omitted.
- **C:** Those numerical tokens are not valid JSON.
- **D:** They do not trigger the BigInt/cycle error contract.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"a\":null,\"b\":null,\"c\":0}\n[null,null]\n"} -->

</details>

<a id="wt047"></a>
### WT047 — Two object graphs for serialization

What prints?

```javascript
const child={n:1};
console.log(JSON.stringify({a:child,b:child}));
const x={};x.self=x;
try { JSON.stringify(x); } catch(e) { console.log(e.name); }
```

A. `{"a":{"n":1},"b":{"n":1}} / TypeError`

B. `{"a":{"n":1},"b":{"n":1}} only`

C. `{"a":{"n":1},"b":null} / TypeError`

D. `TypeError only`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
{"a":{"n":1},"b":{"n":1}}
TypeError
```

Sharing one child in two places is not a cycle. A link back to an active ancestor is a cycle, and default stringify rejects it.

**Why the other choices fail:**

- **B:** The second graph is genuinely circular.
- **C:** Repeated references are not automatically replaced by null.
- **D:** The first graph is shared but acyclic.

**Rule/source:** [MDN reference][stringify].

<!-- verify: {"kind": "js", "stdout": "{\"a\":{\"n\":1},\"b\":{\"n\":1}}\nTypeError\n"} -->

</details>

<a id="wt048"></a>
### WT048 — Object comparisons after a JSON round trip

What prints?

```javascript
const x={n:1};const a={p:x,q:x};
const b=JSON.parse(JSON.stringify(a));
console.log(a.p===a.q,b.p===b.q,b.p.n);
```

A. `true false undefined`

B. `true false 1`

C. `false false 1`

D. `true true 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true false 1
```

JSON saves repeated contents, not shared object identity. Parsing creates separate objects for the two positions.

**Why the other choices fail:**

- **A:** The data property itself is preserved.
- **C:** The original p and q share x.
- **D:** JSON has no reference-identity mechanism.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "true false 1\n"} -->

</details>

<a id="wt049"></a>
### WT049 — Inspecting a parsed date representation

What prints?

```javascript
const d=new Date("2020-01-02T00:00:00.000Z");
const x=JSON.parse(JSON.stringify({d}));
console.log(typeof x.d,x.d instanceof Date,x.d);
```

A. `string false 2020-01-02T00:00:00.000Z`

B. `object false [object Object]`

C. `object true 2020-01-02T00:00:00.000Z`

D. `string true 2020-01-02T00:00:00.000Z`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
string false 2020-01-02T00:00:00.000Z
```

Date normally uses toJSON to produce an ISO string. Parsing keeps that string; it does not automatically create a Date.

**Why the other choices fail:**

- **B:** The default Date hook provides string content.
- **C:** The class is not encoded automatically.
- **D:** A string is not a Date instance.

**Rule/source:** [MDN reference][date-json].

<!-- verify: {"kind": "js", "stdout": "string false 2020-01-02T00:00:00.000Z\n"} -->

</details>

<a id="wt050"></a>
### WT050 — Transforming a parsed property with a reviver

What prints?

```javascript
const x=JSON.parse('{"a":1,"b":2}',(k,v)=>k==="a"?undefined:v);
console.log(Object.keys(x).join(","),x.a,x.b);
```

A. `b undefined 2`

B. `a,b undefined 2`

C. `a,b 1 2`

D. `b null 2`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
b undefined 2
```

Returning undefined from the reviver removes that property. It does not keep the property with an undefined value.

**Why the other choices fail:**

- **B:** The reviver deletes a rather than assigning undefined.
- **C:** The reviver’s return value affects the parsed result.
- **D:** Absence reads undefined.

**Rule/source:** [MDN reference][parse].

<!-- verify: {"kind": "js", "stdout": "b undefined 2\n"} -->

</details>

## Callbacks, Promises and async/await

<a id="wt051"></a>
### WT051 — Passing a callback to a local operation

What prints?

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

This use function calls the callback immediately. Being a callback does not automatically mean running later.

**Why the other choices fail:**

- **A:** Passing the arrow does not call it before use.
- **C:** The callback executes before C.
- **D:** Nothing in use schedules deferred execution.

**Rule/source:** [MDN reference][callback].

<!-- verify: {"kind": "js", "stdout": "A\nB\nC\nD\n"} -->

</details>

<a id="wt052"></a>
### WT052 — An error-first operation with two completion sites

What prints in the **original code**, and which fix meets this goal: report only one completion when the shown error exists?

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

C. `error / 7 ; wrap the first cb(error) in Promise.resolve(...) without returning`

D. `error / 7 ; use if(error) return cb(error)`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
error
7
```

Calling cb(error) reports an error but does not exit work. Return from work after that call to stop the second completion; returning only from the callback is not enough.

**Why the other choices fail:**

- **A:** That exits the callback only; work resumes and invokes the callback again.
- **B:** Neither branch returns from work, so the later success callback still runs.
- **C:** Wrapping its return value does not exit work or suppress the second call.

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

<a id="wt053"></a>
### WT053 — Three function levels and one return

What prints?

```javascript
function read(cb){cb(5);}
function outer(){read(x=>x*2);}
console.log(outer());
```

A. `undefined`

B. `10`

C. `5`

D. `Promise`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
undefined
```

The callback returns 10 to read, which ignores it. outer also returns nothing. Callback results do not automatically become the enclosing function's result.

**Why the other choices fail:**

- **B:** No enclosing function returns the callback’s result.
- **C:** The supplied callback receives 5, but outer does not return it.
- **D:** No async function or Promise contract is supplied.

**Rule/source:** [MDN reference][callback].

<!-- verify: {"kind": "js", "stdout": "undefined\n"} -->

</details>

<a id="wt054"></a>
### WT054 — A reaction that queues another microtask

What prints?

```javascript
console.log("S");
Promise.resolve().then(()=>{
  console.log("P");queueMicrotask(()=>console.log("Q"));
});
setTimeout(()=>console.log("T"),0);
console.log("E");
```

A. `S / E / P / T / Q`

B. `S / E / T / P / Q`

C. `S / E / P / Q / T`

D. `S / P / Q / E / T`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
S
E
P
Q
T
```

Synchronous code finishes first. The Promise handler then queues another microtask. That new microtask runs before the timer task.

**Why the other choices fail:**

- **A:** The newly queued microtask runs before the next timer task.
- **B:** The microtask checkpoint precedes that timer task.
- **D:** Promise reactions do not interrupt current synchronous work.

**Rule/source:** [MDN reference][microtasks].

<!-- verify: {"kind": "js", "stdout": "S\nE\nP\nQ\nT\n"} -->

</details>

<a id="wt055"></a>
### WT055 — Logging around Promise construction

What prints?

```javascript
console.log("A");
const p=new Promise(resolve=>{console.log("B");resolve("C");});
p.then(console.log);
console.log("D");
```

A. `A / D / B / C`

B. `B / A / D / C`

C. `A / B / C / D`

D. `A / B / D / C`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
A
B
D
C
```

The Promise constructor runs its executor immediately. The success handler runs later, after the current synchronous code.

**Why the other choices fail:**

- **A:** The executor is not deferred.
- **B:** A is printed before construction.
- **C:** The reaction is deferred even though p is fulfilled.

**Rule/source:** [MDN reference][promise].

<!-- verify: {"kind": "js", "stdout": "A\nB\nD\nC\n"} -->

</details>

<a id="wt056"></a>
### WT056 — Resolving and continuing an executor

What prints?

```javascript
new Promise((resolve,reject)=>{
  resolve(1);console.log("after");reject(2);
}).then(x=>console.log(x));
console.log("sync");
```

A. `after / 1 / sync`

B. `after / sync / 2`

C. `sync / 1`

D. `after / sync / 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
after
sync
1
```

resolve does not exit the executor. The first resolution fixes the outcome; a later reject cannot replace it.

**Why the other choices fail:**

- **A:** The fulfillment reaction runs asynchronously.
- **B:** The later reject cannot override the earlier resolution.
- **C:** The executor continues and prints after.

**Rule/source:** [MDN reference][promise].

<!-- verify: {"kind": "js", "stdout": "after\nsync\n1\n"} -->

</details>

<a id="wt057"></a>
### WT057 — Identity and results around then

What prints?

```javascript
const p=Promise.resolve(2);
const r=p.then(x=>x+3);
console.log(p===r);
r.then(console.log);
```

A. `true / 5`

B. `false / 2`

C. `5 / false`

D. `false / 5`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
false
5
```

then returns a different Promise immediately. That Promise eventually follows the handler's returned value, 5.

**Why the other choices fail:**

- **A:** The original Promise is not mutated into the chain result.
- **B:** The handler’s return determines the result.
- **C:** The identity read is synchronous; the reaction is later.

**Rule/source:** [MDN reference][then].

<!-- verify: {"kind": "js", "stdout": "false\n5\n"} -->

</details>

<a id="wt058"></a>
### WT058 — A throw and two error-handler positions

What prints in the **original code**, and which fix meets this goal: handle the success handler's Error X and print handled X?

```javascript
Promise.resolve(1)
 .then(()=>{throw new Error("X");},()=>console.log("same"))
 .catch(e=>console.log("next",e.message));
```

A. `next X ; attach that handler only to the original Promise.resolve(1)`

B. `next X ; put that handler only in the second argument of the same then`

C. `next X ; use .finally(e => console.log("handled",e.message))`

D. `next X ; attach .catch(e => console.log("handled",e.message)) to the Promise returned by then`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
next X
```

The second then argument handles rejection of the input Promise. A throw in its sibling success handler rejects the new Promise returned by then. Put catch after that stage.

**Why the other choices fail:**

- **A:** The original Promise remains fulfilled; the handler throw rejects a different returned Promise.
- **B:** The same then rejection handler observes the incoming Promise, which is fulfilled in this scenario.
- **C:** finally receives no rejection argument; reading e.message would throw and cleanup would not recover X.

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

<a id="wt059"></a>
### WT059 — A catch return and a following handler

What prints?

```javascript
Promise.reject("bad").catch(()=>7).then(x=>console.log(x+1));
```

A. `bad`

B. `No output`

C. `8`

D. `7`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
8
```

A normal return from catch recovers to success with value 7. The next success handler receives 7 and adds 1.

**Why the other choices fail:**

- **A:** The catch replaced the rejection with a successful result.
- **B:** The downstream fulfillment handler does run after recovery.
- **D:** The next handler adds 1.

**Rule/source:** [MDN reference][catch].

<!-- verify: {"kind": "js", "stdout": "8\n"} -->

</details>

<a id="wt060"></a>
### WT060 — Returning a value from cleanup

What prints?

```javascript
Promise.resolve(5).finally(()=>9).then(console.log);
```

A. `undefined`

B. `5`

C. `9`

D. `5 / 9`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
5
```

A successful finally keeps the earlier value. Returning 9 from that cleanup does not replace the earlier fulfillment value; a failed cleanup could replace the outcome.

**Why the other choices fail:**

- **A:** The earlier fulfillment value is kept.
- **C:** That would be a transforming then callback.
- **D:** Only the final log prints; finally itself does not log.

**Rule/source:** [MDN reference][finally].

<!-- verify: {"kind": "js", "stdout": "5\n"} -->

</details>

<a id="wt061"></a>
### WT061 — Completing two inputs in a different order

What prints?

```javascript
let a,b;
const p=new Promise(r=>a=r),q=new Promise(r=>b=r);
Promise.all([p,q]).then(x=>console.log(x.join(",")));
b("B");a("A");
```

A. `A`

B. `A,B`

C. `B,A`

D. `B`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
A,B
```

Promise.all returns results in input order, even when the second input finishes first.

**Why the other choices fail:**

- **A:** It collects both successful values.
- **C:** Completion order does not reorder results.
- **D:** all waits for both fulfillments.

**Rule/source:** [MDN reference][all].

<!-- verify: {"kind": "js", "stdout": "A,B\n"} -->

</details>

<a id="wt062"></a>
### WT062 — A rejected aggregate and a delayed input

What prints?

```javascript
const slow=new Promise(r=>setTimeout(()=>{console.log("finished");r(2);},0));
Promise.all([Promise.reject("bad"),slow]).catch(console.log);
```

A. `finished / bad`

B. `bad / finished`

C. `bad only`

D. `finished only`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
bad
finished
```

Promise.all rejects as soon as this input rejects. It does not cancel the already scheduled slow work.

**Why the other choices fail:**

- **A:** The immediate rejection reaction precedes the later timer.
- **C:** Promise.all does not cancel slow.
- **D:** The aggregate rejection is handled and logged.

**Rule/source:** [MDN reference][all].

<!-- verify: {"kind": "js", "stdout": "bad\nfinished\n"} -->

</details>

<a id="wt063"></a>
### WT063 — Mixed outcomes under allSettled

What prints?

```javascript
Promise.allSettled([Promise.reject("E"),Promise.resolve(4)])
 .then(r=>console.log(r[0].status,r[0].reason,r[1].status,r[1].value));
```

A. `E only`

B. `rejected undefined fulfilled 4`

C. `rejected E fulfilled 4`

D. `fulfilled 4 rejected E`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
rejected E fulfilled 4
```

allSettled returns one record per input, in input order. A failed record has reason; a successful record has value.

**Why the other choices fail:**

- **A:** An input rejection does not reject this aggregate.
- **B:** The rejected record has its reason E.
- **D:** Result order is not completion order.

**Rule/source:** [MDN reference][allsettled].

<!-- verify: {"kind": "js", "stdout": "rejected E fulfilled 4\n"} -->

</details>

<a id="wt064"></a>
### WT064 — Two combinators with settled inputs

What prints?

```javascript
const bad=Promise.reject("E"),good=Promise.resolve("V");
(async()=>{
  try{console.log(await Promise.race([bad,good]));}
  catch(e){console.log("race",e);}
  console.log("any",await Promise.any([bad,good]));
})();
```

A. `race E / any V`

B. `race V / any V`

C. `race E / any E`

D. `race E only`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
race E
any V
```

For these already settled inputs, race observes the first queued rejection. any ignores rejection while an input can still fulfill.

**Why the other choices fail:**

- **B:** race does not ignore the first rejection.
- **C:** any seeks a fulfillment, which good supplies.
- **D:** The catch recovers and execution continues to any.

**Rule/source:** [MDN reference][any].

<!-- verify: {"kind": "js", "stdout": "race E\nany V\n"} -->

</details>

<a id="wt065"></a>
### WT065 — Awaiting a numeric value

What prints?

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

An async function starts immediately. Even awaiting a plain value pauses its continuation until later.

**Why the other choices fail:**

- **A:** The body starts immediately when f is called.
- **C:** Awaiting a primitive is not a synchronous continuation.
- **D:** The continuation is scheduled and does run.

**Rule/source:** [MDN reference][await].

<!-- verify: {"kind": "js", "stdout": "A\nC\nB\n"} -->

</details>

<a id="wt066"></a>
### WT066 — Returning rejection inside a local try

What prints in the **original code**, and which fix meets this goal: make the local catch recover and fulfill f() with fixed?

```javascript
async function f(){
 try{return Promise.reject("X");}
 catch(e){return "fixed";}
}
f().then(console.log,e=>console.log("rejected",e));
```

A. `rejected X ; add finally { return Promise.reject("X"); }`

B. `rejected X ; use Promise.resolve(Promise.reject("X")) without await`

C. `rejected X ; replace return Promise.reject("X") with return await Promise.reject("X")`

D. `rejected X ; return Promise.reject("X").then(x => x)`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
rejected X
```

Returning the rejected Promise does not throw inside this local try. The caller receives the rejection. return await makes the rejection throw here, so this catch can recover.

**Why the other choices fail:**

- **A:** A finally return would override the previous outcome with a rejection; it does not route that rejection into the existing catch.
- **B:** Promise.resolve adopts the rejection; it does not synchronously throw it into the local catch.
- **D:** This still returns a rejected Promise without a local await throwing inside try.

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

<a id="wt067"></a>
### WT067 — A wait around asynchronous forEach callbacks

What prints in the **original code**, and which fix meets this goal: finish both delayed additions one after another before logging the total?

```javascript
(async()=>{
 let total=0;
 await [1,2].forEach(async x=>{await new Promise(r=>setTimeout(r,0));total+=x;});
 console.log(total);
 setTimeout(()=>console.log(total),0);
})();
```

A. `0 / 3 ; return total from each async forEach callback`

B. `0 / 3 ; await [1,2].map(async x => ...) directly`

C. `0 / 3 ; put another await before the existing forEach call`

D. `0 / 3 ; replace forEach with a for...of loop that awaits each delayed addition`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
0
3
```

forEach returns undefined and ignores callback Promises. Awaiting that result cannot wait for them. Both addition timers start before the final timer. Use an awaiting for...of loop for sequential work, or collect Promises and await Promise.all for independent work.

**Why the other choices fail:**

- **A:** forEach still ignores those returned Promises and returns undefined.
- **B:** map returns an array, not an aggregation Promise; awaiting that array does not await its entries.
- **C:** Awaiting undefined again does not collect or wait for the callback Promises.

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

<a id="wt068"></a>
### WT068 — Selecting with an asynchronous predicate

What prints in the **original code**, and which fix meets this goal: keep only inputs whose awaited predicate is true, in input order?

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

Each async predicate returns a truthy Promise immediately, so filter keeps every item. Await the predicate results first, then select the original items using those booleans and their matching indices.

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

## DOM and events

<a id="wt069"></a>
### WT069 — Two saved collections after insertion

What prints?

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

A. `2 1`

B. `1 2`

C. `2 2`

D. `1 1`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
1 2
```

querySelectorAll keeps a fixed list of matches. getElementsByClassName returns a live collection that includes the added match.

**Why the other choices fail:**

- **A:** That reverses the two API contracts.
- **C:** The static NodeList does not gain a member.
- **D:** The HTMLCollection is live.

**Rule/source:** [MDN reference][collections].

<!-- verify: {"kind": "dom", "stdout": "1 2\n"} -->

</details>

<a id="wt070"></a>
### WT070 — Inspecting a mixed-content parent's children

What prints?

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

C. `3 1 1 SPAN`

D. `3 3 3 SPAN`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
3 1 3 SPAN
```

childNodes includes text A, the span, and text C. children includes only the span element. nodeType 3 means a text node.

**Why the other choices fail:**

- **B:** childNodes also includes the text nodes.
- **C:** firstChild is the initial text node.
- **D:** children does not include text.

**Rule/source:** [MDN reference][children].

<!-- verify: {"kind": "dom", "stdout": "3 1 3 SPAN\n"} -->

</details>

<a id="wt071"></a>
### WT071 — Writing markup-shaped content in two ways

What prints?

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

B. `1 X / 1 X`

C. `0 X / 1 X`

D. `0 <b>X</b> / 0 <b>X</b>`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
0 <b>X</b>
1 X
```

textContent writes literal text. innerHTML parses markup and creates an element with text X.

**Why the other choices fail:**

- **B:** The first operation does not parse HTML.
- **C:** The first literal includes the angle-bracket text.
- **D:** The second operation does parse HTML.

**Rule/source:** [MDN reference][textcontent].

<!-- verify: {"kind": "dom", "stdout": "0 <b>X</b>\n1 X\n"} -->

</details>

<a id="wt072"></a>
### WT072 — A stored button after HTML reassignment

What prints?

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

C. `false false 2`

D. `false false 0`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false false 1
```

Reassigning innerHTML creates a new button without the old listener. The saved old button still exists separately and keeps its own listener.

**Why the other choices fail:**

- **A:** Identical markup does not preserve node identity.
- **C:** The new node does not inherit that registration.
- **D:** Detachment does not erase the old node’s listener registration.

**Rule/source:** [MDN reference][innerhtml].

<!-- verify: {"kind": "dom", "stdout": "false false 1\n"} -->

</details>

<a id="wt073"></a>
### WT073 — Appending an already attached node

What prints?

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

B. `0 1 false true`

C. `0 1 true true`

D. `1 1 false true`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
0 1 true true
```

appendChild moves an existing node; it does not copy it. It returns that same node.

**Why the other choices fail:**

- **A:** The node’s parent changes.
- **B:** The returned value is the same node.
- **D:** Moving does not leave a copied child in a.

**Rule/source:** [MDN reference][appendchild].

<!-- verify: {"kind": "dom", "stdout": "0 1 true true\n"} -->

</details>

<a id="wt074"></a>
### WT074 — Clicking an original and a deep clone

What prints?

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

A. `1 1 false`

B. `2 1 false`

C. `2 1 true`

D. `1 0 false`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
1 1 false
```

Deep clone copies the child span, but not listeners installed with addEventListener. The clone is a different node. Its copied ID can cause duplicate IDs.

**Why the other choices fail:**

- **B:** The registered listener is not copied.
- **C:** Cloning does not reuse identity or the installed listener.
- **D:** The true argument copies descendants.

**Rule/source:** [MDN reference][clone].

<!-- verify: {"kind": "dom", "stdout": "1 1 false\n"} -->

</details>

<a id="wt075"></a>
### WT075 — Assigning an input's current value

What prints?

Initial body HTML:
```html
<input id="i" value="old">
```

```javascript
const i=document.getElementById("i");i.value="new";
console.log(i.value,i.getAttribute("value"),i.defaultValue);
```

A. `new old old`

B. `new new new`

C. `new old new`

D. `old old old`

<details>
<summary>Answer and reasoning</summary>

**Correct: A**

```text
new old old
```

The value property is the input's current value. Assigning it does not change the old value attribute, which supplies defaultValue.

**Why the other choices fail:**

- **B:** Assigning the current value does not rewrite the value attribute here.
- **C:** defaultValue reflects the unchanged attribute.
- **D:** The current property assignment takes effect.

**Rule/source:** [MDN reference][inputvalue].

<!-- verify: {"kind": "dom", "stdout": "new old old\n"} -->

</details>

<a id="wt076"></a>
### WT076 — Three event registrations along a path

What prints?

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

B. `capture / bubble / target`

C. `capture / target / bubble`

D. `target / bubble`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
capture
target
bubble
```

The ancestor's capture listener runs first, followed by the target listener and then the ancestor's bubble listener.

**Why the other choices fail:**

- **A:** Capture precedes the target phase.
- **B:** Bubbling follows the target.
- **D:** The capture listener is registered with true.

**Rule/source:** [MDN reference][events].

<!-- verify: {"kind": "dom", "stdout": "capture\ntarget\nbubble\n"} -->

</details>

<a id="wt077"></a>
### WT077 — Two button listeners and an ancestor listener

What prints in the **original code**, and which fix meets this goal: stop the later button listener and the parent listener?

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

A. `one / two ; replace stopPropagation with preventDefault`

B. `one / two ; keep stopPropagation and return false from the addEventListener callback`

C. `one / two ; replace stopPropagation with stopImmediatePropagation in the first button listener`

D. `one / two ; keep stopPropagation but set bubbles:false on the event`

<details>
<summary>Answer and reasoning</summary>

**Correct: C**

```text
one
two
```

stopPropagation stops travel to other nodes, but allows the next listener on this node. Use stopImmediatePropagation to stop both later same-node listeners and further travel.

**Why the other choices fail:**

- **A:** This event was not created cancelable, and cancellation would not stop listener traversal anyway.
- **B:** addEventListener ignores the callback return; the next same-node listener still runs.
- **D:** This suppresses travel to ancestors but not the second listener on the target button.

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

<a id="wt078"></a>
### WT078 — Cancellation and an ancestor listener

What prints?

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

A. `true / true`

B. `true / false`

C. `false only`

D. `false / true`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
true
false
```

preventDefault cancels the allowed default action, but does not stop propagation. The parent sees defaultPrevented. dispatchEvent returns false when the event was canceled.

**Why the other choices fail:**

- **A:** A canceled dispatch reports false.
- **C:** preventDefault does not stop the parent listener.
- **D:** The target listener does cancel this cancelable event.

**Rule/source:** [MDN reference][prevent].

<!-- verify: {"kind": "dom", "stdout": "true\nfalse\n"} -->

</details>

<a id="wt079"></a>
### WT079 — Two attempts to remove a callback

What prints in the **original code**, and which fix meets this goal: remove the listener before the first dispatch, keeping the count zero?

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

A. `1 ; use removeEventListener("x",() => f())`

B. `1 ; use removeEventListener("x",f,true)`

C. `1 ; use removeEventListener("x",f.bind(b))`

D. `1 ; use removeEventListener("x",f) for the first removal`

<details>
<summary>Answer and reasoning</summary>

**Correct: D**

```text
1
```

The new arrow in the first removal is not f. Removing with f succeeds. Keep the original callback reference and use the matching capture flag.

**Why the other choices fail:**

- **A:** A wrapper function is distinct from the registered f.
- **B:** The registration uses capture false; a true removal does not match it.
- **C:** bind creates another function identity, even if its target behavior resembles f.

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

<a id="wt080"></a>
### WT080 — Array operations on a saved query result

What prints?

Initial body HTML:
```html
<p>A</p><p>B</p>
```

```javascript
const l=document.querySelectorAll("p");
console.log(Array.isArray(l),typeof l.forEach,typeof l.map);
console.log(Array.from(l,x=>x.textContent).join(","));
```

A. `true function function / A,B`

B. `false function undefined / A,B`

C. `false function undefined / [object HTMLParagraphElement],[object HTMLParagraphElement]`

D. `false undefined undefined / A,B`

<details>
<summary>Answer and reasoning</summary>

**Correct: B**

```text
false function undefined
A,B
```

NodeList has forEach but is not an Array and has no map method. Array.from makes an array and can transform the nodes during conversion.

**Why the other choices fail:**

- **A:** NodeList is not an Array.
- **C:** The mapping function explicitly reads each textContent.
- **D:** This modern NodeList does expose forEach.

**Rule/source:** [MDN reference][nodelist].

<!-- verify: {"kind": "dom", "stdout": "false function undefined\nA,B\n"} -->

</details>

## Validation

The validator reads this Markdown and checks choices, hidden answers, links and all four sets. It runs 68 language questions plus 11 repairs in fresh Node contexts. Full validation also runs all 80 questions plus 13 repairs in fresh browser pages, including the 12 HTML fixtures and 2 DOM repairs. It makes no network requests or use of an existing browser profile.

Full check, with Node, Playwright and a supported browser available:

```bash
node WT/validation/check_wt_bank.mjs
```

Language-only check:

```bash
node WT/validation/check_wt_bank.mjs --node-only
```

The language-only command leaves the 12 DOM questions and 2 DOM repairs unverified. Full validation was performed. WT_BROWSER_EXE selects an existing browser executable; NODE_PATH can locate Playwright in another runtime. The validator does not install dependencies.

The original code, expected outputs and repair code are retained. The explanations support the stated cases; the learning map covers further method comparisons. These are original practice questions, not exam predictions.

[addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[allsettled]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
[any]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
[appendchild]: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
[arrow]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[asi]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar
[async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[callback]: https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
[catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[children]: https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
[clone]: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
[closures]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
[collections]: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
[const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[date-json]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
[defaults]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
[equality]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
[events]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[every]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
[fill]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
[filter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
[find]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
[flat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
[foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
[from]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
[includes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
[innerhtml]: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
[inputvalue]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value
[let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[logical]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators
[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[map-foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
[map-object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[microtasks]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
[nodelist]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[prevent]: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[push]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
[reduce]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
[remove-listener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
[replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[sort]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[splice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
[stop]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
[str-includes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
[stringify]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[substring]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
[textcontent]: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
[then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[this]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
[var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
