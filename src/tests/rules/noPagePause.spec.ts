import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import noPagePause from '../../rules/noPagePause';

const ruleTester = new RuleTester();

ruleTester.run('no-page-pause', noPagePause, {
    invalid: [
        { code: 'page.pause()', errors: [{ messageId: 'general' }] },
        {
            code: 'var abc = page; abc.pause()',
            errors: [{ messageId: 'general' }],
        },
        { code: 'abc.pause()', errors: [{ messageId: 'general' }] },
    ],
    valid: [{ code: 'pause()' }],
});
