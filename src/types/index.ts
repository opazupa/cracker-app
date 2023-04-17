export type ProgramDay = '1-3' | '4' | '5';

export type Category = 'carbs' | 'proteins' | 'fats' | 'extra';

export type Food = {
  name: string;
  category: Category;
  amount?: number;
  day4x?: number;
  day5x?: number;
};

export type Meal = {
  name: string;
  group: 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'evening';
  type: 'all' | 'one-of';
  components: Food[];
};

export type Replacement = Pick<Food, 'name' | 'category'>;
