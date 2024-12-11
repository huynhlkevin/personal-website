import { test, expect, type Page } from "@playwright/test";

test("check toggle to light theme", async ({ page }) => {
  await page.goto(process.env.WEBSITE_URL!);
  await page.evaluate(() => localStorage.setItem("theme", "dark"));
  await page.reload();

  const currentTheme = await getLocalStorageTheme(page);
  if (currentTheme === "dark") {
    const themeToggle = page.locator("#themeToggle");
    await themeToggle.click();
  }

  expect(await getLocalStorageTheme(page)).toBe("light");
  await expect(page.locator(":root")).not.toHaveClass("dark");
  await expect(page.locator(":root")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(":root")).toHaveCSS("color", "rgb(0, 0, 0)");
  await expect(page.locator(".sun")).toHaveCSS("fill", "rgba(0, 0, 0, 0)")
});

test("check toggle to dark theme", async ({ page }) => {
  await page.goto(process.env.WEBSITE_URL!);
  await page.evaluate(() => localStorage.setItem("theme", "light"));
  await page.reload();

  const currentTheme = await getLocalStorageTheme(page);
  if (currentTheme === "light") {
    const themeToggle = page.locator("#themeToggle");
    await themeToggle.click();
  }

  expect(await getLocalStorageTheme(page)).toBe("dark");
  await expect(page.locator(":root")).toHaveClass("dark");
  await expect(page.locator(":root")).toHaveCSS("background-color", "rgb(40, 42, 54)");
  await expect(page.locator(":root")).toHaveCSS("color", "rgb(248, 248, 242)");
  await expect(page.locator(".moon")).toHaveCSS("fill", "rgba(0, 0, 0, 0)")
});

async function getLocalStorageTheme(page: Page): Promise<string> {
  return (await page.evaluate(() => localStorage.getItem("theme")))!;
}