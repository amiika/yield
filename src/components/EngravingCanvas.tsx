import React, { useRef, useEffect, useState } from 'react';
import type { EngravingObject } from '../lib/types';

// Let TypeScript know that opensheetmusicdisplay is a global variable from the script tag in index.html
// @ts-ignore
declare var opensheetmusicdisplay: any;

interface EngravingCanvasProps {
    engravingData: EngravingObject;
    className?: string;
}

// --- MusicXML Conversion ---

const KEY_SIGNATURE_TO_FIFTHS: Record<string, { fifths: number; mode: string; }> = {
    'C': { fifths: 0, mode: 'major' }, 'G': { fifths: 1, mode: 'major' }, 'D': { fifths: 2, mode: 'major' },
    'A': { fifths: 3, mode: 'major' }, 'E': { fifths: 4, mode: 'major' }, 'B': { fifths: 5, mode: 'major' },
    'F#': { fifths: 6, mode: 'major' }, 'C#': { fifths: 7, mode: 'major' },
    'F': { fifths: -1, mode: 'major' }, 'Bb': { fifths: -2, mode: 'major' }, 'Eb': { fifths: -3, mode: 'major' },
    'Ab': { fifths: -4, mode: 'major' }, 'Db': { fifths: -5, mode: 'major' }, 'Gb': { fifths: -6, mode: 'major' },
    'Cb': { fifths: -7, mode: 'major' },
    'Am': { fifths: 0, mode: 'minor' }, 'Em': { fifths: 1, mode: 'minor' }, 'Bm': { fifths: 2, mode: 'minor' },
    'F#m': { fifths: 3, mode: 'minor' }, 'C#m': { fifths: 4, mode: 'minor' }, 'G#m': { fifths: 5, mode: 'minor' },
    'D#m': { fifths: 6, mode: 'minor' }, 'A#m': { fifths: 7, mode: 'minor' },
    'Dm': { fifths: -1, mode: 'minor' }, 'Gm': { fifths: -2, mode: 'minor' }, 'Cm': { fifths: -3, mode: 'minor' },
    'Fm': { fifths: -4, mode: 'minor' }, 'Bbm': { fifths: -5, mode: 'minor' }, 'Ebm': { fifths: -6, mode: 'minor' },
};

const MIDI_PITCH_MAP: { step: string; alter: number }[] = [
    { step: 'C', alter: 0 }, { step: 'C', alter: 1 }, { step: 'D', alter: 0 },
    { step: 'D', alter: 1 }, { step: 'E', alter: 0 }, { step: 'F', alter: 0 },
    { step: 'F', alter: 1 }, { step: 'G', alter: 0 }, { step: 'G', alter: 1 },
    { step: 'A', alter: 0 }, { step: 'A', alter: 1 }, { step: 'B', alter: 0 },
];

function midiToPitch(midi: number): { step: string; alter: number; octave: number } {
    const octave = Math.floor(midi / 12) - 1;
    const noteIndex = Math.round(midi) % 12;
    const { step, alter } = MIDI_PITCH_MAP[noteIndex];
    return { step, alter, octave };
}

const DURATION_TO_TYPE: { [key: number]: string } = {
    4: 'whole', 2: 'half', 1: 'quarter', 0.5: 'eighth',
    0.25: '16th', 0.125: '32nd', 0.0625: '64th'
};

function getNoteType(durationInBeats: number): string {
    const closest = Object.keys(DURATION_TO_TYPE)
        .map(parseFloat)
        .reduce((prev, curr) => (Math.abs(curr - durationInBeats) < Math.abs(prev - durationInBeats) ? curr : prev));
    return DURATION_TO_TYPE[closest];
}


