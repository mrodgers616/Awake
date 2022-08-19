import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Heading from '../../common/components/Heading';
import Image from '../../common/components/Image';
import NextImage from '../../common/components/NextImage';
// import Swiper from 'react-id-swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllProposals } from "../../../lib/firebaseClient";


import ProductSlideWrapper, {
  Container,
  CarouselArea,
  CircleLoader,
  MockupWrapper,
  SectionHeader,
} from './productSlide.style';

import { productData } from '../../common/data/AppModern';
import SlideMockup from '../../common/assets/image/appModern/screen.png';
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
      <Container>
        <SectionHeader>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
        </SectionHeader>
        <CarouselArea>
          {loading ? (
            <Fragment>
              <Swiper {...params}>
                {carousel.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link href={item.link} key={`productSlide--key${item.id}`}>
                      <a className="item_wrapper">
                        <NextImage src={item.thumb_url} alt={item.title} />
                      </a>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Fragment>
          ) : (
            <CircleLoader>
              <div className="circle"></div>
              <div className="circle"></div>
            </CircleLoader>
          )}
        </CarouselArea>
        {/* End of carousel section */}
      </Container>
    </ProductSlideWrapper>
  );
};

export default ProductSlide;
