import { Navbar, Text } from '@nextui-org/react';

import { DarkMode, Spinner } from '../components';
import DayToggle from './Program/DayToggle';
import MultiplierSlider from './Program/MultiplierSlider';

export function Toolbar() {
  return (
    <>
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
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <DayToggle />
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <MultiplierSlider />
            </Navbar.CollapseItem>
          </Navbar.Collapse>
        </Navbar.Content>
      </Navbar>
    </>
  );
}
