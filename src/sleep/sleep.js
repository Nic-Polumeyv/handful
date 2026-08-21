/**
 * Resolves after `ms`; with `signal`, rejects with `signal.reason` the moment it aborts. Built from the platform's
 * own cancel tokens: `AbortSignal.timeout(ms)` is the clock, `AbortSignal.any` joins it with the caller's signal, and
 * the one `abort` event settles by which of the two fired (the caller's wins a tie). A signal already aborted rejects
 * at once.
 *
 * @param {number} ms
 * @param {AbortSignal} [signal]
 * @returns {Promise<void>}
 */
export function sleep(ms, signal) {
	return new Promise((resolve, reject) => {
		const s = signal ? AbortSignal.any([signal, AbortSignal.timeout(ms)]) : AbortSignal.timeout(ms);
		const settle = () => (signal?.aborted ? reject(signal.reason) : resolve());
		if (s.aborted) return settle();
		s.addEventListener('abort', settle, { once: true });
	});
}
