import React from 'react';
import '@/styles/globals.css';
import "/src/styles/prism-atom-dark.css";
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_HOMEPAGE_DATA } from '@/graphql/queries';

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
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_HOMEPAGE_DATA
	})

	return {
		props: data
  }
}

