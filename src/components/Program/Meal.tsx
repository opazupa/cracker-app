import {
  Checkbox,
  Collapse,
  Container,
  Divider,
  Row,
  Text,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { calculateAmount, isMain, mealChecked } from '../../meals';
import { Food, Meal as MealType } from '../../types';
import { celebrate } from '../../utils';

const MealComponent: React.FC<{
  component: Food;
  onCheck: (checked: boolean, component: Food) => void;
}> = ({ component, onCheck }) => {
  const { mealMultiplier, programDay } = useAppContext();
  return (
    <li>
      <Row align="center" css={{ gap: '$3' }}>
        <Checkbox
          color="success"
          onChange={(isSelected) => onCheck(isSelected, component)}
        />
        {component.amount &&
          `${calculateAmount(component, mealMultiplier, programDay)}g`}{' '}
        {component.name} {component.category === 'extra' && '(extra)'}
      </Row>
    </li>
  );
};

const Meal: React.FC<{ meal: MealType }> = ({ meal }) => {
  const [checked, setChecked] = useState<Food[]>([]);

  const handleCheck = (isSelected: boolean, food: Food) => {
    if (isSelected) setChecked([food, ...checked]);
    else {
      setChecked(checked.filter((c) => c.name !== food.name));
    }
  };

  useEffect(() => {
    if (
      mealChecked(meal, checked)
      // // Sparkle confetti when one of each category is selected
      // (meal.type === 'one-of' &&
      //   checked.some((c) => c.category === 'carbs') &&
      //   checked.some((c) => c.category === 'proteins') &&
      //   checked.some((c) => c.category === 'fats')) ||
      // // Sparkle confetti when all of components are selected
      // (meal.type === 'all' && checked.length === meal.components.length)
    ) {
      celebrate();
    }
  }, [checked, meal]);

  return (
    <Collapse title={meal.name} subtitle={meal.type === 'all' && meal.group}>
      {isMain(meal) && meal.type === 'one-of' ? (
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
                <MealComponent
                  key={component.name}
                  component={component}
                  onCheck={handleCheck}
                />
              ))}
            <Divider css={{ margin: '$5 0' }} />
            <Text b>Select one 🍖</Text>
            {meal.components
              .filter((component) => component.category === 'proteins')
              .map((component) => (
                <MealComponent
                  key={component.name}
                  component={component}
                  onCheck={handleCheck}
                />
              ))}
            <Divider css={{ margin: '$5 0' }} />
            <Text b>Select one 🥑</Text>
            {meal.components
              .filter((component) => component.category === 'fats')
              .map((component) => (
                <MealComponent
                  key={component.name}
                  component={component}
                  onCheck={handleCheck}
                />
              ))}
          </ul>
        </>
      ) : (
        <>
          <ul>
            {meal.components.map((component) => (
              <MealComponent
                key={component.name}
                component={component}
                onCheck={handleCheck}
              />
            ))}
          </ul>
        </>
      )}
    </Collapse>
  );
};

export default Meal;
