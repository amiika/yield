export interface TutorialCell {
    name: string;
    description: string;
    example: string | string[];
    replCode?: string | string[];
    expected?: any[];
    assert?: (stack: any[]) => boolean;
    expectedDescription?: string;
    expectedError?: string;
}

export interface TutorialSection {
    name: string;
    description: string;
    cells: TutorialCell[];
}