import { chakra, Box } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import type { Component } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <Navbar />
      <Box 
        flexGrow={1}
        fontFamily='DM Sans'
      >{children}</Box>
      <Footer />
    </chakra.div>
  );
}
