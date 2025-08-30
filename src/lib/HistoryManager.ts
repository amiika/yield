import type { StackValue, StateSnapshot, IHistoryManager } from './types';
import { deepEqual, deepClone } from './utils';

export class HistoryManager implements IHistoryManager {
    private history: StateSnapshot[] = [];
    private currentIndex = -1;
    private builtInKeys: Set<string>;

    constructor(builtInKeys: Set<string>) {
        this.builtInKeys = builtInKeys;
    }

    private getUserDictionary(dictionary: { [key: string]: any }): { [key: string]: any } {
        const userDict = {};
        for (const key in dictionary) {
            if (!this.builtInKeys.has(key)) {
                userDict[key] = dictionary[key];
            }
        }
        return userDict;
    }
    
    createSnapshot(stack: StackValue[], dictionary: { [key: string]: any }): StateSnapshot {
        return {
            stack: deepClone(stack),
            userDictionary: deepClone(this.getUserDictionary(dictionary))
        };
    }

    add(snapshot: StateSnapshot) {
        // Don't add if it's the same as the current state
        if (this.currentIndex > -1 && deepEqual(this.history[this.currentIndex], snapshot)) {
            return;
        }

        // If we are in the middle of history, truncate the future
        if (this.currentIndex < this.history.length - 1) {
            this.history.splice(this.currentIndex + 1);
        }

        this.history.push(snapshot);
        this.currentIndex = this.history.length - 1;
    }

    undo(): StateSnapshot | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return deepClone(this.history[this.currentIndex]);
        }
        return null;
    }

    redo(): StateSnapshot | null {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return deepClone(this.history[this.currentIndex]);
        }
        return null;
    }
    
    clear() {
        this.history = [];
        this.currentIndex = -1;
    }
}