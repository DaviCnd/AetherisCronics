import 'dotenv/config';
import {randomBytes} from 'node:crypto';
import {createClient} from '@libsql/client';
import {openDatabase} from './db.mjs';
import {createApp,seedDatabase} from './app.mjs';
import express from 'express';
import path from 'node:path';
const dev=process.argv.includes('--dev');
const db=await openDatabase();await seedDatabase(db);
const needsSetup=!(await db.execute("SELECT id FROM lore_users WHERE role='master'")).rows.length;
let setupKey=process.env.SETUP_KEY;
if(needsSetup&&!setupKey){if(!dev)throw new Error('Defina SETUP_KEY com pelo menos 24 caracteres para a primeira instalação.');setupKey=randomBytes(24).toString('hex');console.log('\nChave de instalação local (apenas nesta execução): '+setupKey+'\n');}
if(needsSetup&&setupKey.length<24)throw new Error('SETUP_KEY deve ter no mínimo 24 caracteres.');
const fichaDb=process.env.FICHA_DATABASE_URL?createClient({url:process.env.FICHA_DATABASE_URL,authToken:process.env.FICHA_AUTH_TOKEN}):null;
const app=await createApp({db,production:!dev&&process.env.COOKIE_SECURE!=='false',setupKey,fichaDb});
if(dev){const {createServer}=await import('vite');const vite=await createServer({server:{middlewareMode:true,fs:{deny:['**/.env','**/.env.*','**/server/**','**/data/**','**/work/**','**/.git/**','**/outputs/**','**/.openai/**']}},appType:'spa'});app.use(vite.middlewares);}else{app.use(express.static('dist',{index:false}));app.get('/{*path}',(req,res)=>res.sendFile(path.resolve('dist/index.html')));}
const port=Number(process.env.PORT)||3000;const server=app.listen(port,'0.0.0.0',()=>console.log(`Local: http://localhost:${port}`));
process.on('SIGTERM',()=>server.close(()=>{db.close();process.exit(0)}));
