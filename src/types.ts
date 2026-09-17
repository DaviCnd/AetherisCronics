export type Kind='lore'|'character'|'npc'|'city'|'script'|'map'|'lineage';
export type Person={id:string;username:string;role:'master'|'player'};
export type Pin={id:string;label:string;x:number;y:number;entryId?:string;hidden?:boolean};
export type Node={id:string;name:string;x:number;y:number;entryId?:string;hidden?:boolean};
export type Edge={id:string;from:string;to:string;type:'parent'|'partner'|'sibling'};
export type Entry={id:string;kind:Kind;title:string;summary:string;content:string;secret:string;visibility:'master'|'all'|'selected';allowed:string[];owner_id:string;campaign_id?:string;version:number;updated_at?:string;data:{richContent?:string;tags?:string[];race?:string;region?:string;occupation?:string;appearance?:string;personality?:string;motivation?:string;status?:string;source?:string;sourcePage?:number;document?:'lore'|'grimorio';sheetId?:string;sheetUrl?:string;sheetSnapshot?:Record<string,unknown>;imageId?:string;art?:string;portrait?:boolean;related?:string[];pins?:Pin[];nodes?:Node[];edges?:Edge[]}};
export type Settings={sheetSiteUrl?:string;fichaConnected?:boolean};
export const labels:Record<Kind,string>={lore:'Enciclopédia',character:'Personagens',npc:'NPCs & divindades',city:'Cidades & regiões',script:'Roteiros & escrita',map:'Atlas & mapas',lineage:'Árvores genealógicas'};
export const singular:Record<Kind,string>={lore:'Lore',character:'Personagem',npc:'NPC',city:'Cidade ou região',script:'Roteiro',map:'Mapa',lineage:'Linhagem'};
export const emptyEntry=(kind:Kind):Entry=>({id:'',kind,title:'',summary:'',content:'',secret:'',visibility:'master',allowed:[],owner_id:'',version:1,data:{tags:[],status:kind==='script'?'Rascunho':'',pins:[],nodes:[],edges:[]}});
export async function api(url:string,options:RequestInit={}){const r=await fetch('/api'+url,{credentials:'same-origin',...options,headers:{...(options.body&&typeof options.body==='string'?{'Content-Type':'application/json'}:{}),...options.headers}});const data=await r.json().catch(()=>({error:'Resposta inesperada do servidor.'}));if(!r.ok)throw new Error(data.error||'Falha na solicitação.');return data;}
export const imageFor=(e:Entry)=>e.data.imageId?`/api/assets/${e.data.imageId}`:e.data.art?`/api/art/${e.data.art}`:'';

export type Campaign={id:string;name:string;description:string;owner_id:string;members:{id:string;username:string}[]};
