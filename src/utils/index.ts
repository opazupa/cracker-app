import confetti from 'canvas-confetti';
import { differenceInDays, getHours } from 'date-fns';

import { CONVERSIONS } from '../meals';
import { Food, Meal, ProgramDay, TimeOfTheDay } from '../types';

// TODO quick and dirty to start the count for program
const START_DATE = new Date(2023, 3, 10); // 10.4.2023

/**
 * Get current program day
 */
export const getCurrentDay = (): ProgramDay => {
  const day = (differenceInDays(new Date(), START_DATE) + 1) % 5 || 5;

  if (day <= 3) return '1-3';
  else if (day === 4) return '4';
  else if (day === 5) return '5';

  throw new Error('Current date can`t be calculated :(');
};

/**
 * Get meal for current time of the day
 */
export const getMealForTimeOfTheDay = (): TimeOfTheDay => {
  const hours = getHours(new Date());
  if (hours < 11) return TimeOfTheDay.Morning;
  if (hours < 20) return TimeOfTheDay.Afternoon;
  return TimeOfTheDay.Evening;
};

// Celebrate with confetti
export const celebrate = () => confetti({ origin: { x: 0.5, y: 1 } });

// Round to nearest 5
export const roundToNearest5 = (amount: number) => Math.round(amount / 5) * 5;

/**
 * Check if meal is checked by type
 */
export const mealChecked = (meal: Meal, checked: Food[]): boolean => {
  // One of each types checked if category has items
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
    // Or all needs to be cheked
    return checked.length === meal.components.length;
  }
};

/**
 * Convert amount of food from on to another
 */
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
