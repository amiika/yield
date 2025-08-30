// --- Utility Helpers ---

export const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const deepClone = (obj) => {
    try {
        // The modern, fast, and robust way to deep-clone
        return structuredClone(obj);
    } catch (e) {
        // Fallback for environments where structuredClone is not available.
        // NOTE: This fallback does not handle cyclic objects, Maps, etc.,
        // but it does handle Sets correctly, which is needed for Yield.
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof Set) {
            return new Set(Array.from(obj, deepClone));
        }
        if (obj instanceof Array) {
            return obj.map(deepClone);
        }
        if (obj.constructor === Object) {
            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = deepClone(obj[key]);
                }
            }
            return newObj;
        }
        return obj; 
    }
};

export const simpleFormatter = (value) => {
    if (typeof value === 'string') {
        // Don't add quotes if it's already a string representation of code
        // This is a bit of a heuristic for the audio operators.
        const looksLikeCode = /^\w+\(.*\)$/.test(value) || /^\w+\..+$/.test(value);
        if (looksLikeCode) return value;
        return `"${value}"`;
    }
    if (Array.isArray(value)) return `[${value.map(simpleFormatter).join(' ')}]`;
    if (value instanceof Set) {
        const sortedValues = Array.from(value).sort((a, b) => a - b);
        return `{${sortedValues.map(simpleFormatter).join(' ')}}`;
    }
    if (value === true) return 'true';
    if (value === false) return 'false';
    if (typeof value === 'object' && value !== null && typeof value.next === 'function') return '<generator>';
    if (typeof value === 'symbol') {
        const key = Symbol.keyFor(value);
        if (key !== undefined) {
            return `:${key}`;
        }
        return value.toString(); // Fallback for non-global symbols
    }
    return value;
};