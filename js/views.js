/* 커리어 코치 · 화면 (아이콘, 각 탭 화면, 모달, 렌더) */
/* ======================= 아이콘 ======================= */
const I={
 home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>',
 gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
 cur:'<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
 ex:'<svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/></svg>',
 his:'<svg viewBox="0 0 24 24"><path d="M4 22V4"/><path d="M4 4h12l-2 4 2 4H4"/></svg>',
 ai:'<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
 set:'<svg viewBox="0 0 24 24"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
 srch:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
 sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 moon:'<svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
 l:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>',
 r:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>',
 ck:'<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>'
};
function ring(p,big,sub,col){const r=34,c=2*Math.PI*r,v=Math.max(0,Math.min(1,p));return `<svg viewBox="0 0 84 84" width="84" height="84"><circle cx="42" cy="42" r="${r}" fill="none" stroke="var(--card2)" stroke-width="8"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="${col||'var(--acc)'}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c*v} ${c}" transform="rotate(-90 42 42)"/><text x="42" y="45" text-anchor="middle" font-size="17" font-weight="700" fill="var(--ink)">${big}</text><text x="42" y="60" text-anchor="middle" font-size="9.5" fill="var(--sub)">${sub}</text></svg>`}

/* ======================= 공통 조각 ======================= */
function pauseBanner(){const p=S.pauses.find(p=>!p.end);if(!p)return'';const d=Math.floor((Date.now()-Date.parse(p.start))/DAY);return `<div class="banner warn"><b>멈춤 중</b><span class="sp">${d}일째 · ${esc(p.reason)}</span><button class="btn sm pri" data-act="resume">재개</button></div>`}
function monthNav(){const i=vi(),m=M(i);return `<div class="stepnav"><button class="ic" data-act="mv" data-d="-1" ${i<=0?'disabled':''}>${I.l}</button><div class="t">${esc(m.ym)} · ${esc(m.theme)}<small>${YEARS[Math.max(0,yearOf(i))].y} · ${i===S.cur?'진행 중':i<S.cur?'지난 테마':'예정'}</small></div><button class="ic" data-act="mv" data-d="1" ${i>=S.months.length-1?'disabled':''}>${I.r}</button></div>`}
const wide=()=>typeof innerWidth!=='undefined'&&innerWidth>=900;
function dayRow(m,k,mi){const it=m.items[k],pd=planDate(m,k),late=!it.done&&pd&&pd<today(),nx=mi===S.cur&&k===nextItem(m);return `<button class="day ${it.done?'done':''} ${late?'late':''} ${nx?'next':''} ${S.tab!=='home'&&wide()&&ui.sel&&ui.sel.m===mi&&ui.sel.k===k?'sel':''}" data-act="open" data-m="${mi}" data-k="${k}"><div class="n">Day<b>${k+1}</b></div><div class="b"><div>${esc(it.title)}</div><span>${pd?fmt(pd):''}${late?' · 밀림':''}${nx?' · 오늘':''}</span></div><div class="dot">${I.ck}</div></button>`}

/* ======================= 화면: 오늘 ======================= */
function dueReview(){for(let i=0;i<S.months.length;i++){const m=S.months[i];if(!m.passedAt)continue;const d=(P(today())-P(m.passedAt))/DAY,rv=m.rv||{};if(d>=28&&!rv.w4)return{i,w:'w4',n:'4주'};if(d>=7&&!rv.w1)return{i,w:'w1',n:'1주'}}return null}
const sinceBackup=()=>Math.floor((P(today())-P(S.lastBackup||S.created))/DAY);
function homeBanners(){let h='';const x=S.examDraft;
 if(x)h+=`<div class="banner info"><span class="sp"><b>풀던 시험</b> · ${esc(M(x.m).ym)} ${x.mode==='retry'?'오답 다시 풀기':x.mode==='spaced'?'복습 퀴즈':'수료 시험'} ${x.ans.filter(a=>a!=null).length}/${x.qs.length}</span><button class="btn sm pri" data-act="resumeexam">이어 풀기</button></div>`;
 const r=dueReview();if(r)h+=`<div class="banner info"><span class="sp"><b>복습할 과정</b> · ${esc(M(r.i).ym)} ${esc(M(r.i).theme)} (수료 ${r.n})</span><button class="btn sm pri" data-act="review" data-m="${r.i}" data-rv="${r.w}">복습</button></div>`;
 if(sinceBackup()>=90)h+=`<div class="banner warn"><span class="sp">마지막 백업 후 ${sinceBackup()}일 지났습니다.</span><button class="btn sm" data-act="tab" data-t="set">백업</button></div>`;
 return h}
