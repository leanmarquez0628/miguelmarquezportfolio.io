/* =========================================================
Lean Marquez — Personal Website | script.js
EDIT THE THINGS MARKED  >>> CHANGE ME <<<
========================================================= */

/* >>> CHANGE ME: the email that the contact form sends to <<< */
const MY_EMAIL = "leanmarquez0628@yahoo.com";

/* >>> CHANGE ME: your phone number and social links <<< */
const MY_PHONE = "+63 9213584345"; // how the number is shown on the page
const MY_PHONE_DIGITS = "639213584345"; // same number, digits only (used for call, WhatsApp and Viber links)
const MY_FACEBOOK = "https://facebook.com/Deadpool.Marquez.23";
const MY_INSTAGRAM = "https://instagram.com/lnmglmrqz";
const MY_TIKTOK = "https://tiktok.com/@lnmglmrq";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------------------------------------------------------
   1. THEME (dark / light)
   --------------------------------------------------------- */
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {
  /* storage not available */
}
$("#themeBtn").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

/* ---------------------------------------------------------
   2. NAVIGATION (mobile menu, active link, progress bar)
   --------------------------------------------------------- */
const links = $("#links");
$("#burger").addEventListener("click", () => links.classList.toggle("open"));
$$("#links a").forEach((a) =>
  a.addEventListener("click", () => links.classList.remove("open")),
);

const sections = $$("main section[id]");
const navLinks = $$("#links a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + en.target.id,
          ),
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
sections.forEach((s) => spy.observe(s));

addEventListener(
  "scroll",
  () => {
    const h = document.documentElement;
    $("#progress").style.width =
      (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
  },
  { passive: true },
);

$("#year").textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   3. TYPING EFFECT (hero roles + section headings)
   --------------------------------------------------------- */
/* >>> CHANGE ME: the roles that type in the hero <<< */
const ROLES = [
  "a Civil Engineering Graduate",
  "an Aspiring Data Analyst",
  "an Aspiring Web Developer",
  "an Aspiring Digital and Photography Artist",
  "an Art Artist",
];
(function heroTyping() {
  const el = $("#typed");
  let r = 0,
    c = 0,
    del = false;
  (function tick() {
    const word = ROLES[r];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) {
      del = true;
      return setTimeout(tick, 1400);
    }
    if (del && c === 0) {
      del = false;
      r = (r + 1) % ROLES.length;
    }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 85);
  })();
})();

function typeHeading(el) {
  const text = el.textContent.trim();
  el.textContent = "";
  el.classList.add("typing");
  let i = 0;
  const t = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) {
      clearInterval(t);
      setTimeout(() => el.classList.remove("typing"), 1200);
    }
  }, 70);
}

/* ---------------------------------------------------------
   4. SCROLL REVEAL + COUNTERS
   --------------------------------------------------------- */
const reveal = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add("in");
      if (el.matches("[data-type]")) typeHeading(el);
      if (el.matches("[data-count]")) countUp(el);
      obs.unobserve(el);
    });
  },
  { threshold: 0.18 },
);
$$(".reveal, [data-type], [data-count]").forEach((el) => {
  if (el.matches("[data-type]")) {
    el.dataset.full = el.textContent;
    el.style.minHeight = "1em";
    el.style.visibility = "visible";
  }
  reveal.observe(el);
});

function countUp(el) {
  const end = +el.dataset.count;
  let n = 0;
  const t = setInterval(
    () => {
      el.textContent = ++n;
      if (n >= end) clearInterval(t);
    },
    1000 / (end + 4),
  );
}

const pad = (n) => String(n).padStart(2, "0");

/* ---------------------------------------------------------
   7. CONTACT CARDS (details come from the settings at the top)
   --------------------------------------------------------- */
const short = (u) => u.replace(/^https?:\/\/(www\.)?/, "");
$("#mailCard").href = "mailto:" + MY_EMAIL;
$("#mailShow").textContent = MY_EMAIL;
$("#phoneCard").href = "tel:+" + MY_PHONE_DIGITS;
$("#phoneShow").textContent = MY_PHONE;
$("#fbCard").href = MY_FACEBOOK;
$("#fbShow").textContent = short(MY_FACEBOOK);
$("#ttCard").href = MY_TIKTOK;
$("#ttShow").textContent = short(MY_TIKTOK);

