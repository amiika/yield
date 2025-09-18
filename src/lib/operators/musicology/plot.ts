
import type { Operator, PlotObject, StackValue } from '../../types';
import { resolveKeyInfo } from './defaults';

export const plot: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length === 0) {
                throw new Error('plot expects a sequence on the stack.');
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
                    throw new Error('plot requires a sequence before the options list.');
                }
                sequence = s.pop() as any[];
            } else {
                sequence = s.pop() as any[];
            }
            
            if (!Array.isArray(sequence)) {
                s.push(sequence); // Push back if it wasn't a sequence
                if(optionsList.length > 0 || isOptionsList(optionsList)) s.push(optionsList);
                throw new Error('plot expects a sequence (list of [pitch, duration] pairs) as the first argument.');
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
            const { tonic, scaleType: keyScaleType } = resolveKeyInfo(keyValue);
            
            const explicitScale = opts['scale'] ?? (dictionary[':scale'] ? dictionary[':scale'].body : undefined);
            const scaleType = explicitScale ? (typeof explicitScale === 'symbol' ? Symbol.keyFor(explicitScale) : String(explicitScale)) : keyScaleType;

            const resolveSimpleOption = (optionKey: string, symbolKey: string, fallback: any) => {
                if (opts[optionKey] !== undefined) return opts[optionKey];
                const def = dictionary[symbolKey];
                return (def && 'body' in def) ? def.body : fallback;
            };

            const plotData: PlotObject = {
                type: 'plot',
                sequence: sequence,
                pitchType: resolveSimpleOption('pitch_type', ':pitch_type', 'midi') as any,
                tonic: tonic,
                scaleType: (scaleType || 'chromatic').toString(),
                timeSignature: resolveSimpleOption('time_sig', ':sig', '4/4') as string,
                tempo: resolveSimpleOption('tempo', ':tempo', 120) as number,
            };
            s.push(plotData);
        },
        description: `Creates a 'PlotObject' for visualizing a musical sequence. It consumes a sequence and an optional list of options. If options are omitted, it uses session variables (:key, :scale, :sig, :tempo).
Options:
- \`(:key V)\`: Sets the musical key. V can be a MIDI note (number) or a name (e.g., :C, :Gm). This determines the tonic and infers the key signature and scale type (major/minor). Default: session ':key' or 60.
- \`(:scale S)\`: Overrides the scale type inferred from the key (e.g., :dorian). Default: session ':scale' or scale from key.
- \`(:pitch_type S)\`: Sets pitch format ('midi', 'hz', 'cents', 'pitchClass'). Default: 'midi'.
- \`(:time_sig S)\`: Sets time signature (e.g., "4/4"). Default: session ':sig' or "4/4".
- \`(:tempo N)\`: Sets tempo in BPM. Default: session ':tempo' or 120.`,
        effect: `[sequence option_list?] -> [plot_object]`
    },
    examples: [
        {
            replCode: `
110 :tempo =
"4/4" :sig =
:major :scale =
60 :key =

# "Twinkle, Twinkle" sequence
(60 q 60 q 67 q 67 q 69 q 69 q 67 h) dur

# No options provided to plot, should use dictionary values
plot
`,
            assert: (s) => {
                const p = s[0];
                return s.length === 1 && p?.type === 'plot' &&
                       p.tempo === 110 && p.timeSignature === '4/4' &&
                       p.scaleType === 'major' && p.tonic === 60;
            },
            expectedDescription: 'A plot object using default values from the dictionary.'
        },
        {
            code: `
# "Row, Row, Row Your Boat" as a multi-staff plot with audio
100 tempo

# 1. Define the musical sequence as a matrix of phrases
(
    (60 q "Row," 60 q "row," (60 62) q "your" 64 h "boat,")
    (64 q "Gent-" 62 e "ly" 64 e "down" 65 e "the" 67 h "stream")
    ((72 72 72) q "Mer-ri-ly," (67 67 67) q "mer-ri-ly," (64 64 64) q "mer-ri-ly," (60 60 60) q "mer-ri-ly," 67 h "Life")
    (67 q "is" 65 e "but" 64 e "a" 62 h "dream.")
) dur :row-seq =

# 2. Calculate total duration (max duration of any row)
:row-seq ( ((1 at)) map sum ) map max :total-duration =

# 3. Create a playable quotation for each row and collect them
:row-seq (
    (
        ((0 at) (1 at) list) map
        seq 0.8 :piano synth 0.4 mul
    )
) map :voices =

# 4. Use 'poly' to mix all voices with a single clock
16 impulse :voices poly start
(hush) :total-duration wait

# 5. Generate plot (this will be left on the stack)
:row-seq
(
    (:key 60) (:scale :major) (:pitch_type :midi)
    (:time_sig "4/4") (:tempo 100)
)
plot`,
            replCode: `
100 tempo
(
    (60 q "Row," 60 q "row," (60 62) q "your" 64 h "boat,")
    (64 q "Gent-" 62 e "ly" 64 e "down" 65 e "the" 67 h "stream")
    ((72 72 72) q "Mer-ri-ly," (67 67 67) q "mer-ri-ly," (64 64 64) q "mer-ri-ly," (60 60 60) q "mer-ri-ly," 67 h "Life")
    (67 q "is" 65 e "but" 64 e "a" 62 h "dream.")
) dur :row-seq =

:row-seq
(
    (:key 60) (:scale :major) (:pitch_type :midi)
    (:time_sig "4/4") (:tempo 100)
)

plot`,
            async: {
                duration: 200,
                assert: (s) => s.length === 1 && s[0]?.type === 'plot',
                assertDescription: 'A multi-staff plot object for "Row, Row, Row Your Boat" and plays the audio.'
            }
        },
        {
            code: `
# "Twinkle, Twinkle, Little Star" as a multi-staff plot
110 tempo
(
    (60 q "Twin-" 60 q "kle," 67 q "twin-" 67 q "kle," 69 q "lit-" 69 q "tle" 67 h "star,"
     65 q "How" 65 q "I" 64 q "won-" 64 q "der" 62 q "what" 62 q "you" 60 h "are.")
    (67 q "Up" 67 q "a-" 65 q "bove" 65 q "the" 64 q "world" 64 q "so" 62 h "high,"
     67 q "Like" 67 q "a" 65 q "dia-" 65 q "mond" 64 q "in" 64 q "the" 62 h "sky.")
    (60 q "Twin-" 60 q "kle," 67 q "twin-" 67 q "kle," 69 q "lit-" 69 q "tle" 67 h "star,"
     65 q "How" 65 q "I" 64 q "won-" 64 q "der" 62 q "what" 62 q "you" 60 h "are.")
) dur :twinkle-seq =
:twinkle-seq
(
    (:key 60) (:scale :major) (:pitch_type :midi)
    (:time_sig "4/4") (:tempo 110)
)
plot`,
            assert: (s) => s.length === 1 && s[0]?.type === 'plot',
            expectedDescription: 'A multi-staff plot object for "Twinkle, Twinkle, Little Star".'
        },
        {
            code: `
# "Frère Jacques"
(
    60 q 62 q 64 q 60 q
    60 q 62 q 64 q 60 q
    64 q 65 q 67 h
    64 q 65 q 67 h
    (67 69) q (67 65) q (64 60) q
    (67 69) q (67 65) q (64 60) q
    60 q 55 q 60 h
    60 q 55 q 60 h
) dur
(
    (:key 60) (:scale :major) (:pitch_type :midi)
    (:time_sig "4/4") (:tempo 120)
)
plot`,
            assert: (s) => s.length === 1 && s[0]?.type === 'plot',
            expectedDescription: 'A plot object for "Frère Jacques".'
        },
        {
            code: `
# "Lamma Bada Yatathanna" - a traditional Arabic Muwashshah
(
    (62 0.375 "Lam-ma" 64 0.25 "ba-da" 65.5 0.25 "ya-ta-" 64 0.375 "than-na")
    (62 0.375 "Hub-bi" 60 0.25 "ja-ma-" 62 0.25 "lu" 64 0.375 "fa-tan-na")
    (67 0.375 "Aw-ma" 69 0.25 "bi-" 70 0.25 "lah-zi" 72.5 0.375 "a-sar-na")
    (70 0.375 "Ghus-nu" 69 0.25 "tha-" 67 0.625 "na")
    (67 0.375 "hi-na" 65.5 0.25 "ma-" 64 0.25 "al" 62 0.375 "")
) dur

# Plotting options
(
    (:key 62)
    (:scale :nahawand)
    (:pitch_type :midi)
    (:time_sig "10/8")
    (:tempo 90)
)
plot`,
            assert: (s) => s.length === 1 && s[0]?.type === 'plot' && s[0].scaleType === 'nahawand',
            expectedDescription: 'A plot object for "Lamma Bada Yatathanna".'
        }
    ]
};