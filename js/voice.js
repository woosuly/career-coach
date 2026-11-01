/* 커리어 코치 · 음성 입력·읽어주기, 뒤로가기 처리 */
/* ======================= 음성 입력 · 뒤로가기 ======================= */
function speakText(t,tag){const ss=window.speechSynthesis;if(!ss)return;t=String(t).replace(/https?:\/\/\S+/g,'').replace(/[#*`>|_]/g,'').replace(/^\s*[-•]\s*/gm,'').replace(/\n+/g,'. ');
 const u=new SpeechSynthesisUtterance(t);u.lang='ko-KR';u.rate=.95;u.onend=u.onerror=()=>{if(ui.speaking===tag){ui.speaking=false;softRender()}};ss.cancel();ss.speak(u);ui.speaking=tag;render()}
const SR=typeof window!=='undefined'&&(window.SpeechRecognition||window.webkitSpeechRecognition);
const MICSVG='<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
let rec=null,recEl=null;
function addMics(){if(rec){try{rec.abort()}catch(e){}rec=null;recEl=null}if(!SR)return;
 document.querySelectorAll('input:not([type]),input[type=text],textarea').forEach(el=>{if(el.id==='keyin'||el.id==='fbcfg'||(el.dataset.bind||'').startsWith('set.')||el.parentNode.classList.contains('vwrap'))return;
  const w=document.createElement('span');w.className='vwrap';el.parentNode.insertBefore(w,el);w.appendChild(el);const b=document.createElement('button');b.type='button';b.className='mic';b.title='음성 입력';b.innerHTML=MICSVG;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();micToggle(el,b)});w.appendChild(b)})}
function micToggle(el,b){if(rec){const same=recEl===el;try{rec.stop()}catch(e){}if(same)return}
 const r=new SR();r.lang='ko-KR';r.interimResults=true;r.continuous=true;const base=el.value?el.value.replace(/\s*$/,' '):'';let fin='';
 r.onresult=e=>{let tmp='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)fin+=t;else tmp+=t}el.value=base+fin+tmp;el.dispatchEvent(new Event('input',{bubbles:true}))};
 r.onerror=e=>{if(e.error==='not-allowed')toast('마이크 권한을 허용해 주세요');else if(e.error!=='aborted'&&e.error!=='no-speech')toast('음성 인식 오류: '+e.error)};
 r.onend=()=>{b.classList.remove('on');if(rec===r){rec=null;recEl=null}};
 try{r.start();rec=r;recEl=el;b.classList.add('on')}catch(e){toast('음성 입력을 시작하지 못했습니다')}}
function syncHist(){if(typeof history==='undefined')return;const open=!!ui.modal||!!ui.exam,st=history.state&&history.state.cc;
 if(open&&!st)history.pushState({cc:1},'');else if(!open&&st){ui.histBack=true;history.back()}}
if(typeof window!=='undefined'&&window.addEventListener)window.addEventListener('popstate',()=>{if(ui.histBack){ui.histBack=false;return}
 if(ui.speaking){speechSynthesis.cancel();ui.speaking=false}
 if(ui.modal){ui.modal=null;ui.prev=null;render()}else if(ui.exam){history.pushState({cc:1},'');A.quitexam()}});
