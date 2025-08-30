import { ucase } from './toUpperCase';
import { locase } from './toLowerCase';
import { trim } from './trim';
import { slice } from './slice';
import { splitstr } from './str-split';
import { starts } from './startsWith';
import { ends } from './endsWith';
import { replace } from './replaceAll';
import type { Category } from '../../types';

export const jsString: Category = {
    name: "JavaScript String Operations",
    description: "A bridge to common JavaScript string manipulation methods.",
    definitions: {
        ucase,
        locase,
        trim,
        slice,
        'splitstr': splitstr,
        starts,
        ends,
        replace,
    }
};
