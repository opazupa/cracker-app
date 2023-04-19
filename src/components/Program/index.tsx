import { Collapse, Container, Spacer } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { MEALS } from '../../meals';
import { TimeOfTheDay } from '../../types';
import Meal from './Meal';

export const Program: React.FC<{ selectedTimeOfTheDay: TimeOfTheDay }> = ({
  selectedTimeOfTheDay,
}) => {
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
        {MEALS[selectedTimeOfTheDay].map((meals, i) => (
          <Collapse.Group key={i} shadow css={{ minWidth: '100%' }}>
            {meals.map((meal) => (
              <Collapse key={meal.name} title={meal.name} subtitle={meal.group}>
                <Meal meal={meal} />
              </Collapse>
            ))}
          </Collapse.Group>
        ))}
      </Container>
    </>
  );
};