/* ---------------------------------------------------------
   8. WEB DEVELOPMENT PROJECTS (screenshot slideshow)
   --------------------------------------------------------- */
/* >>> CHANGE ME: add more projects or screenshots. Put the pictures in images/projects/ <<< */
const PROJECTS = [
  {
    name: "MotoGP Legends",
    url: "motogp-legends.html",
    desc: "A multi-section website about the MotoGP teams, their champions and the 22 rounds of a season. It has a full-screen hero, a page for each manufacturer with its key facts, and a scrolling race-track gallery.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive layout"],
    shots: [
      {
        img: "images/projects/motogp-hero.jpg",
        alt: "MotoGP Team Legends home page",
        caption: "Home page: full-screen hero with the site menu.",
      },
      {
        img: "images/projects/motogp-ducati.jpg",
        alt: "Ducati Lenovo Team page",
        caption: "Team page: key facts, riders and bike for Ducati Lenovo.",
      },
      {
        img: "images/projects/motogp-yamaha.jpg",
        alt: "Yamaha Racing page",
        caption: "Team page: the same layout for Yamaha Racing.",
      },
      {
        img: "images/projects/motogp-tracks.jpg",
        alt: "The 22 race tracks gallery",
        caption: "Race tracks: swipe through all 22 rounds of the season.",
      },
    ],
  },
  {
    name: "F1 Legends",
    url: "f1-legends.html",
    desc: "A Formula 1 team-history website with a menu for McLaren, Mercedes, Ferrari, Red Bull, Williams and Alpine. Each team page shows facts, 2026 drivers and standings, and there is a race-calendar slider and a team search box.",
    tags: ["HTML", "CSS", "JavaScript", "Team search", "Slider"],
    shots: [
      {
        img: "images/projects/f1-hero.jpg",
        alt: "F1 Legends home page",
        caption: "Home page: animated race-track background and the team menu.",
      },
      {
        img: "images/projects/f1-mclaren.jpg",
        alt: "McLaren team page",
        caption: "Team page: McLaren facts, history and photo grid.",
      },
      {
        img: "images/projects/f1-mclaren-standing.jpg",
        alt: "McLaren 2026 drivers and standing",
        caption: "2026 drivers and constructor standing for McLaren.",
      },
      {
        img: "images/projects/f1-mercedes.jpg",
        alt: "Mercedes team page",
        caption: "Team page: the same layout for Mercedes-AMG Petronas.",
      },
      {
        img: "images/projects/f1-mercedes-standing.jpg",
        alt: "Mercedes 2026 drivers and standing",
        caption: "2026 drivers and constructor standing for Mercedes.",
      },
      {
        img: "images/projects/f1-ferrari.jpg",
        alt: "Ferrari team page",
        caption: "Team page: Scuderia Ferrari HP with its key facts.",
      },
      {
        img: "images/projects/f1-ferrari-standing.jpg",
        alt: "Ferrari 2026 drivers and standing",
        caption: "2026 drivers and constructor standing for Ferrari.",
      },
      {
        img: "images/projects/f1-championship.jpg",
        alt: "Drivers and Constructor Championship",
        caption: "Championship section: a picture carousel of the champions.",
      },
      {
        img: "images/projects/f1-calendar.jpg",
        alt: "Race calendar slider",
        caption: "Race calendar: every round, one slide away.",
      },
    ],
  },
  {
    name: "My Personal Website",
    url: "lean-marquez-website.html",
    desc: "This portfolio website, built from scratch with HTML, CSS and JavaScript. It has a floating menu, typing headings, a dark and light mode switch, project slideshows, a tools section and contact cards.",
    tags: ["HTML", "CSS", "JavaScript", "Dark mode", "Responsive layout"],
    shots: [
      {
        img: "images/projects/site-home.jpg",
        alt: "Personal website home page",
        caption:
          "Home page: my name, typing roles and photo, shown in dark mode.",
      },
      {
        img: "images/projects/site-projects.jpg",
        alt: "Personal website projects",
        caption:
          "Projects: tabs and a slideshow for each web development project.",
      },
      {
        img: "images/projects/site-construction.jpg",
        alt: "Personal website construction",
        caption:
          "Construction: my SketchUp capstone renders in their own slideshow.",
      },
      {
        img: "images/projects/site-services.jpg",
        alt: "Personal website services",
        caption: "Services: cards for the work I can do.",
      },
      {
        img: "images/projects/site-tools.jpg",
        alt: "Personal website tools",
        caption:
          "Tools I Use: Microsoft Office, Google Workspace, design and social apps.",
      },
    ],
  },
  {
    name: "Drawing & Art Gallery",
    url: "Art-De-Gallery.html",
    ratio: "1500 / 702",
    desc: "A separate website for my drawings, built with HTML, CSS and JavaScript. It has a hand-drawn grid look, polaroid-style artwork, a filterable work gallery (anime fan art and pencil portraits), a sketchbook strip, and a services section with prices.",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Gallery filter",
      "Dark mode",
      "Responsive layout",
    ],
    shots: [
      {
        img: "images/projects/art-home.jpg",
        alt: "Art gallery home page",
        caption: 'Home: "I draw what I imagine." with polaroid-style drawings.',
      },
      {
        img: "images/projects/art-about.jpg",
        alt: "Art gallery about page",
        caption:
          "About me: a pencil-portrait carousel, my mediums and quick stats.",
      },
      {
        img: "images/projects/art-services.jpg",
        alt: "Art gallery services",
        caption: "Services: what I can draw for you, with starting prices.",
      },
      {
        img: "images/projects/art-gallery.jpg",
        alt: "Art gallery work gallery",
        caption:
          "My work gallery: filter by anime fan art or pencil portraits.",
      },
      {
        img: "images/projects/art-sketchbook.jpg",
        alt: "Art gallery sketchbook",
        caption: "Sketchbook: a strip of my colored fan art.",
      },
    ],
  },
];
const DATA_WORKS = [
  {
    name: "Retail Sales Dashboard (Excel)",
    url: "retail-sales-dashboard-2024",
    kind: "Made by me · Data analytics",
    ratio: "1500 / 711",
    desc: "A Retail Sales Performance Dashboard (2024) built in Excel. I cleaned the raw sales data, summarized it with pivot tables, and built an interactive dashboard with slicers (month, sales representative, category, region), KPI cards for orders, quantity, discount, cost, profit and revenue, and charts for sales by month, representative, region and product.",
    tags: ["Excel", "Pivot Tables", "Dashboard", "Data Analytics"],
    shots: [
      {
        img: "images/projects/da-dashboard-1.jpg",
        alt: "Retail sales dashboard top",
        caption:
          "Dashboard: KPI cards, slicers, total cost and profit, and sales by month.",
      },
      {
        img: "images/projects/da-dashboard-2.jpg",
        alt: "Retail sales dashboard charts",
        caption:
          "Dashboard: net and gross revenue, customer segments, sales by representative, region and product.",
      },
      {
        img: "images/projects/da-rawdata.jpg",
        alt: "Raw sales data sheet",
        caption:
          "Raw Data: orders with region, category, product, quantity, price, cost, discount and profit.",
      },
      {
        img: "images/projects/da-pivot.jpg",
        alt: "Pivot table sheet",
        caption:
          "Pivot Table: totals by month, region, representative, category and product.",
      },
    ],
  },
];
const CONSTRUCTION = [
  {
    name: "GSIS Building (SketchUp)",
    url: "gsis-building-sketchup",
    kind: "Made by me · Capstone project",
    desc: "3D design of a three-storey Government Service Insurance System (GSIS) office building for Sitio Mat-E, Brgy. Santo Domingo, Vinzons, Camarines Norte. I modeled it in SketchUp as part of my civil engineering capstone, with glass curtain walls, a stone-cladded sign wall, a flag area and a landscaped entrance.",
    tags: ["SketchUp", "3D modeling", "Civil Engineering", "Capstone"],
    shots: [
      {
        img: "images/projects/gsis-1.jpg",
        alt: "GSIS building front-left view",
        caption:
          "Corner view: the GSIS sign wall, glass facade and entrance ramp.",
      },
      {
        img: "images/projects/gsis-2.jpg",
        alt: "GSIS building front view",
        caption: "Front view: main entrance, flags and landscaped planters.",
      },
      {
        img: "images/projects/gsis-3.jpg",
        alt: "GSIS building front-right view",
        caption:
          "Front-right view: wood-finish fins and three floors of glass.",
      },
      {
        img: "images/projects/gsis-4.jpg",
        alt: "GSIS building street view",
        caption: "Front view from the street with the full facade.",
      },
      {
        img: "images/projects/gsis-5.jpg",
        alt: "GSIS building low-angle view",
        caption:
          "Low-angle view: the brick-pattern sign wall and entrance steps.",
      },
    ],
  },
  {
    name: "Cost Estimation (Excel)",
    url: "cost-estimation-one-storey-residential",
    kind: "Made by me · Cost estimation",
    ratio: "3 / 2",
    desc: "Cost estimation of a one-storey residential building in Barangay VI, Pineapple Street, Purok 3, Daet, Camarines Norte. I prepared the materials, equipment and labor take-offs in Excel for the earthworks, structural, plumbing and architectural works, then summed them up with profit/OCM and VAT into an item cost.",
    tags: [
      "Excel",
      "Cost estimation",
      "Quantity take-off",
      "Civil Engineering",
    ],
    shots: [
      {
        img: "images/projects/cost-summary.jpg",
        alt: "Total cost estimation summary",
        caption:
          "Total cost estimation: direct cost, profit/OCM and VAT per work item.",
      },
      {
        img: "images/projects/cost-structural.jpg",
        alt: "Structural works materials",
        caption:
          "Structural works: materials and equipment for flooring and footing.",
      },
      {
        img: "images/projects/cost-plumbing.jpg",
        alt: "Plumbing works materials",
        caption: "Plumbing works: cold water and sewage system materials.",
      },
      {
        img: "images/projects/cost-labor.jpg",
        alt: "Labor cost",
        caption:
          "Labor cost: foreman, skilled labor and laborers for each work type.",
      },
    ],
  },
];
function slideshow(P, LIST) {
  const box = $("#" + P + "Slides"),
    dots = $("#" + P + "Dots"),
    tabs = $("#" + P + "Tabs");
  let p = 0,
    i = 0,
    timer;
  tabs.hidden = LIST.length < 2;
  tabs.innerHTML = LIST.map(
    (x, n) => `<button class="tab" data-p="${n}" role="tab">${x.name}</button>`,
  ).join("");

  function load(n) {
    p = n;
    i = 0;
    const pr = LIST[p];
    box.style.aspectRatio = pr.ratio || "";
    $$(".tab", tabs).forEach((t, k) => t.classList.toggle("active", k === p));
    box.innerHTML = pr.shots
      .map((s) => `<img src="${s.img}" alt="${s.alt}" loading="lazy" />`)
      .join("");
    dots.innerHTML = pr.shots
      .map((s, k) => `<button aria-label="Screenshot ${k + 1}"></button>`)
      .join("");
    $$("button", dots).forEach((d, k) =>
      d.addEventListener("click", () => {
        go(k);
        play();
      }),
    );
    $("#" + P + "Url").textContent = pr.url;
    $("#" + P + "Kind").textContent = pr.kind || "Made by me · School project";
    $("#" + P + "Title").textContent = pr.name;
    $("#" + P + "Desc").textContent = pr.desc;
    $("#" + P + "Tags").innerHTML = pr.tags
      .map((t) => `<span>${t}</span>`)
      .join("");
    const multi = pr.shots.length > 1;
    $("#" + P + "Prev").hidden =
      $("#" + P + "Next").hidden =
      $("#" + P + "Ui").hidden =
        !multi;
    go(0);
    play();
  }
  function go(n) {
    const shots = LIST[p].shots;
    i = (n + shots.length) % shots.length;
    $$("img", box).forEach((im, k) => im.classList.toggle("active", k === i));
    $$("button", dots).forEach((d, k) => d.classList.toggle("active", k === i));
    $("#" + P + "Count").textContent = pad(i + 1) + " / " + pad(shots.length);
    $("#" + P + "Caption").textContent = shots[i].caption;
  }
  function play() {
    clearInterval(timer);
    if (LIST[p].shots.length > 1) timer = setInterval(() => go(i + 1), 5000);
  }
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (b) load(+b.dataset.p);
  });
  $("#" + P + "Next").addEventListener("click", () => {
    go(i + 1);
    play();
  });
  $("#" + P + "Prev").addEventListener("click", () => {
    go(i - 1);
    play();
  });
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  });
  box.parentElement.addEventListener("mouseenter", () => clearInterval(timer));
  box.parentElement.addEventListener("mouseleave", play);
  load(0);
}
slideshow("proj", PROJECTS);
slideshow("con", CONSTRUCTION);
slideshow("da", DATA_WORKS);

