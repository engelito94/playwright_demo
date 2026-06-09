import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const authDir = path.join(__dirname, "../.auth");
fs.mkdirSync(authDir, { recursive: true });

const adminUserName = "pista_admin";
const adminPassword = "P@ssw0rd";
const adminAuthFile = path.join(authDir, "admin.json");

const userName = "pista";
const userPassword = "P@ssw0rd";
const userAuthFile = path.join(authDir, "user.json");

setup("Create Admin auth", async ({ page }) => {
  await page.goto("https://demoqa.com/login");
  await page.getByPlaceholder("UserName").fill(adminUserName);
  await page.getByPlaceholder("Password").fill(adminPassword);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("https://demoqa.com/profile");
  await expect(page.getByText("pista_admin")).toBeVisible();

  await page.context().storageState({ path: adminAuthFile });
});

setup("Create User auth", async ({ page }) => {
  await page.goto("https://demoqa.com/login");
  await page.getByPlaceholder("UserName").fill(userName);
  await page.getByPlaceholder("Password").fill(userPassword);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("https://demoqa.com/profile");
  await expect(page.getByText("pista")).toBeVisible();

  await page.context().storageState({ path: userAuthFile });
});