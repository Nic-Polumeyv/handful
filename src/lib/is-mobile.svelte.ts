import { MediaQuery } from 'svelte/reactivity';

// Mirrors Tailwind's `md` breakpoint — keep in sync if the theme ever overrides it.
// Use this for BEHAVIOR (component-tree swaps, floating-ui side, event handlers);
// for styling, use max-md:/md: classes instead — MediaQuery is false during SSR,
// so JS-picked classes flash desktop-first on phones.
const DEFAULT_MOBILE_BREAKPOINT = 768;

export class IsMobile extends MediaQuery {
	constructor(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) {
		super(`max-width: ${breakpoint - 1}px`);
	}
}

export const isMobile = new IsMobile();
