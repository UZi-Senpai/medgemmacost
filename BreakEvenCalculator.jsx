:root {
  /* Light base palette */
  --bg: #f6f9fe;
  --bg-soft: #eef4ff;
  --surface: #ffffff;
  --surface-2: #fbfdff;
  --text: #0f172a;
  --text-soft: #334155;
  --muted: #64748b;
  --border: #e2e8f5;
  --border-strong: #cdd9ee;

  /* Blue neon gradient accents */
  --neon-1: #22d3ee; /* cyan  */
  --neon-2: #1e90ff; /* azure */
  --neon-3: #6366f1; /* indigo*/
  --gradient-neon: linear-gradient(120deg, var(--neon-1), var(--neon-2) 45%, var(--neon-3));
  --gradient-neon-soft: linear-gradient(120deg, rgba(34,211,238,.14), rgba(30,144,255,.14) 45%, rgba(99,102,241,.18));

  /* Semantic accents */
  --good: #10b981;
  --good-soft: #ecfdf5;
  --warn: #f59e0b;
  --warn-soft: #fffbeb;
  --danger: #ef4444;
  --danger-soft: #fef2f2;
  --best: #6d28d9;
  --best-soft: #f3eefe;

  --radius: 16px;
  --radius-sm: 10px;
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, .06), 0 1px 3px rgba(15, 23, 42, .04);
  --shadow-md: 0 10px 30px -12px rgba(30, 84, 165, .25), 0 2px 6px rgba(15, 23, 42, .05);
  --shadow-glow: 0 0 0 1px rgba(30, 144, 255, .12), 0 18px 50px -20px rgba(30, 144, 255, .45);

  --maxw: 1120px;
  --font: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; scroll-padding-top: 90px; }

body {
  margin: 0;
  font-family: var(--font);
  color: var(--text);
  background:
    radial-gradient(1200px 600px at 12% -8%, rgba(34, 211, 238, .16), transparent 60%),
    radial-gradient(1000px 500px at 92% 0%, rgba(99, 102, 241, .16), transparent 55%),
    var(--bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  line-height: 1.6;
}

a { color: var(--neon-2); text-decoration: none; }
a:hover { text-decoration: underline; }

::selection { background: rgba(30, 144, 255, .22); }

/* ---------- Layout ---------- */
.wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }

/* ---------- Nav ---------- */
.nav {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: saturate(160%) blur(14px);
  background: rgba(246, 249, 254, .82);
  border-bottom: 1px solid var(--border);
}
.nav__inner {
  display: flex; align-items: center; gap: 20px;
  height: 64px;
}
.brand { display: flex; align-items: center; gap: 12px; font-weight: 800; letter-spacing: -.01em; }
.brand__mark {
  width: 34px; height: 34px; border-radius: 10px;
  background: var(--gradient-neon);
  display: grid; place-items: center; color: #fff; font-weight: 900;
  box-shadow: 0 6px 18px -6px rgba(30,144,255,.6);
}
.brand__name { font-size: 16px; }
.brand__name span {
  background: var(--gradient-neon);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.nav__links { margin-left: auto; display: flex; gap: 6px; flex-wrap: wrap; }
.nav__links a {
  padding: 8px 12px; border-radius: 999px; font-size: 14px; font-weight: 500;
  color: var(--text-soft); text-decoration: none; transition: .15s;
}
.nav__links a:hover { color: var(--text); background: var(--bg-soft); text-decoration: none; }
.nav__cta {
  margin-left: 8px; padding: 9px 16px; border-radius: 999px; font-weight: 700; font-size: 14px;
  color: #fff; background: var(--gradient-neon); box-shadow: 0 8px 20px -8px rgba(30,144,255,.7);
  text-decoration: none;
}
.nav__cta:hover { text-decoration: none; transform: translateY(-1px); }

/* ---------- Hero ---------- */
.hero { position: relative; padding: 88px 0 56px; overflow: hidden; }
.hero__eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600;
  color: var(--neon-3); background: var(--gradient-neon-soft);
  border: 1px solid rgba(99,102,241,.18);
}
.hero__eyebrow .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--neon-2); box-shadow: 0 0 0 4px rgba(30,144,255,.15); }
.hero h1 {
  font-size: clamp(34px, 5.6vw, 60px); line-height: 1.05; letter-spacing: -.02em;
  margin: 22px 0 0; font-weight: 850;
}
.hero h1 .grad {
  background: var(--gradient-neon);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero p.lead { margin: 22px 0 0; font-size: clamp(16px, 2vw, 20px); color: var(--text-soft); max-width: 720px; }
.hero__meta { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px; color: var(--muted); font-size: 14px; }
.hero__meta .chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 12px; border-radius: 999px; background: var(--surface);
  border: 1px solid var(--border); box-shadow: var(--shadow-sm);
}
.hero__stats { margin-top: 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 760px){ .hero__stats { grid-template-columns: repeat(2, 1fr); } }

