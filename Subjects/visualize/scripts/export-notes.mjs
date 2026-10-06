import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { aiLabel, subjects, lessons, official } from '../src/content.mjs';
import { questions } from '../src/questions.mjs';

// Keep the four subject notes consistent with the teaching content in the site.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const sources = JSON.parse(await fs.readFile(path.join(root, 'Subjects/visualize/src/sources.json'), 'utf8'));
const sourceById = new Map(sources.map(s => [s.id, s]));
const md = s => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
const sourceLink = s => `[${s.name}](<../${s.path.replaceAll('\\', '/') }>)`;
const fence = (text, language = 'text') => `\`\`\`${language}\n${text}\n\`\`\``;
const basis = {
  college: 'The topic is present in the selected college material. The worked explanation below is an AI-authored study aid.',
  partial: 'The selected college material provides only part of this topic. The explanation fills the identified gaps.',
  gap: 'A focused explanation of this topic was not identified in the selected college material. This section is a supplement.'
};
const setup = {
  SE: {
    approach: 'First compare process models. Then trace a change through Agile and CI/CD. Finish by tracing which file content Git stages, commits, and sends to a remote.',
    quick: [
      ['Verification / validation', 'Verification checks specified requirements. Validation checks intended user needs.'],
      ['Increment / iteration', 'An increment adds usable capability. An iteration revises a solution. A team can do both.'],
      ['Spiral', 'Identify risks and use evidence to choose the next development work.'],
      ['Agile', 'Use working results and feedback to adapt. Useful plans and documents still have value.'],
      ['Scrum events', 'Review: inspect the product outcome. Retrospective: improve how the team works.'],
      ['CI / delivery / deployment', 'CI gives integration feedback. Delivery keeps changes releasable. Deployment also automates production release.'],
      ['Git snapshot', 'A commit saves staged content. A later unstaged edit is excluded.'],
      ['fetch / pull / push', 'Fetch obtains remote history. Pull fetches and integrates. Push sends local history to a remote.'],
      ['Git / GitHub', 'Git manages version history. GitHub hosts repositories and collaboration features.']
    ]
  },
  WT: {
    approach: 'Use JavaScript for this subject, even though you will use Java for coding problems. Trace variable values first. Then trace function calls, Promise jobs, array methods, and DOM changes.',
    quick: [
      ['const', 'Prevents rebinding. It does not freeze the contents of an object or array.'],
      ['===', 'Does not coerce different operand types into equality. Object comparisons still use identity.'],
      ['JSON', 'Text format: double-quoted keys and strings; no functions, comments, or trailing commas.'],
      ['Callback', 'A function passed for another operation to call. It can run synchronously.'],
      ['Promise', 'Its executor runs synchronously. A registered then handler runs later as a Promise job.'],
      ['async / await', 'An async call returns a Promise. await suspends that function, not the whole program.'],
      ['map / filter / reduce', 'Transform each element / select elements / combine elements into a result.'],
      ['Set / Map', 'Store unique values / associate keys with values. Read their size with .size.'],
      ['DOM', 'The live document tree. Selecting an element can return null.'],
      ['Events', 'target identifies the event origin. currentTarget identifies the current listener element.']
    ],
    extra: `## Additional basics: conditions and loops

**${aiLabel}** — additional JavaScript fundamentals for the broad “JavaScript Basics” topic.

An \`if\` condition converts its value to a Boolean. Values such as \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, and \`NaN\` are falsy. Empty arrays and empty objects are truthy. A string containing \`"false"\` is also truthy.

\`for...of\` reads iterable values, such as array elements. \`for...in\` enumerates enumerable property keys; it can include inherited keys. Use \`for...of\` when you want the values in an array.

${fence('const a = [3, 5];\nlet total = 0;\nfor (const value of a) total += value;\nconsole.log(total); // 8\nconsole.log(Boolean([])); // true\nconsole.log(0 || 10); // 10\nconsole.log(0 ?? 10); // 0', 'javascript')}

\`||\` uses the right operand when the left operand is falsy. \`??\` uses it only when the left operand is \`null\` or \`undefined\`. Both short-circuit. This difference matters when zero is a valid value.

A \`while\` loop checks its condition before each iteration. A \`do...while\` loop checks it after the body, so the body runs at least once. \`break\` exits the loop. \`continue\` skips the remaining body of the current iteration.

For an output question, write down the value before the condition, after the body, and after the update. Do not count a failed final condition as another execution of the body.

References: [MDN: loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration), [MDN: nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).
`
  },
  CN: {
    approach: 'Learn the layer responsibilities first. Then distinguish physical transmission from frame delivery. For error control, write what the receiver accepts and what the sender retransmits after a loss.',
    quick: [
      ['OSI, bottom to top', 'Physical → Data Link → Network → Transport → Session → Presentation → Application.'],
      ['Units and addresses', 'Bits at Physical; frames and link addresses at Data Link; packets and logical addresses at Network.'],
      ['Simplex / half / full duplex', 'One direction / both directions at different times / both directions simultaneously.'],
      ['FDM / TDM / WDM', 'Separate frequency bands / time slots / optical wavelengths.'],
      ['Stuffing', 'Prevent payload contents from being mistaken for frame boundaries. It does not correct errors.'],
      ['Parity / CRC', 'Detect certain error patterns. Detection is different from correcting the damaged bit.'],
      ['Hamming', 'For m data bits, choose r check bits with 2^r ≥ m+r+1. Ordinary Hamming corrects one bit.'],
      ['Stop-and-Wait ARQ', 'One outstanding frame. Sequence numbers let the receiver reject a retry as a duplicate.'],
      ['GBN / Selective Repeat', 'GBN discards out-of-order frames and retries a suffix. SR buffers and retries missing frames.'],
      ['CSMA/CD / CSMA/CA', 'Detect collisions on shared half-duplex Ethernet / reduce collision risk on wireless links.']
    ],
    extra: `## Numerical questions: keep the assumptions visible

**${aiLabel}** — short revision aid for the calculations explained in the lessons.

| Quantity | Formula | What to check first |
|---|---|---|
| Ideal noiseless low-pass bit-rate bound | \`2B log2(M)\` bits/s | B is bandwidth in Hz; M is the number of signal levels. |
| AWGN channel-capacity bound | \`B log2(1 + S/N)\` bits/s | S/N must be a linear power ratio, not a dB value. |
| Power SNR in dB | \`10 log10(S/N)\` | Convert back with \`S/N = 10^(dB/10)\`. |
| Hamming check-bit count | \`2^r >= m+r+1\` | Try the smallest nonnegative r that satisfies it. |
| Go-Back-N sender window | At most \`2^k - 1\` | k is the sequence-number bit count; standard receiver window is 1. |
| Selective Repeat window | At most \`2^(k-1)\` | This bound assumes equal sender and receiver windows. |

Example: B = 3000 Hz and SNR = 30 dB. First compute S/N = 1000. The Shannon bound is \`3000 × log2(1001) ≈ 29,902 bits/s\`. Do not substitute 30 directly inside the logarithm.

For k = 3, the sequence numbers are 0–7. The standard maximum GBN sender window is 7. Equal SR windows can each be at most 4. These limits prevent old and new frames from becoming ambiguous after wraparound.

Treat capacity results as bounds under the stated channel model. They are not a promise of application throughput. Physical Layer is broad in the notice; signal formulas are a marked supplement because the selected college pack does not give a focused treatment.
`
  },
  AI: {
    approach: 'Decide what the target means. Then calculate a neuron output and a loss by hand. Finally trace training, evaluation, and the TensorFlow/Keras calls that perform those steps.',
    quick: [
      ['Regression / classification', 'Predict a numerical quantity / predict a category. Numeric category IDs still represent classes.'],
      ['Linear neuron', 'Compute z = sum(w_i*x_i) + b, then apply the chosen activation.'],
      ['MSE', 'Square each prediction error, sum the squares, then divide by the number of examples.'],
      ['Logistic regression', 'A classification model despite its name. A threshold converts a score into a class decision.'],
      ['ReLU / sigmoid / softmax', 'max(0,z) / a value between 0 and 1 / a normalized vector across classes.'],
      ['Dense parameters', 'input_count × unit_count + unit_count, when each unit has a bias.'],
      ['Training', 'Forward prediction → loss → backpropagated gradients → optimizer update.'],
      ['Epoch / batch', 'One pass over the training dataset / a group used for a training step.'],
      ['Validation / test', 'Validation guides choices. A held-out test set estimates performance after those choices.'],
      ['Precision / recall', 'TP/(TP+FP) / TP/(TP+FN). Check for a zero denominator.']
    ],
    extra: `## Hand calculations to practise once

**${aiLabel}** — worked revision examples using the college topics.

1. **Neuron:** x = [2, 3], w = [0.5, -1], b = 1. Compute z = 1 - 3 + 1 = -1. With ReLU, the output is 0.
2. **MSE:** targets [10, 20, 30], predictions [8, 22, 29]. Errors are [2, -2, 1]. MSE = (4 + 4 + 1)/3 = 3. Its units are the target units squared.
3. **Dense layer:** 3 inputs, 4 units, one bias per unit. Parameters = 3×4 + 4 = 16. The batch size does not change this count.
4. **One training step:** x = 1, target = 0.5, w = 2, b = 0. Prediction = 2; squared loss = 2.25. The weight gradient is 2(2-0.5)×1 = 3. At learning rate 0.1, the new weight is 2-0.1×3 = 1.7. This example updates the weight while holding the bias fixed.
5. **Metrics:** TP = 8, FP = 2, FN = 4, TN = 6. Precision = 8/10 = 0.8. Recall = 8/12 ≈ 0.667. Accuracy = (8+6)/20 = 0.7.

A high accuracy can hide poor detection of a rare class. If 90 of 100 examples are negative, always predicting negative gives 90% accuracy and zero recall for the positive class.
`
  }
};

