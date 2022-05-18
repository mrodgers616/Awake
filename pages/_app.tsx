import '@fontsource/dm-sans'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3Provider } from '../contexts/Web3Context'

import theme from '../theme'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
    </ChakraProvider>
  )
}

export default MyApp
