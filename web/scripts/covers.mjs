/**
 * Renders one 4K cover image per project.
 *
 * Each cover is an abstract product mockup drawn in HTML and screenshotted in Chrome
 * at 3840x2160. Nothing here is a real screenshot: no client interface, logo, or
 * customer data appears in any of them.
 *
 *   node scripts/covers.mjs
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = path.resolve("public/img/projects");
fs.mkdirSync(OUT, { recursive: true });

const PROJECTS = [
  { slug: "conduit", hue: "#7B8CFF", title: "Agent console" },
  { slug: "taskflow", hue: "#5EE9C0", title: "Work platform" },
  { slug: "forge", hue: "#FF9A62", title: "Operations suite" },
  { slug: "ledger", hue: "#C48BFF", title: "Dual ledger" },
  { slug: "crm", hue: "#FF7A90", title: "Sales pipeline" },
];

/* ------------------------------------------------------------------ shared CSS */
const css = (hue) => `
*{box-sizing:border-box;margin:0;padding:0}
body{width:1920px;height:1080px;overflow:hidden;background:#070809;
  font-family:"Segoe UI",system-ui,sans-serif;color:#e8eaf0}
.stage{position:absolute;inset:0;display:grid;place-items:center}
.glow{position:absolute;width:1500px;height:900px;left:50%;top:38%;transform:translate(-50%,-50%);
  background:radial-gradient(ellipse at center, ${hue}55 0%, ${hue}1c 38%, transparent 68%);
  filter:blur(70px)}
.glow2{position:absolute;width:900px;height:600px;left:22%;top:78%;transform:translate(-50%,-50%);
  background:radial-gradient(ellipse at center, ${hue}26 0%, transparent 66%);filter:blur(90px)}
.grid{position:absolute;inset:0;opacity:.5;
  background-image:linear-gradient(to right,#ffffff09 1px,transparent 1px),
                   linear-gradient(to bottom,#ffffff09 1px,transparent 1px);
  background-size:96px 96px;
  -webkit-mask-image:radial-gradient(ellipse 60% 55% at 50% 45%,#000 10%,transparent 75%)}

/* browser window */
.win{position:relative;width:1680px;border-radius:26px;overflow:hidden;
  background:linear-gradient(180deg,#181b21,#101216);
  border:1px solid #2b2f39;
  box-shadow:0 80px 160px -50px #000, 0 0 0 1px #ffffff08 inset, 0 0 160px -40px ${hue}77}
.bar{height:54px;display:flex;align-items:center;gap:10px;padding:0 22px;
  background:#14161b;border-bottom:1px solid #23262e}
.dot{width:13px;height:13px;border-radius:99px}
.url{margin-left:18px;height:28px;flex:1;max-width:520px;border-radius:99px;
  background:#0d0f13;border:1px solid #23262e}
.app{display:flex;height:760px}
.side{width:280px;padding:26px 20px;border-right:1px solid #21242c;background:#101319;
  display:flex;flex-direction:column;gap:13px}
.main{flex:1;padding:30px 34px;display:flex;flex-direction:column;gap:22px}
.h{font-size:26px;font-weight:700;letter-spacing:-.5px}
.sub{font-size:14px;color:#8b92a1}
.row{display:flex;gap:16px}
.card{background:#161920;border:1px solid #23262e;border-radius:16px;padding:20px;flex:1}
.pill{height:30px;border-radius:99px;background:#1b1f27;border:1px solid #262a34}
.pill.on{background:${hue};border-color:${hue}}
.bar-l{height:11px;border-radius:99px;background:#262a34}
.acc{background:${hue}}
.acc-s{background:${hue}66}
.kpi{font-size:40px;font-weight:800;letter-spacing:-1.5px}
.mono{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;color:#7d8496;
  letter-spacing:.14em;text-transform:uppercase}
.chip{height:26px;border-radius:8px;background:#1b1f27;border:1px solid #262a34}
.phone{position:absolute;right:-90px;bottom:-60px;width:300px;height:600px;border-radius:44px;
  background:linear-gradient(180deg,#2b2f3a,#14161a);padding:5px;
  box-shadow:0 60px 120px -40px #000, 0 0 90px -30px ${hue}66}
.screen{width:100%;height:100%;border-radius:39px;background:#0d0f13;overflow:hidden;
  padding:26px 18px;display:flex;flex-direction:column;gap:12px}
.tag{position:absolute;left:40px;top:40px;padding:10px 18px;border-radius:99px;
  background:#0d0f13cc;border:1px solid #2b2f39;backdrop-filter:blur(8px)}
`;

