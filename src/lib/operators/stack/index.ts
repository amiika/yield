import { pop } from './pop';
import { put } from './put';
import { dup } from './dup';
import { swap } from './swap';
import { id } from './id';
import { rollup } from './rollup';
import { rolldown } from './rolldown';
import { rotate } from './rotate';
import { popd } from './popd';
import { dupd } from './dupd';
import { swapd } from './swapd';
import { clear } from './clearstack';
import { over } from './over';
import { tuck } from './tuck';
import type { Category } from '../../types';

export const stack: Category = {
    name: "Stack Primitives",
    description: "Operators for directly manipulating the stack.",
    definitions: {
        pop,
        put,
        dup,
        swap,
        over,
        tuck,
        id,
        rollup,
        rolldown,
        rotate,
        popd,
        dupd,
        swapd,
        clear,
    }
};
