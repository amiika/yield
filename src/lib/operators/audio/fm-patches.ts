
import type { Operator } from '../../types';

const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string';

// --- Preset Patch Definitions ---
interface FmPreset {
    opDefs: any[][];
    algorithmId: number;
}

const fmPresets: Record<string, FmPreset> = {
    'piano': {
        opDefs: [
            [75, 1.00, 0.01, 0.5, 0.0, 0.2, ':sine'],
            [65, 1.00, 0.01, 0.5, 0.0, 0.2, ':sine'],
            [80, 1.00, 0.01, 0.8, 0.0, 0.3, ':sine'],
            [70, 14.0, 0.01, 0.3, 0.0, 0.2, ':sine'],
            [60, 1.00, 0.01, 0.5, 0.0, 0.2, ':sine'],
            [78, 1.00, 0.01, 0.6, 0.0, 0.3, ':sine'],
        ],
        algorithmId: 5,
    },
    'e-piano': {
        opDefs: [
            [75, 1.00, 0.01, 0.5, 0.0, 0.2, ':sine'],
            [65, 1.00, 0.01, 0.5, 0.0, 0.2, ':sine'],
            [80, 1.00, 0.01, 0.8, 0.0, 0.3, ':sine'],
            [70, 14.0, 0.01, 0.3, 0.0, 0.2, ':sine'],
            [60, 1.00, 0.01, 0.5, 0.0, 0.2, ':sine'],
            [78, 1.00, 0.01, 0.6, 0.0, 0.3, ':sine'],
        ],
        algorithmId: 5,
    },
    'bass': {
        opDefs: [
            [80, 2.00, 0.01, 0.2, 0.0, 0.1, ':sine'],
            [70, 1.00, 0.01, 0.2, 0.0, 0.1, ':sine'],
            [90, 1.00, 0.01, 0.3, 0.0, 0.1, ':sine'],
            [60, 2.00, 0.01, 0.2, 0.0, 0.1, ':sine'],
            [50, 1.00, 0.01, 0.2, 0.0, 0.1, ':sine'],
            [88, 0.50, 0.01, 0.3, 0.0, 0.1, ':sine'],
        ],
        algorithmId: 15,
    },
    'bell': {
        opDefs: [
            [90, 3.50, 0.01, 0.5, 0.0, 0.8, ':sine'],
            [70, 2.00, 0.01, 0.5, 0.0, 0.8, ':sine'],
            [95, 1.00, 0.01, 1.0, 0.0, 1.2, ':sine'],
            [80, 0.50, 0.01, 0.5, 0.0, 0.8, ':sine'],
            [60, 4.00, 0.01, 0.5, 0.0, 0.8, ':sine'],
            [92, 1.50, 0.01, 1.0, 0.0, 1.2, ':sine'],
        ],
        algorithmId: 9,
    },
    'kalimba': {
        opDefs: [
            [99, 10.00, 0.62, 0.00, 0.989, 0.14, ':sine'],
            [87, 4.00, 0.54, 0.00, 0.989, 0.86, ':sine'],
            [99, 4.00, 0.52, 0.28, 0.363, 0.58, ':sine'],
            [87, 5.00, 0.42, 0.80, 0.727, 0.86, ':sine'],
            [99, 1.00, 0.42, 0.86, 0.000, 0.98, ':sine'],
            [86, 3.00, 0.34, 0.14, 0.989, 1.32, ':sine'],
        ],
        algorithmId: 19,
    },
    'tamboura': {
        opDefs: [
            [99, 1.00, 0.12, 1.40, 1.000, 1.20, ':sine'],
            [76, 0.50, 0.42, 0.02, 0.000, 1.54, ':sine'],
            [67, 3.00, 1.40, 1.28, 1.000, 1.22, ':sine'],
            [67, 3.00, 1.32, 1.28, 1.000, 0.00, ':sine'],
            [72, 12.00, 1.46, 1.28, 1.000, 1.22, ':sine'],
            [81, 3.00, 1.32, 1.32, 1.000, 0.00, ':sine'],
        ],
        algorithmId: 16,
    },
    'glide': {
        opDefs: [
            [99, 1.000, 0.74, 1.56, 1.000, 1.40, ':sine'],
            [0,  1.000, 1.32, 1.08, 0.505, 1.70, ':sine'],
            [94, 1.000, 1.60, 1.08, 1.000, 1.40, ':sine'],
            [89, 2.000, 1.34, 1.08, 0.505, 1.70, ':sine'],
            [73, 9.000, 0.28, 1.04, 1.000, 1.56, ':sine'],
            [0,  2.884, 1.62, 1.04, 1.000, 1.56, ':sine'],
        ],
        algorithmId: 3,
    },
    'violin': {
        opDefs: [
            [99, 2.00,  1.14, 0.08, 0.979, 1.08, ':sine'],
            [68, 6.00,  0.88, 0.24, 0.898, 1.98, ':sine'],
            [59, 8.00,  0.90, 0.14, 0.000, 0.78, ':sine'],
            [92, 6.00,  0.64, 0.14, 0.000, 1.98, ':sine'],
            [59, 8.00,  0.28, 0.14, 0.000, 0.68, ':sine'],
            [76, 10.00, 0.52, 0.58, 0.979, 0.04, ':sine'],
        ],
        algorithmId: 17,
    },
};

