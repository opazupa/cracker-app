import { Category, Food, Meal, ProgramDay, Replacement } from './types';

const Breakfast: Meal[] = [
  {
    name: 'Porridge',
    group: 'breakfast',
    type: 'all',
    components: [
      { name: 'Oats (dry)', category: 'carbs', amount: 50, day5x: 1.25 },
      { name: 'Cottage cheese (2%)', category: 'proteins', amount: 75 },
      { name: 'Berries', category: 'carbs', amount: 100 },
      { name: 'Hera powder', category: 'proteins', amount: 7 },
      { name: 'Fruit soup', category: 'extra', unConvertible: true },
    ],
  },
  {
    name: 'Bread',
    group: 'breakfast',
    type: 'all',
    components: [
      { name: 'Rye/Oat bread', category: 'carbs', amount: 60 },
      { name: 'Full meat cuts', category: 'proteins', amount: 20 },
      { name: 'Cucumber & Tomato', category: 'extra', unConvertible: true },
      {
        name: 'Egg (1 pcs)',
        category: 'proteins',
        amount: 55,
        unConvertible: true,
      },
      { name: 'Avocado', category: 'fats', amount: 20 },
      { name: 'Fruits', category: 'carbs', amount: 120, day5x: 1.46 },
    ],
  },
  {
    name: 'Smoothie',
    group: 'breakfast',
    type: 'all',
    components: [
      { name: 'Oats (dry)', category: 'carbs', amount: 30, day5x: 1.25 },
      { name: 'Qvark (2%)', category: 'proteins', amount: 90 },
      { name: 'Berries', category: 'carbs', amount: 100 },
      { name: 'Avocado', category: 'fats', amount: 40 },
      { name: 'Skinned milk', category: 'extra', unConvertible: true },
    ],
  },
];

const LunchOrDinner: Omit<Meal, 'name' | 'group'> = {
  type: 'one-of',
  components: [
    // Carbs
    { name: 'Rice', category: 'carbs', amount: 150, day4x: 1.3, day5x: 1.6 },
    {
      name: 'Pasta/Noodle',
      category: 'carbs',
      amount: 100,
      day4x: 1.3,
      day5x: 1.6,
    },
    {
      name: 'Couscous/Qvinoa',
      category: 'carbs',
      amount: 100,
      day4x: 1.3,
      day5x: 1.6,
    },
    { name: 'Tortilla', category: 'carbs', amount: 50, day4x: 1.3, day5x: 1.6 },
    { name: 'Potato', category: 'carbs', amount: 150, day4x: 1.3, day5x: 1.6 },
    // Proteins
    {
      name: 'Chicken',
      category: 'proteins',
      amount: 80,
      day4x: 1.125,
      day5x: 1.125,
    },
    {
      name: 'Fish',
      category: 'proteins',
      amount: 80,
      day4x: 1.125,
      day5x: 1.125,
    },
    {
      name: 'Tuna',
      category: 'proteins',
      amount: 90,
      day4x: 1.125,
      day5x: 1.125,
    },
    {
      name: 'Shrimps',
      category: 'proteins',
      amount: 120,
      day4x: 1.125,
      day5x: 1.125,
    },
    // Fats
    { name: 'Olive oil', category: 'fats', amount: 5 },
    { name: 'Nuts', category: 'fats', amount: 10 },
    { name: 'Avocado', category: 'fats', amount: 25 },
  ],
};
const Snack: Meal[] = [
  {
    name: 'Snack',
    group: 'snack',
    type: 'one-of',
    components: [
      // Carbs
      {
        name: 'Banana',
        category: 'carbs',
        amount: 180,
        day4x: 1.3,
        day5x: 1.6,
      },
      {
        name: 'Rye/Oat bread',
        category: 'carbs',
        amount: 60,
        day4x: 1.3,
        day5x: 1.6,
      },
      {
        name: 'Fruits',
        category: 'carbs',
        amount: 270,
        day4x: 1.3,
        day5x: 1.6,
      },
      {
        name: 'Berries',
        category: 'carbs',
        amount: 300,
        day4x: 1.3,
        day5x: 1.6,
      },
      {
        name: 'Rice cakes',
        category: 'carbs',
        amount: 45,
        day4x: 1.3,
        day5x: 1.6,
      },
      {
        name: 'Oat porridge',
        category: 'carbs',
        amount: 270,
        day4x: 1.3,
        day5x: 1.6,
      },
      // Proteins
      {
        name: 'Cottage cheese (2%)',
        category: 'proteins',
        amount: 130,
        day4x: 1.125,
        day5x: 1.125,
      },
      {
        name: 'Full meat cuts',
        category: 'proteins',
        amount: 110,
        day4x: 1.125,
        day5x: 1.125,
      },
      {
        name: 'Qvark',
        category: 'proteins',
        amount: 150,
        day4x: 1.125,
        day5x: 1.125,
      },
      {
        name: 'Skyr',
        category: 'proteins',
        amount: 175,
        day4x: 1.125,
        day5x: 1.125,
      },
      {
        name: 'Hera powder',
        category: 'proteins',
        amount: 32,
        day4x: 1.125,
        day5x: 1.125,
      },
    ],
  },
];
const Evening: Meal[] = [
  {
    name: 'Bread',
    group: 'evening',
    type: 'all',
    components: [
      { name: 'Rye/Oat bread', category: 'carbs', amount: 60 },
      { name: 'Full meat cut', category: 'proteins', amount: 20 },
      { name: 'Cheese (17%)', category: 'fats', amount: 20 },
      { name: 'Pineapple', category: 'carbs', amount: 140 },
      { name: 'Cottage cheese (2%)', category: 'proteins', amount: 100 },
      { name: 'Banana', category: 'carbs', amount: 120 },
    ],
  },
  {
    name: 'Porridge',
    group: 'evening',
    type: 'all',
    components: [
      { name: 'Oats (dry)', category: 'carbs', amount: 50 },
      { name: 'Cottage cheese (2%)', category: 'proteins', amount: 125 },
      { name: 'Berries', category: 'carbs', amount: 100 },
      { name: 'Nuts', category: 'fats', amount: 10 },
      { name: 'Banana', category: 'carbs', amount: 120 },
      { name: 'Fruit soup', category: 'extra', unConvertible: true },
    ],
  },
  {
    name: 'Smoothie',
    group: 'evening',
    type: 'all',
    components: [
      { name: 'Oats (dry)', category: 'carbs', amount: 30 },
      { name: 'Qvark (2%)', category: 'proteins', amount: 145 },
      { name: 'Berries', category: 'carbs', amount: 100 },
      { name: 'Banana', category: 'carbs', amount: 120 },
      { name: 'Nuts', category: 'fats', amount: 10 },
      { name: 'Skinned milk', category: 'extra', unConvertible: true },
    ],
  },
];

