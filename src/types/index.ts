export type ProgramDay = '1-3' | '4' | '5';

export enum TimeOfTheDay {
  Morning = 0,
  Afternoon = 1,
  Evening = 2,
}

export type Category = 'carbs' | 'proteins' | 'fats' | 'extra';

export type Food = {
  name: string;
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

export type Conversions = Record<Category, Record<string, number>>;
