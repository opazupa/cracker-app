import confetti from 'canvas-confetti';
import { differenceInDays } from 'date-fns';

import { CONVERSIONS } from '../meals';
import { Food, Meal, ProgramDay } from '../types';

// TODO quick and dirty to start the count
const START_DATE = new Date(2023, 3, 10); // 10.4.2023

export const getCurrentDay = (): ProgramDay => {
  const day = (differenceInDays(new Date(), START_DATE) + 1) % 5 || 5;

  if (day <= 3) return '1-3';
  else if (day === 4) return '4';
  else if (day === 5) return '5';

  throw new Error('Current date can`t be calculated :(');
};

export const celebrate = () => confetti({ origin: { x: 0.5, y: 1 } });

const roundToNearest5 = (amount: number) => Math.round(amount / 5) * 5;

export const calculateAmount = (
  food: Food,
  mealMultiplierPercentage: number,
  day: ProgramDay,
) => {
  const getDayMultiplier = () => {
    if (day === '4') return food.day4x || 1;
    else if (day === '5') return food.day5x || 1;
    return 1;
  };

  if (!food.amount) return null;
  return roundToNearest5(
    food.amount * (mealMultiplierPercentage / 100) * getDayMultiplier(),
  );
};

export const isMain = (meal: Meal) =>
  ['lunch', 'snack', 'dinner'].includes(meal.group);

export const mealChecked = (meal: Meal, checked: Food[]): boolean => {
  if (meal.type === 'one-of') {
    return (
      (!meal.components.some((c) => c.category === 'carbs') ||
        checked.filter((c) => c.category === 'carbs').length === 1) &&
      (!meal.components.some((c) => c.category === 'proteins') ||
        checked.filter((c) => c.category === 'proteins').length === 1) &&
      (!meal.components.some((c) => c.category === 'fats') ||
        checked.filter((c) => c.category === 'fats').length === 1)
    );
  } else {
    return checked.length === meal.components.length;
  }
};

export const convert = (
  amount: number | null | undefined,
  from: string,
  to: string,
) => {
  const flatMap = {
    ...CONVERSIONS.carbs,
    ...CONVERSIONS.fats,
    ...CONVERSIONS.proteins,
  };

  if (!amount) return undefined;
  if (!flatMap[from] || !flatMap[to]) return undefined;

  return roundToNearest5((amount / flatMap[from]) * flatMap[to]);
};
