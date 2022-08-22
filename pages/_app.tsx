import '@fontsource/dm-sans'
import Head from "next/head";

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
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components';
import { theme as themeModernApp } from '../components/common/theme/appModern';

import Sticky from 'react-stickynode';
import Navbar from '../components/AppModern/Navbar';
import ResetCSS from '../components/common/assets/css/style';

import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from '../components/AppModern/appModern.style';






export type NextPageWithLayout = NextPage & {
  layout: string;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  let layout;
  Component.layout ? layout = Component.layout : layout = "";

  if (layout === 'appWrapper') {
    return (
      <ThemeProvider theme={themeModernApp}>
        <>

          <Head>
            <title>Awake</title>
            <meta name="description" content="ClimateDAO" />
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
            <link
              href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700&display=swap"
              rel="stylesheet"
            />
          </Head>
          <ResetCSS />
          <GlobalStyle />
          <AuthProvider>
            <AppWrapper>
              <Sticky top={0} innerZ={9999} activeClass="sticky-active">
                <Navbar />
              </Sticky>
              <ContentWrapper>
                <LayoutAppModern>
                  <GoogleAnalytics measurementId="G-E829D3LL4P" />
                  <Component {...pageProps} />
                </LayoutAppModern>
              </ContentWrapper>
            </AppWrapper>
          </AuthProvider>
        </>
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
