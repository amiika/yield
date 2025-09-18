
import type { TutorialSection } from './types';

export const quotedPrograms: TutorialSection = {
    name: "Quoted Programs: Defining and Naming Programs",
    description: "In Yield, programs are just lists of words. These lists, called quotations, can be stored and executed later.",
    cells: [
        {
            name: "Quotations",
            description: "Anything inside parentheses `(...)` is a quotation. It is pushed onto the stack as a list without being executed.",
            example: "(1 2 3)",
            expected: [[1, 2, 3]]
        },
        {
            name: "Defining New Words with `=>`",
            description: "You can define new, executable words (functions) in the dictionary using the `=>` (`quote`) operator. It assigns the quotation on top of the stack to the name that follows it.",
            // FIX: Added missing 'example' property to satisfy the TutorialCell type.
            example: "(dup *) square => \n5 square",
            expected: [25]
        },
        {
            name: "Redefining Words",
            description: "You can redefine any word, including built-in operators. Be careful, this can lead to surprising results!",
            // FIX: Added missing 'example' property to satisfy the TutorialCell type.
            example: "(1 +) two => \n1 two",
            expected: [2]
        }
    ]
};
