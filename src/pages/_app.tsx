import { NextUIProvider } from '@nextui-org/react';
import { SSRProvider } from '@react-aria/ssr';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { AppContextProvider } from '../hooks/useAppContext';
import { useServiceWorker } from '../hooks/useServiceWorker';
import { dark, light } from '../styles/themes';

import '../styles/globals.css';

export default function CrackerApp({ Component, pageProps }: AppProps) {
  useServiceWorker();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title>Cracker app🍪</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="icons/apple-icon.png"></link>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SSRProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: light.className,
            dark: dark.className,
          }}
        >
          <NextUIProvider>
            <AppContextProvider>
              <Component {...pageProps} />
            </AppContextProvider>
          </NextUIProvider>
        </NextThemesProvider>
      </SSRProvider>
    </>
  );
}
