/* 커리어 코치 · 사용자 동작 처리 (버튼·입력·키보드·터치) */
/* ======================= 이벤트 ======================= */
const A={
 tab:d=>{S.tab=d.t;S.view=null;ui.sec=null;ui.pasteOpen=false;ui.result=null;ui.modal=null;save();render();scrollTo(0,0)},
 theme:()=>{S.theme=S.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=S.theme;save();render()},
 mv:d=>{S.view=Math.max(0,Math.min(S.months.length-1,vi()+ +d.d));ui.result=null;render()},
 open:d=>{if(wide()){const mi=+d.m,k=+d.k;if(k<0||k>=M(mi).items.length)return;ui.modal=null;ui.prev=null;ui.more=false;S.tab='cur';ui.sec='day';S.view=mi;ui.sel={m:mi,k};render();const r=document.querySelector('.col-r');if(r)r.scrollTop=0;return}if(ui.modal&&(ui.modal.t==='search'||ui.modal.t==='review'))ui.prev=ui.modal;else if(!ui.modal)ui.prev=null;ui.modal={t:'item',m:+d.m,k:+d.k};render()},
 back:()=>{ui.modal=ui.prev;ui.prev=null;render()},
 search:()=>{ui.prev=null;ui.modal={t:'search'};render()},
 review:d=>{ui.prev=null;ui.modal={t:'review',m:+d.m,rv:d.rv||''};render()},
 genkey:async d=>{if(ui.busy)return;ui.busy=true;toast('핵심 요약 정리 중…');try{await genKey(+d.m);toast('핵심 요약을 만들었습니다')}catch(e){toast('실패: '+e.message)}ui.busy=false;save();render()},
 mclose:()=>{ui.modal=null;ui.prev=null;ui.more=false;render()},
 speak:d=>{if(ui.speaking){speechSynthesis.cancel();ui.speaking=false;render();return}const it=M(+d.m).items[+d.k];speakText([it.title,...it.summary,it.task?'실습. '+it.task:''].join('. '),'item')},
 speakmsg:d=>{if(ui.speaking===('msg'+d.i)){speechSynthesis.cancel();ui.speaking=false;render();return}speakText(S.chat[+d.i].c,'msg'+d.i)},
 remind:()=>{const [h,mi]=(S.remind||'07:00').split(':').map(Number),st=new Date(P(today()));st.setHours(h,mi);const en=new Date(st.getTime()+40*6e4),f=x=>ymd(x).replace(/-/g,'')+'T'+String(x.getHours()).padStart(2,'0')+String(x.getMinutes()).padStart(2,'0')+'00';window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('커리어 코치 학습')+'&details='+encodeURIComponent('오늘의 학습 열기: '+location.href.split('#')[0])+'&dates='+f(st)+'/'+f(en)+'&ctz=Asia/Seoul&recur='+encodeURIComponent('RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'),'_blank')},
 remindics:()=>{const t=(S.remind||'07:00').replace(':',''),d=today().replace(/-/g,''),ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//career-coach//KO','BEGIN:VEVENT','UID:cc-remind-'+uid()+'@career-coach','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z','DTSTART;TZID=Asia/Seoul:'+d+'T'+t+'00','DURATION:PT40M','RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR','SUMMARY:커리어 코치 학습','DESCRIPTION:'+location.href.split('#')[0],'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:커리어 코치 학습','TRIGGER:PT0M','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='career-coach-alarm.ics';a.click();toast('파일을 열어 캘린더에 추가하세요')},
 fs:d=>{S.fs=+d.v;save();render()},
 bg:(d,el,e)=>{if(e.target===el){ui.modal=null;render()}},
 done:d=>{const m=M(+d.m),it=m.items[+d.k];it.done=!it.done;it.doneAt=it.done?today():null;if(!m.anchor)m.anchor=ymd(toWd(new Date()));save();
  if(it.done){const nx=nextItem(m);if(nx>=0){if(wide()&&!ui.modal)ui.sel={m:+d.m,k:nx};else ui.modal={t:'item',m:+d.m,k:nx};render();toast(`Day ${+d.k+1} 완료 · 다음 학습으로 이동`)}else{ui.modal=null;S.tab='ex';S.view=+d.m;render();toast('20일 학습 완료 · 수료 시험을 볼 수 있습니다')}}else render()},
 askitem:d=>{const it=M(+d.m).items[+d.k];ui.prev=ui.modal;ui.modal=null;ui.more=false;ask(`'${it.title}' 내용을 공부 중이다. 핵심: ${it.summary.join(' / ')}. 현장 엔지니어 관점에서 더 깊게 설명하고, 내가 헷갈리기 쉬운 포인트 2개를 짚어줘.`,`Day ${+d.k+1} ${it.title} — 더 설명해줘`)},
 edititem:d=>{ui.modal={t:'edit',m:+d.m,k:+d.k};render()},
 additem:d=>{ui.modal={t:'edit',m:+d.m,k:null};render()},
 saveitem:()=>{const g=id=>document.getElementById(id).value.trim();if(!g('e_t')){toast('제목을 입력하세요');return}
  const v={title:g('e_t'),summary:g('e_s').split('\n').map(s=>s.trim()).filter(Boolean),task:g('e_k'),video:g('e_v'),links:g('e_l').split('\n').map(s=>s.trim()).filter(Boolean).map(s=>{const p=s.split('|');return p.length>1?{t:p[0].trim(),u:p.slice(1).join('|').trim()}:{t:s,u:s}})};
  const m=M(ui.modal.m);if(ui.modal.k!=null)Object.assign(m.items[ui.modal.k],v);else{m.items.push(mkItem(v));if(!m.anchor)m.anchor=ymd(toWd(new Date()))}ui.modal=null;save();render()},
 delitem:()=>{if(!confirm('이 학습을 삭제할까요?'))return;M(ui.modal.m).items.splice(ui.modal.k,1);ui.modal=null;save();render()},
 gencur:d=>{const m=M(+d.m);if(m.items.length&&!confirm('기존 커리큘럼과 시험 문항을 새로 만듭니다. 진행할까요?'))return;genCurriculum(+d.m)},
 paste:()=>{S.tab='cur';ui.sec='day';ui.modal=null;ui.pasteOpen=!ui.pasteOpen;render()},
 sec:d=>{ui.sec=d.s;render()},
 chat:()=>{ui.prev=null;ui.modal={t:'chat'};render()},
 more:()=>{ui.more=!ui.more;render()},
 themeset:d=>{S.theme=d.v;document.documentElement.dataset.theme=S.theme;save();render()},
 pastego:()=>{const t=document.getElementById('pastebox').value.trim();if(!t){toast('내용을 붙여넣으세요');return}ui.pasteOpen=false;genCurriculum(vi(),t)},
 startexam:async d=>{const mi=+d.m,m=M(mi);ui.result=null;
  if(!m.bank){if(ui.busy)return;ui.busy=true;toast('AI가 시험 문항을 만드는 중… 1분 정도 걸립니다');try{await genBank(mi);save()}catch(e){ui.busy=false;toast('출제 실패: '+e.message);render();return}ui.busy=false}
  ui.exam={m:mi,qs:shuffle(m.bank),i:0,ans:[],mode:'full'};S.tab='ex';saveDraft();render();scrollTo(0,0)},
 regen:async d=>{if(!confirm('AI로 새 문항을 출제합니다. 진행할까요?'))return;const m=M(+d.m);const old=m.bank;m.bank=null;await A.startexam(d);if(!m.bank)m.bank=old;save()},
 pick:d=>{ui.exam.ans[ui.exam.i]=+d.j;if(ui.exam.i<ui.exam.qs.length-1){ui.exam.i++}saveDraft();render()},
 qprev:()=>{ui.exam.i--;saveDraft();render()},
 qnext:()=>{ui.exam.i++;saveDraft();render()},
 quitexam:()=>{if(confirm('시험을 중단할까요? 푼 데까지 저장되어 나중에 이어 풀 수 있습니다.')){ui.exam=null;render()}},
 resumeexam:()=>{if(!S.examDraft)return;ui.exam=S.examDraft;ui.result=null;ui.modal=null;S.tab='ex';S.view=ui.exam.m;render();scrollTo(0,0)},
 retry:d=>{const m=M(+d.m),W=Object.values(wrongSet(m));if(!W.length)return;ui.result=null;ui.exam={m:+d.m,qs:shuffle(W),i:0,ans:[],mode:'retry'};S.tab='ex';saveDraft();render();scrollTo(0,0)},
 spaced:d=>{const m=M(+d.m),W=Object.values(wrongSet(m));let qs=shuffle(W).slice(0,5);if(qs.length<5)qs=qs.concat(shuffle((m.bank||[]).filter(q=>!qs.some(x=>x.q===q.q))).slice(0,5-qs.length));if(!qs.length){toast('복습할 문항이 없습니다');return}ui.modal=null;ui.result=null;ui.exam={m:+d.m,qs,i:0,ans:[],mode:'spaced',rv:d.rv||null};S.tab='ex';saveDraft();render();scrollTo(0,0)},
 submit:()=>{const x=ui.exam,m=M(x.m);const c=x.qs.filter((q,j)=>x.ans[j]===q.a).length,score=Math.round(c/x.qs.length*100);
  const W=wrongSet(m);x.qs.forEach((q,j)=>{if(x.ans[j]===q.a)delete W[q.q];else W[q.q]=q});S.examDraft=null;
  if(x.mode&&x.mode!=='full'){if(x.mode==='spaced'&&x.rv){m.rv=m.rv||{};m.rv[x.rv]=today()}ui.exam=null;ui.result={m:x.m,att:{at:new Date().toISOString(),qs:x.qs,ans:x.ans,score,total:x.qs.length,analysis:'',mode:x.mode}};save();render();scrollTo(0,0);return}
  m.attempts.push({at:new Date().toISOString(),qs:x.qs,ans:x.ans,score,total:x.qs.length,analysis:''});
  if(score>=80&&!m.closed){m.closed=true;m.passedAt=today();S.acts.push({id:uid(),d:today(),t:'학습',title:`${m.ym} ${m.theme} 수료 (${score}점)`,memo:''})}
  ui.exam=null;ui.result={m:x.m,a:m.attempts.length-1};save();render();scrollTo(0,0)},
 showres:d=>{ui.result={m:+d.m,a:+d.a};render();scrollTo(0,0)},
 closeres:()=>{ui.result=null;render()},
 aianal:async d=>{if(ui.busy)return;const m=M(+d.m),a=m.attempts[+d.a];const w=a.qs.map((q,j)=>({q,my:a.ans[j]})).filter(x=>x.my!==x.q.a);
  if(!w.length){toast('틀린 문항이 없습니다');return}ui.busy=true;toast('오답 분석 중…');
  const p=`${m.theme} 수료 시험 ${a.score}점. 틀린 문항:\n${w.map(x=>`- [Day ${x.q.d+1} ${(m.items[x.q.d]||{}).title||''}] ${x.q.q} / 내 답: ${x.q.o[x.my]} / 정답: ${x.q.o[x.q.a]}`).join('\n')}\n\n다음을 짧게 정리하라: 1) 오답 패턴(개념 미이해, 유사 개념 혼동, 현장 적용 판단 중 무엇인지) 2) 문항별로 왜 그 답을 골랐을지와 바로잡을 핵심 한 줄 3) 다시 볼 일차와 보완 학습 3가지 4) 다음 테마에 반영할 점.`;
  try{a.analysis=await callAI(SYS,[{role:'user',content:p}],2500)}catch(e){toast('분석 실패: '+e.message)}ui.busy=false;save();render()},
 nextmonth:()=>{if(S.cur>=S.months.length-1){toast('다음 테마가 없습니다. [커리큘럼]에서 추가하세요');return}S.cur++;const m=M(S.cur);if(!m.anchor)m.anchor=ymd(toWd(new Date(Date.now()+DAY)));ui.result=null;S.view=null;S.tab='home';save();render();toast(`${m.ym} ${m.theme} 시작`)},
 addmonth:()=>{ui.modal={t:'month'};render()},
 savemonth:()=>{const t=document.getElementById('t_t').value.trim();if(!t){toast('테마를 입력하세요');return}const l=S.months.at(-1).ym.replace("'",'').split('.');let y=+l[0],mo=+l[1]+1;if(mo>12){mo=1;y++}S.months.push({ym:`'${y}.${mo}`,theme:t,goal:document.getElementById('t_g').value.trim(),anchor:null,items:[],bank:null,attempts:[],closed:false});S.view=S.months.length-1;ui.modal=null;save();render()},
 addact:()=>{ui.modal={t:'act'};render()},
 saveact:()=>{const g=id=>document.getElementById(id).value.trim();if(!g('a_n')){toast('내용을 입력하세요');return}S.acts.push({id:uid(),d:g('a_d')||today(),t:g('a_t'),title:g('a_n'),memo:g('a_m')});ui.modal=null;save();render()},
 delact:d=>{if(confirm('삭제할까요?')){S.acts=S.acts.filter(a=>a.id!==d.id);save();render()}},
 prov:d=>{S.set.provider=d.p;ui.customModel=false;save();render()},
 loadmodels:async()=>{const p=S.set.provider,key=(S.set.keys[p]||'').trim();if(!key)return;toast('모델 목록 불러오는 중…');
  try{let ids=[];
   if(p==='claude'){const r=await fetch('https://api.anthropic.com/v1/models?limit=100',{headers:{'x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}});const j=await r.json();if(!r.ok)throw new Error(j.error?.message||r.status);ids=(j.data||[]).map(x=>x.id)}
   else if(p==='openai'){const r=await fetch('https://api.openai.com/v1/models',{headers:{authorization:'Bearer '+key}});const j=await r.json();if(!r.ok)throw new Error(j.error?.message||r.status);ids=(j.data||[]).map(x=>x.id).filter(id=>/^(gpt|o\d|chatgpt)/.test(id)&&!/(audio|realtime|tts|transcribe|image|search|embedding|instruct)/.test(id)).sort().reverse()}
   else{const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200&key='+encodeURIComponent(key));const j=await r.json();if(!r.ok)throw new Error(j.error?.message||r.status);ids=(j.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')).map(m=>m.name.replace(/^models\//,'')).filter(id=>/^gemini/.test(id)&&!/(embedding|image|tts|audio)/.test(id)).sort().reverse()}
   if(!ids.length)throw new Error('사용 가능한 모델이 없습니다');S.set.modelLists=S.set.modelLists||{};S.set.modelLists[p]=ids;if(!ids.includes(S.set.models[p]))S.set.models[p]=ids[0];ui.customModel=false;save();render();toast(`${ids.length}개 모델을 불러왔습니다`)
  }catch(e){toast('불러오기 실패: '+e.message)}},
 send:()=>{const t=document.getElementById('ask').value.trim();if(t)ask(t)},
 chatclear:()=>{if(confirm('대화를 지울까요?')){S.chat=[];save();render()}},
 aiex:()=>{const m=M(S.cur),k=nextItem(m),it=m.items[k];if(!it){toast('진행 중인 학습이 없습니다');return}ask(`'${it.title}'를 비전공자 관리자도 이해할 수 있게, 공장 설비 비유로 쉽게 설명해줘. 핵심: ${it.summary.join(' / ')}`,`Day ${k+1} 쉽게 설명해줘`)},
 aiq:()=>{const m=M(S.cur),k=nextItem(m),it=m.items[k];if(!it){toast('진행 중인 학습이 없습니다');return}ask(`'${it.title}' 내용으로 이해 확인 질문 3개를 내줘(서술형 짧은 답). 내가 답하면 채점해줘. 정답은 아직 알려주지 마.`,`Day ${k+1} 확인 질문 3개`)},
 test:async()=>{toast('연결 확인 중…');try{const a=await callAI('짧게 답하라.',[{role:'user',content:'"정상" 한 단어로 답해.'}],50);toast('연결 정상 · '+a.slice(0,20))}catch(e){toast('실패: '+e.message)}},
 pause:()=>{if(!isPaused()){ui.modal={t:'pause'};render()}},
 pausego:()=>{S.pauses.push({start:new Date().toISOString(),end:null,reason:document.getElementById('pr').value,memo:document.getElementById('pm').value.trim()});ui.modal=null;save();render();toast('멈췄습니다. 진도는 그대로 유지됩니다')},
 resume:()=>{const p=S.pauses.find(x=>!x.end);if(!p)return;p.end=new Date().toISOString();const days=Math.round((Date.parse(p.end)-Date.parse(p.start))/DAY);const m=M(S.cur);
  if(m.anchor&&days>0){const k=nextItem(m);const shift=Math.max(0,k<0?0:Math.ceil(days*5/7));if(shift>0){const d=P(m.anchor);let n=shift;while(n>0){d.setDate(d.getDate()+1);if(!isOff(d))n--}m.anchor=ymd(d)}}
  save();render();toast(`재개했습니다 · ${days}일 멈춤만큼 예정일을 조정했습니다`)},
 fbsave:()=>{const c=parseCfg(document.getElementById('fbcfg').value);if(!c){toast('apiKey·authDomain·projectId를 찾지 못했습니다');return}try{localStorage.setItem('cc-fbcfg',JSON.stringify(c))}catch(e){}ui.fbState='연결 중';render();fbBoot()},
 fblogin:async()=>{if(!FB.auth)return;const pv=new firebase.auth.GoogleAuthProvider();try{await FB.auth.signInWithPopup(pv)}catch(e){if(['auth/popup-blocked','auth/operation-not-supported-in-this-environment','auth/cancelled-popup-request'].includes(e.code))FB.auth.signInWithRedirect(pv);else if(e.code!=='auth/popup-closed-by-user')toast('로그인 실패: '+e.message)}},
 fblogout:async()=>{if(confirm('로그아웃할까요? 이 기기 기록은 그대로 남습니다.')){await FB.auth.signOut();toast('로그아웃했습니다')}},
 fbsync:async()=>{try{await push(true);toast('동기화했습니다')}catch(e){toast('실패: '+e.message)}},
 fbclear:()=>{if(confirm('Firebase 설정을 지울까요? 기록은 그대로 남습니다.')){stopSync();try{localStorage.removeItem('cc-fbcfg')}catch(e){}location.reload()}},
 export:()=>{S.lastBackup=today();save();const b=new Blob([JSON.stringify({...S,set:{...S.set,keys:{claude:'',openai:'',gemini:''}}})],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`career-coach-${today()}.json`;a.click();toast('백업 저장 (API 키 제외)');render()},
 import:()=>document.getElementById('impf').click(),
 reset:()=>{if(confirm('모든 기록을 지우고 처음으로 돌릴까요?'+(ui.user?' 동기화 중이라 클라우드 기록도 함께 초기화됩니다.':'')+' 먼저 백업을 권합니다.')){const k=S.set,t=S.theme,su=S.syncUid;S=def();S.set=k;S.theme=t;S.syncUid=su;ui.exam=null;ui.result=null;save();render()}}
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const f=A[el.dataset.act];if(!f)return;if(el.dataset.act!=='bg')e.preventDefault();f(el.dataset,el,e)});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.bind){setPath(t.dataset.bind,t.value);save()}if(t.id==='sq'){ui.lastQ=t.value;const r=document.getElementById('sres');if(r)r.innerHTML=searchHTML(t.value)}});
document.addEventListener('change',e=>{const t=e.target;
 if(t.dataset.act2==='showkey'){ui.showKey=t.checked;render();return}
 if(t.dataset.act2==='model'){const p=S.set.provider;if(t.value==='__custom'){ui.customModel=true;render();setTimeout(()=>{const i=document.querySelector('[data-bind="set.models.'+p+'"]');if(i)i.focus()},30)}else{S.set.models[p]=t.value;ui.customModel=false;save();render();toast('모델: '+t.value)}return}
 if(t.dataset.act2==='anchor'&&t.value){M(S.cur).anchor=ymd(toWd(P(t.value)));save();toast('일정을 다시 계산했습니다');render()}
 if(t.id==='impf'&&t.files[0]){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.months)throw 0;const k=S.set.keys;S=d;S.set.keys={...k};document.documentElement.dataset.theme=S.theme||'dark';save();render();toast('가져왔습니다')}catch(_){toast('백업 파일 형식이 아닙니다')}};r.readAsText(t.files[0])}});
