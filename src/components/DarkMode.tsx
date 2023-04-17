import { Row, Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import React from 'react';

export const DarkMode = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <>
      <Row css={{ gap: '$1' }}>
        Dark&nbsp;
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </Row>
    </>
  );
};
