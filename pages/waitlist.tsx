import type { NextPageWithLayout } from './_app'
import Banner from '../components/AppModern/BannerWaitlist';
import Footer from '../components/AppModern/Footer';
import { useEffect } from "react";
import * as FullStory from '@fullstory/browser';


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