import { Button, Row, Text } from '@nextui-org/react';
import React from 'react';

import { PROGRAM_DAYS, useAppContext } from '../../hooks/useAppContext';

const DayToggle: React.FC = () => {
  const { programDay, setProgramDay } = useAppContext();
  return (
    <>
      <Row align="center">
        <Text b>Program day</Text>
        <Button.Group color="primary">
          {PROGRAM_DAYS.map((day) => (
            <Button
              key={day}
              light={programDay !== day}
              onPress={() => setProgramDay(day)}
            >
              {day}
            </Button>
          ))}
        </Button.Group>
      </Row>
    </>
  );
};

export default DayToggle;
