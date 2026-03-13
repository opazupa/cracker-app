import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('../hooks/useAppContext', () => ({
  useAppContext: jest.fn(),
  PROGRAM_DAYS: ['1-3', '4', '5'],
}));

jest.mock('@nextui-org/react', () => {
  const Button = ({
    children,
    onPress,
    light,
  }: {
    children: React.ReactNode;
    onPress: () => void;
    light?: boolean;
  }) => (
    <button onClick={onPress} data-selected={!light}>
      {children}
    </button>
  );
  // eslint-disable-next-line react/display-name
  Button.Group = ({ children }: { children: React.ReactNode }) => (
    <div role="group">{children}</div>
  );
  return {
    Button,
    Row: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Text: ({ children }: { children: React.ReactNode }) => (
      <span>{children}</span>
    ),
  };
});

import { useAppContext } from '../hooks/useAppContext';
import DayToggle from './DayToggle';

const mockUseAppContext = jest.mocked(useAppContext);

describe('DayToggle', () => {
  const mockSetProgramDay = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppContext.mockReturnValue({
      programDay: '1-3',
      setProgramDay: mockSetProgramDay,
    } as unknown as ReturnType<typeof useAppContext>);
  });

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
