import { Container } from '@nextui-org/react';
import { GetStaticPropsResult } from 'next';

import { Footer, Program, Toolbar } from '../components';
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
  return (
    <Container className={styles.container}>
      <Toolbar />
      <main className={styles.main}>
        <Program meals={meals} />
      </main>
      <Footer />
    </Container>
  );
}
