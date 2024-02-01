import { Container } from '@nextui-org/react';
import { GetStaticPropsResult } from 'next';

import { Footer, Program, Toolbar } from '../components';
import { useTimeout } from '../hooks/useTimeout';
import { getMeals } from '../services';
import styles from '../styles/Home.module.css';
import { Meals } from '../types';

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
  const ready = useTimeout();

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
        <div className={styles.loader} />
      )}
      <Footer />
    </Container>
  );
}
