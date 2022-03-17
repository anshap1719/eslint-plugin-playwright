import recommended from './configs/recommended';
import strict from './configs/strict';
import { noPagePause } from './rules/noPagePause';
import { noTestOnly } from './rules/noTestOnly';

export = {
    rules: {
        'no-test-only': noTestOnly,
        'no-page-pause': noPagePause,
    },
    configs: {
        recommended,
        strict,
    },
};
