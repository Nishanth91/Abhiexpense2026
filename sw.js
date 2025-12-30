const CACHE_NAME = "expense2026-v1";
const ASSETS = ["./","./index.html","./styles.css","./app.js","./idb.js","./manifest.webmanifest","./assets/icon-192.png","./assets/icon-512.png"];
self.addEventListener("install",(e)=>{e.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(ASSETS);self.skipWaiting();})())});
self.addEventListener("activate",(e)=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));self.clients.claim();})())});
self.addEventListener("fetch",(e)=>{e.respondWith((async()=>{const req=e.request;const url=new URL(req.url);
if(url.hostname.includes("supabase")||url.pathname.includes("/rest/v1/")){try{return await fetch(req);}catch(_){return new Response(JSON.stringify({error:"offline"}),{status:503});}}
const cache=await caches.open(CACHE_NAME);const hit=await cache.match(req);if(hit)return hit;
try{const fresh=await fetch(req);if(req.method==="GET"&&fresh.ok)cache.put(req,fresh.clone());return fresh;}catch(_){return hit||new Response("Offline",{status:503});}
})())});
