const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('capture live quality diagnostics', async ({ page }) => {
  const outDir = path.join(process.cwd(), '.tmp', 'site-check');
  fs.mkdirSync(outDir, { recursive: true });

  const requests = [];
  page.on('requestfinished', (request) => {
    const url = request.url();
    if (/newHEROSECTION|frame-sequence/.test(url)) {
      requests.push(url);
    }
  });

  await page.setViewportSize({ width: 1600, height: 1200 });
  await page.goto('https://yapsolutely.xyz/', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: path.join(outDir, 'hero-top.png') });
  await page.screenshot({ path: path.join(outDir, 'full-page.png'), fullPage: true });

  const canvas = page.locator('canvas').first();
  if (await canvas.count()) {
    await canvas.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(outDir, 'frame-section.png') });
  }

  const diagnostics = await page.evaluate(() => {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    return {
      title: document.title,
      video: video
        ? {
            currentSrc: video.currentSrc,
            poster: video.poster,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            readyState: video.readyState,
            clientWidth: video.clientWidth,
            clientHeight: video.clientHeight,
          }
        : null,
      canvas: canvas
        ? {
            width: canvas.width,
            height: canvas.height,
            clientWidth: canvas.clientWidth,
            clientHeight: canvas.clientHeight,
          }
        : null,
    };
  });

  fs.writeFileSync(
    path.join(outDir, 'diagnostics.json'),
    JSON.stringify({ diagnostics, requests: [...new Set(requests)] }, null, 2),
    'utf8'
  );

  console.log(JSON.stringify({ diagnostics, requests: [...new Set(requests)] }, null, 2));
});
