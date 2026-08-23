/**
 * @typedef {object} ScrollRevealOptions
 * @property {number} [x] Horizontal start offset in px — negative flies in from the left. Default 0.
 * @property {number} [y] Vertical start offset in px — positive flies in from below. Default 24.
 * @property {number} [scale] Start scale (1 = no scaling). Default 1.
 * @property {number} [blur] Start blur in px (0 = none). Default 0.
 * @property {number} [opacity] Start opacity. Default 0.
 * @property {number} [duration] Transition duration in ms. Default 800.
 * @property {number} [delay] Transition delay in ms — stagger siblings with `delay: i * 80`. Default 0.
 * @property {string} [easing] CSS easing function. Default ease-out-expo.
 * @property {number} [threshold] Fraction of the element that must be visible to trigger (0–1). Default 0.
 * @property {string} [rootMargin] IntersectionObserver rootMargin. Default shrinks the bottom by 10%.
 * @property {boolean} [once] Reveal once and stay, or re-hide and replay on leaving. Default true.
 */

/**
 * @param {ScrollRevealOptions} [options]
 * @returns {import('svelte/attachments').Attachment<HTMLElement>}
 */
export function scrollReveal(options = {}) {
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
