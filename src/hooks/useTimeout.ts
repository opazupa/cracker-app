import { useEffect, useState } from 'react';

export const useTimeout = (timeout = 2000) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  return ready;
};
