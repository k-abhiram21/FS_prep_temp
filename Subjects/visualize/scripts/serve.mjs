import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,dirname,relative,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
const site=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const repo=resolve(site,'../..');
const host=process.env.SUBJECT_ATLAS_HOST||'127.0.0.2';
const port=Number(process.env.SUBJECT_ATLAS_PORT||5180);
const sources=JSON.parse(await readFile(resolve(site,'src/sources.json'),'utf8'));
const sourceById=Object.fromEntries(sources.map(s=>[s.id,s]));
const types={html:'text/html; charset=utf-8',pdf:'application/pdf',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',js:'text/plain; charset=utf-8'};
function within(base,path){const d=relative(base,path);return !d.startsWith('..')&&!isAbsolute(d)}
const server=createServer(async(req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return}
    const url=new URL(req.url,`http://${host}:${port}`);
    let path;
    if(url.pathname==='/'||url.pathname==='/index.html')path=resolve(site,'dist/index.html');
    else if(url.pathname.startsWith('/materials/')){const key=decodeURIComponent(url.pathname.slice('/materials/'.length));const s=sourceById[key];if(s){path=resolve(repo,s.path);if(!within(repo,path))path=null}}
    else if(url.pathname.startsWith('/diagrams/html/')){const name=decodeURIComponent(url.pathname.slice('/diagrams/html/'.length));if(/^[a-z0-9-]+\.html$/.test(name))path=resolve(site,'diagrams/html',name)}
    else if(url.pathname.startsWith('/../diagrams/html/'))path=null;
    if(!path){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');return}
    const info=await stat(path);if(!info.isFile())throw Error('Not a file');
    const data=req.method==='HEAD'?null:await readFile(path);
    res.writeHead(200,{'Content-Type':types[path.split('.').pop()]||'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    res.end(data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('File unavailable')}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Address already in use: http://${host}:${port}/`:e.message);process.exit(1)});
server.listen(port,host,()=>console.log(`Subject Atlas is running at http://${host}:${port}/\nSeparate DAA address: http://127.0.0.1:5173/\nPress Ctrl+C to stop this server.`));
