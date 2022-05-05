import '@fontsource/dm-sans'

import type { AppPropsWithLayout } from '../lib/types/next';
import { ChakraProvider } from '@chakra-ui/react'
import { Web3Provider } from '../contexts/Web3Context'
import { FirebaseProvider } from '../contexts/FirebaseContext'
import { AuthProvider } from '../contexts/AuthContext'

import theme from '../theme'
import Layout from '../components/layout'


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <AuthProvider>
          <Web3Provider>
            <Layout>
              { getLayout(<Component {...pageProps} />) }
            </Layout>
          </Web3Provider>
        </AuthProvider>
      </FirebaseProvider>
    </ChakraProvider>
  )
}

export default MyApp
