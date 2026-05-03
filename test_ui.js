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

    // Wait for the UI to load and the game engine to init
    await page.waitForTimeout(5000);

    // Take screenshot of the base game with Friends button
    await page.screenshot({ path: 'ui_screenshot_base.png' });
    console.log("Screenshot saved as ui_screenshot_base.png");

    // Click Friends button and take screenshot
    await page.click('#custom-friends-btn');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'ui_screenshot_friends_modal.png' });
    console.log("Screenshot saved as ui_screenshot_friends_modal.png");

    // Click Setup Match button and take screenshot
    await page.click('#open-match-btn');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'ui_screenshot_match_modal.png' });
    console.log("Screenshot saved as ui_screenshot_match_modal.png");

    // Click first empty slot and take screenshot
    await page.click('.my-slot[data-slot="1"]');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'ui_screenshot_select_friend.png' });
    console.log("Screenshot saved as ui_screenshot_select_friend.png");

    await browser.close();
  } catch (err) {
    console.error("Playwright test failed:", err);
  } finally {
    server.close();
  }
})();
