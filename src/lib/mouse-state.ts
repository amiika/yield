

// This file exports singleton objects to hold the global mouse state.
// This allows various parts of the application (UI, interpreter, audio engine)
// to access the latest mouse coordinates without complex prop drilling or context.
export const mouseState = {
    x: 0,
    y: 0,
};

export const mouseDownState = {
    x: 0,
    y: 0,
};

export const isMouseDownState = {
    down: false,
};
