const PREFIX = 'cracker.app';

export const KEYS = {
  MULTIPLIER: `${PREFIX}.multiplier`,
  START_DATE: `${PREFIX}.start_date`,
} as const;

export type Key = typeof KEYS[keyof typeof KEYS];

export const save = (key: Key, value: unknown) => {
  // Next.js stuff for SSR
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const get = <T>(key: Key): T | undefined => {
  // Next.js stuff for SSR
  if (typeof window === 'undefined') return;

  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }
  return undefined;
};

export const clear = (key: Key) => {
  // Next.js stuff for SSR
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
