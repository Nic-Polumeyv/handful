export function createCountdown() {
	let seconds = $state(0);
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let timer;

	const stop = () => {
		clearTimeout(timer);
		seconds = 0;
	};

	/** @param {number} duration */
	const start = (duration) => {
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
