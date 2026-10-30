/* 공통 부품: HTML 문자열을 돌려주는 순수 함수들 (docs/ARCHITECTURE.md 5장)
   클래스 이름은 css/base.css와 맞춘다. 모든 텍스트는 esc()를 거친다. */

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const pad2 = (n) => String(n).padStart(2, "0");

/** 이미지 자리표시. 파일 이름을 같이 적어서 무엇을 넣을지 알 수 있게 */
function placeholder(src = "") {
  const name = src ? src.split("/").pop() : "";
  return `<span class="placeholder" role="img" aria-label="이미지 준비 중"><span>캡처 넣을 자리</span>${name ? `<small>${esc(name)}</small>` : ""}</span>`;
}

/** 이미지. 경로가 비었거나 파일이 없으면 자리표시로 바뀜 */
function img(src, alt = "", { eager = false } = {}) {
  if (!src) return placeholder();
  return `<img src="${esc(src)}" alt="${esc(alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async" data-ph>`;
}

// 없는 파일(404)이면 자리표시로 교체 — error 이벤트는 버블링되지 않아서 capture로 받는다
document.addEventListener("error", (e) => {
  const t = e.target;
  if (t.tagName === "IMG" && t.hasAttribute("data-ph")) {
    t.closest("[data-zoom]")?.removeAttribute("data-zoom");
    t.outerHTML = placeholder(t.getAttribute("src"));
  }
}, true);

// 사진을 사이트 색 두 가지로 바꾸는 필터 (css: .tone-olive / .tone-pink). 페이지에 한 번만 넣는다
document.body.insertAdjacentHTML("afterbegin", `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="tone-olive" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncR type="linear" slope="2.4" intercept="-1.2"/><feFuncG type="linear" slope="2.4" intercept="-1.2"/><feFuncB type="linear" slope="2.4" intercept="-1.2"/></feComponentTransfer>
      <feComponentTransfer><feFuncR type="table" tableValues=".333 .957"/><feFuncG type="table" tableValues=".376 .961"/><feFuncB type="table" tableValues=".188 .925"/></feComponentTransfer>
    </filter>
    <filter id="tone-sky" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncR type="linear" slope="1.3" intercept="-.15"/><feFuncG type="linear" slope="1.3" intercept="-.15"/><feFuncB type="linear" slope="1.3" intercept="-.15"/></feComponentTransfer>
      <feComponentTransfer><feFuncR type="table" tableValues=".310 .984"/><feFuncG type="table" tableValues=".478 .965"/><feFuncB type="table" tableValues=".588 .894"/></feComponentTransfer>
    </filter>
    <filter id="tone-cocoa" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncR type="linear" slope="1.3" intercept="-.15"/><feFuncG type="linear" slope="1.3" intercept="-.15"/><feFuncB type="linear" slope="1.3" intercept="-.15"/></feComponentTransfer>
      <feComponentTransfer><feFuncR type="table" tableValues=".431 .984"/><feFuncG type="table" tableValues=".290 .910"/><feFuncB type="table" tableValues=".220 .922"/></feComponentTransfer>
    </filter>
    <filter id="tone-green" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncR type="linear" slope="1.3" intercept="-.15"/><feFuncG type="linear" slope="1.3" intercept="-.15"/><feFuncB type="linear" slope="1.3" intercept="-.15"/></feComponentTransfer>
      <feComponentTransfer><feFuncR type="table" tableValues=".184 .965"/><feFuncG type="table" tableValues=".290 .945"/><feFuncB type="table" tableValues=".243 .906"/></feComponentTransfer>
    </filter>
    <filter id="tone-pink" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncR type="linear" slope="1.3" intercept="-.15"/><feFuncG type="linear" slope="1.3" intercept="-.15"/><feFuncB type="linear" slope="1.3" intercept="-.15"/></feComponentTransfer>
      <feComponentTransfer><feFuncR type="table" tableValues=".612 .988"/><feFuncG type="table" tableValues=".290 .929"/><feFuncB type="table" tableValues=".369 .941"/></feComponentTransfer>
    </filter>
  </svg>`);

/** 대표 이미지 색 톤: 테마가 있으면 테마 색(beauty 분홍, heritage 짙은 초록), 없으면 순번으로 올리브/분홍 */
const tone = (project) =>
  ({ beauty: "tone-sky", heritage: "tone-cocoa" })[project.theme] || (project.order % 2 ? "tone-olive" : "tone-pink");

/** "키워드 — 설명" 문장 → 키워드만 굵게 */
function keyLine(text) {
  const [k, ...rest] = String(text).split(" — ");
  return rest.length ? `<b>${esc(k)}</b> ${esc(rest.join(" — "))}` : esc(text);
}

/** 작은 라벨. variant: "" | "pink" | "olive" */
function chip(text, variant = "") {
  return `<span class="chip${variant ? ` ${variant}` : ""}">${esc(text)}</span>`;
}

/** 링크 버튼. href가 비어 있으면 빈 문자열 */
function button(label, href, { download = false, primary = false } = {}) {
  if (!href) return "";
  const external = /^https?:/.test(href);
  return `<a class="btn${primary ? " primary" : ""}" href="${esc(href)}"${external ? ` target="_blank" rel="noopener"` : ""}${download ? " download" : ""}>${esc(label)}</a>`;
}

/** 섹션 머리: 번호 + 제목 + 영문 보조 */
function sectionHead(no, title, en = "") {
  return `
    <header class="section-head reveal">
      <span class="section-no">${esc(no)}</span>
      <h2>${esc(title)}</h2>
      ${en ? `<span class="section-en">${esc(en)}</span>` : ""}
    </header>`;
}

