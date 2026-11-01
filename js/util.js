/* 커리어 코치 · 공통 함수 (상태 기본값, 날짜·공휴일, 진도 계산) */
const uid=()=>Math.random().toString(36).slice(2,9);
const mkItem=x=>({id:uid(),title:x.title,summary:x.summary||[],task:x.task||'',video:x.video||'',links:x.links||[],min:x.min||40,done:false,doneAt:null,memo:''});
function def(){return{
 v:2,theme:'dark',tab:'home',cur:0,view:null,
 months:THEMES.map(([ym,theme,goal],i)=>({ym,theme,goal,anchor:i===0?'2026-11-02':null,items:i===0?NOV_ITEMS.map(mkItem):[],key:i===0?NOV_KEY:null,bank:i===0?NOV_Q:null,attempts:[],closed:false})),
 acts:[],pauses:[],
 set:{provider:'claude',keys:{claude:'',openai:'',gemini:''},models:{claude:'claude-sonnet-5-5',openai:'gpt-5',gemini:'gemini-3.6-flash'}},
 chat:[]
}}
/* ======================= 날짜 ======================= */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const P=s=>new Date(s+'T00:00:00');
const today=()=>ymd(new Date());
const fmt=s=>{const d=P(s);return `${d.getMonth()+1}/${d.getDate()}(${'일월화수목금토'[d.getDay()]})`};
const HOLI=['2026-12-25','2027-01-01','2027-02-06','2027-02-07','2027-02-08','2027-02-09','2027-03-01','2027-05-01','2027-05-03','2027-05-05','2027-05-13','2027-06-06','2027-07-17','2027-07-19','2027-08-15','2027-08-16','2027-09-14','2027-09-15','2027-09-16','2027-10-03','2027-10-04','2027-10-09','2027-10-11','2027-12-25','2027-12-27'];
const isOff=d=>d.getDay()===0||d.getDay()===6||HOLI.includes(ymd(d))||(S&&S.offdays||'').includes(ymd(d));
function toWd(d){while(isOff(d))d.setDate(d.getDate()+1);return d}
function addWd(s,n){const d=toWd(P(s));while(n>0){d.setDate(d.getDate()+1);if(!isOff(d))n--}return ymd(d)}
const isPaused=()=>S.pauses.some(p=>!p.end);
const totalPause=()=>S.pauses.reduce((a,p)=>a+Math.max(0,((p.end?Date.parse(p.end):Date.now())-Date.parse(p.start))/DAY),0);
const M=i=>S.months[i];
const vi=()=>S.view==null?S.cur:Math.min(S.view,S.months.length-1);
const planDate=(m,k)=>m.anchor?addWd(m.anchor,k):null;
const examDate=m=>m.anchor?addWd(m.anchor,m.items.length):null;
const doneCnt=m=>m.items.filter(x=>x.done).length;
const nextItem=m=>m.items.findIndex(x=>!x.done);
const lateCnt=m=>m.anchor?m.items.filter((x,k)=>!x.done&&planDate(m,k)<today()).length:0;
const best=m=>m.attempts.length?Math.max(...m.attempts.map(a=>a.score)):null;
const verdict=s=>s>=80?{n:'수료',c:'good'}:s>=60?{n:'보완 후 재응시',c:'warn'}:{n:'재학습',c:'bad'};
const yearOf=i=>YEARS.findIndex(y=>i>=y.from&&i<=y.to);
