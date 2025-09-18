
import type { Operator } from '../../types';

const getNormalOrder = (pcs: number[]): number[] => {
    if (pcs.length === 0) return [];
    const rotations: number[][] = [];
    for (let i = 0; i < pcs.length; i++) {
        const rotation = [...pcs.slice(i), ...pcs.slice(0, i)];
        rotations.push(rotation);
    }

    let bestRotation = rotations[0];
    let minSpan = (bestRotation[bestRotation.length - 1] - bestRotation[0] + 12) % 12;

    for (let i = 1; i < rotations.length; i++) {
        const currentRotation = rotations[i];
        const currentSpan = (currentRotation[currentRotation.length - 1] - currentRotation[0] + 12) % 12;
        if (currentSpan < minSpan) {
            minSpan = currentSpan;
            bestRotation = currentRotation;
        } else if (currentSpan === minSpan) {
            // Tie-breaking: check span from first to second-to-last element
            for (let j = currentRotation.length - 2; j > 0; j--) {
                const currentSubSpan = (currentRotation[j] - currentRotation[0] + 12) % 12;
                const bestSubSpan = (bestRotation[j] - bestRotation[0] + 12) % 12;
                if (currentSubSpan < bestSubSpan) {
                    bestRotation = currentRotation;
                    break;
                }
                if (currentSubSpan > bestSubSpan) {
                    break;
                }
            }
        }
    }
    return bestRotation;
};

const getPrimeForm = (pcs: number[]): number[] => {
    const uniquePcs = [...new Set(pcs.map(pc => (pc % 12 + 12) % 12))].sort((a, b) => a - b);
    if (uniquePcs.length === 0) return [];

    const normalOrderP = getNormalOrder(uniquePcs);
    const inversion = uniquePcs.map(pc => (12 - pc) % 12).sort((a, b) => a - b);
    const normalOrderI = getNormalOrder(inversion);

    const transposeToZero = (row: number[]) => {
        const first = row[0];
        return row.map(pc => (pc - first + 12) % 12);
    };

    const primeP = transposeToZero(normalOrderP);
    const primeI = transposeToZero(normalOrderI);

    // Final tie-breaking: find the most "packed to the left"
    for (let i = 1; i < primeP.length; i++) {
        if (primeP[i] < primeI[i]) return primeP;
        if (primeI[i] < primeP[i]) return primeI;
    }
    return primeP;
};

export const primeform: Operator = {
    definition: {
        exec: function*(s) {
            const pcs = s.pop();
            if (!Array.isArray(pcs)) {
                throw new Error('primeform expects a list of pitch classes.');
            }
            s.push(getPrimeForm(pcs));
        },
        description: 'Calculates the prime form of a pitch-class set according to Allen Forte\'s algorithm. This provides a canonical representation for analysis.',
        effect: '[L_pcs] -> [L_primeForm]'
    },
    examples: [
        { code: '(0 1 4 6) primeform', expected: [[0, 1, 4, 6]] },
        { code: '("C4" "E4" "G4") (midi) map primeform', expected: [[0, 3, 7]] }, // C Major triad
        { code: '(8 9 0 2) primeform', expected: [[0, 1, 4, 6]] }, // Set 4-12
        { code: '(0 11 8 6) primeform', expected: [[0, 1, 4, 6]] }, // Set 4-12
        { code: '() primeform', expected: [[]] },
    ]
};