
// --- Shared Types for the Yield Interpreter ---

// The basic types that can exist on the stack
export type StackValue = any;

// Definition for a single test case
export interface TestCase {
    code?: string | string[];
    replCode?: string | string[];
    assert?: (stack: StackValue[], dictionary?: { [key:string]: any }) => boolean;
    assertString?: string;
    expected?: StackValue[];
    expectedType?: string;
    expectedDescription?: string;
    expectedError?: string;
    async?: {
        duration: number; // ms to wait
        assert: (stack: StackValue[], dictionary: { [key: string]: any }, asyncOutput: string[]) => boolean;
        assertDescription?: string;
    };
}

// The core definition of an operator's implementation and metadata
export interface OperatorDefinition {
    exec: (stack: StackValue[], options: YieldOptions, evaluate: EvaluateFn, dictionary: { [key: string]: any }) => Generator;
    description: string;
    effect: string;
}

// The complete operator object, including its tests
export interface Operator {
    definition: OperatorDefinition;
    examples: TestCase[];
    keywords?: string[];
}

// A category of operators
export interface Category {
    name: string;
    description: string;
    definitions: { [key: string]: Operator };
}

// Snapshot of the interpreter state for history management
export interface StateSnapshot {
    stack: StackValue[];
    userDictionary: { [key: string]: any };
}

// Interface for the history manager to break circular dependencies
export interface IHistoryManager {
    add(snapshot: StateSnapshot): void;
    undo(): StateSnapshot | null;
    redo(): StateSnapshot | null;
    clear(): void;
    createSnapshot(stack: StackValue[], dictionary: { [key: string]: any }): StateSnapshot;
}

// Options passed to the interpreter during a run
export interface YieldOptions {
    isDebug?: boolean;
    onToken?: (token: StackValue, stack: StackValue[], remainingProgram: StackValue[], depth: number) => void;
    stopSignal?: { stopped: boolean };
    pauseSignal?: { paused: boolean };
    onStep?: (stack: StackValue[]) => void;
    getDelay?: () => number;
    delay?: number;
    setResume?: (resumeFn: () => void) => void;
    onOutput?: (output: string) => void;
    onAsyncOutput?: (output: string, isError?: boolean) => void; // For background tasks
    historyManager?: IHistoryManager;
    commandHistory?: string[];
    parse?: (code: string) => StackValue[];
    run?: (program: StackValue[], stack: StackValue[], options?: YieldOptions) => Promise<void>;
    onVoiceCreated?: (voiceId: string) => void;
    onVoiceDestroyed?: (voiceId: string) => void;
    sourceId?: string;
    mainStack?: StackValue[];
    builtInKeys?: Set<string>;
    dictionary?: { [key: string]: any };
}

// Type for the evaluate function, used for dependency injection
export type EvaluateFn = (program: StackValue | StackValue[], stack: StackValue[], options?: YieldOptions, depth?: number) => Generator;

// FIX: Add types for shader and raymarching operators.
export interface ShaderObject {
    type: 'shader';
    code: string;
}

export interface ColorObject {
    type: 'color';
    expression: string;
}

export interface ImageMaterialObject {
    type: 'image_material';
    quotation: any[];
}

export interface GLSLExpression {
    type: 'glsl_expression';
    code: string;
    returnType?: 'float' | 'vec2' | 'vec3' | 'vec4' | 'mat3' | 'mat4';
}

export interface MarchingObject {
    op: string;
    type: 'geometry' | 'combinator' | 'transformation' | 'alteration';
    children: MarchingObject[];
    props: any;
    material?: any;
}

export interface LightObject {
    type: 'light';
    pos: any;
    color: any;
    attenuation: any;
}

export interface SceneObject {
    type: 'scene';
    graph: MarchingObject;
    lights: LightObject[];
    background?: any;
    camera?: {
        pos: any;
        target: any;
        speed: number;
    };
    fog?: {
        strength: number;
        color: any;
    };
    shadow?: {
        diffuseness: number;
    };
    post?: any[];
    renderParams?: {
        iterations?: number;
        near?: number;
        far?: number;
    };
}

export interface LiveLoopDef {
    type: 'live-loop-def';
    quotation: StackValue[];
    beatValue: number;
    sourceCode?: StackValue[];
}

export interface UntilDef {
    type: 'until-def';
    initialValue: StackValue;
    quotation: StackValue[];
    intervalBeats: number;
    endBeats: number;
    isTemporary?: boolean;
    sourceCode?: StackValue[];
}

export interface UntilProcess {
    type: 'until-process';
    quotation: StackValue[];
    intervalBeats: number;
    endBeats: number;
    results: StackValue[];
    isTemporary: boolean;
}
