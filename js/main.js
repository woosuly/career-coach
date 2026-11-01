/* 커리어 코치 · 시작 (저장 데이터 불러오기 → 첫 화면 표시) — 반드시 마지막에 로드 */
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S){S=def();try{const o=JSON.parse(localStorage.getItem('career-coach-v1'));if(o&&o.set)S.set=o.set}catch(e){}}
if(S.months&&S.months[0]&&!S.months[0].key&&S.months[0].ym==="'26.11")S.months[0].key=NOV_KEY;
function migrate(){const m0=S.months&&S.months[0];if(!m0||m0.ym!=="'26.11")return;const it=m0.items.find(x=>x.title==='Modbus RTU / TCP');if(it&&!it.links.some(l=>l.u===WAGO_MB.u))it.links.unshift({...WAGO_MB})}
migrate();
const ui={persist:null,modal:null,busy:false,exam:null,result:null,pasteOpen:false,prev:null,lastQ:''};
ui.lastPayload=payloadStr();
function save(){const p=payloadStr();if(p!==ui.lastPayload){S.updatedAt=Date.now();ui.lastPayload=p;schedulePush()}try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('저장 실패')}}
document.documentElement.dataset.theme=S.theme;
if(S.tab==='ai')S.tab='home';

if(!S.created)S.created=today();
if(typeof navigator!=='undefined'&&navigator.storage&&navigator.storage.persist){navigator.storage.persisted().then(p=>p||navigator.storage.persist()).then(p=>{ui.persist=!!p;if(S.tab==='set')softRender()}).catch(()=>{ui.persist=false})}else ui.persist=false;
if(typeof history!=='undefined'&&history.state&&history.state.cc)history.replaceState(null,'');
render();
fbBoot();
if(typeof navigator!=='undefined'&&'serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
