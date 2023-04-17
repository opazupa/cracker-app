import { HTMLAttributes, PropsWithChildren } from 'react';

const CodeLink: React.FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>> & { text: string }
> = ({ onClick, text }) => (
  <>
    <style jsx>
      {`
        code {
          cursor: pointer;
        }
      `}
    </style>
    <code onClick={onClick}>{text}</code>
  </>
);

export default CodeLink;
