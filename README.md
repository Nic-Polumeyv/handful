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

const resend = countdown((seconds) => render(seconds)); // 60, 59, … 0
resend.start(60);
resend.stop(); // ends the run, reports 0
```

A restartable whole-seconds countdown: `start(seconds)` reports the value at once, then one less every second down
to `0`, ending any run in progress. Ticks ride `setInterval`, so a background tab can lag wall-clock time.

In Svelte 5 the wrapper is the reactive sink plus teardown:

```js
export function createCountdown() {
	let seconds = $state(0);
	const c = countdown((s) => (seconds = s));
	$effect(() => c.stop);
	return {
		start: c.start,
		stop: c.stop,
		get seconds() {
			return seconds;
		},
	};
}
```

## License

MIT
