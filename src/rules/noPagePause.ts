import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import createRule from '../util/createRule';
import isCodeInsideTestBlock from '../util/isCodeInsideTestBlock';

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
    defaultOptions: [{ parser: '@typescript-eslint/parser' }],
    create(context) {
        return {
            MemberExpression(node) {
                if (!isCodeInsideTestBlock(context)) {
                    return;
                }

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
