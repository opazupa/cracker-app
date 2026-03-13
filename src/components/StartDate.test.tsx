import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@nextui-org/react', () => ({
  Input: ({ label, value, onChange, type }: any) => (
    <input aria-label={label} type={type} value={value} onChange={onChange} />
  ),
}));

jest.mock('../services', () => ({
  ...jest.requireActual('../services'),
  getStartDate: jest.fn().mockReturnValue(new Date('2024-01-15T00:00:00.000Z')),
  saveStartDate: jest.fn(),
}));

import { saveStartDate } from '../services';

import StartDate from './StartDate';

describe('StartDate', () => {
  beforeEach(() => jest.clearAllMocks());

  it('displays the start date formatted as yyyy-MM-dd', () => {
    render(<StartDate />);
    expect(screen.getByLabelText('Program start date')).toHaveValue(
      '2024-01-15',
    );
  });

  it('renders a date input', () => {
    render(<StartDate />);
    expect(screen.getByLabelText('Program start date')).toHaveAttribute(
      'type',
      'date',
    );
  });

  it('saves the new date when the input value changes', () => {
    render(<StartDate />);
    fireEvent.change(screen.getByLabelText('Program start date'), {
      target: { value: '2024-06-01' },
    });
    expect(jest.mocked(saveStartDate)).toHaveBeenCalledWith('2024-06-01');
  });

  it('does not save when the input is cleared', () => {
    render(<StartDate />);
    fireEvent.change(screen.getByLabelText('Program start date'), {
      target: { value: '' },
    });
    expect(jest.mocked(saveStartDate)).not.toHaveBeenCalled();
  });
});
