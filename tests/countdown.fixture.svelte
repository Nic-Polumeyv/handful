<script lang="ts">
	import { createCountdown } from '../src/countdown.svelte.js';

	const cooldown = createCountdown();
	export const { start, stop } = cooldown;
	export const log: number[] = [];
	$effect(() => {
		log.push(cooldown.seconds);
	});
</script>

<output>{cooldown.seconds}</output>
