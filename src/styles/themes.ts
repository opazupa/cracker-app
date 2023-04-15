import { createTheme, Theme } from '@nextui-org/react';

const sharedTheme: Theme = {
  theme: {
    colors: {
      primary: '#FFD34E',
      primaryLight: 'transparent',
      error: '#EE457E',
    },
    fonts: {
      monospace:
        'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
    },
  },
};

export const light = createTheme({
  type: 'light',
  ...sharedTheme,
});

export const dark = createTheme({
  type: 'dark',
  ...sharedTheme,
});
