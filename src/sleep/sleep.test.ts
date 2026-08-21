import { describe, expect, it } from 'bun:test';
import { sleep } from './sleep.js';

describe('sleep', () => {
	it('resolves after ms', async () => {
		const started = Date.now();
		await sleep(120);
		expect(Date.now() - started).toBeGreaterThanOrEqual(115);
	});

	it('aborting mid-sleep rejects with the reason at once', async () => {
		const controller = new AbortController();
		const started = Date.now();
		setTimeout(() => controller.abort(new Error('stop')), 50);
		await expect(sleep(10_000, controller.signal)).rejects.toThrow('stop');
		expect(Date.now() - started).toBeLessThan(500);
	});

	it('a signal already aborted rejects before any timer runs', async () => {
		const signal = AbortSignal.abort(new Error('early'));
		await expect(sleep(10_000, signal)).rejects.toThrow('early');
	});

	it('a signal that never aborts leaves no listener behind', async () => {
		const controller = new AbortController();
		await sleep(10, controller.signal);
		controller.abort(); // nothing left to notify; must not throw or reject anything
	});
});
