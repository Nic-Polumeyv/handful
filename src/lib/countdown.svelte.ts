/** A restartable whole-seconds countdown. `start(seconds)` reports `seconds` at once, then one less every second
 *  down to `0`, ending any run in progress; `stop()` ends the run and reports `0`. Each tick is scheduled to the
 *  next real second boundary and re-derived from the clock, so a throttled background tab resumes on the right
 *  number instead of lagging behind. Call during component init, like `$effect`. */
export function createCountdown() {
	let seconds = $state(0);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const stop = () => {
		clearTimeout(timer);
		seconds = 0;
	};

	const start = (duration: number) => {
		clearTimeout(timer);
		const deadline = Date.now() + Math.max(0, duration) * 1000;
		const tick = () => {
			seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
			if (seconds === 0) return;
			timer = setTimeout(tick, deadline - (seconds - 1) * 1000 - Date.now());
		};
		tick();
	};

	$effect(() => stop);

	return {
		start,
		stop,
		get seconds() {
			return seconds;
		},
	};
}
