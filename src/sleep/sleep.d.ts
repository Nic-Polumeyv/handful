/**
 * Resolves after `ms`. With `signal`, rejects with `signal.reason` the moment it aborts and clears the timer; a
 * signal already aborted rejects at once, before any timer is set.
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void>;
