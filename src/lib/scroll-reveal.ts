import type { Attachment } from 'svelte/attachments';

export interface ScrollRevealOptions {
	/** Horizontal start offset in px — negative flies in from the left, positive from the right. Default 0. */
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
	/** Transition delay in ms — use to stagger siblings (e.g. `delay: i * 80`). Default 0. */
	delay?: number;
	/** CSS easing function. Default ease-out-expo. */
	easing?: string;
	/** IntersectionObserver threshold (0–1): fraction of the element that must be visible to trigger. Default 0. */
	threshold?: number;
	/** IntersectionObserver rootMargin — default shrinks the bottom by 10% so it fires a touch before fully in view. */
	rootMargin?: string;
	/** Reveal once and stay (true) or re-hide and replay when it leaves the viewport (false). Default true. */
	once?: boolean;
}

/**
 * Scroll-reveal attachment — fades/flies an element in when it scrolls into view, via IntersectionObserver.
 *
 * Time-based: when the element enters, it plays its transition on its own clock (a clean fly-in), unlike a CSS
 * `view()` timeline which is scrubbed by scroll position. Pass options to shape each reveal.
 *
 * Honours `prefers-reduced-motion` (and environments without IntersectionObserver) by leaving the element
 * visible with no animation — so content is never hidden when it can't be revealed.
 *
 * @example
 *   <section {@attach scrollReveal()}>…</section>                     // fade + rise 24px
 *   <div {@attach scrollReveal({ x: -80, duration: 900 })}>…</div>    // slide in from the left
 *   <div {@attach scrollReveal({ y: 40, delay: i * 80 })}>…</div>     // staggered fly-up
 */
export function scrollReveal(options: ScrollRevealOptions = {}): Attachment<HTMLElement> {
	const {
		x = 0,
		y = 24,
		scale = 1,
		blur = 0,
		opacity = 0,
		duration = 800,
		delay = 0,
		easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
		threshold = 0,
		rootMargin = '0px 0px -10% 0px',
		once = true,
	} = options;

	return (node) => {
		if (typeof IntersectionObserver === 'undefined' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

		const startTransform =
			[x ? `translateX(${x}px)` : '', y ? `translateY(${y}px)` : '', scale !== 1 ? `scale(${scale})` : ''].filter(Boolean).join(' ') ||
			'none';

		const hide = () => {
			node.style.opacity = String(opacity);
			node.style.transform = startTransform;
			node.style.filter = blur ? `blur(${blur}px)` : '';
			node.style.willChange = 'opacity, transform';
		};
		const reveal = () => {
			const t = `${duration}ms ${easing} ${delay}ms`;
			node.style.transition = `opacity ${t}, transform ${t}, filter ${t}`;
			node.style.opacity = '1';
			node.style.transform = 'none';
			node.style.filter = '';
		};

		hide();
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						reveal();
						if (once) io.unobserve(entry.target);
					} else if (!once) {
						node.style.transition = 'none';
						hide();
					}
				}
			},
			{ threshold, rootMargin },
		);
		io.observe(node);
		return () => io.disconnect();
	};
}
