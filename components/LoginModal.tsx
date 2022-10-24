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
  Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Configuration, LinkTokenCreateRequest, PlaidApi, PlaidEnvironments, InvestmentsHoldingsGetResponse } from 'plaid';
import {
  PlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  usePlaidLink,
  PlaidLinkOptionsWithLinkToken,
} from 'react-plaid-link';
import useWindowSize from 'react-use/lib/useWindowSize'
import { BiWrench, BiChevronRight } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import { lighten } from '@chakra-ui/theme-tools';
import propTypes from 'prop-types';
import { fetchProposalFromStore, getProfileData, updateProposalInStore, updateOrAddProfileData } from "../lib/firebaseClient";
import { arrayUnion, Timestamp, increment } from "firebase/firestore";
import Confetti from 'react-confetti'
import LinkAccount from './plaidLinkButtonNoRedirect'
import { useRouter } from "next/router";


export default function LoginModal({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
}): JSX.Element {

  const [showModal, setShowModal] = useState(true);

  const router = useRouter();

  const handleOnClick = () => {
    console.log("here")
    setShowModal(false)
    router.push('/register')

  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <Heading as="h2" size="lg" textAlign={"center"}>
            Create an account
          </Heading>
        </ModalHeader>
        <ModalBody 
          as={Flex}
          justifyContent={"center"}
        >
          <Center>
            <Stack>
              <Text align="center">Creating an account and linking a brokerage account differentiates your vote from other platforms and helps to make an actual impact</Text>
              <Center>
              <Button w='50%' border="0px" bg='white' color="purple" onClick={() => {handleOnClick()}}>
                Continue
              </Button>
              </Center>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
