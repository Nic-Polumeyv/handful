import { getAbortSignal } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { on } from 'svelte/events';

export function draggable(get: () => { x: number; y: number }, set: (p: { x: number; y: number }) => void): Attachment<HTMLElement> {
	return (node) => {
		const signal = getAbortSignal();
		// Without this, touch browsers claim the gesture for panning and fire `pointercancel` on the first move.
		const prevTouchAction = node.style.touchAction;
		node.style.touchAction = 'none';
		let active: number | null = null;

		on(
			node,
			'pointerdown',
			(e) => {
				if (e.button !== 0 || active !== null) return;
				const { x, y } = get();
				const dx = e.clientX - x;
				const dy = e.clientY - y;
				node.setPointerCapture(e.pointerId);
				active = e.pointerId;

				const drag = new AbortController();
				const opts = { signal: AbortSignal.any([signal, drag.signal]) };
				// Touch pointers get implicit capture to their hit-test target, so a second finger's moves and its
				// capture release both land on `node` too. Both handlers must ignore anything but the active pointer.
				on(
					node,
					'pointermove',
					(e) => {
						if (e.pointerId === active) set({ x: e.clientX - dx, y: e.clientY - dy });
					},
					opts,
				);
				// The one terminator that also covers node removal and browser-forced release, which pointerup/cancel miss.
				on(
					node,
					'lostpointercapture',
					(e) => {
						if (e.pointerId !== active) return;
						active = null;
						drag.abort();
					},
					opts,
				);
			},
			{ signal },
		);

		return () => (node.style.touchAction = prevTouchAction);
	};
}
