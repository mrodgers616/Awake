import { chakra, Box } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import type { Component } from "react";
import Footer from "../components/Footer";
import Sticky from 'react-stickynode';
import Navbar from '../components/AppModern/Navbar';


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <chakra.div
      className="global-wrap"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Head>
        <title>Climate DAO</title>
        <meta name="description" content="Climate DAO" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </Head>
      
      <Sticky top={0} innerZ={9999} activeClass="sticky-active">
        <Navbar />
      </Sticky>
      <Box 
        flexGrow={1}
        fontFamily='DM Sans'
      >{children}</Box>
      <Footer />
    </chakra.div>
  );
}
