/* 커리어 코치 · AI 연동 (Claude·GPT·Gemini 호출, 커리큘럼·문항·요약 생성) */
/* ======================= AI ======================= */
const SYS=`너는 엔지니어 한 명의 학습 튜터다. 이 사람은 50세 전후로 공정개발·제조·설비기술·인프라를 거쳐 제조공장 인프라 그룹장이며, 공장에 Physical AI(예지보전·에너지 최적화)를 자체 기술로 도입해 왔다. 목표는 제조·유틸리티 Physical AI 도입 설계자(컨설턴트 또는 사업가)다.
규칙: 평이한 비즈니스 한국어로 짧고 구체적으로. 과장·자기계발서식 표현 금지. 현장 설비 비유를 쓰되 기술 용어는 정확히. 회사 기밀 수치는 요구하지 않는다. 링크는 확실한 공식 사이트만, 불확실하면 검색어로 제시.`;
function ctx(){const m=M(S.cur),k=nextItem(m),it=m.items[k>=0?k:m.items.length-1];return `[현재 테마] ${m.ym} ${m.theme} — ${m.goal}\n[진도] ${doneCnt(m)}/${m.items.length}일\n${it?`[현재 학습] Day ${m.items.indexOf(it)+1} ${it.title}: ${it.summary.join(' / ')}`:''}\n[지난 테마 시험] ${S.months.slice(0,S.cur).map(x=>`${x.ym} ${best(x)??'-'}점`).join(', ')||'없음'}`}
const tf=(u,o)=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),120000);return fetch(u,{...o,signal:c.signal}).finally(()=>clearTimeout(t))};
const rj=r=>r.json().catch(()=>({error:{message:'응답 형식 오류 (HTTP '+r.status+')'}}));
async function callAI(system,messages,maxTok=2000){try{return await callAI0(system,messages,maxTok)}catch(e){if(e.name==='AbortError')throw new Error('응답 시간이 2분을 넘었습니다. 다시 시도하세요');if(e instanceof TypeError)throw new Error('네트워크 연결을 확인하세요');throw e}}
async function callAI0(system,messages,maxTok){
 const p=S.set.provider,key=(S.set.keys[p]||'').trim(),model=(S.set.models[p]||'').trim();
 if(!key)throw new Error('API 키가 없습니다. [설정]에서 입력하세요.');
 let res,j;
 if(p==='claude'){res=await tf('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model,max_tokens:maxTok,system,messages})});j=await rj(res);if(!res.ok)throw new Error(j.error?.message||res.status);return (j.content||[]).map(c=>c.text||'').join('')}
 if(p==='openai'){res=await tf('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer '+key},body:JSON.stringify({model,messages:[{role:'system',content:system},...messages]})});j=await rj(res);if(!res.ok)throw new Error(j.error?.message||res.status);return j.choices?.[0]?.message?.content||''}
 res=await tf(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:messages.map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]})),generationConfig:{maxOutputTokens:maxTok}})});j=await rj(res);if(!res.ok)throw new Error(j.error?.message||res.status);return (j.candidates?.[0]?.content?.parts||[]).map(x=>x.text||'').join('')}
function arr(t){const a=t.indexOf('['),b=t.lastIndexOf(']');if(a<0||b<a)throw new Error('응답 형식을 읽지 못했습니다. 다시 시도하세요.');return JSON.parse(t.slice(a,b+1))}
async function ask(text,show=text){if(ui.busy)return;if(!ui.modal||ui.modal.t!=='chat')ui.modal={t:'chat'};S.chat.push({r:'user',c:show});ui.busy=true;render();
 const h=S.chat.filter(m=>m.r!=='err').slice(-12).map(m=>({role:m.r==='user'?'user':'assistant',content:m.c}));h[h.length-1].content=text;
 try{S.chat.push({r:'assistant',c:await callAI(SYS+'\n\n'+ctx(),h)||'(응답 없음)'})}catch(e){S.chat.push({r:'err',c:'오류: '+e.message})}
 if(S.chat.length>60)S.chat=S.chat.slice(-60);ui.busy=false;save();render()}
