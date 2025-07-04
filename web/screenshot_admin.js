const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: {
      username: 'admin',
      password: 'abc123'
    }
  });
  
  const page = await context.newPage();
  
  // Navigate to the admin page
  await page.goto('http://localhost:8080/admin');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Take a screenshot
  await page.screenshot({ path: '/tmp/admin_screenshot.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved to /tmp/admin_screenshot.png');
})();