import { describe, expect, it } from 'bun:test';
import { countdown } from './countdown.js';

const after = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe('countdown', () => {
	it('reports the duration at once, then one less per second down to 0', async () => {
		const seen: number[] = [];
		const c = countdown((s) => seen.push(s));
		c.start(2);
		expect(seen).toEqual([2]);
		await after(2150);
		expect(seen).toEqual([2, 1, 0]);
	});

	it('start() during a run ends that run; nothing of it is reported again', async () => {
		const seen: number[] = [];
		const c = countdown((s) => seen.push(s));
		c.start(3);
		await after(1100); // 3, 2
		c.start(2); // 2 at once, then 1, 0
		await after(2150);
		expect(seen).toEqual([3, 2, 2, 1, 0]);
		c.stop();
	});

	it('stop() ends the run and reports 0', async () => {
		const seen: number[] = [];
		const c = countdown((s) => seen.push(s));
		c.start(10);
		await after(1100);
		c.stop();
		await after(1100);
		expect(seen).toEqual([10, 9, 0]);
	});

	it('a zero or already-elapsed duration reports a single 0', () => {
		const seen: number[] = [];
		countdown((s) => seen.push(s)).start(0);
		expect(seen).toEqual([0]);
	});
});
