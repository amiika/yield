

import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const ctrl: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 3) throw new Error('ctrl expects 3 arguments on the stack.');
            const value = s.pop();
            const paramSymbol = s.pop();
            const patchNameSymbol = s.pop();
            
            if (typeof patchNameSymbol !== 'symbol' || typeof paramSymbol !== 'symbol' || typeof value !== 'number') {
                // Push back in reverse order to restore state before throwing
                s.push(patchNameSymbol, paramSymbol, value);
                throw new Error('ctrl expects: symbol (patch name), symbol (param name), number (value)');
            }
            
            const patchName = Symbol.keyFor(patchNameSymbol);
            if (!patchName) throw new Error('ctrl: Invalid symbol for patch name.');
            
            const paramName = Symbol.keyFor(paramSymbol);
            if (!paramName) throw new Error(`ctrl: Invalid symbol for parameter name.`);

            audioEngine.ctrl(patchName, paramName, value);
        },
        description: 'Controls a parameter of a running audio patch. Consumes the patch name, parameter name, and value from the stack.',
        effect: '[A B C] -> []'
    },
    examples: [
        {
            replCode: `# A simple synth patch with a controllable frequency.
# Define it as data using \`=\`.
:freq saw 0.5 mul :synth-patch =

# Play the synth, giving this voice the name :synth1.
# It starts silently as the default for :freq is 0.
:synth1 :synth-patch start

# A live loop to play a melody by controlling the :freq parameter.
120 tempo # Set a tempo for predictable timing
(
  # Use elapsed time to deterministically pick a note from the sequence.
  # This creates an 8th note arggio at 120bpm.
  elapsed 4 * floor 4 %  # Get an index 0,1,2,3 cycling every half beat
  (60 64 67 72) swap at    # Get the MIDI note from the list
  note                     # Convert MIDI note to frequency
  :synth1 :freq rolldown ctrl # Send frequency to the :freq param of voice :synth1
) 0.25 live :melody =>
:melody`,
            async: {
                duration: 600,
                assert: (s, dict) => dict[':melody'] !== undefined,
                assertDescription: "The :melody function should be defined."
            }
        },
        {
            replCode: `# A synth with a controllable filter cutoff.
48 note saw :cutoff 0.8 lpf 0.4 mul :filtered-patch =

# Play the synth, naming the voice :lfo-synth.
:lfo-synth :filtered-patch start

# An LFO loop to modulate the filter cutoff.
(
  # Calculate a sine wave value between 0.1 and 0.9 for the cutoff
  elapsed 2 * sin 0.4 * 0.5 +
  
  # Send this value to the :cutoff parameter of our running synth
  :lfo-synth :cutoff rolldown ctrl
) 0.1 live :lfo =>
:lfo`,
            async: {
                duration: 600,
                assert: (s, dict) => dict[':lfo'] !== undefined,
                assertDescription: "The :lfo function should be defined."
            }
        },
        {
            replCode: `# A synth with a controllable pan parameter.
220 saw :pan pan 0.3 mul :panner-patch =

# Play the synth, naming the voice :panner1.
:panner1 :panner-patch start

# A live loop to link mouse X to the pan parameter.
(
  # mousex is in pixels. Pan wants a value from -1 to 1.
  # This example normalizes an 800px-wide REPL area.
  mousex 800 / 0.5 - 2 *
  
  # Send the calculated pan value to the synth
  :panner1 :pan rolldown ctrl
) 0.05 live :mouse-control =>
:mouse-control`,
            async: {
                duration: 600,
                assert: (s, dict) => dict[':mouse-control'] !== undefined,
                assertDescription: "The :mouse-control function should be defined."
            }
        },
        { 
            code: ':my-synth :freq 440 ctrl', 
            expected: []
        },
    ]
};
