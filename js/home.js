/* 홈 렌더링: data.js → index.html 각 섹션 */
(function () {
  const d = window.PORTFOLIO;
  const pf = d.profile;
  const $ = (id) => document.getElementById(id);
  const projects = [...d.projects].sort((a, b) => a.order - b.order);
  const href = (p) => `project.html?id=${encodeURIComponent(p.id)}`;

  // 1. 표지: 파일 창(이름, 한 줄 소개, 버튼) + 줄무늬 폴더
  $("cover").innerHTML = `
    <div class="wrap">
      <div class="window">
        <div class="window-bar">
          <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="mono">${esc(pf.fileName)}</span>
          <span class="mono">${projects.length} files</span>
        </div>
        <div class="window-body">
          <p class="kicker mono">AX project archive</p>
          <h1 class="hero">${esc(pf.name)}<span class="mono">${esc(pf.nameEn)}</span></h1>
          <p class="headline">${esc(pf.headline)}</p>
          <div class="btns">
            ${button("메일 보내기", pf.email && `mailto:${pf.email}`, { primary: true })}
            ${button("GitHub", pf.github)}
            ${button("이력서", pf.resume, { download: true })}
          </div>
          <nav class="folders" aria-label="프로젝트" style="--n:${projects.length}">
            ${projects.map(folder).join("")}
          </nav>
          <p class="hint mono">폴더를 눌러 열어보세요</p>
        </div>
      </div>
    </div>`;

  // 2. 소개 + 숫자 요약
  $("about").innerHTML = `
    <div class="wrap section">
      ${sectionHead("01", "소개", "about")}
      <div class="about-grid">
        <p class="intro reveal">${esc(pf.intro)}</p>
        <ul class="stats reveal">
          ${pf.stats.map((s) => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("")}
        </ul>
      </div>
    </div>`;

  // 3. 프로젝트 목록: 대표 이미지 + 요약 + 내 담당 + 기술
  const row = (p) => `
    <li class="reveal">
      <a class="project-row${p.theme ? ` pr-${esc(p.theme)}` : ""}" href="${href(p)}">
        <span class="pr-thumb ${tone(p)}">
          <span class="pr-paper">${img(p.cover, `${p.title} 대표 이미지`)}</span>
          <span class="pr-label mono">${esc(p.fileName)}</span>
        </span>
        <span class="pr-text">
          <span class="pr-no mono">${pad2(p.order)} · ${esc(p.tab)}</span>
          <span class="pr-title">${esc(p.title)}</span>
          <span class="pr-sub">${esc(p.subtitle)}</span>
          <span class="pr-mine">${chip("내 담당", "pink")}<span>${esc(p.mine.title)}</span></span>
          <span class="chips">${p.stack.slice(0, 4).map((s) => chip(s)).join("")}</span>
          <span class="more">자세히 보기 <span aria-hidden="true">→</span></span>
        </span>
      </a>
    </li>`;

  $("projects").innerHTML = `
    <div class="wrap section">
      ${sectionHead("02", "프로젝트", "projects")}
      <ol class="project-list">${projects.map(row).join("")}</ol>
    </div>`;

  // 4. 연락처
  $("contact").innerHTML = `
    <div class="wrap section">
      <div class="contact reveal">
        <p class="kicker mono">contact</p>
        <h2>함께 이야기 나눠요</h2>
        <p class="contact-mail"><a href="mailto:${esc(pf.email)}">${esc(pf.email)}</a></p>
        <div class="btns">
          ${button("메일 보내기", pf.email && `mailto:${pf.email}`, { primary: true })}
          ${button("GitHub", pf.github)}
        </div>
      </div>
      <p class="copy">© ${new Date().getFullYear()} ${esc(pf.name)}</p>
    </div>`;

  reveal();
})();
