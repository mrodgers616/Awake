import { chakra, Box } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import type { Component } from "react";
import Sticky from 'react-stickynode';
import Navbar from './AppModern/Navbar';
import Footer from '../components/AppModern/Footer';



interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
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
      <div 
      >{children}</div>
      <Footer />
    </div>
  );
}
