import recommended from './configs/recommended';
import strict from './configs/strict';
import { noPagePause } from './rules/noPagePause';
import { noTestOnly } from './rules/noTestOnly';

export = {
    rules: {
        noTestOnly,
        noPagePause,
    },
    configs: {
        recommended,
        strict,
    },
};
