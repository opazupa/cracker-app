import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Meal as MealType } from '../../types';

const mockSetVisible = jest.fn();

jest.mock('@nextui-org/react', () => ({
  Checkbox: ({ onChange, 'aria-label': ariaLabel }: any) => (
    <input
      type="checkbox"
      aria-label={ariaLabel}
      onChange={(e) => onChange?.(e.target.checked)}
    />
  ),
  Col: ({ children }: any) => <div>{children}</div>,
  Row: ({ children }: any) => <div>{children}</div>,
  Divider: () => <hr />,
  Text: ({ children }: any) => <span>{children}</span>,
  useModal: () => ({ setVisible: mockSetVisible, bindings: {} }),
}));

jest.mock('./ReplaceModal', () => ({ __esModule: true, default: () => null }));

jest.mock('canvas-confetti', () => jest.fn());

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  celebrate: jest.fn(),
}));

jest.mock('../../hooks/useAppContext', () => ({
  useAppContext: jest.fn(),
}));

import { useAppContext } from '../../hooks/useAppContext';
import Meal from './Meal';
import { celebrate } from '../../utils';

const mockUseAppContext = jest.mocked(useAppContext);
const mockToggleMealComplete = jest.fn();

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const allMeal: MealType = {
  name: 'Porridge',
  group: 'morning',
  type: 'all',
  components: [
    { name: 'Oats (dry)', category: 'carbs', amount: 50 },
    { name: 'Cottage cheese (2%)', category: 'proteins', amount: 100 },
  ],
};

const oneOfMeal: MealType = {
  name: 'Lunch',
  group: 'afternoon',
  type: 'one-of',
  includeVeggies: true,
  components: [
    { name: 'Rice', category: 'carbs', amount: 175 },
    { name: 'Chicken', category: 'proteins', amount: 90 },
    { name: 'Olive oil', category: 'fats', amount: 5 },
  ],
};

// ─── type 'all' ───────────────────────────────────────────────────────────────

describe("Meal type 'all'", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppContext.mockReturnValue({
      programDay: '1-3',
      mealMultiplierPercentage: 100,
      setMealMultiplier: jest.fn(),
      setProgramDay: jest.fn(),
      completedMealNames: [],
      calculateAmount: (food: MealType['components'][number]) =>
        food.amount ?? null,
      toggleMealComplete: mockToggleMealComplete,
    });
  });

  it('renders all food items with their amounts', () => {
    render(<Meal meal={allMeal} />);
    expect(screen.getByText(/Oats \(dry\)/)).toBeInTheDocument();
    expect(screen.getByText(/Cottage cheese \(2%\)/)).toBeInTheDocument();
    expect(screen.getByText(/50g/)).toBeInTheDocument();
    expect(screen.getByText(/100g/)).toBeInTheDocument();
  });

  it('shows the replace link for convertible foods', () => {
    render(<Meal meal={allMeal} />);
    // Both 'Oats (dry)' and 'Cottage cheese (2%)' are convertible
    expect(screen.getAllByText('👉')).toHaveLength(2);
  });

  it('does not show a replace link for unConvertible foods', () => {
    const mealWithUnconvertible: MealType = {
      ...allMeal,
      components: [
        { name: 'Oats (dry)', category: 'carbs', amount: 50 },
        { name: 'Egg', category: 'proteins', amount: 55, unConvertible: true },
      ],
    };
    render(<Meal meal={mealWithUnconvertible} />);
    // Only 'Oats (dry)' is convertible
    expect(screen.getAllByText('👉')).toHaveLength(1);
  });

  it('opens the replace modal when the replace link is clicked', () => {
    render(<Meal meal={allMeal} />);
    fireEvent.click(screen.getAllByText('👉')[0]);
    expect(mockSetVisible).toHaveBeenCalledWith(true);
  });

  it('calls celebrate and toggleMealComplete when all items are checked', () => {
    render(<Meal meal={allMeal} />);
    const checkboxes = screen.getAllByLabelText('checked');
    // allMeal has 2 components
    fireEvent.click(checkboxes[0]);
    expect(mockToggleMealComplete).not.toHaveBeenCalled();
    fireEvent.click(checkboxes[1]);
    expect(jest.mocked(celebrate)).toHaveBeenCalledTimes(1);
    expect(mockToggleMealComplete).toHaveBeenCalledWith(allMeal.name);
  });

  it('does not call celebrate when only some items are checked', () => {
    render(<Meal meal={allMeal} />);
    const checkboxes = screen.getAllByLabelText('checked');
    fireEvent.click(checkboxes[0]);
    expect(jest.mocked(celebrate)).not.toHaveBeenCalled();
  });
});

