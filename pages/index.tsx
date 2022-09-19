import type { NextPage } from "next";
import type { NextPageWithLayout } from './_app'
import Banner from '../components/AppModern/Banner';
import AppSlider from '../components/AppModern/AppSlider';
import Features from '../components/AppModern/Features';
import DashboardFeatures from '../components/AppModern/Dashboard';
import ProductSlide from '../components/AppModern/ProductSlide';
import TeamPortfolio from '../components/AppModern/TeamPortfoilo';
import Testimonial from '../components/AppModern/Testimonial';
import Newsletter from '../components/AppModern/Newsletter';
import Footer from '../components/AppModern/Footer';




const Home: NextPageWithLayout = () => {
  return (
    <>
      <Banner />
      <DashboardFeatures />
      <Features />
      <AppSlider />
      {/* <ProductSlide /> */}
      {/* <Testimonial /> */}
      {/* <DesignedAndBuilt /> */}
      <TeamPortfolio />
      <Newsletter />
      <Footer />
      {/* end of app classic landing */}
    </>
  );


};

Home.layout = "appWrapper";

export default Home;
