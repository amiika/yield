
import type { Operator } from '../../types';
import { transpileJS } from '../../utils';

export const bytebeat: Operator = {
    definition: {
        exec: function*(s) {
            const frequency = s.pop() as number;
            const quotation = s.pop() as any[];
            
            if (!Array.isArray(quotation)) {
                s.push(quotation, frequency); // push back
                throw new Error('bytebeat expects a quotation (list) containing a valid RPN expression.');
            }
            if (typeof frequency !== 'number') {
                s.push(quotation, frequency); // push back
                throw new Error('bytebeat expects a frequency number.');
            }
            
            const jsCode = transpileJS(quotation);
            s.push([jsCode, frequency, 'bytebeat']);
        },
        description: `Bytebeat quotation. Consumes a quotation with an RPN expression and a frequency. When played, the expression is transpiled to JS and evaluated for every audio sample. The integer variable 't' (time) is available inside the quotation. The integer result of the formula is wrapped to 8 bits (0-255) and converted to an audio signal (-1 to 1).`,
        effect: '[L_quotation F_frequency] -> [L_quotation]'
    },
    examples: [
        { 
            code: `
# A simple bytebeat formula: t * 42
# In RPN, this is "t 42 *"
(t 42 *) 8000 bytebeat start`, 
            expected: []
        },
        {
            code: `
# A classic formula: (t>>7|t|t>>6)*10+4*(t&t>>13|t>>6)
# This has to be broken down into RPN steps.
(
  # Part 1: (t>>7|t|t>>6)
  t 7 >> t | t 6 >> |
  
  # Part 2: *10
  10 *
  
  # Part 3: 4*(t&t>>13|t>>6)
  4 
  t t 13 >> &
  t 6 >>
  | *
  
  # Part 4: Add them together
  +
) 8000 bytebeat start`,
            expected: []
        },
        {
            code: `
# Formula: t*(t&16384?6:5)*(3+(3&t>>(t&2048?7:14)))>>(3&t>>9)|t>>2
# Let's break it down.

(
  # 1. t
  t
  
  # 2. (t&16384 ? 6 : 5) -> RPN: t 16384 & (6) (5) ?
  t 16384 & 6 5 ?
  
  # 3. Multiply 1 and 2
  *
  
  # 4. (3 + (3 & (t >> (t&2048?7:14))))
  # 4a. (t&2048?7:14) -> t 2048 & 7 14 ?
  # 4b. t >> (4a) -> t (4a) >>
  # 4c. 3 & (4b) -> 3 (4b) &
  # 4d. 3 + (4c) -> 3 (4c) +
  3 t t 2048 & 7 14 ? >> 3 swap & +

  # 5. Multiply 3 and 4
  *
  
  # 6. (3 & (t >> 9))
  3 t 9 >> &
  
  # 7. Right shift 5 by 6
  >>

  # 8. (t >> 2)
  t 2 >>
  
  # 9. Bitwise OR 7 and 8
  |
) 8000 bytebeat start
`,
            expected: []
        },
        {
            code: `
# Control pitch and rhythm with the mouse
(
  t mousex 100 / * # rhythm controlled by mousex
  t mousey 200 / *  # pitch controlled by mousey
  &
) 8000 bytebeat start`,
            expected: []
        }
    ]
};
