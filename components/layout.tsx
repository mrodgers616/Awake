import { chakra, Box } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import type { Component } from "react";
import { ThemeProvider } from 'styled-components';
import { theme as themeModernApp } from '../components/common/theme/appModern';

import Sticky from 'react-stickynode';
import Navbar from '../components/AppModern/Navbar';
import Footer from '../components/AppModern/Footer';

import ResetCSS from '../components/common/assets/css/style';

import GlobalStyle, {
  AppWrapper2,
  ContentWrapper,
} from '../components/AppModern/appModern.style';



interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <chakra.div
      className="global-wrap"
      display="flex"
      flexDirection="column"
    >
      <Head>
        <title>Awake</title>
        <meta name="description" content="Awake" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      </Head>
      <ThemeProvider theme={themeModernApp}>
        <ResetCSS />
        <GlobalStyle />
        <AppWrapper2>
          <Sticky top={0} innerZ={9999} activeClass="sticky-active">
            <Navbar />
          </Sticky>
        </AppWrapper2>
      </ThemeProvider>
      <Box
        flexGrow={1}
        fontFamily='DM Sans'
      >{children}</Box>
      <ThemeProvider theme={themeModernApp}>
        <ResetCSS />
        <GlobalStyle />
        <AppWrapper2>
            <Footer />
        </AppWrapper2>
      </ThemeProvider>
    </chakra.div>
  );
}
