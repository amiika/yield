






import { play, start } from './play';
import { sine } from './sine';
import { saw } from './saw';
import { pulse } from './pulse';
import { noise } from './noise';
import { lpf } from './lpf';
import { hpf } from './hpf';
import { ad } from './ad';
import { adsr } from './adsr';
import { ahr } from './ahr';
import { delay } from './delay';
import { distort } from './distort';
import { pan } from './pan';
import { note } from './note';
import { seq } from './seq';
import { noteseq } from './noteseq';
import { impulse } from './impulse';
import { mix } from './mix';
import { mul } from './mul';
import { ctrl } from './ctrl';
import { hush } from './hush';
import { bd } from './bd';
import { sd } from './sd';
import { lt } from './lt';
import { mt } from './mt';
import { ht } from './ht';
import { hh } from './hh';
import { bytebeat } from './bytebeat';
import { floatbeat } from './floatbeat';
import { tri } from './tri';
import { poly } from './voices';
import { fm } from './fm';
import { gate } from './gate';
import { synth } from './fm-patches';
import { transpileAudio } from './transpile-audio';
import { oneshot } from './oneshot';
import { arp } from './arp';
import type { Category } from '../../types';

export const audio: Category = {
    name: "Audio",
    description: "Operators for audio synthesis and processing using the Web Audio API.",
    definitions: {
        ad,
        adsr,
        ahr,
        arp,
        bd,
        bytebeat,
        ctrl,
        delay,
        distort,
        floatbeat,
        fm,
        gate,
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
        noteseq,
        oneshot,
        pan,
        play,
        poly,
        pulse,
        saw,
        sd,
        seq,
        sine,
        start,
        synth,
        'transpile-audio': transpileAudio,
        tri,
    }
};