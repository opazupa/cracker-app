import Image from 'next/image';
import React from 'react';

import cookieImg from '/public/img/cookie.png';

export const Spinner: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <>
      <style jsx>{`
        .loader {
          -webkit-animation: spin 3s linear infinite;
          -moz-animation: spin 3s linear infinite;
          animation: spin 3s linear infinite;
        }
        @-moz-keyframes spin {
          100% {
            -moz-transform: rotate(360deg);
          }
        }
        @-webkit-keyframes spin {
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes spin {
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader">
        <Image
          alt="loader"
          src={cookieImg}
          width={size}
          height={size}
          style={{
            display: 'block', // important for correct rotation
          }}
          unoptimized
        />
      </div>
    </>
  );
};