export const MEALS: Record<string, Meal[]> = {
  Breakfast,
  Lunch: [{ name: 'Lunch', group: 'lunch', ...LunchOrDinner }],
  Snack,
  Dinner: [{ name: 'Dinner', group: 'dinner', ...LunchOrDinner }],
  Evening,
};

export const REPLACEMENTS: Replacement[] = [
  // Carbs
  { name: 'Pineapple', category: 'carbs' },
  // Proteins
  { name: 'Qvark', category: 'proteins' },
  // Fats
  { name: 'Oil', category: 'fats' },
];

export const CONVERSIONS: Record<Category, Record<string, number>> = {
  // Carbs (x rice)
  carbs: {
    Rice: 1,
    Pasta: 0.7,
    'Couscous/Qvinoa': 0.7,
    Tortilla: 0.3,
    'Oats (dry)': 0.3,
    'Rice cakes': 0.3,
    Fruits: 1.8,
    Banana: 1.2,
    Berries: 2,
    Pineapple: 1.8,
    Grapes: 1.5,
    'Fruit piltti': 2,
    'Rye/Oat bread': 0.4,
    'Oat porridge': 1.8,
  },
  // Proteins (x chicken)
  proteins: {
    Chicken: 1,
    'Beef (7%)': 1,
    'Pork (10%)': 1,
    Fish: 1,
    Tuna: 1.1,
    Shrimps: 1.5,
    'Full meat cuts': 1.4,
    'Cottage cheese (2%)': 1.6,
    'Qvark (2%)': 1.9,
    Skyr: 2.2,
    'Protein pudding': 1.9,
    'Hera powder': 0.4,
    'Mifu slices': 0.6,
    'Mifu grains': 1.1,
    'Feta (5%)': 1.3,
  },
  // Fats (x oil)
  fats: {
    'Olive oil': 1,
    'Coconut/Avocado oil': 1,
    Avocado: 2.5,
    Nuts: 2,
    Seeds: 2,
  },
  extra: {},
};

const roundToNearest5 = (amount: number) => Math.round(amount / 5) * 5;

export const calculateAmount = (
  food: Food,
  mealMultiplier: number,
  day: ProgramDay,
) => {
  const getDayMultiplier = () => {
    if (day === '4') return food.day4x || 1;
    else if (day === '5') return food.day5x || 1;
    return 1;
  };

  if (!food.amount) return null;
  return roundToNearest5(
    food.amount * (mealMultiplier / 100) * getDayMultiplier(),
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
