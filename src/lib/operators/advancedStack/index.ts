import { unstack } from './unstack';
import { infra } from './infra';
import { x } from './x';
import { construct } from './construct';
import { nullary } from './nullary';
import { unary } from './unary';
import { binary } from './binary';
import { ternary } from './ternary';
import { unary2 } from './unary2';
import { unary3 } from './unary3';
import { unary4 } from './unary4';
import { popstack } from './popstack';
import { popto } from './popto';
import { appendTo } from './appendTo';
import { popstackto } from './popstackto';
import type { Category } from '../../types';

export const advancedStack: Category = {
    name: "Advanced Stack Operations",
    description: "Powerful operators for metaprogramming and advanced stack manipulation.",
    definitions: {
        unstack,
        infra,
        x,
        construct,
        popstack,
        popto,
        appendTo,
        popstackto,
        nullary,
        unary,
        binary,
        ternary,
        unary2,
        unary3,
        unary4,
    }
};
