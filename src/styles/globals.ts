import { globalCss } from '@nextui-org/react';

export const useGlobalStyles = globalCss({
  body: {
    padding: 0,
    margin: 0,
    height: '100vh',
    fontFamily:
      'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
  },
  html: {
    padding: 0,
    margin: 0,
    height: '100vh',
    fontFamily:
      'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  '*': {
    boxSizing: 'border-box',
  },
});
