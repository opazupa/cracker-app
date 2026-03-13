import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Footer } from './Footer';

jest.mock('@nextui-org/react', () => ({
  Text: ({ children, onClick }: any) => (
    <span onClick={onClick}>{children}</span>
  ),
}));

jest.mock('canvas-confetti', () => jest.fn());

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  celebrate: jest.fn(),
}));

import { celebrate } from '../utils';

describe('Footer', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the app version', () => {
    render(<Footer />);
    expect(screen.getByText(/v\d+\.\d+\.\d+/)).toBeInTheDocument();
  });

  it('calls celebrate when the emoji is clicked', () => {
    render(<Footer />);
    fireEvent.click(screen.getByText('😈'));
    expect(jest.mocked(celebrate)).toHaveBeenCalledTimes(1);
  });
});
