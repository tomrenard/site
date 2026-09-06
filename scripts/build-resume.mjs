// Generates public/Tom_Renard_Resume.pdf from content/resume.ts.
// Uses the locally installed Chrome, so there is no extra dependency to keep updated.
// Run with: pnpm resume

import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  profile,
  summary,
  skills,
  roles,
  projects,
  education,
} from "../content/resume.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "Tom_Renard_Resume.pdf");

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

function findChrome() {
  const fromEnv = process.env.CHROME_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "No Chrome found. Install Google Chrome or set CHROME_PATH to a Chromium binary."
    );
  }
  return found;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const dateRange = (r) => `${r.start} to ${r.end === "now" ? "Present" : r.end}`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(profile.name)} - ${esc(profile.title)}</title>
<style>
  @page { size: A4; margin: 11mm 13mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    margin: 0;
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    font-size: 9.1pt;
    line-height: 1.36;
    color: #1a1a1a;
  }
  a { color: inherit; text-decoration: none; }
  h1 { font-size: 19pt; margin: 0; letter-spacing: -0.02em; }
  .role-title { font-size: 10.2pt; color: #444; margin: 1pt 0 4pt; }
  .contact { font-size: 9pt; color: #555; }
  .contact span + span::before { content: " • "; color: #aaa; }
  h2 {
    font-size: 8.6pt;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #111;
    border-bottom: 0.6pt solid #ccc;
    padding-bottom: 2.5pt;
    margin: 9pt 0 4.5pt;
  }
  p { margin: 0 0 4pt; }
  ul { margin: 3pt 0 0; padding-left: 13pt; }
  li { margin-bottom: 1.6pt; }
  .job { margin-bottom: 6pt; page-break-inside: avoid; break-inside: avoid; }
  .job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10pt;
  }
  .job-head strong { font-size: 9.8pt; }
  .when { font-size: 8.8pt; color: #666; white-space: nowrap; }
  .tech { font-size: 8.6pt; color: #777; margin: 1pt 0 3pt; }
  .blurb { color: #444; }
  .skill-row { margin-bottom: 1.8pt; }
  .edu { display: flex; justify-content: space-between; gap: 10pt; }
  .proj { margin-bottom: 4pt; page-break-inside: avoid; break-inside: avoid; }
  .ptech { font-size: 8.4pt; color: #777; }
</style>
</head>
<body>

<header>
  <h1>${esc(profile.name)}</h1>
  <div class="role-title">${esc(profile.title)}</div>
  <div class="contact">
    <span>${esc(profile.email)}</span><span>${esc(profile.site)}</span><span>${esc(
      profile.github
    )}</span><span>${esc(profile.location)}</span>
  </div>
</header>

<h2>Summary</h2>
<p>${esc(summary)}</p>

<h2>Technical skills</h2>
${skills
  .map(
    (g) =>
      `<div class="skill-row"><strong>${esc(g.name)}:</strong> ${esc(
        g.items.join(", ")
      )}.</div>`
  )
  .join("\n")}

<h2>Experience</h2>
${roles
  .map(
    (r) => `<div class="job">
  <div class="job-head">
    <strong>${esc(r.company)} | ${esc(r.title)}</strong>
    <span class="when">${esc(r.location)} | ${esc(dateRange(r))}</span>
  </div>
  <div class="tech">${esc(r.tech.join(" • "))}</div>
  ${r.blurb ? `<p class="blurb">${esc(r.blurb)}</p>` : ""}
  <ul>
    ${r.bullets
      .filter((b) => b.onResume !== false)
      .map(
        (b) =>
          `<li>${b.label ? `<strong>${esc(b.label)}:</strong> ` : ""}${esc(
            b.text
          )}</li>`
      )
      .join("\n    ")}
  </ul>
</div>`
  )
  .join("\n")}

<h2>Selected side projects</h2>
${projects
  .map(
    (p) =>
      `<div class="proj"><strong>${esc(p.name)}</strong> <span class="ptech">(${esc(
        p.tech
      )})</span>. ${esc(p.text)}</div>`
  )
  .join("\n")}

<h2>Education</h2>
${education
  .map(
    (e) =>
      `<div class="edu"><span>${esc(e.what)} — ${esc(
        e.where
      )}</span><span class="when">${esc(e.year)}</span></div>`
  )
  .join("\n")}

</body>
</html>`;

const work = mkdtempSync(join(tmpdir(), "resume-"));
const htmlPath = join(work, "resume.html");
const pdfPath = join(work, "resume.pdf");
writeFileSync(htmlPath, html, "utf8");

const chrome = findChrome();
execFileSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ],
  { stdio: "pipe" }
);

if (!existsSync(pdfPath)) {
  throw new Error(`Chrome did not produce a PDF. HTML kept at ${htmlPath}`);
}

copyFileSync(pdfPath, OUT);
console.log(`Wrote ${OUT}`);