function engravingToMusicXML(engravingData: EngravingObject): string {
    const { sequence, timeSignature, keySignature, tempo } = engravingData;

    const [beatsPerMeasure, beatType] = timeSignature.split('/').map(Number);
    const DIVISIONS = 240; // Divisions per quarter note, a common value

    const keyInfo = KEY_SIGNATURE_TO_FIFTHS[keySignature] || { fifths: 0, mode: 'major' };
    const beatsPerWholeNote = beatType; 

    // Handle both single-row and multi-row (matrix) sequences from `dur`
    const isMultiRow = Array.isArray(sequence) &&
                       sequence.length > 0 &&
                       Array.isArray(sequence[0]) &&
                       (sequence[0].length === 0 || Array.isArray(sequence[0][0]));
    
    const flattenedSequence = isMultiRow ? sequence.flat() : sequence;

    let xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.0">
  <part-list>
    <score-part id="P1"><part-name>Music</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>${DIVISIONS}</divisions>
        <key><fifths>${keyInfo.fifths}</fifths><mode>${keyInfo.mode}</mode></key>
        <time><beats>${beatsPerMeasure}</beats><beat-type>${beatType}</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <direction placement="above">
        <direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>${tempo}</per-minute></metronome></direction-type>
        <sound tempo="${tempo}"/>
      </direction>`;

    for (const noteData of flattenedSequence) {
        if (!Array.isArray(noteData) || noteData.length < 2) continue;

        const [midi, durationFraction, lyric] = noteData;
        
        // MusicXML duration is based on <divisions> per quarter note.
        // A whole note is assumed to be 4 quarter notes.
        const durationInQuarters = durationFraction * 4;
        const durationInDivisions = Math.round(durationInQuarters * DIVISIONS);
        const durationInBeats = durationFraction * beatsPerWholeNote;

        xml += '<note>';
        if (midi === null) {
            xml += '<rest/>';
        } else {
            const { step, alter, octave } = midiToPitch(midi);
            xml += `<pitch><step>${step}</step>${alter !== 0 ? `<alter>${alter}</alter>` : ''}<octave>${octave}</octave></pitch>`;
        }
        xml += `<duration>${durationInDivisions}</duration>`;
        xml += `<type>${getNoteType(durationInBeats)}</type>`;
        if (lyric) {
            xml += `<lyric number="1"><syllabic>single</syllabic><text>${lyric.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text></lyric>`;
        }
        xml += '</note>';
    }

    xml += `
    </measure>
  </part>
</score-partwise>`;
    return xml;
}


export const EngravingCanvas: React.FC<EngravingCanvasProps> = ({ engravingData, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const osmdRef = useRef<any>(null); // Store the OSMD instance
    const [error, setError] = useState<string | null>(null);
    const [isLibraryReady, setIsLibraryReady] = useState(false);
    const [musicXML, setMusicXML] = useState<string>('');

    // Poll for the OSMD library to be loaded from the script tag.
    useEffect(() => {
        if (typeof opensheetmusicdisplay !== 'undefined') {
            setIsLibraryReady(true);
            return;
        }
        const startTime = Date.now();
        const interval = setInterval(() => {
            if (typeof opensheetmusicdisplay !== 'undefined') {
                setIsLibraryReady(true);
                clearInterval(interval);
            } else if (Date.now() - startTime > 5000) { // 5-second timeout
                setError("OpenSheetMusicDisplay library failed to load.");
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Effect for initializing, loading data, and handling resize.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isLibraryReady || !engravingData) return;

        let animationFrameId: number;

        const renderScore = async () => {
            setError(null);
            try {
                // Initialize OSMD instance if it doesn't exist
                if (!osmdRef.current) {
                    osmdRef.current = new opensheetmusicdisplay.OpenSheetMusicDisplay(container, {
                        autoResize: true, // Let OSMD handle resizing
                        backend: "svg",
                        drawTitle: false
                    });
                }
                const osmd = osmdRef.current;
                
                // Increase space below staff for lyrics
                osmd.EngravingRules.LyricsMarginBelowStaff = 10.0;

                // Generate XML and load it
                const generatedMusicXML = engravingToMusicXML(engravingData);
                setMusicXML(generatedMusicXML);
                await osmd.load(generatedMusicXML);
                osmd.render();

            } catch (e) {
                console.error("OpenSheetMusicDisplay Error:", e);
                setError(e.message || "Failed to render engraving.");
            }
        };

        renderScore();
        
        // Use ResizeObserver to re-render on size changes
        const observer = new ResizeObserver(() => {
            animationFrameId = window.requestAnimationFrame(() => {
                if (osmdRef.current) {
                    osmdRef.current.render();
                }
            });
        });
        observer.observe(container);

        return () => {
            observer.disconnect();
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [engravingData, isLibraryReady]);
    
    const handleExportXML = () => {
        if (!musicXML) return;
        const blob = new Blob([musicXML], { type: 'application/vnd.recordare.musicxml+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'score.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const handleSaveAsPDF = () => {
        if (!osmdRef.current || !containerRef.current) return;
        
        const svgElement = containerRef.current.querySelector('svg');
        if (!svgElement) return;

        // Clone the SVG and style it for printing
        const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
        svgClone.style.width = '100%';
        svgClone.style.height = 'auto';

        const svgXML = new XMLSerializer().serializeToString(svgClone);
        
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Score</title>
                        <style>
                            @media print {
                                @page { size: auto; margin: 20mm; }
                                body { margin: 0; }
                                svg { max-width: 100%; height: auto; }
                            }
                        </style>
                    </head>
                    <body>
                        ${svgXML}
                        <script>
                            window.onload = function() {
                                window.print();
                                window.close();
                            }
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };


    return (
        <div className={`relative flex flex-col h-full bg-white rounded-lg shadow-inner border ${className || ''}`}>
            <div className="p-2 border-b flex items-center justify-end gap-2 flex-wrap">
                 <button
                    onClick={handleExportXML}
                    disabled={!musicXML || !!error}
                    className="px-3 py-1 text-xs rounded-md transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Export XML
                </button>
                <button
                    onClick={handleSaveAsPDF}
                    disabled={!musicXML || !!error}
                    className="px-3 py-1 text-xs rounded-md transition-colors bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Save as PDF
                </button>
            </div>
            <div ref={containerRef} className="w-full h-full engraving-container overflow-auto flex-grow p-4">
                {!isLibraryReady && !error && (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Loading Notation Library...
                    </div>
                )}
            </div>
            {error && (
                <div className="absolute inset-0 bg-red-50/80 p-4 overflow-auto">
                    <p className="text-red-600 font-bold">Rendering Error:</p>
                    <pre className="text-xs text-red-500 whitespace-pre-wrap">{error}</pre>
                </div>
            )}
        </div>
    );
};