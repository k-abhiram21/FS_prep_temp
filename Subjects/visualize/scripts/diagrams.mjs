import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {lessons} from '../src/content.mjs';
const site=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const skill=process.env.ARCHIFY_HOME || 'C:/Users/gayaz/.agents/skills/archify';
const specDir=resolve(site,'diagrams/specs'),outDir=resolve(site,'diagrams/html');
await mkdir(specDir,{recursive:true});await mkdir(outDir,{recursive:true});
await mkdir(resolve(site,'build/receipts'),{recursive:true});
const receipts=[];
const transitions={
 'se-process':['define behavior','implement','policy changes'], 'se-models':['plan the structure','build and test','release'], 'se-evolution':['identify uncertainty','test the risk','use the finding'], 'se-agile':['implement','request feedback','revise priorities'], 'se-scrum':['select work','create usable work','inspect and adapt'],
 'se-git-state':['git add','edit without staging','git commit'], 'se-branches':['commit on feature','inspect ancestry','move main'], 'se-github':['save locally','publish commits','request review'],
 'wt-variables':['declare const','mutate array','read length'], 'wt-operators':['concatenate','compare subtraction','compare types'], 'wt-functions':['write property','rebind parameter','read shared object'], 'wt-json':['validate syntax','access array','produce text'], 'wt-callbacks':['call with 2','call with 4','finish iteration'], 'wt-promises':['register then','finish direct work','run queued reaction'], 'wt-chains':['return value','throw error','handle rejection'], 'wt-async':['reach await','caller continues','resume function'], 'wt-arrays':['double values','select x > 2','return selection'], 'wt-sets-maps':['set SE to 8','set SE to 9','count entries'], 'wt-dom':['querySelector','guard against null','assign textContent'], 'wt-events':['dispatch click','dispatch next click','write count'],
 'cn-osi':['encapsulate','add local frame','encode signals'], 'cn-encapsulation':['receive on link 1','inspect destination','send on link 2'], 'cn-media':['A sends','A stops','B sends'], 'cn-multiplex':['schedule slots','combine streams','separate by slot'], 'cn-signals':['check units','apply formula','state the bound'], 'cn-framing':['read five 1 bits','stuff a 0','send remaining bit'], 'cn-errors':['append zeros','XOR division','attach check bits'], 'cn-hamming':['test r = 2','test r = 3','allocate positions'], 'cn-stopwait':['deliver once','timeout and retry','check sequence'], 'cn-windows':['lose frame 1','handle later frames','retransmit'], 'cn-access':['start together','signals overlap','stop and retry'],
 'ai-tasks':['protect unseen data','fit parameters','test generalization'], 'ai-regression':['actual − predicted','square residuals','divide by count'], 'ai-classification':['weighted sum','map with sigmoid','compare threshold'], 'ai-neuron':['add contributions','add bias','apply ReLU'], 'ai-activations':['suppress negative','separate example','normalize scores'], 'ai-ann':['3 × 4 weights','4 extra biases','add parameters'], 'ai-training':['compare target','differentiate loss','subtract scaled gradient'], 'ai-tensorflow':['set optimizer/loss','train on examples','inspect outputs'], 'ai-evaluation':['miss positives','count correct','count found positives']
};
for(const lesson of lessons){
  const input=resolve(specDir,`${lesson.id}.json`),output=resolve(outDir,`${lesson.id}.html`);
  if(lesson.id!=='se-devops'){
    const nodes=lesson.trace.map((t,i)=>({id:`${lesson.id}-step${i+1}`,lane:i<2?'start':'result',col:i,type:i===0?'frontend':i===3?'external':'backend',label:t.title,sublabel:`Step ${i+1}`,width:Math.max(184,Math.ceil(t.title.length*7.5+40))}));
    const edges=nodes.slice(1).map((n,i)=>({from:nodes[i].id,to:n.id,label:transitions[lesson.id][i],role:'main'}));
    const spec={schema_version:2,diagram_type:'workflow',meta:{title:lesson.title,quality_profile:'showcase',locale:'en',legend:{mode:'hidden'}},lanes:[{id:'start',label:'Starting state and rule'},{id:'result',label:'Result and interpretation'}],mainPath:nodes.map(n=>n.id),nodes,edges,cards:[{dot:'emerald',title:'The rule',items:[lesson.why]},{dot:'amber',title:'Check the limit',items:[lesson.trap]},{dot:'slate',title:'Explanation provenance',items:['ai explnation due to lack of material',lesson.basis==='gap'?'This topic supplements missing college coverage.':'This worked explanation supplements the linked college topic.']}]};
    await writeFile(input,JSON.stringify(spec,null,2)+'\n');
  }else{
    const spec=JSON.parse(await readFile(input,'utf8'));spec.meta.legend={mode:'hidden'};
    spec.cards=spec.cards.filter(c=>c.title!=='Explanation provenance');
    spec.cards.push({dot:'slate',title:'Explanation provenance',items:['ai explnation due to lack of material','This worked explanation supplements the college DevOps topic.']});
    await writeFile(input,JSON.stringify(spec,null,2)+'\n');
  }
  for(const command of ['validate','deliver']){
    const args=[resolve(skill,'bin/archify.mjs'),command,'workflow',input];
    if(command==='deliver')args.push(output);
    args.push('--quality','showcase','--json');
    const r=spawnSync(process.execPath,args,{encoding:'utf8',maxBuffer:8*1024*1024});
    let receipt;try{receipt=JSON.parse(r.stdout)}catch{throw Error(`${lesson.id}: ${r.stderr||r.stdout}`)}
    await writeFile(resolve(site,'build/receipts',`${lesson.id}-${command}.json`),r.stdout);
    if(r.status!==0||!receipt.ok){console.error(JSON.stringify(receipt));process.exit(1)}
    if(command==='validate'&&(receipt.checks.length!==9||receipt.composition.summary.errors||receipt.composition.summary.warnings))throw Error(`Incomplete showcase validation for ${lesson.id}`);
    if(command==='deliver')receipts.push({id:lesson.id,receipt});
  }
  console.log(`PASS ${lesson.id}`);
}
await writeFile(resolve(site,'diagrams/receipts.json'),JSON.stringify(receipts,null,2));
console.log(`Delivered ${receipts.length} frozen Archify workflow diagrams.`);
