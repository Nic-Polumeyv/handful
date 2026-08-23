# handful

A handful of Svelte utilities: attachments and reactive helpers, with nothing to depend on but Svelte itself.

```sh
bun add handful
```

Every export has its own subpath, so `import { draggable } from 'handful/draggable'` costs you only that file.

## createCountdown

```svelte
<script>
	import { createCountdown } from 'handful/countdown';

	const resend = createCountdown();
</script>

<button onclick={() => resend.start(60)} disabled={resend.seconds > 0}>
	{resend.seconds > 0 ? `Resend in ${resend.seconds}s` : 'Resend code'}
</button>
```

`start(seconds)` reports the value at once, then one less every second down to `0`, ending any run in progress.
`stop()` ends the run and reports `0`, and the owning component's teardown stops it too. Each tick is scheduled to
the next real second boundary and re-derived from the clock, so a tab that gets throttled in the background comes
back on the number that is actually left rather than the one it counted to.

## draggable

```svelte
<script>
	import { draggable } from 'handful/draggable';

	let position = $state({ x: 0, y: 0 });
</script>

<div {@attach draggable(() => position, (p) => (position = p))}>drag me</div>
```

Pointer-drag an element by reading and writing a position you own. Touch panning is suppressed for the duration,
and a second finger cannot hijack a drag in progress.

## errorVisibility

```svelte
<script>
	import { errorVisibility } from 'handful/error-visibility';

	let issues = $state([]);
	const error = errorVisibility(() => issues);
</script>

<input {@attach error.track} aria-invalid={error.show} />
{#if error.show}<span>{error.messages?.[0]?.message}</span>{/if}
```

Shows a field's errors until the owner starts typing, then hides them until the next submit re-evaluates.
Programmatic value changes (`isTrusted === false`) don't count as typing, so clearing a field after submit
doesn't hide an error nobody has read yet.

## isMobile

```svelte
<script>
	import { isMobile } from 'handful/is-mobile';
</script>

{#if isMobile.current}<Drawer />{:else}<Dialog />{/if}
```

A reactive `max-width` media query, defaulting to a 768px breakpoint; `new IsMobile(1024)` picks another. Use it
for behaviour, like swapping a component tree. For styling, reach for CSS: this is `false` during SSR, so a
JS-picked class flashes the desktop layout on phones.

## scrollReveal

```svelte
<section {@attach scrollReveal()}>fades and rises into view</section>
<div {@attach scrollReveal({ x: -80, duration: 900 })}>slides in from the left</div>
<div {@attach scrollReveal({ y: 40, delay: i * 80 })}>staggered</div>
```

Reveals an element when it scrolls into view, on its own clock rather than scrubbed by scroll position. Honours
`prefers-reduced-motion` and environments without `IntersectionObserver` by leaving the element visible, so
content is never hidden when it can't be revealed.

## License

MIT
