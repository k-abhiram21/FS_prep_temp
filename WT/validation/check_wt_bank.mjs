#!/usr/bin/env node
// The bank Markdown is the source of truth. No network or personal profile is used.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const WT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const file=path.join(WT,'FS_WT_Hard_MCQ_Bank.md');
const md=fs.readFileSync(file,'utf8'), tick=String.fromCharCode(96), fence=tick.repeat(3);
// A lookahead for end of input must not match blank lines.
const blocks=[...md.matchAll(/^### WT(\d{3}) — ([^\n]+)\n([\s\S]*?)(?=^### WT\d{3}|$(?![\s\S]))/gm)];
assert.deepEqual(blocks.map(b=>Number(b[1])),Array.from({length:80},(_,i)=>i+1));
assert.equal((md.match(/<details>/g)||[]).length,80);
assert.equal((md.match(/<\/details>/g)||[]).length,80);
const choicesRE=new RegExp('^([ABCD])\\. '+tick+'(.*?)'+tick+'\\s*$','gm');
const codeRE=new RegExp('^'+fence+'javascript\\n([\\s\\S]*?)\\n'+fence,'m');
const htmlRE=new RegExp('^'+fence+'html\\n([\\s\\S]*?)\\n'+fence,'m');
const outputRE=new RegExp('^'+fence+'text\\n([\\s\\S]*?)\\n'+fence,'m');
const qs=[],answers={A:0,B:0,C:0,D:0};
for(const b of blocks){
 const id='WT'+b[1],body=b[3],parts=body.split('<details>');
 assert.equal(parts.length,2,id+': disclosure');
 const before=parts[0],hidden=parts[1].split('</details>')[0];
 const options=[...before.matchAll(choicesRE)];
 assert.deepEqual(options.map(x=>x[1]),['A','B','C','D'],id+': choices');
 assert.equal(new Set(options.map(x=>x[2])).size,4,id+': duplicate option');
 const answer=hidden.match(/\*\*Correct: ([ABCD])\*\*/)?.[1];
 assert.ok(answer,id+': missing answer');answers[answer]++;
 assert.deepEqual([...hidden.matchAll(/^- \*\*([ABCD]):\*\* .+$/gm)].map(x=>x[1]).sort(),
                  [...'ABCD'].filter(x=>x!==answer),id+': distractor explanations');
 const spec=JSON.parse(hidden.match(/<!-- verify: (.*?) -->/)?.[1]||'null');
 assert.ok(spec&&['js','dom'].includes(spec.kind),id+': metadata');
 const output=hidden.match(outputRE)?.[1];
 assert.equal(spec.stdout,output+'\n',id+': displayed output');
 assert.equal(options.find(x=>x[1]===answer)[2],spec.choice??output.replaceAll('\n',' / '),id+': correct choice');
 if(spec.repair){
  assert.equal(typeof spec.choice,'string',id+': repair decision');
  assert.equal(hidden.match(new RegExp('\\*\\*Correct decision:\\*\\* '+tick+'([^\\n]+)'+tick))?.[1],spec.choice,id+': shown decision');
  assert.equal(hidden.match(codeRE)?.[1],spec.repair.code,id+': shown repair code');
  const outputs=[...hidden.matchAll(new RegExp('^'+fence+'text\\n([\\s\\S]*?)\\n'+fence,'gm'))];
  assert.equal(outputs.length,2,id+': output blocks');
  assert.equal(outputs[1][1]+'\n',spec.repair.stdout,id+': shown repair output');
 }
 const code=before.match(codeRE)?.[1];assert.ok(code,id+': code');
 let html=before.match(htmlRE)?.[1];
 if(html==='<!-- empty body -->')html='';
 assert.equal(html!==undefined,spec.kind==='dom',id+': fixture kind');
 assert.ok(hidden.includes('**Rule/source:**'),id+': source');
 assert.equal((body.match(/<\/details>/g)||[]).length,1,id+': closing disclosure');
 qs.push({id,title:b[2],code,html,spec});
}
assert.deepEqual(answers,{A:20,B:20,C:20,D:20});
assert.equal(qs.filter(q=>q.spec.kind==='js').length,68);
assert.equal(qs.filter(q=>q.spec.kind==='dom').length,12);
assert.equal(qs.filter(q=>q.spec.repair).length,13);
const traces=qs.flatMap(q=>q.spec.repair?[q,{...q,id:q.id+' repair',code:q.spec.repair.code,
                                         spec:{kind:q.spec.kind,stdout:q.spec.repair.stdout}}]:[q]);
assert.equal(traces.filter(q=>q.spec.kind==='js').length,79);
assert.equal(traces.filter(q=>q.spec.kind==='dom').length,14);
const sets=[...md.matchAll(/^\| ([1-4]) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \| (.+) \|$/gm)];
assert.deepEqual(sets.map(s=>s[1]),[...'1234']);
const covered=[];
for(const set of sets){
 const ids=[...set[8].matchAll(/\[WT(\d{3})\]\(#wt\d{3}\)/g)].map(x=>Number(x[1]));
 assert.equal(ids.length,20);assert.equal(new Set(ids).size,20);
 const counts=[[1,16],[17,36],[37,42],[43,50],[51,68],[69,80]].map(([a,b])=>ids.filter(n=>a<=n&&n<=b).length);
 assert.deepEqual(counts,set.slice(2,8).map(Number));covered.push(...ids);
}
assert.deepEqual(covered.sort((a,b)=>a-b),Array.from({length:80},(_,i)=>i+1));
const prose=md.replace(new RegExp('^'+fence+'[^\\n]*\\n[\\s\\S]*?^'+fence+'\\s*$','gm'),'')
              .replace(/<!--[\s\S]*?-->/g,'');
const defs=new Map([...prose.matchAll(/^\[([^\]]+)\]: (\S+)$/gm)].map(m=>[m[1],m[2]]));
for(const m of prose.matchAll(/\[[^\]\n]+\]\[([^\]\n]+)\]/g))assert.ok(defs.has(m[1]),'Missing source '+m[1]);
const anchors=new Set([...md.matchAll(/<a id="([^"]+)"><\/a>/g)].map(m=>m[1]));
for(const target of [...defs.values(),...[...prose.matchAll(/\[[^\]\n]+\]\(([^)]+)\)/g)].map(m=>m[1])]){
 if(target.startsWith('#'))assert.ok(anchors.has(target.slice(1)),'Broken anchor '+target);
 else if(target.startsWith('https://'))assert.ok(new URL(target).hostname);
 else assert.ok(fs.existsSync(path.resolve(WT,decodeURIComponent(target))),'Missing file '+target);
}
console.log('PASS: 80 unique questions; hidden answers; four choices; balanced answer positions; four complete mixed sets.');

// Each context has pristine language intrinsics. Only explicitly provided host functions exist.
async function nodeTrace(q){
 const logs=[],errors=[],handles=new Set();
 const context={
  console:{log:(...values)=>logs.push(values.map(String).join(' '))},
  queueMicrotask:fn=>queueMicrotask(()=>{try{fn();}catch(e){errors.push(e.name+': '+e.message);}}),
  setTimeout:(fn,delay,...args)=>{
   const h=setTimeout(()=>{try{fn(...args);}catch(e){errors.push(e.name+': '+e.message);}finally{handles.delete(h);}},delay);
   handles.add(h);return h;
  },
 };
 try{vm.runInNewContext('"use strict";\n'+q.code,context,{timeout:1000});}
 catch(e){errors.push(e.name+': '+e.message);}
 // Host turns give Promise reactions a checkpoint; wait until all snippet timers finish.
 const deadline=Date.now()+2000;
 do{await new Promise(r=>setTimeout(r,5));}while(handles.size&&Date.now()<deadline);
 await new Promise(r=>setTimeout(r,5));
 const stdout=logs.join('\n')+'\n';
 for(const h of handles)clearTimeout(h);
 if(stdout!==q.spec.stdout||errors.length||handles.size)
  return {id:q.id,runtime:'Node',expected:q.spec.stdout,stdout,errors,pending:handles.size};
 return null;
}
const failures=[];
for(const q of traces.filter(q=>q.spec.kind==='js')){
 const failure=await nodeTrace(q);if(failure)failures.push(failure);
}
console.log('Node language traces checked: 68 questions + 11 repairs');
if(process.argv.includes('--node-only')){
 console.log('DOM traces NOT executed: 12 questions + 2 repairs. Full validation requires Playwright and a browser.');
}else{
 const require=createRequire(import.meta.url);
 let chromium;
 try{({chromium}=require('playwright'));}
 catch(e){throw new Error('Playwright is required for full validation. Install/use an existing runtime (NODE_PATH), or request --node-only explicitly.',{cause:e});}
 const launch={headless:true};
 if(process.env.WT_BROWSER_EXE)launch.executablePath=process.env.WT_BROWSER_EXE;
 const browser=await chromium.launch(launch);
 console.log('Browser version: '+browser.version());
 try{
  for(const q of traces){
   const context=await browser.newContext();
   await context.route('**/*',route=>route.abort());
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.name+': '+e.message));
   // Script insertion is in the head; the fixture is the complete body.
   await page.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body>'+(q.html??'')+'</body></html>');
   await page.evaluate(()=>{
    window.__wtLogs=[];window.__wtPending=0;
    console.log=(...v)=>window.__wtLogs.push(v.map(String).join(' '));
    const nativeTimer=window.setTimeout.bind(window);
    window.setTimeout=(fn,ms,...args)=>{
     window.__wtPending++;
     return nativeTimer(()=>{try{fn(...args);}finally{window.__wtPending--;}},ms);
    };
   });
   try{
    await page.addScriptTag({content:'"use strict";\n'+q.code});
    await page.waitForFunction(()=>window.__wtPending===0,{},{timeout:2000});
    // Two clean task turns capture reactions and detect extra delayed output.
    await page.evaluate(()=>new Promise(r=>setTimeout(()=>setTimeout(r,0),0)));
    const stdout=await page.evaluate(()=>window.__wtLogs.join('\n')+'\n');
    if(stdout!==q.spec.stdout||errors.length)failures.push({id:q.id,runtime:'browser',expected:q.spec.stdout,stdout,errors});
   }catch(e){failures.push({id:q.id,runtime:'browser',error:e.message,errors});}
   await context.close();
  }
 }finally{await browser.close();}
 console.log('Browser traces checked: 80 questions (68 language/async + 12 DOM) + 13 repairs.');
}
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exitCode=1;}
else console.log('PASS: all requested runtime outputs matched exactly.');
