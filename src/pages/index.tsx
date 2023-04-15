import { Container } from '@nextui-org/react';

import { Content, Footer, Toolbar } from '../components';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Container className={styles.container}>
        <Toolbar />
        <main className={styles.main}>
          <Content />
        </main>
        <Footer />
      </Container>
    </>
  );
}
