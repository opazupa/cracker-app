import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

const mockSetProgramDay = jest.fn();

jest.mock('../hooks/useAppContext', () => ({
  useAppContext: jest.fn().mockReturnValue({
    programDay: '1-3',
    setProgramDay: mockSetProgramDay,
  }),
  PROGRAM_DAYS: ['1-3', '4', '5'],
}));

jest.mock('@nextui-org/react', () => {
  const Button = ({ children, onPress, light }: any) => (
    <button onClick={onPress} data-selected={!light}>
      {children}
    </button>
  );
  // eslint-disable-next-line react/display-name
  Button.Group = ({ children }: any) => <div role="group">{children}</div>;
  return {
    Button,
    Row: ({ children }: any) => <div>{children}</div>,
    Text: ({ children }: any) => <span>{children}</span>,
  };
});

import DayToggle from './DayToggle';

describe('DayToggle', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders a button for each program day', () => {
    render(<DayToggle />);
    expect(screen.getByText('1-3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('marks the current program day as selected', () => {
    render(<DayToggle />);
    expect(screen.getByText('1-3').closest('button')).toHaveAttribute(
      'data-selected',
      'true',
    );
    expect(screen.getByText('4').closest('button')).toHaveAttribute(
      'data-selected',
      'false',
    );
  });

  it('calls setProgramDay with the clicked day', () => {
    render(<DayToggle />);
    fireEvent.click(screen.getByText('4'));
    expect(mockSetProgramDay).toHaveBeenCalledWith('4');
  });

  it('calls setProgramDay with the correct day for each button', () => {
    render(<DayToggle />);
    fireEvent.click(screen.getByText('5'));
    expect(mockSetProgramDay).toHaveBeenCalledWith('5');
  });
});
