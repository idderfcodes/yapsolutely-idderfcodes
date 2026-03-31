const { chromium } = await import('playwright');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
const requests = [];
page.on('requestfinished', async (request) => {
  const url = request.url();
  if (/newHEROSECTION|frame-sequence/.test(url)) {
    requests.push(url);
  }
});
await page.goto('https://yapsolutely.xyz/', { waitUntil: 'networkidle', timeout: 120000 });
await page.screenshot({ path: '.tmp/site-check/home-top.png', fullPage: false });
await page.locator('section').nth(2).scrollIntoViewIfNeeded().catch(() => {});
await page.waitForTimeout(1500);
await page.screenshot({ path: '.tmp/site-check/section-mid.png', fullPage: false });
const frameSection = page.locator('canvas').first();
if (await frameSection.count()) {
  await frameSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '.tmp/site-check/frame-section.png', fullPage: false });
}
const videoInfo = await page.evaluate(() => {
  const video = document.querySelector('video');
  if (!video) return null;
  return {
    currentSrc: video.currentSrc,
    videoWidth: video.videoWidth,
    videoHeight: video.videoHeight,
    readyState: video.readyState,
    poster: video.poster,
  };
});
console.log(JSON.stringify({ videoInfo, requests: [...new Set(requests)].slice(0, 200) }, null, 2));
await browser.close();
