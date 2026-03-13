import { Collapse, Container, Row } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppContext } from '../../hooks/useAppContext';
import { Meals, TimeOfTheDay } from '../../types';
import { getMealForTimeOfTheDay } from '../../utils';
import { MealCount } from '../MealCount';
import Meal from './Meal';

import 'swiper/css';

export const Program: React.FC<{ meals: Meals }> = ({ meals }) => {
  const [currentTimeOfTheDay, setCurrent] = useState<TimeOfTheDay>();
  const { mealMultiplierPercentage, programDay, completedMealNames } =
    useAppContext();
  // Morning and Evening are pick-one slots (count as 1 each); Afternoon meals all count
  const totalMeals = Object.entries(meals).reduce(
    (sum, [group, options]) =>
      sum + (group === 'Afternoon' ? options.length : 1),
    0,
  );
  const completedCount = completedMealNames.length;

  useEffect(() => {
    setCurrent(getMealForTimeOfTheDay());
  }, []);

  return (
    <>
      {currentTimeOfTheDay !== undefined && (
        <Container display="flex" direction="column" css={{ flex: '1' }} fluid>
          <Row css={{ gap: '$3' }}>
            <code>Day {programDay}</code>
            <code>x{mealMultiplierPercentage / 100}</code>
          </Row>
          <MealCount total={totalMeals} completed={completedCount} />
          <Swiper
            spaceBetween={50}
            style={{
              width: '100vw',
              padding: '0.5rem 1.5rem 2rem',
              margin: '0 -1.5rem',
            }}
            initialSlide={currentTimeOfTheDay}
            slidesPerView="auto"
          >
            {Object.entries(meals).map(([group, options]) => (
              <SwiperSlide key={group}>
                <Collapse.Group splitted style={{ padding: 0 }}>
                  {options.map((meal) => (
                    <Collapse
                      key={meal.name}
                      title={meal.name}
                      subtitle={meal.group}
                    >
                      <Meal meal={meal} />
                    </Collapse>
                  ))}
                </Collapse.Group>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}
    </>
  );
};