.stat {
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 18px 18px 16px; box-shadow: var(--shadow-sm); position: relative; overflow: hidden;
}
.stat::before { content:""; position:absolute; inset: 0 auto 0 0; width: 4px; background: var(--gradient-neon); }
.stat__num {
  font-size: 30px; font-weight: 850; letter-spacing: -.02em;
  background: var(--gradient-neon); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.stat__label { color: var(--muted); font-size: 13px; margin-top: 2px; }

/* ---------- Section ---------- */
.section { padding: 64px 0; }
.section__head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 28px; }
.section__num {
  font-family: var(--mono); font-size: 14px; font-weight: 700; color: #fff;
  background: var(--gradient-neon); padding: 6px 10px; border-radius: 8px;
  box-shadow: 0 6px 16px -8px rgba(30,144,255,.7);
}
.section__title { font-size: clamp(26px, 3.4vw, 36px); font-weight: 800; letter-spacing: -.02em; margin: 0; }
.section__sub { color: var(--muted); margin: 6px 0 0; }

.divider { height: 1px; background: linear-gradient(90deg, transparent, var(--border-strong), transparent); margin: 8px 0; }

/* ---------- Prose ---------- */
.prose p { margin: 14px 0; color: var(--text-soft); }
.prose strong { color: var(--text); }
.prose ul { margin: 14px 0; padding-left: 22px; color: var(--text-soft); }
.prose li { margin: 8px 0; }
.prose ul li::marker { color: var(--neon-2); }
.prose code {
  font-family: var(--mono); font-size: .9em;
  background: var(--bg-soft); border: 1px solid var(--border);
  padding: 2px 7px; border-radius: 6px; color: var(--neon-3);
}

/* ---------- Cards grid ---------- */
.grid { display: grid; gap: 18px; }
.grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 900px){ .grid.cols-3, .grid.cols-4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px){ .grid.cols-2, .grid.cols-3, .grid.cols-4 { grid-template-columns: 1fr; } }

.card {
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 22px; box-shadow: var(--shadow-sm); transition: .18s transform, .18s box-shadow;
}
.card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.card h3 { margin: 0 0 6px; font-size: 18px; font-weight: 800; }
.card p { margin: 0; color: var(--text-soft); font-size: 14.5px; }
.card .tag { display:inline-block; font-size:12px; font-weight:700; padding:4px 10px; border-radius:999px; margin-bottom:10px; }

/* ---------- Callout ---------- */
.callout {
  display: flex; gap: 14px; padding: 18px 20px; border-radius: var(--radius);
  border: 1px solid var(--border); background: var(--surface);
  box-shadow: var(--shadow-sm); margin: 22px 0;
}
.callout__icon {
  flex: 0 0 auto; width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center;
  background: var(--gradient-neon-soft); color: var(--neon-3); font-weight: 800;
}
.callout--gradient { background: var(--gradient-neon-soft); border-color: rgba(99,102,241,.2); }
.callout--good { background: var(--good-soft); border-color: rgba(16,185,129,.25); }
.callout--good .callout__icon { background: rgba(16,185,129,.14); color: var(--good); }
.callout--warn { background: var(--warn-soft); border-color: rgba(245,158,11,.28); }
.callout--warn .callout__icon { background: rgba(245,158,11,.16); color: var(--warn); }
.callout--danger { background: var(--danger-soft); border-color: rgba(239,68,68,.25); }
.callout--danger .callout__icon { background: rgba(239,68,68,.14); color: var(--danger); }
.callout p { margin: 4px 0 0; color: var(--text-soft); }
.callout strong { color: var(--text); }

