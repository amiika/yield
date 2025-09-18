import type { PlotObject } from '../types';
import { SCALES_IN_CENTS, midiToFreq, freqToMidi, midiToNoteName, pitchToMidi } from '../operators/musicology/defaults';


/**
 * Creates a data object for the graph from a sequence and parameters.
 */
function createMusicData(plotData: PlotObject) {
    // A multi-row sequence is a list of lists of note tuples, e.g., [[[60, 0.25]], [[62, 0.25]]].
    // A single-row sequence is a list of note tuples, e.g., [[60, 0.25], [62, 0.25]].
    // A note tuple is an array, so we check if the first element of the first row is also an array.
    const isMultiRow = Array.isArray(plotData.sequence) &&
                       plotData.sequence.length > 0 &&
                       Array.isArray(plotData.sequence[0]) &&
                       (plotData.sequence[0].length === 0 || Array.isArray(plotData.sequence[0][0]));

    const sequences = isMultiRow ? plotData.sequence : [plotData.sequence];

    let maxBeat = 0;
    let overallMinMidi = 127;
    let overallMaxMidi = 0;
    
    // The denominator of the time signature tells us what note value gets one beat, and thus how many beats are in a whole note.
    const [, beatUnitStr] = plotData.timeSignature.split('/');
    const beatsPerWholeNote = parseInt(beatUnitStr, 10) || 4;

    const noteRows = sequences.map(sequence => {
        let currentBeat = 0;
        const tonicIsHz = plotData.pitchType === 'hz';
        const tonicMidi = tonicIsHz ? freqToMidi(plotData.tonic) : plotData.tonic;
        let lastMidi = tonicMidi;

        if (!Array.isArray(sequence)) {
            console.error("Plotter error: sequence row is not an array", sequence);
            return []; // Return empty row to prevent crash
        }

        const noteEvents = sequence.map(item => {
            // Safeguard against malformed data from `dur`
            if (!Array.isArray(item)) {
                console.error("Plotter error: note item is not an array", item);
                return { midi: null, startBeat: currentBeat, duration: 0, lyric: '' };
            }

            const pitch = item[0];
            const durationAsFractionOfWhole = item[1];
            const lyric = item[2]; // This will be undefined if item has 2 elements, which is fine.
            
            // Convert the fractional duration into beats based on the time signature.
            const durationInBeats = durationAsFractionOfWhole * beatsPerWholeNote;
            
            const midi = pitchToMidi(pitch, plotData.pitchType, tonicMidi, lastMidi);
            if (midi !== null) {
                lastMidi = midi;
                overallMinMidi = Math.min(overallMinMidi, midi);
                overallMaxMidi = Math.max(overallMaxMidi, midi);
            }
            
            const note = {
                midi: midi,
                startBeat: currentBeat,
                duration: durationInBeats,
                lyric: lyric || '',
            };
            currentBeat += durationInBeats;
            return note;
        });
        maxBeat = Math.max(maxBeat, currentBeat);
        return noteEvents;
    });

    return {
        tonicMidi: plotData.tonic,
        scaleCents: SCALES_IN_CENTS[plotData.scaleType.toUpperCase()] || SCALES_IN_CENTS['CHROMATIC'],
        noteRows: noteRows,
        tempo: `${plotData.timeSignature} @${plotData.tempo}`,
        totalBeats: maxBeat,
        melodyMinMidi: validNotesExist(noteRows) ? overallMinMidi : 48,
        melodyMaxMidi: validNotesExist(noteRows) ? overallMaxMidi : 72,
    };
}

function validNotesExist(noteRows) {
    return noteRows.some(row => row.some(note => note.midi !== null));
}


/**
 * Draws the music graph using Global Notation principles.
 */
