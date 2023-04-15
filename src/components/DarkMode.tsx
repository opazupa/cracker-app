import { Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import React from 'react';

export const DarkMode = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <>
      <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
    </>
  );
};
