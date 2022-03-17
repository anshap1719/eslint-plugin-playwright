import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import createRule from '../util/createRule';

const noTestOnly = createRule({
    name: 'no-test-only',
    meta: {
        docs: {
            description: 'Focused tests are not allowed. Remove `only`.',
            recommended: 'warn',
        },
        messages: {
            general: 'Focused tests are not allowed. Remove `only`.',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        // TODO: Do not warn if `forbidOnly` is set to false in playwright config.
        return {
            MemberExpression(node) {
                if (
                    node.property.type === AST_NODE_TYPES.Identifier &&
                    node.property.name === 'only'
                ) {
                    context.report({
                        messageId: 'general',
                        node,
                    });
                }
            },
        };
    },
});

export default noTestOnly;
