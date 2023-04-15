import { differenceInDays } from 'date-fns';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

// TODO quick and dirty
const START_DATE = new Date(2023, 3, 10);

interface State {
  selectedDay: number;
  startDate: Date;
  mealMultiplier: number;
  setMealMultiplier: (x: number) => void;
  setSelectedDay: (day: number) => void;
}

export const AppContext = createContext<State | undefined>(undefined);

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const [selectedDay, setSelectedDay] = useState(
    (differenceInDays(new Date(), START_DATE) + 1) % 5 || 5,
  );

  const [mealMultiplier, setMealMultiplier] = useState(100);

  const value = useMemo<State>(
    () => ({
      selectedDay,
      mealMultiplier,
      setMealMultiplier,
      setSelectedDay,
      startDate: START_DATE,
    }),
    [mealMultiplier, selectedDay],
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
