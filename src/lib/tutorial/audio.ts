
import type { TutorialSection } from './types';

export const audio: TutorialSection = {
    name: "Audio: Making Beeps",
    description: "Yield has a built-in audio engine for live coding sound and music.",
    cells: [
        {
            name: "Building an Audio Quotation",
            description: "Audio operators build a quotation (a program) on the stack. `440 sine` creates an oscillator quotation, and `0.5 mul` adds a volume control step to it. The stack holds the program, not the sound itself.",
            example: "440 sine 0.5 mul",
            assert: (s) => Array.isArray(s[0]) && s[0].length === 3 && s[0][2] === 'mul',
            expectedDescription: "([[440, 'sine'], 0.5, 'mul'])"
        },
        {
            name: "Playing a One-Shot Sound",
            description: "The `play` operator is for one-shot sounds. It consumes an audio quotation and a duration (in beats), then transpiles and plays the sound in the background. Here, `0.5 play` plays the sound for half a beat.",
            example: "440 sine 0.5 mul 0.5 play",
            assert: (s) => s.length === 0,
            expectedDescription: "Stack should be empty after playing"
        },
        {
            name: "Creating a Rhythm with `start`",
            description: "To create a continuous beat, use the `start` operator. The `impulse` operator creates a repeating trigger signal quotation. We can feed this into a pre-built drum machine like `bd` (bass drum) to create a persistent beat that must be stopped manually with `hush`.",
            example: "2 impulse bd start",
            assert: (s) => s.length === 0,
            expectedDescription: "Stack should be empty after starting the sound"
        },
        {
            name: "Rhythmic Phrasing with `play`",
            description: "The `play` operator can automatically create a rhythm. If you provide a `seq` node without an explicit clock, `play` will calculate the correct tempo to fit the sequence perfectly into the given duration. The `note` operator is a pure function that converts MIDI note numbers to frequencies.",
            example: "(60 64 67 72) note seq sine 0.4 mul 1 play",
            assert: (s) => s.length === 0,
            expectedDescription: "Plays a 4-note arpeggio in 1 beat."
        },
        {
            name: "Composing a Song",
            description: "You can combine multiple sequences and voices to create a full musical piece. The `poly` operator automatically mixes its outputs, simplifying composition. The final sound quotation is started with `start` to make it loop.",
            example: `
# 1. Create a master clock signal quotation
8 impulse

# 2. Use the 'poly' combinator to create and automatically mix three drum parts.
# Each part is a quotation that takes the clock and produces a final, gain-adjusted drum sound quotation.
(
  ( (1 0 1 0 1 0 1 0) seq hh 0.5 mul )  # Hi-hat with gain 0.5
  ( (0 0 1 0 0 0 1 0) seq sd 0.8 mul )  # Snare with gain 0.8
  ( (1 0 0 0 1 0 0 0) seq bd 1.0 mul )  # Kick with gain 1.0
) poly

# The stack now contains a single mixed drum quotation.

# 3. Create the bassline quotation using a fresh clock signal.
8 impulse (40 40 43 45 43 40 40 35) note seq saw 0.2 mul

# 4. Mix the combined drums quotation with the bassline quotation.
mix

# 5. Apply a master gain and start the final mix.
0.4 mul start`,
            assert: (s) => s.length === 0,
            expectedDescription: "Stack should be empty after starting the song"
        },
        {
            name: "Arpeggiated Chord Progression",
            description: "Live loops are powerful for building up song structures. Here, we create two separate loops running in parallel: one for a chiptune-style arpeggiated chord progression using a pulse wave, and another for a simple sine wave bassline. Both loops use the `elapsed` time to stay in sync.",
            example: `120 tempo

# --- Live Loop 1: Arpeggiated Chords (Pulse Wave) ---
(
  # Get current beat number, looping every 4 beats (a measure)
  elapsed 2 * floor 4 %
  
  # Chord progression data: (base_note third_semi fifth_semi)
  # C, G, Am, F
  ( (60 4 7) (55 4 7) (57 3 7) (53 4 7) ) swap at
  
  # Spread the chord data onto the stack
  spread
  
  # Arpeggiate at 20Hz
  20 arp
  
  # Use a pulse wave with 25% duty cycle and apply gain
  0.25 pulse 0.3 mul
  
  # Play it for 1 beat
  1.0 play
  
) 1.0 live :chords =>

# --- Live Loop 2: Bassline (Sine Wave) ---
(
  # Get current beat, synced with the chord loop
  elapsed 2 * floor 4 %
  
  # Bassline follows the chord roots one octave down: C, G, A, F
  (48 43 45 41) swap at
  
  # Convert MIDI note to frequency and create a sine wave
  note sine
  
  # Give it a simple envelope and gain
  (0.01 0.4 0 ahr) mul 0.4 mul
  
  # Play for 1 beat
  1.0 play

) 1.0 live :bass =>

# Start both loops
:chords
:bass`,
            async: {
                duration: 600, // wait for at least one beat
                assert: (s, dict) => {
                    const loopsList = dict[':loops']?.body;
                    return Array.isArray(loopsList) &&
                           loopsList.includes(':chords') &&
                           loopsList.includes(':bass');
                },
                assertDescription: "Both the :chords and :bass loops should be running."
            }
        }
    ]
};
