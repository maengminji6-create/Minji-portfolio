# AI 작업 규칙 (Claude Code / Codex / Copilot 공통)

작업 전에 반드시 읽을 것: docs/ARCHITECTURE.md → docs/DESIGN.md → docs/CONTENT.md

- 프레임워크·빌드 도구를 추가하지 않는다. 순수 HTML/CSS/JS만 사용한다.
- 이 사이트에는 AX 프로젝트 내용만 넣는다. 경력·학력·자격 등은 넣지 않는다.
- 내용(문구, 이미지 경로, 링크)은 js/data.js에만 둔다. HTML·JS에 내용을 하드코딩하지 않는다.
- 공통 UI 부품(줄무늬 폴더, 칩, 버튼, 섹션 머리, 명세 목록)은 js/components.js 함수 + css/base.css 클래스로만 만든다.
- 배경은 흰색 계열을 유지한다. 어두운 배경·짙은 색 면적을 만들지 않는다 (docs/DESIGN.md).
- 모바일(390px) 기준으로 먼저 만들고, 가로 스크롤이 생기지 않게 한다.
- 전화번호·주소 등 민감한 개인정보는 넣지 않는다.
- noindex 설정(index.html, project.html의 robots 메타, vercel.json)을 지우지 않는다.
