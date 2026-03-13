import { act, renderHook } from '@testing-library/react';
import React from 'react';

import { AppContextProvider, useAppContext } from './useAppContext';
import { Food } from '../types';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  getCurrentDay: jest.fn().mockReturnValue('1-3'),
}));

jest.mock('../services', () => ({
  ...jest.requireActual('../services'),
  getMealMultiplier: jest.fn().mockReturnValue(undefined),
  saveMealMultiplier: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppContextProvider>{children}</AppContextProvider>
);

// ─── calculateAmount ──────────────────────────────────────────────────────────

describe('calculateAmount', () => {
  it('returns null when food has no amount', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const food: Food = { name: 'Fruit soup', category: 'extra' };
    expect(result.current.calculateAmount(food)).toBeNull();
  });

  it('returns the base amount on day 1-3 at 100% multiplier', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const food: Food = { name: 'Rice', category: 'carbs', amount: 100 };
    expect(result.current.calculateAmount(food)).toBe(100);
  });

  it('rounds to nearest 5', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const food: Food = { name: 'Rice', category: 'carbs', amount: 47 };
    expect(result.current.calculateAmount(food)).toBe(45);
  });

  it('applies day 4 multiplier on programDay "4"', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    act(() => result.current.setProgramDay('4'));

    const food: Food = {
      name: 'Rice',
      category: 'carbs',
      amount: 100,
      day4x: 1.1,
    };
    expect(result.current.calculateAmount(food)).toBe(110);
  });

  it('applies day 5 multiplier on programDay "5"', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    act(() => result.current.setProgramDay('5'));

    const food: Food = {
      name: 'Rice',
      category: 'carbs',
      amount: 100,
      day5x: 1.2,
    };
    expect(result.current.calculateAmount(food)).toBe(120);
  });

  it('defaults to 1x day multiplier when no day4x is set', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    act(() => result.current.setProgramDay('4'));

    const food: Food = { name: 'Rice', category: 'carbs', amount: 100 };
    expect(result.current.calculateAmount(food)).toBe(100);
  });

  it('applies meal multiplier percentage', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    act(() => result.current.setMealMultiplier(150));

    const food: Food = { name: 'Rice', category: 'carbs', amount: 100 };
    expect(result.current.calculateAmount(food)).toBe(150);
  });

  it('combines meal multiplier and day multiplier', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    act(() => {
      result.current.setMealMultiplier(110);
      result.current.setProgramDay('4');
    });

    // 100 * (110/100) * 1.1 = 121 → rounds to 120
    const food: Food = {
      name: 'Rice',
      category: 'carbs',
      amount: 100,
      day4x: 1.1,
    };
    expect(result.current.calculateAmount(food)).toBe(120);
  });
});

// ─── initial state ────────────────────────────────────────────────────────────

describe('initial state', () => {
  it('defaults to programDay "1-3" (mocked getCurrentDay)', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    expect(result.current.programDay).toBe('1-3');
  });

  it('defaults to 100% meal multiplier when nothing is saved', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    expect(result.current.mealMultiplierPercentage).toBe(100);
  });

  it('loads saved multiplier from localStorage', async () => {
    const { getMealMultiplier } = jest.requireMock('../services');
    getMealMultiplier.mockReturnValueOnce(150);

    const { result } = renderHook(() => useAppContext(), { wrapper });
    // useEffect runs after render
    expect(result.current.mealMultiplierPercentage).toBe(150);
  });
});

// ─── error boundary ───────────────────────────────────────────────────────────

describe('useAppContext outside provider', () => {
  it('throws when used outside AppContextProvider', () => {
    // Suppress React error boundary noise in test output
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    expect(() => renderHook(() => useAppContext())).toThrow(
      'useAppContext was used outside of its Provider',
    );
    consoleSpy.mockRestore();
  });
});
