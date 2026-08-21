/**
 * Resolves after `ms`; with `signal`, rejects with `signal.reason` the moment it aborts. Built from the platform's
 * own cancel tokens (`AbortSignal.timeout` + `AbortSignal.any`). A signal already aborted rejects at once.
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void>;
