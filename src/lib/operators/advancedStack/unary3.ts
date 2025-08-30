import type { Operator, EvaluateFn } from '../../types';

export const unary3: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const x3 = s.pop();
            const x2 = s.pop();
            const x1 = s.pop();
            
            const tempStack1 = [x1];
            yield* evaluate(p, tempStack1, options);
            
            const tempStack2 = [x2];
            yield* evaluate(p, tempStack2, options);

            const tempStack3 = [x3];
            yield* evaluate(p, tempStack3, options);

            s.push(...tempStack1, ...tempStack2, ...tempStack3);
        },
        description: 'Executes the same program P on three separate values, returning three results.',
        example: '10 20 30 [succ] unary3',
        effect: '[X1 X2 X3 [P]] -> [R1 R2 R3]'
    },
    testCases: [
        { code: '10 20 30 [succ] unary3', expected: [11, 21, 31] }
    ]
};