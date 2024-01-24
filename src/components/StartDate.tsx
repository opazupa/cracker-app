import { Input } from '@nextui-org/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { getStartDate, saveStartDate } from '../services';

const StartDate: React.FC = () => {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    setDate(format(getStartDate(), 'yyyy-MM-dd'));
  }, []);

  return (
    <Input
      label="Program start date"
      color="primary"
      type="date"
      value={date}
      bordered
      shadow={false}
      required
      onChange={({ target }) => {
        if (target.value) {
          setDate(target.value);
          saveStartDate(target.value);
        }
      }}
    />
  );
};

export default StartDate;
