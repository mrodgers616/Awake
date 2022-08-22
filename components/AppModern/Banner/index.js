import React from 'react';
import { Icon } from 'react-icons-kit';
import { playCircle } from 'react-icons-kit/fa/playCircle';
// import { openModal, closeModal } from '@redq/reuse-modal';
import Text from '../../common/components/Text';
import Image from '../../common/components/Image';
import NextImage from '../../common/components/NextImage';
import Button from '../../common/components/Button';
import Heading from '../../common/components/Heading';
import Rating from '../../common/components/Rating';
import Container from '../../common/components/UI/Container';
import BannerWrapper, {
  BannerContent,
  RatingInfo,
  BannerImage,
  ButtonGroup,
  VideoGroup,
  VideoWrapper,
  CustomerWrapper,
  ImageWrapper,
} from './banner.style';
import LinkAccount from "../../plaidLinkButton";

import { client } from '../../common/data/AppModern';

import microsoft from '../../common/assets/image/appModern/envato-icon.png';
// import bannerImg from '../../../public/illustrations/abstractBanner.png';
import bannerImg from '../../../public/illustrations/homepage2.png';
import videoBanner1 from '../../common/assets/image/appModern/video-1.png';
import videoBanner2 from '../../common/assets/image/appModern/video-2.png';
import circleBorder from '../../common/assets/image/appModern/shape.svg';
import cdLogo from '../../../public/illustrations/ClimateDAO Logo.png';
import aLogo from '../../../public/illustrations/Awake Logo light.png';
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";



// close button for modal
// const CloseModalButton = () => (
//   <Button
//     className="modalCloseBtn"
//     variant="fab"
//     onClick={() => closeModal()}
//     icon={<i className="flaticon-plus-symbol" />}
//   />
// );

const ModalContent = () => (
  <VideoWrapper>
    <iframe
      title="Video"
      src="https://www.youtube.com/embed/8ME-QAlW6Ww"
      frameBorder="0"
    />
  </VideoWrapper>
);

const Banner = () => {
  // // modal handler
  // const handleVideoModal = () => {
  //   openModal({
  //     config: {
  //       className: 'video-modal',
  //       disableDragging: true,
  //       default: {
  //         width: 'auto',
  //         height: 'auto',
  //         x: 0,
  //         y: 0,
  //       },
  //     },
  //     component: ModalContent,
  //     componentProps: {},
  //     closeComponent: CloseModalButton,
  //     closeOnClickOutside: true,
  //   });
  // };

  const imageStyle = {
    margin: '-50px 0 0 0',
  }
  const popStyle = {
    minWidth: "55%",
    maxWidth: "55%",
    marginRight: "220px"
  }
  const small = {
    w: "5%",
    h: "100px"
  }

  const { userid } = useAuth();
  const router = useRouter();

  return (
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <RatingInfo>
            {/* <Image src={aLogo?.src} alt="Awake Logo" style={imageStyle} /> */}
          </RatingInfo>
          <Heading
            as="h1"
            content="Where Value Meets Values"
          />
          <Text
            as="h3"
            color="white"
            content="What if I told you...you can fight climate change with investments you've already made?"
          />
          <ButtonGroup>
            {userid ? (
              <LinkAccount className="primary" title="Activate Your Shares" onClick={() => { }} />
            ) : (
              <Button className="primary" title="Create An Account" onClick={() => { router.push("/register") }} />
            )}

            {/* <Button
                className="text"
                variant="textButton"
                icon={<Icon icon={playCircle} />}
                iconPosition="left"
                title="Watch Video"
              /> */}
          </ButtonGroup>
        </BannerContent>
        <BannerImage>
          <Image src={bannerImg?.src} style={popStyle} alt="Banner" />
        </BannerImage>
      </Container>
      <CustomerWrapper>
        <Text content="Trusted by companies like:" />
        <ImageWrapper style={small}>
          {client.map((item) => (
            <Image
              key={`client-key${item.id}`}
              src={item.image?.src}
              alt={item.title}
            />
          ))}
        </ImageWrapper>
      </CustomerWrapper>
      <img
        className="bannerBottomShape"
        src={circleBorder?.src}
        alt="Bottom Circle"
      />
    </BannerWrapper>
  );
};

export default Banner;