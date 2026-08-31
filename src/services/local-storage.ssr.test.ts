/**
 * @jest-environment node
 *
 * Runs under Jest's node environment (no jsdom) so `window` is genuinely
 * absent, exercising the real SSR guards in local-storage.ts rather than
 * faking `typeof window` inside jsdom (where `window` is a non-configurable
 * getter on `global` and can't be redefined).
 */
import { clear, get, KEYS, save } from './local-storage';

describe('SSR (no window)', () => {
  it('save does not throw when there is no window', () => {
    expect(() => save(KEYS.MULTIPLIER, 100)).not.toThrow();
  });

  it('get returns undefined when there is no window', () => {
    expect(get(KEYS.MULTIPLIER)).toBeUndefined();
  });

  it('clear does not throw when there is no window', () => {
    expect(() => clear(KEYS.MULTIPLIER)).not.toThrow();
  });
});
