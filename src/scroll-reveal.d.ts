import type { Attachment } from 'svelte/attachments';

export interface ScrollRevealOptions {
	/** Horizontal start offset in px — negative flies in from the left. Default 0. */
	x?: number;
	/** Vertical start offset in px — positive flies in from below. Default 24. */
	y?: number;
	/** Start scale (1 = no scaling). Default 1. */
	scale?: number;
	/** Start blur in px (0 = none). Default 0. */
	blur?: number;
	/** Start opacity. Default 0. */
	opacity?: number;
	/** Transition duration in ms. Default 800. */
	duration?: number;
	/** Transition delay in ms — stagger siblings with `delay: i * 80`. Default 0. */
	delay?: number;
	/** CSS easing function. Default ease-out-expo. */
	easing?: string;
	/** Fraction of the element that must be visible to trigger (0–1). Default 0. */
	threshold?: number;
	/** IntersectionObserver rootMargin. Default shrinks the bottom by 10%. */
	rootMargin?: string;
	/** Reveal once and stay, or re-hide and replay on leaving. Default true. */
	once?: boolean;
}

/**
 * Reveals an element when it scrolls into view, on its own clock rather than scrubbed by scroll position.
 * Honours `prefers-reduced-motion` and environments without `IntersectionObserver` by leaving the element
 * visible, so content is never hidden when it can't be revealed.
 */
export function scrollReveal(options?: ScrollRevealOptions): Attachment<HTMLElement>;
