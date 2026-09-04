import { Before, After } from '../fixtures/fixtures';

Before(async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 1200 });
});

After(async ({ page, $testInfo }) => {
    if ($testInfo.status !== 'passed') {
        const screenshot = await page.screenshot();
        await $testInfo.attach('screenshot', {
            body: screenshot,
            contentType: 'image/png',
        });
    }
});