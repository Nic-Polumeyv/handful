/**
 * A restartable whole-seconds countdown. `start(seconds)` reports `seconds` at once, then one less every second
 * down to `0`, ending any run in progress; `stop()` ends the run and reports `0`. Ticks ride `setInterval`, so a
 * background tab (where browsers throttle timers) can lag wall-clock time.
 */
export function countdown(onTick: (seconds: number) => void): { start(seconds: number): void; stop(): void };
