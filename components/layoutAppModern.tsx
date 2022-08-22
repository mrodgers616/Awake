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
    <>
      {children}
    </>
  );
}
