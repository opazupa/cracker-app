import { Button, Row } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { PROGRAM_DAYS, useAppContext } from '../hooks/useAppContext';
import { ProgramDay } from '../types';

const DayToggle: React.FC = () => {
  const [selected, setSelected] = useState<ProgramDay | null>(null);
  const { programDay, setProgramDay } = useAppContext();

  useEffect(() => {
    setSelected(programDay);
  }, [programDay]);

  return (
    selected && (
      <Row align="center">
        Program day
        <Button.Group color="primary">
          {PROGRAM_DAYS.map((day) => (
            <Button
              key={day}
              light={selected !== day}
              onPress={() => setProgramDay(day)}
            >
              {day}
            </Button>
          ))}
        </Button.Group>
      </Row>
    )
  );
};

export default DayToggle;
