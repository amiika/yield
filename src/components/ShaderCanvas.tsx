import React, { useRef, useEffect, useState } from 'react';

interface ShaderCanvasProps {
    shaderCode: string;
    className?: string;
    isBackground?: boolean;
}

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const ShaderCanvas: React.FC<ShaderCanvasProps> = ({ shaderCode, className, isBackground = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGL2RenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const mouseRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const mouseDownRef = useRef<{ x: number, y: number, down: number }>({ x: 0, y: 0, down: 0 });
    const animationFrameId = useRef<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let resizeFrameId: number;

        const observer = new ResizeObserver(entries => {
            // Defer canvas dimension changes to the next animation frame to prevent ResizeObserver loop errors.
            resizeFrameId = requestAnimationFrame(() => {
                if (!canvasRef.current) return;
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    // Check if size actually changed to avoid redundant work and potential cycles
                    if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
                        canvasRef.current.width = width;
                        canvasRef.current.height = height;
                        // The existing render loop will call gl.viewport with the new dimensions.
                    }
                }
            });
        });
        observer.observe(canvas);

        const gl = canvas.getContext('webgl2');
        if (!gl) {
            setError('WebGL2 not supported');
            return;
        }
        glRef.current = gl;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                const info = gl.getShaderInfoLog(shader);
                setError(`Shader compile error: ${info}`);
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };
        
        const vertexShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, shaderCode);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            setError(`Program link error: ${info}`);
            gl.deleteProgram(program);
            return;
        }
        
        programRef.current = program;

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        setError(null);
        
        const handleMouseDown = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseDownRef.current = {
                x: e.clientX - rect.left,
                y: rect.height - (e.clientY - rect.top), // Flip Y for GLSL
                down: 1.0
            };
        };
        const handleMouseUp = (e: MouseEvent) => {
            mouseDownRef.current.down = 0.0;
        };
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: rect.height - (e.clientY - rect.top) // Flip Y for GLSL
            };
            if (mouseDownRef.current.down > 0.5) {
                mouseDownRef.current.x = e.clientX - rect.left;
                mouseDownRef.current.y = rect.height - (e.clientY - rect.top);
            }
        };
        
        const container = isBackground ? (canvas.parentElement?.parentElement || document) : canvas;
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);

        let startTime = performance.now();
        const render = (time: number) => {
            const gl = glRef.current;
            const program = programRef.current;
            if (!gl || !program) return;
            
            const uTime = gl.getUniformLocation(program, 'u_time');
            const uResolution = gl.getUniformLocation(program, 'u_resolution');
            const uMouse = gl.getUniformLocation(program, 'u_mouse');
            const uMoused = gl.getUniformLocation(program, 'u_moused');

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            
            if (uTime) gl.uniform1f(uTime, (time - startTime) * 0.001);
            if (uResolution) gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);
            if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
            if (uMoused) gl.uniform3f(uMoused, mouseDownRef.current.x, mouseDownRef.current.y, mouseDownRef.current.down);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId.current = requestAnimationFrame(render);
        };
        
        animationFrameId.current = requestAnimationFrame(render);
        
        return () => {
            observer.disconnect();
            cancelAnimationFrame(resizeFrameId);
            cancelAnimationFrame(animationFrameId.current);
            if(gl && programRef.current) {
                gl.deleteProgram(programRef.current);
            }
            if (gl && vertexShader) gl.deleteShader(vertexShader);
            if (gl && fragmentShader) gl.deleteShader(fragmentShader);
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, [shaderCode, isBackground]);

    return (
        <div className={`relative ${className || ''}`}>
            <canvas ref={canvasRef} className="block w-full h-full" />
            {error && <pre className="absolute top-0 left-0 bg-red-500/80 text-white p-2 font-mono text-xs max-h-full overflow-auto">{error}</pre>}
        </div>
    );
};
