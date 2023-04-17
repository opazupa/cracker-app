import { Collapse, Container, useModal } from '@nextui-org/react';
import React from 'react';

import { MEALS } from '../../meals';
import Meal from './Meal';
import ReplaceModal from './ReplaceModal';

export const Program = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
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
