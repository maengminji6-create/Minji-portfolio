/* 상세 렌더링: project.html?id=값 → 해당 프로젝트 */
(function () {
  const d = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const projects = [...d.projects].sort((a, b) => a.order - b.order);

  const id = new URLSearchParams(location.search).get("id");
  const index = projects.findIndex((p) => p.id === id);
  if (index < 0) { location.replace("index.html"); return; }
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const m = p.mine;
  // 테마 프로젝트: 뼈대는 같고 색·장식만 다름 (css/project.css 테마 블록)
  const themed = !!p.theme;
  if (themed) document.body.classList.add(`theme-${p.theme}`);
  const beauty = p.theme === "beauty"; // 링 노트 스토리·폴라로이드 메모는 beauty 테마에서만

  document.title = `${p.title} | ${d.profile.name} AX 포트폴리오`;

  // 1. 커버: 파일 이름, 제목, 부제, 대표 이미지 (실제 화면이면 브라우저 창 틀)
  $("p-cover").innerHTML = `
    <div class="wrap">
      <div class="p-intro">
        <div class="p-meta">
          <span class="p-no mono" data-type="${esc(p.fileName)}">${esc(p.fileName)}</span>
          ${p.logo ? `<img class="p-logo" src="${esc(p.logo)}" alt="${esc(p.title)} 로고">` : ""}
        </div>
        <h1 class="p-title"><span class="p-title-text">${esc(p.title)}</span>${themed && p.sticker ? `<span class="p-sticker${beauty ? " hand" : ""}">${esc(p.sticker)}</span>` : ""}</h1>
        <p class="p-sub">${esc(p.subtitle)}</p>
        <div class="chips">${chip(p.tab, "olive")}${chip(`내 담당 · ${m.title}`, "pink")}</div>
      </div>
      ${p.hero ? `
        <div class="p-hero framed">${themed ? `<span class="tape l" aria-hidden="true"></span><span class="tape r" aria-hidden="true"></span>` : ""}
          <div class="frame-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="mono">${esc((p.links.live || p.fileName).replace(/^https?:\/\//, ""))}</span></div>
          <div class="frame-img">${img(p.hero, `${p.title} 대시보드 화면`, { eager: true })}</div>
        </div>`
        : `<div class="p-hero ${tone(p)}">${img(p.cover, `${p.title} 대표 이미지`, { eager: true })}</div>`}
    </div>`;

  // 섹션 번호는 그려지는 순서대로 01, 02, ...
  let n = 0;
  const no = () => pad2(++n);

  // 2. 한눈에 보기: 프로젝트를 가운데 두고 사용자·문제·기능·역할·결과·기술을 가지로 펼친 마인드맵 + 명세
  const node = (cls, label, body) => `
    <div class="mm-node ${cls}">
      <span class="mm-label mono">${esc(label)}</span>
      ${body}
    </div>`;
  const roleSpec = (p.spec.find(([k]) => k === "역할") || [])[1];
  $("p-map").innerHTML = `
    <div class="wrap section">
      ${sectionHead(no(), "한눈에 보기", "at a glance")}
      <div class="map-grid">
        <div class="mindmap reveal">
          <div class="mm-center">
            <span class="mono">${esc(p.fileName)}</span>
            <b>${esc(p.title)}</b>
          </div>
          ${node("mm-who", "누구를 위해", `<p>${esc(p.persona)}</p>`)}
          ${node("mm-problem", "무엇이 문제", `<p>${esc(p.flow[0].title)}</p>`)}
          ${node("mm-tabs", "무엇을 만들었나", `<div class="chips">${p.features.map((f) => chip(f.name, f.mine ? "pink" : "")).join("")}</div>`)}
          ${node("mm-role", "내 역할", `<p><b>${esc(roleSpec || "")}</b> · ${esc(m.title)}</p>`)}
          ${node("mm-stack", "기술", `<p>${p.stack.slice(0, 4).map(esc).join(" · ")}</p>`)}
          ${node("mm-result", "결과", `<p>${esc(p.flow[p.flow.length - 1].title)}</p>`)}
        </div>
        <div class="reveal">${specList(p.spec)}</div>
      </div>
    </div>`;

  // 3. 스토리: 문제 → 접근 → 결과 (짧은 문장 목록) + 실무 과제 → 대응
  $("p-story").innerHTML = `
    <div class="wrap section">
      ${sectionHead(no(), "문제에서 결과까지", "story")}
      ${beauty ? `
        <div class="notebook story-book reveal">
          <p class="hand nb-title">${esc(p.title)}, 이렇게 만들었어요</p>
          <ol class="nb-steps">
            ${p.flow.map((f, i) => `
              <li class="nb-step${i % 2 ? " right" : ""}${i === p.flow.length - 1 ? " result" : ""}">
                <p class="hand nb-label">${esc(f.label)}</p>
                <h3>${esc(f.title)}</h3>
                <ul>${f.points.map((t) => `<li>${keyLine(t)}</li>`).join("")}</ul>
                ${f.hand ? `<p class="hand nb-note">${esc(f.hand)}</p>` : ""}
              </li>
              ${i < p.flow.length - 1 ? `<li class="nb-arrow${i % 2 ? " flip" : ""}" aria-hidden="true">${arrow(i % 2 === 1)}</li>` : ""}`).join("")}
          </ol>
        </div>` : `
      <ol class="flow">
        ${p.flow.map((f, i) => `
          <li class="flow-card${i === p.flow.length - 1 ? " result" : ""} reveal fan">
            <span class="flow-label mono">${pad2(i + 1)} ${esc(f.label)}</span>
            <h3>${esc(f.title)}</h3>
            <ul>${f.points.map((t) => `<li>${keyLine(t)}</li>`).join("")}</ul>
          </li>`).join("")}
      </ol>`}
      ${p.solutions?.length ? `
        <div class="solutions reveal">
          <div class="sol-head">${(p.solutionsHead || ["실무 과제", "서비스의 대응"]).map((h) => `<span class="mono">${esc(h)}</span>`).join("")}</div>
          ${p.solutions.map(([k, v, before]) => `
            <div class="sol-row">
              <span class="sol-key"><b>${esc(k)}</b>${before ? `<small>${esc(before)}</small>` : ""}</span>
              <span class="sol-arrow" aria-hidden="true">→</span>
              <span>${esc(v)}</span>
            </div>`).join("")}
        </div>` : ""}
    </div>`;

  // 3-1. 진행 과정 (있을 때만)
  $("p-timeline").innerHTML = p.timeline?.length ? `
    <div class="wrap section">
      ${sectionHead(no(), "진행 과정", "timeline")}
      <ol class="timeline reveal">
        ${p.timeline.map(([date, text]) => `<li><span class="mono">${esc(date)}</span><p>${esc(text)}</p></li>`).join("")}
      </ol>
    </div>` : "";

  // 4. 내 담당: 요약 + 구현한 것 + 계산식 (+ 팀장으로 한 일)
  $("p-mine").innerHTML = `
    <div class="wrap section">
      ${sectionHead(no(), "내가 맡은 부분", "my part")}
      <div class="mine reveal">
        <div class="mine-head">
          ${chip("내 담당", "pink")}
          <h3>${esc(m.title)}</h3>
          <p>${esc(m.summary)}</p>
          ${m.lead?.length ? `
            <div class="lead">
              <p class="mono">팀장으로서</p>
              <ul>${m.lead.map((t) => `<li>${keyLine(t)}</li>`).join("")}</ul>
            </div>` : ""}
        </div>
        <ul class="checks">${m.points.map((t) => `<li>${keyLine(t)}</li>`).join("")}</ul>
        ${m.formulas?.length ? `
          <div class="formulas">
            <p class="mono">formula</p>
            ${m.formulas.map((t) => `<code>${esc(t)}</code>`).join("")}
          </div>` : ""}
        ${beauty && m.notes?.length ? `
          <div class="mine-notes">
            ${m.notes.map((nt, i) => `
              <div class="mn${i % 2 ? " right" : ""}">
                <p class="hand mn-label">${esc(nt.label)}</p>
                <button class="mn-photo" type="button" data-zoom="${esc(nt.image)}" data-caption="${esc(nt.label)}" aria-label="${esc(nt.label)} 화면 크게 보기">
                  ${polaroid(nt.image, "", i % 2 ? 2 : -2)}
                </button>
                <p class="hand mn-note">${esc(nt.note)}</p>
              </div>
              ${i < m.notes.length - 1 ? `<div class="mn-arrow" aria-hidden="true">${arrow()}</div>` : ""}`).join("")}
          </div>`
        : m.image ? `
          <button class="mine-shot" type="button" data-zoom="${esc(m.image)}" data-caption="${esc(m.title)}" aria-label="${esc(m.title)} 화면 크게 보기">
            ${img(m.image, `${m.title} 화면`)}
          </button>` : ""}
        ${m.note ? `<p class="mine-note">${esc(m.note)}</p>` : ""}
      </div>
    </div>`;

  // 5. 기능: 카드를 누르면 큰 화면 + 기능 설명 창
  $("p-features").innerHTML = `
    <div class="wrap section">
      ${sectionHead(no(), `기능 ${p.features.length}가지`, "features")}
      <ul class="features${p.features.length % 3 === 2 ? " top2" : ""}">
        ${p.features.map((f, i) => `
          <li class="reveal fan">
            <button class="feature${f.mine ? " is-mine" : ""}" type="button" data-feature="${i}" data-cursor="보기" aria-label="${esc(f.name)} 자세히 보기">
              <span class="feature-img">${img(f.image, `${f.name} 화면`)}${f.more?.length ? `<span class="feature-count mono">+${f.more.length}</span>` : ""}</span>
              <span class="feature-text">
                <span class="feature-name">${esc(f.name)}${f.mine ? chip("내 담당", "pink") : ""}</span>
                <span class="feature-desc">${esc(f.desc)}</span>
                <span class="chips">${f.items.map((t) => chip(t)).join("")}</span>
                <span class="feature-more">자세히 보기 <span aria-hidden="true">↗</span></span>
              </span>
            </button>
          </li>`).join("")}
      </ul>
      <div class="stack reveal">
        <p class="mono">stack</p>
        <div class="chips">${p.stack.map((s) => chip(s)).join("")}</div>
      </div>
    </div>`;

  // 6. 결과물: 묶음(영상·포스터·웹사이트 …)별 이미지 그리드 + 누르면 크게 보기
  $("p-gallery").innerHTML = p.gallery.length ? `
    <div class="wrap section">
      ${sectionHead(no(), "결과물", "gallery")}
      ${p.gallery.map((grp) => `
        <div class="gallery-group">
          <div class="gallery-head reveal">
            <h3>${esc(grp.title)}<sup class="mono">${grp.items.length}</sup></h3>
            ${grp.note ? `<p>${esc(grp.note)}</p>` : ""}
          </div>
          ${grp.embed ? `
            <div class="embed reveal">
              <div class="frame-bar">
                <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                <span class="mono">${esc(grp.embed.replace(/^https?:\/\//, ""))}</span>
                <a class="embed-open" href="${esc(grp.embed)}" target="_blank" rel="noopener">새 창에서 열기 ↗</a>
              </div>
              <iframe src="${esc(grp.embed)}" title="${esc(grp.title)}" loading="lazy" referrerpolicy="no-referrer"></iframe>
            </div>` : ""}
          <div class="gallery${grp.shape ? ` shape-${esc(grp.shape)}` : ""}" style="--ratio:${esc(grp.ratio || "16 / 10")}${grp.cols ? `;--cols-d:${+grp.cols}${+grp.cols === 1 ? ";--cols:1" : ""}` : ""}">
            ${grp.items.map((g) => g.video ? `
              <figure class="shot is-video reveal fan">
                <span class="shot-img"><video src="${esc(g.video)}" poster="${esc(g.image)}" controls playsinline preload="none" aria-label="${esc(g.caption)} 영상"></video></span>
                <figcaption><span class="shot-cap">${esc(g.caption)}</span>${g.note ? `<span class="shot-note">${esc(g.note)}</span>` : ""}</figcaption>
              </figure>` : `
              <button class="shot reveal fan" type="button" data-zoom="${esc(g.image)}" data-caption="${esc(g.caption)}" aria-label="${esc(g.caption)} 크게 보기">
                <span class="shot-img">${img(g.image, g.caption)}</span>
                <span class="shot-cap">${esc(g.caption)}</span>
                ${g.note ? `<span class="shot-note">${esc(g.note)}</span>` : ""}
              </button>`).join("")}
          </div>
        </div>`).join("")}
    </div>` : "";

  // 7. 링크 (빈 값이면 숨김)
  const links = [
    button("서비스 열기", p.links.live, { primary: true }),
    button("코드 보기", p.links.github),
    button("브랜드 사이트", p.links.site),
  ].join("");
  $("p-links").innerHTML = links ? `
    <div class="wrap">
      <div class="links reveal">
        <p class="mono">직접 열어보기</p>
        <div class="btns">${links}</div>
      </div>
    </div>` : "";

  // 다음 프로젝트 폴더 (프로젝트가 1개뿐이면 생략)
  $("p-next").innerHTML = projects.length > 1 ? `
    <div class="wrap section">
      <div class="next reveal">
        <p class="mono">next file</p>
        <div class="next-folder">${folder(next, 0)}</div>
      </div>
    </div>` : "";

  // 영상은 한 번에 하나만 재생
  document.addEventListener("play", (e) => {
    document.querySelectorAll("video").forEach((v) => { if (v !== e.target) v.pause(); });
  }, true);

  // 결과물 크게 보기
  const lb = $("lightbox");
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector("figcaption");
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-zoom]");
    if (!t) return;
    lbImg.src = t.dataset.zoom;
    lbImg.alt = t.dataset.caption;
    lbCap.textContent = t.dataset.caption;
    lb.showModal();
  });
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest(".lb-close")) lb.close(); });

  // 기능 크게 보기: 화면(여러 장이면 탭으로 전환) + 한 줄 설명 + 기능 목록, 이전/다음 기능
  const fm = $("feature-modal");
  let cur = 0;
  const shotsOf = (f) => [{ image: f.image, caption: f.caption || "기본 화면" }, ...(f.more || [])];
  const showShot = (f, s) => {
    const shots = shotsOf(f);
    fm.querySelector(".fm-img").innerHTML = img(shots[s].image, `${f.name} · ${shots[s].caption}`, { eager: true });
    fm.querySelectorAll("[data-shot]").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.shot === s)));
  };
  const showFeature = (i) => {
    cur = (i + p.features.length) % p.features.length;
    const f = p.features[cur];
    const shots = shotsOf(f);
    fm.querySelector(".fm-body").innerHTML = `
      <div class="fm-media">
        <div class="fm-img"></div>
        ${shots.length > 1 ? `<div class="fm-shots">${shots.map((s, k) => `<button type="button" data-shot="${k}">${esc(s.caption)}</button>`).join("")}</div>` : ""}
      </div>
      <div class="fm-text">
        <p class="mono">${pad2(cur + 1)} / ${pad2(p.features.length)}</p>
        <h3>${esc(f.name)}${f.mine ? chip("내 담당", "pink") : ""}</h3>
        <p class="fm-desc">${esc(f.desc)}</p>
        <ol class="fm-details">${(f.details || f.items).map((t) => `<li>${keyLine(t)}</li>`).join("")}</ol>
      </div>`;
    showShot(f, 0);
  };
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-feature]");
    if (!t) return;
    showFeature(+t.dataset.feature);
    fm.showModal();
  });
  fm.addEventListener("click", (e) => {
    const shot = e.target.closest("[data-shot]");
    if (e.target === fm || e.target.closest(".lb-close")) fm.close();
    else if (shot) showShot(p.features[cur], +shot.dataset.shot);
    else if (e.target.closest(".fm-prev")) showFeature(cur - 1);
    else if (e.target.closest(".fm-next")) showFeature(cur + 1);
  });
  fm.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showFeature(cur - 1);
    if (e.key === "ArrowRight") showFeature(cur + 1);
  });

  // 상단 바: 지금 보고 있는 섹션 표시
  const navLinks = [...document.querySelectorAll(".p-nav a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("on", a.hash === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => { const s = document.querySelector(a.hash); if (s && s.innerHTML) spy.observe(s); else a.hidden = true; });

  reveal();
  progressBar();
})();
