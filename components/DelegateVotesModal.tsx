import React from "react";
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BiWrench, BiChevronRight } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";

export default function DelegateVotesModal({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
}): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <Heading as="h2" size="lg" textAlign={"center"}>
            Choose Delegation Type
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Box as={Button}>
            <Icon as={BiWrench} />
            Delegate to self.
            <Icon as={BiChevronRight} />
          </Box>
          <Box as={Button}>
            <Icon as={BsPersonCheck} />
            Delegate to an address.
            <Icon as={BiChevronRight} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
