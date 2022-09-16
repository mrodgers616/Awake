import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '../../common/components/Box';
import Text from '../../common/components/Text';
import NextImage from '../../common/components/NextImage';
import Heading from '../../common/components/Heading';
import Button from '../../common/components/Button';
import FeatureBlock from '../../common/components/FeatureBlock';
import Container from '../../common/components/UI/Container';
import Particles from '../Particle';
import DashboardWrapper, { DashboardObject } from './dashboard.style';
import CastVoteModal from "../../CastVoteModal" 

import DashboardObject1 from '../../common/assets/image/appModern/dashboard.png';
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import {fetchProposalFromStore, getProfileData} from "../../../lib/firebaseClient"
import {
  useDisclosure,
  ChakraProvider
} from "@chakra-ui/react";
import theme from '../../../theme'


const DashboardSection = ({ row, col, title, btnStyle, description }) => {
  const { userid } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState();
  const [campaign, setCampaign] = useState();
  
  let uid = userid;
  let investments = null;
  const slug = "PVQFakOIwa7jgQRLeXWo"
  const {
    isOpen: voteModalIsOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();
  
  useEffect(() => {
    
    if(userid) {

      getProfileData(userid).then(profile => {
        setProfileData(profile.data());
      })

      fetchProposalFromStore(slug).then(campaign => {
        setCampaign(campaign.data());
      })
    
    }
  }, [userid])


    if(profileData) {
      if (profileData.investments) {
        investments = profileData.investments;

      }
      else {
        investments = null;
      }
    }

  const ButtonGroup = () => (
    <Fragment>
      {userid ? (
            <div href="#trail" offset={84}>
              <ChakraProvider theme={theme}>
                <CastVoteModal
                  isOpen={voteModalIsOpen}
                  onClose={onVoteModalClose}
                  onOpen={onVoteModalOpen}
                  campaign={campaign}
                  profileData={profileData}
                  uid={uid}
                  investments={investments}
                  slug={slug}
                />
            </ChakraProvider>
              <Button {...btnStyle} title="Vote Now" onClick={() => { onVoteModalOpen();}} /> <span></span>
              <Button {...btnStyle} title="See more" onClick={() => { router.push(`/campaigns/${slug}`);}} />
            </div>
          ) : (
            <div href="#trail" offset={84}>
              <Button {...btnStyle} title="Login to Get Started" onClick={() => { router.push("/login");}} />
            </div>
          )}
    </Fragment>
  );
  return (
    <DashboardWrapper id="banner_section">
      <Particles />
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <Heading className="subtitle" as="h5" content="Featured Campaign" />
            <FeatureBlock
              title={
                <Heading
                  content="Meet the crossroads of fintech and shareholder activism"
                  {...title}
                />
              }
              description={
                <Text
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit ante quis metus auctor, in eleifend ante sodales. Fusce efficitur nisl eget diam sagittis, et facilisis sem congue."
                  {...description}
                />
              }
              button={<ButtonGroup />}
            />
          </Box>
        </Box>
      </Container>
      <DashboardObject>
        <div className="dashboardWrapper">
          <NextImage src={DashboardObject1} alt="DashboardObject1" />
        </div>
      </DashboardObject>
    </DashboardWrapper>
  );
};

DashboardSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
};

DashboardSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, '70%', '50%', '45%'],
  },
  title: {
    fontSize: ['22px', '30px', '30px', '30px', '36px'],
    fontWeight: '700',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '15px', '15px', '20px', '25px'],
    lineHeight: '1.3',
    maxWidth: ['100%', '400px'],
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '1.85',
    mb: '0',
  },
  btnStyle: {
    minWidth: ['120px', '120px', '120px', '156px'],
    fontSize: ['13px', '14px'],
    fontWeight: '500',
    colors: 'primaryWithBg',
  },
};

export default DashboardSection;
