import { Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import * as pkg from '../../package.json';

export function Footer() {
  return (
    <>
      <style jsx>{`
        .footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .footer div {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 0;
        }
      `}</style>
      <footer className="footer">
        <div>
          <span>Coded with</span>
          <Text onClick={() => confetti({ origin: { x: 0.5, y: 1 } })}>😈</Text>
          <span>-Opa</span>
        </div>
        <code>v{pkg.version}</code>
      </footer>
    </>
  );
}
