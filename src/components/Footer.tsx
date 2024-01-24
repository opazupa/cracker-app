import { Text } from '@nextui-org/react';

import pkg from '../../package.json';
import { celebrate } from '../utils';

export function Footer() {
  return (
    <>
      <style jsx>{`
        .footer {
          width: 100%;
          height: 80px;
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
          <Text onClick={celebrate}>😈</Text>
        </div>
        <code>v{pkg.version}</code>
      </footer>
    </>
  );
}
