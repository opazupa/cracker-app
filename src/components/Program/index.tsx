import { Collapse, Container, Row } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppContext } from '../../hooks/useAppContext';
import { MEALS } from '../../meals';
import { TimeOfTheDay } from '../../types';
import { getMealForTimeOfTheDay } from '../../utils';
import Meal from './Meal';

import 'swiper/css';
import 'swiper/css/virtual';

export const Program: React.FC = () => {
  const [currentTimeOfTheDay, setCurrent] = useState<TimeOfTheDay>();
  const { mealMultiplierPercentage, programDay } = useAppContext();

  useEffect(() => {
    setCurrent(getMealForTimeOfTheDay());
  }, []);

  if (currentTimeOfTheDay === undefined) return null;

  return (
    <>
      <Container display="flex" fluid>
        <Row css={{ gap: '$3' }}>
          <code>Day {programDay}</code>
          <code>x{mealMultiplierPercentage / 100}</code>
        </Row>
        <Swiper
          spaceBetween={50}
          style={{
            width: '100vw',
            padding: '0.5rem 1.5rem 2rem',
            margin: '0 -1.5rem',
          }}
          initialSlide={getMealForTimeOfTheDay()}
          slidesPerView="auto"
        >
          {Object.entries(MEALS).map(([group, options]) => (
            <SwiperSlide key={group}>
              <Collapse.Group shadow>
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
    </>
  );
};
