/* 홈 렌더링: data.js → index.html 각 섹션
   톤: 밝은 그레이지 바탕 + 큰 검정 글자 앞에 떠 있는 유리(글래스모피즘) 카드 + 둥근 큰 카드. 모션은 느리고 부드럽게만 */
(function () {
  const d = window.PORTFOLIO;
  const pf = d.profile;
  const $ = (id) => document.getElementById(id);
  const projects = [...d.projects].sort((a, b) => a.order - b.order);
  const href = (p) => `project.html?id=${encodeURIComponent(p.id)}`;
  const role = (p) => (p.spec.find(([k]) => k === "역할") || [])[1] || "";

  // 1. 첫 화면: 왼쪽 작은 메뉴 · 가운데 이름 · 오른쪽 링크 / 큰 글자 앞 유리 카드 / 번호와 태그
  $("cover").innerHTML = `
    <div class="hero-wrap">
      <header class="topbar">
        <nav class="topnav" aria-label="바로가기">
          <a href="#projects" class="on">Projects <span class="dot-arrow">${arrowIcon}</span></a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <p class="brand">— ${esc(pf.nameEn.toUpperCase())} ARCHIVE —</p>
        <nav class="toplinks" aria-label="연락처">
          ${pf.email ? `<a href="mailto:${esc(pf.email)}">Mail</a>` : ""}
          ${pf.github ? `<a href="${esc(pf.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        </nav>
      </header>

      <div class="stage">
        <h1 class="giant" aria-label="${esc(pf.name)} AX 포트폴리오"><span>AX&nbsp;Archive</span></h1>
        <span class="glow g1" aria-hidden="true"></span><span class="glow g2" aria-hidden="true"></span>
        <nav class="glass-cards" aria-label="프로젝트">
          ${projects.map(glassCard).join("")}
        </nav>
      </div>

      <div class="stage-foot">
        <p class="counter mono"><b>${pad2(1)}</b><span>${pad2(projects.length)}</span><a href="#projects" aria-label="프로젝트로">${arrowIcon}</a></p>
        <ul class="tags">
          ${projects.map((p) => `<li><a href="${href(p)}">${esc(p.title)}</a></li>`).join("")}
          <li class="fill"><a href="#about">${esc(pf.name)}</a></li>
        </ul>
      </div>
    </div>`;

  // 2. 소개: 왼쪽 작은 라벨, 오른쪽 큰 문장 + 검정 버튼 + 숫자
  $("about").innerHTML = `
    <div class="wrap section">
      <div class="about-grid">
        <div class="label reveal"><span class="mono">About</span><b>소개</b></div>
        <div class="about-body">
          ${[].concat(pf.intro).map((t, i) => `<p class="${i ? "sub" : "lead-text"} reveal">${esc(t)}</p>`).join("")}
          <a class="pill-btn reveal" href="#projects">프로젝트 보기 <span>${arrowIcon}</span></a>
          <ul class="stats reveal">
            ${pf.stats.map((s) => `<li><b data-count>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("")}
          </ul>
        </div>
      </div>
    </div>`;

  // 3. 프로젝트: 첫 화면과 같은 톤 — 흰 판 + 은은한 빛 위 유리 카드 (번호 · 태그 · 문구 · 이미지 · 검정 화살표)
  const card = (p) => `
    <li class="reveal">
      <a class="pcard${p.theme ? ` pr-${esc(p.theme)}` : ""}" href="${href(p)}">
        <span class="pcard-top"><span class="mono">/${pad2(p.order)}</span><span class="pill">${esc(p.tab)}</span></span>
        <span class="pcard-title">${esc(p.title)}</span>
        <span class="pcard-sub">${esc(p.subtitle)}</span>
        <span class="pcard-role">${esc(role(p))} · ${esc(p.mine.title)}</span>
        <span class="pcard-img">${img(p.hero || p.cover, `${p.title} 화면`)}</span>
        <span class="round-btn" aria-hidden="true">${arrowIcon}</span>
      </a>
    </li>`;

  $("projects").innerHTML = `
    <div class="wrap section">
      <div class="glass-panel">
        <span class="glow g1" aria-hidden="true"></span><span class="glow g2" aria-hidden="true"></span>
        <div class="label reveal"><span class="mono">Projects</span><b>프로젝트</b></div>
        <ol class="pcards">${projects.map(card).join("")}</ol>
      </div>
    </div>`;

  // 4. 연락처
  $("contact").innerHTML = `
    <div class="wrap section">
      <div class="contact reveal">
        <p class="mono">Contact</p>
        <h2>함께 이야기 나눠요</h2>
        <a class="pill-btn" href="mailto:${esc(pf.email)}">${esc(pf.email)} <span>${arrowIcon}</span></a>
        ${pf.github ? `<a class="contact-link" href="${esc(pf.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
      </div>
      <p class="copy">© ${new Date().getFullYear()} ${esc(pf.name)}</p>
    </div>`;

  reveal();
  countUp();
})();
