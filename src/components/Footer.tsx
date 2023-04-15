import { Text } from '@nextui-org/react';

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
          <Text>😈</Text>
          <span>&nbsp;-Opa</span>
        </div>
      </footer>
    </>
  );
}
