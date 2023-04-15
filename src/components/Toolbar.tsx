import { Navbar, Text } from '@nextui-org/react';

import { DarkMode, Spinner } from '../components';

export function Toolbar() {
  return (
    <Navbar height={60} isCompact variant="floating">
      <Navbar.Brand>
        <Text h3 css={{ marginBottom: 0 }}>
          Let´s crack&nbsp; <Spinner />
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <DarkMode />
      </Navbar.Content>
    </Navbar>
  );
}
