import type { NextPage } from "next";
import type { NextPageWithLayout } from './_app'
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import {
  FaPlayCircle
} from "react-icons/fa";
import Link from "../components/Link";
import FeaturedCampaigns from "../components/FeaturedCampaigns";
import StepsSection from '../components/StepsSection';
import AnimatedMainHeading from "../components/AnimatedMainHeading";
import TwitterTestimonial from "../components/TwitterTestimonials";
import Stats from "../components/Stats";
import {
  CLIMATEDAO_TOKEN_ADDRESS
} from "../lib/web3";
import copy from "copy-to-clipboard";
import { FaClipboard, FaTwitter, FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Steps } from '../lib/mock-data';
//import campaigns from '../data/mockcampaigns.json';
import { useWeb3 } from "../contexts/Web3Context";
import { fetchFeaturedProposalFromStore } from "../lib/firebaseClient";
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/common/theme/appModern';
import Sticky from 'react-stickynode';
import Navbar from '../components/AppModern/Navbar';
import Banner from '../components/AppModern/Banner';
import AppSlider from '../components/AppModern/AppSlider';
import Features from '../components/AppModern/Features';
import DashboardFeatures from '../components/AppModern/Dashboard';
import ProductSlide from '../components/AppModern/ProductSlide';
import DesignedAndBuilt from '../components/AppModern/DesignedAndBuilt';
import PricingPolicy from '../components/AppModern/PricingPolicy';
import TeamPortfolio from '../components/AppModern/TeamPortfoilo';
import Testimonial from '../components/AppModern/Testimonial';
import Newsletter from '../components/AppModern/Newsletter';
import Footer from '../components/AppModern/Footer';
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from '../components/AppModern/appModern.style';

import ResetCSS from '../components/common/assets/css/style';
import type { ReactElement } from 'react'




const Home: NextPageWithLayout = () => {
  return (
      <>
        <Banner />
        <Features />
        <AppSlider />
        <DashboardFeatures />
        <Testimonial />
        <ProductSlide />
        <DesignedAndBuilt />
        <PricingPolicy />
        <TeamPortfolio />
        <Newsletter />
        {/* end of app classic landing */}
      </>
  );


};

Home.layout="appWrapper";

export default Home;