/** 항목–값 목록. rows = [[항목, 값], ...] */
function specList(rows) {
  return `<dl class="spec">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
}

/** 오른쪽 화살표 아이콘 */
const arrowIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** 유리(글래스모피즘) 프로젝트 카드: 화면 · /번호 · 차수 알약 · 제목 · 내 담당 · 화살표. 뒤에 .glow 빛을 깔면 잘 보임 */
function glassCard(project, index = 0) {
  return `
    <a class="gcard${project.theme ? ` pr-${esc(project.theme)}` : ""}" href="project.html?id=${encodeURIComponent(project.id)}" style="--i:${index}">
      <span class="gcard-img">${img(project.hero || project.cover, "", { eager: true })}</span>
      <span class="gcard-top"><span class="mono">/${pad2(project.order)}</span><span class="pill">${esc(project.tab)}</span></span>
      <b>${esc(project.title)}</b>
      <span class="gcard-sub">${esc(project.mine.title)}</span>
      <span class="gcard-go" aria-hidden="true">${arrowIcon}</span>
    </a>`;
}

/** 줄무늬 폴더 한 장. 폴더 사이로 cover 이미지가 종이처럼 살짝 나와 있음 */
function folder(project, index = 0) {
  return `
    <a class="folder${project.theme ? ` folder-${esc(project.theme)}` : ""}" href="project.html?id=${encodeURIComponent(project.id)}" style="--i:${index}" aria-label="${esc(project.tab)} ${esc(project.title)} 열기">
      <span class="folder-icon" aria-hidden="true">
        <span class="folder-back"></span>
        <span class="folder-fan">${[project.cover, ...project.features.slice(0, 2).map((f) => f.image)].map((src, k) => `<span class="fan-card" style="--k:${k}">${img(src, "")}</span>`).join("")}</span>
        <span class="folder-paper ${tone(project)}">${img(project.cover, "", { eager: true })}</span>
        <span class="folder-front"></span>
      </span>
      <span class="folder-name">${esc(project.fileName)}</span>
      <span class="folder-title">${esc(project.title)}</span>
    </a>`;
}

/* ---------- 문구류 부품: 테마(theme: "beauty")가 있는 프로젝트에서 씀 ---------- */

/** 분홍 압정 */
function pin() {
  return `<span class="pin" aria-hidden="true"></span>`;
}

/** 영수증 속 내용. brand / title / image / items(줄 목록) / foot. 바깥 태그는 부르는 쪽에서 class="receipt"로 감싼다 */
function receipt({ brand = "", title = "", image = "", items = [], badge = "", foot = "" } = {}) {
  return `
    ${brand ? `<span class="rc-brand">${esc(brand)}</span><span class="rc-dbl"></span>` : ""}
    <span class="rc-title">${esc(title)}${badge ? `<span class="rc-badge">${esc(badge)}</span>` : ""}</span>
    <span class="rc-dbl"></span>
    ${image ? `<span class="rc-img">${img(image, title)}</span><span class="rc-dbl"></span>` : ""}
    <span class="rc-rows">${items.map((t) => `<span>${esc(t)}</span>`).join("")}</span>
    <span class="rc-dbl"></span>
    ${foot ? `<span class="rc-foot">${esc(foot)}</span>` : ""}`;
}

/** 폴라로이드 (tilt: 기울기 deg) */
function polaroid(src, caption = "", tilt = 0) {
  return `
    <figure class="polaroid" style="--tilt:${tilt}deg">
      <span class="polaroid-img">${img(src, caption)}</span>
      ${caption ? `<figcaption class="hand">${esc(caption)}</figcaption>` : ""}
    </figure>`;
}

/** 손으로 그린 곡선 화살표 (flip: 좌우 반전) */
function arrow(flip = false) {
  return `
    <svg class="arrow${flip ? " flip" : ""}" viewBox="0 0 120 90" aria-hidden="true">
      <path d="M14 8 C 70 6, 104 30, 92 74" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M80 64 L 92 76 L 100 61" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

/* ---------- 모션: 느리고 부드럽게, 한 번씩만 ----------
   모두 prefers-reduced-motion이면 꺼진다 (css/base.css 맨 아래) */
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 스크롤하면 .reveal 요소가 나타남.
    같은 부모 안의 형제는 차례로(--d) */
function reveal(root = document) {
  const els = [...root.querySelectorAll(".reveal")];
  els.forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const i = sibs.indexOf(el);
    el.style.setProperty("--d", `${Math.min(i, 8) * 90}ms`);
    if (el.classList.contains("fan")) el.style.setProperty("--fan", `${(i % 2 ? 1 : -1) * (3 + (i % 3))}deg`);
  });
  if (calm || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
}

/** 페이지 맨 위 읽기 진행 막대 */
function progressBar() {
  const bar = document.createElement("div");
  bar.className = "progress"; bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);
  const set = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", set, { passive: true }); set();
}

/** 숫자가 0부터 올라감. "11", "2회", "1등"처럼 앞 숫자만 센다 */
function countUp(root = document) {
  root.querySelectorAll("[data-count]").forEach((el) => {
    const m = el.textContent.match(/^(\d+)(.*)$/);
    if (!m || calm) return;
    const [, n, rest] = m;
    el.textContent = `0${rest}`;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1100;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = `${Math.round(+n * e)}${rest}`;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
  });
}
