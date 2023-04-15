import { createTheme } from '@nextui-org/react';

const fonts = {
  monospace:
    'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
};

export const light = createTheme({
  type: 'light',
  theme: {
    fonts: fonts,
    colors: {
      primary: '#7928c9',
      primaryLight: 'transparent',
      secondary: '#FFD34E',
      error: '#EE457E',
    },
  },
});

export const dark = createTheme({
  type: 'dark',
  theme: {
    fonts: fonts,
    colors: {
      primary: '#FFD34E',
      primaryLight: 'transparent',
      secondary: '#FFD34E',
      error: '#EE457E',
    },
  },
});
