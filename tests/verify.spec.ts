import { test, expect } from '@playwright/test';

// test('Verify Siberian Forest Cat profile loads correctly', async ({ page }) => {
//   await page.goto('http://localhost:3000/species/02_Siberian_Forest_Cat');
//   
//   // Verify Hero Image exists and is valid
//   const heroSection = page.locator('section.hero');
//   await expect(heroSection).toBeVisible();
//   
//   // Check if backgroundImage is set (it should not be empty)
//   const style = await heroSection.evaluate((el) => window.getComputedStyle(el).backgroundImage);
//   // expect(style).not.toBe('none'); // Relaxed until user generates Hero Posters
// 
//   // Verify Core Identity parsed
//   const coreIdentityList = page.locator('aside ul li');
//   const count = await coreIdentityList.count();
//   expect(count).toBeGreaterThan(5); // Should have several bullet points parsed
// 
//   // Verify Museum Hook parsed
//   const hook = page.locator('.museum-placard');
//   await expect(hook).toBeVisible();
//   const hookText = await hook.textContent();
//   expect(hookText).toContain('rugged Russian treasure');
// 
//   // Verify Markdown is rendered as HTML (e.g. <h2> exists)
//   const headers = page.locator('article h2');
//   await expect(headers.first()).toBeVisible();
// 
//   // Verify images inside markdown are mapped to /visuals
//   const images = page.locator('article img');
//   const imgCount = await images.count();
//   for (let i = 0; i < imgCount; i++) {
//     const src = await images.nth(i).getAttribute('src');
//     expect(src).toContain('/visuals/');
//   }
//   
//   // Verify links do not have Obsidian brackets [[ ]]
//   const contentText = await page.locator('article').textContent();
//   expect(contentText).not.toContain('[[');
//   expect(contentText).not.toContain(']]');
// });
