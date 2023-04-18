import { Button, Row } from '@nextui-org/react';
import React from 'react';

import { PROGRAM_DAYS, useAppContext } from '../hooks/useAppContext';

const DayToggle: React.FC = () => {
  const { programDay, setProgramDay } = useAppContext();
  return (
    <Row align="center">
      Program day
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
  );
};

export default DayToggle;
