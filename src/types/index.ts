export type ProgramDay = '1-3' | '4' | '5';

export enum TimeOfTheDay {
  Morning = 0,
  Afternoon = 1,
  Evening = 2,
}

export type Ingredient =
  // Carbs
  | 'Rice'
  | 'Pasta/Noodle'
  | 'Couscous/Qvinoa'
  | 'Tortilla'
  | 'Potato'
  | 'Oats (dry)'
  | 'Rice cakes'
  | 'Fruits'
  | 'Banana'
  | 'Berries'
  | 'Pineapple'
  | 'Grapes'
  | 'Fruit piltti'
  | 'Rye/Oat bread'
  | 'Oat porridge'
  // Proteins (x chicken)proteins
  | 'Chicken'
  | 'Beef (7%)'
  | 'Pork (10%)'
  | 'Fish'
  | 'Tuna'
  | 'Shrimps'
  | 'Full meat cuts'
  | 'Cottage cheese (2%)'
  | 'Qvark (2%)'
  | 'Skyr'
  | 'Protein pudding'
  | 'Hera powder'
  | 'Mifu slices'
  | 'Mifu grains'
  | 'Feta (5%)'
  | 'Skinned milk'
  | 'Egg'
  | 'Cheese (17%)'
  // Fats (x oil)
  | 'Olive oil'
  | 'Olives'
  | 'Coconut/Avocado oil'
  | 'Avocado'
  | 'Nuts'
  | 'Seeds'
  // Extra
  | 'Fruit soup'
  | 'Cucumber, Tomato & Pepper';

export type Category = 'carbs' | 'proteins' | 'fats' | 'extra';

export type Food = {
  name: Ingredient;
  category: Category;
  unConvertible?: boolean;
  amount?: number;
  day4x?: number;
  day5x?: number;
};

export type Meal = {
  name: string;
  group: 'morning' | 'afternoon' | 'evening';
  includeVeggies?: boolean;
  type: 'all' | 'one-of';
  components: Food[];
};

export type Meals = Record<keyof typeof TimeOfTheDay, Meal[]>;

export type Replacement = Pick<Food, 'name' | 'category'>;

export type Conversions = Record<Category, Partial<Record<Ingredient, number>>>;