function vHome(){
 const m=M(S.cur),n=m.items.length,dn=doneCnt(m),k=nextItem(m),late=lateCnt(m),b=best(m),yi=Math.max(0,yearOf(S.cur)),y=YEARS[yi];
 const passed=S.months.filter(x=>best(x)!=null&&best(x)>=80).length,scores=S.months.map(best).filter(x=>x!=null),avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null;
 let main='';
 if(!n)main=`<div class="card"><b>이달 커리큘럼이 아직 없습니다.</b><div class="muted" style="margin:6px 0 12px">AI가 테마에 맞춰 평일 20일 학습을 만듭니다.</div><button class="btn pri" data-act="gencur" data-m="${S.cur}">AI로 커리큘럼 만들기</button></div>`;
 else if(k>=0){const it=m.items[k];main=`<button class="today" data-act="open" data-m="${S.cur}" data-k="${k}"><div class="k">오늘의 학습 · Day ${k+1}/${n}${late?` · 밀린 학습 ${late}개`:''}</div><div class="t">${esc(it.title)}</div><div class="m">${it.summary.length}개 핵심 · 약 ${it.min}분${it.video?' · 영상':''}</div></button>`}
 else main=`<button class="today exam" data-act="tab" data-t="ex"><div class="k">${b==null?'20일 학습 완료':'수료 시험 결과 '+b+'점'}</div><div class="t">${b==null?'수료 시험 응시하기':b>=80?'다음 테마로 넘어가기':'재응시하기'}</div><div class="m">${m.bank?m.bank.length+'문항 · ':''}객관식 · 80점 이상 수료</div></button>`;
 const up=n?m.items.map((_,j)=>j).filter(j=>j!==k&&!m.items[j].done).slice(0,4):[];
 return `${pauseBanner()}${homeBanners()}
 <div class="card hero"><div class="row"><div class="sp"><span class="tag acc">${y.y} · ${y.t}</span><h2 style="margin:8px 0 2px">${esc(m.ym)} ${esc(m.theme)}</h2><div class="muted">${esc(m.goal)}</div></div>${ring(n?dn/n:0,dn+'/'+(n||20),'일차 완료')}</div>
 <div class="prog"><i style="width:${n?dn/n*100:0}%"></i></div><div class="muted">${m.anchor?`수료 시험 예정 ${fmt(examDate(m))}`:'시작일 미정'}${totalPause()>=1?` · 멈춤 누적 ${Math.round(totalPause())}일`:''}</div></div>
 ${main}
 <button class="btn wide" style="margin-bottom:14px" data-act="chat">AI 튜터에게 질문</button>
 ${up.length?`<h3 style="margin-top:4px">이어서 할 학습</h3>${up.map(j=>dayRow(m,j,S.cur)).join('')}`:''}
 <div class="grid3" style="margin-top:12px"><div class="stat"><b>${passed}/${S.months.length}</b><span>수료 테마</span></div><div class="stat"><b>${avg??'–'}</b><span>시험 평균</span></div><div class="stat"><b>${S.months.reduce((a,x)=>a+doneCnt(x),0)}</b><span>누적 학습일</span></div></div>
 <div class="card"><div class="row"><h3 class="sp" style="margin:0">${y.y} 마일스톤</h3><button class="btn sm ghost" data-act="tab" data-t="his">전체</button></div><ul class="pts" style="font-size:14px">${y.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`}

/* ======================= 화면: 과정 (커리큘럼 + 시험 + 요약·자료) ======================= */
function vCur(){const i=vi(),m=M(i),sec=ui.sec||'day';
 return `${pauseBanner()}${monthNav()}
 <div class="card"><div class="muted">이달 목표</div><div style="margin:4px 0 2px;font-weight:600">${esc(m.goal)}</div><div class="prog"><i style="width:${m.items.length?doneCnt(m)/m.items.length*100:0}%"></i></div><div class="muted">${doneCnt(m)}/${m.items.length}일 · ${best(m)!=null?'시험 최고 '+best(m)+'점':'시험 전'}</div></div>
 <div class="seg" style="margin-bottom:12px">${[['day','일별 학습'],['ex','시험·오답'],['ref','요약·자료']].map(([k,n])=>`<button class="${sec===k?'on':''}" data-act="sec" data-s="${k}">${n}</button>`).join('')}</div>
 ${sec==='ex'?examBlock(i):sec==='ref'?refBlock(i):wide()&&m.items.length?splitDay(i):dayBlock(i)}`}
function splitDay(i){const m=M(i);if(!ui.sel||ui.sel.m!==i||ui.sel.k>=m.items.length)ui.sel={m:i,k:Math.max(0,nextItem(m))};
 return `<div class="split"><div class="col-l">${dayBlock(i)}</div><div class="col-r"><div class="pane">${itemBody(i,ui.sel.k,true)}</div></div></div>`}
function pasteBox(i){return ui.pasteOpen?`<div class="card"><label style="margin-top:0">미션·커리큘럼 텍스트를 붙여넣으면 AI가 [${esc(M(i).ym)}] 일별 학습으로 정리합니다.</label><textarea id="pastebox" style="min-height:120px"></textarea><div class="btns" style="margin-top:8px"><button class="btn pri" data-act="pastego">정리하기</button><button class="btn ghost" data-act="paste">닫기</button></div></div>`:''}
function dayBlock(i){const m=M(i);
 if(!m.items.length)return `${pasteBox(i)}<div class="card empty">커리큘럼이 없습니다.<div class="btns" style="justify-content:center;margin-top:12px"><button class="btn pri" data-act="gencur" data-m="${i}">AI로 만들기</button><button class="btn" data-act="paste">붙여넣기로 가져오기</button></div></div>`;
 return `${m.items.map((_,k)=>dayRow(m,k,i)).join('')}
 <details class="fold" style="margin-top:12px"><summary>과정 편집</summary>${pasteBox(i)}<div class="btns"><button class="btn" data-act="additem" data-m="${i}">+ 학습 추가</button><button class="btn" data-act="gencur" data-m="${i}">AI로 다시 만들기</button><button class="btn" data-act="paste">붙여넣기</button>${i===S.months.length-1?'<button class="btn" data-act="addmonth">+ 다음 테마 추가</button>':''}</div></details>`}
