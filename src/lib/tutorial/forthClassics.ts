import type { TutorialSection } from './types';

const forthFCode = `
# Define a word to print a single star
# 42 is the ASCII code for '*'
(42 chr print) STAR =>

# Define a word to print N stars
# Usage: 5 STARS -> prints *****
((STAR) swap times) STARS =>

# Define a word to print a newline and a margin of 30 spaces
(cr (" " print) 30 times) MARGIN =>

# Define words for the building blocks of the 'F'
(MARGIN STAR) BLIP =>
(MARGIN 5 STARS) BAR =>

# The final word that composes the blocks to print the 'F'
(BAR BLIP BAR BLIP BLIP cr) F =>

# Execute F to see the result
F`.trim();

export const forthClassics: TutorialSection = {
    name: "Yield by Example: Forth Classics",
    description: "Yield shares a spiritual lineage with classic concatenative languages like Forth. These examples demonstrate how concepts from Forth can be expressed in Yield, showcasing the power of composition and stack-based programming.",
    cells: [
        {
            name: "Printing a Large Letter 'F'",
            description: "This example recreates a classic Forth program for printing a large letter 'F' using asterisks. It demonstrates how to define a series of small, reusable helper words (like STAR, MARGIN, and BAR) and then compose them into a larger program (F) to create the final output.",
            replCode: forthFCode,
            example: forthFCode,
            assert: (s) => s.length === 0,
            expectedDescription: `The letter 'F' printed with asterisks in the result panel.`
        }
    ]
};