for (const subject of Object.keys(subjects)) {
  const selected = lessons.filter(l => l.subject === subject);
  const cfg = setup[subject];
  let out = `# ${subjects[subject].name}: FS revision notes\n\n`;
  out += `For the screening test on **9 October 2026**. Scope: ${subjects[subject].brief}.\n\n`;
  out += `[All subject notes](../FS_SUBJECT_NOTES.md) · [Visual study website](../Subjects/visualize/README.md)\n\n`;
  out += `## How to use these notes\n\n${cfg.approach}\n\nRead the quick table first. For each topic, cover the result and work through the example. Explain the MCQ trap in your own words. Finish with the short self-check at the end.\n\n`;
  out += `**Teaching provenance: ${aiLabel}.** These are AI-authored explanations and examples, not verbatim college notes. Each topic identifies whether the selected college material covers it, covers it partly, or lacks a focused explanation. The label does not mean that every underlying topic is missing. The writing uses short, direct explanations inspired by ASD-STE100, with technical terms explained through concrete steps.\n\n`;
  out += `The notice gives topic names, not an exact question distribution. These notes are revision aids and do not predict the test paper.\n\n`;
  out += `## Quick recall\n\n| Topic | Explain it this way |\n|---|---|\n${cfg.quick.map(r => `| ${md(r[0])} | ${md(r[1])} |`).join('\n')}\n\n`;
  out += `## Reading order\n\n${selected.map((l,i) => `${i+1}. ${l.title}`).join('\n')}\n\n`;
  for (const [i, l] of selected.entries()) {
    out += `## ${i+1}. ${l.title}\n\n**Main idea:** ${l.summary}\n\n`;
    out += `**${aiLabel}**\n\n**Material basis:** ${basis[l.basis]}\n\n`;
    out += l.explain.join('\n\n') + '\n\n';
    out += `### Worked example\n\n${fence(l.example)}\n\n**Result and interpretation:** ${l.output}\n\n`;
    out += `### Follow the steps\n\n${l.trace.map((t,j) => `${j+1}. **${t.title}:** ${t.state} ${t.reason}`).join('\n')}\n\n`;
    out += `**Why this works:** ${l.why}\n\n**MCQ trap:** ${l.trap}\n\n`;
    out += `| Distinction | Meaning |\n|---|---|\n${l.compare.map(r => `| ${md(r[0])} | ${md(r[1])} |`).join('\n')}\n\n`;
    if (l.sources.length) out += `**College sources:** ${l.sources.map(id => sourceLink(sourceById.get(id))).join('; ')}.\n\n`;
    if (l.refs.length) out += `**Official references:** ${l.refs.map(id => `[${official[id][0]}](${official[id][1]})`).join('; ')}.\n\n`;
  }
  if (cfg.extra) out += cfg.extra + '\n';
  out += `## Self-check: one question per topic\n\n**${aiLabel}** — original revision questions, not past-paper questions. Try them before opening the answer. The full website provides four questions per topic.\n\n`;
  for (const [i, l] of selected.entries()) {
    const q = questions.find(q => q.lesson === l.id);
    out += `### ${i+1}. ${l.title}\n\n${q.prompt}\n\n`;
    out += q.options.map((option,j) => `- **${String.fromCharCode(65+j)}.** ${option}`).join('\n') + '\n\n';
    out += `<details>\n<summary>Answer and explanation</summary>\n\n**${String.fromCharCode(65+q.answer)}. ${q.options[q.answer]}**\n\n${q.explanation}\n\n</details>\n\n`;
  }
  const ids = [...new Set(selected.flatMap(l => l.sources))];
  out += `## Source reading targets\n\n${ids.map(id => {const s=sourceById.get(id);return `- ${sourceLink(s)} — ${s.scope}`}).join('\n')}\n\n`;
  out += `College files can include material outside the announced topics. Read the selected sections. The examples above use fixed inputs for explanation; some original class examples use random outcomes.\n`;
  const target = path.join(root, subject, 'FS_Revision_Notes.md');
  await fs.writeFile(target, out, 'utf8');
  console.log(`${subject}: ${selected.length} topics, ${selected.length} self-checks → ${path.relative(root,target)}`);
}
