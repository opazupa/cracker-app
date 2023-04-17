import { Input, Row } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';

const MultiplierSlider: React.FC = () => {
  const { mealMultiplier, setMealMultiplier } = useAppContext();

  return (
    <Row align="center">
      <Input
        type="range"
        value={mealMultiplier}
        min={100}
        step={10}
        max={300}
        status="secondary"
        onChange={({ target }) => setMealMultiplier(parseInt(target.value, 10))}
      />
      &nbsp;{mealMultiplier / 100} x meal
    </Row>
  );
};

export default MultiplierSlider;
