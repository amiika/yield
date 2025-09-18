import type { TurtleObject, Turtle3DObject, StackValue, YieldOptions, EvaluateFn, Operator } from '../../types';
import { isMatrix, rotateVector, cross, deepClone } from '../../utils';

const TURTLE_2D_OPS = new Set(['p', 'forward', 'left', 'right', 'penup', 'pendown', 'setxy', 'setheading', 'setpencolor', 'setpensize', 'angle', 'move']);
const TURTLE_3D_OPS = new Set(['p', 'move', 'yaw', 'pitch', 'roll', 'penup', 'pendown', 'setpencolor', 'setpensize', 'angle', 'forward']);

export const isTurtleQuotation = (quotation: StackValue[]): boolean => {
    return quotation.some(token => typeof token === 'string' && TURTLE_2D_OPS.has(token));
};

export const isTurtle3DQuotation = (quotation: StackValue[]): boolean => {
    return quotation.some(token => typeof token === 'string' && TURTLE_3D_OPS.has(token));
};

const isVec = (v: any, len: number): v is number[] => 
    Array.isArray(v) && 
    !isMatrix(v) && 
    v.length === len && 
    v.every(el => typeof el === 'number');

// --- Turtle String Notation Parser ---

function parseTurtleString(commandString: string, turtleState: TurtleObject | Turtle3DObject) {
    const stateStack: (TurtleObject | Turtle3DObject)[] = [];
    
    for (const char of commandString) {
        const angle = turtleState.angle; // Use current angle for each command
        const angleRad = angle * (Math.PI / 180);

        const isUppercase = char >= 'A' && char <= 'Z';
        const isLowercase = char >= 'a' && char <= 'z';

        if (isUppercase || isLowercase) {
            const penWasDown = turtleState.penDown;
            if (isLowercase) {
                turtleState.penDown = false; // Move, don't draw
            }
            
            const distance = turtleState.stepSize;
            if (turtleState.type === 'turtle') {
                const headingRad = turtleState.heading * (Math.PI / 180);
                const newX = turtleState.x + distance * Math.sin(headingRad);
                const newY = turtleState.y + distance * Math.cos(headingRad);
                if (turtleState.penDown) turtleState.path.push({ x1: turtleState.x, y1: turtleState.y, x2: newX, y2: newY, color: turtleState.penColor, penSize: turtleState.penSize });
                turtleState.x = newX; turtleState.y = newY;
            } else { // 3D
                const currentPos: [number, number, number] = [...turtleState.pos];
                const newPos: [number, number, number] = [
                    currentPos[0] + turtleState.dir[0] * distance,
                    currentPos[1] + turtleState.dir[1] * distance,
                    currentPos[2] + turtleState.dir[2] * distance,
                ];
                if (turtleState.penDown) turtleState.path.push({ p1: currentPos, p2: newPos, color: turtleState.penColor, penSize: turtleState.penSize });
                turtleState.pos = newPos;
            }

            if (isLowercase) {
                turtleState.penDown = penWasDown; // Restore pen state
            }
        } else {
            switch (char) {
                case '+': // 2D: Turn Left / 3D: Yaw Left
                    if (turtleState.type === 'turtle') {
                        turtleState.heading -= angle;
                    } else {
                        turtleState.dir = rotateVector(turtleState.dir, turtleState.up, angleRad);
                    }
                    break;
                case '-': // 2D: Turn Right / 3D: Yaw Right
                    if (turtleState.type === 'turtle') {
                        turtleState.heading += angle;
                    } else {
                        turtleState.dir = rotateVector(turtleState.dir, turtleState.up, -angleRad);
                    }
                    break;
                case '&': // Pitch Down
                    if (turtleState.type === 'turtle3d') {
                        const rightVec = cross(turtleState.dir, turtleState.up);
                        turtleState.dir = rotateVector(turtleState.dir, rightVec, -angleRad);
                        turtleState.up = rotateVector(turtleState.up, rightVec, -angleRad);
                    }
                    break;
                case '^': // Pitch Up
                    if (turtleState.type === 'turtle3d') {
                        const rightVec = cross(turtleState.dir, turtleState.up);
                        turtleState.dir = rotateVector(turtleState.dir, rightVec, angleRad);
                        turtleState.up = rotateVector(turtleState.up, rightVec, angleRad);
                    }
                    break;
                case '\\': // Roll Left
                     if (turtleState.type === 'turtle3d') {
                         turtleState.up = rotateVector(turtleState.up, turtleState.dir, angleRad);
                     }
                    break;
                case '/': // Roll Right
                    if (turtleState.type === 'turtle3d') {
                        turtleState.up = rotateVector(turtleState.up, turtleState.dir, -angleRad);
                    }
                    break;
                case '|': // Turn 180 degrees
                    if (turtleState.type === 'turtle') {
                        turtleState.heading += 180;
                    } else {
                        turtleState.dir = rotateVector(turtleState.dir, turtleState.up, Math.PI);
                    }
                    break;
                case '[': // Push state
                    stateStack.push(deepClone(turtleState));
                    break;
                case ']': // Pop state
                    if (stateStack.length > 0) {
                        const poppedState = stateStack.pop();
                        if (poppedState) {
                            Object.assign(turtleState, poppedState);
                        }
                    }
                    break;
            }
        }
    }
}


