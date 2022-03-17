import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';

const isCodeInsideTestBlock = (
    context: RuleContext<'general', { parser: string }[]>
) => {
    const ancestors = context.getAncestors();
    const testAncestor = ancestors.find(item => {
        if (item.type !== AST_NODE_TYPES.CallExpression) {
            return false;
        }

        const { callee } = item;
        if (callee.type === AST_NODE_TYPES.Identifier) {
            return [
                'test',
                'it',
                'describe',
                'beforeEach',
                'before',
                'afterEach',
                'after',
                'use',
            ].includes(callee.name);
        }

        if (callee.type === AST_NODE_TYPES.MemberExpression) {
            const { object } = callee;
            if (object.type !== AST_NODE_TYPES.Identifier) {
                return false;
            }

            return [
                'test',
                'it',
                'describe',
                'beforeEach',
                'before',
                'afterEach',
                'after',
                'use',
            ].includes(object.name);
        }

        return false;
    });

    return !!testAncestor;
};

export default isCodeInsideTestBlock;
