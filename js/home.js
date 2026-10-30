/* 홈 렌더링: data.js → index.html 각 섹션
   첫 화면은 '책상' 무대: 연한 커팅매트 위 문구류 + 날아와 열리는 프로젝트 폴더 */
(function () {
  const d = window.PORTFOLIO;
  const pf = d.profile;
  const $ = (id) => document.getElementById(id);
  const projects = [...d.projects].sort((a, b) => a.order - b.order);
  const href = (p) => `project.html?id=${encodeURIComponent(p.id)}`;
  const role = (p) => (p.spec.find(([k]) => k === "역할") || [])[1] || "";

  // 1. 책상 무대: 이름(한 글자씩), 한 줄 소개, 버튼, 폴더(올리면 카드가 부채꼴로)
  $("cover").innerHTML = `
    <div class="desk">
      <span class="ruler top" aria-hidden="true"></span>
      ${deskProps()}
      <div class="desk-inner">
        <p class="kicker mono" data-type="${esc(pf.fileName)}">${esc(pf.fileName)}</p>
        <h1 class="hero"><span class="hero-name">${esc(pf.name)}</span><span class="hero-en mono">${esc(pf.nameEn)} · AX Project Archive</span></h1>
        <p class="headline">${esc(pf.headline)}</p>
        <div class="btns">
          ${button("메일 보내기", pf.email && `mailto:${pf.email}`, { primary: true })}
          ${button("GitHub", pf.github)}
          ${button("이력서", pf.resume, { download: true })}
        </div>
        <nav class="folders" aria-label="프로젝트" style="--n:${projects.length}">
          ${projects.map(folder).join("")}
        </nav>
        <p class="hint mono">폴더를 열어 보세요 ↗</p>
      </div>
      <span class="ruler bottom" aria-hidden="true"></span>
    </div>
    ${marquee([pf.nameEn, ...projects.map((p) => p.title), ...pf.stats.map((s) => `${s.value} ${s.label}`)])}`;

  // 2. 소개 + 숫자(0부터 올라감)
  $("about").innerHTML = `
    <div class="wrap section">
      ${sectionHead("01", "소개", "about")}
      <div class="about-grid">
        <div class="intro reveal">
          ${[].concat(pf.intro).map((t) => `<p>${esc(t)}</p>`).join("")}
          <ul class="intro-projects">
            ${projects.map((p) => `
              <li class="reveal fan ${p.theme ? `pr-${esc(p.theme)}` : ""}">
                <a href="${href(p)}" data-cursor="열기"><span class="ip-dot" aria-hidden="true"></span><b>${esc(p.title)}</b><span>${esc(p.persona)}를 위한 대시보드</span></a>
                <small>${esc(role(p))} · ${esc(p.mine.title)}</small>
              </li>`).join("")}
          </ul>
        </div>
        <ul class="stats">
          ${pf.stats.map((s) => `<li class="reveal fan"><b data-count>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("")}
        </ul>
      </div>
    </div>`;

  // 3. 프로젝트: 스크롤하면 카드가 한 장씩 위로 쌓임 (sticky)
  const row = (p, i) => `
    <li class="stack-item" style="--i:${i}">
      <a class="project-row${p.theme ? ` pr-${esc(p.theme)}` : ""}" href="${href(p)}">
        <span class="pr-thumb ${tone(p)}" data-tilt="5">
          <span class="pr-paper">${img(p.cover, `${p.title} 대표 이미지`)}</span>
          <span class="pr-label mono">${esc(p.fileName)}</span>
        </span>
        <span class="pr-text">
          <span class="pr-no mono">${pad2(p.order)} · ${esc(p.tab)}</span>
          <span class="pr-title">${esc(p.title)}</span>
          <span class="pr-sub">${esc(p.subtitle)}</span>
          <span class="pr-mine">${chip("내 담당", "pink")}<span>${esc(role(p))} · ${esc(p.mine.title)}</span></span>
          <span class="chips">${p.stack.slice(0, 4).map((s) => chip(s)).join("")}</span>
          <span class="more">자세히 보기 <span aria-hidden="true">→</span></span>
        </span>
        <span class="pr-big mono" aria-hidden="true">${pad2(p.order)}</span>
      </a>
    </li>`;

  $("projects").innerHTML = `
    <div class="wrap section">
      ${sectionHead("02", "프로젝트", "projects")}
      <ol class="project-list">${projects.map(row).join("")}</ol>
    </div>`;

  // 4. 연락처
  $("contact").innerHTML = `
    ${marquee(["Let's talk", pf.email, "AX Project Archive"], "soft")}
    <div class="wrap section">
      <div class="contact reveal">
        <p class="kicker mono">contact</p>
        <h2>함께 이야기 나눠요</h2>
        <p class="contact-mail"><a href="mailto:${esc(pf.email)}" data-cursor="메일">${esc(pf.email)}</a></p>
        <div class="btns">
          ${button("메일 보내기", pf.email && `mailto:${pf.email}`, { primary: true })}
          ${button("GitHub", pf.github)}
        </div>
      </div>
      <p class="copy">© ${new Date().getFullYear()} ${esc(pf.name)}</p>
    </div>`;

  splitText(document.querySelector(".hero-name"));
  typewrite(document.querySelector("[data-type]"));
  reveal();
  tilt();
  countUp();
  parallax(document.querySelector(".desk"));
  cursor();

  // 폴더가 책상에 내려앉으면 카드가 한 번 부채꼴로 펼쳐졌다가 접힘
  if (!calm) {
    setTimeout(() => document.querySelector(".folders")?.classList.add("show"), 1700);
    setTimeout(() => document.querySelector(".folders")?.classList.remove("show"), 3300);
  }
})();
