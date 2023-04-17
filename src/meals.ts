import { Food, Meal, ProgramDay } from './types';

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
      { name: 'Fruit soup', category: 'extra' },
    ],
  },
  {
    name: 'Bread',
    group: 'breakfast',
    type: 'all',
    components: [
      { name: 'Rye/Oat bread', category: 'carbs', amount: 60 },
      { name: 'Full meat cuts', category: 'proteins', amount: 20 },
      { name: 'Cucumber & Tomato', category: 'extra' },
      { name: 'Egg (1 pcs)', category: 'proteins', amount: 55 },
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
      { name: 'Skinned milk', category: 'extra' },
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
      { name: 'Banana (~120)', category: 'carbs', amount: 120 },
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
      { name: 'Banana (~120)', category: 'carbs', amount: 120 },
      { name: 'Fruit soup', category: 'extra' },
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
      { name: 'Banana (~120)', category: 'carbs', amount: 120 },
      { name: 'Nuts', category: 'fats', amount: 10 },
      { name: 'Skinned milk', category: 'extra' },
    ],
  },
];

// type conversion = {
//   from: string;
//   to: string;
//   multiplier: number;
// };

// const CONVERSIONS  = {
//   {}
// }

export const MEALS: Record<string, Meal[]> = {
  Breakfast,
  Lunch: [{ name: 'Lunch', group: 'lunch', ...LunchOrDinner }],
  Snack,
  Dinner: [{ name: 'Dinner', group: 'dinner', ...LunchOrDinner }],
  Evening,
};

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
  const amount = food.amount * (mealMultiplier / 100) * getDayMultiplier();
  return Math.round(amount / 5) * 5; // Round to nearest 5g
};

export const isMain = (meal: Meal) =>
  ['lunch', 'snack', 'dinner'].includes(meal.group);

export const mealChecked = (meal: Meal, checked: Food[]): boolean => {
  if (meal.type === 'one-of') {
    return (
      (!meal.components.some((c) => c.category === 'carbs') ||
        checked.some((c) => c.category === 'carbs')) &&
      (!meal.components.some((c) => c.category === 'proteins') ||
        (checked.some((c) => c.category === 'proteins') &&
          (!meal.components.some((c) => c.category === 'fats') ||
            checked.some((c) => c.category === 'fats'))))
    );
  } else {
    return checked.length === meal.components.length;
  }
};
