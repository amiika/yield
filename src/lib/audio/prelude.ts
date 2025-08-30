// This prelude is a large string of JS code that will be sent to the AudioWorklet
// to set up the DSP environment. It contains a graph-interpreting DSP engine.
export const prelude = `
const { PI, sin, cos, random, abs, min, max, pow, sign, floor } = Math;

// --- DSP Library Functions ---
// Each function takes its own state object 's' and its arguments.

const dsp = {
    sine: (s, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        return sin(s.phase * 2 * PI);
    },
    saw: (s, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return s.phase * 2 - 1;
    },
    triangle: (s, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return 4 * abs(s.phase - 0.5) - 1;
    },
    pulse: (s, freq, duty = 0.5) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return s.phase < duty ? 1 : -1;
    },
    noise: () => random() * 2 - 1,
    impulse: (s, freq) => {
        s.phase = (s.phase || 1) + freq / sampleRate;
        let v = s.phase >= 1 ? 1 : 0;
        s.phase %= 1;
        return v;
    },
    oneshot: (s) => {
        if (s.triggered) return 0;
        s.triggered = true;
        return 1;
    },
    lpf: (s, input, cutoff, res) => {
        s.c = pow(0.5, (1 - min(max(cutoff, 0), 1)) / 0.125);
        s.r = pow(0.5, (min(max(res, 0), 1) + 0.125) / 0.125);
        s.mrc = 1 - s.r * s.c;
        s.s0 = (s.s0 || 0) * s.mrc - (s.s1 || 0) * s.c + input * s.c;
        s.s1 = (s.s1 || 0) * s.mrc + s.s0 * s.c;
        return s.s1;
    },
    hpf: (s, input, cutoff, res) => {
        s.lpf_state = s.lpf_state || {};
        return input - dsp.lpf(s.lpf_state, input, cutoff, res);
    },
    adsr: (s, gate, a, d, sus, r) => {
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
    ad: (s, gate, a, d) => {
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
        
        // If mode is 0 (off), s.val will be 0 from the previous decay step.
        return s.val;
    },
    bytebeat: (s, code) => {
        s.t = (s.t || 0) + 1;
        const t = s.t - 1;

        if (s.code !== code) {
            try {
                s.fn = new Function('t', 'return ' + code);
                s.code = code;
                s.errorLogged = false;
            } catch (e) {
                console.error('Bytebeat compile error:', e);
                s.fn = null;
            }
        }
        if (!s.fn) return 0;
        try {
            const result = s.fn(t);
            return ((result | 0) & 255) / 127.5 - 1;
        } catch(e) {
            if (!s.errorLogged) {
                console.error('Bytebeat runtime error in code "' + s.code + '":', e.message);
                s.errorLogged = true;
            }
            return 0;
        }
    },
    floatbeat: (s, code) => {
        s.t = (s.t || 0) + 1;
        const t = s.t - 1;

        if (s.code !== code) {
            try {
                s.fn = new Function('t', 'return ' + code);
                s.code = code;
                s.errorLogged = false;
            } catch (e) {
                console.error('Floatbeat compile error:', e);
                s.fn = null;
            }
        }
        if (!s.fn) return 0;
        try {
            const result = s.fn(t);
            return result;
        } catch(e) {
            if (!s.errorLogged) {
                console.error('Floatbeat runtime error in code "' + s.code + '":', e.message);
                s.errorLogged = true;
            }
            return 0;
        }
    },
    delay: (s, input, time, feedback) => {
        if (!s.buffer) s.buffer = new Float32Array(sampleRate * 5); // 5 sec max
        s.writeIdx = (s.writeIdx || 0);
        let readIdx = s.writeIdx - Math.floor(time * sampleRate);
        if (readIdx < 0) readIdx += s.buffer.length;
        const out = s.buffer[readIdx];
        s.buffer[s.writeIdx] = input + out * feedback;
        s.writeIdx = (s.writeIdx + 1) % s.buffer.length;
        return out;
    },
    distort: (s, input, amount) => {
        // A tanh-based soft-clipper.
        // amount controls the drive.
        const gain = 1 + amount * 4;
        return Math.tanh(input * gain);
    },
    pan: (s, input, pos) => {
        const angle = (pos * 0.5 + 0.5) * (PI / 2);
        return [input * cos(angle), input * sin(angle)];
    },
    note: (s, note) => (2 ** ((note - 69) / 12) * 440),
    seq: (s, clock, ...values) => {
        if (!s.lastClock && clock > 0) {
            s.step = (s.step || 0) + 1;
        }
        s.lastClock = clock;
        return values[s.step % values.length];
    },
    'mix': (s, a, b) => {
        if (Array.isArray(a) && Array.isArray(b)) return [a[0]+b[0], a[1]+b[1]];
        if (Array.isArray(a)) return [a[0]+b, a[1]+b];
        if (Array.isArray(b)) return [a+b[0], a+b[1]];
        return a + b;
    },
    'mul': (s, a, b) => {
        if (Array.isArray(a) && Array.isArray(b)) return [a[0]*b[0], a[1]*b[1]];
        if (Array.isArray(a)) return [a[0]*b, a[1]*b];
        if (Array.isArray(b)) return [a*b[0], a*b[1]];
        return a * b;
    },
};

class DspProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.voices = new Map(); // { id: { graph, params, state } }
        this.port.onmessage = (e) => this.handleMessage(e.data);
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

        // Create a unique key for this node instance's state
        const opCount = counters[op] = (counters[op] || 0) + 1;
        const stateKey = op + '_' + (opCount - 1);
        state[stateKey] = state[stateKey] || {}; // Ensure state sub-object exists

        return dspFn(state[stateKey], ...evalArgs);
    }

    process(inputs, outputs) {
        const outL = outputs[0][0];
        const outR = outputs[0][1];

        for (let i = 0; i < outL.length; i++) {
            let totalL = 0;
            let totalR = 0;

            for (const voice of this.voices.values()) {
                try {
                    // Reset counters for each sample, for each voice
                    const counters = {};
                    const result = this.evaluate(voice.graph, voice.params, voice.state, counters);
                    
                    if (Array.isArray(result)) { // Stereo
                        totalL += result[0] || 0;
                        totalR += result[1] || 0;
                    } else { // Mono
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
`