// This function creates a sandboxed environment to interpret a 2D turtle program.
export function* interpretAndBuild2DTurtle(quotation: StackValue[], options: YieldOptions, evaluate: EvaluateFn): Generator<any, TurtleObject, any> {
    const angleDef = options.dictionary[':angle'];
    const defaultAngle = (angleDef && 'body' in angleDef && typeof angleDef.body === 'number') ? angleDef.body : 25.0;

    // The turtle's state is encapsulated here.
    const turtleState: TurtleObject = {
        type: 'turtle', x: 0, y: 0, heading: 0,
        penDown: true, penColor: [0.0, 0.0, 0.0], penSize: 1.0, path: [], angle: defaultAngle, stepSize: 5.0,
    };
    
    // Create a new dictionary for the sandboxed evaluation.
    const turtleDict: { [key: string]: Operator } = { ...options.dictionary };

    // Helper to create the operator definitions for the sandbox.
    const createTurtleOp = (exec: (stack: StackValue[]) => void): Operator => ({
        definition: { exec: function*(s) { exec(s); }, description: '', effect: '' },
        examples: []
    });
    
    // This is the single point of initialization. It sets the starting point.
    // Subsequent calls to `p` inside the same drawing quotation will just move the turtle.
    let isInitialized = false;
    turtleDict['p'] = createTurtleOp((stack) => {
        const pos = stack.pop();
        if (!isVec(pos, 2)) throw new Error("Turtle 'p' operator expects a vec2 for 2D drawing.");
        turtleState.x = pos[0];
        turtleState.y = pos[1];
        if (!isInitialized) {
            turtleState.heading = 0; // Only reset heading on first 'p'
            isInitialized = true;
        }
    });
    
    turtleDict['forward'] = createTurtleOp((stack) => {
        const step = stack.pop();
        if (typeof step !== 'number' || step < 0) throw new Error("forward expects a non-negative number for step size.");
        turtleState.stepSize = step;
    });

    turtleDict['move'] = createTurtleOp((stack) => {
        const arg = stack.pop();
        
        if (typeof arg === 'string' || typeof arg === 'symbol') {
            let commandString: string;
            if (typeof arg === 'symbol') {
                const key = Symbol.keyFor(arg);
                if (!key) throw new Error("Invalid symbol for move command.");
                const dictKey = `:${key}`;
                const def = options.dictionary[dictKey];
                if (def && 'body' in def && typeof def.body === 'string') {
                    commandString = def.body;
                } else {
                     throw new Error(`Turtle command expected string from symbol '${dictKey}', but found other type.`);
                }
            } else {
                commandString = arg;
            }
            parseTurtleString(commandString, turtleState);
        } else if (typeof arg === 'number') {
            const distance = arg;
            const angleRad = turtleState.heading * (Math.PI / 180);
            const newX = turtleState.x + distance * Math.sin(angleRad);
            const newY = turtleState.y + distance * Math.cos(angleRad);
            if (turtleState.penDown) turtleState.path.push({ x1: turtleState.x, y1: turtleState.y, x2: newX, y2: newY, color: turtleState.penColor, penSize: turtleState.penSize });
            turtleState.x = newX; turtleState.y = newY;
        } else {
            throw new Error('move expects a number or a command string.');
        }
    });

    turtleDict['left'] = createTurtleOp((stack) => {
        turtleState.heading = (turtleState.heading - (stack.pop() as number)) % 360;
    });

    turtleDict['right'] = createTurtleOp((stack) => {
        turtleState.heading = (turtleState.heading + (stack.pop() as number)) % 360;
    });

    turtleDict['penup'] = createTurtleOp(() => { turtleState.penDown = false; });
    turtleDict['pendown'] = createTurtleOp(() => { turtleState.penDown = true; });

    turtleDict['setxy'] = createTurtleOp((stack) => {
        const y = stack.pop(); const x = stack.pop();
        if (turtleState.penDown) turtleState.path.push({ x1: turtleState.x, y1: turtleState.y, x2: x, y2: y, color: turtleState.penColor, penSize: turtleState.penSize });
        turtleState.x = x; turtleState.y = y;
    });

    turtleDict['setheading'] = createTurtleOp((stack) => { turtleState.heading = (stack.pop() as number) % 360; });
    
    turtleDict['setpencolor'] = createTurtleOp((stack) => {
        const b = stack.pop(); const g = stack.pop(); const r = stack.pop();
        turtleState.penColor = [r/255.0, g/255.0, b/255.0];
    });

    turtleDict['setpensize'] = createTurtleOp((stack) => { turtleState.penSize = stack.pop() as number; });

    turtleDict['angle'] = createTurtleOp((stack) => {
        turtleState.angle = stack.pop() as number;
    });

    // The stack for turtle commands is internal to the quotation.
    const sandboxedStack: StackValue[] = [];
    const sandboxedOptions = { ...options, dictionary: turtleDict };
    yield* evaluate(quotation, sandboxedStack, sandboxedOptions);
    
    return turtleState;
}

