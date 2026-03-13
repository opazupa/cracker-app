import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import CodeLink from './CodeLink';

describe('CodeLink', () => {
  it('renders the provided text', () => {
    render(<CodeLink text="replace" />);
    expect(screen.getByText('replace')).toBeInTheDocument();
  });

  it('renders as a code element', () => {
    const { container } = render(<CodeLink text="👉" />);
    expect(container.querySelector('code')).toHaveTextContent('👉');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<CodeLink text="replace" onClick={onClick} />);
    fireEvent.click(screen.getByText('replace'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw when onClick is not provided', () => {
    render(<CodeLink text="replace" />);
    expect(() => fireEvent.click(screen.getByText('replace'))).not.toThrow();
  });
});
