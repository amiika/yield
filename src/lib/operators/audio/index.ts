import { play } from './play';
import { stop } from './stop';
import { tempo } from './tempo';
import { sine } from './sine';
import { saw } from './saw';
import { pulse } from './pulse';
import { noise } from './noise';
import { lpf } from './lpf';
import { hpf } from './hpf';
import { ad } from './ad';
import { adsr } from './adsr';
import { delay } from './delay';
import { distort } from './distort';
import { pan } from './pan';
import { note } from './note';
import { seq } from './seq';
import { impulse } from './impulse';
import { mix } from './audio-add';
import { mul } from './audio-mul';
import { ctrl } from './ctrl';
import { hush } from './hush';
import { patch } from './patch';
import { bd } from './bd';
import { sd } from './sd';
import { lt } from './lt';
import { mt } from './mt';
import { ht } from './ht';
import { hh } from './hh';
import { bytebeat } from './bytebeat';
import { floatbeat } from './floatbeat';
import { t } from './t';
import type { Category } from '../../types';

export const audio: Category = {
    name: "Audio",
    description: "Operators for audio synthesis and processing using the Web Audio API.",
    definitions: {
        ad,
        adsr,
        bd,
        bytebeat,
        ctrl,
        delay,
        distort,
        floatbeat,
        hh,
        hpf,
        ht,
        hush,
        impulse,
        lpf,
        lt,
        'mix': mix,
        mt,
        'mul': mul,
        noise,
        note,
        pan,
        patch,
        play,
        pulse,
        saw,
        sd,
        seq,
        sine,
        stop,
        t,
        tempo,
    }
};