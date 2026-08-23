import { MediaQuery } from 'svelte/reactivity';

const DEFAULT_MOBILE_BREAKPOINT = 768;

export class IsMobile extends MediaQuery {
	/** @param {number} [breakpoint] */
	constructor(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
		super(`max-width: ${breakpoint - 1}px`);
	}
}

export const isMobile = new IsMobile();