export const synth: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const patchSymbolOrData = s.pop();
            const arg1 = s.pop(); // velocity or note
            const arg2 = s.pop(); // note or gate
            
            let gate, note, velocity;
            let gateWasProvided = false;

            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                gate = s.pop();
                gateWasProvided = true;
                note = arg2;
                velocity = arg1;
            } else {
                gate = ['oneshot'];
                note = arg2;
                velocity = arg1;
            }
            
            const restoreStackAndThrow = (msg: string) => {
                if(gateWasProvided) s.push(gate);
                if(note !== undefined) s.push(note);
                if(velocity !== undefined) s.push(velocity);
                if(patchSymbolOrData !== undefined) s.push(patchSymbolOrData);
                throw new Error(msg);
            };

            if (typeof velocity !== 'number' || velocity < 0 || velocity > 1) {
                restoreStackAndThrow(`synth expects velocity (a number between 0.0-1.0) as the last argument before the patch name/data.`);
            }
            if (typeof note !== 'number' && !isAudioQuotation(note) && typeof note !== 'symbol') {
                restoreStackAndThrow(`synth expects a note number, quotation, or symbol.`);
            }

            let opDefs: any[][];
            let algorithmId: number;

            if (typeof patchSymbolOrData === 'symbol') {
                const patchName = Symbol.keyFor(patchSymbolOrData);
                if (!patchName) {
                    restoreStackAndThrow(`synth received an invalid symbol for the patch name.`);
                }
                const userDefKey = `:${patchName}`;
                const userDef = dictionary[userDefKey];
                
                if (userDef && 'body' in userDef && Array.isArray(userDef.body)) {
                    const userPatchData = userDef.body;
                    if (userPatchData.length === 2 && Array.isArray(userPatchData[0]) && userPatchData[0].length === 6 && typeof userPatchData[1] === 'number') {
                        opDefs = userPatchData[0];
                        algorithmId = userPatchData[1];
                    } else {
                        throw new Error(`User-defined synth patch ':${patchName}' has an invalid format. Expected a list of the form '((op_defs_list) algorithm_id)'.`);
                    }
                } else {
                    const preset = fmPresets[patchName];
                    if (!preset) {
                        throw new Error(`Synth preset ':${patchName}' not found.`);
                    }
                    opDefs = preset.opDefs;
                    algorithmId = preset.algorithmId;
                }
            } else if (Array.isArray(patchSymbolOrData)) {
                const userPatchData = patchSymbolOrData;
                if (userPatchData.length === 2 && Array.isArray(userPatchData[0]) && userPatchData[0].length === 6 && typeof userPatchData[1] === 'number') {
                    opDefs = userPatchData[0];
                    algorithmId = userPatchData[1];
                } else {
                    restoreStackAndThrow(`Synth patch data has an invalid format. Expected a list of the form '((op_defs_list) algorithm_id)'.`);
                }
            } else {
                restoreStackAndThrow(`synth expects a symbol for the patch name (e.g., :piano) or raw patch data.`);
            }

            const freqQuotation = [note, 'note'];
            
            const finalOpDefs = opDefs.map(def => {
                if (Array.isArray(def)) {
                    return def.map(item => {
                        if (typeof item === 'symbol') {
                            const key = Symbol.keyFor(item);
                            if (key) return key;
                        }
                        if (Array.isArray(item) && item.length === 2 && typeof item[0] === 'symbol') {
                            const key = Symbol.keyFor(item[0]);
                            if (key) return [key, item[1]];
                        }
                        return item;
                    });
                }
                return def;
            });

            const fmQuotation = [gate, freqQuotation, velocity, finalOpDefs, algorithmId, 'fm_synth'];
            s.push(fmQuotation);
        },
        description: `A generic FM synthesizer operator. Signature: \`[gate_quotation]? note_or_quotation velocity (:patch-name | patch_data) synth -> fm_quotation\`. It loads an FM patch, either from a set of built-in presets by name, from a user-defined variable by name, or from raw patch data on the stack. If the optional gate quotation is omitted, a default one-shot trigger is used.

Available presets: \`:piano\`, \`:e-piano\`, \`:bass\`, \`:bell\`, \`:kalimba\`, \`:tamboura\`, \`:glide\`, \`:violin\`.`,
        effect: '[gate_quotation]? note_or_quotation velocity (:patch-name|patch_data) -> [fm_quotation]'
    },
    examples: [
        {
            replCode: `60 0.8 :piano synth 1.0 play`,
            async: { duration: 150, assert: s => s.length === 0 }
        },
        {
            replCode: `48 0.9 :bass synth 1.0 play`,
            async: { duration: 150, assert: s => s.length === 0 }
        },
        {
            replCode: `72 0.7 :bell synth 2.0 play`,
            async: { duration: 250, assert: s => s.length === 0 }
        },
        {
            replCode: `72 0.8 :kalimba synth 1.0 play`,
            async: { duration: 150, assert: s => s.length === 0 }
        },
        {
            replCode: `48 0.9 :tamboura synth 3.0 play`,
            async: { duration: 350, assert: s => s.length === 0 }
        },
        {
            replCode: `60 0.8 :glide synth 2.0 play`,
            async: { duration: 250, assert: s => s.length === 0 }
        },
        {
            replCode: `72 0.7 :violin synth 2.0 play`,
            async: { duration: 250, assert: s => s.length === 0 }
        },
        {
            replCode: `
# Define a custom patch format: ((op_defs) algorithm_id)
(
    ( # op_defs list
        (80 1.0 0.01 0.1 0.0 0.1 :sine)
        (70 1.0 0.01 0.1 0.0 0.1 :sine)
        (90 1.0 0.01 0.2 0.0 0.1 :sine)
        (0 0 0 0 0 0 :sine)
        (0 0 0 0 0 0 :sine)
        (0 0 0 0 0 0 :sine)
    ) 
    32 # algorithm_id (just carriers)
) :my-simple-bass =

# Use the custom patch
60 0.8 :my-simple-bass synth 1.0 play`,
            async: { duration: 50, assert: (s, d) => d[':my-simple-bass'] !== undefined }
        }
    ]
};