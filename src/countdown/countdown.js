/**
 * Whole seconds left until `untilMs`, one value per second, ending at `0`. The first value is yielded at once (`0`
 * when the instant has already passed), each next one right after the second boundary it describes, so a display
 * fed by `for await` never shows a stale number. Aborting `signal` ends the sequence without a final `0`; the
 * pending tick's timer is left to lapse on its own (at most a second) rather than woken early.
 *
 * @param {number} untilMs
 * @param {AbortSignal} [signal]
 * @returns {AsyncGenerator<number, void, undefined>}
 */
export async function* countdown(untilMs, signal) {
	while (!signal?.aborted) {
		const seconds = Math.max(0, Math.ceil((untilMs - Date.now()) / 1000));
		yield seconds;
		if (seconds === 0) return;
		await new Promise((resolve) => setTimeout(resolve, untilMs - (seconds - 1) * 1000 - Date.now()));
	}
}
