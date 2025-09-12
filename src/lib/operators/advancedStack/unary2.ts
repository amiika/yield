import type { Operator, EvaluateFn } from '../../types';

export const unary2: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const x2 = s.pop();
            const x1 = s.pop();
            
            const tempStack1 = [x1];
            yield* evaluate(p, tempStack1, options);
            
            const tempStack2 = [x2];
            yield* evaluate(p, tempStack2, options);

            s.push(...tempStack1, ...tempStack2);
        },
        description: 'Executes the same program P on two separate values X1 and X2, returning two results R1 and R2.',
        effect: '[X1 X2 [P]] -> [R1 R2]'
    },
    examples: [
        { code: '10 20 (succ) unary2', expected: [11, 21] }
    ]
};