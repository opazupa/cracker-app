import { differenceInDays } from 'date-fns';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ProgramDay } from '../types';

// TODO quick and dirty to start the count
const START_DATE = new Date(2023, 3, 10); // 10.4.2023

export const PROGRAM_DAYS: ProgramDay[] = ['1-3', '4', '5'];
interface State {
  programDay: ProgramDay;
  startDate: Date;
  mealMultiplierPercentage: number; // As in %
  setMealMultiplier: (x: number) => void;
  setProgramDay: (day: ProgramDay) => void;
}

export const AppContext = createContext<State | undefined>(undefined);

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const getCurrentDay = (): ProgramDay => {
    const day = (differenceInDays(new Date(), START_DATE) + 1) % 5 || 5;

    if (day <= 3) return '1-3';
    else if (day === 4) return '4';
    else if (day === 5) return '5';

    throw new Error('Current date can`t be calculated :(');
  };

  const [programDay, setProgramDay] = useState(getCurrentDay());
  const [mealMultiplierPercentage, setMealMultiplier] = useState(100);

  const value = useMemo<State>(
    () => ({
      programDay,
      mealMultiplierPercentage,
      setMealMultiplier,
      setProgramDay,
      startDate: START_DATE,
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
