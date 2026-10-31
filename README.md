# 커리어 코치

제조·유틸리티 Physical AI 도입 설계자 준비용 개인 학습 앱 (PWA, GitHub Pages 배포).

## 폴더 구조

```
index.html        화면 틀과 파일 로드 순서만 담당
css/style.css     전체 스타일 (색상 변수, 폰·PC 반응형)
js/config.js      저장 키, Firebase 웹 앱 설정
js/content.js     학습 콘텐츠 — 연차 목표, 월별 테마, 11월 커리큘럼·문항·핵심 요약
js/util.js        상태 기본값, 날짜·공휴일, 진도 계산
js/views.js       화면 (오늘·과정·기록·설정, 학습 창, 렌더)
js/ai.js          AI 호출 (Claude·GPT·Gemini), 커리큘럼·문항·요약 생성
js/voice.js       음성 입력·읽어주기, 뒤로가기 처리
js/sync.js        Firebase 클라우드 동기화
js/actions.js     버튼·입력·키보드·터치 동작
js/main.js        시작 — 저장 데이터 불러오기 후 첫 화면 표시 (반드시 마지막)
sw.js             서비스 워커 (네트워크 우선, 오프라인 시 캐시)
manifest.json     홈 화면 앱 설정 (기존 파일 사용)
icon-192.png      앱 아이콘 (기존 파일 사용)
```

## 수정 기준

| 고칠 내용 | 파일 |
|---|---|
| 학습 내용·문항·월별 테마 | `js/content.js` |
| 공휴일 목록 | `js/util.js` 의 `HOLI` |
| 화면 배치·문구 | `js/views.js` |
| 버튼 동작 | `js/actions.js` |
| AI 지시문·모델 | `js/ai.js`, `js/views.js` 의 `MODEL_DEFAULTS` |
| 색상·글자 크기 | `css/style.css` |

- JS 파일들은 하나의 전역 공간을 공유한다. `index.html` 의 로드 순서를 바꾸지 않는다.
- `js/` 에 파일을 추가하면 `index.html` 과 `sw.js` 의 `SHELL` 목록에 같이 넣고 `VERSION` 을 올린다.

## 배포 전 확인

- Firestore 규칙: `users/{uid}/career/{doc}` 은 본인(`request.auth.uid == uid`)만 읽기·쓰기
- Firebase Authentication 승인된 도메인에 `woosuly.github.io` 포함
- AI API 키는 코드에 넣지 않는다 (각 기기 브라우저에만 저장)

## 데이터

- 기기 저장: `localStorage` 의 `career-coach-v2`
- 동기화: 학습 기록·시험·이력 (API 키, 화면 모드, 글자 크기는 기기별)
- 백업: 설정 → 백업 내보내기 (분기마다 권장)
