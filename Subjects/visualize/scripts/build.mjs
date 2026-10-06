import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {subjects,lessons,glossary,official,aiLabel} from '../src/content.mjs';
import {questions} from '../src/questions.mjs';
const site=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const sources=JSON.parse(await readFile(resolve(site,'src/sources.json'),'utf8'));
const receipts=JSON.parse(await readFile(resolve(site,'diagrams/receipts.json'),'utf8'));
const sha=x=>createHash('sha256').update(x).digest('hex');
const diagrams={};
const ids=new Set(lessons.map(l=>l.id)),sourceIds=new Set(sources.map(s=>s.id));
if(ids.size!==lessons.length)throw Error('Duplicate lesson ID');
if(new Set(questions.map(q=>q.id)).size!==questions.length)throw Error('Duplicate question ID');
for(const q of questions){if(!ids.has(q.lesson)||q.options.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!q.explanation)throw Error(`Invalid question ${q.id}`)}
for(const l of lessons){
  if(l.trace.length!==4||questions.filter(q=>q.lesson===l.id).length!==4)throw Error(`Incomplete lesson ${l.id}`);
  if(l.sources.some(s=>!sourceIds.has(s))||l.refs.some(s=>!official[s]))throw Error(`Missing source for ${l.id}`);
  if(l.basis==='gap'&&l.sources.length)throw Error(`Contradictory gap status ${l.id}`);
  const receipt=receipts.find(r=>r.id===l.id)?.receipt;
  if(!receipt?.ok||receipt.validation.checkCount!==9||receipt.validation.errors||receipt.validation.warnings)throw Error(`Unvalidated diagram ${l.id}`);
  const bytes=await readFile(resolve(site,`diagrams/html/${l.id}.html`));
  const spec=await readFile(resolve(site,`diagrams/specs/${l.id}.json`));
  if(sha(bytes)!==receipt.artifact.sha256||sha(spec)!==receipt.specification.sha256)throw Error(`Frozen artifact changed: ${l.id}`);
  diagrams[l.id]={gzip:gzipSync(bytes,{level:9}).toString('base64'),sha256:sha(bytes),bytes:bytes.length};
}
const data={subjects,lessons,questions,glossary,sources,diagrams,official,aiLabel};
const [template,style,app]=await Promise.all(['src/index.html','src/styles.css','src/app.js'].map(p=>readFile(resolve(site,p),'utf8')));
const html=template.replace('/* STYLES */',()=>style).replace('/* DATA */',()=>JSON.stringify(data).replace(/</g,'\\u003c')).replace('/* APPLICATION */',()=>app.replace(/<\/script/gi,'<\\/script'));
await mkdir(resolve(site,'dist'),{recursive:true});
await writeFile(resolve(site,'dist/index.html'),html);
await mkdir(resolve(site,'build'),{recursive:true});
const report={lessons:lessons.length,questions:questions.length,sources:sources.length,terms:glossary.length,diagrams:receipts.length,htmlBytes:Buffer.byteLength(html),sha256:sha(html),bySubject:Object.fromEntries(Object.keys(subjects).map(s=>[s,{lessons:lessons.filter(l=>l.subject===s).length,questions:questions.filter(q=>q.subject===s).length}]))};
await writeFile(resolve(site,'build/build-receipt.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
console.log('Built dist/index.html with all teaching data and compressed, verified diagrams inline.');
