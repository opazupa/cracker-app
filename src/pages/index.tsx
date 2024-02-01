import { Container, Row, Text } from '@nextui-org/react';
import { GetStaticPropsResult } from 'next';

import { Footer, Program, Toolbar } from '../components';
import { useTimeout } from '../hooks/useTimeout';
import { getMeals } from '../services';
import styles from '../styles/Home.module.css';
import { Meals } from '../types';
import { random } from '../utils';

type HomeProps = {
  meals: Meals;
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  return {
    props: {
      meals: getMeals(),
    },
  };
};

export default function Home({ meals }: HomeProps) {
  // Be ready between 1 - 2,5 seconds
  const ready = useTimeout(random(1000, 2500));

  return (
    <Container className={styles.container}>
      {ready ? (
        <>
          <Toolbar />
          <main className={styles.main}>
            <Program meals={meals} />
          </main>
        </>
      ) : (
        <Row
          justify="center"
          align="flex-end"
          css={{ gap: '$3', paddingLeft: '$10' }}
        >
          <Text h2>Cracker App</Text>
          <div className={styles.loader} />
        </Row>
      )}
      <Footer />
    </Container>
  );
}
