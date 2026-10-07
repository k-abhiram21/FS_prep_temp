import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {lessons, subjects, aiLabel} from '../src/content.mjs';
import {questions} from '../src/questions.mjs';

// The complete guides are maintained directly as Markdown. Refresh only their
// marked practice sections; never replace the teaching with condensed site notes.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const extra = [];
function Q(subject, prompt, correct, wrong, explanation) {
  const offset = (extra.length * 3 + 2) % 4;
  const options = [correct, ...wrong];
  for (let i=0; i<offset; i++) options.push(options.shift());
  extra.push({subject, prompt, options, answer: options.indexOf(correct), explanation});
}
Q('SE', 'Which framework activity primarily establishes the needs of users and stakeholders?', 'Communication', ['Only deployment', 'Only compilation', 'Only version tagging'], 'Communication identifies the need through discussion. Planning arranges work, modeling describes requirements/design, construction builds and tests, and deployment delivers and obtains feedback. Start by matching the described action to its purpose.');
Q('SE', 'A team replaces support for an obsolete operating environment after that environment changes. Which maintenance purpose is most directly described?', 'Adaptive', ['Corrective only', 'A merge conflict', 'Throwaway prototyping'], 'Adaptive maintenance responds to a changed environment. Corrective maintenance fixes a defect; perfective improves features or performance; preventive reduces future maintenance problems. The environment change is the deciding clue here.');
Q('SE', 'Which approach is most directly associated with visualizing workflow and limiting work in progress?', 'Kanban', ['Waterfall phase approval only', 'CRC checking', 'A Git hard reset'], 'Kanban makes the workflow and current work visible and uses work-in-progress limits to help manage flow. A board is a supporting mechanism, not proof by itself that flow is effective. Scrum emphasizes Sprints and its defined events and artifacts.');
Q('SE', 'A file contains A when staged. You then edit it to B and commit without staging again. Which content is saved?', 'A', ['B automatically', 'Both versions as the same file content', 'No content can be committed'], 'Staging selected A at that moment. Editing the working tree to B did not update the index. A normal commit records the staged snapshot, so B remains an unstaged working edit. Stage again if the intended next snapshot must contain B.');
Q('SE', 'Main is at B; feature is at D, and B is an ancestor of D. What can a fast-forward integration do?', 'Move main directly to D', ['Delete B from every history', 'Always require a new two-parent commit', 'Automatically upload D to GitHub'], 'The feature history already includes main history. Moving the main reference to D includes the added history without reconciling divergent changes. This is a local history operation; uploading still requires a separate remote action.');
Q('SE', 'Which Git reset mode moves the selected reference while preserving both the index and working edits?', 'Soft', ['Hard', 'Mixed', 'Fetch'], 'Soft reset preserves index and working-tree content. Mixed resets the index while keeping working edits. Hard resets both to the selected commit and can discard local tracked edits. Fetch obtains remote history rather than selecting a reset mode.');
Q('WT', 'What does this print? console.log(0 || 10, 0 ?? 10);', '10 0', ['0 10', '10 10', '0 0'], 'Zero is falsy, so || chooses 10. Zero is neither null nor undefined, so ?? keeps it. Use nullish fallback when a valid zero should survive. Both operations can return operand values rather than a Boolean.');
Q('WT', 'A script logs A, registers a fulfilled Promise handler that logs P, schedules a zero-delay timer that logs T, and logs B. What is the order in this ordinary example?', 'A, B, P, T', ['A, P, T, B', 'P, A, B, T', 'A, B, T, P'], 'Current synchronous work prints A and B. The fulfilled Promise reaction runs as a microtask after that work. The timer callback runs in a later task. A zero timer delay does not interrupt current statements.');
Q('WT', 'What does JSON.stringify([undefined, 2]) produce?', '"[null,2]"', ['"[undefined,2]"', '"[2]"', 'A JavaScript Map'], 'An undefined array entry becomes null in this serialization. In contrast, an undefined object property is omitted. The result is JSON text, not an Array or Map, so read the return type as well as the contents.');
Q('CN', 'A 1000-byte frame is placed on a 1 Mbit/s link. Ignoring overhead outside the stated length, what is transmission delay?', '8 ms', ['1 ms', '1000 s', 'It equals propagation delay for every distance'], 'Convert bytes to bits: 1000×8 = 8000 bits. Divide by 1,000,000 bits/s: 0.008 s, or 8 ms. Propagation delay uses distance divided by signal speed and is a separate quantity.');
Q('CN', 'Using four-bit one\'s-complement arithmetic, words 1001 and 1100 have sum 10101. What checksum follows carry folding and complementation?', '1001', ['0110', '10101', '0000'], 'Fold the overflow carry into the low four bits: 0101+1 = 0110. Complement all four bits to get 1001. The folded sum and the transmitted checksum are different values; do not stop before the complement step.');
Q('CN', 'For data 1101 and generator 1011, the CRC remainder in the guide is 001. Which codeword is transmitted?', '1101001', ['1101000', '0011101', '10111101'], 'The generator has degree 3, so the check field has three bits. Replace the three appended zero positions with the calculated remainder: data 1101 followed by 001. The receiver divides this combined codeword by the same generator.');
Q('CN', 'A Hamming check gives s1=0, s2=1, s4=1 under the single-bit-error assumption and the guide\'s position convention. Which position is corrected?', '6', ['3', '4', 'No error can be present'], 'Read the syndrome as s4 s2 s1 = 110, binary 6. Flip that position under the single-error assumption. Reading the checks in the opposite order would give the wrong location. Multiple errors can invalidate the ordinary correction interpretation.');
Q('AI', 'An ANN has 3 inputs, Dense(4), and Dense(1), with a bias per unit. How many trainable parameters are present?', '21', ['16', '20', '32 times the number of examples'], 'The hidden layer has 3×4+4 = 16. The output layer has 4×1+1 = 5. Add the layers: 21. Every example reuses these parameters; changing batch size changes the amount of data processed together, not the number of weights.');
Q('AI', 'In the guide\'s one-weight example, w=2, gradient=3, and learning rate=0.1. What is the updated weight?', '1.7', ['2.3', '0.3', '3.0'], 'Gradient descent subtracts the scaled gradient: 2−0.1×3 = 1.7. The gradient is a local loss sensitivity, not the new parameter. The example holds the bias fixed; updating a trainable bias would be a separate calculation.');
Q('AI', 'What does model.compile configure?', 'The optimizer, loss, and selected metrics', ['A completed fit of all weights to training examples', 'Only held-out predictions', 'The number of test answers already known'], 'Compile selects how training and reporting will work. It does not itself fit the training dataset. Fit performs parameter updates; evaluate measures supplied-data loss/metrics; predict returns output values.');
Q('AI', 'A binary model outputs sigmoid probabilities. Which ordinary BinaryCrossentropy setting matches them?', 'from_logits=False', ['from_logits=True', 'The setting never depends on the output', 'Use integer class IDs as the sigmoid input'], 'A sigmoid output is a probability representation, not a raw logit. The loss must be told which representation it receives. A logits-based setup can instead omit the output sigmoid and use from_logits=True.');
Q('AI', 'For 100 samples and batch size 32, with the remainder kept, how many optimizer steps occur in one ordinary epoch?', '4', ['3', '32', '100'], 'The batches contain 32,32,32,4 examples. Each batch gives one step, so there are four. An epoch is one pass over the dataset, not one batch. A setup that drops the incomplete batch would have a different count.');
Q('AI', 'Which preparation helps preserve an independent assessment?', 'Split data first; fit learned preprocessing on training data', ['Use test labels to select every model repeatedly', 'Normalize using every held-out sample before splitting', 'Report only training accuracy'], 'Learning preprocessing from held-out data can leak information into the training workflow. Fit such rules using training data and apply them to other sets. Validation guides selection; the final test set should remain separate from repeated choices.');

