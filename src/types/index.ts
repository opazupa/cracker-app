export type ProgramDay = '1-3' | '4' | '5';

export type TimeOfTheDay = 'Morning' | 'Afternoon' | 'Evening';

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

export type Replacement = Pick<Food, 'name' | 'category'>;
