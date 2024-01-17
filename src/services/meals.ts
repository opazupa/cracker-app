import { Conversions, Meal, Meals } from '../types';

const Breakfast: Meal[] = [
  {
    name: 'Porridge',
    group: 'morning',
    type: 'all',
    components: [
      {
        name: 'Oats (dry)',
        category: 'carbs',
        amount: 50,
        day4x: 1.1,
        day5x: 1.2,
      },
      {
        name: 'Cottage cheese (2%)',
        category: 'proteins',
        amount: 100,
        day4x: 1.1,
        day5x: 1.2,
      },
      {
        name: 'Berries',
        category: 'carbs',
        amount: 100,
        day4x: 1.1,
        day5x: 1.2,
      },
      { name: 'Fruit soup', category: 'extra', unConvertible: true },
    ],
  },
  {
    name: 'Bread',
    group: 'morning',
    type: 'all',
    components: [
      { name: 'Rye/Oat bread', category: 'carbs', amount: 60, day5x: 1.16 },
      {
        name: 'Full meat cuts',
        category: 'proteins',
        amount: 65,
        day4x: 1.075,
        day5x: 1.15,
      },
      {
        name: 'Egg',
        category: 'proteins',
        amount: 55,
        unConvertible: true,
      },
      {
        name: 'Fruits',
        category: 'carbs',
        amount: 80,
        day4x: 1.0625,
        day5x: 1.18,
      },
      {
        name: 'Cucumber, Tomato & Pepper',
        category: 'extra',
        unConvertible: true,
      },
    ],
  },
  {
    name: 'Smoothie',
    group: 'morning',
    type: 'all',
    components: [
      { name: 'Oats (dry)', category: 'carbs', amount: 10 },
      {
        name: 'Qvark (2%)',
        category: 'proteins',
        amount: 85,
        day4x: 1.05,
        day5x: 1.17,
      },
      {
        name: 'Berries',
        category: 'carbs',
        amount: 145,
        day4x: 1.14,
        day5x: 1.2,
      },
      {
        name: 'Avocado',
        category: 'fats',
        amount: 35,
        day4x: 1.14,
        day5x: 1.14,
      },
      {
        name: 'Banana',
        category: 'carbs',
        amount: 120,
      },
      {
        name: 'Skinned milk',
        amount: 145,
        category: 'proteins',
        unConvertible: true,
        day4x: 1.1,
        day5x: 1.2,
      },
    ],
  },
];

