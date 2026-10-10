const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

const PORT = 3333;
const BASE = `http://localhost:${PORT}`;
const staticServerPath = path.join(__dirname, 'serve-static.mjs');

function ensureServe() {
  const child = spawn('node', [staticServerPath], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.on('error', (err) => {
    console.error('SERVE_START_ERROR', err && err.message || err);
    process.exit(1);
  });
  child.stderr.on('data', (d) => console.error(d.toString()));
  return child;
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => resolve(res.statusCode)).on('error', reject);
  });
}

async function main() {
  const serveChild = ensureServe();

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Serve not ready after 30s')), 30000);
    const check = () => {
      httpGet(`${BASE}/`).then((code) => {
        if (code === 200) {
          clearTimeout(timeout);
          resolve();
        } else {
          setTimeout(check, 400);
        }
      }).catch(() => setTimeout(check, 400));
    };
    check();
  });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const shotsDir = path.join(__dirname, '..', 'docs', 'screenshots');
  fs.mkdirSync(shotsDir, { recursive: true });

  async function screenshot(name, theme) {
    const page = await ctx.newPage();
    await page.emulateMedia({ colorScheme: theme });
    await page.addInitScript((t) => {
      try { localStorage.setItem('theme', t); } catch (e) {}
    }, theme);
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(4500);
    const filePath = path.join(shotsDir, name);
    // viewport-sized capture (normal desktop screenshot), not full page
    await page.screenshot({ path: filePath, fullPage: false, type: 'png' });
    await page.close();
    console.log('SHOT', filePath);
  }

  await screenshot('screenshot-light.png', 'light');
  await screenshot('screenshot-dark.png', 'dark');

  await browser.close();
  serveChild.kill('SIGTERM');
  console.log('SCREENSHOTS_DONE');
}

main().catch((err) => {
  console.error('SCREENSHOT_ERROR', err && err.message || err);
  process.exit(1);
});