/* ---------------------------------------------------------------- UI variants */
const ui = {
  conduit: `
  <div class="side">
    <div class="mono" style="margin-bottom:6px">Tools</div>
    ${Array.from({ length: 7 }, (_, i) =>
      `<div class="pill ${i === 1 ? "on" : ""}" style="width:${94 - i * 5}%"></div>`).join("")}
    <div class="mono" style="margin-top:22px">Evals</div>
    <div class="card" style="flex:0;padding:14px">
      <div class="bar-l acc" style="width:78%"></div>
      <div class="bar-l" style="width:52%;margin-top:9px"></div>
    </div>
  </div>
  <div class="main">
    <div><div class="h">Agent session</div><div class="sub">tool calls, retrieval, confirm before write</div></div>
    ${[["72%", true], ["58%", false], ["84%", true], ["46%", false]].map(([w, acc]) => `
      <div class="card" style="flex:0">
        <div class="row" style="align-items:center;gap:12px">
          <div style="width:30px;height:30px;border-radius:9px" class="${acc ? "acc" : "acc-s"}"></div>
          <div class="bar-l" style="width:${w}"></div>
        </div>
        <div class="bar-l" style="width:92%;margin-top:14px;height:8px"></div>
        <div class="bar-l" style="width:66%;margin-top:8px;height:8px"></div>
      </div>`).join("")}
  </div>`,

  taskflow: `
  <div class="side">
    <div class="mono" style="margin-bottom:6px">Departments</div>
    ${Array.from({ length: 6 }, (_, i) =>
      `<div class="pill ${i === 0 ? "on" : ""}" style="width:${92 - i * 6}%"></div>`).join("")}
  </div>
  <div class="main">
    <div class="row">
      ${[["5", "92%"], ["28", "64%"], ["94%", "78%"]].map(([k, w]) => `
        <div class="card"><div class="mono">Metric</div>
          <div class="kpi" style="margin-top:10px">${k}</div>
          <div class="bar-l acc" style="width:${w};margin-top:14px;height:7px"></div></div>`).join("")}
    </div>
    <div class="row" style="flex:1">
      ${["To do", "In progress", "Review", "Done"].map((c, i) => `
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="mono">${c}</div>
          ${Array.from({ length: 4 - (i % 2) }, (_, j) => `
            <div style="background:#1b1f27;border:1px solid #262a34;border-radius:12px;padding:13px">
              <div class="bar-l ${j === 0 && i === 1 ? "acc" : ""}" style="width:${80 - j * 12}%;height:8px"></div>
              <div class="bar-l" style="width:56%;height:6px;margin-top:8px"></div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
  </div>`,

  forge: `
  <div class="side">
    <div class="mono" style="margin-bottom:6px">Branches</div>
    ${Array.from({ length: 5 }, (_, i) =>
      `<div class="pill ${i === 2 ? "on" : ""}" style="width:${90 - i * 7}%"></div>`).join("")}
    <div class="mono" style="margin-top:22px">CMS</div>
    ${Array.from({ length: 3 }, () => `<div class="pill" style="width:80%"></div>`).join("")}
  </div>
  <div class="main">
    <div><div class="h">Site content</div><div class="sub">edited live, no deploy required</div></div>
    <div class="card" style="flex:0;height:200px;position:relative;overflow:hidden;padding:0">
      <div style="position:absolute;inset:0;background:linear-gradient(120deg,${"var(--h)"}33,#12141a 60%)"></div>
      <div style="position:absolute;left:28px;bottom:28px">
        <div class="bar-l acc" style="width:220px;height:14px"></div>
        <div class="bar-l" style="width:340px;height:9px;margin-top:12px"></div>
      </div>
    </div>
    <div class="row">
      ${[0, 1, 2].map(() => `
        <div class="card">
          <div style="height:76px;border-radius:12px;background:#1b1f27"></div>
          <div class="bar-l" style="width:70%;margin-top:14px;height:8px"></div>
          <div class="bar-l" style="width:46%;margin-top:8px;height:7px"></div>
        </div>`).join("")}
    </div>
  </div>`,

  ledger: `
  <div class="main" style="padding:34px 38px">
    <div class="row" style="align-items:flex-end">
      <div><div class="h">Two ledgers, one login</div><div class="sub">rent and wages, independently deployable</div></div>
    </div>
    <div class="row" style="flex:1;gap:22px">
      ${["Rent", "Labour"].map((t, k) => `
        <div class="card" style="display:flex;flex-direction:column;gap:14px">
          <div class="row" style="justify-content:space-between;align-items:center">
            <div class="mono">${t}</div>
            <div class="chip" style="width:78px"></div>
          </div>
          ${Array.from({ length: 7 }, (_, j) => `
            <div class="row" style="align-items:center;gap:14px">
              <div style="width:34px;height:34px;border-radius:10px;background:${k === 0 ? "var(--h)" : "#262a34"};opacity:${k === 0 ? 0.85 - j * 0.09 : 1}"></div>
              <div class="bar-l" style="flex:1;height:9px"></div>
              <div class="bar-l ${j < 3 ? "acc-s" : ""}" style="width:${90 - j * 7}px;height:9px"></div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
    <div class="card" style="flex:0;display:flex;align-items:center;justify-content:center;gap:14px">
      <div style="width:12px;height:12px;border-radius:99px" class="acc"></div>
      <div class="mono">Shared authentication</div>
    </div>
  </div>`,

  crm: `
  <div class="side">
    <div class="mono" style="margin-bottom:6px">Pipeline</div>
    ${Array.from({ length: 6 }, (_, i) =>
      `<div class="pill ${i === 3 ? "on" : ""}" style="width:${92 - i * 6}%"></div>`).join("")}
  </div>
  <div class="main">
    <div><div class="h">Accounts</div><div class="sub">scanned from a card, straight into the record</div></div>
    <div class="row" style="flex:1">
      ${["New", "Qualified", "Proposal", "Won"].map((c, i) => `
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="row" style="justify-content:space-between">
            <div class="mono">${c}</div>
            <div class="bar-l ${i === 0 ? "acc" : ""}" style="width:26px;height:9px"></div>
          </div>
          ${Array.from({ length: 4 - (i % 3) }, (_, j) => `
            <div style="background:#1b1f27;border:1px solid #262a34;border-radius:12px;padding:13px;display:flex;gap:11px;align-items:center">
              <div style="width:26px;height:26px;border-radius:99px;background:${i === 0 && j === 0 ? "var(--h)" : "#262a34"}"></div>
              <div style="flex:1">
                <div class="bar-l" style="width:${78 - j * 10}%;height:7px"></div>
                <div class="bar-l" style="width:50%;height:6px;margin-top:7px"></div>
              </div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
  </div>`,
};

const page = (p) => `<!doctype html><html><head><meta charset="utf-8">
<style>:root{--h:${p.hue}}${css(p.hue)}</style></head><body>
<div class="grid"></div><div class="glow"></div><div class="glow2"></div>
<div class="stage">
  <div class="win">
    <div class="bar">
      <span class="dot" style="background:#3a3f4b"></span>
      <span class="dot" style="background:#3a3f4b"></span>
      <span class="dot" style="background:#3a3f4b"></span>
      <span class="url"></span>
    </div>
    <div class="app">${ui[p.slug]}</div>
  </div>
</div>
<div class="tag"><span class="mono">${p.title}</span></div>
</body></html>`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
});

for (const p of PROJECTS) {
  const tab = await browser.newPage();
  // 1920x1080 at 2x device pixels renders 3840x2160 with crisp text
  await tab.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await tab.setContent(page(p), { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 350));
  const file = path.join(OUT, `${p.slug}.webp`);
  await tab.screenshot({ path: file, type: "webp", quality: 88 });
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`${p.slug.padEnd(10)} 3840x2160  ${kb} KB`);
  await tab.close();
}

await browser.close();
console.log("done");
