/**
 * Resolves after `ms`. With `signal`, rejects with `signal.reason` the moment it aborts and clears the timer; a
 * signal already aborted rejects at once, before any timer is set.
 *
 * @param {number} ms
 * @param {AbortSignal} [signal]
 * @returns {Promise<void>}
 */
export function sleep(ms, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) return reject(signal.reason);
		const id = setTimeout(() => {
			signal?.removeEventListener('abort', abort);
			resolve();
		}, ms);
		function abort() {
			clearTimeout(id);
			reject(signal?.reason);
		}
		signal?.addEventListener('abort', abort, { once: true });
	});
}
