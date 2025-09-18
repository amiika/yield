
import type { TutorialSection } from './types';

export const schoenberg: TutorialSection = {
    name: "Twelve-Tone Technique: A Schoenbergian Approach",
    description: "Yield's new musicology operators provide a powerful toolkit for exploring twelve-tone (or dodecaphonic) serialism, a method of musical composition devised by Arnold Schoenberg. This tutorial introduces the core concepts and the operators used to manipulate tone rows.",
    cells: [
        {
            name: "The Tone Row",
            description: "The basis of the technique is the **tone row** (or series), which is an ordered sequence of the twelve notes of the chromatic scale. The `isaggregate` operator can verify that a list contains all 12 unique pitch classes.",
            example: `(0 11 7 8 3 4 9 10 6 5 1 2) :p0 =
:p0 body isaggregate`,
            expected: [true]
        },
        {
            name: "Basic Transformations: P, I, R",
            description: "A tone row can be transformed in several ways. The **Prime (P)** form is the original row. **Inversion (I)** inverts the intervals around an axis (by default, the first note). **Retrograde (R)** is the row played backward.",
            example: `# P5: Prime form transposed up by 5 semitones
:p0 body 5 transposepcs

# I0: Inversion of the prime form
:p0 body invertrow

# R0: Retrograde of the prime form
:p0 body retrograde`,
            replCode: `
(0 11 7 8 3 4 9 10 6 5 1 2) :p0 =
# P5: Prime form transposed up by 5 semitones
:p0 body 5 transposepcs

# I0: Inversion of the prime form
:p0 body invertrow

# R0: Retrograde of the prime form
:p0 body retrograde`,
            expected: [[5, 4, 0, 1, 8, 9, 2, 3, 11, 10, 6, 7], [0, 1, 5, 4, 9, 8, 3, 2, 6, 7, 11, 10], [2, 1, 5, 6, 10, 9, 4, 3, 8, 7, 11, 0]]
        },
        {
            name: "The `rowform` Operator",
            description: "The `rowform` operator is a convenient tool for generating all 48 forms of a tone row. It takes the row and a string like 'p0', 'i5', 'r6', or 'ri11' to generate the Prime, Inversion, Retrograde, or Retrograde-Inversion form at a specific transposition level.",
            example: `:p0 body "ri5" rowform`,
            replCode: `(0 11 7 8 3 4 9 10 6 5 1 2) :p0 =
:p0 body "ri5" rowform`,
            expected: [[3, 4, 0, 11, 7, 8, 1, 2, 9, 10, 6, 5]]
        },
        {
            name: "Partitioning and Harmony",
            description: "Rows are often partitioned into smaller segments (dyads, trichords, tetrachords, etc.) to create melodic fragments or chords. The `partition` operator splits a list into chunks of a given size.",
            example: `:p0 body 3 partition`,
            replCode: `(0 11 7 8 3 4 9 10 6 5 1 2) :p0 =
:p0 body 3 partition`,
            expected: [[ [0, 11, 7], [8, 3, 4], [9, 10, 6], [5, 1, 2] ]]
        },
        {
            name: "Hexachordal Combinatoriality",
            description: "A key feature of some rows is **combinatoriality**, where a hexachord (the first six notes) of one row form can be combined with a hexachord of another to form a complete 12-tone aggregate. The `iscombinatorial` operator checks this property.",
            example: `# Get the first hexachord of P0
:p0 body 6 partition first :h1p0 =

# Get the first hexachord of I5 (the combinatorial pair for this row)
:p0 body "i5" rowform 6 partition first :h1i5 =

# Check if they form an aggregate
:h1p0 body :h1i5 body iscombinatorial`,
            replCode: `
(0 11 7 8 3 4 9 10 6 5 1 2) :p0 =
# Get the first hexachord of P0
:p0 body 6 partition first :h1p0 =

# Get the first hexachord of I5 (the combinatorial pair for this row)
:p0 body "i5" rowform 6 partition first :h1i5 =

# Check if they form an aggregate
:h1p0 body :h1i5 body iscombinatorial`,
            expected: [true]
        },
        {
            name: "Prime Form Analysis",
            description: "To analyze and compare the harmonic content of different segments, musicians use a canonical representation called the **prime form**. The `primeform` operator calculates this for any set of pitch classes.",
            example: `# The prime form of the first trichord of P0
(0 11 7) primeform`,
            expected: [[0, 1, 5]]
        },
        {
            name: "Compositional Example",
            description: "Let's create a short piece. We'll present the first hexachord of P0 melodically, and then present the notes of the first hexachord of I5 together as a fast arpeggio to create a chordal texture. This demonstrates how combinatoriality can be used to create harmonic fields while still presenting all 12 tones.",
            example: `120 tempo
(
    # P0 hexachord melody (0 11 7 8 3 4), transposed to C4
    60 e 71 e 67 q 68 e 63 e 64 q
    
    # I5 hexachord arpeggio (5 6 10 9 2 1), transposed to C4
    (65 66 70 69 62 61) h
) dur engrave`,
            assert: (s) => s[0]?.type === 'engraving',
            expectedDescription: "An engraved musical score."
        },
        {
            name: "Hexachordal Invariance",
            description: "Invariance refers to properties of a set that are preserved under transformation. A common type is hexachordal invariance, where two different row forms share a number of common pitch classes in their hexachords. The `invariants` operator finds these common pitches.",
            example: `
# A row where P0 and I5 share 4 common tones in their first hexachords
(0 1 4 2 9 5)  # first hexachord of P0
(5 4 1 3 8 0)  # first hexachord of I5
invariants`,
            expected: [[0, 1, 4, 5]],
            expectedDescription: "A list of the 4 pitch classes common to both hexachords."
        },
        {
            name: "Cross Partitions",
            description: "A cross-partition arranges a row into a matrix, with the row's segments forming the columns. This generates new melodic material (the horizontal rows) and harmonic material (the vertical columns). The `crosspartition` operator takes a row and a dimensions list `(rows cols)`.",
            example: `
# The tone row from Schoenberg's Op. 33a
(0 11 7 4 2 9 3 8 10 1 5 6)

# Create a 3x4 cross-partition
(3 4) crosspartition

# The result is a matrix. We can use 'rows' to extract the
# new melodic lines created by the partition.
rows`,
            expected: [[0, 4, 3, 1], [11, 2, 8, 5], [7, 9, 10, 6]],
            expectedDescription: "Three new melodic lines derived from the original tone row."
        },
        {
            name: "Metre from Pitch Relations with `metre`",
            description: "In serial music, rhythm is often treated as an independent parameter from pitch. However, rhythmic emphasis (metre) can be derived directly from the intervallic relationships within the tone row itself. The `metre` operator automates this process. It takes a list of pitches and a list of rules, where each rule is a `[predicate accent]` pair. The predicate is a quotation that evaluates the relationship between two adjacent notes `(current next)`, and the `accent` is a numeric value added to the current note's accent level if the predicate is true.",
            example: `
# Schoenberg's Op. 42 row
(0 11 7 8 3 4 9 10 6 5 1 2) :p0 =

# Define rules for metric accent
(
    # Rule 1: Accent large leaps (>= major third) with a value of 2
    ( (swap - abs 4 >=) 2 )
    
    # Rule 2: Add a smaller accent for any ascending motion
    ( (<) 1 )
) :rules =

# Generate the accent pattern from the prime row
:p0 body :rules metre`,
            expected: [[3, 2, 1, 2, 1, 3, 1, 2, 0, 2, 1, 0]],
            expectedDescription: "A list of accent values, one for each note in the row, based on the defined rules."
        }
    ]
};
