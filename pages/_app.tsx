import '@fontsource/dm-sans'

import { ChakraProvider } from '@chakra-ui/react'
import { Web3Provider } from '../contexts/Web3Context'
import { AuthProvider } from '../contexts/AuthContext'
import { AppProps } from 'next/app'
import GoogleAnalytics from "@bradgarropy/next-google-analytics"


import theme from '../theme'
import Layout from '../components/layout'
import "./campaigns.css"
import "./styles.css"
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from '../components/AppModern/appModern.style';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Web3Provider>
          <AppWrapper>
          <Layout>
            <GoogleAnalytics measurementId="G-E829D3LL4P" />
            <Component {...pageProps} />
          </Layout>
          </AppWrapper>
        </Web3Provider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
