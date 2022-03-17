export default {
    parser: '@typescript-eslint/parser',
    parserOptions: { sourceType: 'module' },
    rules: {
        '@anshulsanghi/playwright/no-test-only': 'error',
        '@anshulsanghi/playwright/no-page-pause': 'error',
    },
};
