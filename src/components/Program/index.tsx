import { Collapse, Container, Spacer } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { MEALS } from '../../meals';
import Meal from './Meal';

export const Program = () => {
  const { mealMultiplierPercentage, programDay } = useAppContext();
  return (
    <>
      <Container display="flex" css={{ gap: '$1' }}>
        <code>Day {programDay}</code>
        <code>x{mealMultiplierPercentage / 100}</code>
      </Container>
      <Spacer y={0.5} />
      <Container
        display="flex"
        direction="column"
        alignItems="flex-start"
        css={{ gap: '$10' }}
      >
        {Object.entries(MEALS).map(([key, meals]) => (
          <Collapse.Group key={key} shadow css={{ minWidth: '100%' }}>
            {meals.map((meal) => (
              <Collapse
                key={meal.name}
                title={meal.name}
                subtitle={meal.type === 'all' && meal.group}
              >
                <Meal meal={meal} />
              </Collapse>
            ))}
          </Collapse.Group>
        ))}
      </Container>
    </>
  );
};
