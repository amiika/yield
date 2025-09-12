
import type { Operator, EvaluateFn } from '../../types';
import { deepEqual } from '../../utils';

export const nullary: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const originalStack = [...s];
            const tempStack = [...s]; // copy the stack
            
            yield* evaluate(p, tempStack, options);
            
            // The result is what's left on the tempStack. We push this to the original stack.
            // This is a change from the previous behavior which ran on an empty stack.
            // The user's request for `10 20 (list dup +) nullary` implies execution on the current stack context.
            // However, this breaks `10 20 (1 1 +) nullary` if we just push the whole tempStack.
            // The solution is to push only the "new" items if the original stack is preserved as a prefix.
            // If the original stack is modified (e.g., by `list` or `pop`), we push the entire resulting stack from P.
            
            let result = tempStack; // Default to pushing the whole result
            
            // Check if tempStack starts with originalStack.
            if (tempStack.length >= originalStack.length) {
                let isPrefix = true;
                for (let i = 0; i < originalStack.length; i++) {
                    if (!deepEqual(tempStack[i], originalStack[i])) {
                        isPrefix = false;
                        break;
                    }
                }
                
                if (isPrefix) {
                    // If it's a prefix, the "result" is only the part that was added.
                    result = tempStack.slice(originalStack.length);
                }
            }
            
            s.push(...result);
        },
        description: 'Executes a program P on a copy of the current stack. If P only adds items, only the new items are pushed. If P modifies the original stack items, the entire resulting stack from P is pushed. In either case, the original stack remains untouched by the operation.',
        effect: '[... [P]] -> [... R]'
    },
    examples: [
        { code: '10 20 (1 1 +) nullary', expected: [10, 20, 2] },
        { code: '10 20 (list dup +) nullary', expected: [10, 20, 20, 30, 30, 40] }
    ]
};
