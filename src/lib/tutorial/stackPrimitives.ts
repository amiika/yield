import type { TutorialSection } from './types';

export const stackPrimitives: TutorialSection = {
    name: "Stack Primitives: Manipulating Words and the Stack",
    description: "Since everything happens on the stack, there are powerful operators to manipulate its contents.",
    cells: [
        {
            name: "Duplicating with `dup`",
            description: "The `dup` operator duplicates the top item on the stack.",
            example: "10 dup",
            expected: [10, 10]
        },
        {
            name: "Removing with `pop`",
            description: "The `pop` operator removes the top item from the stack.",
            example: "1 2 3 pop",
            expected: [1, 2]
        },
        {
            name: "Swapping with `swap`",
            description: "The `swap` operator swaps the top two items on the stack.",
            example: "10 20 swap",
            expected: [20, 10]
        },
        {
            name: "Clearing the Stack",
            description: "The `clear` operator removes all items, leaving the stack empty.",
            example: "1 2 3 \"hello\" clear",
            expected: []
        }
    ]
};
