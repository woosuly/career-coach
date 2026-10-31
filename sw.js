/* 커리어 코치 · 서비스 워커 — 네트워크 우선, 오프라인일 때만 캐시 사용
   파일을 고쳐 올리면 다음 접속 때 바로 반영된다. 캐시 목록을 바꿨을 때만 VERSION을 올린다. */
const VERSION='cc-2026-11-01';
const SHELL=['./','index.html','css/style.css','js/config.js','js/content.js','js/util.js','js/views.js','js/ai.js','js/voice.js','js/sync.js','js/actions.js','js/main.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
