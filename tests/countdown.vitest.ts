import { flushSync, mount, unmount } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import CountdownFixture from './countdown.fixture.svelte';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
	vi.useRealTimers();
	document.body.innerHTML = '';
});

const render = () => {
	const target = document.createElement('div');
	document.body.append(target);
	const fixture = mount(CountdownFixture, { target });
	return { ...fixture, target, teardown: () => void unmount(fixture) };
};

describe('createCountdown', () => {
	test('reports the duration at once, then one less every second down to zero', () => {
		const { start, log, teardown } = render();
		start(3);
		flushSync();
		expect(log).toEqual([3]);

		for (let i = 0; i < 3; i++) {
			vi.advanceTimersByTime(1000);
			flushSync();
		}
		expect(log).toEqual([3, 2, 1, 0]);
		teardown();
	});

	test('a restart replaces the run in progress', () => {
		const { start, log, teardown } = render();
		start(10);
		flushSync();
		vi.advanceTimersByTime(1000);
		flushSync();
		start(2);
		flushSync();
		expect(log.at(-1)).toBe(2);

		vi.advanceTimersByTime(2000);
		flushSync();
		expect(log.at(-1)).toBe(0);
		teardown();
	});

	test('stop ends the run and reports zero', () => {
		const { start, stop, target, teardown } = render();
		start(30);
		flushSync();
		stop();
		flushSync();
		expect(target.textContent).toBe('0');

		vi.advanceTimersByTime(5000);
		flushSync();
		expect(target.textContent).toBe('0');
		teardown();
	});

	test('a throttled tab resumes on the seconds actually left, not the ones it missed', () => {
		const { start, target, teardown } = render();
		start(60);
		flushSync();
		expect(target.textContent).toBe('60');

		vi.setSystemTime(Date.now() + 30_000);
		vi.advanceTimersByTime(1000);
		flushSync();
		expect(target.textContent).toBe('29');
		teardown();
	});

	test('unmounting stops the run', () => {
		const { start, log, teardown } = render();
		start(5);
		flushSync();
		teardown();
		const seen = log.length;

		vi.advanceTimersByTime(5000);
		flushSync();
		expect(log.length).toBe(seen);
	});
});
