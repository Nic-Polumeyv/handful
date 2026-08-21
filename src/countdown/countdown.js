/**
 * A restartable whole-seconds countdown. `start(seconds)` reports `seconds` at once, then one less every second
 * down to `0`, ending any run in progress; `stop()` ends the run and reports `0`. Ticks ride `setInterval`, so a
 * background tab (where browsers throttle timers) can lag wall-clock time.
 *
 * @param {(seconds: number) => void} onTick
 * @returns {{ start(seconds: number): void; stop(): void }}
 */
export function countdown(onTick) {
	/** @type {ReturnType<typeof setInterval> | undefined} */
	let timer;
	let left = 0;
	return {
		start(seconds) {
			clearInterval(timer);
			left = Math.max(0, Math.ceil(seconds));
			onTick(left);
			if (left > 0)
				timer = setInterval(() => {
					onTick(--left);
					if (left <= 0) clearInterval(timer);
				}, 1000);
		},
		stop() {
			clearInterval(timer);
			left = 0;
			onTick(0);
		},
	};
}
