import { Progress, Text } from '@nextui-org/react';

type Props = {
  total: number;
  completed: number;
};

export function MealCount({ total, completed }: Props) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <Text small>
        {completed}/{total} meals
      </Text>
      <Progress
        striped
        value={percentage}
        color={percentage === 100 ? 'success' : 'primary'}
        aria-label={`${completed} of ${total} meals completed`}
      />
    </div>
  );
}
