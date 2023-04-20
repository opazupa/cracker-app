import { get, KEYS, save } from './local-storage';

export const saveMealMultiplier = (multiplier: number) => {
  return save(KEYS.MULTIPLIER, multiplier);
};

export const getMealMultiplier = () => {
  return get<number>(KEYS.MULTIPLIER);
};
