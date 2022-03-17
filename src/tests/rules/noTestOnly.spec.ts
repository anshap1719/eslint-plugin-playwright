import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import { noTestOnly } from '../../rules/noTestOnly';

const ruleTester = new RuleTester();

ruleTester.run('no-test-only', noTestOnly, {
    invalid: [
        { code: 'test.only()', errors: [{ messageId: 'general' }] },
        {
            code: 'var abc = test; abc.only()',
            errors: [{ messageId: 'general' }],
        },
        { code: 'abc.only()', errors: [{ messageId: 'general' }] },
    ],
    valid: [{ code: 'test()' }, { code: 'only()' }],
});
