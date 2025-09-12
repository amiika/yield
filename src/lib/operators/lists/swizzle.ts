
import type { Operator } from '../../types';

export const swizzle: Operator = {
    definition: {
        exec: function*(s) {
            // 1. Pop inputs
            const pattern = s.pop();
            const data = s.pop();

            // 2. Prepare data array and track original type
            let originalType: 'list' | 'string' | 'number' = 'list';
            let dataArray: any[];

            if (typeof data === 'number') {
                originalType = 'number';
                // Remove decimal point for swizzling digits
                dataArray = String(data).replace('.', '').split('');
            } else if (typeof data === 'string') {
                originalType = 'string';
                dataArray = data.split('');
            } else if (Array.isArray(data)) {
                originalType = 'list';
                // Convert "true" and "false" strings to booleans to handle how
                // the parser treats them inside quotations.
                dataArray = data.map(item => {
                    if (item === 'true') return true;
                    if (item === 'false') return false;
                    return item;
                });
            } else {
                s.push(data, pattern); // Push back and throw
                throw new Error('swizzle expects a list, string, or number as the second argument.');
            }
            
            // Helper to convert any 1-based pattern value to a 0-based index.
            // Both 0 and 1 in the pattern map to the first element (index 0).
            const toIndex = (p: number): number => {
                const index = Math.floor(p); // handle potential floats in lists
                if (index === 0 || index === 1) return 0;
                return index - 1;
            };

            // 3. Prepare index map from pattern and get decimal position
            let indexMap: number[];
            let decimalPosition = -1;
            const dataLength = dataArray.length;

            if (typeof pattern === 'number') {
                const patternString = String(pattern);
                decimalPosition = patternString.indexOf('.');
                const patternDigits = patternString.replace('.', '');
                
                indexMap = patternDigits.split('').map(digit => toIndex(parseInt(digit, 10)));

            } else if (Array.isArray(pattern) && pattern.every(p => typeof p === 'number')) {
                // Array pattern now also uses 1-based indexing logic
                indexMap = pattern.map(toIndex);
            } else {
                s.push(data, pattern); // Push back and throw
                throw new Error('swizzle expects a number or a list of integers as the pattern.');
            }

            // 4. Perform the swizzle with cyclic behavior
            const swizzledArray = [];
            if (dataLength > 0) {
                for (const index of indexMap) {
                    // Use modulo for cyclic behavior, handles negative indices correctly
                    const effectiveIndex = ((index % dataLength) + dataLength) % dataLength;
                    swizzledArray.push(dataArray[effectiveIndex]);
                }
            }

            // 5. Format and push the output
            switch (originalType) {
                case 'number':
                    let numString = swizzledArray.join('');
                    if (decimalPosition !== -1 && numString.length > 0) {
                        if (decimalPosition > numString.length) {
                             numString = numString + '.';
                        } else if (decimalPosition === 0) {
                            numString = '.' + numString;
                        } else {
                             numString = numString.slice(0, decimalPosition) + '.' + numString.slice(decimalPosition);
                        }
                    }
                    s.push(numString === '' || numString === '.' ? 0 : parseFloat(numString));
                    break;
                case 'string':
                    const str = swizzledArray.join('');
                    s.push(str);
                    break;
                case 'list':
                default:
                    s.push(swizzledArray);
                    break;
            }
        },
        description: 'Swizzles a list, string, or number based on a pattern. The pattern can be a number (integer or decimal) or a list of numbers. Indexing is always 1-based, where both 0 and 1 in the pattern refer to the first element (index 0). Out-of-bounds indices wrap around. If the pattern is a decimal number, its decimal point position dictates the decimal point in the swizzled numeric output.',
        effect: '[Data Pattern] -> [SwizzledData]'
    },
    examples: [
        // List examples (now with 1-based indexing for all patterns)
        { code: '("a" "b" "c" "d") (1 3 2 4) swizzle', expected: [['a', 'c', 'b', 'd']] },
        { code: '("a" "b" "c" "d") (0 2 1 3) swizzle', expected: [['a', 'b', 'a', 'c']] },
        { code: '("a" "b" "c" "d") 1324 swizzle', expected: [['a', 'c', 'b', 'd']] },
        { code: '("a" "b") 1212 swizzle', expected: [['a', 'b', 'a', 'b']] },
        { code: '(true false false true) 2324 swizzle', expected: [[false, false, false, true]] },

        // String examples
        { code: '"abcd" 1324 swizzle', expected: ["acbd"] },
        { code: '"ab" 1212 swizzle', expected: ["abab"] },
        
        // Integer examples
        { code: '1234 1324 swizzle', expected: [1324] },
        { code: '12 1212 swizzle', expected: [1212] },
        { code: '123 103 swizzle', expected: [113] },
        
        // Cyclic behavior examples
        { code: '(10 20) (4 1) swizzle', expected: [[20, 10]] },
        { code: '1234 51 swizzle', expected: [11] },
        { code: '"abc" 41 swizzle', expected: ["aa"] },
        
        // Decimal support examples (now uses 1-based indexing)
        { code: '98.76 1.32 swizzle', expected: [9.78] },
        { code: '2431 1.323 swizzle', expected: [2.343] },
        { code: '123 12.3 swizzle', expected: [12.3] },
        { code: '12345 1. swizzle', expected: [1.0] },

        // Error cases
        { code: '1234 "abc" swizzle', expectedError: 'swizzle expects a number or a list of integers as the pattern.' },
        { code: 'true 123 swizzle', expectedError: 'swizzle expects a list, string, or number as the second argument.' },
    ]
};
