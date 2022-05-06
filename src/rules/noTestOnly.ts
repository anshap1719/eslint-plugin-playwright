import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import createRule from '../util/createRule';
import isCodeInsideTestBlock from '../util/isCodeInsideTestBlock';

const BLOCK_DEFAULTS = [
    'describe',
    'it',
    'context',
    'test',
    'fixture',
    'serial',
    'parallel',
];

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
                    node.type === AST_NODE_TYPES.MemberExpression &&
                    node.object.type === AST_NODE_TYPES.MemberExpression &&
                    node.object.property.type === AST_NODE_TYPES.Identifier &&
                    (node.object.property.name === 'describe' ||
                        node.object.property.name === 'test') &&
                    node.property.type === AST_NODE_TYPES.Identifier &&
                    node.property.name === 'only'
                ) {
                    context.report({
                        messageId: 'general',
                        node,
                    });
                    return;
                }

                const isInsideTestBlock = isCodeInsideTestBlock(context);

                if (
                    !isInsideTestBlock &&
                    (node.object.type !== AST_NODE_TYPES.Identifier ||
                        !BLOCK_DEFAULTS.includes(node.object.name))
                ) {
                    return;
                }

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
