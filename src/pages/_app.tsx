import React from 'react';
import '@/styles/globals.css';
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
      'article': {
        'h2' :{
          fontSize: '24px',
          lineHeight: '32px',
          fontWeight: '700',
          marginBottom: '32px',
        },
        'table': {
          width: '100%',
          border: '1px solid #E2E8F0',
          borderRadius: '4px'
        }
      },
      '.onBanner + .show' : {
        display: 'block'
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
