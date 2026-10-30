# 아키텍처

## 1. 원칙
- **AX 프로젝트만 담는다**: 경력·학력·자격 등 프로젝트 밖 내용은 넣지 않음
- **정적 사이트**: 서버·DB·빌드 없음 → Vercel 무료 플랜에서 잠들지 않음
- **내용과 화면 분리**: 모든 내용은 `js/data.js` 한 곳. 화면 코드는 data를 읽어서 그리기만 함
- **페이지 2개로 프로젝트 N개 처리**: `index.html`(홈) + `project.html`(상세 템플릿 1개)
- **공개 + 검색 차단**: 주소를 아는 사람은 열 수 있고, 검색엔진에는 안 뜸

## 2. 폴더 구조
```
portfolio/
├─ index.html              홈: 표지 → 폴더 2개 → Inside the Archive(목차 + 인보이스) → 연락처
├─ project.html            상세 템플릿: ?id= 값에 따라 프로젝트를 그림
│
├─ css/
│  ├─ base.css             색·글꼴 변수, 공통 부품(줄무늬 폴더·칩·버튼·섹션 머리·명세 목록)
│  ├─ home.css             홈 전용 (파일 창 표지, 소개, 프로젝트 목록, 연락처)
│  └─ project.css          상세 전용 (커버, 개요·흐름, 내 담당, 기능 카드, 결과물)
│
├─ js/
│  ├─ data.js              ★ 내용 전부 (프로필, 프로젝트, 경험, 자격)
│  ├─ components.js        공통 부품을 HTML 문자열로 만드는 함수들
│  ├─ home.js              data → 홈 화면 렌더링
│  └─ project.js           URL의 id 읽기 → 해당 프로젝트 렌더링
│
├─ images/
│  ├─ common/              표지·프로필용 공통 이미지
│  ├─ cosmoa/              1차 프로젝트
│  │  ├─ cover/            폴더 미리보기·상세 상단 대표 이미지 (세로로 긴 이미지 1장)
│  │  ├─ steps/            (현재 사용 안 함)
│  │  ├─ features/         탭별 기능 카드에 들어가는 화면 (탭 수만큼)
│  │  └─ gallery/          그 외 자료 전부 (화면 캡처, 발표 사진, 포스터 등)
│  └─ hanjeongseon/        2차 프로젝트 (구조 동일)
│
├─ docs/                   설계 문서 (이 파일, DESIGN.md, CONTENT.md)
├─ tools/make-qr.py        QR 코드 생성
├─ tools/prepare-images.py 원본 이미지를 1600px 이하 WebP로 복사·변환
├─ requirements.txt        도구용 파이썬 패키지 (.venv에 설치, 사이트와 무관)
├─ vercel.json             검색 차단 헤더
├─ CLAUDE.md               AI 코딩 도구용 작업 규칙
└─ README.md
```

## 3. 페이지 흐름
```
QR 스캔
  ↓
index.html
  ├─ 표지: 파일 창 (이름, 한 줄 소개, 버튼, 줄무늬 폴더)
  ├─ 폴더 2개 ──── 클릭 ──→ project.html?id=cosmoa
  │                        project.html?id=hanjeongseon
  ├─ 01 소개 + 숫자 요약 / 02 프로젝트 목록
  └─ 연락처

project.html?id=cosmoa
  ├─ 상단 고정 바: ← 서류철 + 섹션 바로가기(개요·흐름·기능·결과물)
  ├─ 1. 커버 (대표 이미지 + 프로젝트명 + 한 줄 설명)
  ├─ 2. 01 개요: 소개 글 + 명세 목록 + 문제 → 접근 → 결과 카드
  ├─ 3. 02 내가 맡은 부분: 요약 + 구현 목록 + 계산식
  ├─ 4. 03 기능 카드 (탭별 화면 + 기능 목록) + 기술 스택
  ├─ 5. 04 결과물 (이미지 그리드, 누르면 크게 보기)
  ├─ 6. 링크 버튼 (서비스 열기 / 코드 보기 / 브랜드 사이트)
  └─ 하단: 다음 프로젝트 폴더
```

