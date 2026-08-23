import type { Attachment } from 'svelte/attachments';

/**
 * Pointer-drag an element by reading and writing a position you own. Touch panning is suppressed for the
 * duration, and a second finger cannot hijack a drag in progress.
 */
export function draggable(get: () => { x: number; y: number }, set: (position: { x: number; y: number }) => void): Attachment<HTMLElement>;
