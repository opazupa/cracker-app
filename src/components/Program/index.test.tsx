import { render, screen } from '@testing-library/react';
import React from 'react';

import { Meals, TimeOfTheDay } from '../../types';

// ─── mocks ───

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('swiper/css', () => ({}));

jest.mock('@nextui-org/react', () => {
  const CollapseGroup = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  const Collapse = Object.assign(
    ({ children, title }: { children: React.ReactNode; title: string }) => (
      <div>
        <span>{title}</span>
        {children}
      </div>
    ),
    { Group: CollapseGroup },
  );
  return {
    Collapse,
    Container: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Row: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('./Meal', () => ({ __esModule: true, default: () => null }));

jest.mock('../MealCount', () => ({
  MealCount: ({ total, completed }: { total: number; completed: number }) => (
    <div
      data-testid="meal-count"
      data-total={String(total)}
      data-completed={String(completed)}
    />
  ),
}));

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  getMealForTimeOfTheDay: jest.fn(),
}));

jest.mock('../../hooks/useAppContext', () => ({
  useAppContext: jest.fn(),
}));

import { getMealForTimeOfTheDay } from '../../utils';
import { useAppContext } from '../../hooks/useAppContext';
import { Program } from './index';

// ─── helpers ───

const mockGetMealForTimeOfTheDay = jest.mocked(getMealForTimeOfTheDay);
const mockUseAppContext = jest.mocked(useAppContext);

const defaultContext = {
  programDay: '1-3' as const,
  mealMultiplierPercentage: 100,
  completedMealNames: [] as string[],
  toggleMealComplete: jest.fn(),
  calculateAmount: jest.fn().mockReturnValue(100),
  setMealMultiplier: jest.fn(),
  setProgramDay: jest.fn(),
};

// ─── fixtures ───

const makeMeal = (name: string) => ({
  name,
  group: 'afternoon' as const,
  type: 'all' as const,
  components: [
    { name: 'Rice' as const, category: 'carbs' as const, amount: 175 },
  ],
});

const meals: Meals = {
  Morning: [makeMeal('Porridge')],
  Afternoon: [makeMeal('Lunch 1'), makeMeal('Lunch 2'), makeMeal('Lunch 3')],
  Evening: [makeMeal('Dinner')],
};

// ─── setup ───

beforeEach(() => {
  jest.clearAllMocks();
  mockGetMealForTimeOfTheDay.mockReturnValue(TimeOfTheDay.Morning);
  mockUseAppContext.mockReturnValue(defaultContext);
});

// ─── totalMeals calculation ───

describe('Program — totalMeals', () => {
  it('counts Afternoon meals individually and other groups as 1 each', () => {
    // Morning (1) + Afternoon (3) + Evening (1) = 5
    render(<Program meals={meals} />);
    expect(screen.getByTestId('meal-count')).toHaveAttribute('data-total', '5');
  });

  it('counts a single Afternoon meal as 1', () => {
    const singleAfternoon: Meals = {
      Morning: [makeMeal('Porridge')],
      Afternoon: [makeMeal('Lunch')],
      Evening: [makeMeal('Dinner')],
    };
    // Morning (1) + Afternoon (1) + Evening (1) = 3
    render(<Program meals={singleAfternoon} />);
    expect(screen.getByTestId('meal-count')).toHaveAttribute('data-total', '3');
  });

  it('counts multiple Morning options as a single slot', () => {
    const multiMorning: Meals = {
      Morning: [makeMeal('Porridge'), makeMeal('Eggs')],
      Afternoon: [makeMeal('Lunch')],
      Evening: [makeMeal('Dinner')],
    };
    // Morning (1) + Afternoon (1) + Evening (1) = 3
    render(<Program meals={multiMorning} />);
    expect(screen.getByTestId('meal-count')).toHaveAttribute('data-total', '3');
  });

  it('handles an empty Afternoon group', () => {
    const noAfternoon: Meals = {
      Morning: [makeMeal('Porridge')],
      Afternoon: [],
      Evening: [makeMeal('Dinner')],
    };
    // Morning (1) + Afternoon (0) + Evening (1) = 2
    render(<Program meals={noAfternoon} />);
    expect(screen.getByTestId('meal-count')).toHaveAttribute('data-total', '2');
  });
});

// ─── completedCount ───

describe('Program — completedCount', () => {
  it('shows 0 completed when no meals are done', () => {
    render(<Program meals={meals} />);
    expect(screen.getByTestId('meal-count')).toHaveAttribute(
      'data-completed',
      '0',
    );
  });

  it('reflects completedMealNames length from context', () => {
    mockUseAppContext.mockReturnValue({
      ...defaultContext,
      completedMealNames: ['Lunch 1', 'Lunch 2'],
    });
    render(<Program meals={meals} />);
    expect(screen.getByTestId('meal-count')).toHaveAttribute(
      'data-completed',
      '2',
    );
  });

  it('shows all meals complete when completedMealNames covers all', () => {
    mockUseAppContext.mockReturnValue({
      ...defaultContext,
      completedMealNames: [
        'Porridge',
        'Lunch 1',
        'Lunch 2',
        'Lunch 3',
        'Dinner',
      ],
    });
    render(<Program meals={meals} />);
    expect(screen.getByTestId('meal-count')).toHaveAttribute(
      'data-completed',
      '5',
    );
  });
});

// ─── header display ───

describe('Program — header', () => {
  it.each([
    ['1-3' as const, 'Day 1-3'],
    ['4' as const, 'Day 4'],
    ['5' as const, 'Day 5'],
  ])('shows programDay %s', (day, expectedText) => {
    mockUseAppContext.mockReturnValue({ ...defaultContext, programDay: day });
    render(<Program meals={meals} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it.each([
    [100, 'x1'],
    [80, 'x0.8'],
    [120, 'x1.2'],
  ])('shows multiplier %i%% as %s', (percentage, expectedText) => {
    mockUseAppContext.mockReturnValue({
      ...defaultContext,
      mealMultiplierPercentage: percentage,
    });
    render(<Program meals={meals} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

// ─── meal slot rendering ───

describe('Program — meal slots', () => {
  it('renders meal names from all groups', () => {
    render(<Program meals={meals} />);
    expect(screen.getByText('Porridge')).toBeInTheDocument();
    expect(screen.getByText('Lunch 1')).toBeInTheDocument();
    expect(screen.getByText('Lunch 2')).toBeInTheDocument();
    expect(screen.getByText('Lunch 3')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
  });

  it('does not render content before getMealForTimeOfTheDay resolves', () => {
    mockGetMealForTimeOfTheDay.mockReturnValue(
      undefined as unknown as TimeOfTheDay,
    );
    render(<Program meals={meals} />);
    expect(screen.queryByTestId('meal-count')).not.toBeInTheDocument();
  });
});
