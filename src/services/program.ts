import { formatISO, parseISO } from 'date-fns';

import { get, KEYS, save } from './local-storage';

const todayISO = () => new Date().toISOString().slice(0, 10);

type CompletedMealsStore = { date: string; names: string[] };

export const saveMealMultiplier = (multiplier: number) => {
  save(KEYS.MULTIPLIER, multiplier);
};

export const getMealMultiplier = () => {
  return get<number>(KEYS.MULTIPLIER);
};

export const saveStartDate = (dateString: string) => {
  save(KEYS.START_DATE, formatISO(new Date(dateString)));
};

export const saveCompletedMeals = (names: string[]) =>
  save(KEYS.COMPLETED_MEALS, { date: todayISO(), names });

export const getCompletedMeals = (): string[] => {
  const stored = get<CompletedMealsStore>(KEYS.COMPLETED_MEALS);
  if (!stored || stored.date !== todayISO()) return [];
  return stored.names;
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
