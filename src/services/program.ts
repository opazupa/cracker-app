import { formatISO, parseISO } from 'date-fns';

import { get, KEYS, save } from './local-storage';

export const saveMealMultiplier = (multiplier: number) => {
  save(KEYS.MULTIPLIER, multiplier);
};

export const getMealMultiplier = () => {
  return get<number>(KEYS.MULTIPLIER);
};

export const saveStartDate = (dateString: string) => {
  save(KEYS.START_DATE, formatISO(new Date(dateString)));
};

export const getStartDate = (): Date => {
  let dateString = get<string>(KEYS.START_DATE);

  // If no value has been saved yet, save this date
  if (!dateString) {
    dateString = formatISO(new Date());
    saveStartDate(dateString);
  }
  return parseISO(dateString);
};