/* ---------------------------------------------------------
   9. TOOLS I USE
   --------------------------------------------------------- */
/* >>> CHANGE ME: add / remove tools. Use txt: 'AB' for a letter icon. <<< */
const TOOLS = [
  {
    group: "Microsoft Office",
    items: [
      { name: "Word", color: "#2b579a", txt: "W" },
      { name: "Excel", color: "#217346", txt: "X" },
      { name: "PowerPoint", color: "#d24726", txt: "P" },
      { name: "OneNote", color: "#7719aa", txt: "N" },
      { name: "Publisher", color: "#077568", txt: "P" },
      { name: "Power BI", color: "#d99a00", txt: "BI" },
      { name: "Teams", color: "#6264a7", txt: "T" },
    ],
  },
  {
    group: "Google Workspace",
    items: [
      {
        name: "Docs",
        color: "#4285F4",
        svg: "M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zm-.545 10.455H7.09v-1.364h7.09v1.364zm2.727-3.273H7.091v-1.364h9.818v1.364zm0-3.273H7.091V9.273h9.818v1.363zM14.727 6h6l-6-6v6z",
      },
      {
        name: "Sheets",
        color: "#34A853",
        svg: "M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z",
      },
      {
        name: "Slides",
        color: "#FBBC04",
        svg: "M16.09 15.273H7.91v-4.637h8.18v4.637zm1.728-8.523h2.91v15.614c0 .904-.733 1.636-1.637 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.068v6.75h3.841zm-.363 2.523H6.545v7.363h10.91V9.273zm-2.728-5.979V6h6.001l-6-6v3.294z",
      },
      {
        name: "Drive",
        color: "#4285F4",
        svg: "M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z",
      },
      {
        name: "Calendar",
        color: "#4285F4",
        svg: "M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z",
      },
      {
        name: "Meet",
        color: "#00897B",
        svg: "M5.53 2.13 0 7.75h5.53zm.398 0v5.62h7.608v3.65l5.47-4.45c-.014-1.22.031-2.25-.025-3.46-.148-1.09-1.287-1.47-2.236-1.36zM23.1 4.32c-.802.295-1.358.995-2.047 1.49-2.506 2.05-4.982 4.12-7.468 6.19 3.025 2.59 6.04 5.18 9.065 7.76 1.218.671 1.428-.814 1.328-1.64v-13a.828.828 0 0 0-.877-.825zM.038 8.15v7.7h5.53v-7.7zm13.577 8.1H6.008v5.62c3.864-.006 7.737.011 11.58-.009 1.02-.07 1.618-1.12 1.468-2.07v-2.51l-5.47-4.68v3.65zm-13.577 0c.02 1.44-.041 2.88.033 4.31.162.948 1.158 1.43 2.047 1.31h3.464v-5.62z",
      },
    ],
  },
  {
    group: "Coding & Design",
    items: [
      { name: "Visual Studio Code", color: "#007acc", txt: "VS" },
      {
        name: "Figma",
        color: "#F24E1E",
        svg: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z",
      },
      {
        name: "SketchUp",
        color: "#005f9e",
        svg: "M.968 9.027l7.717 4.428-.006 1.32-4.39-2.518-2.763 1.57 7.148 4.12.005 1.27-7.658-4.405c.02.516.488 2.106 1.383 3.337.91 1.247 1.946 1.776 1.946 1.776L11.428 24V11.849L.975 5.846zm22.064-3.8L15.22.723S13.982 0 12.008 0C9.952 0 8.76.746 8.76.746l-7.236 4.14 11.009 6.328V24l7.245-4.136s1.295-.715 2.279-2.414c.867-1.496.975-2.943.975-2.943zM11.251 7.308s1.615-.298 2.98.49l2.171 1.25s.003 1.097.003 2.736c0 1.313-1.112 2.674-1.112 2.674l.002-4.816zm6.402 10.562l-2.358 1.353v-1.269l1.835-1.05c1.748-1.26 2.037-3.117 2.037-3.761l-.007-5.705-5.006-2.881s-.76-.499-2.129-.499c-1.367 0-2.113.461-2.113.461L8.154 5.53l-1.11-.641L9.473 3.5s.95-.527 2.544-.527c1.462 0 2.6.571 2.6.571L20.27 6.81l-.007 6.226c.04.957-.406 3.296-2.61 4.835z",
      },
      { name: "SQL Server Management Studio 22", color: "#cc2927", txt: "SQL" },
      {
        name: "AutoCAD",
        color: "#E51050",
        svg: "M3.8672 1.0527v.0157L0 3.3848v17.914l3.8965-2.332h18.3398V2.3301c0-.702-.5773-1.2774-1.2793-1.2774H3.8672zm7.5058 4.0098h3.3008l2.9844 9.9512h-2.5879l-.5683-2.1895h-2.9844l-.5703 2.1621h-2.416l2.8417-9.9238zm11.8633.0273v14.877H4.172l-2.0684 1.2383v.4648c0 .702.5793 1.2774 1.2813 1.2774H24V5.0898h-.7637zM12.9668 6.6816l-.9941 4.3243h2.0468l-1.0527-4.3243z",
      },
    ],
  },
  {
    group: "Email",
    items: [
      { name: "Outlook", color: "#0078d4", txt: "O" },
      {
        name: "Gmail",
        color: "#EA4335",
        svg: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
      },
      { name: "Yahoo Mail", color: "#6001d2", txt: "Y" },
    ],
  },
  {
    group: "Editing",
    items: [
      { name: "Canva", color: "#00a9b5", txt: "C" },
      { name: "CapCut", color: "ink", txt: "CC" },
      { name: "Adobe Photoshop", color: "#31a8ff", txt: "Ps" },
    ],
  },
  {
    group: "Social Media",
    items: [
      {
        name: "Facebook",
        color: "#0866FF",
        svg: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
      },
      {
        name: "Instagram",
        color: "#FF0069",
        svg: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
      },
      {
        name: "TikTok",
        color: "ink",
        svg: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
      },
    ],
  },
];

