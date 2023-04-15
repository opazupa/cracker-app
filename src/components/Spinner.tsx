import React from 'react';

export function Spinner() {
  return (
    <>
      <style jsx>{`
        .loader {
          position: absolute;
          -webkit-animation: spin 2.5s linear infinite;
          -moz-animation: spin 2.5s linear infinite;
          animation: spin 2.5s linear infinite;
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
      <span className="loader">🍪</span>
    </>
  );
}
