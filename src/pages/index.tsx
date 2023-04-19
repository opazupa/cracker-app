import { Container } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Footer, Program, Toolbar } from '../components';
import styles from '../styles/Home.module.css';
import { getTimeOfTheDay, nextTimeOfTheDay } from '../utils';

export default function Home() {
  const [selectedTimeOfTheDay, setTimeOfTheDay] = useState(getTimeOfTheDay());

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      setTimeOfTheDay(nextTimeOfTheDay(selectedTimeOfTheDay, direction));
    },
    [selectedTimeOfTheDay],
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventScrollOnSwipe: true,
  });

  return (
    <Container {...handlers} className={styles.container}>
      <Toolbar />
      <main className={styles.main}>
        <Program selectedTimeOfTheDay={selectedTimeOfTheDay} />
      </main>
      <Footer />
    </Container>
  );
}
