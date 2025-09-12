
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
            s.val = 0;  // Reset from the bottom
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
        s.lastT = s.lastT ?? -1;
        s.data = s.data ?? 0;

        if (s.code !== code) {
            try {
                s.fn = new Function('t', 'mousex', 'mousey', 'mousedx', 'mousedy', 'return ' + code);
                s.code = code;
            } catch (e) {
                console.error('Floatbeat compile error:', e);
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
                    s.data = min(1, max(-1, result));
                } catch(e) {
                    console.error('Floatbeat runtime error in code "' + s.code + '":', e.message);
                    s.data = 0;
                }
            } else {
                s.data = 0;
            }
            s.lastT = t;
        }

        return s.data;
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
        if (!s.lastClock && clock > 0) {
            s.step = (s.step || 0) + 1;
        }
        s.lastClock = clock;
        return values[s.step % values.length];
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
    fm_synth: (s, processor, gate, baseFreq, opDefs, algorithmId) => {
        s.opStates = s.opStates || Array.from({ length: 6 }, () => ({}));
        
        const getOpOutput = (opNum, modulatorInput = 0) => {
            const opDef = opDefs[opNum - 1];
            const state = s.opStates[opNum - 1];
            if (!opDef || opDef.length < 7) return 0;

            const [level, freqSpec, a, d, sus, r, opTypeSym] = opDef;
            const opType = typeof opTypeSym === 'symbol' ? Symbol.keyFor(opTypeSym) : (opTypeSym || 'sine');
            const oscFn = dsp[opType] || dsp.sine;

            let freq;
            if (Array.isArray(freqSpec) && freqSpec[0] === Symbol.for('fixed') && typeof freqSpec[1] === 'number') {
                freq = freqSpec[1];
            } else if (typeof freqSpec === 'number') {
                freq = baseFreq * freqSpec;
            } else {
                freq = baseFreq;
            }

            const oscInputFreq = freq + modulatorInput;
            const oscVal = oscFn(state, processor, oscInputFreq);
            state.envState = state.envState || {};
            const envVal = dsp.adsr(state.envState, processor, gate, a, d, sus, r);
            const outputLevel = (level / 99.0);
            return oscVal * envVal * outputLevel;
        };
        
        let op1, op2, op3, op4, op5, op6;
        let finalOutput = 0.0;
        
        switch (algorithmId) {
            case 1: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); finalOutput = op1 + op4; break;
            case 2: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); finalOutput = getOpOutput(1, op2 + op4); break;
            case 3: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5 + op3); finalOutput = op1 + op4; break;
            case 4: case 5: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4); finalOutput = getOpOutput(1, op2 + op5 + op4); break;
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

class DspProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.voices = new Map(); // { id: { graph, params, state } }
        this.port.onmessage = (e) => this.handleMessage(e.data);
        // FIX: Add tempo property to the processor for use in DSP functions.
        this.tempo = 120.0;
        this.moused = { x: 0, y: 0, down: false };
        this.mouse = { x: 0, y: 0 };
    }

    handleMessage(msg) {
        switch (msg.command) {
            case 'play':
                this.voices.set(msg.id, {
                    graph: msg.graph,
                    params: msg.params || {},
                    state: {} // For stateful nodes
                });
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
        if (typeof node !== 'object' || node === null) return node;
        if (node.param) return params[node.param];
        if (!Array.isArray(node)) return 0;

        const op = node[0];
        const dspFn = dsp[op];
        if (!dspFn) return 0;

        const evalArgs = node.slice(1).map(arg => this.evaluate(arg, params, state, counters));

        const opCount = counters[op] = (counters[op] || 0) + 1;
        const stateKey = op + '_' + (opCount - 1);
        state[stateKey] = state[stateKey] || {};

        return dspFn(state[stateKey], this, ...evalArgs);
    }

    process(inputs, outputs) {
        const outL = outputs[0][0];
        const outR = outputs[0][1];

        for (let i = 0; i < outL.length; i++) {
            let totalL = 0;
            let totalR = 0;

            for (const voice of this.voices.values()) {
                try {
                    const counters = {};
                    const result = this.evaluate(voice.graph, voice.params, voice.state, counters);
                    
                    if (Array.isArray(result)) {
                        totalL += result[0] || 0;
                        totalR += result[1] || 0;
                    } else {
                        totalL += result || 0;
                        totalR += result || 0;
                    }
                } catch (e) {
                    console.error('DSP Error:', e);
                }
            }
            
            outL[i] = totalL;
            outR[i] = totalR;
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
