export type Node = {
    id: string;
    name: string;
}

export type Link = {
    source: string,
    target: string
}

export type Scenario = {
    id: string;
    name: string;
    children: string[];
    isUnlocked: boolean;
    isCompleted: boolean;
    blockedBy?: string[];
}

export type Scenarios = {
    byId: { [key: string]: Scenario },
    allIds: number[]
};