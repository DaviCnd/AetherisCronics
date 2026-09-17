import {randomBytes,scrypt as scryptCallback,timingSafeEqual,createHash} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(scryptCallback);
export const digest=v=>createHash('sha256').update(v).digest('hex');
export async function hashPassword(password){const salt=randomBytes(16).toString('hex');const key=await scrypt(password,salt,64);return `${salt}:${key.toString('hex')}`;}
export async function verifyPassword(password,hash){const [salt,hex]=hash.split(':');const key=await scrypt(password,salt,64);const expected=Buffer.from(hex,'hex');return expected.length===key.length&&timingSafeEqual(expected,key);}
export function validCredentials(username,password){return typeof username==='string'&&/^[\p{L}\p{N}_ .-]{2,50}$/u.test(username.trim())&&typeof password==='string'&&password.length>=12&&password.length<=128;}
export function canEdit(user,entry){return entry.owner_id===user.id||(!entry.owner_id&&user.role==='master');}
export function canRead(user,entry){if(canEdit(user,entry))return true;return !!entry.campaign_id&&user.campaigns?.includes(entry.campaign_id)&& (entry.visibility==='all'||entry.visibility==='selected'&&entry.allowed.includes(user.id));}
export function parseEntry(row){return {...row,data:JSON.parse(row.data),allowed:JSON.parse(row.allowed),version:Number(row.version)};}
export function projectEntry(user,entry,visibleIds){if(canEdit(user,entry))return entry;const data={...entry.data};delete data.sheetSnapshot;
 if(Array.isArray(data.pins))data.pins=data.pins.filter(p=>!p.hidden&&(!p.entryId||visibleIds.has(p.entryId)));
 if(Array.isArray(data.nodes)){data.nodes=data.nodes.filter(n=>!n.hidden&&(!n.entryId||visibleIds.has(n.entryId)));const ids=new Set(data.nodes.map(n=>n.id));data.edges=(data.edges||[]).filter(e=>ids.has(e.from)&&ids.has(e.to));}
 if(Array.isArray(data.related))data.related=data.related.filter(id=>visibleIds.has(id));
 return {...entry,secret:'',allowed:[],data};}
