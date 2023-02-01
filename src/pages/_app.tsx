import React from 'react';
import '@/styles/globals.css';
import "/src/styles/prism-atom-dark.css";
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '@/components/Layout';

const theme = extendTheme({
  styles: {
    global: {
      'body': {
        minHeight: '100vh',
        backgroundColor: "gray.50"
      },
      '.nav-wrapper + main': {
        marginTop: '96px',
      },
      '@media(max-width: 820px)': {
        '.nav-wrapper + main': {
          marginTop: '70px',
        },
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
