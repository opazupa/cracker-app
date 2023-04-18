import {
  Checkbox,
  Col,
  Container,
  Divider,
  Row,
  Text,
  useModal,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { Food, Meal as MealType } from '../../types';
import {
  calculateAmount,
  celebrate,
  convert,
  isMain,
  mealChecked,
} from '../../utils';
import CodeLink from '../CodeLink';
import ReplaceModal from './ReplaceModal';

export const MealComponent: React.FC<{
  component: Food;
  replacement?: Food;
  onCheck: (checked: boolean, component: Food) => void;
  onSelect: (component: Food) => void;
  onReset: (component: Food) => void;
}> = ({ component, onCheck, onSelect, replacement, onReset }) => {
  const { mealMultiplier, programDay } = useAppContext();

  const calculatedAmount = calculateAmount(
    component,
    mealMultiplier,
    programDay,
  );
  return (
    <>
      <style jsx>{`
        .grow {
          margin-left: auto;
        }
        .replaced {
          opacity: 0.4;
          text-decoration: line-through;
        }
      `}</style>
      <li>
        <Row align="center" css={{ gap: '$3' }}>
          <Checkbox
            color="success"
            onChange={(isSelected) => onCheck(isSelected, component)}
          />
          <Col css={{ display: 'flex', flexDirection: 'column' }}>
            <span className={replacement ? 'replaced' : ''}>
              {calculatedAmount && `${calculatedAmount}g`} {component.name}{' '}
              {component.category === 'extra' && '(extra)'}
            </span>

            {replacement && (
              <span>
                {calculatedAmount &&
                  `${convert(
                    calculatedAmount,
                    component.name,
                    replacement.name,
                  )}g`}{' '}
                {replacement.name}
              </span>
            )}
          </Col>
          {!component.unConvertible && (
            <span className="grow">
              {replacement ? (
                <CodeLink text="❌" onClick={() => onReset(component)} />
              ) : (
                <CodeLink text="👉" onClick={() => onSelect(component)} />
              )}
            </span>
          )}
        </Row>
      </li>
    </>
  );
};

const Meal: React.FC<{ meal: MealType }> = ({ meal }) => {
  const { setVisible, bindings } = useModal();
  const [checked, setChecked] = useState<Food[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Food>();
  const [replacements, setReplacements] = useState<Record<string, Food>>({});

  const handleCheck = (isSelected: boolean, food: Food) => {
    if (isSelected) setChecked([food, ...checked]);
    else {
      setChecked(checked.filter((c) => c.name !== food.name));
    }
  };

  const handleSelect = (component: Food) => {
    setSelectedComponent(component);
    setVisible(true);
  };

  const handleReset = (component: Food) => {
    const modified = { ...replacements };
    delete modified[component.name];
    setReplacements(modified);
  };

  const onReplace = (toReplace: string, replacement: Food) => {
    setReplacements({ ...replacements, [toReplace]: replacement });
  };

  useEffect(() => {
    if (mealChecked(meal, checked)) {
      celebrate();
    }
  }, [checked, meal]);

  return (
    <>
      <ReplaceModal
        setVisible={setVisible}
        component={selectedComponent}
        onReplace={onReplace}
        bindings={bindings}
      />
      {isMain(meal) && meal.type === 'one-of' ? (
        <>
          <Container>
            <Row align="center" justify="center">
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
                  replacement={replacements[component.name]}
                  component={component}
                  onCheck={handleCheck}
                  onSelect={handleSelect}
                  onReset={handleReset}
                />
              ))}
            <Divider css={{ margin: '$5 0' }} />
            <Text b>Select one 🍖</Text>
            {meal.components
              .filter((component) => component.category === 'proteins')
              .map((component) => (
                <MealComponent
                  key={component.name}
                  replacement={replacements[component.name]}
                  component={component}
                  onCheck={handleCheck}
                  onSelect={handleSelect}
                  onReset={handleReset}
                />
              ))}
            <Divider css={{ margin: '$5 0' }} />
            <Text b>Select one 🥑</Text>
            {meal.components
              .filter((component) => component.category === 'fats')
              .map((component) => (
                <MealComponent
                  key={component.name}
                  replacement={replacements[component.name]}
                  component={component}
                  onCheck={handleCheck}
                  onSelect={handleSelect}
                  onReset={handleReset}
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
                replacement={replacements[component.name]}
                component={component}
                onCheck={handleCheck}
                onSelect={handleSelect}
                onReset={handleReset}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Meal;
