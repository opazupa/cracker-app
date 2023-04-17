import { Dropdown, Row } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';

type MenuItem = { key: string; name: string };

const Multiplier: React.FC = () => {
  const { mealMultiplier, setMealMultiplier } = useAppContext();
  const [selected, setSelected] = React.useState(
    new Set<string | number>([mealMultiplier.toString()]),
  );

  const multipliers: MenuItem[] = [
    { key: '100', name: 'x1' },
    { key: '110', name: 'x1.1' },
    { key: '150', name: 'x1.5' },
    { key: '200', name: 'x2' },
    { key: '300', name: 'x3' },
  ];

  return (
    <Row align="center">
      <Dropdown>
        <Dropdown.Button color="secondary" flat>
          {mealMultiplier / 100} x meal
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Meal multiplier"
          color="secondary"
          items={multipliers}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={(keys) => {
            if (typeof keys === 'string') return;
            setSelected(keys);
            setMealMultiplier(parseInt(keys.keys().next().value, 10));
          }}
        >
          {/* TODO type? */}
          {(item: any) => (
            <Dropdown.Item key={item.key} color="secondary">
              {item.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
};

export default Multiplier;
