import {
  ButtonProps,
  useDisclosure,
  Button,
  ButtonGroup,
  Badge,
} from "@chakra-ui/react";
import { useWeb3 } from "../contexts/Web3Context";
import React from "react";
import WalletModal from "./WalletModal";

export default function WalletConnectBtn(props: ButtonProps) {
  const { hasWeb3, walletAddress, connectWallet, isConnected, earthBalance } = useWeb3();

  const {
    isOpen: walletModalIsOpen,
    onOpen: onWalletModalOpen,
    onClose: onWalletModelClose,
  } = useDisclosure();

  function handleClick() {
    if (!hasWeb3) {
      alert(
        "Please use a Web3 compatible browser or extension, such as MetaMask"
      );
    }
    if (walletAddress) {
      onWalletModalOpen();
    } else {
      connectWallet();
    }
  }

  return (
    <>
      <ButtonGroup isAttached onClick={handleClick}>
        {isConnected && (
          <Badge 
            //disabled 
            variant="outline"
            display='flex'
            p='8px 16px'
            alignItems='center'
            justifyContent='center'
            borderRadius='8px'
          >
            { earthBalance || 0 } CLIMATE
          </Badge>
        )}
        <Button 
          onClick={handleClick}
          color='white'
          bg='seafoam.500'
          ml='8px'
        >
          {walletAddress
            ? `${walletAddress.substring(0, 4)}..${walletAddress.substring(
                walletAddress.length - 3
              )}`
            : "Connect Wallet"}
        </Button>
      </ButtonGroup>
      <WalletModal isOpen={walletModalIsOpen} onClose={onWalletModelClose} />
    </>
  );
}
