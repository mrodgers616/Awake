import type { NextPage } from "next";
import type { NextPageWithLayout } from './_app'
import Banner from '../components/AppModern/BannerWaitlist';
import NewContent from '../components/AppModern/Achange';
import AppSlider from '../components/AppModern/AppSlider';
import Features from '../components/AppModern/Features';
// import DashboardFeatures from '../components/AppModern/Dashboard';
import ProductSlide from '../components/AppModern/ProductSlide';
import TeamPortfolio from '../components/AppModern/TeamPortfoilo';
import Testimonial from '../components/AppModern/Testimonial';
import Newsletter from '../components/AppModern/Newsletter';
import Footer from '../components/AppModern/Footer';
import NewTeamSec from "../components/NewTeamSec";
import { useState, useEffect, useMemo } from "react";
import * as FullStory from '@fullstory/browser';
import Newsletter2 from "../components/newsletter2"


const Waitlist: NextPageWithLayout = () => {

  useEffect(() => {
    FullStory.init({ orgId: 'o-1FCF9K-na1' });


    
  }, []);

  return (
    <>
      <Banner />
      <Footer />
    </>
  );


};

Waitlist.layout = "waitlist";

export default Waitlist;