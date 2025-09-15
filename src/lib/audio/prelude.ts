
// This prelude is a large string of JS code that will be sent to the AudioWorklet
// to set up the DSP environment. It contains a graph-interpreting DSP engine.
export const prelude = `
const { PI, sin, cos, random, abs, min, max, pow, sign, floor } = Math;

// --- DSP Library Functions ---
// Each function takes its own state object 's', the processor instance, and its arguments.

const dsp = {
    sine: (s, processor, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        return sin(s.phase * 2 * PI);
    },
    saw: (s, processor, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return s.phase * 2 - 1;
    },
    triangle: (s, processor, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return 4 * abs(s.phase - 0.5) - 1;
    },
    pulse: (s, processor, freq, duty = 0.5) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return s.phase < duty ? 1 : -1;
    },
    noise: (s, processor) => random() * 2 - 1,
    impulse: (s, processor, freq) => {
        s.phase = (s.phase || 1) + freq / sampleRate;
        let v = s.phase >= 1 ? 1 : 0;
        s.phase %= 1;
        return v;
    },
    oneshot: (s, processor) => {
        if (s.triggered) return 0;
        s.triggered = true;
        return 1;
    },
    gate: (s, processor, duration) => {
        if (s.counter === undefined) {
            s.counter = 0;
            s.durationSamples = Math.floor(duration * sampleRate);
        }
        
        if (s.counter < s.durationSamples) {
            s.counter++;
            return 1.0;
        }
        
        return 0.0;
    },
    gate_env: (s, processor, a, h, r) => {
        if (s.phase === undefined) {
            s.phase = 0; // 0: start, 1: attack, 2: hold, 3: release, 4: off
            s.val = 0.0;
            s.counter = 0;
        }

        const aSamples = Math.max(1, a * sampleRate);
        const hSamples = Math.max(1, h * sampleRate);
        const rSamples = Math.max(1, r * sampleRate);

        switch (s.phase) {
            case 0: // Start/trigger
                s.phase = 1;
                s.val = 0.0;
                s.counter = 0;
                // fallthrough to attack
            case 1: // Attack
                s.val += 1.0 / aSamples;
                if (s.val >= 1.0) {
                    s.val = 1.0;
                    s.phase = 2; // switch to hold
                    s.counter = 0;
                }
                break;
            case 2: // Hold
                s.val = 1.0;
                s.counter++;
                if (s.counter >= hSamples) {
                    s.phase = 3; // switch to release
                    s.counter = 0;
                }
                break;
            case 3: // Release
                s.val -= 1.0 / rSamples;
                if (s.val <= 0.0) {
                    s.val = 0.0;
                    s.phase = 4; // switch to off
                }
                break;
            case 4: // Off
            default:
                s.val = 0.0;
                break;
        }
        return s.val;
    },
    lpf: (s, processor, input, cutoff, res) => {
        s.c = pow(0.5, (1 - min(max(cutoff, 0), 1)) / 0.125);
        s.r = pow(0.5, (min(max(res, 0), 1) + 0.125) / 0.125);
        s.mrc = 1 - s.r * s.c;
        s.s0 = (s.s0 || 0) * s.mrc - (s.s1 || 0) * s.c + input * s.c;
        s.s1 = (s.s1 || 0) * s.mrc + s.s0 * s.c;
        return s.s1;
    },
    hpf: (s, processor, input, cutoff, res) => {
        s.lpf_state = s.lpf_state || {};
        return input - dsp.lpf(s.lpf_state, processor, input, cutoff, res);
    },
    adsr: (s, processor, gate, a, d, sus, r) => {
        const aSamples = Math.max(1, a * sampleRate);
        const dSamples = Math.max(1, d * sampleRate);
        const rSamples = Math.max(1, r * sampleRate);

        s.val = s.val || 0;
        
        if (gate > 0 && (s.gate === undefined || s.gate <= 0)) {
            s.mode = 1; // attack
        } else if (gate <= 0 && s.gate > 0) {
            s.mode = 4; // release
            s.releaseStartVal = s.val;
        }
        s.gate = gate;

        switch (s.mode) {
            case 1: // Attack
                s.val += 1.0 / aSamples;
                if (s.val >= 1.0) { s.val = 1.0; s.mode = 2; }
                break;
            case 2: // Decay
                if (s.val > sus) { s.val -= (1.0 - sus) / dSamples; }
                if (s.val <= sus) { s.val = sus; s.mode = 3; }
                break;
            case 3: // Sustain
                s.val = sus;
                break;
            case 4: // Release
                s.val -= (s.releaseStartVal || 0) / rSamples;
                if (s.val <= 0) { s.val = 0; s.mode = 0; }
                break;
            default: // Off
                s.val = 0;
        }
        return Math.max(0, s.val);
    },
    ad: (s, processor, gate, a, d) => {
        const aSamples = Math.max(1, a * sampleRate);
        const dSamples = Math.max(1, d * sampleRate);

        s.val = s.val || 0;
        s.mode = s.mode || 0; // 0: off, 1: attack, 2: decay

        // A rising edge on the gate triggers the envelope
        if (gate > 0 && (s.lastGate === undefined || s.lastGate <= 0)) {
            s.mode = 1; // Go to attack phase
            s.val = 0;  // Reset from the bottom for a clean percussive hit
        }
        s.lastGate = gate;

        if (s.mode === 1) { // In attack phase
            s.val += 1.0 / aSamples;
            if (s.val >= 1.0) {
                s.val = 1.0;
                s.mode = 2; // Switch to decay
            }
        } else if (s.mode === 2) { // In decay phase
            s.val -= 1.0 / dSamples;
            if (s.val <= 0) {
                s.val = 0;
                s.mode = 0; // Switch to off
            }
        }
        
        return s.val;
    },
    arp: (s, processor, clock, base_freq, mul_x, mul_y) => {
        // Detect a rising edge on the clock signal to advance the step.
        if ((s.lastClock === undefined || s.lastClock <= 0) && clock > 0) {
            s.step = (s.step === undefined) ? 0 : (s.step + 1) % 3;
        }
        s.lastClock = clock;

        const currentStep = s.step === undefined ? 0 : s.step;

        if (currentStep === 1) {
            return base_freq * mul_x;
        } else if (currentStep === 2) {
            return base_freq * mul_y;
        }
        // Default to step 0
        return base_freq;
    },
    bytebeat: (s, processor, code, frequency) => {
        // Init state
        s.t = s.t ?? 0;
        s.lastT = s.lastT ?? -1;
        s.data = s.data ?? 0;

        if (s.code !== code) {
            try {
                s.fn = new Function('t', 'mousex', 'mousey', 'mousedx', 'mousedy', 'return ' + code);
                s.code = code;
            } catch (e) {
                console.error('Bytebeat compile error:', e);
                s.fn = null;
            }
        }
        
        const tDelta = frequency / sampleRate;
        s.t += tDelta;
        const t = floor(s.t);

        if (t !== s.lastT) {
            if (s.fn) {
                try {
                    const result = s.fn(t, processor.mouse.x, processor.mouse.y, processor.moused.x, processor.moused.y);
                    s.data = ((result | 0) & 255) / 127.5 - 1;
                } catch(e) {
                    console.error('Bytebeat runtime error in code "' + s.code + '":', e.message);
                    s.data = 0;
                }
            } else {
                s.data = 0;
            }
            s.lastT = t;
        }

        return s.data;
    },
    floatbeat: (s, processor, code, frequency) => {
        s.t = s.t ?? 0;

        if (s.code !== code) {
            try {
                // The JS function should expect continuous time t
                s.fn = new Function('t', 'mousex', 'mousey', 'mousedx', 'mousedy', 'return ' + code);
                s.code = code;
            } catch (e) {
                console.error('Floatbeat compile error:', e);
                s.fn = null;
            }
        }
        
        // The 'frequency' parameter acts as a speed multiplier for time.
        const tDelta = frequency / sampleRate;
        s.t += tDelta;

        if (s.fn) {
            try {
                // Pass the continuous time s.t to the function.
                const result = s.fn(s.t, processor.mouse.x, processor.mouse.y, processor.moused.x, processor.moused.y);
                return min(1, max(-1, result)); // clamp the output
            } catch(e) {
                console.error('Floatbeat runtime error in code "' + s.code + '":', e.message);
                return 0;
            }
        }
        return 0;
    },
    delay: (s, processor, input, time, feedback) => {
        if (!s.buffer) s.buffer = new Float32Array(sampleRate * 5); // 5 sec max
        s.writeIdx = (s.writeIdx || 0);
        let readIdx = s.writeIdx - Math.floor(time * sampleRate);
        if (readIdx < 0) readIdx += s.buffer.length;
        const out = s.buffer[readIdx];
        s.buffer[s.writeIdx] = input + out * feedback;
        s.writeIdx = (s.writeIdx + 1) % s.buffer.length;
        return out;
    },
    distort: (s, processor, input, amount) => {
        const gain = 1 + amount * 4;
        return Math.tanh(input * gain);
    },
    pan: (s, processor, input, pos) => {
        const angle = (pos * 0.5 + 0.5) * (PI / 2);
        return [input * cos(angle), input * sin(angle)];
    },
    note: (s, processor, note) => (2 ** ((note - 69) / 12) * 440),
    seq: (s, processor, clock, ...values) => {
        // This handles the case where the transpiler passes a list of values as a single array argument.
        let sequence = values;
        if (sequence.length === 1 && Array.isArray(sequence[0])) {
            sequence = sequence[0];
        }

        // Detect a rising edge on the clock signal.
        if ((s.lastClock === undefined || s.lastClock <= 0) && clock > 0) {
            s.step = (s.step === undefined) ? 0 : s.step + 1;
        }
        s.lastClock = clock;
        const currentStep = s.step === undefined ? -1 : s.step;
        // Return 0 if we haven't been triggered yet, otherwise the value.
        if (currentStep < 0 || sequence.length === 0) {
            return 0;
        }
        return sequence[currentStep % sequence.length];
    },
    'mix': (s, processor, a, b) => {
        if (Array.isArray(a) && Array.isArray(b)) return [a[0]+b[0], a[1]+b[1]];
        if (Array.isArray(a)) return [a[0]+b, a[1]+b];
        if (Array.isArray(b)) return [a+b[0], a+b[1]];
        return a + b;
    },
    'mul': (s, processor, a, b) => {
        if (Array.isArray(a) && Array.isArray(b)) return [a[0]*b[0], a[1]*b[1]];
        if (Array.isArray(a)) return [a[0]*b, a[1]*b];
        if (Array.isArray(b)) return [a*b[0], a*b[1]];
        return a * b;
    },
    fm_simple: (s, processor, carrier_freq, mod_freq, mod_index, carrier_wave, mod_wave) => {
        s.modState = s.modState || {};
        s.carrierState = s.carrierState || {};

        const modOscFn = dsp[mod_wave] || dsp.sine;
        const carrierOscFn = dsp[carrier_wave] || dsp.sine;

        const modulator_output = modOscFn(s.modState, processor, mod_freq) * mod_index;
        const carrier_input_freq = carrier_freq + modulator_output;
        const final_output = carrierOscFn(s.carrierState, processor, carrier_input_freq);
        
        return final_output;
    },
    fm_synth: (s, processor, gate, baseFreq, velocity, opDefs, algorithmId) => {
        s.opStates = s.opStates || Array.from({ length: 6 }, () => ({}));
        
        // On a rising edge of the gate signal, reset the phase of all oscillators
        // to prevent clicking artifacts when re-triggering notes.
        if (gate > 0 && (s.lastGate === undefined || s.lastGate <= 0)) {
            s.opStates.forEach(opState => {
                opState.phase = 0;
            });
        }
        s.lastGate = gate;
        
        const getOpOutput = (opNum, modulatorInput = 0) => {
            const opDef = opDefs[opNum - 1];
            const state = s.opStates[opNum - 1];
            if (!opDef || opDef.length < 7) return 0;

            const [level, freqSpec, a, d, sus, r, opType] = opDef;
            const oscFn = dsp[opType] || dsp.sine;

            let freq;
            if (Array.isArray(freqSpec) && freqSpec[0] === 'fixed' && typeof freqSpec[1] === 'number') {
                freq = freqSpec[1];
            } else if (typeof freqSpec === 'number') {
                freq = baseFreq * freqSpec;
            } else {
                freq = baseFreq;
            }

            const oscInputFreq = freq + modulatorInput;
            const oscVal = oscFn(state, processor, oscInputFreq);
            state.envState = state.envState || {};

            // Choose the correct envelope type. For percussive sounds (sustain=0),
            // a simpler AD envelope is more robust with fast triggers like 'impulse'.
            const envFn = (sus === 0.0) ? dsp.ad : dsp.adsr;
            const envVal = envFn(state.envState, processor, gate, a, d, sus, r);
            
            const outputLevel = (level / 99.0) * velocity;
            return oscVal * envVal * outputLevel;
        };
        
        let op1, op2, op3, op4, op5, op6;
        let finalOutput = 0.0;
        
        switch (algorithmId) {
            case 1: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); finalOutput = op1 + op4; break;
            case 2: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); finalOutput = getOpOutput(1, op2 + op4); break;
            case 3: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5 + op3); finalOutput = op1 + op4; break;
            case 4: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4); finalOutput = getOpOutput(1, op2 + op5 + op4); break;
            case 5: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4); finalOutput = op1 + op5 + op4; break;
            case 6: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4); finalOutput = op1 + op5 + op4; break;
            case 7: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); op1 = getOpOutput(1); finalOutput = op1 + op2 + op4; break;
            case 8: op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5); finalOutput = getOpOutput(6, op1+op2+op3+op4+op5); break;
            case 9: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op5 = getOpOutput(5); op4 = getOpOutput(4, op5); op6 = getOpOutput(6); finalOutput = op1 + op4 + op6; break;
            case 10: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op5 = getOpOutput(5); op4 = getOpOutput(4, op5); op1 = getOpOutput(1); op6 = getOpOutput(6, op1); finalOutput = op2 + op4 + op6; break;
            case 11: {
                const lastOp6Out = s.opStates[5].lastOutput || 0;
                op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op5 = getOpOutput(5); op4 = getOpOutput(4, op5); op1 = getOpOutput(1);
                op6 = getOpOutput(6, op1+op2+op4+lastOp6Out);
                s.opStates[5].lastOutput = op6; finalOutput = op6; break;
            }
            case 12: case 21: op2=getOpOutput(2); op1=getOpOutput(1, op2); op4=getOpOutput(4); op3=getOpOutput(3, op4); op6=getOpOutput(6); op5=getOpOutput(5, op6); finalOutput = op1 + op3 + op5; break;
            case 13: op6=getOpOutput(6); op5=getOpOutput(5,op6); op4=getOpOutput(4); op2=getOpOutput(2); const mod_13 = op5+op4+op2; op1=getOpOutput(1, mod_13); op3=getOpOutput(3, mod_13); finalOutput = op1 + op3; break;
            case 14: op2=getOpOutput(2); op3=getOpOutput(3); op1=getOpOutput(1, op2+op3); op5=getOpOutput(5); op6=getOpOutput(6); op4=getOpOutput(4, op5+op6); finalOutput = op1 + op4; break;
            case 15: op2=getOpOutput(2); op1=getOpOutput(1,op2); op3=getOpOutput(3); op5=getOpOutput(5); op4=getOpOutput(4,op5); op6=getOpOutput(6); finalOutput = op1+op3+op4+op6; break;
            case 16: op3=getOpOutput(3); op2=getOpOutput(2,op3); op6=getOpOutput(6); op5=getOpOutput(5,op6); op4=getOpOutput(4,op5); op1=getOpOutput(1); finalOutput = op1+op2+op4; break;
            case 17: op3=getOpOutput(3); op2=getOpOutput(2,op3); op5=getOpOutput(5); op6=getOpOutput(6); op4=getOpOutput(4, op5+op6); op1=getOpOutput(1); finalOutput = op1+op2+op4; break;
            case 18: op2=getOpOutput(2); op1=getOpOutput(1,op2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op3+op4+op5+op6; break;
            case 19: op2=getOpOutput(2); op1=getOpOutput(1,op2); op4=getOpOutput(4); op3=getOpOutput(3,op4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op3+op5+op6; break;
            case 20: op2=getOpOutput(2); op3=getOpOutput(3); op1=getOpOutput(1,op2+op3); op5=getOpOutput(5); op4=getOpOutput(4,op5); op6=getOpOutput(6); finalOutput = op1+op4+op6; break;
            case 22: op3=getOpOutput(3); op2=getOpOutput(2,op3); op6=getOpOutput(6); op5=getOpOutput(5,op6); op1=getOpOutput(1); op4=getOpOutput(4); finalOutput = op1+op2+op4+op5; break;
            case 23: op4=getOpOutput(4); op3=getOpOutput(3,op4); op6=getOpOutput(6); op5=getOpOutput(5,op6); op1=getOpOutput(1); op2=getOpOutput(2); finalOutput = op1+op2+op3+op5; break;
            case 24: op5=getOpOutput(5); op6=getOpOutput(6); op4=getOpOutput(4,op5+op6); op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); finalOutput = op1+op2+op3+op4; break;
            case 25: op6=getOpOutput(6); op5=getOpOutput(5,op6); op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); finalOutput = op1+op2+op3+op4+op5; break;
            case 26: op3=getOpOutput(3); op2=getOpOutput(2,op3); op1=getOpOutput(1); op4=getOpOutput(4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op2+op4+op5+op6; break;
            case 27: op4=getOpOutput(4); op3=getOpOutput(3,op4); op1=getOpOutput(1); op2=getOpOutput(2); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op2+op3+op5+op6; break;
            case 28: op5=getOpOutput(5); op4=getOpOutput(4,op5); op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op6=getOpOutput(6); finalOutput = op1+op2+op3+op4+op6; break;
            case 29: {
                 const lastOp6Out = s.opStates[5].lastOutput || 0;
                 op6 = getOpOutput(6, lastOp6Out); s.opStates[5].lastOutput = op6;
                 op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5);
                 finalOutput = op1+op2+op3+op4+op5+op6; break;
            }
            case 30: {
                const lastOp6Out = s.opStates[5].lastOutput || 0;
                op6 = getOpOutput(6, lastOp6Out); s.opStates[5].lastOutput = op6;
                op5 = getOpOutput(5, op6);
                op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4);
                finalOutput = op1+op2+op3+op4+op5; break;
            }
            case 31: {
                const lastOp6Out = s.opStates[5].lastOutput || 0;
                op6 = getOpOutput(6, lastOp6Out); s.opStates[5].lastOutput = op6;
                op5 = getOpOutput(5, op6);
                op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4);
                finalOutput = op1+op2+op3+op4+op5; break;
            }
            case 32: op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op2+op3+op4+op5+op6; break;
            default: finalOutput = 0; break;
        }

        return finalOutput;
    },
};
dsp.tri = dsp.triangle;

class DspProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.voices = new Map(); // { id: { graph, params, state, startTime?, duration?, fading? } }
        this.port.onmessage = (e) => this.handleMessage(e.data);
        // FIX: Add tempo property to the processor for use in DSP functions.
        this.tempo = 120.0;
        this.moused = { x: 0, y: 0, down: false };
        this.mouse = { x: 0, y: 0 };
    }

    handleMessage(msg) {
        switch (msg.command) {
            case 'play':
                const voiceData = {
                    graph: msg.graph,
                    params: msg.params || {},
                    state: {} // For stateful nodes
                };
                if (msg.duration !== undefined && msg.duration > 0) {
                    voiceData.startTime = currentTime;
                    voiceData.duration = msg.duration;
                }
                this.voices.set(msg.id, voiceData);
                break;
            case 'update':
                if (this.voices.has(msg.id)) {
                    const voice = this.voices.get(msg.id);
                    voice.graph = msg.graph;
                    voice.params = msg.params || {};
                }
                break;
            case 'ctrl':
                if (this.voices.has(msg.id)) {
                    this.voices.get(msg.id).params[msg.param] = msg.value;
                }
                break;
            case 'stop':
                this.voices.delete(msg.id);
                break;
            case 'stopAll':
                this.voices.clear();
                break;
            case 'fadeOutAll':
                for (const [id, voice] of this.voices.entries()) {
                    if (!voice.fading) {
                        voice.fading = {
                            startTime: currentTime,
                            duration: 0.02, // 20ms fade out
                            startGain: 1.0,
                        };
                    }
                }
                break;
            // FIX: Handle 'setTempo' command to update the processor's tempo.
            case 'setTempo':
                this.tempo = msg.bpm;
                break;
            case 'mousedown':
                this.moused.x = msg.x;
                this.moused.y = msg.y;
                this.moused.down = msg.down;
                break;
            case 'mouse':
                this.mouse.x = msg.x;
                this.mouse.y = msg.y;
                break;
        }
    }

    // Recursively evaluates an audio graph node for the current sample
    evaluate(node, params, state, counters) {
        // Handle non-objects (numbers, etc.) and parameter lookups first.
        if (typeof node !== 'object' || node === null) return node;
        if (node.param) return params[node.param];

        // If it's an object but not an array, we can't process it.
        if (!Array.isArray(node)) return 0;
        
        // This is the key fix: distinguish between a DSP call and a literal data array.
        // A DSP call is an array where the first element is a string key for a function in the 'dsp' object.
        const op = node[0];
        if (typeof op !== 'string' || dsp[op] === undefined) {
            // If the first element isn't a string, or isn't a valid DSP function name,
            // then this whole array is treated as a literal data value (e.g., fm_synth op_defs).
            return node;
        }

        const dspFn = dsp[op];
        
        // Evaluate all arguments recursively.
        const evalArgs = node.slice(1).map(arg => this.evaluate(arg, params, state, counters));

        // Get or create state for this specific operator instance in the graph.
        const opCount = counters[op] = (counters[op] || 0) + 1;
        const stateKey = op + '_' + (opCount - 1);
        state[stateKey] = state[stateKey] || {};

        // Call the DSP function with its state, the processor context, and the evaluated arguments.
        return dspFn(state[stateKey], this, ...evalArgs);
    }

    process(inputs, outputs) {
        const outL = outputs[0][0];
        const outR = outputs[0][1];
        const FADE_OUT_SECONDS = 0.01; // 10ms fade out
        const voicesToDelete = new Set();

        for (let i = 0; i < outL.length; i++) {
            let totalL = 0;
            let totalR = 0;
            const sampleTime = currentTime + i / sampleRate;

            for (const [id, voice] of this.voices.entries()) {
                try {
                    let gain = 1.0;

                    if (voice.fading) {
                        const elapsedFade = sampleTime - voice.fading.startTime;
                        if (elapsedFade >= voice.fading.duration) {
                            voicesToDelete.add(id);
                            continue;
                        }
                        gain = voice.fading.startGain * (1.0 - (elapsedFade / voice.fading.duration));
                    } else if (voice.duration !== undefined) {
                        const elapsedTime = sampleTime - voice.startTime;
                        if (elapsedTime >= voice.duration) {
                            voicesToDelete.add(id);
                            continue; // Skip processing this voice for this sample
                        }
                        const remainingTime = voice.duration - elapsedTime;
                        if (remainingTime < FADE_OUT_SECONDS) {
                            gain = max(0.0, remainingTime / FADE_OUT_SECONDS);
                        }
                    }

                    const counters = {};
                    const result = this.evaluate(voice.graph, voice.params, voice.state, counters);
                    
                    if (Array.isArray(result)) {
                        totalL += (result[0] || 0) * gain;
                        totalR += (result[1] || 0) * gain;
                    } else {
                        totalL += (result || 0) * gain;
                        totalR += (result || 0) * gain;
                    }
                } catch (e) {
                    console.error('DSP Error:', e);
                    voicesToDelete.add(id); // Remove problematic voice
                }
            }
            
            outL[i] = totalL;
            outR[i] = totalR;
        }

        if (voicesToDelete.size > 0) {
            for (const id of voicesToDelete) {
                this.voices.delete(id);
            }
        }
        return true;
    }
}

registerProcessor('dsp-processor', DspProcessor);

class ClockProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.tickInterval = 128 / sampleRate; // ~2.9 ms at 44.1kHz
        this.nextTickTime = currentTime + this.tickInterval;
        this.running = false;

        this.port.onmessage = (e) => {
            if (e.data === "start") {
                this.running = true;
                this.nextTickTime = currentTime + this.tickInterval;
            } else if (e.data === "stop") {
                this.running = false;
            }
        };
    }

    process() {
        if (!this.running) return true;

        while (currentTime >= this.nextTickTime) {
            this.port.postMessage(this.nextTickTime);
            this.nextTickTime += this.tickInterval;
        }

        return true;
    }
}
registerProcessor("clock", ClockProcessor);
`