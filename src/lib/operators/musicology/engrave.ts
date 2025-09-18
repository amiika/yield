
import type { Operator, EngravingObject, StackValue } from '../../types';
import { resolveKeyInfo } from './defaults';

export const engrave: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length === 0) {
                throw new Error('engrave expects a sequence on the stack.');
            }

            const isOptionsList = (item: any): item is [symbol, StackValue][] => {
                if (!Array.isArray(item)) return false;
                if (item.length === 0) return true;
                return item.every(pair => 
                    Array.isArray(pair) && 
                    pair.length === 2 && 
                    typeof pair[0] === 'symbol'
                );
            };

            let optionsList: [symbol, StackValue][] = [];
            let sequence: any[];

            if (isOptionsList(s[s.length - 1])) {
                optionsList = s.pop() as [symbol, StackValue][];
                if (s.length === 0) {
                    s.push(optionsList); // push back
                    throw new Error('engrave requires a sequence before the options list.');
                }
                sequence = s.pop() as any[];
            } else {
                sequence = s.pop() as any[];
            }

            if (!Array.isArray(sequence)) {
                s.push(sequence); // Push back if it wasn't a sequence
                if(optionsList.length > 0 || isOptionsList(optionsList)) s.push(optionsList);
                throw new Error("engrave expects a sequence (from dur) as the first argument.");
            }

            const opts: { [key: string]: StackValue } = {};
            for (const pair of optionsList) {
                if (Array.isArray(pair) && pair.length === 2 && typeof pair[0] === 'symbol') {
                    const key = Symbol.keyFor(pair[0]);
                    if (key) {
                        const valueSymbol = pair[1];
                        if (typeof valueSymbol === 'symbol') {
                             opts[key] = Symbol.keyFor(valueSymbol) || valueSymbol;
                        } else {
                            opts[key] = valueSymbol;
                        }
                    }
                }
            }
            
            const keyValue = opts['key'] ?? (dictionary[':key'] ? dictionary[':key'].body : 60);
            const { tonic, keySignature, scaleType: keyScaleType } = resolveKeyInfo(keyValue);
            
            const explicitScale = opts['scale'] ?? (dictionary[':scale'] ? dictionary[':scale'].body : undefined);
            const scaleType = explicitScale ? (typeof explicitScale === 'symbol' ? Symbol.keyFor(explicitScale) : String(explicitScale)) : keyScaleType;

            const resolveSimpleOption = (optionKey: string, symbolKey: string, fallback: any) => {
                if (opts[optionKey] !== undefined) return opts[optionKey];
                const def = dictionary[symbolKey];
                return (def && 'body' in def) ? def.body : fallback;
            };

            const engravingData: EngravingObject = {
                type: 'engraving',
                sequence: sequence,
                pitchType: 'midi',
                tonic: tonic,
                keySignature: keySignature,
                scaleType: (scaleType || 'major').toString(),
                timeSignature: resolveSimpleOption('time_sig', ':sig', '4/4') as string,
                tempo: resolveSimpleOption('tempo', ':tempo', 120) as number,
            };
            s.push(engravingData);
        },
        description: `Creates an 'EngravingObject' for rendering musical notation. It consumes a sequence from 'dur' and an optional list of options. If options are omitted, it uses session variables (:key, :scale, :sig, :tempo).
Options:
- \`(:key V)\`: Sets the musical key. V can be a MIDI note (number) or a name (e.g., :C, :Gm). This determines the tonic and key signature. Default: session ':key' or 60.
- \`(:scale S)\`: Overrides the scale type inferred from the key (e.g., :dorian). Default: session ':scale' or scale from key.
- \`(:time_sig S)\`: Sets time signature (e.g., "4/4"). Default: session ':sig' or "4/4".
- \`(:tempo N)\`: Sets tempo in BPM. Default: session ':tempo' or 120.`,
        effect: `[sequence option_list?] -> [engraving_object]`
    },
    examples: [
        {
            replCode: `
110 :tempo =
"4/4" :sig =
:G :key =

# "Twinkle, Twinkle" sequence
(60 q 60 q 67 q 67 q) dur

# No options provided to engrave, should use dictionary values
engrave
`,
            assert: (s) => {
                const p = s[0];
                return s.length === 1 && p?.type === 'engraving' &&
                       p.tempo === 110 && p.timeSignature === '4/4' &&
                       p.keySignature === 'G' && p.tonic === 67;
            },
            expectedDescription: 'An engraving object using default values from the dictionary.'
        },
        {
            code: `
# "Twinkle, Twinkle, Little Star"
(
    (60 q "Twin-" 60 q "kle," 67 q "twin-" 67 q "kle," 69 q "lit-" 69 q "tle" 67 h "star,")
) dur
(
    (:key :C)
    (:time_sig "4/4") (:tempo 110)
)
engrave`,
            assert: (s) => s.length === 1 && s[0]?.type === 'engraving',
            expectedDescription: 'An engraving object for "Twinkle, Twinkle, Little Star".'
        },
        {
            replCode: `
# --- Generative 12-Tone Composition ---

# 1. Define a prime tone row (Schoenberg, Op. 42)
(0 11 7 8 3 4 9 10 6 5 1 2) :p0 =

# 2. Generate transformations: Inversion, Retrograde, Retrograde-Inversion
:p0 (0 swap - 12 + 12 %) map :i0 =  # Inversion of P0
:p0 reverse :r0 =                   # Retrograde of P0
:i0 reverse :ri0 =                  # Retrograde-Inversion of P0

# 3. Compose a piece by concatenating these rows.
# Using P0, I5 (transposed I0), R0, and RI5.
:p0
:i0 (5 + 12 %) map # Transpose I0 to start on pitch class 5 -> I5
:r0
:ri0 (5 + 12 %) map # Transpose RI0 to start on pitch class 5 -> RI5
concat concat concat (60 +) map :melody =

# 4. Create a rhythmic sequence.
() ( (e s s) concat ) 16 times :rhythm =

# 5. Combine melody and rhythm for engraving.
:melody :rhythm zip (spread) map dur

# 6. Engrave the score.
( (:key :C) (:time_sig "4/4") (:tempo 90) ) engrave
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'engraving',
            expectedDescription: 'An engraved score of a short, algorithmically generated 12-tone piece.'
        }
    ]
};
