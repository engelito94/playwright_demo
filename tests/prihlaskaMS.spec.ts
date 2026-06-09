import { test, expect } from '@playwright/test';
import * as path from 'path';
import { Subor } from '../helpers/Subor';
import { LoginPage } from '../page-objects/LoginPage';

test.beforeEach(async ({ page }) => {
  //await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.getByText('Súhlasím', { exact: true }).click();
});


test('Vytvorenie prihlášky pre', async ({ page }) => {
  const projectDir = process.cwd();
  const filePath = path.join(projectDir, 'DataFiles/deti.txt');

  const login = new LoginPage(page);
  const subor = new Subor();
  const udaje = await subor.dajDietaRiadSS(filePath);

  if (!udaje) {
    console.error('Neboli načítané údaje zo súboru!');
    return; // Test ukonči bez chyby
  }
  const { rc, meno, priezvisko } = udaje;

  login.prihlasRiaditela('930593020', 'f268F7A25Ff#.')

  await page.waitForEvent('domcontentloaded')
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: 'Pridať prihlášku' }).click();
  await page.getByRole('radio', { name: 'Áno' }).check();

  await page.getByRole('textbox', { name: 'Rodné číslo *' }).fill(rc.toString());
  await page.getByRole('button', { name: 'Ďalej' }).click();

  await page.getByRole('textbox', { name: 'Meno *' }).fill(meno.toString());
  await page.getByRole('textbox', { name: 'Priezvisko *' }).fill(priezvisko.toString());

  await page.locator('#input-miestoNarodenia').fill('Slovensko');

  await page.locator('#adresaTPKrajina > .govuk-form-group > .input-wrapper > .govuk-input.autocomplete-input').fill('Slovenská re');
  await page.locator('#adresaTPKrajina').getByText('Slovenská republika', { exact: true }).first().click();

  await page.locator('#adresaTPObec > .govuk-form-group > .input-wrapper > .govuk-input.autocomplete-input').fill('Kraľo');
  await page.getByText('Kraľovany (Dolný Kubín)').click();

  await page.getByRole('textbox', { name: 'Krajina *' }).fill('Dlhá');
  await page.getByText('Dlhá', { exact: true }).click();

  await page.getByRole('textbox', { name: 'Súpisné číslo' }).fill('5');

  await page.getByRole('textbox', { name: 'Orientačné číslo *' }).fill('102');

  await page.getByRole('textbox', { name: 'PSČ *' }).fill('65874');
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.waitForLoadState('load');
  await page.getByRole('radio', { name: 'celodennú výchovu a vzdelá' }).check();
  await page.locator('#DPDSVVPRadio_option_1').check();
  await page.locator('#DPDDietaSNadanimRadio_option_1').check();

  await page.getByRole('textbox', { name: 'Deň' }).fill('9');
  await page.getByRole('textbox', { name: 'Mesiac' }).fill('9');
  await page.getByRole('textbox', { name: 'Rok' }).fill('2026');
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.getByRole('button', { name: 'Ďalej' }).click();

  await page.waitForLoadState('load');
  await page.getByRole('textbox', { name: 'Meno *' }).fill('Igorko');
  await page.getByRole('textbox', { name: 'Priezvisko *' }).fill('Murlokovec');
  await page.getByRole('textbox', { name: 'Rodné číslo *' }).fill('860206/4339');
  await page.getByRole('textbox', { name: 'Telefónne číslo *' }).fill('+421987563214');
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.getByRole('textbox', { name: 'Deň' }).fill('7');
  await page.getByRole('textbox', { name: 'Mesiac' }).fill('6');
  await page.getByRole('textbox', { name: 'Rok' }).fill('2026');
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.getByRole('button', { name: 'Ďalej' }).click();
  await page.waitForLoadState('load');
  await expect(page.locator('#ziadostSkolskyRok')).toContainText('2026 / 2027');
  await expect(page.locator('#ziadostDatumPodania')).toContainText('07.06.2026');
  await expect(page.locator('#dietaMenoSuhrn')).toContainText(meno);
  await expect(page.locator('#dietaPriezviskoSuhrn')).toContainText(priezvisko);
  await expect(page.locator('#layoutDorucenie')).toMatchAriaSnapshot(`
    - text: Rozhodnutia o prijatí budú zverejnené na elektronickej výveske, o čom budete informovaný e-mailovou správou.
    - checkbox "Napriek tomu požadujem aj doručenie poštou alebo do elektronickej schránky. (nepovinné) Listová zásielka bude doručená na príslušnú korešpondenčnú adresu alebo do elektronickej schránky na portáli slovensko.sk."
    - text: Napriek tomu požadujem aj doručenie poštou alebo do elektronickej schránky. (nepovinné) Listová zásielka bude doručená na príslušnú korešpondenčnú adresu alebo do elektronickej schránky na portáli
    - link "slovensko.sk":
      - /url: https://www.slovensko.sk/
    - text: .
    `);
  await page.getByRole('button', { name: 'Pridať prihlášku' }).click();
});