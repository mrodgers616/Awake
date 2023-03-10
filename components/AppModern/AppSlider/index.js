import React, { Fragment } from 'react';
import Text from '../../common/components/Text';
import NextImage from '../../common/components/NextImage';
import Heading from '../../common/components/Heading';
import Container from '../../common/components/UI/Container';
import FeatureBlock from '../../common/components/FeatureBlock';
import GlideCarousel from '../../common/components/GlideCarousel';
import GlideSlide from '../../common/components/GlideCarousel/glideSlide';
import SectionWrapper, { CarouseWrapper, TextWrapper } from './appSlider.style';
import { appSlider } from '../../common/data/AppModern';

const AppSlider = () => {
  const { title, description, features, carousel } = appSlider;

  const glideOptions = {
    type: 'slider',
    gap: 0,
    // autoplay: 7000,
    perView: 1,
    animationDuration: 700,
  };
  const marge = {
    mt: "100px"
  }

  const boxStyle = {
    borderColor: "#FFFFFF",
    borderWidth: "5px"
    // :hover {
    //   box-shadow: #1e2a4a 0px 12px 24px -10px;
    // }
  }
  return (
    <SectionWrapper>
      <Container>
        <CarouseWrapper
        >
          <GlideCarousel
            bullets={true}
            controls={false}
            numberOfBullets={3}
            options={glideOptions}
            carouselSelector="appFeatureSlider"
          >
            <Fragment>
              {carousel.map((item) => (
                <GlideSlide key={`feature-side--key${item.id}`}>
                  <NextImage src={item.image} alt={item.title} />
                </GlideSlide>
              ))}
            </Fragment>
          </GlideCarousel>
        </CarouseWrapper>
        
        <TextWrapper>
          <Heading content={title} />
          <Text content={description} />
          {features.map((item) => (
            <FeatureBlock
              key={`app-feature--key${item.id}`}
              iconPosition="left"
              icon={<img src={item.icon?.src} alt={item.title} />}
              style={boxStyle}
              title={<Heading as="h3" content={item.title} />}
              description={<Text content={item.description} />}
            />
          ))}
        </TextWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default AppSlider;
