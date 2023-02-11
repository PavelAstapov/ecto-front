import React from 'react';
import '@/styles/globals.css';
import "/src/styles/prism-atom-dark.css";
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';

const theme = extendTheme({
  styles: {
    global: {
      'body': {
        minHeight: '100vh',
        backgroundColor: "gray.50"
      },
      '.onBanner + .show' : {
        display: 'block'
      },
      '.share-wrapper button:hover' : {
        backgroundColor: '#BEE3F8 !important'
      }
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress height={3} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