## 4. 데이터 구조 (`js/data.js`)
```js
window.PORTFOLIO = {
  profile:  { name, nameEn, fileName, headline, intro, email, github, resume, stats: [{ value, label }] },
  projects: [ { id, order, tab, fileName, title, subtitle, persona, cover, hero, logo, spec, flow, solutions, timeline, mine, features, stack, gallery, links }, ... ],
}
```
| 필드 | 쓰이는 곳 |
|---|---|
| `id` | URL (`project.html?id=값`), 영문 소문자 |
| `tab` | 상세 페이지 칩 |
| `fileName` | 폴더 아래 파일 이름 라벨 (예: `01_cosmoa`) |
| `cover` | 폴더 속 종이 이미지, 홈 목록 썸네일, 상세 상단 |
| `logo` | 상세 상단 오른쪽 작은 로고 (없으면 생략) |
| `spec` | 명세 목록 행 [[항목, 값], ...] |
| `persona` | 마인드맵 '누구를 위해' 가지 |
| `theme`, `sticker` | (선택) 프로젝트 테마(`beauty`)와 제목 옆 손글씨 스티커 — docs/DESIGN.md 6-1장 |
| `flow` | 문제 → 접근 → 결과 카드 (label, title, points[]). 마인드맵의 '문제'·'결과' 가지에도 쓰임 |
| `hero` | (선택) 상세 상단에 브라우저 창 틀로 보여줄 실제 화면 캡처. 없으면 cover |
| `solutions` | (선택) 실무 과제 → 서비스의 대응 [[과제, 대응, (이전 방식)], ...]. 표 머리는 `solutionsHead`로 바꿀 수 있음 |
| `timeline` | (선택) 진행 과정 [[날짜, 내용], ...] — 있으면 '진행 과정' 섹션이 생김 |
| `mine` | 내가 맡은 부분 (title, image 담당 화면, summary, lead[] 팀장으로서, points[], formulas[], note 출처·주의 문구) |
| `stack` | 기술 스택 칩 |
| `features` | 기능 카드 (name, image, caption, more[{image, caption}], desc 한 줄, items 칩, details 기능 목록, mine). 누르면 큰 화면(여러 장이면 탭 전환) + 설명 창 |
| `gallery` | 결과물 묶음 [{ title, note, ratio 썸네일 비율, cols PC 열 수, embed 사이트 주소(창 틀 안에 바로 띄움), items: [{ image, caption, note, video(mp4, image는 포스터) }] }] |
| `links` | 버튼 (live / github / site), 빈 값이면 숨김 |

## 5. 렌더링 규칙
- `components.js`: `folder(project)`, `chip(text, variant)`, `button(label, href)`, `sectionHead(no, title, en)`, `specList(rows)`, `img(src, alt)` 같은 순수 함수. HTML 문자열을 돌려줌
- `home.js` / `project.js`: data를 읽고 components 함수로 조립해서 `innerHTML`에 넣음
- 모든 텍스트는 `esc()`로 이스케이프
- `project.js`: `new URLSearchParams(location.search).get("id")`로 찾고, 없으면 홈으로 돌려보냄
- 이미지 경로가 비어 있거나 파일이 없으면(404) "캡처 넣을 자리" + 파일 이름 자리표시를 보여줌 (배포 전에 모두 채우기)
- 이미지는 `loading="lazy"`, 가로 1600px 이하로 줄여서 넣기

## 6. 스크립트 로드 순서
```html
<script src="js/data.js"></script>
<script src="js/components.js"></script>
<script src="js/home.js"></script>   <!-- project.html에서는 project.js -->
```

## 7. 3차 프로젝트 추가하는 법
1. `images/` 아래에 새 폴더(예: `images/third/`)를 cosmoa와 같은 구조로 만들기
2. `data.js`의 `projects` 배열에 항목 하나 추가 (`id`, `order: 3`, `tab: "3차 프로젝트"` ...)
3. push → 홈에 폴더가 3개로 늘어나고, `project.html?id=새id` 페이지가 자동으로 생김
   - 폴더 탭 위치는 개수에 맞춰 자동 배치되도록 home.css에서 `--i`(순번), `--n`(개수) 변수로 계산

## 8. 배포
GitHub 저장소 → Vercel Import (Framework Preset: Other). 빌드 명령 없음, 출력 폴더는 루트.