const gs=(site,q)=>'https://www.google.com/search?q='+encodeURIComponent('site:'+site+' '+q);
function refBlock(i){const m=M(i),q=m.theme;
 return `${keyCard(i)||'<div class="card empty">커리큘럼을 만들면 핵심 요약을 정리할 수 있습니다.</div>'}
 <div class="card"><h3>교안·교육 찾기</h3><div class="muted">주제 · ${esc(q)}</div><div class="links">
 <a class="lk" href="${gs('kocw.net',q)}" target="_blank" rel="noopener"><i>文</i><span>KOCW 대학 강의·교안</span>↗</a>
 <a class="lk" href="${gs('kmooc.kr',q)}" target="_blank" rel="noopener"><i>文</i><span>K-MOOC 공개강좌</span>↗</a>
 <a class="lk" href="https://www.work24.go.kr" target="_blank" rel="noopener"><i>문</i><span>고용24 재직자 훈련과정 (사이트에서 검색)</span>↗</a>
 <a class="lk" href="${nv(q+' 교육과정')}" target="_blank" rel="noopener"><i class="nv">N</i><span>네이버 · ${esc(q)} 교육과정</span>↗</a></div>
 <div class="row" style="margin-top:12px"><span class="muted sp">교육을 들었다면 기록에 남겨 두세요.</span><button class="btn sm" data-act="addact">+ 기록</button></div></div>`}

/* ======================= 화면: 시험 ======================= */
function vExam(){
 if(ui.exam)return vTaking();
 if(ui.result)return vResult(ui.result);
 ui.sec='ex';return vCur()}
function examBlock(i){const m=M(i),done=doneCnt(m),n=m.items.length,ready=n&&done===n;
 return `${S.examDraft&&S.examDraft.m===i?`<div class="banner info"><span class="sp">풀던 시험 ${S.examDraft.ans.filter(a=>a!=null).length}/${S.examDraft.qs.length} — 이어서 풀 수 있습니다</span><button class="btn sm pri" data-act="resumeexam">이어 풀기</button></div>`:''}
 <div class="card"><h3>수료 시험</h3><div class="kv"><span>문항</span><span>${m.bank?m.bank.length+'문항 (준비됨)':'응시 시 AI가 25문항 생성'}</span></div><div class="kv"><span>범위</span><span>Day 1 ~ ${n||20}</span></div><div class="kv"><span>기준</span><span>80↑ 수료 · 60~79 보완 · 60↓ 재학습</span></div><div class="kv"><span>학습 진도</span><span>${done}/${n}</span></div>
 ${!ready&&n?`<div class="banner info" style="margin:12px 0 0">아직 ${n-done}일이 남았습니다. 먼저 응시해도 되지만 점수는 그대로 기록됩니다.</div>`:''}
 <div class="btns" style="margin-top:14px"><button class="btn pri" data-act="startexam" data-m="${i}" ${n?'':'disabled'}>${m.attempts.length?'재응시':'시험 시작'}</button>${m.bank&&m.attempts.length?`<button class="btn ghost" data-act="regen" data-m="${i}">새 문항으로 출제</button>`:''}</div></div>
 ${wrongCard(i)}
 ${m.attempts.length?`<div class="card"><h3>응시 기록</h3>${m.attempts.slice().reverse().map((a,j)=>{const v=verdict(a.score);return `<div class="kv"><span>${ymd(new Date(a.at))} · ${a.total}문항</span><span><b>${a.score}점</b> <span class="tag ${v.c}">${v.n}</span> <button class="btn sm ghost" data-act="showres" data-m="${i}" data-a="${m.attempts.length-1-j}">결과</button></span></div>`}).join('')}</div>`:''}`}
function vTaking(){const x=ui.exam,q=x.qs[x.i],m=M(x.m);
 return `<div class="row" style="margin-bottom:10px"><b class="sp">${esc(m.ym)} ${x.mode==='retry'?'오답 다시 풀기':x.mode==='spaced'?'복습 퀴즈':'수료 시험'}</b><button class="btn sm ghost" data-act="quitexam">중단</button></div>
 <div class="prog"><i style="width:${(x.i)/x.qs.length*100}%"></i></div>
 <div class="card"><div class="qn">${x.i+1} / ${x.qs.length} · Day ${q.d+1} ${esc((m.items[q.d]||{}).title||'')}</div><div class="qt">${esc(q.q)}</div>
 ${q.o.map((o,j)=>`<button class="opt ${x.ans[x.i]===j?'sel':''}" data-act="pick" data-j="${j}">${'①②③④'[j]} ${esc(o)}</button>`).join('')}</div>
 <div class="btns"><button class="btn" data-act="qprev" ${x.i===0?'disabled':''}>이전</button><span class="sp"></span>${x.i<x.qs.length-1?`<button class="btn pri" data-act="qnext" ${x.ans[x.i]==null?'disabled':''}>다음</button>`:`<button class="btn pri" data-act="submit" ${x.ans.filter(a=>a!=null).length<x.qs.length?'disabled':''}>제출 (${x.ans.filter(a=>a!=null).length}/${x.qs.length})</button>`}</div>`}