// ─── type 'one-of' ────────────────────────────────────────────────────────────

describe("Meal type 'one-of'", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppContext.mockReturnValue({
      programDay: '1-3',
      mealMultiplierPercentage: 100,
      setMealMultiplier: jest.fn(),
      setProgramDay: jest.fn(),
      completedMealNames: [],
      calculateAmount: (food: MealType['components'][number]) =>
        food.amount ?? null,
      toggleMealComplete: mockToggleMealComplete,
    });
  });

  it('renders all food items', () => {
    render(<Meal meal={oneOfMeal} />);
    expect(screen.getByText(/Rice/)).toBeInTheDocument();
    expect(screen.getByText(/Chicken/)).toBeInTheDocument();
    expect(screen.getByText(/Olive oil/)).toBeInTheDocument();
  });

  it('shows category headings', () => {
    render(<Meal meal={oneOfMeal} />);
    expect(screen.getByText(/Select one 🍠/)).toBeInTheDocument();
    expect(screen.getByText(/Select one 🍖/)).toBeInTheDocument();
    expect(screen.getByText(/Select one 🥑/)).toBeInTheDocument();
  });

  it('renders a veggies checkbox when includeVeggies is true', () => {
    render(<Meal meal={oneOfMeal} />);
    expect(screen.getByText(/Veggies/)).toBeInTheDocument();
  });

  it('does not render a veggies section when includeVeggies is false', () => {
    const noVeggiesMeal: MealType = { ...oneOfMeal, includeVeggies: false };
    render(<Meal meal={noVeggiesMeal} />);
    expect(screen.queryByText(/Veggies/)).not.toBeInTheDocument();
  });

  it('calls celebrate and toggleMealComplete only after one per category AND veggies are checked', () => {
    render(<Meal meal={oneOfMeal} />);
    // DOM order: veggies[0], rice[1], chicken[2], olive oil[3]
    const checkboxes = screen.getAllByLabelText('checked');

    fireEvent.click(checkboxes[1]); // rice
    fireEvent.click(checkboxes[2]); // chicken
    fireEvent.click(checkboxes[3]); // olive oil
    // meal is complete but veggies not checked
    expect(mockToggleMealComplete).not.toHaveBeenCalled();

    fireEvent.click(checkboxes[0]); // veggies
    expect(jest.mocked(celebrate)).toHaveBeenCalledTimes(1);
    expect(mockToggleMealComplete).toHaveBeenCalledWith(oneOfMeal.name);
  });

  it('does not call celebrate when meal is checked but veggies are missing', () => {
    render(<Meal meal={oneOfMeal} />);
    const checkboxes = screen.getAllByLabelText('checked');
    fireEvent.click(checkboxes[1]); // rice
    fireEvent.click(checkboxes[2]); // chicken
    fireEvent.click(checkboxes[3]); // olive oil
    expect(jest.mocked(celebrate)).not.toHaveBeenCalled();
  });
});

// ─── toggleMealComplete ────────────────────────────────────────────────────────

describe('Meal — toggleMealComplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppContext.mockReturnValue({
      programDay: '1-3',
      mealMultiplierPercentage: 100,
      setMealMultiplier: jest.fn(),
      setProgramDay: jest.fn(),
      completedMealNames: [],
      calculateAmount: (food: MealType['components'][number]) =>
        food.amount ?? null,
      toggleMealComplete: mockToggleMealComplete,
    });
  });

  it('calls toggleMealComplete with the meal name when all items are checked', () => {
    render(<Meal meal={allMeal} />);
    const checkboxes = screen.getAllByLabelText('checked');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    expect(mockToggleMealComplete).toHaveBeenCalledWith(allMeal.name);
  });

  it('does not call toggleMealComplete before the meal is complete', () => {
    render(<Meal meal={allMeal} />);
    fireEvent.click(screen.getAllByLabelText('checked')[0]);
    expect(mockToggleMealComplete).not.toHaveBeenCalled();
  });

  it('calls toggleMealComplete for one-of meal only after veggies are checked', () => {
    render(<Meal meal={oneOfMeal} />);
    const checkboxes = screen.getAllByLabelText('checked');
    fireEvent.click(checkboxes[1]); // rice
    fireEvent.click(checkboxes[2]); // chicken
    fireEvent.click(checkboxes[3]); // olive oil
    expect(mockToggleMealComplete).not.toHaveBeenCalled();
    fireEvent.click(checkboxes[0]); // veggies
    expect(mockToggleMealComplete).toHaveBeenCalledWith(oneOfMeal.name);
  });
});
