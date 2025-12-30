const DB_NAME="expense2026";const DB_VER=1;
function openDb(){return new Promise((res,rej)=>{const r=indexedDB.open(DB_NAME,DB_VER);
r.onupgradeneeded=()=>{const db=r.result;
if(!db.objectStoreNames.contains("txns")){const s=db.createObjectStore("txns",{keyPath:"id"});s.createIndex("date","date");s.createIndex("updatedAt","updatedAt");}
if(!db.objectStoreNames.contains("meta"))db.createObjectStore("meta",{keyPath:"key"});
if(!db.objectStoreNames.contains("learn"))db.createObjectStore("learn",{keyPath:"key"});
};
r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function idbGet(store,key){const db=await openDb();return new Promise((res,rej)=>{const tx=db.transaction(store,"readonly");const s=tx.objectStore(store);const r=s.get(key);r.onsuccess=()=>res(r.result||null);r.onerror=()=>rej(r.error);});}
async function idbPut(store,val){const db=await openDb();return new Promise((res,rej)=>{const tx=db.transaction(store,"readwrite");tx.objectStore(store).put(val);tx.oncomplete=()=>res(true);tx.onerror=()=>rej(tx.error);});}
async function idbAll(store){const db=await openDb();return new Promise((res,rej)=>{const tx=db.transaction(store,"readonly");const s=tx.objectStore(store);const r=s.getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);});}
