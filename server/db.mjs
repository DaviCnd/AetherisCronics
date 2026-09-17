import {createClient} from '@libsql/client';
import fs from 'node:fs';
import path from 'node:path';
export async function openDatabase(url=process.env.TURSO_DATABASE_URL || 'file:./data/aetheris.db',authToken=process.env.TURSO_AUTH_TOKEN){
 if(url.startsWith('file:')) fs.mkdirSync(path.dirname(url.slice(5)),{recursive:true});
 const db=createClient({url,authToken});
 await db.executeMultiple(`
 CREATE TABLE IF NOT EXISTS lore_users(id TEXT PRIMARY KEY,username TEXT NOT NULL COLLATE NOCASE UNIQUE,password_hash TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN ('master','player')),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 CREATE UNIQUE INDEX IF NOT EXISTS lore_single_master ON lore_users(role) WHERE role='master';
 CREATE TABLE IF NOT EXISTS lore_sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL,expires_at INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS lore_sessions_user ON lore_sessions(user_id);
 CREATE TABLE IF NOT EXISTS lore_entries(id TEXT PRIMARY KEY,kind TEXT NOT NULL,title TEXT NOT NULL,summary TEXT NOT NULL DEFAULT '',content TEXT NOT NULL DEFAULT '',secret TEXT NOT NULL DEFAULT '',data TEXT NOT NULL DEFAULT '{}',visibility TEXT NOT NULL DEFAULT 'master',allowed TEXT NOT NULL DEFAULT '[]',owner_id TEXT NOT NULL DEFAULT '',version INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 CREATE INDEX IF NOT EXISTS lore_entries_owner ON lore_entries(owner_id);
 CREATE INDEX IF NOT EXISTS lore_entries_kind ON lore_entries(kind);
 CREATE TABLE IF NOT EXISTS lore_assets(id TEXT PRIMARY KEY,entry_id TEXT NOT NULL,mime TEXT NOT NULL,bytes BLOB NOT NULL);
 CREATE INDEX IF NOT EXISTS lore_assets_entry ON lore_assets(entry_id);
 CREATE TABLE IF NOT EXISTS lore_campaigns(id TEXT PRIMARY KEY,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',owner_id TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 CREATE TABLE IF NOT EXISTS lore_members(campaign_id TEXT NOT NULL,user_id TEXT NOT NULL,PRIMARY KEY(campaign_id,user_id));
 CREATE TABLE IF NOT EXISTS lore_invites(token_hash TEXT PRIMARY KEY,campaign_id TEXT NOT NULL,expires_at INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS lore_settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);
 `);
 const columns=(await db.execute('PRAGMA table_info(lore_entries)')).rows;
 const upgrading=!columns.some(c=>c.name==='campaign_id');
 if(!columns.some(c=>c.name==='campaign_id'))await db.execute("ALTER TABLE lore_entries ADD COLUMN campaign_id TEXT NOT NULL DEFAULT ''");
 if(upgrading){
  // Existing player records may contain notes written by the former global master.
  // Preserve those notes privately for that master before switching to author ownership.
  const admin=(await db.execute("SELECT id FROM lore_users WHERE role='master'")).rows[0];
  if(admin){const rows=(await db.execute({sql:"SELECT id,title,secret FROM lore_entries WHERE owner_id<>'' AND owner_id<>? AND secret<>''",args:[admin.id]})).rows;
   for(const e of rows)await db.batch([{sql:"INSERT OR IGNORE INTO lore_entries(id,kind,title,summary,content,secret,data,visibility,allowed,owner_id) VALUES(?,'lore',?,'Nota preservada da versão anterior','',?,'{}','master','[]',?)",args:['v2-note-'+e.id,('Notas anteriores: '+e.title).slice(0,180),e.secret,admin.id]},{sql:"UPDATE lore_entries SET secret='' WHERE id=?",args:[e.id]}],'write');}
 }
 return db;
}
