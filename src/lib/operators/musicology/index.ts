

import type { Category } from '../../types';
import { scale } from './scale';
import { midi } from './midi';
import { pc } from './pc';
import { chord } from './chord';
import { cents } from './cents';
import { dur } from './dur';
import { midihz } from './midihz';
import { pchz } from './pchz';
import { centhz } from './centhz';
import { plot } from './plot';
import { engrave } from './engrave';
import { scala } from './scala';
import { rat } from './rat';
import { edo } from './edo';
import { harmonics } from './harmonics';
import { scalegen } from './scalegen';
import { jit } from './jit';
import { transposepcs } from './transposepcs';
import { invertrow } from './invert';
import { retrograde } from './retrograde';
import { partition } from './partition';
import { isaggregate } from './isaggregate';
import { iscombinatorial } from './iscombinatorial';
import { primeform } from './primeform';
import { rowform } from './rowform';
import { invariants } from './invariants';
import { crosspartition } from './crosspartition';
import { metre } from './metre';
import { quantise } from './quantise';
import { degradeBy } from './degradeBy';
import { ply } from './ply';
import { palindrome } from './palindrome';
import { cram } from './cram';
import { linger } from './linger';
import { chunk } from './chunk';
import { bite } from './bite';
import { shuffle } from './shuffle';
import { scramble } from './scramble';
import { rot } from './rot';
import { stripe } from './stripe';
import { slowstripe } from './slowstripe';


export const musicology: Category = {
    name: "Musicology",
    description: "Operators for music theory, scales, notes, and chords.",
    definitions: {
        scale,
        scala,
        midi,
        pc,
        chord,
        cents,
        dur,
        midihz,
        pchz,
        centhz,
        plot,
        engrave,
        rat,
        edo,
        harmonics,
        scalegen,
        jit,
        transposepcs,
        invertrow,
        irow: invertrow,
        retrograde,
        partition,
        isaggregate,
        iscombinatorial,
        primeform,
        rowform,
        invariants,
        crosspartition,
        metre,
        quantise,
        degradeBy,
        ply,
        palindrome,
        cram,
        linger,
        chunk,
        bite,
        shuffle,
        scramble,
        rot,
        stripe,
        slowstripe,
    }
};
