import {
    test,
    expect,
    _electron as electron,
    Page,
    ElectronApplication,
  } from '@playwright/test';
  import path from 'path';
  
  const mainDirectory = path.join(__dirname, '../..');
  
  
  test.describe.serial(() => {
    let dev_tools_page: Page;
    let react_page: Page;
    let electronApp: ElectronApplication;
    test.beforeAll(async () => {
      electronApp = await electron.launch({
        args: [
          mainDirectory
        ],
      });
  
      electronApp.on('window', () => {
        console.log('Window created');
      });
      await electronApp.waitForEvent('window', { timeout: 10000 });
  
      await electronApp.windows();
  
  
  
      dev_tools_page = await electronApp.firstWindow();
      await dev_tools_page.waitForTimeout(3000)
  
      const windows = await electronApp.windows();
  
      console.log(windows.length)
  
      react_page = windows[1];
  
    });
  
  
    test.afterAll(async () => {
      await electronApp.close();
    });
  
  
    test('Electron App has the correct buttons on it', async () => {
      // Evaluation expression in the Electron context.
      const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
      });
      console.log(appPath);
  
      const isPackaged = await electronApp.evaluate(async ({ app }) => {
        // This runs in Electron's main process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.isPackaged;
      });
  
      expect(isPackaged).toBe(false);
  
  
  
  
      // Print the title.
      console.log(await dev_tools_page.title());
      console.log(await react_page.title());
      await expect(dev_tools_page).toHaveTitle('DevTools') 
      await expect(react_page).toHaveTitle("React App");
  
      await react_page.waitForTimeout(10000)
  
      await react_page.goto('http://localhost:3000/', {timeout: 3000});
  
      await react_page.waitForTimeout(3000)
  
      await react_page.waitForSelector('#mui-1-Composition-0')
  
      await react_page.click('#mui-1-Composition-0')
  
      await react_page.waitForTimeout(3000)
  
    });
  });