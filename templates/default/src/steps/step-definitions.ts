import { Given, When, Then } from '../fixtures/fixtures';

// ── VGP Shop ──────────────────────────────────────────────────────────────────

Given("I'm on the VGP Shop homepage", async ({ page }) => {
  await page.goto('/');
});
