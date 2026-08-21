import { describe, expect, it } from 'bun:test';
import { countdown } from './countdown.js';

describe('countdown', () => {
	it('yields the remaining whole seconds down to 0, each right after its boundary', async () => {
		const started = Date.now();
		const seen: { value: number; at: number }[] = [];
		for await (const value of countdown(started + 1200)) seen.push({ value, at: Date.now() - started });
		expect(seen.map((s) => s.value)).toEqual([2, 1, 0]);
		expect(seen[1]!.at).toBeGreaterThanOrEqual(200);
		expect(seen[1]!.at).toBeLessThan(700);
		expect(seen[2]!.at).toBeGreaterThanOrEqual(1200);
	});

	it('an instant already passed yields a single 0', async () => {
		expect(await Array.fromAsync(countdown(Date.now() - 5))).toEqual([0]);
	});

	it('aborting ends the sequence without reaching 0', async () => {
		const controller = new AbortController();
		setTimeout(() => controller.abort(), 150);
		expect(await Array.fromAsync(countdown(Date.now() + 10_000, controller.signal))).toEqual([10]);
	});

	it('a signal aborted up front yields nothing', async () => {
		expect(await Array.fromAsync(countdown(Date.now() + 10_000, AbortSignal.abort()))).toEqual([]);
	});
});
