import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import noPagePause from '../../rules/noPagePause';

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-page-pause', noPagePause, {
    invalid: [
        {
            code: `test('', async ({ page }) => {await page.pause();});`,
            errors: [{ messageId: 'general' }],
        },
        {
            code: `test('', async ({ page }) => { const p = await page.context().newPage(); await p.pause(); });`,
            errors: [{ messageId: 'general' }],
        },
    ],
    valid: [],
});
