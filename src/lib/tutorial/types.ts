export interface TutorialCell {
    name: string;
    description: string;
    example: string | string[];
    replCode?: string | string[];
    expected?: any[];
// FIX: Update `assert` signature to be compatible with TestCase and add `async` property for async tests.
    assert?: (stack: any[], dictionary?: { [key:string]: any }) => boolean;
    expectedDescription?: string;
    expectedError?: string;
    async?: {
        duration: number; // ms to wait
        assert: (stack: any[], dictionary: { [key: string]: any }, asyncOutput: string[]) => boolean;
        assertDescription?: string;
    };
}

export interface TutorialSection {
    name: string;
    description: string;
    cells: TutorialCell[];
}