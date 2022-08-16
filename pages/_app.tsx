import '@fontsource/dm-sans'

import { ChakraProvider } from '@chakra-ui/react'
import { Web3Provider } from '../contexts/Web3Context'
import { AuthProvider } from '../contexts/AuthContext'
import { AppProps } from 'next/app'
import GoogleAnalytics from "@bradgarropy/next-google-analytics"


import theme from '../theme'
import Layout from '../components/layout'
import LayoutAppModern from '../components/layoutAppModern'
import "./campaigns.css"
import "./styles.css"
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from '../components/AppModern/appModern.style';
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components';
import { theme as themeModernApp} from '../components/common/theme/appModern';





export type NextPageWithLayout = NextPage & {
  layout: string;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  let layout;
  Component.layout ? layout = Component.layout : layout = "";

  if(layout === 'appWrapper') {
    return (
      <ThemeProvider theme={themeModernApp}>
        <AppWrapper>
          <AuthProvider>
              <LayoutAppModern>
                <GoogleAnalytics measurementId="G-E829D3LL4P" />
                <Component {...pageProps} />
              </LayoutAppModern>
          </AuthProvider>
        </AppWrapper>
      </ThemeProvider>

    )
  }
  else {
    return (
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Web3Provider>
            <Layout>
              <GoogleAnalytics measurementId="G-E829D3LL4P" />
              <Component {...pageProps} />
            </Layout>
          </Web3Provider>
        </AuthProvider>
      </ChakraProvider>
    )

  }

  
}

export default MyApp
