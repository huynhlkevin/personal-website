import { test, expect } from "@playwright/test";

test("check visitor counter API CORS headers", async () => {
  const response = await getResponse();
  expect(response.headers.get("access-control-allow-headers")).toBe("Content-Type")
  expect(response.headers.get("access-control-allow-origin")).toBe("https://www.huynhlkevin.com")
  expect(response.headers.get("access-control-allow-methods")).toBe("POST")
});

test("check visitor counter API increment", async () => {
  const firstVisitorCounterValue = await getVisitorCounterValue();
  const secondVisitorCounterValue = await getVisitorCounterValue();
  expect(secondVisitorCounterValue).toBe(firstVisitorCounterValue + 1);
});

test("check visitor counter increment", async ({ page }) => {
  await page.goto("https://www.huynhlkevin.com/");

  const textContentBeforeReload = await page.getByText(/Visitor #\d+/).textContent();
  const visitorCountBeforeReload = Number(textContentBeforeReload?.split("#")[1]);

  // Reload the page to trigger the visitor counter increment
  await page.reload();

  const textContentAfterReload = await page.getByText(/Visitor #\d+/).textContent();
  const visitorCountAfterReload = Number(textContentAfterReload?.split("#")[1]);

  expect(visitorCountAfterReload).toBe(visitorCountBeforeReload + 1);
});

async function getResponse(): Promise<Response> {
  return await fetch(
    "https://f36g81unmd.execute-api.us-west-1.amazonaws.com/visit/", 
    { 
      method: "POST",
      headers: {
        "x-api-key": "ovAG1tOEin4Y9eYBDVKQz3UzP2AzGvv02UFehNIY"
      }
    }
  );
}

async function getVisitorCounterValue(): Promise<number> {
  const response = await getResponse();
  return (await response.json())["data"];
}