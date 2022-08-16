import React, { Fragment } from 'react';
import { Icon } from 'react-icons-kit';
import { mediaRecordOutline } from 'react-icons-kit/typicons/mediaRecordOutline';
import { plus } from 'react-icons-kit/typicons/plus';
import { starOutline } from 'react-icons-kit/typicons/starOutline';
import Text from '../../common/components/Text';
import Heading from '../../common/components/Heading';
import NextImage from '../../common/components/NextImage';
import Container from '../../common/components/UI/Container';
import FeatureBlock from '../../common/components/FeatureBlock';
import { SectionHeader } from '../appModern.style';
import SectionWrapper, { FeatureWrapper } from './features.style';

import { features } from '../../common/data/AppModern';

const Features = () => {
  const { slogan, title, items } = features;

  return (
    <SectionWrapper id="features">
      <Container>
        <SectionHeader>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
        </SectionHeader>
      </Container>
    </SectionWrapper>
  );
};

export default Features;
