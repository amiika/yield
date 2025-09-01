import { operatorModules } from './operators';
import type { Operator } from './types';

// Helper to build a flat map of all operators for easy lookup.
const allOperators: { [key:string]: Operator } = {};
for (const category of Object.values(operatorModules)) {
    for (const opName in category.definitions) {
        allOperators[opName] = category.definitions[opName];
    }
}

// Helper to get the full operator object by name, for use in the notebook structure.
// This will be used to build the cell data.
const getOperator = (name: string): any => {
    const op = allOperators[name];
    if (!op) throw new Error(`Operator '${name}' not found for documentation.`);
    
    const exampleCode = op.examples[0].code;
    const example = Array.isArray(exampleCode) ? exampleCode.join('\n') : exampleCode;
    
    return {
        name: name,
        ...op.definition,
        example: example
    };
};

// This defines the structure of the interactive notebook.
// The content (description, example, etc.) is pulled dynamically from the operator files.
const notebookStructure = [
    {
        name: "Getting Started: Comments & Primitives",
        description: "The basics of the Yield language, including syntax and fundamental data types.",
        operators: ['true', 'false'] // Names of operators to include in this section
    },
    {
        name: "Variables & Stateful Functions",
        description: "In Yield, there is no distinction between 'global state' and 'functions'. Everything is a word in the dictionary pointing to a list. If the list contains operators, it's a function; if it contains data, it's a variable. The `popto` (`=`) and `appendTo` (`<-`) operators modify these dictionary definitions.",
        operators: ['popto', 'appendTo', 'body', 'yield']
    },
    { name: "Stack Primitives", category: "stack" },
    { name: "Advanced Stack Operations", category: "advancedStack" },
    { name: "Aggregate (List) Operators", category: "lists" },
    { name: "Functional & Aggregate Operations", category: "functional" },
    { name: "Utility Operators", category: "utils" },
    { name: "Set operations", category: "logic" },
    { name: "Mathematical & Bitwise Operators", category: "math" },
    { name: "Predicates", category: "predicates" },
    { name: "JavaScript String Operations", category: "jsString" },
    { name: "Advanced Types & Regex", category: "advancedTypes" },
    { name: "Combinators", category: "combinators" },
    { name: "System & Environment", category: "literals" },
    { name: "History Management", category: "history" },
    { name: "Audio Synthesis", category: "audio" },
    { name: "Bytebeat & Floatbeat" },
    { name: "Type & Conversion", category: "types" },
    { name: "Recursive Combinators", category: "recursion" },
];

