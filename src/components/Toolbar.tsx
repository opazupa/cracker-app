import { Navbar, Text } from '@nextui-org/react';

import { DarkMode } from './DarkMode';
import DayToggle from './Program/DayToggle';
import Multiplier from './Program/Multiplier';
import { Spinner } from './Spinner';

export function Toolbar() {
  return (
    <Navbar height={60} variant="floating">
      <Navbar.Brand>
        <Text h3 css={{ marginBottom: 0 }}>
          Let´s crack
          <Spinner />
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Toggle aria-label="toggle-menu" />
        <Navbar.Collapse css={{ marginTop: '-$5' }}>
          <Navbar.CollapseItem>
            <DarkMode />
            <Multiplier />
          </Navbar.CollapseItem>
          <Navbar.CollapseItem>
            <DayToggle />
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar.Content>
    </Navbar>
  );
}