document.addEventListener('keydown',e=>{if(e.target.id==='ask'&&e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();A.send();return}
 if(e.key==='Escape'&&ui.modal){A.mclose();return}
 const tg=e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT'||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;const d=e.key==='ArrowRight'?1:-1;
 if(ui.modal&&ui.modal.t==='item'){const k=ui.modal.k+d;if(k>=0&&k<M(ui.modal.m).items.length){ui.modal={t:'item',m:ui.modal.m,k};render()}e.preventDefault()}
 else if(!ui.modal&&wide()&&S.tab==='cur'&&(ui.sec||'day')==='day'&&ui.sel){const k=ui.sel.k+d;if(k>=0&&k<M(ui.sel.m).items.length){ui.sel={m:ui.sel.m,k};render();const r=document.querySelector('.col-r');if(r)r.scrollTop=0}e.preventDefault()}});
let rzW=typeof innerWidth!=='undefined'?innerWidth>=900:false;if(typeof window!=='undefined'&&window.addEventListener)window.addEventListener('resize',()=>{const w=wide();if(w!==rzW){rzW=w;if(w&&ui.modal&&ui.modal.t==='item'){ui.sel={m:ui.modal.m,k:ui.modal.k};S.tab='cur';ui.sec='day';S.view=ui.modal.m;ui.modal=null}softRender()}});
let tx=null,ty=null;
document.addEventListener('touchstart',e=>{tx=null;if(ui.modal&&ui.modal.t==='item'&&e.target.closest('.sheet')&&!e.target.closest('textarea,input,a')){tx=e.touches[0].clientX;ty=e.touches[0].clientY}},{passive:true});
document.addEventListener('touchend',e=>{if(tx==null||!ui.modal||ui.modal.t!=='item')return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;tx=null;if(Math.abs(dx)<70||Math.abs(dy)>50)return;
 const m=M(ui.modal.m),k=ui.modal.k+(dx<0?1:-1);if(k<0||k>=m.items.length)return;ui.modal={t:'item',m:ui.modal.m,k};render();const sh=document.querySelector('.sheet');if(sh)sh.scrollTop=0},{passive:true});
