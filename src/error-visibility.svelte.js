import { on } from 'svelte/events';

/**
 * @template T
 * @param {() => T[] | undefined} issues
 */
export function errorVisibility(issues) {
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
		dismiss: () => (dirty = true),
		// Only real keystrokes dirty the field. Libraries dispatch a synthetic `input` (`isTrusted === false`) when
		// the value changes programmatically, e.g. clearing after submit — ignore those so a just-shown error isn't
		// immediately hidden again.
		track: /** @type {import('svelte/attachments').Attachment} */ (
			(el) =>
				on(el, 'input', (e) => {
					if (e.isTrusted) dirty = true;
				})
		),
	};
}
