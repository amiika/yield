
import type { Operator } from '../../types';

export const pick: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length === 0) {
                s.push(null); // Consistent with `() pick`
                return;
            }

            const top = s.pop();
            
            if (Array.isArray(top)) {
                // It's a list, behave as before.
                const list = top;
                if (list.length === 0) {
                    s.push(null); // No element to pick, push null
                    return;
                }

                const randomIndex = Math.floor(Math.random() * list.length);
                const pickedItem = list[randomIndex];
                s.push(pickedItem);
            } else {
                // Not a list, treat the whole stack as population.
                s.push(top); // Push the item back
                
                const population = [...s]; // Copy the stack
                
                const randomIndex = Math.floor(Math.random() * population.length);
                const pickedItem = population[randomIndex];

                s.length = 0; // Clear the stack
                s.push(pickedItem); // Push only the picked item
            }
        },
        description: 'Picks a random element. If the top of the stack is a list, it picks from that list. Otherwise, it picks a random element from the entire stack, which is then replaced by the picked element.',
        effect: '[L] -> [E] OR [A B C ...] -> [R]'
    },
    examples: [
        {
            code: '(1 2 3 4 5) pick',
            assert: (s) => s.length === 1 && [1, 2, 3, 4, 5].includes(s[0]),
            expectedDescription: 'A random element from the list'
        },
        {
            code: [
                '(1 2 3) mylist =',
                '(mylist pick) 10 times'
            ],
            assert: (s) => s.length === 10 && s.every(item => [1, 2, 3].includes(item)),
            expectedDescription: '10 random elements on the stack'
        },
        {
            code: '() pick',
            expected: [null]
        },
        {
            code: '1 2 3 4 pick',
            assert: (s) => s.length === 1 && [1, 2, 3, 4].includes(s[0]),
            expectedDescription: 'A random element from the stack'
        },
        {
            code: '1 pick',
            expected: [1]
        },
        {
            code: 'pick', // called on an empty stack
            expected: [null]
        }
    ]
};
