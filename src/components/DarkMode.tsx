import { Row, Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import React from 'react';

import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

export const DarkMode = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Row css={{ gap: '$1', alignItems: 'center' }}>
      <Switch
        bordered
        iconOff={<SunIcon filled />}
        iconOn={<MoonIcon filled />}
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
    </Row>
  );
};
