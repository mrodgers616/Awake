import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Heading from '../../common/components/Heading';
import Image from '../../common/components/Image';
import { Icon } from 'react-icons-kit';
import { useAuth } from "../../../contexts/AuthContext";
import Button from '../../common/components/Button';
import ButtonGroup from '../Banner/banner.style';

import { BannerContent, BannerContentCamp, BannerWrapper, BannerImage } from '../Banner/banner.style';
import { popStyle } from '../../../components/AppModern/Banner/index';
import { bannerImg } from '../../../public/illustrations/homepage2.png';
import { circleBorder } from '../../common/assets/image/appModern/shape.svg';
import { playCircle } from 'react-icons-kit/fa/playCircle';
// import { openModal, closeModal } from '@redq/reuse-modal';
import NextImage from '../../common/components/NextImage';
// import Swiper from 'react-id-swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllProposals } from "../../../lib/firebaseClient";
import { useRouter } from "next/router";
import Text from '../../common/components/Text';
import SectionWrapper, { ContentWrapper } from '../DesignedAndBuilt/designedAndBuilt.style';
// import image from "../../../public/illustrations/homepage1.png";



import ProductSlideWrapper, {
  Container,
  CarouselArea,
  CircleLoader,
  MockupWrapper,
  SectionHeader,
} from './productSlide.style';

import { productData } from '../../common/data/AppModern';
import SlideMockup from '../../common/assets/image/appModern/screen.png';
import { Flex } from '@chakra-ui/react';

const params = {
  slidesPerView: 5,
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
  },
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
};
const ProductSlide = () => {
  const { carousel, slogan, title } = productData;
  const { userid } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState();
  useEffect(() => {
    setLoading(true);
    getAllProposals().then(proposals => {
      setProposals(proposals);
    })
  }, []);
  return (
    <ProductSlideWrapper>
      <SectionHeader>
        <Heading as="h5" content={slogan} />
        <Heading as="h1" color={"white"} content={title} />
      </SectionHeader>
      <Flex
        flexDirection={"row"}
      >
        <Container>
          <BannerContentCamp>
            <Heading as="h1" color={"white"} content={"The Issue"} />
            <Text
              color="white"
              content={`Total is the only western energy giant that hasn’t announced plans to quit Russia. Shell is shedding its ties, BP is going beyond Putin, and Exxon announced it's exiting too. 
            
            Simply put, Total’s greed is enabling Putin’s war.
            
            But if enough of us raise our voices we can make Total divest from Russia, and get Europe to speed up going fossil-free – cutting off the stream of cash from gas projects and pipelines in the Russian Arctic that feed right into Putin’s war machine.`}
            />

            {userid ? (
              <Button className="primary" title="Check it out" onClick={() => { router.push("/campaigns") }} />
            ) : (
              <Button className="primary" title="Create An Account" onClick={() => { router.push("/register") }} />
            )}
          </BannerContentCamp>
        </Container>
        <Container>
          <iframe width="620" height="305" src="https://www.youtube.com/embed/J_oAuiVSW-U" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Container>
      </Flex>
      {/* End of carousel section */}
    </ProductSlideWrapper >
  );
};

export default ProductSlide;
