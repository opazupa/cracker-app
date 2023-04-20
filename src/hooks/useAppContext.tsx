import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getMealMultiplier, saveMealMultiplier } from '../services';
import { Food, ProgramDay } from '../types';
import { getCurrentDay, roundToNearest5 } from '../utils';

export const PROGRAM_DAYS: ProgramDay[] = ['1-3', '4', '5'];
interface State {
  programDay: ProgramDay;
  mealMultiplierPercentage: number; // As in %
  setMealMultiplier: (x: number) => void;
  setProgramDay: (day: ProgramDay) => void;
  calculateAmount: (food: Food) => number | null;
}

export const AppContext = createContext<State | undefined>(undefined);

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const [programDay, setProgramDay] = useState<ProgramDay>('1-3');
  const [mealMultiplierPercentage, setMealMultiplier] = useState(100);

  // During hydration `useEffect` is called. `window` is available in `useEffect`. In this case because we know we're in the browser checking for window is not needed. If you need to read something from window that is fine.
  // By calling within `useEffect` a render is triggered after hydrating, this causes the "browser specific" value to be available.
  useEffect(() => {
    setProgramDay(getCurrentDay());
    const savedValue = getMealMultiplier();
    if (savedValue) {
      setMealMultiplier(savedValue);
    }
  }, []);

  /**
   * Calculate amount of food based on programday
   */
  const calculateAmount = useCallback(
    (food: Food) => {
      const getDayMultiplier = () => {
        if (programDay === '4') return food.day4x || 1;
        else if (programDay === '5') return food.day5x || 1;
        return 1;
      };

      if (!food.amount) return null;
      return roundToNearest5(
        food.amount * (mealMultiplierPercentage / 100) * getDayMultiplier(),
      );
    },
    [mealMultiplierPercentage, programDay],
  );

  const value = useMemo<State>(
    () => ({
      programDay,
      mealMultiplierPercentage,
      // Save to locastorage
      setMealMultiplier: (x: number) => {
        setMealMultiplier(x);
        saveMealMultiplier(x);
      },
      setProgramDay,
      calculateAmount,
    }),
    [calculateAmount, mealMultiplierPercentage, programDay],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext was used outside of its Provider');
  }

  return context;
};