function vResult(r){const m=M(r.m),a=r.att||m.attempts[r.a],v=verdict(a.score);
 const per={};a.qs.forEach((q,j)=>{const p=per[q.d]||(per[q.d]={c:0,t:0});p.t++;if(a.ans[j]===q.a)p.c++});
 const days=Object.keys(per).map(Number).sort((x,y)=>x-y);const weak=days.filter(d=>per[d].c/per[d].t<.6);
 const wrong=a.qs.map((q,j)=>({q,j,my:a.ans[j]})).filter(w=>w.my!==w.q.a);
 return `<div class="row" style="margin-bottom:10px"><b class="sp">${esc(m.ym)} ${esc(m.theme)} · 결과</b><button class="btn sm ghost" data-act="closeres">닫기</button></div>
 <div class="card hero"><div class="row">${ring(a.score/100,a.score,'점',`var(--${v.c})`)}<div class="sp"><span class="tag ${v.c}">${r.att?(a.mode==='spaced'?'복습 퀴즈':'오답 다시 풀기'):v.n}</span><div style="margin-top:6px;font-weight:600">${a.total-wrong.length} / ${a.total} 정답</div><div class="muted">${ymd(new Date(a.at))} 응시</div></div></div></div>
 <div class="card"><h3>일차별 정답률</h3>${days.map(d=>{const p=per[d],pc=Math.round(p.c/p.t*100),col=pc>=80?'good':pc>=60?'warn':'bad';return `<div class="brow"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">D${d+1} ${esc((m.items[d]||{}).title||'')}</span><div class="bar"><i style="width:${pc}%;background:var(--${col})"></i></div><span style="text-align:right">${p.c}/${p.t}</span></div>`}).join('')}
 ${weak.length?`<div class="banner warn" style="margin:12px 0 0">다시 볼 일차: ${weak.map(d=>`<button class="tag warn" data-act="open" data-m="${r.m}" data-k="${d}">Day ${d+1}</button>`).join(' ')}</div>`:''}</div>
 <div class="btns" style="margin-bottom:12px">${r.att?`<button class="btn pri" data-act="retry" data-m="${r.m}" ${Object.keys(wrongSet(m)).length?'':'disabled'}>남은 오답 다시 풀기 (${Object.keys(wrongSet(m)).length})</button><button class="btn ghost" data-act="review" data-m="${r.m}">핵심 요약 복습</button>`:`${a.score>=80&&r.m===S.cur?`<button class="btn pri" data-act="nextmonth">다음 테마 시작</button>`:''}<button class="btn" data-act="aianal" data-m="${r.m}" data-a="${r.a}">AI 오답 분석</button><button class="btn ghost" data-act="review" data-m="${r.m}">핵심 요약 복습</button><button class="btn ghost" data-act="startexam" data-m="${r.m}">재응시</button>`}</div>
 ${a.analysis?`<div class="card"><h3>AI 오답 분석</h3><div style="font-size:14px">${md(a.analysis)}</div></div>`:''}
 <h3>틀린 문항 ${wrong.length}개</h3>
 ${wrong.length?wrong.map(w=>`<div class="wrong"><div class="qn">Day ${w.q.d+1} · ${w.j+1}번</div><p><b>${esc(w.q.q)}</b></p><p class="x">내 답 · ${'①②③④'[w.my]} ${esc(w.q.o[w.my])}</p><p class="o">정답 · ${'①②③④'[w.q.a]} ${esc(w.q.o[w.q.a])}</p><div class="e">${esc(w.q.e)}</div></div>`).join(''):'<div class="card empty">모두 맞혔습니다.</div>'}`}

/* ======================= 화면: 이력 ======================= */
function vHis(){
 const yrs=YEARS.map((y,yi)=>{const ms=S.months.map((m,i)=>({m,i})).filter(x=>yearOf(x.i)===yi),pass=ms.filter(x=>best(x.m)>=80).length,cur=yearOf(S.cur)===yi;return `<div class="yr ${cur?'cur':''}"><b>${y.y} · ${y.t}</b> <span class="muted">${y.p}</span>${ms.length?` <span class="tag ${cur?'acc':''}">수료 ${pass}/${ms.length}</span>`:''}<ul>${y.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`}).join('');
 const rows=S.months.map((m,i)=>{const b=best(m),v=b!=null?verdict(b):null;return `<button class="mrow" data-act="review" data-m="${i}" style="width:100%;text-align:left"><span class="l">${esc(m.ym)}</span><div class="c"><div style="font-weight:600;${i>S.cur?'color:var(--sub)':''}">${esc(m.theme)}</div><div class="muted">${doneCnt(m)}/${m.items.length||'–'}일${m.attempts.length?` · 응시 ${m.attempts.length}회`:''}</div></div>${v?`<span class="tag ${v.c}">${b}점</span>`:i===S.cur?'<span class="tag acc">진행</span>':''}</button>`}).join('');
 const acts=S.acts.slice().sort((a,b)=>a.d<b.d?1:-1).map(a=>`<div class="act"><span class="muted" style="flex:none;width:72px">${a.d.slice(2).replace(/-/g,'.')}</span><span class="tag" style="flex:none">${esc(a.t)}</span><div style="flex:1">${esc(a.title)}${a.memo?`<div class="muted">${esc(a.memo)}</div>`:''}</div><button class="muted" data-act="delact" data-id="${a.id}">✕</button></div>`).join('');
 return `<h2>마일스톤</h2><div class="card">${yrs}</div>
 <h2>월별 테마</h2><div class="muted" style="margin:-6px 0 10px">누르면 핵심 요약과 일별 학습을 다시 볼 수 있습니다.</div><div class="card">${rows}</div>
 <div class="row"><h2 class="sp">역량강화 활동</h2><button class="btn sm" data-act="addact">+ 기록</button></div>
 <div class="card">${acts||'<div class="empty">수료하면 자동으로 기록됩니다. 강의·기고·세미나·자격도 직접 남기세요.</div>'}</div>`}

/* ======================= 화면: AI ======================= */
function vChat(){const p=S.set.provider,names={claude:'Claude',openai:'GPT',gemini:'Gemini'};
 return `<button class="close" data-act="mclose">✕</button>${ui.prev?'<button class="back" data-act="back">← 학습으로 돌아가기</button>':''}<h2 style="margin-top:0">AI 튜터</h2>
 ${S.set.keys[p]?'':`<div class="banner info"><span class="sp">${names[p]} API 키가 없습니다.</span><button class="btn sm" data-act="tab" data-t="set">설정</button></div>`}
 <div class="chips">${['claude','openai','gemini'].map(k=>`<button class="chip ${k===p?'on':''}" data-act="prov" data-p="${k}">${names[k]}${S.set.keys[k]?'':' · 키 없음'}</button>`).join('')}</div>
 <div class="btns" style="margin-bottom:12px"><button class="btn sm" data-act="aiex">오늘 내용 쉽게 설명</button><button class="btn sm" data-act="aiq">오늘 내용 확인 질문 3개</button></div>
 <div class="chat">${S.chat.map((m,i)=>`<div class="msg ${m.r==='user'?'u':m.r==='err'?'e':'a'}">${md(m.c)}${m.r==='assistant'&&'speechSynthesis' in window?`<button class="say" data-act="speakmsg" data-i="${i}">${ui.speaking==='msg'+i?'■ 읽기 멈춤':'▶ 읽어주기'}</button>`:''}</div>`).join('')||'<div class="empty">학습 중 모르는 개념을 물어보세요.<br>현재 테마와 오늘 학습 내용을 함께 전달합니다.</div>'}${ui.busy?'<div class="msg a"><span class="dots"><i></i><i></i><i></i></span></div>':''}</div>
 <div class="composer"><textarea id="ask" placeholder="예: OPC UA 구독 방식을 RTDB 수집과 비교해줘"></textarea><button class="btn pri" data-act="send" ${ui.busy?'disabled':''}>보내기</button></div>
 ${S.chat.length?'<div style="text-align:right;margin-top:8px"><button class="btn sm ghost" data-act="chatclear">대화 지우기</button></div>':''}`}

/* ======================= 화면: 설정 ======================= */
const MODEL_DEFAULTS={claude:['claude-opus-5-5','claude-sonnet-5-5','claude-haiku-5-5','claude-fable-5-1'],openai:['gpt-6-astra','gpt-5.4-mini','gpt-5.4-nano'],gemini:['gemini-4-argon','gemini-3.8-flash','gemini-3.6-flash','gemini-3.5-flash-lite']};
const modelList=p=>{const l=(S.set.modelLists&&S.set.modelLists[p]&&S.set.modelLists[p].length)?S.set.modelLists[p]:MODEL_DEFAULTS[p];return l};
function aiFields(){const st=S.set,p=st.provider,name={claude:'Claude',openai:'GPT',gemini:'Gemini'}[p],key=st.keys[p]||'',cur=st.models[p]||'',list=modelList(p),custom=ui.customModel||(cur&&!list.includes(cur)),fetched=!!(st.modelLists&&st.modelLists[p]&&st.modelLists[p].length);
 return `<label>${name} API 키</label><input id="keyin" type="${ui.showKey?'text':'password'}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" data-bind="set.keys.${p}" value="${esc(key)}" placeholder="${name} API 키 붙여넣기">
 <div class="row" style="margin-top:8px;justify-content:space-between"><label class="chk"><input type="checkbox" data-act2="showkey" ${ui.showKey?'checked':''}> 키 보이기</label><span class="muted">${key?`입력됨 · 끝자리 ${esc(key.slice(-4))}`:'미입력'}</span></div>
 <label>${name} 모델</label><select data-act2="model">${list.map(m=>`<option value="${esc(m)}" ${m===cur&&!custom?'selected':''}>${esc(m)}</option>`).join('')}<option value="__custom" ${custom?'selected':''}>직접 입력…</option></select>
 ${custom?`<input style="margin-top:8px" data-bind="set.models.${p}" value="${esc(cur)}" placeholder="모델 ID 입력" autocapitalize="off" autocorrect="off" spellcheck="false">`:''}
 <div class="muted" style="margin-top:6px">${fetched?'이 키로 불러온 실제 사용 가능 목록입니다.':'기본 목록입니다. 키 입력 후 "모델 목록 불러오기"로 최신 목록을 받으세요.'}</div>
 <div class="btns" style="margin-top:12px"><button class="btn" data-act="loadmodels" ${key?'':'disabled'}>모델 목록 불러오기</button><button class="btn" data-act="test" ${key?'':'disabled'}>연결 테스트</button></div>`}
function vSet(){const st=S.set,PL=[['claude','Claude (Anthropic)'],['openai','GPT (OpenAI)'],['gemini','Gemini (Google)']],m=M(S.cur);
 return `<h2>설정</h2>
 <div class="card"><h3>AI 연결</h3><div class="muted">키는 이 기기 브라우저에만 저장되고 각 회사 API로만 전송됩니다.</div>
 <label>사용할 AI</label><div class="seg">${PL.map(([k,n])=>`<button class="${st.provider===k?'on':''}" data-act="prov" data-p="${k}">${n.split(' ')[0]}</button>`).join('')}</div>
 ${aiFields()}</div>
 <div class="card"><h3>화면</h3><div class="seg" style="margin-bottom:10px">${[['dark','어둡게'],['light','밝게']].map(([v,n])=>`<button class="${S.theme===v?'on':''}" data-act="themeset" data-v="${v}">${n}</button>`).join('')}</div><div class="muted" style="margin-bottom:6px">글자 크기</div><div class="seg">${[['1','보통'],['1.12','크게'],['1.25','아주 크게']].map(([v,n])=>`<button class="${String(S.fs||1)===v?'on':''}" data-act="fs" data-v="${v}">${n}</button>`).join('')}</div></div>
 <div class="card"><h3>학습 일정</h3><label style="margin-top:0">현재 테마(${esc(m.ym)}) Day 1 날짜</label><input type="date" data-act2="anchor" value="${esc(m.anchor||today())}"><div class="muted" style="margin-top:6px">평일 기준(주말·법정공휴일 제외)으로 일별 예정일과 시험일이 계산됩니다.</div><label>개인 휴무일 (연차·출장 등, YYYY-MM-DD 줄마다)</label><textarea data-bind="offdays" placeholder="2026-12-31">${esc(S.offdays||'')}</textarea></div>
 <div class="card"><h3>매일 학습 알림</h3><div class="muted">휴대폰 캘린더에 평일 반복 일정으로 등록합니다. 알림은 캘린더 앱이 보냅니다.</div><label>알림 시각</label><input type="time" data-bind="remind" value="${esc(S.remind||'07:00')}"><div class="btns eq" style="margin-top:12px"><button class="btn pri" data-act="remind">구글 캘린더 등록</button><button class="btn" data-act="remindics">캘린더 파일 받기</button></div><div class="muted" style="margin-top:6px">멈춤 기간에도 알림은 그대로 옵니다. 길게 쉴 땐 캘린더에서 일정을 지우세요.</div></div>
 <div class="card"><h3>멈춤 · 재개</h3><div class="muted" style="margin-bottom:10px">재개하면 멈춘 기간만큼 예정일이 뒤로 밀립니다. 진도는 그대로 유지됩니다.</div>
 ${isPaused()?'<button class="btn pri" data-act="resume">학습 재개</button>':'<button class="btn" data-act="pause">학습 멈춤</button>'}
 ${S.pauses.length?`<div style="margin-top:12px">${S.pauses.slice().reverse().map(p=>`<div class="kv"><span>${ymd(new Date(p.start)).slice(5)} ~ ${p.end?ymd(new Date(p.end)).slice(5):'진행 중'}</span><span class="muted">${esc(p.reason)}${p.memo?' · '+esc(p.memo):''}</span></div>`).join('')}</div>`:''}</div>
 ${vSync()}
 <div class="card"><h3>데이터</h3><div class="muted" style="margin-bottom:10px">기기 고장·초기화에 대비해 분기(90일)마다 백업을 권합니다 (API 키 제외).</div><div class="kv"><span>마지막 백업</span><span>${S.lastBackup?S.lastBackup+' ('+sinceBackup()+'일 전)':'없음'}</span></div><div class="kv" style="margin-bottom:10px"><span>저장소 보호</span><span>${ui.persist==null?'확인 중':ui.persist?'적용됨':'미적용 · 아이폰은 홈 화면에 추가해 사용'}</span></div>
 <div class="btns"><button class="btn" data-act="export">백업 내보내기</button><button class="btn" data-act="import">백업 가져오기</button><button class="btn danger" data-act="reset">초기화</button></div><input type="file" id="impf" accept="application/json" style="display:none"></div>`}

/* ======================= 모달 ======================= */
function itemBody(mi,k,pane){const md_={m:mi,k},m=M(mi),it=m.items[k],pd=planDate(m,k),n=m.items.length;
  const refs=it.links.slice().sort((a,b)=>/영문/.test(a.t||'')-/영문/.test(b.t||'')).map(l=>`<a class="lk" href="${esc(l.u)}" target="_blank" rel="noopener"><i>文</i><span>${esc(l.t||l.u)}</span>↗</a>`).join('')+(it.video?`<a class="lk" href="${yt(it.video)}" target="_blank" rel="noopener"><i class="yt">▶</i><span>영상 · ${esc(it.video)}</span>↗</a>`:'')+`<a class="lk" href="${nv(it.video||it.title)}" target="_blank" rel="noopener"><i class="nv">N</i><span>네이버 블로그·카페 · ${esc(it.video||it.title)}</span>↗</a><a class="lk" href="${gs('kocw.net',it.title)}" target="_blank" rel="noopener"><i>文</i><span>KOCW 대학 강의·교안</span>↗</a>`;
  return `${pane?'':'<button class="close" data-act="mclose">✕</button><button class="close" data-act="more" title="더보기">⋯</button>'}${!pane&&ui.prev?'<button class="back" data-act="back">← 돌아가기</button><br>':''}<div class="muted">${esc(m.ym)} · Day ${md_.k+1}/${n}${pd?' · '+fmt(pd):''}</div><h2 style="margin:4px 0 10px">${esc(it.title)}</h2>
  ${pane||ui.more?`<div class="btns eq" style="margin-bottom:10px"><button class="btn sm" data-act="edititem" data-m="${md_.m}" data-k="${md_.k}">편집</button><button class="btn sm" data-act="open" data-m="${md_.m}" data-k="${md_.k-1}" ${md_.k>0?'':'disabled'}>← 이전</button><button class="btn sm" data-act="open" data-m="${md_.m}" data-k="${md_.k+1}" ${md_.k<n-1?'':'disabled'}>다음 →</button></div>`:''}
  <div class="card" style="margin-bottom:10px"><h3>핵심 내용</h3><ul class="pts">${it.summary.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>${it.task?`<div class="task"><b>실습 · </b>${esc(it.task)}</div>`:''}</div>
  <details class="fold"><summary>자료 더 찾기 · 영상·문서·교안</summary><div class="links" style="margin-top:0">${refs}</div></details>
  <label>학습 메모</label><textarea data-bind="months.${md_.m}.items.${md_.k}.memo" placeholder="알게 된 것, 헷갈린 것">${esc(it.memo)}</textarea>
  <button class="btn wide ${it.done?'':'pri'}" style="margin-top:14px;padding:14px" data-act="done" data-m="${md_.m}" data-k="${md_.k}">${it.done?'완료 취소':'학습 완료'}</button>
  <div class="btns eq" style="margin-top:8px">${'speechSynthesis' in window?`<button class="btn" data-act="speak" data-m="${md_.m}" data-k="${md_.k}">${ui.speaking?'읽기 멈춤':'읽어주기'}</button>`:''}<button class="btn" data-act="askitem" data-m="${md_.m}" data-k="${md_.k}">AI에게 질문</button></div>
  <div class="muted" style="text-align:center;margin-top:10px">${wide()?'← → 키로 이전·다음 학습':'좌우로 밀어 이전·다음 학습'}</div>`}
function vModal(){const md_=ui.modal;if(!md_)return'';let b='';
 if(md_.t==='item')b=itemBody(md_.m,md_.k,false);

 if(md_.t==='chat')b=vChat();
 if(md_.t==='edit'){const it=md_.k!=null?M(md_.m).items[md_.k]:{title:'',summary:[],task:'',video:'',links:[],min:40};
  b=`<h2>${md_.k!=null?'학습 편집':'학습 추가'}</h2><label>제목</label><input id="e_t" value="${esc(it.title)}"><label>핵심 내용 (한 줄에 하나)</label><textarea id="e_s" style="min-height:110px">${esc(it.summary.join('\n'))}</textarea><label>실습 과제</label><input id="e_k" value="${esc(it.task)}"><label>영상 검색어</label><input id="e_v" value="${esc(it.video)}"><label>링크 (한 줄에 "이름 | 주소")</label><textarea id="e_l">${esc(it.links.map(l=>`${l.t} | ${l.u}`).join('\n'))}</textarea>
  <div class="btns" style="margin-top:16px"><button class="btn pri" data-act="saveitem">저장</button>${md_.k!=null?'<button class="btn danger" data-act="delitem">삭제</button>':''}<button class="btn ghost" data-act="mclose">취소</button></div>`}
 if(md_.t==='pause')b=`<h2>학습 멈춤</h2><div class="muted">진도는 그대로 두고, 재개 시 예정일만 뒤로 밀립니다.</div><label>사유</label><select id="pr">${PAUSE_R.map(r=>`<option>${r}</option>`).join('')}</select><label>메모</label><input id="pm" placeholder="예: 연말 전략회의, 12월 중순 재개"><div class="btns" style="margin-top:16px"><button class="btn pri" data-act="pausego">멈춤</button><button class="btn ghost" data-act="mclose">취소</button></div>`;
 if(md_.t==='act')b=`<h2>역량강화 활동 기록</h2><label>날짜</label><input type="date" id="a_d" value="${today()}"><label>유형</label><select id="a_t">${ACT_T.map(t=>`<option>${t}</option>`).join('')}</select><label>내용</label><input id="a_n" placeholder="예: 협회 세미나 참석 — 제조AI 도입 사례"><label>메모</label><input id="a_m"><div class="btns" style="margin-top:16px"><button class="btn pri" data-act="saveact">저장</button><button class="btn ghost" data-act="mclose">취소</button></div>`;
 if(md_.t==='month')b=`<h2>다음 테마 추가</h2><label>테마</label><input id="t_t" placeholder="예: 진동분석 자격 준비 1"><label>이달 목표 (한 문장)</label><input id="t_g"><div class="btns" style="margin-top:16px"><button class="btn pri" data-act="savemonth">추가</button><button class="btn ghost" data-act="mclose">취소</button></div>`;
 if(md_.t==='search')b=`<button class="close" data-act="mclose">✕</button><h2>검색</h2><input id="sq" placeholder="예: OPC UA, 샘플링, 내 메모 내용" value="${esc(ui.lastQ)}" autocomplete="off"><div id="sres" style="margin-top:12px">${searchHTML(ui.lastQ)}</div>`;
 if(md_.t==='review'){const m=M(md_.m),bs=best(m),v=bs!=null?verdict(bs):null;
  b=`<button class="close" data-act="mclose">✕</button><div class="muted">${esc(m.ym)} · ${m.items.length}일 과정${v?` · <span class="tag ${v.c}">${bs}점 ${v.n}</span>`:''}</div><h2 style="margin:4px 0 4px">${esc(m.theme)}</h2><div class="muted" style="margin-bottom:12px">${esc(m.goal)}</div>
  ${(m.bank||Object.keys(wrongSet(m)).length)?`<button class="btn pri wide" style="margin-bottom:12px" data-act="spaced" data-m="${md_.m}" data-rv="${md_.rv||''}">복습 퀴즈 5문항${md_.rv?' · 수료 '+(md_.rv==='w1'?'1주':'4주')+' 복습':''}</button>`:''}
  <div class="card"><h3>핵심 요약</h3>${m.key&&m.key.length?`<ol class="pts" style="font-size:14.5px">${m.key.map(k=>`<li>${esc(k)}</li>`).join('')}</ol>`:m.items.length?`<div class="muted" style="margin-bottom:10px">아직 핵심 요약이 없습니다.</div><button class="btn sm" data-act="genkey" data-m="${md_.m}">AI로 만들기</button>`:'<div class="muted">커리큘럼이 아직 없습니다.</div>'}</div>
  ${m.items.length?`<h3>일별 학습</h3>${m.items.map((_,k)=>dayRow(m,k,md_.m)).join('')}`:''}`}
 return `<div class="overlay ${md_.t==='chat'&&wide()?'side':''}" data-act="bg"><div class="sheet">${b}</div></div>`}
function keyCard(i){const m=M(i);
 if(m.key&&m.key.length)return `<details class="card"><summary>핵심 요약 · 복습용 (${m.key.length}) <span class="muted" style="font-weight:500">— 눌러서 펼치기</span></summary><ol class="pts" style="font-size:14px">${m.key.map(k=>`<li>${esc(k)}</li>`).join('')}</ol><div style="margin-top:10px"><button class="btn sm ghost" data-act="review" data-m="${i}">복습 화면으로</button></div></details>`;
 if(!m.items.length)return'';
 return `<div class="card"><div class="row"><div class="sp"><b>핵심 요약</b><div class="muted">이 과정에서 꼭 알아야 할 내용을 정리합니다.</div></div><button class="btn sm" data-act="genkey" data-m="${i}">AI로 만들기</button></div></div>`}
function snip(t,i,n){const a=Math.max(0,i-24),z=Math.min(t.length,i+n+40);return (a>0?'…':'')+esc(t.slice(a,i))+'<mark>'+esc(t.slice(i,i+n))+'</mark>'+esc(t.slice(i+n,z))+(z<t.length?'…':'')}
function searchHTML(q){q=(q||'').trim().toLowerCase();
 if(!q)return '<div class="empty">학습 제목, 핵심 내용, 실습 과제, 내 메모, 핵심 요약에서 찾습니다.</div>';
 const out=[],hit=t=>{t=String(t||'');const i=t.toLowerCase().indexOf(q);return i<0?null:snip(t,i,q.length)};
 S.months.forEach((m,mi)=>{
  (m.key||[]).forEach(k=>{const h=hit(k);if(h)out.push({h,head:`${m.ym} ${m.theme} · 핵심 요약`,lab:'',act:`data-act="review" data-m="${mi}"`})});
  m.items.forEach((it,k)=>{for(const[lab,t]of[['제목',it.title],...it.summary.map(x=>['핵심',x]),['실습',it.task],['내 메모',it.memo]]){const h=hit(t);if(h){out.push({h,head:`${m.ym} · Day ${k+1} ${it.title}`,lab,act:`data-act="open" data-m="${mi}" data-k="${k}"`,done:it.done});break}}})});
 if(!out.length)return '<div class="empty">찾는 내용이 없습니다.</div>';
 return `<div class="muted" style="margin-bottom:8px">${out.length}건</div>`+out.slice(0,60).map(r=>`<button class="day" ${r.act}><div class="b"><div>${esc(r.head)}</div><span>${r.lab?r.lab+' · ':''}${r.h}</span></div>${r.done?'<span class="tag acc">학습함</span>':''}</button>`).join('')}

/* ======================= 렌더 ======================= */
function md(s){let h=esc(s);h=h.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/(https?:\/\/[^\s<)]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/^#{1,4} (.+)$/gm,'<b>$1</b>').replace(/^[-*] /gm,'• ').replace(/\n/g,'<br>');return h}
function render(){
 const tabs=[['home','오늘',I.home],['cur','과정',I.cur],['his','기록',I.his]];
 const V={home:vHome,cur:vCur,ex:vExam,his:vHis,set:vSet}[S.tab]||vHome;
 const m=M(S.cur);
 const body=V(),wd=wide()&&(S.tab==='cur'||S.tab==='ex')&&!ui.exam&&!ui.result&&(ui.sec||'day')==='day';
 document.getElementById('app').className=ui.modal&&ui.modal.t==='chat'&&wide()?'chatside':'';
 document.getElementById('app').innerHTML=`<header><div class="wrap"><div class="logo">커리어 코치<small>${esc(m.ym)} · ${esc(m.theme)}</small></div><span class="sp"></span><button class="tbtn" data-act="search" title="검색">${I.srch}</button><button class="tbtn" data-act="tab" data-t="set" title="설정" style="${S.tab==='set'?'border-color:var(--acc)':''}">${I.gear}</button></div></header>
 <main class="wrap ${wd?'wd':''}">${body}</main>
 <nav><div class="wrap">${tabs.map(([k,n,ic])=>`<button class="${S.tab===k||(k==='cur'&&S.tab==='ex')?'on':''}" data-act="tab" data-t="${k}">${ic}${n}</button>`).join('')}</div></nav>${vModal()}`;
 if(ui.modal&&ui.modal.t==='search'){const q=document.getElementById('sq');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length)}}
 if(ui.modal&&ui.modal.t==='chat'){const sh=document.querySelector('.sheet');if(sh)sh.scrollTop=sh.scrollHeight}
 document.documentElement.style.setProperty('--z',S.fs||1);addMics();syncHist();
}
function softRender(){const a=typeof document!=='undefined'&&document.activeElement;if(a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA')&&a.type!=='checkbox'){ui.pendingRender=true;return}render()}
if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('focusout',()=>setTimeout(()=>{if(!ui.pendingRender)return;const a=document.activeElement;if(a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'))return;ui.pendingRender=false;render()},60));
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2600)}
function setPath(path,val){const ks=path.split('.');let o=S;for(let i=0;i<ks.length-1;i++){if(o[ks[i]]==null)o[ks[i]]={};o=o[ks[i]]}o[ks.at(-1)]=val}
