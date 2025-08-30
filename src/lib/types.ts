// --- Shared Types for the Yield Interpreter ---

// The basic types that can exist on the stack
export type StackValue = any;

// Definition for a single test case
export interface TestCase {
    code: string | string[];
    assert?: (stack: StackValue[]) => boolean;
    expected?: StackValue[];
    expectedType?: string;
    expectedDescription?: string;
}

// The core definition of an operator's implementation and metadata
export interface OperatorDefinition {
    exec: (stack: StackValue[], options: YieldOptions, evaluate: EvaluateFn, dictionary: { [key: string]: any }) => Generator;
    description: string;
    example: string;
    effect: string;
}

// The complete operator object, including its tests
export interface Operator {
    definition: OperatorDefinition;
    testCases: TestCase[];
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
    onToken?: (token: StackValue, stack: StackValue[]) => void;
    stopSignal?: { stopped: boolean };
    pauseSignal?: { paused: boolean };
    onStep?: (stack: StackValue[]) => void;
    getDelay?: () => number;
    delay?: number;
    setResume?: (resumeFn: () => void) => void;
    onOutput?: (output: string) => void;
    historyManager?: IHistoryManager;
    commandHistory?: string[];
    parse?: (code: string) => StackValue[];
    onVoiceCreated?: (voiceId: string) => void;
    onVoiceDestroyed?: (voiceId: string) => void;
    sourceId?: string;
}

// Type for the evaluate function, used for dependency injection
export type EvaluateFn = (program: StackValue | StackValue[], stack: StackValue[], options?: YieldOptions) => Generator;