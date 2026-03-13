import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@nextui-org/react', () => ({
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  Progress: ({
    value,
    'aria-label': ariaLabel,
  }: {
    value: number;
    'aria-label': string;
  }) => <div role="progressbar" aria-valuenow={value} aria-label={ariaLabel} />,
}));

import { MealCount } from './MealCount';

// ─── renders ───

describe('MealCount', () => {
  it('renders the count text', () => {
    render(<MealCount total={5} completed={3} />);
    expect(screen.getByText('3/5 meals')).toBeInTheDocument();
  });

  it('renders an accessible progress bar', () => {
    render(<MealCount total={5} completed={3} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-label', '3 of 5 meals completed');
  });

  // ─── progress value ───

  it('sets progress to 60 when 3 of 5 are complete', () => {
    render(<MealCount total={5} completed={3} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '60',
    );
  });

  it('sets progress to 100 when all meals are complete', () => {
    render(<MealCount total={4} completed={4} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
  });

  it('sets progress to 0 when no meals are complete', () => {
    render(<MealCount total={4} completed={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });

  // ─── edge cases ───

  it('handles total of 0 without dividing by zero', () => {
    render(<MealCount total={0} completed={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });
});
