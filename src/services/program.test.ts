import {
  getMealMultiplier,
  getMeals,
  getStartDate,
  saveMealMultiplier,
  saveStartDate,
} from '.';
beforeEach(() => {
  localStorage.clear();
});

// ─── saveMealMultiplier / getMealMultiplier ───────────────────────────────────

describe('saveMealMultiplier / getMealMultiplier', () => {
  it('returns undefined when nothing has been saved', () => {
    expect(getMealMultiplier()).toBeUndefined();
  });

  it('saves and retrieves a multiplier value', () => {
    saveMealMultiplier(110);
    expect(getMealMultiplier()).toBe(110);
  });

  it('overwrites a previously saved multiplier', () => {
    saveMealMultiplier(100);
    saveMealMultiplier(150);
    expect(getMealMultiplier()).toBe(150);
  });
});

// ─── saveStartDate / getStartDate ─────────────────────────────────────────────

describe('saveStartDate / getStartDate', () => {
  it('saves and retrieves a start date', () => {
    saveStartDate('2024-01-15');
    const result = getStartDate();
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(15);
  });

  it('defaults to today when no date has been saved', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-01T12:00:00.000Z'));

    const result = getStartDate();

    expect(result.getUTCFullYear()).toBe(2024);
    expect(result.getUTCMonth()).toBe(2); // March
    expect(result.getUTCDate()).toBe(1);

    jest.useRealTimers();
  });

  it('persists the default date to localStorage when no date exists', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-01T00:00:00.000Z'));

    getStartDate();

    // Calling again should return the same saved date, not a new "today"
    jest.setSystemTime(new Date('2024-06-15T00:00:00.000Z'));
    const secondCall = getStartDate();
    expect(secondCall.getUTCMonth()).toBe(2); // Still March, not June

    jest.useRealTimers();
  });

  it('overwrites a previously saved start date', () => {
    saveStartDate('2024-01-01');
    saveStartDate('2024-06-15');
    const result = getStartDate();
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
  });
});

// ─── getMeals ─────────────────────────────────────────────────────────────────

describe('getMeals', () => {
  it('returns meals for all three times of day', () => {
    const meals = getMeals();
    expect(meals.Morning).toHaveLength(3);
    expect(meals.Afternoon).toHaveLength(3);
    expect(meals.Evening).toHaveLength(3);
  });

  it('morning meals are all type "all"', () => {
    const { Morning } = getMeals();
    Morning.forEach((meal) => expect(meal.type).toBe('all'));
  });

  it('afternoon meals are all type "one-of"', () => {
    const { Afternoon } = getMeals();
    Afternoon.forEach((meal) => expect(meal.type).toBe('one-of'));
  });

  it('afternoon meals include veggies', () => {
    const { Afternoon } = getMeals();
    Afternoon.forEach((meal) => expect(meal.includeVeggies).toBe(true));
  });

  it('every meal component has a name and category', () => {
    const meals = getMeals();
    Object.values(meals)
      .flat()
      .forEach((meal) => {
        meal.components.forEach((component) => {
          expect(component.name).toBeTruthy();
          expect(component.category).toBeTruthy();
        });
      });
  });
});
