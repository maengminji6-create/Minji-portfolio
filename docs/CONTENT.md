# 콘텐츠 체크리스트

## 파일명 규칙
- 영문 소문자 + 하이픈, 공백·한글 금지: `margin-quote.webp` (O) / `원가 화면 1.png` (X)
- 가로 1600px 이하로 줄이기, 가능하면 WebP
- 캡처는 브라우저 창을 **1440×900** 정도로 맞추고, 데모 데이터가 채워진 상태에서

## 1차 · COSMOA (`images/cosmoa/`)
기존 자료 위치: `문서/GitHub/COSTD/src/common/img/`

| 폴더 | 파일명 | 내용 | 출처 |
|---|---|---|---|
| cover | `cover.webp` | 세로로 긴 대표 이미지 (홈 화면 캡처를 세로로 자르거나 로고+화면 조합) | 캡처 |
| cover | `logo.png` | COSMOA 로고 | 기존 `costd_logo.png` |
| steps | `problem.webp` | 문제: 개발요청서 원본/번역 전 상태 등 | 캡처 |
| steps | `action.webp` | 한 일: 현직자 인터뷰 정리, 기능 설계 문서 등 | 캡처/사진 |
| features | `home.webp` | 홈 (환율·수출입 통계·바이어 현지 시각·뉴스) | 캡처 |
| features | `regulatory.webp` | 국가별 인허가 규제 | 캡처 |
| features | `margin.webp` | 원가·마진 시뮬레이션 | 캡처 |
| features | `ai-formulation.webp` | ★ 본인 담당: AI 제형·샘플 시뮬레이션 | 캡처 |
| features | `dev-request.webp` | 개발요청서 생성·변환 | 캡처 |
| features | `chatbot.webp` | AI 챗봇 위젯 | 캡처 |
| gallery | `login.webp` | 로그인 화면 | 캡처 |
| gallery | `ai-formulation-2.webp` … | 본인 담당 탭 추가 화면 2~3장 | 캡처 |
| gallery | `presentation.jpg` | 발표·시상 사진 | 사진 |
| gallery | `award.jpg` | 1등 수상 증빙 | 사진 |

## 2차 · 한정선 베트남 (`images/hanjeongseon/`)
기존 자료 위치: `문서/GitHub/Hanjeongseon/` (원본은 수정하지 말고 **복사**해서 사용)

| 폴더 | 파일명 | 내용 | 출처 |
|---|---|---|---|
| cover | `cover.webp` | 세로 대표 이미지 (포스터 추천) | `content_studio/static/images/sns/works/poster_*.png` |
| cover | `logo.png` | 한정선 로고 | `platform_core/static/images/hanjungsun_logo_stack.png` |
| steps | `problem.webp` | 문제: 다낭 시장 분석 화면 | 캡처 |
| steps | `action.webp` | 한 일: 콘텐츠 스튜디오/브랜드 사이트 | 캡처 |
| features | `home.webp` | HOME (오늘 할 일, 캠페인 현황) | 캡처 |
| features | `market.webp` | 현지 시장 분석 | 캡처 |
| features | `content-studio.webp` | 콘텐츠 스튜디오 | 캡처 |
| features | `influencer.webp` | 인플루언서 마케팅 | 캡처 |
| features | `kpi.webp` | ★ 본인 담당: KPI(마케팅 성과) | 캡처 |
| gallery | `poster-tet.webp` 외 | 팀 제작 포스터 3종 | `content_studio/static/images/sns/works/poster_*.png` |
| gallery | `video-cut-*.webp` | 홍보영상 컷 | `.../works/video_*_cut*.jpg` |
| gallery | `product-*.webp` | 제품 사진 | `content_studio/static/images/sns/product_*.jpg` |
| gallery | `brand-site.webp` | 베트남 브랜드 웹사이트 | hanjeongsun-vietnam.vercel.app 캡처 |
| gallery | `presentation.jpg` | 10/28 최종 발표 사진 | 사진 |

> `market_analysis/static/images/competitors/`의 경쟁사 제품 사진은 다른 회사 이미지라서 포트폴리오에 쓰지 않는다.
> 팀 공동 결과물(포스터·영상)은 포트폴리오에 써도 되는지 팀원들에게 한 번 공유하기.

## 공통 (`images/common/`)
| 파일명 | 내용 |
|---|---|
| `og.jpg` | 카카오톡 링크 미리보기 이미지 (1200×630) |
| `resume.pdf` | 이력서 (넣으면 data.js의 `resume`에 경로 적기) |

## 확인할 내용
- [ ] COSMOA, 한정선 대시보드의 배포 주소 (data.js `links.live`)
- [ ] 회사 업무(무역 실무, 설문 결과 분석) 공개 여부
- [ ] 경험 항목들의 기간
