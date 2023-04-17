import { Collapse, Container, Spacer, useModal } from '@nextui-org/react';
import React from 'react';

import { MEALS } from '../../meals';
import DayToggle from './DayToggle';
import Meal from './Meal';
import MultiplierSlider from './MultiplierSlider';
import ReplaceModal from './ReplaceModal';

export const Program = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
      <Container display="flex" direction="column" css={{ gap: '$5' }}>
        <DayToggle />
        <MultiplierSlider />
      </Container>

      <Spacer y={2} />
      <Container
        display="flex"
        direction="column"
        alignItems="flex-start"
        css={{ gap: '$10' }}
      >
        {Object.entries(MEALS).map(([key, meals]) => (
          <Collapse.Group key={key} shadow css={{ minWidth: '100%' }}>
            {meals.map((meal) => (
              <Meal key={meal.name} meal={meal} />
            ))}
          </Collapse.Group>
        ))}
      </Container>

      <ReplaceModal setVisible={setVisible} bindings={bindings} />
    </>
  );
};
