import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const args=process.argv.slice(2),root=resolve(args.includes('--dist')?'dist':'.');
const port=Number(process.env.PORT||(args.includes('--dist')?4173:5173));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
createServer(async(req,res)=>{
 try{
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(path!=='/'&&path!=='/index.html'&&!path.startsWith('/src/')){res.writeHead(404);return res.end('Not found')}
  const file=resolve(root,'.'+(path==='/'?'/index.html':path));
  if(!file.startsWith(root+sep)){res.writeHead(403);return res.end('Forbidden')}
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found')}
}).listen(port,'0.0.0.0',()=>console.log(`SOL prototype serving on port ${port}`));
