import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getMealMultiplier, saveMealMultiplier } from '../persistence';
import { ProgramDay } from '../types';
import { getCurrentDay } from '../utils';

export const PROGRAM_DAYS: ProgramDay[] = ['1-3', '4', '5'];
interface State {
  programDay: ProgramDay;
  mealMultiplierPercentage: number; // As in %
  setMealMultiplier: (x: number) => void;
  setProgramDay: (day: ProgramDay) => void;
}

export const AppContext = createContext<State | undefined>(undefined);

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const [programDay, setProgramDay] = useState(getCurrentDay());
  const [mealMultiplierPercentage, setMealMultiplier] = useState(100);

  // During hydration `useEffect` is called. `window` is available in `useEffect`. In this case because we know we're in the browser checking for window is not needed. If you need to read something from window that is fine.
  // By calling within `useEffect` a render is triggered after hydrating, this causes the "browser specific" value to be available.
  useEffect(() => {
    const savedValue = getMealMultiplier();
    if (savedValue) {
      setMealMultiplier(savedValue);
    }
  }, []);

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
    }),
    [mealMultiplierPercentage, programDay],
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
