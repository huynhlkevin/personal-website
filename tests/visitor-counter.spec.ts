import { test, expect } from "@playwright/test";

test("check visitor counter increment", async ({ page }) => {
  await page.goto(process.env.WEBSITE_URL!);
  await page.evaluate(() => localStorage.removeItem("visited"));

  const textContentBeforeReload = await page.getByText(/Visitor #\d+/).textContent();
  const visitorCountBeforeReload = Number(textContentBeforeReload?.split("#")[1]);

  // Reload the page to trigger the visitor counter increment
  await page.reload();

  const textContentAfterReload = await page.getByText(/Visitor #\d+/).textContent();
  const visitorCountAfterReload = Number(textContentAfterReload?.split("#")[1]);

  expect(visitorCountAfterReload).toBe(visitorCountBeforeReload + 1);
});