for (const subject of Object.keys(subjects)) {
  const guidePath = path.join(root, subject, 'FS_Revision_Notes.md');
  const guide = await fs.readFile(guidePath, 'utf8');
  const selected = lessons.filter(l => l.subject === subject).map((l,i) => questions.find(q => q.id === `${l.id}-q${i%4+1}`));
  const practice = [...selected, ...extra.filter(q => q.subject === subject)];
  let block = `\n\n**${aiLabel}** — original study questions, not past-paper questions. There are ${practice.length} questions in this file.\n\n`;
  for (const [i,q] of practice.entries()) {
    const parts = q.prompt.split('\n');
    const prompt = parts.length > 1 ? `${parts[0]}\n\n\`\`\`javascript\n${parts.slice(1).join('\n')}\n\`\`\`` : q.prompt;
    block += `### Question ${i+1}\n\n${prompt}\n\n`;
    block += q.options.map((v,j) => `- **${String.fromCharCode(65+j)}.** ${v}`).join('\n');
    block += `\n\n<details>\n<summary>Answer and explanation</summary>\n\n**${String.fromCharCode(65+q.answer)}. ${q.options[q.answer]}**\n\n${q.explanation}\n\n</details>\n\n`;
  }
  const marker = /<!-- FS-MCQ-START -->[\s\S]*?<!-- FS-MCQ-END -->/;
  if (!marker.test(guide)) throw Error(`Practice markers missing from ${subject} guide`);
  await fs.writeFile(guidePath, guide.replace(marker, () => `<!-- FS-MCQ-START -->${block}<!-- FS-MCQ-END -->`), 'utf8');
  console.log(`${subject}: refreshed ${practice.length} integrated questions; preserved complete teaching text.`);
}
