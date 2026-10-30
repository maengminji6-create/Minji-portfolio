# 맹민지 포트폴리오

QR로 들어오는 취업용 포트폴리오 사이트. 빌드 없는 정적 사이트(HTML/CSS/JS)로 Vercel 무료 플랜에 배포한다.

- 첫 화면: 표지 + **AX 프로젝트 폴더 2개**(누르면 상세 페이지로 이동) + Inside the Archive(목차·인보이스) + 연락처
- 상세 페이지: `project.html?id=cosmoa` 처럼 하나의 파일이 data.js를 읽어 프로젝트별로 그려짐
- 검색엔진 노출 차단: `<meta name="robots">` + `vercel.json`의 `X-Robots-Tag`

## 문서
| 문서 | 내용 |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | 파일 구조, 데이터 흐름, 페이지 라우팅, 3차 추가 방법 |
| [docs/DESIGN.md](docs/DESIGN.md) | 화이트 톤 디자인 규칙, 색·글꼴, 화면 구성 와이어프레임 |
| [docs/CONTENT.md](docs/CONTENT.md) | 프로젝트별로 넣을 이미지 체크리스트와 파일명 규칙 |

## 가상환경 (도구용)
사이트 자체는 빌드가 없고, 파이썬은 이미지 변환·QR·로컬 서버에만 씁니다.
```
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
```

## 로컬 미리보기
```
.venv\Scripts\python -m http.server 5500
```
→ http://localhost:5500 (VS Code **Live Server** 확장도 가능)

## 이미지 넣기
원본은 그대로 두고 복사·축소(가로 1600px 이하, WebP)해서 넣습니다. 파일명은 docs/CONTENT.md 표를 따르면 data.js 수정 없이 바로 보입니다.
```
.venv\Scripts\python tools/prepare-images.py C:\캡처\home.png images/cosmoa/features/home.webp
```

## 배포 (Vercel)
1. GitHub Desktop으로 이 폴더를 새 저장소로 publish
2. vercel.com → Add New → Project → 저장소 선택 → Framework Preset: **Other** → Deploy
3. 이후 push할 때마다 자동 배포

## QR
```
.venv\Scripts\python tools/make-qr.py https://내주소.vercel.app
```
