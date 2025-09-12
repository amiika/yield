
import type { Category } from '../../types';
import { tempo } from './tempo';
import { origin } from './origin';
import { elapsed } from './elapsed';
// FIX: Renamed the imported 'live' operator to 'liveOp' to avoid a naming conflict with the exported 'live' category object.
import { live as liveOp } from './live';
import { stop } from './stop';
import { wait } from './wait';
import { sleep } from './sleep';
import { until } from './until';
import { kill } from './kill';

export const live: Category = {
    name: "Live Coding",
    description: "Operators for timing, scheduling, and live-looping.",
    definitions: {
        tempo,
        origin,
        elapsed,
        live: liveOp,
        stop,
        kill,
        wait,
        sleep,
        until,
    }
};
