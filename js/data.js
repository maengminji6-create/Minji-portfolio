/* ============================================================
   포트폴리오 내용은 이 파일에만 둔다. (docs/ARCHITECTURE.md 4장)
   - 이미지 경로가 "" 이거나 파일이 없으면 화면에 "캡처 넣을 자리"가 표시됨
   - 링크가 "" 이면 버튼이 숨겨짐
   - 3차 프로젝트: projects 배열 끝에 같은 모양으로 추가
   - 이 사이트는 AX 프로젝트만 담는다 (경력·자격 등은 넣지 않음)
   - "키워드 — 설명" 형식의 문장은 화면에서 키워드가 굵게 표시됨
   ============================================================ */

window.PORTFOLIO = {
  profile: {
    name: "맹민지",
    nameEn: "Maeng Minji",
    fileName: "maeng_minji.ax_files",
    headline: "현장의 번거로운 업무를 찾아내고, AI로 직접 도구를 만든 AX 프로젝트 기록",
    // 소개: 문단 배열. 아래에 프로젝트별 한 줄(내 역할)이 자동으로 붙음
    intro: [
      "현장에서 반복되는 번거로운 일을 찾아내고, 그 일을 덜어 줄 도구를 AI로 직접 기획하고 만드는 맹민지입니다.",
      "KITA AX마스터 2기에서 두 번의 팀 프로젝트를 모두 팀장으로 이끌었습니다. 매번 실제 직무 담당자 한 사람의 하루를 따라가며 문제를 찾고, 기능 명세를 먼저 쓴 뒤 AI 코딩 도구로 개발해 배포까지 마쳤습니다.",
    ],
    email: "maengminji6@gmail.com",
    github: "https://github.com/kimminniegu",
    resume: "", // "images/common/resume.pdf"
    stats: [
      { value: "2", label: "AX 프로젝트" },
      { value: "11", label: "대시보드 기능 탭" },
      { value: "2회", label: "팀장" },
      { value: "1등", label: "1차 프로젝트" },
    ],
  },

  projects: [
    {
      id: "cosmoa",
      order: 1,
      tab: "1차 프로젝트",
      fileName: "01_cosmoa",
      title: "COSMOA",
      theme: "beauty", // 화장품 주제: 영수증·링 노트·폴라로이드·손글씨 (docs/DESIGN.md 6-1장)
      sticker: "1등!", // 테마 프로젝트: 제목 옆 손글씨 스티커
      subtitle: "화장품 ODM 해외영업 담당자를 위한 통합 업무지원 대시보드",
      persona: "화장품 ODM 해외영업 담당자",
      cover: "images/cosmoa/cover/cover.webp",
      hero: "images/cosmoa/features/home.webp", // 상세 상단: 실제 대시보드 화면 (없으면 cover)
      logo: "images/cosmoa/cover/logo.png",
      spec: [
        ["과정", "KITA AX마스터 2기 1차"],
        ["기간", "2026.09.17 – 09.29"],
        ["팀", "COSTD · 4조 (5인)"],
        ["역할", "팀장 · 발표자"],
        ["담당", "AI 제형·샘플 시뮬레이션"],
        ["배포", "Render (메인 + 챗봇 서버)"],
        ["결과", "1차 프로젝트 1등"],
      ],
      // 문제 → 접근 → 결과 (짧은 문장으로)
      flow: [
        {
          label: "문제", title: "흩어진 정보, 반복되는 수작업", hand: "매번 손으로 다시…",
          points: [
            "인디 뷰티 해외 진출 증가 → ODM 개발 제안 업무 증가",
            "환율·수출입 통계·규제를 여러 사이트에서 따로 확인",
            "바이어마다 다른 요청 문서를 매번 다시 작성",
            "성분·가격 검토와 제형 설명을 손으로 반복",
          ],
        },
        {
          label: "접근", title: "현직자 미팅 → 업무 순서대로 설계", hand: "현직자에게 직접 물어봤어요",
          points: [
            "화장품 ODM 해외영업 현직자 미팅으로 실제 업무 흐름 파악",
            "정보 확인 → 사전검토·견적 → 바이어 상담·문서 정리 순서로 탭 분리",
            "탭별 기능 명세(MD) → Claude·Codex 개발 → GitHub PR 통합",
            "공공데이터 · 원료정보 31,191건 · OpenAI를 한 화면에 연결",
          ],
        },
        {
          label: "결과", title: "로그인부터 챗봇까지 연결된 대시보드", hand: "1차 프로젝트 1등!",
          points: [
            "업무 탭 5개 + 모든 화면 공통 AI 챗봇",
            "메인·챗봇 서버를 Render에 배포해 실시간 시연",
            "1차 프로젝트 1등",
          ],
        },
      ],
      // 실무 과제 → 서비스의 대응 (프로젝트 계획서)
      solutions: [
        ["분산된 정보 확인", "환율·수출입 통계·뉴스·규제 소식을 홈에서 함께 조회"],
        ["문서 재작성과 요구사항 재확인", "바이어 문서를 표준 개발요청서로 정리하고 사용자가 검토·수정"],
        ["반복적인 성분·가격 검토", "성분 규제 일괄 조회와 원가·환율·목표가별 견적 비교"],
        ["제품 콘셉트 전달의 어려움", "제형 시각화와 용기 선택 참고 정보로 바이어 협의 지원"],
      ],
      // 진행 과정 (프로젝트 계획서 마일스톤)
      timeline: [
        ["09.17", "주제·산업군 선정"],
        ["09.18", "현직자 미팅, 세부 주제 결정"],
        ["09.21", "구성요소·담당 확정, MD 명세·파일 구조 결정"],
        ["09.22", "기능 명세 완료, 메인 화면 개발 시작"],
        ["09.23 – 24", "통합 검토, 발표자료·시연영상 준비"],
        ["09.26 – 28", "기능 보완, 최종 제출, 모의 발표"],
        ["09.29", "최종 발표·시연"],
      ],
      mine: {
        title: "AI 제형·샘플 시뮬레이션",
        image: "images/cosmoa/features/ai-formulation.webp",
        // 테마 프로젝트: 폴라로이드 + 손글씨 메모
        notes: [
          { image: "images/cosmoa/features/ai-formulation.webp", label: "배합 조절", note: "슬라이더만 움직이면 점도·용기 점수가 바로 바뀌어요" },
          { image: "images/cosmoa/gallery/ai-formulation-2.webp", label: "용기 판정", note: "크림 + 스포이드 = 부적합! 대체 용기까지 추천" },
        ],
        summary:
          "바이어가 고농도 원료를 요구할 때 생기는 제형 문제를 영업 현장에서 바로 보여주고, 용기와 처방 대안까지 제안하는 시연 도구입니다.",
        lead: [
          "발표자 — 발표자료 제작과 최종 발표",
          "회의록 — 매 회의 기록과 결정 사항 정리 전담",
          "노션 — 팀 노션 페이지 구성과 관리 전담",
          "일정 — 마일스톤 설정과 진행 점검",
        ],
        points: [
          "배합 조절 — 슬라이더를 움직이면 정제수가 자동 역산돼 총합 100.0% 유지",
          "점도 예측 — 점탄성 계산식으로 예상 점도(cPs)와 유동성 지수를 실시간 계산",
          "용기 판정 — 6종 용기의 적합/주의/부적합과 0~100점 호환도",
          "시각화 — 비타민 C·오일 충돌과 캡슐화 안정화를 Canvas 액적·상분리로 재현",
          "영업 지원 — 상황별 바이어 피칭 스크립트 원클릭 복사",
          "AI 연동 — 개발요청서를 OpenAI로 분석해 배합값에 바로 적용",
        ],
        formulas: [
          "정제수(%) = 100 − (유효성분 + 점증제 + 오일 + 보습제)",
          "유동성 지수 = 100 ÷ (1 + 점도 ÷ 6,500)",
        ],
      },
      // 순서: 대시보드 사이드 메뉴와 같게 (홈 → 원가·마진 → 개발요청서 → 규제 → AI 제형 → 챗봇)
      features: [
        {
          name: "홈", image: "images/cosmoa/features/home.webp",
          desc: "해외영업에 필요한 시장 정보를 한 화면에서 확인",
          items: ["환율·수출입 통계", "수출 상위국·품목 비교", "뉴스·규제 소식"],
          details: [
            "환율 — 주요 통화 고시 환율과 등락",
            "수출입 통계 — 화장품 수출·수입액, 무역수지, 전년 동기 대비",
            "수출 비교 — 수출 상위국, 품목별 수출",
            "바이어 현지 시각 — 거래국 시간 한눈에",
            "뉴스·규제 소식 — 최신 업계 소식과 규제 업데이트",
          ],
        },
        {
          name: "원가·마진", image: "images/cosmoa/features/margin.webp",
          desc: "원가와 바이어 목표가로 견적을 계산·비교",
          items: ["단가 계산", "목표가 4단계 검토", "견적서 PDF"],
          details: [
            "단가 계산 — 원가·목표 마진·환율 반영",
            "목표가 검토 — 바이어 목표가 4단계 판정과 승인 가이드",
            "대안 비교 — 수량별 단가, 환율 영향",
            "출력 — 견적서 PDF, 영문 메일 초안",
          ],
        },
        {
          name: "개발요청서", image: "images/cosmoa/features/dev-request.webp", caption: "파일 자동변환",
          desc: "바이어 문서를 표준 개발요청서로 만들고 PDF로 출력",
          items: ["파일 자동변환", "직접 작성", "PDF 출력"],
          more: [
            { image: "images/cosmoa/features/dev-request-manual.webp", caption: "직접 작성" },
            { image: "images/cosmoa/features/dev-request-pdf.webp", caption: "PDF 출력" },
          ],
          details: [
            "파일 자동변환 — PDF·DOCX·XLSX·이미지 업로드 → AI가 항목별 정리",
            "다국어 — 원문 언어 자동 감지, 출력 언어 선택",
            "직접 작성 — 기본정보·제품·원료·품질·참고자료 5개 구역 입력",
            "작성 상태 — 채운 항목 수, 빠진 필수 항목, 수출국 규제 확인 알림",
            "PDF 출력 — 연구소 전달용 양식으로 인쇄·PDF 저장",
          ],
        },
        {
          name: "국가별 인허가 규제", image: "images/cosmoa/features/regulatory.webp",
          desc: "수출 대상국의 성분 규제를 미리 검토",
          items: ["한·영 성분 검색", "파일 성분 추출(OCR)", "규제 일괄 조회"],
          details: [
            "성분 검색 — 한·영 검색과 자동완성",
            "파일 추출 — PDF·Excel·이미지에서 성분 추출(OCR), 확인·수정",
            "조회 방식 — 식약처 수집 DB 또는 K-Beauty API 선택",
            "규제 조회 — 대상 시장의 규제 조건을 한 번에",
          ],
        },
        {
          name: "AI 제형·샘플", mine: true, image: "images/cosmoa/features/ai-formulation.webp",
          desc: "배합을 바꾸면 점도와 용기 적합도를 바로 계산·시각화",
          items: ["배합·점도 시뮬레이션", "용기 호환도 판정", "영업 피칭 스크립트"],
          more: [{ image: "images/cosmoa/gallery/ai-formulation-2.webp", caption: "크림 + 스포이드 → 부적합 판정" }],
          details: [
            "배합 조절 — 4개 성분 슬라이더, 정제수 자동 역산",
            "점도 예측 — 계산식으로 cPs·유동성 지수 산출",
            "시각화 — Canvas 액적 낙하·상분리",
            "용기 적합성 — 6종 용기 0~100점 판정, 대체 용기 추천",
            "AI 분석 — 개발요청서를 읽어 배합에 자동 적용",
            "바이어 제안 — R&D 리포트, 세일즈 피칭 스크립트 복사",
          ],
        },
        {
          name: "AI 챗봇", image: "images/cosmoa/features/chatbot.webp",
          desc: "모든 화면에서 부르는 AI 업무 비서",
          items: ["데이터 질의응답", "메일·문구 초안", "공통 위젯"],
          details: [
            "질의응답 — 환율·수출입·뉴스·성분 규제 데이터 조회",
            "문서 초안 — 바이어 메일, 업무 문구",
            "공통 위젯 — 모든 화면 오른쪽 아래에서 호출",
          ],
        },
      ],
      stack: ["Python · Flask", "SQLite", "OpenAI API", "관세청·수출입은행 API", "식약처 원료 DB", "Tesseract OCR", "Canvas 2D", "Docker", "Render"],
      gallery: [
        {
          title: "대시보드 화면", note: "실제 배포된 대시보드에서 캡처", ratio: "16 / 10",
          items: [
            { image: "images/cosmoa/gallery/login.webp", caption: "로그인" },
            { image: "images/cosmoa/gallery/ai-formulation-2.webp", caption: "제형 시뮬레이션 · 부적합 판정" },
            { image: "images/cosmoa/features/dev-request-pdf.webp", caption: "개발요청서 PDF 출력" },
          ],
        },
      ],
      links: { live: "https://cosmoa-dashboard.onrender.com", github: "https://github.com/kimminniegu/COSTD", site: "" },
    },

    {
      id: "hanjeongseon",
      order: 2,
      tab: "2차 프로젝트",
      fileName: "02_hanjeongseon",
      title: "한정선 베트남",
      theme: "heritage", // 전통 디저트 브랜드: 크림 종이·짙은 초록·명조·아치 틀·낙관 (docs/DESIGN.md 6-1장)
      sticker: "韓貞仙", // heritage 테마: 붉은 낙관
      subtitle: "찹쌀떡 브랜드의 베트남 다낭 진출을 맡은 글로벌 마케터를 위한 마케팅 대시보드",
      persona: "‘한정선 찹쌀떡’ 베트남 현지화 담당 글로벌 마케터",
      cover: "images/hanjeongseon/cover/cover.webp",
      hero: "images/hanjeongseon/features/home.webp",
      logo: "images/hanjeongseon/cover/logo.png",
      spec: [
        ["과정", "AX마스터 2기 2차"],
        ["기간", "2026.10.21 – 10.28"],
        ["팀", "2조 · 2&V (6인)"],
        ["역할", "팀장"],
        ["담당", "마케팅 성과(KPI) 탭 기획·개발"],
        ["협업", "GitHub 커밋 375회 · PR 81건"],
        ["결과물", "5개 탭 대시보드 · 숏폼 3편 · 포스터 3종 · 웹사이트"],
        ["배포", "Render · Supabase · Vercel"],
      ],
      flow: [
        {
          label: "문제", title: "판단 요소가 흩어진 1인 현지화 실무",
          points: [
            "베트남어 미숙, 제한된 예산, 2시간 시차, 1인 실무",
            "기념일·금기 색과 숫자·열대 기후 포장·다국어 협업까지 판단 요소가 분산",
            "시장 조사·콘텐츠·크리에이터 협업·성과 관리가 사이트마다 따로",
            "현지 매출은 VND, 본사 보고는 KRW — 수기 환산",
          ],
        },
        {
          label: "접근", title: "마케터의 하루 흐름대로 5개 탭",
          points: [
            "배경 — 국내 8개 매장·GS25 협업 월 60만 개 판매, 2026년 해외 진출 목표",
            "타깃 도시 — 다낭: 2025년 1~9월 외국인 관광객 1,540만 명, 찹쌀 식문화가 친숙",
            "타깃 고객 — 현지 직장인·MZ, 중산층 청년층, 명절 선물 구매자, 한국인·서구권 관광객",
            "HOME → 현지조사 → 콘텐츠 → 인플루언서 → 마케팅 성과, Blueprint 5개로 6명 동시 개발",
          ],
        },
        {
          label: "결과", title: "대시보드 + 홍보물 + 브랜드 사이트",
          points: [
            "5개 탭 대시보드 — Render·Supabase 배포",
            "숏폼 홍보영상 3편 · 기념일 포스터 3종",
            "베트남어 브랜드 웹사이트 (한·영 전환) — Vercel 배포",
            "GitHub 커밋 375회 · PR 81건, 10.28 최종 발표",
          ],
        },
      ],
      // 업무 장면별 이전 → 대시보드 이후 (프로젝트 계획서 03). [장면, 이후, 이전]
      solutionsHead: ["업무 장면 · 이전", "대시보드 이후"],
      solutions: [
        ["업무 일정 관리", "목표일만 정하면 D-35~D+7 업무 9개를 캘린더·간트에 자동 배치", "준비 단계를 그때그때 떠올림"],
        ["시장 판단", "출처·기준일·지역이 붙은 카드 비교와 근거 기반 AI 전략 제안", "사이트마다 따로 조사"],
        ["홍보물 제작", "말로 요청하고 화면에서 바로 수정, 금기 표현은 기본 프롬프트·검수로 이중 확인", "디자이너와 수정 왕복"],
        ["숏폼 영상", "한국어 수정이 영어 프롬프트에 반영, 실행 전 크레딧 표시로 과금 실수 방지", "프롬프트 구상·직접 작성"],
        ["크리에이터 협업", "공식 API로 조회수 중앙값·참여율 수집, 회신 속 날짜·비용 자동 정리", "지표·회신 수기 관리"],
        ["예산·고객 반응", "실시간 환율로 원화 매출·환차손익 표시, 리뷰는 한국어 요약과 감성·키워드 분류", "VND 수기 환산, 베트남어 리뷰 해독 불가"],
      ],
      // 일자별 진행 사항 (프로젝트 계획서 06)
      timeline: [
        ["10.21", "직무 페인포인트 조사, 방향·제품 선정"],
        ["10.22", "시장조사 세분화, 구성요소·역할 분배"],
        ["10.23", "탭별 MD 명세, 바이브 코딩 시작"],
        ["10.24", "탭별 개발, 전체 UI 1차 수정"],
        ["10.25", "대시보드 병합, 탭 추가 작업"],
        ["10.26", "전체 피드백, 디테일 수정"],
        ["10.27", "Render·Supabase 배포, 최종 제출"],
        ["10.28", "최종 발표"],
      ],
      mine: {
        title: "마케팅 성과(KPI) 탭",
        image: "images/hanjeongseon/features/kpi.webp",
        summary:
          "마케터가 출근 후 1분 안에 베트남 마케팅 현황을 파악하도록, 예산·광고 효율·환율·고객 반응을 한 화면에 모은 컨트롤 타워입니다. 기획부터 개발까지 맡았습니다.",
        points: [
          "예산 트래킹 — 소진율·잔여 예산, 추가 집행 시 손익을 미리 보는 시뮬레이터",
          "채널별 ROAS — 손익분기 300% 기준으로 조정이 필요한 채널 표시",
          "환율 연동 — 한국은행 환율로 VND 집행액을 원화·달러로 환산, 환차손익",
          "VOC — 팜플렛 QR(Zalo·카카오톡·WhatsApp) 메신저 문의를 AI로 번역·감성 분류·요약",
          "GA4 — 유입·전환 흐름, 연동이 어려우면 크리에이터 전환표로 교체 가능한 모듈",
          "보고서 — 쪽 나눔을 계산하는 PDF, 차트 포함 엑셀 내보내기",
        ],
        formulas: [
          "ROAS(%) = 캠페인 매출 ÷ 광고비 × 100",
          "환차손익 = 현지 금액(VND) × (현재 환율 − 편성 환율) ÷ 100",
          "예산 소진율(%) = (광고 집행비 + 협찬 집행비) ÷ 총 예산 × 100",
        ],
        note: "화면 수치는 시연용 데이터이며, GA4는 Google Merchandise Store 공개 데이터를 사용했습니다.",
      },
      // 순서: 대시보드 사이드 메뉴와 같게
      features: [
        {
          name: "HOME", image: "images/hanjeongseon/features/home.webp",
          desc: "한·베 시간, 일정·D-day 업무, 공휴일과 현지 뉴스를 한 화면에",
          items: ["통합 캘린더", "디데이 역산", "현지 뉴스"],
          details: [
            "통합 캘린더 — 베트남 공휴일·기념일·과일 시즌",
            "업무 진척 — 오늘 할 일, 캠페인·협업 진행 현황",
            "디데이 역산 — 목표일 기준 D-35~D+7 업무 9개 자동 배치, 간트 차트",
            "현지 뉴스 — 검색과 번역",
            "실행 계획서 — 이벤트 실행 계획서 PDF",
          ],
        },
        {
          name: "현지조사", image: "images/hanjeongseon/features/market.webp", caption: "국가와 문화",
          desc: "국가·문화, 트렌드, 경쟁제품, AI 인사이트로 진출 전략 수립",
          items: ["국가와 문화", "트렌드", "경쟁제품", "AI 인사이트"],
          more: [
            { image: "images/hanjeongseon/features/market-trend.webp", caption: "트렌드" },
            { image: "images/hanjeongseon/features/market-competitor.webp", caption: "경쟁제품" },
            { image: "images/hanjeongseon/features/market-insight.webp", caption: "AI 인사이트" },
          ],
          details: [
            "국가와 문화 — SNS 도달 규모, 이커머스 점유율, 금기 색·광고법상 피할 표현",
            "트렌드 — 인기 디저트 순위, 월별 검색 계절성, 과일·지역별 관심도",
            "경쟁제품 — 현지 모찌·찹쌀떡의 구성과 가격(VND) 비교",
            "AI 인사이트 — 근거 기반 전략 제안, SWOT",
            "다국가 확장 — 국가 등록부 한 줄로 다른 나라에 같은 화면 적용",
          ],
        },
        {
          name: "콘텐츠 스튜디오", image: "images/hanjeongseon/features/content-studio.webp",
          desc: "현지 기념일에 맞춘 콘텐츠 추천과 포스터·영상 제작",
          items: ["AI 포스터·카드뉴스", "말로 고치기", "숏폼 영상"],
          details: [
            "콘텐츠 추천 — 다가오는 현지 기념일에 맞춘 제작 제안",
            "AI 포스터·카드뉴스 — 문구·이미지 생성, AI 배경",
            "말로 고치기 — 대화로 요청하고 화면에서 바로 수정, Figma 플러그인 연동",
            "숏폼 영상 — 한국어 수정이 영어 프롬프트에 반영, 실행 전 크레딧 표시",
            "검수 — 배경 제거, 금기 표현 검수",
          ],
        },
        {
          name: "인플루언서", image: "images/hanjeongseon/features/influencer.webp",
          desc: "크리에이터 발굴부터 제안·일정·단가 관리까지",
          items: ["크리에이터 발굴", "3개 언어 제안 메일", "광고 단가 비교"],
          details: [
            "발굴·순위 — YouTube Data API·Phyllo로 조회수 중앙값·참여율 수집",
            "타깃 그룹 — 크리에이터를 타깃 고객군별로 분류",
            "제안 메일 — 베트남어·영어·한국어",
            "회신 정리 — 회신 속 날짜·비용 자동 정리, 촬영 일정",
            "광고 단가 — 팔로워 규모별 비교, 내보내기",
          ],
        },
        {
          name: "마케팅 성과", mine: true, image: "images/hanjeongseon/features/kpi.webp",
          desc: "광고비·ROAS·환율·고객 반응을 한 화면에서 관리",
          items: ["예산·ROAS", "환율·환차손익", "VOC·GA4·보고서"],
          details: [
            "스코어카드 — 총 광고비·종합 ROAS·누적 매출·환율",
            "예산 트래킹 — 소진율·잔여 예산, 추가 집행 손익 시뮬레이터",
            "채널별 ROAS — 손익분기 300% 미달 채널 표시",
            "환율 연동 — 한국은행 환율로 VND를 원화·달러 환산, 환차손익",
            "VOC — QR 창구별 메신저 문의 AI 요약·감성 분류",
            "GA4·보고서 — 유입·전환 흐름, PDF·엑셀 내보내기",
          ],
        },
      ],
      stack: ["Python 3.12 · Flask 3", "Blueprint 5개", "Jinja2 · Chart.js", "Supabase PostgreSQL", "OpenAI", "Higgsfield", "rembg · Figma", "SerpAPI · YouTube · Phyllo", "ECOS 환율 · DeepL · GA4", "Render · Gunicorn", "Vercel"],
      // 결과물: 묶음별로 (ratio = 썸네일 비율)
      gallery: [
        {
          title: "현지화 홍보영상", note: "한정선 베트남 현지화 홍보영상 · 26초 · 눌러서 재생", ratio: "16 / 9", cols: 1,
          items: [
            { video: "images/hanjeongseon/video/promo.mp4", image: "images/hanjeongseon/video/promo-poster.webp", caption: "한정선 베트남 현지화 홍보영상" },
          ],
        },
        {
          title: "숏폼 홍보영상", shape: "arch", note: "틱톡·릴스용 세로 영상 3편 · AI 생성 도구로 제작 · 눌러서 재생", ratio: "9 / 16",
          items: [
            { video: "images/hanjeongseon/video/video-vietnam.mp4", image: "images/hanjeongseon/video/video-vietnam-poster.webp", caption: "베트남 명소 · 전 제품", note: "15초 · 다낭 명소를 지나 해변의 선물 포장으로 끝나는 컷" },
            { video: "images/hanjeongseon/video/video-muckbang.mp4", image: "images/hanjeongseon/video/video-muckbang-poster.webp", caption: "먹방 콘셉트 · 꿀 레드용과", note: "10초 · 인플루언서가 단면을 보여 주는 리뷰형" },
            { video: "images/hanjeongseon/video/video-classic.mp4", image: "images/hanjeongseon/video/video-classic-poster.webp", caption: "명화 콘셉트 · 망고 요거트", note: "8초 · 명화 속 인물이 선물 포장을 풀어 맛보는 패러디" },
          ],
        },
        {
          title: "기념일 포스터", shape: "arch", note: "현지 기념일에 맞춘 SNS 포스터 3종", ratio: "3 / 4",
          items: [
            { image: "images/hanjeongseon/gallery/poster-tet.webp", caption: "뗏(설날)", note: "4구 선물세트 · 명절 선물" },
            { image: "images/hanjeongseon/gallery/poster-teachersday.webp", caption: "스승의 날 11.20", note: "두리안 · 감사 선물" },
            { image: "images/hanjeongseon/gallery/poster-roseday.webp", caption: "로즈데이", note: "꿀 레드용과 · 연인 선물" },
          ],
        },
        {
          title: "베트남 브랜드 웹사이트", note: "베트남어 기본 · 한국어·영어 전환", ratio: "16 / 10",
          embed: "https://hanjeongsun-vietnam.vercel.app", // 페이지 안에서 바로 둘러보기 + 새 창 링크
          items: [
            { image: "images/hanjeongseon/gallery/site-main.webp", caption: "첫 화면", note: "과일 4종 찹쌀떡 단면으로 제품을 바로 보여 주는 메인" },
            { image: "images/hanjeongseon/gallery/site-brand.webp", caption: "브랜드 소개", note: "제철 과일과 정성을 담은 선물이라는 메시지" },
            { image: "images/hanjeongseon/gallery/site-story.webp", caption: "브랜드 이야기", note: "과일 산지·다낭 풍경·열대 과일 스토리 카드" },
            { image: "images/hanjeongseon/gallery/site-collection.webp", caption: "컬렉션", note: "베트남·한국 컬렉션 전환, 제품별 단면과 포장" },
            { image: "images/hanjeongseon/gallery/site-gifting.webp", caption: "다낭 선물세트", note: "다낭 풍경 선물 상자와 보자기 포장" },
            { image: "images/hanjeongseon/gallery/site-shops.webp", caption: "다낭 매장 안내", note: "베트남 지도 위 매장별 주소·영업시간" },
          ],
        },
        {
          title: "제품", note: "현지 진출 제품 라인업", ratio: "1 / 1", cols: 4,
          items: [
            { image: "images/hanjeongseon/gallery/product-whole.webp", caption: "찹쌀떡 제품 라인업" },
            { image: "images/hanjeongseon/gallery/product-giftset.webp", caption: "선물세트" },
            { image: "images/hanjeongseon/gallery/product-mango.webp", caption: "망고 요거트" },
            { image: "images/hanjeongseon/gallery/product-dragonfruit.webp", caption: "허니 용과" },
          ],
        },
      ],
      links: {
        live: "https://hanjeongseon.onrender.com",
        github: "https://github.com/tb131811-lab/Hanjeongseon",
        site: "https://hanjeongsun-vietnam.vercel.app",
      },
    },
  ],
};