export function drawMusicGraph(canvas: HTMLCanvasElement, plotData: PlotObject, scaleDisplayMode: string) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const musicData = createMusicData(plotData);
    const { noteRows, totalBeats, melodyMinMidi, melodyMaxMidi, tonicMidi, scaleCents, tempo } = musicData;
    const numRows = noteRows.length;
    
    // Generate all scale pitches in a wide range of octaves to find bounds
    const allScalePitches: number[] = [];
    for (let octave = -5; octave <= 5; octave++) {
        scaleCents.forEach(cents => {
            allScalePitches.push(tonicMidi + octave * 12 + cents / 100);
        });
    }
    allScalePitches.sort((a, b) => a - b);

    // Find the scale degrees that bound the melody to define the view
    let viewMinMidi = melodyMinMidi;
    const lowerBound = allScalePitches.filter(p => p <= melodyMinMidi).pop();
    if (lowerBound !== undefined) viewMinMidi = lowerBound;
    
    let viewMaxMidi = melodyMaxMidi;
    const upperBound = allScalePitches.find(p => p >= melodyMaxMidi);
    if (upperBound !== undefined) viewMaxMidi = upperBound;

    const config = {
        margin: 80,
        beatsToShow: Math.max(4, Math.ceil(totalBeats)),
        gridColor: '#e0e0e0',
        lineColor: '#000000',
        tonicLineColor: '#000000',
        lyricSpace: 30, // Space reserved for lyrics below each staff
    };

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const graphWidth = canvasWidth - config.margin * 2;
    const graphHeight = canvasHeight - config.margin * 2;
    
    const totalDrawableHeight = graphHeight;
    const staffHeight = (totalDrawableHeight / numRows) - config.lyricSpace;
    const pitchPadding = scaleCents.length > 1 ? (scaleCents[1] - scaleCents[0]) / 100 : 1;
    const minP = viewMinMidi - pitchPadding;
    const maxP = viewMaxMidi + pitchPadding;
    const totalRange = maxP - minP;

    const yConverter = (midiVal, rowStartY) => rowStartY + staffHeight - ((midiVal - minP) / totalRange) * staffHeight;
    const beatToX = (beat) => config.margin + (beat / config.beatsToShow) * graphWidth;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // --- 1. Draw Grid and Labels ---
    ctx.strokeStyle = config.gridColor;
    ctx.fillStyle = '#555';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    const linesToDraw = new Set<number>();
    allScalePitches.forEach(midiVal => {
        if (midiVal >= minP && midiVal <= maxP) linesToDraw.add(midiVal);
    });
    
    const sortedLines = [...linesToDraw].sort((a,b)=>a-b);
    sortedLines.forEach(midiVal => {
        const isTonic = (Math.round((midiVal - tonicMidi) * 100) % 1200 + 1200) % 1200 === 0;
        ctx.strokeStyle = isTonic ? config.tonicLineColor : config.gridColor;
        ctx.lineWidth = isTonic ? 1.5 : 1;
        
        let label;
        const centsOffsetFromTonic = (Math.round((midiVal - tonicMidi) * 100) % 1200 + 1200) % 1200;
        const roundedCents = Math.round(centsOffsetFromTonic);
        const pcIndex = scaleCents.findIndex(c => Math.abs(c - roundedCents) < 1);

        if (scaleDisplayMode === 'noteName') label = midiToNoteName(midiVal);
        else if (scaleDisplayMode === 'pitchClass') label = pcIndex !== -1 ? pcIndex : '?';
        else if (scaleDisplayMode === 'cents') label = roundedCents;
        else if (scaleDisplayMode === 'hz') label = midiToFreq(midiVal)?.toFixed(2);
        else if (scaleDisplayMode === 'midi') label = midiVal.toFixed(2);
        
        for(let i=0; i<numRows; i++) {
            const rowStartY = config.margin + i * (staffHeight + config.lyricSpace);
            const y = yConverter(midiVal, rowStartY);
            ctx.beginPath();
            ctx.moveTo(config.margin - (isTonic ? 10 : 0), y);
            ctx.lineTo(canvasWidth - config.margin + (isTonic ? 10 : 0), y);
            ctx.stroke();

            if (label !== undefined) {
                ctx.fillText(String(label), config.margin - 12, y);
            }
        }
    });
    
    const tempoText = tempo || "4/4 @120";
    const [timeSig, ] = tempoText.split('@');
    const beatsPerBar = parseInt(timeSig.split('/')[0], 10) || 4;
    
    for (let i = 0; i <= config.beatsToShow; i++) {
        const isBarLine = i > 0 && i % beatsPerBar === 0;
        const x = beatToX(i);
        ctx.beginPath();
        ctx.strokeStyle = isBarLine ? '#888' : config.gridColor;
        ctx.lineWidth = isBarLine ? 1.5 : 0.5;
        ctx.moveTo(x, config.margin);
        ctx.lineTo(x, canvasHeight - config.margin);
        ctx.stroke();
    }

    const hurdleY = config.margin - 25;
    const beatWidth = (graphWidth / config.beatsToShow);
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';
    // Center the time signature text over the bar-length hurdle
    ctx.fillText(timeSig.trim(), config.margin + (beatWidth * beatsPerBar) / 2, hurdleY - 8);
    ctx.beginPath();
    ctx.strokeStyle = config.lineColor;
    ctx.lineWidth = 1.5;
    ctx.moveTo(config.margin, hurdleY);
    // Extend hurdle to represent one full bar/measure
    ctx.lineTo(config.margin + beatWidth * beatsPerBar, hurdleY);
    ctx.stroke();

    // --- 2. Draw Melodic Part & Lyrics ---
    ctx.strokeStyle = config.lineColor;
    ctx.lineWidth = 2;
    
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        const rowNotes = noteRows[rowIndex];
        const rowStartY = config.margin + rowIndex * (staffHeight + config.lyricSpace);

        for (let i = 0; i < rowNotes.length; i++) {
            const note = rowNotes[i];
            if (note.midi === null) continue; // Skip rests

            const nextNote = rowNotes[i + 1];
            const x_start = beatToX(note.startBeat);
            const x_end = beatToX(note.startBeat + note.duration);
            const y = yConverter(note.midi, rowStartY);

            ctx.beginPath();
            ctx.moveTo(x_start, y - 8);
            ctx.lineTo(x_start, y + 8);
            ctx.moveTo(x_start, y);
            ctx.lineTo(x_end, y);
            ctx.stroke();

            if (nextNote && nextNote.midi !== null && Math.abs(nextNote.startBeat - (note.startBeat + note.duration)) < 1e-9) {
                 const next_y = yConverter(nextNote.midi, rowStartY);
                 ctx.beginPath();
                 ctx.moveTo(x_end, y);
                 ctx.lineTo(x_end, next_y);
                 ctx.stroke();
            }
        }
        
        const lyricGroups = [];
        let currentGroup = null;

        for (const note of rowNotes) {
            if (note.lyric) {
                if (currentGroup) lyricGroups.push(currentGroup);
                currentGroup = { text: note.lyric, startBeat: note.startBeat, endBeat: note.startBeat + note.duration };
            } else if (currentGroup) {
                currentGroup.endBeat = note.startBeat + note.duration;
            }
        }
        if (currentGroup) lyricGroups.push(currentGroup);
        
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        lyricGroups.forEach(group => {
            const x_start = beatToX(group.startBeat);
            const x_end = beatToX(group.endBeat);
            const lyricY = rowStartY + staffHeight + 15; // Center in lyric space
            ctx.fillText(group.text, (x_start + x_end) / 2, lyricY);
        });
    }
}