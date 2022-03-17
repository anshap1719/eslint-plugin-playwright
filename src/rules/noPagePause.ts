import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import createRule from '../util/createRule';

const noPagePause = createRule({
    name: 'no-page-pause',
    meta: {
        docs: {
            description: 'Page.pause() breaks tests in CI environments',
            recommended: 'warn',
        },
        messages: {
            general: 'Page.pause() is not allowed',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            MemberExpression(node) {
                if (
                    node.property.type === AST_NODE_TYPES.Identifier &&
                    node.property.name === 'pause'
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

export default noPagePause;
