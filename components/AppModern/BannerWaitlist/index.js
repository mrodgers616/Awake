import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { iosEmailOutline } from 'react-icons-kit/ionicons/iosEmailOutline';
import Heading from '../../common/components/Heading';
import Text from '../../common/components/Text';
import Image from '../../common/components/Image';
import Button from '../../common/components/Button';
import Input from '../../common/components/Input';
import GlideCarousel from '../../common/components/GlideCarousel';
import GlideSlide from '../../common/components/GlideCarousel/glideSlide';
import { CircleLoader } from '../interior.style';
import BannerWrapper, {
  Container,
  ContentArea,
  HighlightedText,
  FormWrapper,
  ButtonGroup,
  CarouselArea,
} from './banner.style';
import { bannerData } from '../../common/data/Interior';
import * as EmailValidator from 'email-validator';
import { useToast } from "@chakra-ui/react";
import { addWaitlistSubscriberToStore } from "../../../lib/firebaseClient";
import {
  useDisclosure,
} from "@chakra-ui/react";
import WaitlistModal from "../../WaitlistModal";


const Banner = () => {
  const { discount, discountLabel, title, text, carousel } = bannerData;
  const glideOptions = {
    type: 'carousel',
    perView: 3,
    gap: 20,
    breakpoints: {
      1200: {
        perView: 2,
      },
      667: {
        perView: 2,
      },
      480: {
        perView: 1,
      },
    },
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const [state, setState] = useState({
    email: ""
  });

  const [modalClose, setModalClose] = useState(true)
  const toast = useToast();

  const {
    isOpen: voteModalIsOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();


  const handleEmailChange = (event) => {
    setState({ email: event });
  }

  const handleOnSubmit = async () => {

    if (EmailValidator.validate(state.email)) {
      let data = {
        email: state.email
      }

      setModalClose(false);
      onVoteModalOpen()

      fetch('/api/loops_add_waitlist', { method: 'POST', body: state.email }).then(response => {
        //console.log(response);
      });
      

      await addWaitlistSubscriberToStore(data);
      toast({
        title: "",
        description:
          "Thanks for signing up for the Waitlist! We'll reach out soon.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    }
    else {
      toast({
        title: "Error",
        description:
          "Check if your email address is valid",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }

  }

  return (
    <BannerWrapper>
      {!modalClose && <WaitlistModal
                        isOpen={voteModalIsOpen}
                        onClose={ () => {onVoteModalClose; setModalClose(true);}}
                        onOpen={() => { onVoteModalOpen(); }}
                      />}
      <Container>
        <ContentArea>
            <HighlightedText>
            <Text className="textOffer" content={discount + " " + discountLabel} />
            </HighlightedText>
            <Heading as="h1" content={title} />
            <Text content={text} />
            <FormWrapper >
              <Input
                type="email"
                placeholder="Enter Email"
                icon={<Icon icon={iosEmailOutline} />}
                iconPosition="left"
                required={true}
                onChange={handleEmailChange}
                aria-label="email"
              />
              <ButtonGroup>
                <Button
                  //type="submit"
                  colors="secondaryWithBg"
                  title="Join Waitlist"
                  onClick={() => {handleOnSubmit(); setModalClose(false);}}
                />
              </ButtonGroup>
            </FormWrapper>
        </ContentArea>
        {/* End of content section */}

        <CarouselArea>
          {loading ? (
            <GlideCarousel
              carouselSelector="interior_carousel"
              options={glideOptions}
              nextButton={<span className="next_arrow" />}
              prevButton={<span className="prev_arrow" />}
            >
              <Fragment>
                {carousel.map((item) => (
                  <GlideSlide key={`carousel_key${item.id}`}>
                    <Link href={item.link}>
                      <a className="item_wrapper">
                        <Image src={item.thumb_url?.src} alt={item.title} />
                        <Heading as="h4" content={item.title} />
                      </a>
                    </Link>
                  </GlideSlide>
                ))}
              </Fragment>
            </GlideCarousel>
          ) : (
            <CircleLoader>
              <div className="circle"></div>
              <div className="circle"></div>
            </CircleLoader>
          )}
        </CarouselArea>
        {/* End of carousel section */}
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
