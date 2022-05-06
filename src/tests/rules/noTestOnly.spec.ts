import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import noTestOnly from '../../rules/noTestOnly';

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-test-only', noTestOnly, {
    invalid: [
        { code: 'test.only()', errors: [{ messageId: 'general' }] },
        {
            code: 'test.describe("", () => { abc.only() })',
            errors: [{ messageId: 'general' }],
        },
        {
            code: 'test.only("", () => {  })',
            errors: [{ messageId: 'general' }],
        },
        {
            code: 'test.describe.only("", () => {  })',
            errors: [{ messageId: 'general' }],
        },
    ],
    valid: [
        { code: 'test()' },
        { code: 'only()' },
        {
            code: 'var abc = test; abc.only()',
        },
        { code: 'abc.only()' },
    ],
});