$("#toolGroups").innerHTML = TOOLS.map(
  (g) => `
  <div class="tool-group reveal">
<h3>${g.group}</h3>
<ul>${g.items
    .map((t) => {
      const col = t.color === "ink" ? "var(--ink)" : t.color;
      const glyph = t.svg
        ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${t.svg}"/></svg>`
        : `<span class="letters">${t.txt}</span>`;
      return `<li class="tool"><span class="tile" style="--c:${col}">${glyph}</span><b>${t.name}</b></li>`;
    })
    .join("")}</ul>
  </div>`,
).join("");
$$("#toolGroups .reveal").forEach((el) => reveal.observe(el));

/* ---------------------------------------------------------
   10. SOCIAL MEDIA CONTACT BUTTONS
   --------------------------------------------------------- */
/* (links come from the settings at the top of this file) */
const SOCIALS = [
  {
    name: "Facebook",
    url: MY_FACEBOOK,
    svg: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    name: "Instagram",
    url: MY_INSTAGRAM,
    svg: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    name: "Viber",
    url: "viber://chat?number=%2B" + MY_PHONE_DIGITS,
    svg: "M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/" + MY_PHONE_DIGITS,
    svg: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  },
  {
    name: "TikTok",
    url: MY_TIKTOK,
    svg: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
];
$("#socials").innerHTML = SOCIALS.map(
  (s) => `
  <li><a class="soc" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${s.svg}"/></svg><span>${s.name}</span></a></li>`,
).join("");

/* ---------- My Works: one menu switches between the three groups ---------- */
{
  const counts = {
    PROJECTS: PROJECTS.length,
    CONSTRUCTION: CONSTRUCTION.length,
    DATA_WORKS: DATA_WORKS.length,
  };
  document.querySelectorAll(".wi-count").forEach((el) => {
    const n = counts[el.dataset.list];
    el.textContent = n + (n === 1 ? " project" : " projects");
  });
  const items = document.querySelectorAll(".works-item"),
    panes = document.querySelectorAll(".works-pane");
  items.forEach((btn) =>
    btn.addEventListener("click", () => {
      items.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on);
      });
      panes.forEach((p) =>
        p.classList.toggle("active", p.id === "pane-" + btn.dataset.pane),
      );
    }),
  );
}
