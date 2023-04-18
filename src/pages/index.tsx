import { Container } from '@nextui-org/react';

import { Footer, Program, Toolbar } from '../components';

export default function Home() {
  return (
    <>
      <style jsx>
        {`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .main {
            padding: 2rem 0;
            flex: 1 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
        `}
      </style>
      <Container className="container">
        <Toolbar />
        <main className="main">
          <Program />
        </main>
        <Footer />
      </Container>
    </>
  );
}
