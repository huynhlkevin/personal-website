import { test, expect } from "@playwright/test";

test("check visitor counter increments when new visitor", async ({ page }) => {
  await page.goto(process.env.WEBSITE_URL!);

  const textContentBeforeReload = await page.getByText(/Visitor #\d+/).textContent();
  await page.evaluate(() => localStorage.removeItem("visitor"));
  const visitorCountBeforeReload = Number(textContentBeforeReload?.split("#")[1]);

  // Reload the page to trigger the visitor counter increment
  await page.reload();

  const textContentAfterReload = await page.getByText(/Visitor #\d+/).textContent();
  const visitorCountAfterReload = Number(textContentAfterReload?.split("#")[1]);

  expect(visitorCountAfterReload).toBe(visitorCountBeforeReload + 1);
});

test("check visitor counter increments when not new visitor", async ({ page }) => {
  await page.goto(process.env.WEBSITE_URL!);

  const textContentBeforeReload = await page.getByText(/Visitor #\d+/).textContent();
  const visitorCountBeforeReload = Number(textContentBeforeReload?.split("#")[1]);

  // Reload the page to trigger the visitor counter increment
  await page.reload();

  const textContentAfterReload = await page.getByText(/Visitor #\d+/).textContent();
  const visitorCountAfterReload = Number(textContentAfterReload?.split("#")[1]);

  expect(visitorCountAfterReload).toBe(visitorCountBeforeReload);
});