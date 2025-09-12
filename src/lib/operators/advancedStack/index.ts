
import { appendTo } from './appendTo';
import { ary } from './binary';
import { construct } from './construct';
import { infra } from './infra';
import { nullary } from './nullary';
import { popstackto } from './popstackto';
import { popto } from './popto';
import { unary } from './unary';
import { unstack } from './unstack';
import { x } from './x';
import { quote } from './quote';
import type { Category } from '../../types';

export const advancedStack: Category = {
    name: "Advanced Stack Operations",
    description: "Powerful operators for metaprogramming and advanced stack manipulation.",
    definitions: {
        appendTo,
        ary,
        construct,
        infra,
        nullary,
        popstackto,
        popto,
        unary,
        unstack,
        x,
        quote,
    }
};