async function genCurriculum(mi,src){if(ui.busy)return;const m=M(mi);ui.busy=true;toast('커리큘럼 생성 중… 30초 정도 걸립니다');render();
 const prev=S.months.slice(0,mi).filter(x=>x.attempts.length).slice(-1)[0];let weak='';
 if(prev){const a=prev.attempts.at(-1);const w=a.qs.filter((q,j)=>a.ans[j]!==q.a).map(q=>(prev.items[q.d]||{}).title).filter(Boolean);weak=[...new Set(w)].join(', ')}
 const p=(src?`다음 텍스트를 일별 학습 항목으로 정리하라. 내용을 임의로 바꾸지 말고 구조만 맞춘다.\n---\n${src}\n---\n`:`월 테마 '${m.theme}'(목표: ${m.goal})로 평일 20일 학습 커리큘럼을 만들어라. 하루 30~45분. 5일마다 주간 정리 1일 포함. 마지막 2일은 실행형(정리·적용). ${weak?`지난 시험 약점(${weak})과 연결되는 내용을 초반에 반영.`:''}\n`)+'출력은 JSON 배열만: [{"title":"제목","summary":["핵심 문장 3~5개, 정확한 기술 내용"],"task":"현장 연결 실습 또는 생각할 질문","video":"YouTube 검색어","links":[{"t":"이름","u":"공식 문서 URL"}],"min":40}] — links는 표준기구·제조사·공식 프로젝트 사이트처럼 확실한 것만, 불확실하면 빈 배열. 모든 내용은 한국어로 쓴다. video 검색어는 한국어로 쓰고, 한국어 영상이 드문 주제만 영문 용어를 병기한다. 링크는 한국어 자료를 우선한다(장비 제조사 한국 지사 페이지, 스마트제조혁신추진단·한국생산기술연구원·한국산업안전보건공단 등 공공기관 자료). 한국어 공식 자료가 없으면 영문 공식 자료를 쓰고 t 끝에 " · 영문"을 붙인다. 개인 블로그 주소는 넣지 않는다. video 검색어는 한국 엔지니어 강의가 잘 걸리도록 "원리", "기초", "강의" 같은 한국어 표현을 쓴다.';
 try{const list=arr(await callAI(SYS,[{role:'user',content:p}],8000)).filter(x=>x&&x.title);if(!list.length)throw new Error('생성된 항목이 없습니다');m.items=list.map(mkItem);m.bank=null;m.key=null;if(!m.anchor)m.anchor=ymd(toWd(new Date()));toast(`${list.length}일 커리큘럼을 만들었습니다`);try{await genKey(mi)}catch(_){}}catch(e){toast('생성 실패: '+e.message)}
 ui.busy=false;save();render()}
async function genBank(mi){const m=M(mi);const body=m.items.map((it,k)=>`Day ${k} ${it.title}: ${it.summary.join(' / ')}`).join('\n');
 const p=`아래 ${m.items.length}일 학습 내용으로 객관식 25문항을 만들어라. 각 4지선다, 정답 1개. 개념 확인 60%, 현장 적용 판단 40%. 실행형(정리·적용) 일차는 출제하지 않아도 된다. 해설은 2~3문장으로 정답 이유와 헷갈리기 쉬운 오답이 왜 틀렸는지 포함. d는 출제 근거 일차 번호(0부터).\n출력은 JSON 배열만: [{"d":0,"q":"문제","o":["보기1","보기2","보기3","보기4"],"a":0,"e":"해설"}]\n---\n${body}`;
 const list=arr(await callAI(SYS,[{role:'user',content:p}],10000)).filter(x=>x&&x.q&&Array.isArray(x.o)&&x.o.length===4&&x.a>=0&&x.a<4);if(list.length<10)throw new Error('문항이 부족합니다');m.bank=list.map(x=>({...x,d:Math.max(0,Math.min(m.items.length-1,+x.d||0))}))}
async function genKey(mi){const m=M(mi);if(!m.items.length)return;const body=m.items.map((it,k)=>`Day ${k+1} ${it.title}: ${it.summary.join(' / ')}`).join('\n');
 const p=`아래 '${m.theme}' 과정을 수료한 사람이 복습할 때 가장 중요하게 기억해야 할 핵심 요약을 8~10개 항목으로 정리하라. 각 항목은 한국어 1~2문장으로, 구체적인 기술 내용과 현장 판단 기준을 담는다. 마지막 항목은 "컨설턴트 관점 한 줄:"로 시작한다. 출력은 JSON 문자열 배열만.\n---\n${body}`;
 const list=arr(await callAI(SYS,[{role:'user',content:p}],2500)).filter(x=>typeof x==='string'&&x.trim());if(!list.length)throw new Error('요약이 비어 있습니다');m.key=list}
function wrongSet(m){if(!m.wrong){m.wrong={};m.attempts.forEach(a=>a.qs.forEach((q,j)=>{if(a.ans[j]===q.a)delete m.wrong[q.q];else m.wrong[q.q]=q}))}return m.wrong}
function wrongCard(i){const m=M(i),W=Object.values(wrongSet(m));if(!W.length&&!m.attempts.length)return'';
 return `<div class="card"><div class="row"><div class="sp"><h3 style="margin:0">오답 노트</h3><div class="muted">${W.length?`아직 맞히지 못한 문항 ${W.length}개 — 다시 풀어 맞히면 빠집니다`:'남은 오답이 없습니다'}</div></div>${W.length?`<button class="btn sm pri" data-act="retry" data-m="${i}">다시 풀기</button>`:''}</div>${W.length?`<details style="margin-top:10px"><summary class="muted">문항 보기</summary>${W.map(q=>`<div class="wrong"><div class="qn">Day ${q.d+1}</div><p><b>${esc(q.q)}</b></p><p class="o">정답 · ${esc(q.o[q.a])}</p><div class="e">${esc(q.e)}</div></div>`).join('')}</details>`:''}</div>`}
function saveDraft(){S.examDraft=ui.exam;save()}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
