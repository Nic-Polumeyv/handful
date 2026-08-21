/**
 * Whole seconds left until `untilMs`, one value per second, ending at `0`. The first value is yielded at once (`0`
 * when the instant has already passed), each next one right after the second boundary it describes, so a display
 * fed by `for await` never shows a stale number. Aborting `signal` ends the sequence without a final `0`; the
 * pending tick's timer is left to lapse on its own (at most a second) rather than woken early.
 */
export function countdown(untilMs: number, signal?: AbortSignal): AsyncGenerator<number, void, undefined>;
