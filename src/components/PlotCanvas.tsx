import React, { useRef, useEffect, useState } from 'react';
import type { PlotObject } from '../lib/types';
import { drawMusicGraph } from '../lib/visuals/plotter';

interface PlotCanvasProps {
    plotData: PlotObject;
    className?: string;
}

type ScaleDisplayMode = 'midi' | 'hz' | 'cents' | 'pitchClass' | 'noteName';

export const PlotCanvas: React.FC<PlotCanvasProps> = ({ plotData, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scaleDisplayMode, setScaleDisplayMode] = useState<ScaleDisplayMode>('cents');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let animationFrameId: number;

        try {
            // Use ResizeObserver to make the canvas responsive
            const observer = new ResizeObserver(entries => {
                // Defer resize and redraw to the next animation frame to avoid ResizeObserver loop errors.
                animationFrameId = window.requestAnimationFrame(() => {
                    if (!canvasRef.current) return;
                    for (const entry of entries) {
                        const { width, height } = entry.contentRect;
                        if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
                            canvasRef.current.width = width;
                            canvasRef.current.height = height;
                            // Redrawing is necessary after resizing the canvas
                            drawMusicGraph(canvasRef.current, plotData, scaleDisplayMode);
                        }
                    }
                });
            });
            observer.observe(canvas);

            // Initial draw
            drawMusicGraph(canvas, plotData, scaleDisplayMode);

            return () => {
                observer.disconnect();
                if (animationFrameId) {
                    window.cancelAnimationFrame(animationFrameId);
                }
            };
        } catch (e) {
            console.error("Error drawing music graph:", e);
            setError(e.message || "Failed to render plot.");
        }
    }, [plotData, scaleDisplayMode]);

    const scaleModes: ScaleDisplayMode[] = ['cents', 'pitchClass', 'noteName', 'midi', 'hz'];
    const scaleModeLabels = {
        noteName: 'Note Name',
        pitchClass: 'Pitch Class',
        midi: 'MIDI',
        cents: 'Cents',
        hz: 'Hz'
    };

    return (
        <div className={`relative flex flex-col h-full bg-gray-50 rounded-lg shadow-inner border ${className || ''}`}>
            <div className="p-2 border-b bg-white/50 backdrop-blur-sm flex items-center justify-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-600 mr-2">SCALE:</span>
                {scaleModes.map(mode => (
                    <button
                        key={mode}
                        onClick={() => setScaleDisplayMode(mode)}
                        className={`px-2 py-1 text-xs rounded-md transition-colors ${
                            scaleDisplayMode === mode 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        aria-pressed={scaleDisplayMode === mode}
                    >
                        {scaleModeLabels[mode]}
                    </button>
                ))}
            </div>
            <div className="flex-grow p-2 relative">
                 <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
            {error && <pre className="absolute top-0 left-0 bg-red-500/80 text-white p-2 font-mono text-xs max-h-full overflow-auto">{error}</pre>}
        </div>
    );
};