export function* interpretAndBuild3DTurtle(quotation: StackValue[], options: YieldOptions, evaluate: EvaluateFn): Generator<any, Turtle3DObject, any> {
    const angleDef = options.dictionary[':angle'];
    const defaultAngle = (angleDef && 'body' in angleDef && typeof angleDef.body === 'number') ? angleDef.body : 25.0;

    const turtleState: Turtle3DObject = {
        type: 'turtle3d', pos: [0,0,0], dir: [0, 0, -1], up: [0, 1, 0],
        penDown: true, penColor: [1.0, 1.0, 1.0], penSize: 1.0, path: [], angle: defaultAngle, stepSize: 0.1,
    };
    
    const turtleDict: { [key: string]: Operator } = { ...options.dictionary };

    const createTurtleOp = (exec: (stack: StackValue[]) => void): Operator => ({
        definition: { exec: function*(s) { exec(s); }, description: '', effect: '' },
        examples: []
    });

    let isInitialized = false;
    turtleDict['p'] = createTurtleOp((stack) => {
        const pos = stack.pop();
        if (!isVec(pos, 3)) throw new Error("3D Turtle 'p' expects a vec3.");
        turtleState.pos = pos as [number, number, number];
        if (!isInitialized) {
            turtleState.dir = [0, 0, -1]; // Reset orientation
            turtleState.up = [0, 1, 0];
            isInitialized = true;
        }
    });
    
    turtleDict['forward'] = createTurtleOp((stack) => {
        const step = stack.pop();
        if (typeof step !== 'number' || step < 0) throw new Error("forward expects a non-negative number for step size.");
        turtleState.stepSize = step;
    });

    turtleDict['move'] = createTurtleOp((stack) => {
        const arg = stack.pop();
        
        if (typeof arg === 'string' || typeof arg === 'symbol') {
            let commandString: string;
            if (typeof arg === 'symbol') {
                const key = Symbol.keyFor(arg);
                if (!key) throw new Error("Invalid symbol for move command.");
                const dictKey = `:${key}`;
                const def = options.dictionary[dictKey];
                if (def && 'body' in def && typeof def.body === 'string') {
                    commandString = def.body;
                } else {
                     throw new Error(`Turtle command expected string from symbol '${dictKey}', but found other type.`);
                }
            } else {
                commandString = arg;
            }
            parseTurtleString(commandString, turtleState);
        } else if (typeof arg === 'number') {
            const distance = arg;
            const currentPos: [number, number, number] = [...turtleState.pos];
            const newPos: [number, number, number] = [
                currentPos[0] + turtleState.dir[0] * distance,
                currentPos[1] + turtleState.dir[1] * distance,
                currentPos[2] + turtleState.dir[2] * distance,
            ];
            if (turtleState.penDown) turtleState.path.push({ p1: currentPos, p2: newPos, color: turtleState.penColor, penSize: turtleState.penSize });
            turtleState.pos = newPos;
        } else {
             throw new Error('move expects a number or command string.');
        }
    });

    turtleDict['yaw'] = createTurtleOp((stack) => {
        const angleRad = (stack.pop() as number) * (Math.PI / 180);
        turtleState.dir = rotateVector(turtleState.dir, turtleState.up, -angleRad);
    });

    turtleDict['pitch'] = createTurtleOp((stack) => {
        const angleRad = (stack.pop() as number) * (Math.PI / 180);
        const rightVec = cross(turtleState.dir, turtleState.up);
        turtleState.dir = rotateVector(turtleState.dir, rightVec, angleRad);
        turtleState.up = rotateVector(turtleState.up, rightVec, angleRad);
    });
    
    turtleDict['roll'] = createTurtleOp((stack) => {
        const angleRad = (stack.pop() as number) * (Math.PI / 180);
        turtleState.up = rotateVector(turtleState.up, turtleState.dir, angleRad);
    });

    turtleDict['penup'] = createTurtleOp(() => { turtleState.penDown = false; });
    turtleDict['pendown'] = createTurtleOp(() => { turtleState.penDown = true; });
    turtleDict['setpencolor'] = createTurtleOp((stack) => {
        const b = stack.pop(); const g = stack.pop(); const r = stack.pop();
        turtleState.penColor = [r/255.0, g/255.0, b/255.0];
    });
    turtleDict['setpensize'] = createTurtleOp((stack) => { turtleState.penSize = stack.pop() as number; });
    
    turtleDict['angle'] = createTurtleOp((stack) => {
        turtleState.angle = stack.pop() as number;
    });

    const sandboxedStack: StackValue[] = [];
    const sandboxedOptions = { ...options, dictionary: turtleDict };
    yield* evaluate(quotation, sandboxedStack, sandboxedOptions);
    
    return turtleState;
}