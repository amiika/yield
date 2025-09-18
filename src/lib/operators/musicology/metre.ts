import type { Operator, EvaluateFn, StackValue } from '../../types';

export const metre: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const rules = s.pop();
            const pitches = s.pop();

            if (!Array.isArray(rules)) {
                throw new Error('metre expects a list of rules as its first argument.');
            }
            if (!Array.isArray(pitches)) {
                throw new Error('metre expects a list of pitches as its second argument.');
            }

            if (pitches.length === 0) {
                s.push([]);
                return;
            }

            const accentPattern = Array(pitches.length).fill(0);

            for (let i = 0; i < pitches.length; i++) {
                const currentPitch = pitches[i];
                // Wrap around for the last pitch
                const nextPitch = pitches[(i + 1) % pitches.length];

                for (const rule of rules) {
                    if (!Array.isArray(rule) || rule.length !== 2) {
                        throw new Error('Each rule must be a pair of [predicate, accent].');
                    }
                    const [predicate, accent] = rule;
                    if (!Array.isArray(predicate) || typeof accent !== 'number') {
                        throw new Error('Rule format is invalid: expected [quotation, number].');
                    }

                    // The predicate takes [current, next]
                    const tempStack: StackValue[] = [currentPitch, nextPitch];
                    yield* evaluate(predicate, tempStack, options);

                    if (tempStack.pop()) { // if predicate returns true
                        accentPattern[i] += accent;
                    }
                }
            }
            s.push(accentPattern);
        },
        description: 'Generates a rhythmic accent pattern from a list of pitches based on a set of rules. Each rule is a `[predicate accent]` pair, where the predicate is a quotation that takes two adjacent pitches `(current next)` and returns a boolean, and the accent is a numeric value. Accents from all matching rules are summed for each pitch.',
        effect: `[L_pitches L_rules] -> [L_accentPattern]`
    },
    examples: [
        {
            code: `
(0 11 7 8 3 4 9 10 6 5 1 2) # The row
(
    ( (swap - abs 4 >=) 2 )  # Accent large leaps (>= M3)
    ( (<) 1 )                # Accent ascending motion
) metre`,
            expected: [[3, 2, 1, 2, 1, 3, 1, 2, 0, 2, 1, 0]]
        },
        {
            code: '(0 2 4 5 7 9 11) (( (swap - abs 2 ==) 1 )) metre', // Accent whole steps in major scale
            expected: [[1, 1, 0, 1, 1, 1, 0]]
        }
    ]
};
