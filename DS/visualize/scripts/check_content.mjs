import { readFile, writeFile } from 'node:fs/promises'
import { lessons } from '../src/lessons.js'
import { conceptGuides } from '../src/content/concepts.js'
import { javaSolutions } from '../src/content/java-solutions.js'
import { glossary } from '../src/content/glossary.js'
import { javaGuidance } from '../src/content/java-guidance.js'
const read = async name => JSON.parse(await readFile(new URL(`../src/generated/${name}.json`,import.meta.url),'utf8'))
const algorithms=await read('algorithms'),questions=await read('questions')
function assert(value,message){if(!value)throw new Error(message)}
assert(algorithms.length===173,'173 guides required')
assert(questions.length===410,'410 questions required')
assert(questions.filter(q=>q.bank==='java').length===160,'160 Java questions required')
assert(lessons.length===31,'31 concept lessons required')
assert(lessons.every(l=>conceptGuides[l.id]),'Every topic needs a full explanation')
assert(algorithms.every(p=>p.steps.length && p.trace.length>=3 && p.decision.test),'Incomplete guide')
assert(Object.keys(javaSolutions).every(id=>algorithms.some(p=>p.id===Number(id))),'Orphan Java solution')
assert(algorithms.every(p=>javaGuidance[p.pattern]),'Missing Java construction guidance')
const sourceIndex=JSON.parse(await readFile(new URL('../../validation/java_mcq_index.json',import.meta.url),'utf8'))
for(const q of questions.filter(q=>q.bank==='java')){
 const source=sourceIndex.questions[Number(q.id.slice(1))-1]
 assert(q.answer===source.answer,`${q.id} answer changed`)
 assert(q.prompt.includes(source.code.trim()),`${q.id} Java snippet changed`)
}
const sentences=text=>text.split(/(?<=[.!?])\s+/)
const long=[]
const inspect=(id,text,limit)=>{
 for(const sentence of sentences(text)){
   const count=sentence.trim().split(/\s+/).length
   if(count>limit)long.push({id,limit,count,sentence})
 }
}
for(const p of algorithms){
 for(const key of ['task','baseline','why','edge'])inspect(`LC${p.id}.${key}`,p[key],25)
 for(const s of p.steps)inspect(`LC${p.id}.step`,s,20)
 for(const f of p.trace)inspect(`LC${p.id}.trace`,f.reason,25)
}
for(const q of questions)inspect(q.id,q.explanation,25)
for(const [id,g] of Object.entries(conceptGuides)){
 for(const key of ['explain','example','why','limit'])inspect(id,g[key],25)
 for(const s of g.steps)inspect(`${id}.step`,s,20)
}
for(const g of glossary){inspect(g.term,g.meaning,25);inspect(g.term,g.example,25)}
for(const [pattern,g] of Object.entries(javaGuidance)){inspect(pattern,g.setup,25);for(const step of g.steps)inspect(`${pattern}.java`,step,20)}
await writeFile(new URL('../style-audit.json',import.meta.url),JSON.stringify(long,null,2))
console.log(`PASS: 173 guides, 410 explanations, 31 expanded concepts, ${glossary.length} terms, ${Object.keys(javaSolutions).length} Java references`)
console.log(`Sentence-length review flags: ${long.length} (style-audit.json). This is a heuristic, not an STE certification.`)
