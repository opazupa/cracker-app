import confetti from 'canvas-confetti';
import { differenceInDays, getHours } from 'date-fns';

import { getConversions, getStartDate } from '../services';
import { Food, Meal, ProgramDay, TimeOfTheDay } from '../types';

/**
 * Get current program day
 */
export const getCurrentDay = (): ProgramDay => {
  const startDate = getStartDate();

  const days = (differenceInDays(new Date(), startDate) + 1) % 5 || 5;

  if (days <= 3) return '1-3';
  else if (days === 4) return '4';
  else if (days === 5) return '5';

  throw new Error('Current date can`t be calculated :(');
};

/**
 * Get meal for current time of the day
 */
export const getMealForTimeOfTheDay = (): TimeOfTheDay => {
  const hours = getHours(new Date());
  if (hours < 10) return TimeOfTheDay.Morning;
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
  const conversions = getConversions();
  const flatMap = {
    ...conversions.carbs,
    ...conversions.fats,
    ...conversions.proteins,
  };

  if (!amount) return undefined;
  if (!flatMap[from] || !flatMap[to]) return undefined;

  return roundToNearest5((amount / flatMap[from]) * flatMap[to]);
};
