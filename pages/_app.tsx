import '@fontsource/dm-sans'
import Head from "next/head";

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../contexts/AuthContext'
import { AppProps } from 'next/app'
import GoogleAnalytics from "@bradgarropy/next-google-analytics"
import { GoogleAnalytics as GA } from "nextjs-google-analytics";


import theme from '../theme'
import Layout from '../components/layout'
import LayoutAppModern from '../components/layoutAppModern'
import "./campaigns.css"
import "./styles.css"
import type { NextPage } from "next";
import { ThemeProvider } from 'styled-components';
import { theme as themeModernApp } from '../components/common/theme/appModern';

import Sticky from 'react-stickynode';
import Navbar from '../components/AppModern/Navbar';
import ResetCSS from '../components/common/assets/css/style';

import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from '../components/AppModern/appModern.style';
import { Analytics } from '@vercel/analytics/react';


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
            <meta name="google-site-verification" content="bBjfWyYyEb_3QNlHLnP-IWhoMb4kl8VNytdbQid1Wz8" />
            <meta name="description" content="Awake" />
            <meta
              name="keywords"
              content="Awake, awake, AwakeInvest, awakeInvest, awakeinvest, awake invest, shareholder collective action, awake finance, shareholder proposals, petitions, climte change, democratizing shareholder acitivism, campaigns for corporate action, awake campaigns, advocate for change with stocks, awakeinvest.com "
            />
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
                  <GA gaMeasurementId="G-E829D3LL4P" trackPageViews />
                  <Analytics />
                  <Component {...pageProps} />
                </LayoutAppModern>
              </ContentWrapper>
            </AppWrapper>
          </AuthProvider>
        </>
      </ThemeProvider>
    )
  }
  else if(layout === 'waitlist') {
    return (
      <ThemeProvider theme={themeModernApp}>
        <>

          <Head>
            <title>Awake</title>
            <meta name="google-site-verification" content="bBjfWyYyEb_3QNlHLnP-IWhoMb4kl8VNytdbQid1Wz8" />
            <meta name="description" content="Awake" />
            <meta
              name="keywords"
              content="Awake, awake, AwakeInvest, awakeInvest, awakeinvest, awake invest, shareholder collective action, awake finance, shareholder proposals, petitions, climte change, democratizing shareholder acitivism, campaigns for corporate action, awake campaigns, advocate for change with stocks, awakeinvest.com "
            />
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
          <ChakraProvider theme={theme}>
          <AuthProvider>
            <AppWrapper>
            <Sticky top={0} innerZ={9999} activeClass="sticky-active">
                <Navbar />
              </Sticky>
              <ContentWrapper>
                <LayoutAppModern>
                  <GoogleAnalytics measurementId="G-E829D3LL4P" />
                  <GA gaMeasurementId="G-E829D3LL4P" trackPageViews />
                  <Analytics />
                  <Component {...pageProps} />
                </LayoutAppModern>
              </ContentWrapper>
            </AppWrapper>
          </AuthProvider>
          </ChakraProvider>
        </>
      </ThemeProvider>
    )
  }
  else {
    return (
      <ChakraProvider theme={theme}>
        <Head>
            <meta name="google-site-verification" content="bBjfWyYyEb_3QNlHLnP-IWhoMb4kl8VNytdbQid1Wz8" />
            <meta name="description" content="Awake" />
            <meta
              name="keywords"
              content="Awake, awake, AwakeInvest, awakeInvest, awakeinvest, awake invest, shareholder collective action, awake finance, shareholder proposals, petitions, climte change, democratizing shareholder acitivism, campaigns for corporate action, awake campaigns, advocate for change with stocks, awakeinvest.com "
            />
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
            <link
              href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700&display=swap"
              rel="stylesheet"
            />
          </Head>
        <AuthProvider>
            <Layout>
              <GoogleAnalytics measurementId="G-E829D3LL4P" />
              <GA gaMeasurementId="G-E829D3LL4P" trackPageViews />
              <Analytics />
              <Component {...pageProps} />
            </Layout>
        </AuthProvider>
      </ChakraProvider>
    )

  }


}

export default MyApp
