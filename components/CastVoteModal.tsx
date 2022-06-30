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
} from "@chakra-ui/react";
import { BiWrench, BiChevronRight } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import { lighten } from '@chakra-ui/theme-tools';

export default function CastVoteModal({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
}): JSX.Element {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <Heading as="h2" size="lg" textAlign={"center"}>
            {/*Choose Delegation Type*/}
            Thanks For Supporting This Campagin
          </Heading>
        </ModalHeader>
        <ModalBody 
          as={Flex}
          justifyContent={"center"}
        >
          {/*<Button
            w='33%'
            bg={'seafoam.500'}
            color='white'
            mr='16px'
          >For</Button>
          <Button
            w='33%'
            bg='red'
            color='white'
          >Against</Button>
          <Button
            w='33%'
            bg='purple'
            color='white'
            ml='16px'
  >Abstain</Button>*/}
          <Heading as="h4" size="sm"> Find out more about what your vote does below </Heading>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
