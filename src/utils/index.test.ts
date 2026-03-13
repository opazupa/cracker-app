import {
  convert,
  getCurrentDay,
  getMealForTimeOfTheDay,
  mealChecked,
  roundToNearest5,
} from '.';
import { Food, Meal, TimeOfTheDay } from '../types';

jest.mock('canvas-confetti', () => jest.fn());

jest.mock('../services', () => ({
  ...jest.requireActual('../services'),
  getStartDate: jest.fn(),
}));

import { getStartDate } from '../services';
const mockGetStartDate = jest.mocked(getStartDate);

// ─── roundToNearest5 ─────────────────────────────────────────────────────────

describe('roundToNearest5', () => {
  it.each([
    [0, 0],
    [5, 5],
    [47, 45],
    [53, 55],
    [52, 50],
    [100, 100],
    [122.5, 125],
    [144, 145],
  ])('rounds %s to %s', (input, expected) => {
    expect(roundToNearest5(input)).toBe(expected);
  });
});

// ─── getMealForTimeOfTheDay ───────────────────────────────────────────────────

describe('getMealForTimeOfTheDay', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it.each([
    [0, TimeOfTheDay.Morning],
    [9, TimeOfTheDay.Morning],
    [10, TimeOfTheDay.Afternoon],
    [15, TimeOfTheDay.Afternoon],
    [19, TimeOfTheDay.Afternoon],
    [20, TimeOfTheDay.Evening],
    [23, TimeOfTheDay.Evening],
  ])('at hour %s returns %s', (hour, expected) => {
    jest.setSystemTime(new Date(2024, 0, 1, hour, 0, 0));
    expect(getMealForTimeOfTheDay()).toBe(expected);
  });
});

// ─── getCurrentDay ────────────────────────────────────────────────────────────

describe('getCurrentDay', () => {
  const START_DATE = new Date('2024-01-01T00:00:00.000Z');

  beforeEach(() => {
    jest.useFakeTimers();
    mockGetStartDate.mockReturnValue(START_DATE);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it.each([
    [0, '1-3'],
    [1, '1-3'],
    [2, '1-3'],
    [3, '4'],
    [4, '5'],
    [5, '1-3'], // cycles back
    [8, '4'], // second cycle day 4
  ])(
    'returns correct day when %s days have passed since start',
    (dayOffset, expected) => {
      const currentDate = new Date(START_DATE);
      currentDate.setUTCDate(currentDate.getUTCDate() + dayOffset);
      jest.setSystemTime(currentDate);

      expect(getCurrentDay()).toBe(expected);
    },
  );
});

// ─── mealChecked ─────────────────────────────────────────────────────────────

describe('mealChecked', () => {
  const rice: Food = { name: 'Rice', category: 'carbs', amount: 175 };
  const pasta: Food = { name: 'Pasta/Noodle', category: 'carbs', amount: 155 };
  const chicken: Food = { name: 'Chicken', category: 'proteins', amount: 90 };
  const fish: Food = { name: 'Fish', category: 'proteins', amount: 80 };
  const oliveOil: Food = { name: 'Olive oil', category: 'fats', amount: 5 };
  const nuts: Food = { name: 'Nuts', category: 'fats', amount: 10 };
  const oats: Food = { name: 'Oats (dry)', category: 'carbs', amount: 50 };
  const cottageCheese: Food = {
    name: 'Cottage cheese (2%)',
    category: 'proteins',
    amount: 100,
  };
  const berries: Food = { name: 'Berries', category: 'carbs', amount: 100 };

  describe("type 'one-of'", () => {
    const meal: Meal = {
      name: 'Lunch',
      group: 'afternoon',
      type: 'one-of',
      components: [rice, pasta, chicken, fish, oliveOil, nuts],
    };

    it('is complete when one item per category is checked', () => {
      expect(mealChecked(meal, [rice, chicken, oliveOil])).toBe(true);
    });

    it('is incomplete when nothing is checked', () => {
      expect(mealChecked(meal, [])).toBe(false);
    });

    it('is incomplete when only carbs are checked', () => {
      expect(mealChecked(meal, [rice])).toBe(false);
    });

    it('is incomplete when only carbs and proteins are checked', () => {
      expect(mealChecked(meal, [rice, chicken])).toBe(false);
    });

    it('is incomplete when two items from the same category are checked', () => {
      expect(mealChecked(meal, [rice, pasta, chicken, oliveOil])).toBe(false);
    });

    it('is complete when no fats exist in meal and carbs+proteins are checked', () => {
      const noFatsMeal: Meal = {
        name: 'Snack',
        group: 'afternoon',
        type: 'one-of',
        components: [rice, pasta, chicken, fish],
      };
      expect(mealChecked(noFatsMeal, [rice, chicken])).toBe(true);
    });
  });

  describe("type 'all'", () => {
    const meal: Meal = {
      name: 'Porridge',
      group: 'morning',
      type: 'all',
      components: [oats, cottageCheese, berries],
    };

    it('is complete when all components are checked', () => {
      expect(mealChecked(meal, [oats, cottageCheese, berries])).toBe(true);
    });

    it('is incomplete when nothing is checked', () => {
      expect(mealChecked(meal, [])).toBe(false);
    });

    it('is incomplete when only some components are checked', () => {
      expect(mealChecked(meal, [oats, cottageCheese])).toBe(false);
    });
  });
});

// ─── convert ─────────────────────────────────────────────────────────────────

describe('convert', () => {
  it('converts between same-category proteins using multipliers', () => {
    // Chicken=1, Cottage cheese=1.6 → (90/1)*1.6 = 144 → rounds to 145
    expect(convert(90, 'Chicken', 'Cottage cheese (2%)')).toBe(145);
  });

  it('converts between same-category carbs', () => {
    // Rice=1, Berries=2 → (100/1)*2 = 200
    expect(convert(100, 'Rice', 'Berries')).toBe(200);
  });

  it('converts between same-category fats', () => {
    // Olive oil=1, Nuts=2 → (5/1)*2 = 10
    expect(convert(5, 'Olive oil', 'Nuts')).toBe(10);
  });

  it('converts same ingredient to itself', () => {
    expect(convert(100, 'Rice', 'Rice')).toBe(100);
  });

  it('returns undefined when amount is null', () => {
    expect(convert(null, 'Chicken', 'Fish')).toBeUndefined();
  });

  it('returns undefined when amount is undefined', () => {
    expect(convert(undefined, 'Chicken', 'Fish')).toBeUndefined();
  });

  it('returns undefined when amount is 0', () => {
    expect(convert(0, 'Chicken', 'Fish')).toBeUndefined();
  });

  it('returns undefined for unconvertible ingredients (no conversion entry)', () => {
    // 'Fruit soup' is not in conversions map
    expect(convert(100, 'Fruit soup', 'Rice')).toBeUndefined();
  });
});