/* ---------- Tables ---------- */
.table-wrap {
  overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--surface); box-shadow: var(--shadow-sm);
}
table { border-collapse: collapse; width: 100%; font-size: 14.5px; min-width: 520px; }
thead th {
  text-align: left; padding: 14px 16px; font-size: 12.5px; text-transform: uppercase;
  letter-spacing: .05em; color: var(--muted); font-weight: 700;
  background: var(--bg-soft); border-bottom: 1px solid var(--border);
  position: sticky; top: 0;
}
tbody td { padding: 13px 16px; border-bottom: 1px solid var(--border); color: var(--text-soft); vertical-align: top; }
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover { background: var(--surface-2); }
td .pill, th .pill { white-space: nowrap; }
.pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 10px; border-radius: 999px; font-size: 13px; font-weight: 700;
  background: var(--bg-soft); border: 1px solid var(--border); color: var(--text);
}
.pill--neon { color: #fff; background: var(--gradient-neon); border: none; }
.pill--good { background: var(--good-soft); color: var(--good); border-color: rgba(16,185,129,.25); }
.pill--best { background: var(--best-soft); color: var(--best); border-color: rgba(109,40,217,.22); }
.pill--warn { background: var(--warn-soft); color: var(--warn); border-color: rgba(245,158,11,.28); }
.pill--danger { background: var(--danger-soft); color: var(--danger); border-color: rgba(239,68,68,.25); }
.num { font-family: var(--mono); font-weight: 700; color: var(--text); }
td strong { color: var(--text); }

.table-caption { font-size: 13px; color: var(--muted); margin: 8px 2px 0; }

/* ---------- Two-column comparison ---------- */
.versus { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
@media (max-width: 760px){ .versus { grid-template-columns: 1fr; } }
.vs-col { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px; box-shadow: var(--shadow-sm); }
.vs-col h3 { margin-top: 0; display:flex; align-items:center; gap:10px; }
.vs-col ul { padding-left: 20px; color: var(--text-soft); }
.vs-col li { margin: 8px 0; }

/* ---------- Calculator ---------- */
.calc {
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  box-shadow: var(--shadow-md); padding: 26px; position: relative; overflow: hidden;
}
.calc::after {
  content:""; position:absolute; right:-60px; top:-60px; width: 220px; height: 220px; border-radius: 50%;
  background: var(--gradient-neon); opacity: .12; filter: blur(10px);
}
.calc__grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 26px; align-items: center; position: relative; z-index: 1; }
@media (max-width: 760px){ .calc__grid { grid-template-columns: 1fr; } }
.calc label { display:block; font-size: 13px; font-weight: 600; color: var(--muted); margin: 14px 0 6px; }
.calc select, .calc input[type="number"] {
  width: 100%; padding: 12px 14px; border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong); background: var(--surface-2);
  font-size: 15px; color: var(--text); font-family: var(--font);
}
.calc select:focus, .calc input:focus { outline: 2px solid rgba(30,144,255,.45); border-color: var(--neon-2); }
.calc__range-wrap { display: flex; align-items: center; gap: 14px; }
.calc input[type="range"] { accent-color: var(--neon-2); flex: 1; }
.calc__range-val { font-family: var(--mono); font-weight: 800; min-width: 70px; text-align: right; color: var(--neon-3); }
.calc__result {
  background: var(--gradient-neon-soft); border: 1px solid rgba(99,102,241,.22);
  border-radius: var(--radius); padding: 22px; text-align: center;
}
.calc__result .big {
  font-size: 40px; font-weight: 850; letter-spacing: -.02em;
  background: var(--gradient-neon); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.calc__result .sub { color: var(--muted); font-size: 13px; margin-top: 4px; }
.calc__rows { margin-top: 16px; display: grid; gap: 8px; text-align: left; }
.calc__row { display:flex; justify-content: space-between; font-size: 14px; padding: 8px 12px; border-radius: 10px; background: rgba(255,255,255,.6); }
.calc__row b { font-family: var(--mono); }

/* ---------- Final answer banner ---------- */
.final {
  position: relative; overflow: hidden; border-radius: 22px; padding: 40px;
  color: #fff; background: var(--gradient-neon); box-shadow: var(--shadow-glow);
}
.final::before {
  content:""; position:absolute; inset:0; background:
    radial-gradient(600px 200px at 10% 0%, rgba(255,255,255,.25), transparent 60%),
    radial-gradient(500px 200px at 90% 100%, rgba(255,255,255,.18), transparent 60%);
  pointer-events:none;
}
.final h2 { margin: 0 0 14px; font-size: clamp(24px, 3vw, 32px); letter-spacing: -.01em; position: relative; }
.final p { margin: 8px 0; font-size: clamp(15px, 2vw, 18px); position: relative; opacity: .96; }
.final .kbd {
  display:inline-block; padding: 2px 10px; margin: 0 2px; border-radius: 8px;
  background: rgba(255,255,255,.2); border: 1px solid rgba(255,255,255,.35); font-weight: 800;
}
.final__actions { margin-top: 22px; display: flex; gap: 12px; flex-wrap: wrap; position: relative; }
.btn-on-light {
  display:inline-block; padding: 12px 20px; border-radius: 999px; font-weight: 800; font-size: 15px;
  background: #fff; color: var(--neon-3); text-decoration: none; box-shadow: var(--shadow-sm);
}
.btn-on-light:hover { text-decoration: none; transform: translateY(-2px); }
.btn-ghost-light {
  display:inline-block; padding: 12px 20px; border-radius: 999px; font-weight: 800; font-size: 15px;
  background: rgba(255,255,255,.14); color: #fff; border: 1px solid rgba(255,255,255,.5); text-decoration: none;
}
.btn-ghost-light:hover { text-decoration: none; background: rgba(255,255,255,.24); }

/* ---------- Footer ---------- */
.footer { border-top: 1px solid var(--border); background: var(--surface-2); margin-top: 24px; }
.footer__inner { display:flex; justify-content: space-between; align-items: center; gap: 16px; padding: 26px 0; flex-wrap: wrap; }
.footer p { color: var(--muted); font-size: 14px; margin: 0; }
.footer a { font-weight: 600; }

/* small helpers */
.mt-0 { margin-top: 0; }
.center { text-align: center; }
.hide-sm { }
@media (max-width: 720px){ .hide-sm { display: none; } }
