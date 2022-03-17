import recommended from './configs/recommended';
import strict from './configs/strict';
import noPagePause from './rules/noPagePause';
import noTestOnly from './rules/noTestOnly';

export default {
    rules: {
        noTestOnly: {
            ...noTestOnly,
        },
        noPagePause: {
            ...noPagePause,
        },
    },
    configs: {
        recommended: {
            ...recommended,
        },
        strict: {
            ...strict,
        },
    },
};
