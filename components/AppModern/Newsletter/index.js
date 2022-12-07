import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../../common/components/Box';
import Text from '../../common/components/Text';
import Heading from '../../common/components/Heading';
import Button from '../../common/components/Button';
import Input from '../../common/components/Input';
import Container from '../../common/components/UI/Container';
import { addNewsletterSubscriberToStore } from "../../../lib/firebaseClient";
import * as EmailValidator from 'email-validator';
import Alert from '../../common/components/Alert';
import { useToast } from "@chakra-ui/react";

import NewsletterWrapper, { ContactFormWrapper } from './newsletter.style';

const Newsletter = ({
  sectionWrapper,
  textArea,
  buttonArea,
  buttonStyle,
  title,
  description,
}) => {

  const [state, setState] = useState({
    email: ""
  });

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [color, setColor] = useState("green");
  const toast = useToast();

  const controlref = useRef();

  const handleEmailChange = (event) => {
    setState({ email: event });
    setAlert(false);
  }

  const handleOnSubmit = async () => {

    if (EmailValidator.validate(state.email)) {
      let data = {
        email: state.email
      }

      const response = await fetch('/api/loops_add', { method: 'POST', body: state.email });
      console.log(response);

      await addNewsletterSubscriberToStore(data);
      toast({
        title: "Success",
        description:
          "Thanks for signing up for the newsletter!",
        status: "success",
        duration: 6000,
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

    const alertstyle = {
      width: "10%",
    }


  }

  return (
    <Box {...sectionWrapper} as="section">
      <NewsletterWrapper>
        <Container>
          <Box {...textArea}>
            <Heading content="Stay in the Loop" {...title} />
            <Text fontSize={{base:"12px", sm:"18px", md:"24px", lg:"40px"}}
              content="Add your email to be notified when we add a new campaign!"
              {...description}
            />
          </Box>
          <Box {...buttonArea}>
            <ContactFormWrapper>
              <Input
                inputType="email"
                label="Email address"
                iconPosition="right"
                isMaterial={true}
                className="email_input"
                value={state.email}
                ref={controlref}
                onChange={handleEmailChange}
              />
              <Button {...buttonStyle} title="Subscribe" onClick={handleOnSubmit} />
            </ContactFormWrapper>
          </Box>
        </Container>
        {alert && <Alert className="alert_output" isMaterial={true} theColor={color}> {alertMessage} </Alert>}
      </NewsletterWrapper>
    </Box>
  );
};

Newsletter.propTypes = {
  sectionWrapper: PropTypes.object,
  textArea: PropTypes.object,
  buttonArea: PropTypes.object,
  buttonStyle: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
};

Newsletter.defaultProps = {
  sectionWrapper: {},
  textArea: {
    mb: ['40px', '40px', '40px', '0', '0'],
    pr: ['0', '0', '0', '80px', '100px'],
  },
  title: {
    fontSize: ['18px', '20px', '22px', '24px', '26px'],
    fontWeight: '500',
    color: '#fff',
    lineHeight: '1.34',
    mb: ['14px', '14px', '14px', '14px', '13px'],
    textAlign: ['center', 'center', 'center', 'left', 'left'],
    letterSpacing: '-0.025em',
  },
  description: {
    fontSize: ['14px', '14px'],
    maxWidth: ['100%', '400px'],
    fontWeight: '400',
    color: '#fefefe',
    lineHeight: '1.7',
    mb: 0,
    textAlign: ['center', 'center', 'center', 'left', 'left'],
  },
  buttonArea: {
    zIndex: 1,
  },
  buttonStyle: {
    type: 'button',
    fontSize: '14px',
    fontWeight: '700',
    pl: '30px',
    pr: '30px',
  },
};

export default Newsletter;
