import type { TutorialSection } from './types';

export const combinators: TutorialSection = {
    name: "Combinators: Manipulating Stacks with Programs",
    description: "Combinators are special operators that take quotations from the stack and execute them in powerful ways.",
    cells: [
        {
            name: "Applying a Quotation with `i`",
            description: "The `i` combinator executes a quotation. It's the simplest way to run a program stored on the stack.",
            example: "(1 1 +) i",
            expected: [2]
        },
        {
            name: "Mapping with `map`",
            description: "The `map` combinator applies a quotation to each element of a list, creating a new list with the results.",
            example: "(1 2 3) (succ) map",
            expected: [[2, 3, 4]]
        },
        {
            name: "Conditional Logic with `ifte` (?)",
            description: "The `ifte` combinator provides if-then-else logic. It takes a boolean, a 'then' quotation, and an 'else' quotation. The `?` operator is a convenient alias for `ifte`.",
            example: "10 5 > (\"Greater\") (\"Lesser\") ?",
            expected: ["Greater"]
        },
        {
            name: "Stateful Generators with `yield`",
            description: "The `yield` combinator enables creating stateful generators. This example generates the sequence of triangular numbers (a(n) = n * (n+1) / 2) by adding the current index to the previous term (a(n) = a(n-1) + n).",
            example: `
# State holds (n, a(n-1)), starting with (n=1, a(0)=0).
# The program calculates the new state (n+1, a(n)) and yields a(n).
((1 0) (dupd swap + swap succ swap) yield) next_triangular =>

# Generate the first 5 triangular numbers
(next_triangular) 5 times
`,
            expected: [1, 3, 6, 10, 15]
        }
    ]
};