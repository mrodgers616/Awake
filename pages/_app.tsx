import '@fontsource/dm-sans'

import { ChakraProvider } from '@chakra-ui/react'
import { Web3Provider } from '../contexts/Web3Context'
import { AuthProvider } from '../contexts/AuthContext'
import { AppProps } from 'next/app'


import theme from '../theme'
import Layout from '../components/layout'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Web3Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3Provider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
