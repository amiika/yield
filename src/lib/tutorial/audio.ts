import type { TutorialSection } from './types';

export const audio: TutorialSection = {
    name: "Audio: Making Beeps",
    description: "Yield has a built-in audio engine for live coding sound and music.",
    cells: [
        {
            name: "Playing a Sound",
            description: "Audio graphs are built on the stack as lists. `440 sine` creates a sine wave oscillator, `0.5 mul` adjusts its volume, and `play` starts the sound.",
            example: "440 sine 0.5 mul play",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: "An audio graph on the stack"
        },
        {
            name: "Creating a Rhythm",
            description: "The `impulse` operator creates a repeating trigger signal. We can feed this into a pre-built drum machine like `bd` (bass drum) to create a beat.",
            example: "2 impulse bd play",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: "A rhythmic audio graph"
        },
        {
            name: "Composing a Song",
            description: "You can combine multiple sequences and voices to create a full musical piece. Here's a simple techno beat with a bassline, built using the powerful `voices` combinator.",
            example: `
# 1. Create a master clock signal
8 impulse

# 2. Use the 'voices' combinator to create three drum parts from the clock.
# Each part is a quotation that takes the clock and produces a final, gain-adjusted drum sound.
(
  ( (1 0 1 0 1 0 1 0) seq hh 0.5 mul )  # Hi-hat with gain 0.5
  ( (0 0 1 0 0 0 1 0) seq sd 0.8 mul )  # Snare with gain 0.8
  ( (1 0 0 0 1 0 0 0) seq bd 1.0 mul )  # Kick with gain 1.0
) voices

# The stack now contains [hi-hat_sound, snare_sound, kick_sound]. Let's mix them.
mix mix

# 3. Create the bassline using a fresh clock signal.
8 impulse (40 40 43 45 43 40 40 35) seq note saw 0.2 mul

# 4. Mix the combined drums with the bassline.
mix

# 5. Apply a master gain and play the final mix.
0.4 mul play
`,
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: "A complex audio graph for the song"
        }
    ]
};
