import { clear, get, KEYS, save } from './local-storage';

beforeEach(() => {
  localStorage.clear();
});

describe('save / get', () => {
  it('stores and retrieves a number', () => {
    save(KEYS.MULTIPLIER, 110);
    expect(get<number>(KEYS.MULTIPLIER)).toBe(110);
  });

  it('stores and retrieves a string', () => {
    save(KEYS.START_DATE, '2024-01-15T00:00:00+00:00');
    expect(get<string>(KEYS.START_DATE)).toBe('2024-01-15T00:00:00+00:00');
  });

  it('stores and retrieves an object', () => {
    const obj = { foo: 'bar', count: 42 };
    save(KEYS.MULTIPLIER, obj);
    expect(get(KEYS.MULTIPLIER)).toEqual(obj);
  });

  it('returns undefined for a key that has not been set', () => {
    expect(get(KEYS.MULTIPLIER)).toBeUndefined();
  });

  it('overwrites an existing value', () => {
    save(KEYS.MULTIPLIER, 100);
    save(KEYS.MULTIPLIER, 150);
    expect(get<number>(KEYS.MULTIPLIER)).toBe(150);
  });
});

describe('clear', () => {
  it('removes a stored value', () => {
    save(KEYS.MULTIPLIER, 100);
    clear(KEYS.MULTIPLIER);
    expect(get(KEYS.MULTIPLIER)).toBeUndefined();
  });

  it('does not throw when clearing a key that was never set', () => {
    expect(() => clear(KEYS.START_DATE)).not.toThrow();
  });

  it('only removes the specified key', () => {
    save(KEYS.MULTIPLIER, 100);
    save(KEYS.START_DATE, '2024-01-01');
    clear(KEYS.MULTIPLIER);
    expect(get(KEYS.MULTIPLIER)).toBeUndefined();
    expect(get<string>(KEYS.START_DATE)).toBe('2024-01-01');
  });
});
