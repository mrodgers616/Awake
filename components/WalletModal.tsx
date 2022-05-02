import React from "react";
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useWeb3 } from "../contexts/Web3Context";

export default function WalletModal({
  onOpen,
  onClose,
  isOpen
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
}): JSX.Element {

  const {
    disconnectWallet
  } = useWeb3();

  const handleDisconnect = () => {
    disconnectWallet();
    onClose();
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <Heading as="h2" size="lg" textAlign={"center"}>
            Manage your wallet.
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Button onClick={handleDisconnect}>
            Disconnect Wallet
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
