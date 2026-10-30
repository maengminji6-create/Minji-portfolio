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

/** 줄무늬 폴더 한 장. 폴더 사이로 cover 이미지가 종이처럼 살짝 나와 있음 */
function folder(project, index = 0) {
  return `
    <a data-tilt="8" class="folder${project.theme ? ` folder-${esc(project.theme)}` : ""}" href="project.html?id=${encodeURIComponent(project.id)}" style="--i:${index}" aria-label="${esc(project.tab)} ${esc(project.title)} 열기">
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

/* ---------- 모션 (레퍼런스: 책상 위 카드가 펼쳐지고, 타자 치듯 글자가 나오는 포트폴리오) ----------
   모두 prefers-reduced-motion이면 꺼진다 (css/base.css 맨 아래) */
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 스크롤하면 .reveal 요소가 나타남.
    같은 부모 안의 형제는 차례로(--d), class="reveal fan"은 카드가 부채꼴로 펼쳐지듯 기울어진 채 올라와 제자리로 */
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

/** 타자 치듯 글자가 나오고 커서(_)가 깜빡임. el의 data-type 글자를 씀 */
function typewrite(el, speed = 55) {
  const text = el.dataset.type || el.textContent;
  el.setAttribute("aria-label", text);
  if (calm) { el.textContent = text; return; }
  el.textContent = "";
  el.classList.add("typing");
  let i = 0;
  const tick = () => { el.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(tick, speed); else el.classList.add("typed"); };
  setTimeout(tick, 400);
}

/** 마우스를 따라 살짝 기우는 카드 (data-tilt). 터치 기기에선 동작 안 함 */
function tilt(root = document, maxDeg = 6) {
  if (calm || !matchMedia("(hover: hover)").matches) return;
  root.querySelectorAll("[data-tilt]").forEach((el) => {
    const max = +el.dataset.tilt || maxDeg; // data-tilt="2"처럼 각도를 따로 줄 수 있음
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - .5) * max * 2}deg`);
      el.style.setProperty("--rx", `${(.5 - (e.clientY - r.top) / r.height) * max * 2}deg`);
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  });
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

/* ---------- 무대 연출 (홈 책상·흐르는 띠·커서·스크롤 장면) ---------- */

/** 책상 위 문구류 (장식 SVG, 내용 아님). 각 소품은 data-depth만큼 마우스를 따라 움직임 */
function deskProps() {
  const item = (cls, depth, svg) => `<span class="prop ${cls}" data-depth="${depth}" aria-hidden="true">${svg}</span>`;
  return [
    item("p-clip", 18, `<svg viewBox="0 0 40 90"><path d="M12 22v44a8 8 0 0 0 16 0V16a12 12 0 0 0-24 0v52a16 16 0 0 0 32 0V24" fill="none" stroke="#8fb6d0" stroke-width="3.2" stroke-linecap="round"/></svg>`),
    item("p-clip2", 12, `<svg viewBox="0 0 40 90"><path d="M12 22v44a8 8 0 0 0 16 0V16a12 12 0 0 0-24 0v52a16 16 0 0 0 32 0V24" fill="none" stroke="#d99aa6" stroke-width="3.2" stroke-linecap="round"/></svg>`),
    item("p-pencil", 26, `<svg viewBox="0 0 260 30"><rect x="30" y="4" width="190" height="22" rx="3" fill="#f3dc8c"/><rect x="30" y="4" width="190" height="7" fill="#f8e7ad"/><rect x="220" y="4" width="14" height="22" fill="#c9c6bd"/><rect x="234" y="4" width="22" height="22" rx="5" fill="#f0bcc5"/><path d="M30 4 4 15l26 11z" fill="#efd9b8"/><path d="M12 11.6 4 15l8 3.4z" fill="#55554d"/></svg>`),
    item("p-note", 34, `<svg viewBox="0 0 120 120"><rect x="6" y="6" width="108" height="108" fill="#fcedf0"/><rect x="6" y="6" width="108" height="20" fill="#f6d6dd"/><text x="60" y="72" text-anchor="middle" font-family="Nanum Pen Script, cursive" font-size="30" fill="#b0566a">AX 기록!</text><path d="M28 90q32 8 64 0" fill="none" stroke="#d99aa6" stroke-width="2" stroke-linecap="round"/></svg>`),
    item("p-ball", 40, `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#fff" stroke="#e4e2da" stroke-width="2"/><path d="M20 40l20 8 6-18 14 22 18-10M28 66l16-6 8 14 16-12 10 8M44 18l4 14" fill="none" stroke="#d9d7cf" stroke-width="2" stroke-linejoin="round"/></svg>`),
    item("p-clamp", 22, `<svg viewBox="0 0 80 70"><path d="M8 30h64l-6 34H14z" fill="#8a5e46"/><path d="M8 30h64" stroke="#6b4532" stroke-width="3"/><path d="M22 30 30 4h20l8 26" fill="none" stroke="#b9b6ad" stroke-width="3.5" stroke-linejoin="round"/></svg>`),
    item("p-tape", 10, `<svg viewBox="0 0 140 36"><path d="M4 4h132l-4 7 4 7-4 7 4 7H4l4-7-4-7 4-7z" fill="#b9d8ec" opacity=".8"/></svg>`),
    item("p-star", 30, `<svg viewBox="0 0 60 60"><path d="M30 4l6 18 19 1-15 11 6 19-16-11-16 11 6-19L5 23l19-1z" fill="#fbf1cf" stroke="#e8cf7a" stroke-width="2" stroke-linejoin="round"/></svg>`),
  ].join("");
}