const LunchOrDinner: Omit<Meal, 'name'> = {
  type: 'one-of',
  group: 'afternoon',
  includeVeggies: true,
  components: [
    // Carbs
    { name: 'Rice', category: 'carbs', amount: 175, day4x: 1.1, day5x: 1.2 },
    {
      name: 'Pasta/Noodle',
      category: 'carbs',
      amount: 155,
      day4x: 1.1,
      day5x: 1.2,
    },
    {
      name: 'Couscous/Qvinoa',
      category: 'carbs',
      amount: 115,
      day4x: 1.1,
      day5x: 1.2,
    },
    { name: 'Tortilla', category: 'carbs', amount: 60, day4x: 1.1, day5x: 1.6 },
    // Proteins
    {
      name: 'Chicken',
      category: 'proteins',
      amount: 90,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Fish',
      category: 'proteins',
      amount: 80,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Beef (7%)',
      category: 'proteins',
      amount: 85,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Pork (10%)',
      category: 'proteins',
      amount: 75,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Tuna',
      category: 'proteins',
      amount: 90,
      day4x: 1.05,
      day5x: 1.16,
    },
    // Fats
    { name: 'Olive oil', category: 'fats', amount: 5 },
    { name: 'Olives', category: 'fats', amount: 25 },
    { name: 'Nuts', category: 'fats', amount: 10 },
    { name: 'Avocado', category: 'fats', amount: 25 },
  ],
};
const Snack: Meal = {
  name: 'Snack',
  group: 'afternoon',
  includeVeggies: true,
  type: 'one-of',
  components: [
    // Carbs
    {
      name: 'Banana',
      category: 'carbs',
      amount: 210,
      day4x: 1.1,
      day5x: 1.2,
    },
    {
      name: 'Rye/Oat bread',
      category: 'carbs',
      amount: 70,
      day4x: 1.1,
      day5x: 1.2,
    },
    {
      name: 'Fruits',
      category: 'carbs',
      amount: 315,
      day4x: 1.1,
      day5x: 1.2,
    },
    {
      name: 'Berries',
      category: 'carbs',
      amount: 350,
      day4x: 1.1,
      day5x: 1.2,
    },
    {
      name: 'Rice cakes',
      category: 'carbs',
      amount: 55,
      day4x: 1.1,
      day5x: 1.2,
    },
    {
      name: 'Oat porridge',
      category: 'carbs',
      amount: 315,
      day4x: 1.1,
      day5x: 1.2,
    },
    // Proteins
    {
      name: 'Cottage cheese (2%)',
      category: 'proteins',
      amount: 145,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Full meat cuts',
      category: 'proteins',
      amount: 125,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Qvark (2%)',
      category: 'proteins',
      amount: 170,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Skyr',
      category: 'proteins',
      amount: 200,
      day4x: 1.05,
      day5x: 1.16,
    },
    {
      name: 'Hera powder',
      category: 'proteins',
      amount: 35,
      day4x: 1.05,
      day5x: 1.16,
    },
  ],
};
const Evening: Meal[] = [
  {
    name: 'Bread',
    group: 'evening',
    type: 'all',
    components: [
      {
        name: 'Rye/Oat bread',
        category: 'carbs',
        amount: 60,
        day4x: 1.08,
        day5x: 1.16,
      },
      {
        name: 'Full meat cuts',
        category: 'proteins',
        amount: 40,
        day4x: 1.125,
        day5x: 1.125,
      },
      {
        name: 'Cheese (17%)',
        category: 'fats',
        amount: 20,
        day4x: 1.25,
        unConvertible: true,
      },
      {
        name: 'Pineapple',
        category: 'carbs',
        amount: 100,
        day4x: 1.1,
        day5x: 1.2,
      },
      {
        name: 'Cottage cheese (2%)',
        category: 'proteins',
        amount: 80,
        day4x: 1.0625,
        day5x: 1.185,
      },
      { name: 'Banana', category: 'carbs', amount: 120 },
      {
        name: 'Cucumber, Tomato & Pepper',
        category: 'extra',
        unConvertible: true,
      },
    ],
  },
  {
    name: 'Porridge',
    group: 'evening',
    type: 'all',
    components: [
      {
        name: 'Oats (dry)',
        category: 'carbs',
        amount: 35,
        day4x: 1.14,
        day5x: 1.14,
      },
      {
        name: 'Cottage cheese (2%)',
        category: 'proteins',
        amount: 120,
        day4x: 1.125,
        day5x: 1.21,
      },
      {
        name: 'Berries',
        category: 'carbs',
        amount: 100,
        day4x: 1.1,
        day5x: 1.2,
      },
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
      { name: 'Oats (dry)', category: 'carbs', amount: 15, day5x: 1.33 },
      { name: 'Qvark (2%)', category: 'proteins', amount: 125 },
      { name: 'Berries', category: 'carbs', amount: 155, day4x: 1.1 },
      { name: 'Banana', category: 'carbs', amount: 120 },
      { name: 'Nuts', category: 'fats', amount: 15, day5x: 1.33 },
      {
        name: 'Hera powder',
        category: 'proteins',
        amount: 10,
        day4x: 1.1,
        day5x: 1.1,
      },
      {
        name: 'Skinned milk',
        amount: 145,
        category: 'proteins',
        unConvertible: true,
        day4x: 1.1,
        day5x: 1.2,
      },
    ],
  },
];

export const getMeals = (): Meals => {
  return {
    Morning: Breakfast,
    Afternoon: [
      { name: 'Lunch', ...LunchOrDinner },
      Snack,
      { name: 'Dinner', ...LunchOrDinner },
    ],
    Evening: Evening,
  };
};

export const getConversions = (): Conversions => {
  return {
    // Carbs (x rice)
    carbs: {
      Rice: 1,
      'Pasta/Noodle': 0.7,
      'Couscous/Qvinoa': 0.7,
      Tortilla: 0.3,
      Potato: 1.4,
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
      Olives: 5,
      'Coconut/Avocado oil': 1,
      Avocado: 5,
      Nuts: 2,
      Seeds: 2,
    },
    extra: {},
  };
};
