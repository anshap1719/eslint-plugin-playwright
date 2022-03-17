export default {
    parser: '@typescript-eslint/parser',
    parserOptions: { sourceType: 'module' },
    rules: {
        '@anshulsanghi/playwright/no-test-only': 'warn',
        '@anshulsanghi/playwright/no-page-pause': 'warn',
    },
};
