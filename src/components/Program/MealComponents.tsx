import { Container, Divider, Row, Text } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { calculateAmount, isMain } from '../../meals';
import { Food, Meal } from '../../types';

const MealComponent: React.FC<{ component: Food }> = ({ component }) => {
  const { mealMultiplier, programDay } = useAppContext();
  return (
    <li>
      {component.amount &&
        `${calculateAmount(component, mealMultiplier, programDay)}g`}{' '}
      {component.name} {component.category === 'extra' && '(extra)'}
    </li>
  );
};

const MealComponents: React.FC<{ meal: Meal }> = ({ meal }) => {
  return isMain(meal) && meal.type === 'one-of' ? (
    <>
      <Container>
        <Row align="center">
          <code>Include 150g+ veggies 🥦</code>
        </Row>
      </Container>
      <ul>
        <Divider css={{ margin: '$5 0' }} />
        <Text b>Select one 🍠</Text>
        {meal.components
          .filter((component) => component.category === 'carbs')
          .map((component) => (
            <MealComponent key={component.name} component={component} />
          ))}
        <Divider css={{ margin: '$5 0' }} />
        <Text b>Select one 🍖</Text>
        {meal.components
          .filter((component) => component.category === 'proteins')
          .map((component) => (
            <MealComponent key={component.name} component={component} />
          ))}
        <Divider css={{ margin: '$5 0' }} />
        <Text b>Select one 🥑</Text>
        {meal.components
          .filter((component) => component.category === 'fats')
          .map((component) => (
            <MealComponent key={component.name} component={component} />
          ))}
      </ul>
    </>
  ) : (
    <>
      <ul>
        {meal.components.map((component) => (
          <MealComponent key={component.name} component={component} />
        ))}
      </ul>
    </>
  );
};

export default MealComponents;
