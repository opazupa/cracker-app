import { createTheme } from '@nextui-org/react';

const fonts = {
  mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
  sans: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
};

export const light = createTheme({
  type: 'light',
  theme: {
    fonts: fonts,
    colors: {
      primary: '#105b63',
      primaryLight: 'transparent',
      primaryLightContrast: '#105b63',
      secondary: '#105b63',
      error: '#EE457E',
    },
  },
});

export const dark = createTheme({
  type: 'dark',
  theme: {
    fonts: fonts,
    colors: {
      primary: '#105b63',
      primaryLight: 'transparent',
      primaryLightContrast: '#105b63',
      secondary: '#105b63',
      error: '#EE457E',
    },
  },
});
