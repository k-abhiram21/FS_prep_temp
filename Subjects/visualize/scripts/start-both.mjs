import {spawn} from 'node:child_process';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {mkdir,open} from 'node:fs/promises';
import {get} from 'node:http';
const site=resolve(dirname(fileURLToPath(import.meta.url)),'..'),repo=resolve(site,'../..');
await mkdir(resolve(site,'build'),{recursive:true});
async function running(url){return new Promise(r=>{const req=get(url,res=>{res.resume();r(res.statusCode===200)});req.on('error',()=>r(false));req.setTimeout(2000,()=>{req.destroy();r(false)})})}
for(const app of [{name:'Subject Atlas',url:'http://127.0.0.2:5180/',cwd:site,args:[resolve(site,'scripts/serve.mjs')],log:'subjects-server.log'},{name:'DAA',url:'http://127.0.0.1:5173/',cwd:resolve(repo,'DS/visualize'),args:[resolve(repo,'DS/visualize/node_modules/vite/bin/vite.js'),'--host','127.0.0.1','--port','5173','--strictPort'],log:'daa-server.log'}]){
  if(!await running(app.url)){
    const log=await open(resolve(site,'build',app.log),'a');
    const child=spawn(process.execPath,app.args,{cwd:app.cwd,detached:true,windowsHide:true,stdio:['ignore',log.fd,log.fd]});
    child.unref();await log.close();
    let ready=false;for(let i=0;i<20;i++){await new Promise(r=>setTimeout(r,250));if(await running(app.url)){ready=true;break}}
    if(!ready)throw Error(`${app.name} did not start. See build/${app.log}`);
  }
  console.log(`${app.name}: ${app.url}`);
}
