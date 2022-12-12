import React from "react";
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Button,
  Icon,
  Center,
  Text,
  Stack,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as EmailValidator from 'email-validator';
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { generate } from "generate-password"

export default function WaitlistModal({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
}): JSX.Element {

  const [showModal, setShowModal] = useState(true);
  const [emailValue, setEmailValue] = React.useState('')
  const handleEmailChange = (event: any) => setEmailValue(event.target.value)

  const [passwordValue, setPasswordValue] = React.useState('')
  const handlePasswordChange = (event: any) => setPasswordValue(event.target.value)

  const [nameValue, setNameValue] = React.useState('')
  const handleNameChange = (event: any) => setNameValue(event.target.value)

  const router = useRouter();
  const toast = useToast();
  const { modalRegister: modalRegister } = useAuth();

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'matthew@awakeinvest.com',
  //     pass: 'Wehttam123@'
  //   }
  // });

  // const mailOptions = (email: any, password: any) => {

  //   return {
  //     from: 'donotreply@awakeinvest.com',
  //     to: email,
  //     subject: 'Thanks for signing the Petition',
  //     text: "Thanks for signing the Petition! Here are your account credentials: email: " + email + " password: " + password
  //   }
  // };

  const handleOnClick = () => {
    if(EmailValidator.validate(emailValue)) {
      const username = emailValue.split("@")[0] + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10));
      const pass = generate({
        length: 10,
	      numbers: true
      })
      modalRegister(nameValue, username, emailValue, pass)
      // transporter.sendMail(mailOptions(emailValue, pass), function(error: any, info:any){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
      //router.push('/register')
    }
    else {
      toast({
        title: "Invalid Email",
        description:
          "Please check and try again",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }

  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      trapFocus={false}
      size="md"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <Heading as="h2" size="lg" textAlign={"center"}>
            Thanks for Joining the Waitlist
          </Heading>
        </ModalHeader>
        <ModalBody 
          as={Flex}
          justifyContent={"center"}
        >
          <Center>
            <Stack spacing="6">
              <Text>We will reach out as we are ready to onboard new users. In the meantime, check out our ongoing petition regarding Apple and toxic E-waste.</Text>
              <Center>
                <Button w='50%' border="0px" bg='white' color="purple" onClick={() => {handleOnClick()}}>
                  Check out Petition
                </Button>
              </Center>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
