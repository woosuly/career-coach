/* 커리어 코치 · 클라우드 동기화 (Firebase) */
/* ======================= 클라우드 동기화 (Firebase) ======================= */
const DEVICE=(()=>{try{let d=localStorage.getItem('cc-device');if(!d){d=uid();localStorage.setItem('cc-device',d)}return d}catch(e){return uid()}})();
const LOCAL_ONLY=['months','set','tab','view','theme','updatedAt','syncUid','fs'];
function payloadObj(){const meta={};for(const k in S)if(!LOCAL_ONLY.includes(k))meta[k]=S[k];return{meta,months:S.months}}
function payloadStr(){try{return JSON.stringify(payloadObj())}catch(e){return''}}
function fbCfg(){if(FB_CONFIG)return FB_CONFIG;try{return JSON.parse(localStorage.getItem('cc-fbcfg')||'null')}catch(e){return null}}
function parseCfg(t){const o={};String(t).replace(/["']?(\w+)["']?\s*:\s*["']([^"']+)["']/g,(_,k,v)=>{o[k]=v});return o.apiKey&&o.projectId&&o.authDomain?o:null}
const FB={db:null,auth:null,col:null,unsub:null,pushed:{},timer:null};
function loadScript(u){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=u;s.onload=ok;s.onerror=()=>no(new Error('SDK 로드 실패'));document.head.appendChild(s)})}
async function fbBoot(){const cfg=fbCfg();if(!cfg)return;ui.fbState='연결 중';
 try{const b='https://www.gstatic.com/firebasejs/10.12.2/';if(typeof firebase==='undefined'){await loadScript(b+'firebase-app-compat.js');await loadScript(b+'firebase-auth-compat.js');await loadScript(b+'firebase-firestore-compat.js')}
  const app=firebase.apps.length?firebase.app():firebase.initializeApp(cfg);FB.auth=app.auth();FB.db=app.firestore();
  FB.auth.onAuthStateChanged(u=>{ui.user=u;if(u)startSync(u).catch(e=>{ui.fbState='오류: '+e.message;softRender()});else{stopSync();ui.fbState='로그인 필요'}softRender()});
 }catch(e){ui.fbState='오류: '+e.message;softRender()}}
function assemble(snap){let meta=null;const ms=[];snap.forEach(d=>{const x=d.data();if(d.id==='meta')meta=x;else if(/^m\d+$/.test(d.id))ms[+d.id.slice(1)]=x});
 if(!meta)return null;const mo=JSON.parse(meta.json),n=mo.monthCount||ms.length;delete mo.monthCount;
 const months=[];for(let i=0;i<n;i++){if(!ms[i])return null;months.push(JSON.parse(ms[i].json))}
 const pushed={meta:meta.json};ms.forEach((x,i)=>{if(x)pushed['m'+i]=x.json});
 return{data:{...mo,months},updatedAt:meta.updatedAt||0,device:meta.device,pushed}}
function applyRemote(r){S={...r.data,set:S.set,theme:S.theme,tab:S.tab,view:null,syncUid:ui.user.uid,updatedAt:r.updatedAt};migrate();FB.pushed=r.pushed;ui.lastPayload=payloadStr();
 try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}ui.exam=null;ui.result=null;ui.modal=null;ui.lastSync=Date.now()}
async function startSync(u){ui.fbState='동기화 중';softRender();FB.col=FB.db.collection('users').doc(u.uid).collection('career');
 const r=assemble(await FB.col.get());
 if(!r){S.syncUid=u.uid;await push(true)}
 else if(S.syncUid===u.uid){if(r.updatedAt>(S.updatedAt||0))applyRemote(r);else{FB.pushed=r.pushed;if((S.updatedAt||0)>r.updatedAt)await push(true)}}
 else{const ft=t=>t?new Date(t).toLocaleString('ko-KR'):'없음';
  if(!(S.updatedAt>0)||confirm(`클라우드에 저장된 기록(${ft(r.updatedAt)})이 있습니다.\n[확인] 클라우드 기록을 이 기기로 가져오기\n[취소] 이 기기 기록(${ft(S.updatedAt)})으로 클라우드 덮어쓰기`))applyRemote(r);
  else{S.syncUid=u.uid;FB.pushed=r.pushed;await push(true)}}
 S.syncUid=u.uid;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
 ui.syncReady=true;ui.fbState='동기화 켜짐';ui.lastSync=ui.lastSync||Date.now();
 if(FB.unsub)FB.unsub();
 FB.unsub=FB.col.onSnapshot(sn=>{if(sn.metadata.hasPendingWrites)return;const x=assemble(sn);if(x&&x.updatedAt>(S.updatedAt||0)&&x.device!==DEVICE){applyRemote(x);softRender();toast('다른 기기의 기록을 반영했습니다')}},e=>{ui.fbState='오류: '+e.message;softRender()});
 softRender()}
function stopSync(){if(FB.unsub)FB.unsub();FB.unsub=null;ui.syncReady=false;FB.col=null}
function schedulePush(){if(!ui.syncReady)return;clearTimeout(FB.timer);FB.timer=setTimeout(()=>push().catch(e=>{ui.fbState='저장 실패: '+e.message;if(S.tab==='set')softRender()}),1500)}
async function push(force){if(!FB.col||(!ui.syncReady&&!force))return;const p=payloadObj(),docs={meta:JSON.stringify({...p.meta,monthCount:p.months.length})};p.months.forEach((m,i)=>docs['m'+i]=JSON.stringify(m));
 const ch=Object.keys(docs).filter(k=>docs[k]!==FB.pushed[k]);if(!ch.length)return;if(!ch.includes('meta'))ch.push('meta');
 if(!S.updatedAt)S.updatedAt=Date.now();const t=S.updatedAt,b=FB.db.batch();
 ch.forEach(k=>b.set(FB.col.doc(k),k==='meta'?{json:docs.meta,updatedAt:t,device:DEVICE}:{json:docs[k],updatedAt:t}));
 await b.commit();ch.forEach(k=>FB.pushed[k]=docs[k]);ui.lastSync=Date.now();ui.fbState='동기화 켜짐';if(S.tab==='set')softRender()}
function vSync(){const cfg=fbCfg();
 const rules=`<details style="margin-top:12px"><summary class="muted">Firestore 보안 규칙 (필수)</summary><pre style="white-space:pre-wrap;font-size:12px;background:var(--card2);padding:10px;border-radius:8px;margin:8px 0 0">match /users/{uid}/career/{doc} {\n  allow read, write: if request.auth != null\n    && request.auth.uid == uid;\n}</pre><div class="muted" style="margin-top:6px">기존 규칙의 documents 블록 안에 추가하세요. 로그인한 사용자 전체에 열린 와일드카드 규칙이 있으면 이 기록을 다른 사용자도 볼 수 있으니 함께 확인하세요. Authentication에서 Google 로그인 사용, 승인된 도메인에 woosuly.github.io가 있어야 합니다.</div></details>`;
 if(!cfg)return `<div class="card"><h3>클라우드 동기화 (Firebase)</h3><div class="muted">휴대폰·PC 기록을 맞추려면 Firebase 웹 앱 설정(firebaseConfig)을 붙여넣으세요. 이 기기에만 저장됩니다.</div><textarea id="fbcfg" style="margin-top:10px;min-height:110px;font-size:12.5px" placeholder="const firebaseConfig = { apiKey: &quot;…&quot;, authDomain: &quot;…&quot;, projectId: &quot;…&quot;, … }"></textarea><div class="btns" style="margin-top:10px"><button class="btn pri" data-act="fbsave">저장하고 연결</button></div>${rules}</div>`;
 return `<div class="card"><h3>클라우드 동기화 (Firebase)</h3><div class="kv"><span>프로젝트</span><span>${esc(cfg.projectId)}</span></div><div class="kv"><span>상태</span><span>${esc(ui.fbState||'준비 중')}</span></div>${ui.user?`<div class="kv"><span>계정</span><span>${esc(ui.user.email||'')}</span></div><div class="kv"><span>마지막 동기화</span><span>${ui.lastSync?new Date(ui.lastSync).toLocaleString('ko-KR'):'–'}</span></div>`:''}
 <div class="muted" style="margin-top:8px">학습 기록·시험·이력이 동기화됩니다. AI API 키와 화면 모드는 기기별로 따로 둡니다.</div>
 <div class="btns" style="margin-top:12px">${ui.user?'<button class="btn" data-act="fbsync">지금 동기화</button><button class="btn ghost" data-act="fblogout">로그아웃</button>':`<button class="btn pri" data-act="fblogin" ${FB.auth?'':'disabled'}>Google로 로그인</button>`}${FB_CONFIG?'':'<button class="btn ghost danger" data-act="fbclear">설정 해제</button>'}</div>${rules}</div>`}
if(typeof window!=='undefined'&&window.addEventListener)window.addEventListener('online',()=>push().catch(()=>{}));
