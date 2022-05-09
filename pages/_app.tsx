import '@fontsource/dm-sans'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3Provider } from '../contexts/Web3Context'
import { FirebaseProvider } from '../contexts/FirebaseContext'

import theme from '../theme'
import Layout from '../components/layout'
import "./campaigns.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <Web3Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3Provider>
      </FirebaseProvider>
    </ChakraProvider>
  )
}

export default MyApp
