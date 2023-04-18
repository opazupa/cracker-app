import { Dropdown, Row } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../hooks/useAppContext';

type MenuItem = { key: string; name: string };
const MULTIPLIERS: MenuItem[] = [
  // key as in 100%
  { key: '100', name: 'x1' },
  { key: '110', name: 'x1.1' },
  { key: '150', name: 'x1.5' },
  { key: '200', name: 'x2' },
  { key: '300', name: 'x3' },
];

const MealMultiplier: React.FC = () => {
  const { mealMultiplierPercentage, setMealMultiplier } = useAppContext();
  const [selected, setSelected] = React.useState(
    new Set<string | number>([mealMultiplierPercentage.toString()]),
  );

  const handleSelection = (keys: Set<number | string> | 'all') => {
    if (typeof keys === 'string') return;
    setSelected(keys);
    setMealMultiplier(parseInt(keys.keys().next().value, 10));
  };

  return (
    <Row align="center">
      <Dropdown>
        <Dropdown.Button color="primary">
          {mealMultiplierPercentage / 100} x meal
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Meal multiplier"
          items={MULTIPLIERS}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          textColor="primary"
          onSelectionChange={handleSelection}
        >
          {(item) => (
            <Dropdown.Item key={(item as MenuItem).key}>
              {(item as MenuItem).name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
};

export default MealMultiplier;
