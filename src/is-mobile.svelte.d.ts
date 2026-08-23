import { MediaQuery } from 'svelte/reactivity';

/**
 * A reactive `max-width` query, 768px unless you pass another breakpoint. Use it for behaviour, like swapping a
 * component tree; for styling use CSS, because this is `false` during SSR and a JS-picked class flashes the
 * desktop layout on phones.
 */
export class IsMobile extends MediaQuery {
	constructor(breakpoint?: number);
}

/** `IsMobile` at the default breakpoint, shared by every caller. */
export const isMobile: IsMobile;
