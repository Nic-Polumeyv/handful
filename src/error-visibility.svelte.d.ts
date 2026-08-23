import type { Attachment } from 'svelte/attachments';

/**
 * Shows a field's issues until the owner starts typing, then hides them until the next submit re-evaluates.
 * `reset()` un-hides for that next submit; `dismiss()` hides the current error, e.g. after a resend. Attach
 * `track` to the input.
 */
export function errorVisibility<T>(issues: () => T[] | undefined): {
	readonly show: boolean;
	readonly messages: T[] | undefined;
	reset(): void;
	dismiss(): void;
	track: Attachment;
};
