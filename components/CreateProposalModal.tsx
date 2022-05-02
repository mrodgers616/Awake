import React from "react";
import {
  chakra,
  Box,
  Heading,
  FormErrorMessage,
  Icon,
  FormLabel,
  FormControl,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import GoveranceProposalForm from "./GovernanceProposalForm";
import ActivistProposalForm from "./ActivistProposalForm";

export default function CreateProposalForm({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
}): JSX.Element {

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <Heading as="h2" size="lg" textAlign={"center"}>
            Create Proposal
          </Heading>
        </ModalHeader>
        <Tabs isFitted variant='enclosed'>
          <TabList>
            <Tab>Governance Proposal</Tab>
            <Tab>Activist Proposal</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GoveranceProposalForm onClose={onClose}/>
            </TabPanel>
            <TabPanel>
              <ActivistProposalForm onClose={onClose}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
      </ModalContent>
    </Modal>
  );
}
