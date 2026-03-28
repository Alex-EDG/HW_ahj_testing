import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Форма валидатора кредитной карты', () => {
  let browser = null;
  let page = null;
  let server = null;
  const width = 1366;
  const height = 768;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: true, // show gui
      slowMo: 250,
      devtools: false, // show devTools
      args: [`--window-size=${width},${height}`], // browser window size
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Проверяет валидный номер кредитной карты с помощью Enter ', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=creditCard-form-widget]');
    const input = await form.$('[data-id=creditCard-input]');
    await input.type('6011887534423704938');
    await input.press('Enter');
    await page.waitForSelector('.cardTitle');
  });
  test('Проверяет валидный номер кредитной карты с помощью button', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=creditCard-form-widget]');
    const input = await form.$('[id=creditCard-input]');
    await input.type('6011887534423704938');
    const button = await form.$('[data-id=creditCard-submit]');
    button.click();
    await page.waitForSelector('.cardTitle');
  });
  test('Проверяет не валидный номер кредитной карты с помощью Enter ', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=creditCard-form-widget]');
    const input = await form.$('[data-id=creditCard-input]');
    await input.type('6011182724579612500');
    await input.press('Enter');
    await page.waitForSelector('.cardTitle');
  });
  test('Проверяет не валидный номер кредитной карты с помощью button', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=creditCard-form-widget]');
    const input = await form.$('[id=creditCard-input]');
    await input.type('6011887534423704500');
    const button = await form.$('[data-id=creditCard-submit]');
    button.click();
    await page.waitForSelector('.cardTitle');
  });
});
