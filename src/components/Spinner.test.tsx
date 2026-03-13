import { render, screen } from '@testing-library/react';
import React from 'react';

import { Spinner } from './Spinner';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, width, height }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} width={width} height={height} />
  ),
}));

describe('Spinner', () => {
  it('renders an image with the loader alt text', () => {
    render(<Spinner />);
    expect(screen.getByRole('img', { name: 'loader' })).toBeInTheDocument();
  });

  it('uses the default size of 40', () => {
    render(<Spinner />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '40');
    expect(img).toHaveAttribute('height', '40');
  });

  it('applies a custom size', () => {
    render(<Spinner size={25} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '25');
    expect(img).toHaveAttribute('height', '25');
  });

  it('wraps the image in an element with the loader class', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.loader')).toBeInTheDocument();
  });
});
