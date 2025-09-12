import type { TutorialSection } from './types';

export const gettingStarted: TutorialSection = {
    name: "Getting Started: Introduction to Yield and RPN",
    description: "Yield is a concatenative, stack-based language. Operations are written in Reverse Polish Notation (RPN), where operators follow their operands.",
    cells: [
        {
            name: "Basic Arithmetic",
            description: "To add 2 and 3, you write `2 3 +`. The numbers are pushed onto a shared data stack, and the `+` operator pops them, adds them, and pushes the result back.",
            example: "2 3 +",
            expected: [5]
        },
        {
            name: "Chaining Operations",
            description: "Operations are executed from left to right. To calculate `(2 + 3) * 5`, you first perform the addition, leaving the result on the stack for the multiplication.",
            example: "2 3 + 5 *",
            expected: [25]
        },
        {
            name: "Primitives",
            description: "Yield supports several primitive data types. Numbers, booleans (`true`, `false`), and strings are pushed directly onto the stack.",
            example: "42 1.618 true \"hello world\"",
            expected: [42, 1.618, true, "hello world"]
        },
        {
            name: "Comments",
            description: "You can add comments to your code using `#` for line comments. The interpreter ignores them.",
            example: "1 2 + # -> 3",
            expected: [3]
        }
    ]
};
