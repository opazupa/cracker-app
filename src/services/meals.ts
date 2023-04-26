import { Conversions, Meal, Meals } from '../types';

const Breakfast: Meal[] = [
  {
    name: 'Porridge',
    group: 'morning',
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
    group: 'morning',
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
    group: 'morning',
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

const LunchOrDinner: Omit<Meal, 'name'> = {
  type: 'one-of',
  group: 'afternoon',
  includeVeggies: true,
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
      name: 'Qvark (2%)',
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
};
const Evening: Meal[] = [
  {
    name: 'Bread',
    group: 'evening',
    type: 'all',
    components: [
      { name: 'Rye/Oat bread', category: 'carbs', amount: 60 },
      { name: 'Full meat cuts', category: 'proteins', amount: 20 },
      {
        name: 'Cheese (17%)',
        category: 'fats',
        amount: 20,
        unConvertible: true,
      },
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
      'Coconut/Avocado oil': 1,
      Avocado: 2.5,
      Nuts: 2,
      Seeds: 2,
    },
    extra: {},
  };
};
