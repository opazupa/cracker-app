import { globalCss } from '@nextui-org/react';

export const useGlobalStyles = globalCss({
  body: {
    padding: 0,
    margin: 0,
    height: '100vh',
  },
  html: {
    padding: 0,
    margin: 0,
    height: '100vh',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  '*': {
    boxSizing: 'border-box',
  },
});