// Dynamically generate the full documentation object for the UI.
export const documentation = notebookStructure.map(sectionConfig => {
    const category = operatorModules[sectionConfig.category];
    const section = {
        name: sectionConfig.name,
        description: sectionConfig.description || category?.description || '',
        cells: []
    };

    // Add static, manually defined cells for conceptual topics.
    if (sectionConfig.name === "Getting Started: Comments & Primitives") {
        section.cells.push(
            { name: "Comments", description: "Yield supports two styles of comments. `(* ... *)` for block comments, and `#` for comments that go to the end of the line. The interpreter ignores all comments.", effect: "N/A", example: "1 2 + (* This is a comment *)" },
            { name: "Integers & Floats", description: "Numbers (both integers and decimals) are pushed directly onto the stack.", effect: "-> N", example: "42 -10 3.14159" },
            { name: "Strings (Bare Words & Quoted)", description: "Any word that is not a defined operator or number is treated as a string. Use double quotes `\"...\"` for strings containing spaces or to use a reserved word as a string literal.", effect: "-> S", example: "hello # is the string \"hello\"\n\"hello world\" # is a multi-word string" },
            { name: "Symbols", description: "Words prefixed with a colon, like `:freq`, are symbols. They are used as lightweight, unique identifiers, particularly for naming parameters in audio patches.", effect: "-> Sym", example: ":my-symbol" }
        );
    }

    // Add cells dynamically from operator definitions.
    let operatorNames = sectionConfig.operators || (category ? Object.keys(category.definitions) : []);
    
    // For the main Audio Synthesis tutorial, filter out the bytebeat-specific operators
    // so that they are only documented in the "Bytebeat & Floatbeat" section.
    if (sectionConfig.category === 'audio') {
        operatorNames = operatorNames.filter(opName => !['bytebeat', 'floatbeat', 't'].includes(opName));
    }

    for (const opName of operatorNames) {
        section.cells.push(getOperator(opName));
    }
    
    if (sectionConfig.name === "Audio Synthesis") {
        // --- Refactored for a better learning curve ---

        // 4. ADVANCED TOPIC: Placed at the end of all audio operators.
        section.cells.push({
            name: "How Audio Works: Custom Synths (Advanced)",
            description: `Yield's audio system is based on building a graph of signal processors. You use audio operators like \`sine\`, \`lpf\`, and \`mul\` to construct this graph on the stack. The final graph is a nested list that represents the complete synthesizer.

1.  **Build the Graph**: Execute a sequence of audio operators. They consume parameters and other graph nodes from the stack and push a new, combined graph node back onto the stack.
2.  **Name the Patch**: Use \`patch\` with a symbol to take the final graph from the stack and store it as a named, reusable template.
3.  **Play & Control**: Use \`play\` to start the sound, and \`ctrl\` to change parameters of a running patch. Parameter names (e.g., \`:freq\`) are symbols inferred from the operators used when building the graph.`,
            effect: "N/A",
            example: `# 1. Build the graph for a synth and name it in one go.
# The operators execute from left to right, building up the graph on the stack.
# 'patch' consumes the final graph and the symbol name.
60 note saw 1000 0.7 lpf 0.5 mul :my-synth patch

# 2. Play it.
:my-synth play

# 3. Control its parameters in real-time.
:my-synth :freq 440 ctrl
:my-synth :cutoff 400 ctrl

# 4. Stop it.
:my-synth stop`
        });

        // 5. GRAND FINALE: A complete song example.
        section.cells.push({
            name: "Putting It All Together: A Full Song",
            description: `This example combines everything we've learned: setting a tempo, sequencing drums, creating a bassline, adding a lead synth with effects, and mixing it all together into a complete musical loop. Press play to hear the final result.`,
            effect: "N/A",
            example: `# 1. Set the project tempo to 135 BPM
135 tempo

# 2. Create the main 8th note clock
# (135 BPM / 60s) * 2 beats-per-8th = 4.5 Hz
[4.5 impulse] clk =

# 3. Sequence the Drums
# Kick drum on a classic "four-on-the-floor" pattern
clk [1 0 1 0 1 0 1 0] seq bd

# Snare drum on beats 2 and 4
clk [0 0 1 0 0 0 1 0] seq sd

# Mix kick and snare
mix

# Hi-hats on every 8th note
clk [1 1 1 1 1 1 1 1] seq hh

# Mix in the hi-hats
mix

# --- Store the final drum mix on the stack for later ---
# (The drum graph is now the only thing on the stack)

# 4. Create the Bassline
# First, create the frequency sequence from the clock and note data
clk [40 40 43 38] seq note
# Then, feed that frequency sequence into a saw wave oscillator
saw

# Give it a punchy envelope
clk [1 1 1 1 1 1 1 1] seq 0.001 0.3 ad

# Multiply oscillator by envelope
mul

# Low-pass filter to shape the sound
400 0.5 lpf

# 5. Mix the bassline with the drums
# (Stack: [Drums] [Bass]) -> [Mixed]
mix

# 6. Create the Lead Synth (Arpeggio)
# 16th note clock (double the main clock's frequency)
[9 impulse] arp_clk =

# Create the frequency sequence for the arpeggio
arp_clk [60 63 67 72 63 67 72 75 67 72 75 79 72 75 79 84] seq note
# Feed it into a pulse wave oscillator with a 50% duty cycle
0.5 pulse

# A sharp, plucky envelope
arp_clk [1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0] seq 0.01 0.2 ad

# Multiply oscillator by envelope
mul

# Add a touch of stereo delay for space
0.375 0.6 delay

# Pan it slightly to the right
0.2 pan

# 7. Mix the lead synth with everything else
# (Stack: [Drums+Bass] [Lead]) -> [Mixed]
mix

# 8. Final touches
# Attenuate the final mix to prevent clipping
0.6 mul

# 9. Play the final song!
play`
        });

        const synthesisTutorials = [
            {
                name: "Getting Started: Drum Machines",
                description: `Yield includes several pre-built drum synthesizers for making sounds quickly. To play a single drum hit, just use the machine's name followed by the \`play\` operator.`,
                effect: "N/A",
                example: `# Play a single kick drum hit.\nbd play\n\n# Play a single snare drum hit.\n# (You may want to press the cell's stop button before playing a new sound)\nsd play`
            },
            {
                name: "Sequencing Drums",
                description: `To create rhythms, you need a repeating trigger signal. The \`impulse\` operator does this. It creates a steady beat at a given frequency in Hertz (beats per second). This trigger signal is then passed to the drum machine.`,
                effect: "N/A",
                example: `# A steady kick drum at 2Hz (120 BPM).\n# The 'impulse' creates the trigger, which 'bd' then uses.\n2 impulse bd play\n\n# A faster snare pattern at 4Hz.\n# Note: Stop the previous sound before starting a new one.\n4 impulse sd play`
            },
            {
                name: "Creating a Full Drum Beat",
                description: `By mixing the output of several sequenced drum machines, you can create complex rhythms. Here, we'll define a clock, create separate sequences for the kick, snare, and hi-hat, and then mix them all together to play as a single sound.`,
                effect: "N/A",
                example: `# Set tempo to 120 BPM\n120 tempo\n\n# 8th note clock (at 120bpm, 8ths are 4Hz)\n[4 impulse] clk =\n\n# Kick on beats 1 and 3\nclk [1 0 0 0 1 0 0 0] seq bd\n\n# Snare on beats 2 and 4\nclk [0 0 1 0 0 0 1 0] seq sd\n\n# Mix kick and snare together\nmix\n\n# Closed hi-hats on every 8th note\nclk [1 1 1 1 1 1 1 1] seq hh\n\n# Mix in the hi-hats\nmix\n\n# Attenuate the final mix to prevent clipping\n0.7 mul\n\n# Play the final beat!\nplay`
            },
        ];
        section.cells.unshift(...synthesisTutorials.reverse());
    }
    
    if (sectionConfig.name === "Bytebeat & Floatbeat") {
        section.description = "Create music with mathematical formulas. This dedicated section provides a focused tutorial on this unique and powerful synthesis technique, from basic sawtooth waves to complex, evolving textures.";
        const bytebeatTutorials = [
            {
                name: "Bytebeat: The Sawtooth Wave",
                description: `Bytebeat is music from a single mathematical formula. The key to understanding how it works in Yield is to know that your program runs **once** to set up the audio graph, but the audio itself runs **continuously** in a high-speed loop (e.g., 44,100 times per second).

Because of this, we can't write the formula directly on the stack. That would calculate a result only once. Instead, we wrap the formula in a quotation \`[...]\`. This captures the formula as a piece of data. The \`bytebeat\` operator takes this formula and sends it to the audio engine.

The audio engine then evaluates your formula for every single audio sample, creating the sound wave. The special operator \`t\` is a placeholder inside your formula that the audio engine replaces with the current sample number (0, 1, 2, 3...).

When \`t\` is used by itself, it creates a rising sawtooth wave as its value counts up from 0 to 255 and then wraps around.`,
                effect: "N/A",
                example: `# The simplest bytebeat is just t.
# We multiply by 0.5 to lower the volume.
[ t ] bytebeat 0.5 mul play`
            },
            {
                name: "Bytebeat: Pitch Control",
                description: "You can change the pitch using basic arithmetic. Multiplying `t` makes it count faster, raising the pitch. Dividing `t` makes it count slower, lowering the pitch. The formulas use postfix notation, where operators follow the values they act on.",
                effect: "N/A",
                example: `# To make the pitch higher, we multiply t by 4.
# In postfix, "t * 4" is written as "t 4 *".
# This means: 1. Push t, 2. Push 4, 3. Call multiply.
[ t 4 * ] bytebeat 0.5 mul play

# To lower the pitch, we can use division.
# The postfix for "t / 16" is "t 16 /".
[ t 16 / ] bytebeat 0.5 mul play`
            },
            {
                name: "Bytebeat: Amplitude & Modulo",
                description: "The modulo operator (`%`) confines the `t` counter to a specific range. `t 128 %` creates a sawtooth wave that only counts from 0 to 127. This reduces the amplitude (volume) by half and also doubles the frequency, as the wave now wraps around twice as fast.",
                effect: "N/A",
                example: `# This wave is quieter and an octave higher.
# The postfix for "t % 128" is "t 128 %".
[ t 128 % ] bytebeat play`
            },
            {
                name: "Bytebeat: Square Waves",
                description: "Bitwise operators are the heart of classic bytebeat sounds. The bitwise AND (`&`) operator can be used to isolate specific bits of the `t` counter. When you AND `t` with a power of two (like 128), the result flips between 0 and that number, creating a square wave.",
                effect: "N/A",
                example: `# This creates a square wave that jumps between 0 and 128.
[ t 128 & ] bytebeat 0.5 mul play`
            },
            {
                name: "Bytebeat: Octave Shifting",
                description: "The bitshift operators `>>` (right shift) and `<<` (left shift) are a fast way to divide or multiply a number by powers of two. In bytebeat, shifting `t` by 1 effectively halves or doubles its frequency, changing its pitch by one octave.",
                effect: "N/A",
                example: `# One octave down from the base sawtooth.
[ t 1 >> ] bytebeat 0.5 mul play

# One octave up.
[ t 1 << ] bytebeat 0.5 mul play`
            },
            {
                name: "Bytebeat: Mixing & Textures",
                description: "You can combine multiple expressions to create more complex sounds. The bitwise OR (`|`) operator acts like a lo-fi mixer, adding waveforms together. The bitwise XOR (`^`) operator creates complex, often glitchy and metallic sounds by flipping bits where the two inputs differ.",
                effect: "N/A",
                example: `# We can "mix" waves with bitwise OR (|).
# The formula (t >> 4) | (t << 2) becomes:
# 1. Calculate (t >> 4) -> t 4 >>
# 2. Calculate (t << 2) -> t 2 <<
# 3. OR the results together with |
[ t 4 >> t 2 << | ] bytebeat 0.2 mul play

# A classic formula using XOR for a noisy texture.
[ t 5 * t 7 >> ^ ] bytebeat 0.2 mul play`
            },
            {
                name: "Bytebeat: Translating Advanced Formulas",
                description: "Many bytebeat formulas are found online in a C-style infix notation. Yield's `bytebeat` uses a postfix (stack-based) notation inside its quotation. Translating between them involves identifying the order of operations and converting them to a stack-based sequence. This example breaks down a complex formula from the demoscene.",
                effect: "N/A",
                example: `# Original C-style formula from viznut:
# 128
# + 24*sin( ((t/24)*(t>>10))&42 + sin(((t/64)*(t>>15))&21) )
# + sin(t/12 + 4*sin(t/24)) * ((t>>11)&1) * 16
# + sin(t/24 + 4*sin(t/48)) * ((t>>10)&1) * 16
# + 56*( (3e3/((t*4)&16383))&1 )
# + 56*( (300/((t*32)&28600))&1 )
# + 12*sin( ((t/16)*(t>>10))&42 + sin(((t/64)*(t>>7))&8) )

# Yield (postfix) equivalent. The formula is a sum of 7 terms.
# Each term is calculated, leaving its result on the stack.
# The '+' operators then sum them up at the end.
[
  128
  # Term 2: 24 * sin(...)
  t 24 / t 10 >> * 42 & t 64 / t 15 >> * 21 & sin + sin 24 *
  +
  # Term 3: sin(...) * ... * 16
  t 12 / t 24 / sin 4 * + sin t 11 >> 1 & * 16 *
  +
  # Term 4: sin(...) * ... * 16
  t 24 / t 48 / sin 4 * + sin t 10 >> 1 & * 16 *
  +
  # Term 5: 56 * (...)
  3000 t 4 * 16383 & / 1 & 56 *
  +
  # Term 6: 56 * (...)
  300 t 32 * 28600 & / 1 & 56 *
  +
  # Term 7: 12 * sin(...)
  t 16 / t 10 >> * 42 & t 64 / t 7 >> * 8 & sin + sin 12 *
  +
]
bytebeat 0.3 mul play`
            },
            {
                name: "Introduction to Floatbeat",
                description: "Floatbeat is similar to bytebeat but uses floating-point numbers instead of 8-bit integers. Your formula should produce values in the -1.0 to 1.0 range, which are used directly as audio samples. This allows for higher fidelity sounds without the characteristic wrapping and bitwise artifacts of bytebeat.",
                effect: "N/A",
                example: `# A simple 440Hz sine wave.
# t is divided by the sample rate (e.g., 44100) to get time in seconds.
[ t 44100 / 440 * 2 * 3.14159 * sin ] floatbeat 0.5 mul play`
            },
            {
                name: "Floatbeat: Shepard Tone",
                description: `A classic audio illusion of a continuously rising or falling pitch. This formula achieves it by modulating a sine wave's frequency. Importantly, stack operators like 'dup' are not supported inside the quotation because the formula is transpiled to a single line of JavaScript, not executed on the Yield stack. The workaround is to simply recalculate the required value.`,
                effect: "N/A",
                example: `[ t 22050 / t 22050 / floor 2 % 2 * 1 - * 200 * sin ] floatbeat 0.3 mul play`
            },
        ];
        section.cells.push(...bytebeatTutorials);
    }


    if (sectionConfig.name === "Set operations") {
        section.cells.unshift({ 
            name: "Set Literals", 
            description: "Sets of small non-negative integers are written inside curly braces. Logical operators are overloaded to perform set operations.", 
            effect: "-> {I}", 
            example: "{1 2 3} {2 3 4} and # -> {2 3}" 
        });
    }

    if (sectionConfig.category === 'jsString') {
        const order = ['ucase', 'locase', 'trim', 'slice', 'splitstr', 'starts', 'ends', 'replace'];
         section.cells = order.map(opName => getOperator(opName));
    }

    if (sectionConfig.category === 'literals') {
        // Enforce a specific order for better readability
        const order = ['true', 'false', 'maxint', 'stack', 'clock', 'rand', 'clearall'];
        const existingOps = new Set(section.cells.map(c => c.name));
        const orderedCells = order.map(opName => {
            if (existingOps.has(opName)) {
                return section.cells.find(c => c.name === opName);
            }
            return null;
        }).filter(Boolean);
        // Add any new ops not in the order list to the end
        const unorderedCells = section.cells.filter(c => !order.includes(c.name));
        section.cells = [...orderedCells, ...unorderedCells];
    }


    return section;
});