/**
 * A restartable whole-seconds countdown. `start(seconds)` reports the value at once, then one less every second
 * down to `0`, ending any run in progress; `stop()` ends the run and reports `0`, as does the owning component's
 * teardown. Each tick is scheduled to the next real second boundary and re-derived from the clock, so a throttled
 * background tab resumes on the seconds actually left. Call during component init, like `$effect`.
 */
export function createCountdown(): {
	start(duration: number): void;
	stop(): void;
	readonly seconds: number;
};