/** 소품이 마우스 반대쪽으로 살짝 움직이는 깊이감 */
function parallax(root) {
  if (calm || !matchMedia("(hover: hover)").matches) return;
  const props = [...root.querySelectorAll("[data-depth]")];
  root.addEventListener("pointermove", (e) => {
    const r = root.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    props.forEach((el) => { const d = +el.dataset.depth; el.style.setProperty("--mx", `${-x * d}px`); el.style.setProperty("--my", `${-y * d}px`); });
  });
}

/** 끝없이 흐르는 띠. words = 문자열 배열 */
function marquee(words, variant = "") {
  const line = words.map((w) => `<span>${esc(w)}</span><i aria-hidden="true">✦</i>`).join("");
  return `<div class="marquee ${variant}" aria-hidden="true"><div class="marquee-track">${line}${line}</div></div>`;
}

/** 글자를 한 자씩 감싸서 차례로 솟아오르게 (.split) */
function splitText(el) {
  if (!el || calm) return;
  const text = el.textContent;
  el.setAttribute("aria-label", text);
  el.innerHTML = [...text].map((ch, i) => `<span class="ch" style="--c:${i}" aria-hidden="true">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  el.classList.add("split");
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

/** 스크롤 위치를 0~1로 CSS 변수 --p에 넣음 (data-scene). 화면 아래에서 들어올 때 0 → 화면 30% 지점에서 1 */
function scrollScene(root = document) {
  const els = [...root.querySelectorAll("[data-scene]")];
  if (!els.length) return;
  if (calm) { els.forEach((el) => el.style.setProperty("--p", 1)); return; }
  const set = () => els.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const p = Math.max(0, Math.min(1, (innerHeight - top) / (innerHeight * .7)));
    el.style.setProperty("--p", p.toFixed(3));
  });
  addEventListener("scroll", set, { passive: true }); addEventListener("resize", set); set();
}

/** 따라다니는 원형 커서. 링크·버튼 위에서 커지며 글자(data-cursor 또는 기본값)를 보여 줌 */
function cursor() {
  if (calm || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const c = document.createElement("div");
  c.className = "cursor"; c.setAttribute("aria-hidden", "true"); c.innerHTML = "<span></span>";
  document.body.append(c);
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; c.classList.add("on"); });
  document.addEventListener("pointerleave", () => c.classList.remove("on"));
  const label = c.querySelector("span");
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("a, button, video");
    c.classList.toggle("big", !!t);
    label.textContent = t ? (t.dataset.cursor || (t.tagName === "VIDEO" ? "재생" : t.matches("a.folder, a.project-row") ? "열기" : "")) : "";
  });
  const loop = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); };
  loop();
}
