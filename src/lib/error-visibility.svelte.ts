import { on } from 'svelte/events';
import type { Attachment } from 'svelte/attachments';

export function errorVisibility<T>(issues: () => T[] | undefined) {
	let dirty = $state(false);
	const show = $derived(!dirty && !!issues()?.length);
	return {
		get show() {
			return show;
		},
		get messages() {
			return show ? issues() : undefined;
		},
		reset: () => (dirty = false),
		/** Hide the current error (e.g. after a resend) until the next submit re-evaluates. */
		dismiss: () => (dirty = true),
		// Only real keystrokes dirty the field. Libraries like bits-ui dispatch a synthetic `input`
		// (`isTrusted === false`) when the value changes programmatically (e.g. clearing after submit) —
		// ignore those so a just-shown error isn't immediately hidden again.
		track: ((el) => on(el, 'input', (e) => e.isTrusted && (dirty = true))) satisfies Attachment,
	};
}
