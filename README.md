# handful

A handful of JavaScript primitives. No dependencies, no build step, plain ES modules with hand-written types; runs in
the browser, Bun, Node, Deno, and workers.

```sh
bun add handful
```

## sleep

```js
import { sleep } from 'handful';

await sleep(250);
await sleep(10_000, signal); // rejects with signal.reason the moment it aborts; the timer is cleared
```

## countdown

```js
import { countdown } from 'handful';

for await (const seconds of countdown(Date.now() + 60_000, signal)) render(seconds);
// 60, 59, ... 0, each yielded right after the second boundary it describes
```

Whole seconds left until an instant, one value per second, ending at `0`. The first value arrives at once; each next one
lands right after its boundary, so a display fed by `for await` never shows a stale number. Aborting `signal` ends the
sequence without a final `0`.

Framework adapters stay in the framework. In Svelte 5, a restartable countdown is a dozen lines around it:

```js
export function createCountdown() {
	let seconds = $state(0);
	let run;
	const stop = () => {
		run?.abort();
		seconds = 0;
	};
	const start = (durationS) => {
		stop();
		seconds = Math.ceil(durationS);
		run = new AbortController();
		void (async () => {
			for await (const s of countdown(Date.now() + durationS * 1000, run.signal)) seconds = s;
		})();
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
```

## License

MIT
