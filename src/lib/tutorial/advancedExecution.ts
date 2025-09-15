
import type { TutorialSection } from './types';

export const advancedExecution: TutorialSection = {
    name: "Advanced Execution: Shallow vs. Deep",
    description: "Yield provides different ways to evaluate quotations, giving you fine-grained control over how programs are executed.",
    cells: [
        {
            name: "Shallow Execution with `i` (iterate)",
            description: "The `i` combinator performs a shallow execution. It executes the words inside a quotation. If one of those words is a variable defined as data with `=`, `i` will simply push that data to the stack. It does not look 'inside' the data.",
            example: `
# Define STAR as a DATA variable holding a list
(42 chr print) STAR =

# Define F as a FUNCTION that calls STAR and prints a newline
(STAR cr) F =>

# When we call F, it executes STAR.
# The action for STAR is to push its data: the list (42 chr print).
# Then 'cr' prints a newline. The list is left on the stack.
F`,
            expected: [[42, 'chr', 'print']]
        },
        {
            name: "Deep Execution with `chain`",
            description: "The new `chain` combinator performs a deep, or recursive, execution. When it encounters a word defined as data, it executes the body of that word as a program. This allows you to compose programs from words defined as data.",
            example: `
# Define all words using '=' (as data)
(42 chr print) STAR =
((STAR) swap times) STARS =
(cr (" " print) 30 times) MARGIN =
(MARGIN STAR) BLIP =
(MARGIN 5 STARS) BAR =

# The final composition. This fails with 'i' but works with 'chain'.
(BAR BLIP BAR BLIP BLIP cr) chain
`,
            assert: s => s.length === 0,
            expectedDescription: "The letter 'F' is printed, and the stack is left empty."
        },
        {
            name: "Choosing the Right Tool",
            description: "Use `=>` to define functions when you want to encapsulate an action. Use `=` for data. The `chain` combinator gives you the flexibility to treat a composition of data words as a single, executable program, which can be very powerful for certain programming styles.",
            example: `# '=>' is usually for verbs (actions).
# '=' is usually for nouns (data).
# 'chain' lets you treat a sentence of nouns as a verb.`,
        }
    ]
};
