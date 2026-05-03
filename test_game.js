const { chromium } = require('playwright');
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'pixel_app/dynamic_game_pixel_shooter')));

const server = app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

    await page.goto(`http://localhost:${port}/index.html`);

    // Wait for the UI to load
    await page.waitForTimeout(5000);

    // Take screenshot
    await page.screenshot({ path: 'game_screenshot.png' });
    console.log("Screenshot saved as game_screenshot.png");

    await browser.close();
  } catch (err) {
    console.error("Playwright test failed:", err);
  } finally {
    server.close();
  }
})();
