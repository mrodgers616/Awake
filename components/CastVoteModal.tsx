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
import { useEffect, useState } from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import { BiWrench, BiChevronRight } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import { lighten } from '@chakra-ui/theme-tools';
import propTypes from 'prop-types';
import { fetchProposalFromStore, getProfileData, updateProposalInStore, updateOrAddProfileData } from "../lib/firebaseClient";
import { arrayUnion, Timestamp, increment } from "firebase/firestore";
import Confetti from 'react-confetti'
import PlaidLink from './plaidLinkButtonNoRedirect'


export default function CastVoteModal({
  onOpen,
  onClose,
  isOpen,
  campaign,
  profileData,
  uid,
  investments,
  slug
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
  campaign: any;
  profileData: any;
  uid: any;
  investments: any;
  slug: any;
}): JSX.Element {

  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false);
  const [showForAgainst, setShowForAgainst] = useState(true);
  const theConfetti: any = async () => {
    setShowConfetti(true);
    await sleep(7000);
    setShowConfetti(false);

  }

  if(profileData.investments) {
    setShowForAgainst(false)
  }

  function sleep(ms: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  let userInvestmentQuantity: number;

  function doesUserOwnSharesFor() {
    let campaignTicker = campaign.symbol;

    if (investments) {
      for (let i = 0; i < investments.length; i++) {
        let userInvestmentTicker = investments[i].ticker;
        if (userInvestmentTicker == campaignTicker) {
          userInvestmentQuantity = investments[i].quantity;
          userOwnSharesFor(i);
          return true;
        }
      }
      return userDoesNotOwnSharesFor();
      return false;
    }
    else {
      userDoesNotOwnSharesFor();
      return false;
    }

  }

  function userOwnSharesFor(i: number) {
    let currentVotes = campaign.verifiedVotes
    let users = campaign.users

    let forVotes = 1;
    let againstVotes = 0;

    if(campaign.verifiedVote) {
      againstVotes = campaign.verifiedVote.against
    }
    else {
      againstVotes = 0;
    }

    if(campaign.verifiedVote) {
      forVotes = Number(campaign.verifiedVote.for) + 1
    }
    else {
      forVotes = 1;
    }

    if (currentVotes && users) {
      const totalVotes = currentVotes + investments[i].quantity;
      users.push(uid);
      const dataToUpload = {
        verifiedVotes: increment(Number(investments[i].quantity)),
        users: arrayUnion(uid),
        verifiedVote:{
          for: forVotes,
          against: againstVotes
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }
    else {
      const dataToUpload = {
        verifiedVotes: Number(investments[i].quantity),
        users: [uid],
        verifiedVote:{
          for: 1,
          against: 0
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }

    const proposals = profileData.proposalsVotedOn
    if (proposals) {
      let newArrayofSlugs = proposals.push(slug)
      let slugs = {
        proposalsVotedOn: arrayUnion(slug),
      }

      updateOrAddProfileData(uid, slugs)
    }
    else {
      let slugs = {
        proposalsVotedOn: [slug],
      }

      updateOrAddProfileData(uid, slugs)
    }

  }

  function userDoesNotOwnSharesFor() {
    let currentVotes = campaign.unverifiedVotes
    let users = campaign.unverifiedUsers
    let forVotes = 1;
    let againstVotes = 0;

    if(campaign.unverifiedVote) {
      againstVotes = campaign.unverifiedVote.against
    }
    else {
      againstVotes = 0;
    }

    if(campaign.unverifiedVote) {
      forVotes = Number(campaign.unverifiedVote.for) + 1
    }
    else {
      forVotes = 1;
    }

    if (currentVotes && users) {
      const totalVotes = currentVotes + 1;
      users.push(uid);
      const dataToUpload = {
        unverifiedVotes: increment(1),
        unverifiedUsers: arrayUnion(uid),
        unverifiedVote:{
          for: forVotes,
          against: againstVotes
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }
    else {
      const dataToUpload = {
        unverifiedVotes: 1,
        unverifiedUsers: [uid],
        unverifiedVote:{
          for: 1,
          against: 0
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }

    const proposals = profileData.proposalsVotedOn
    if (proposals) {
      let newArrayofSlugs = proposals.push(slug)
      let slugs = {
        proposalsVotedOn: arrayUnion(slug)
      }

      updateOrAddProfileData(uid, slugs)
    }
    else {
      let slugs = {
        proposalsVotedOn: [slug],
      }

      updateOrAddProfileData(uid, slugs)
    }

  }

  function doesUserOwnSharesAgainst() {
    let campaignTicker = campaign.symbol;

    if (investments) {
      for (let i = 0; i < investments.length; i++) {
        let userInvestmentTicker = investments[i].ticker;
        if (userInvestmentTicker == campaignTicker) {
          userInvestmentQuantity = investments[i].quantity;
          userOwnSharesAgainst(i);
          return true;
        }
      }
      return userDoesNotOwnSharesAgainst();
      return false;
    }
    else {
      userDoesNotOwnSharesAgainst();
      return false;
    }

  }

  function userOwnSharesAgainst(i: number) {
    let currentVotes = campaign.verifiedVotes
    let users = campaign.users
    let forVotes = 0;
    let againstVotes = 1;

    if(campaign.verifiedVote) {
      forVotes = Number(campaign.verifiedVote.for) + 1
    }
    else {
      forVotes = 0;
    }

    if(campaign.verifiedVote) {
      againstVotes = Number(campaign.verifiedVote.against) + 1
    }
    else {
      againstVotes = 1;
    }

    if (currentVotes && users) {
      const totalVotes = currentVotes + investments[i].quantity;
      users.push(uid);
      const dataToUpload = {
        verifiedVotes: increment(Number(investments[i].quantity)),
        users: arrayUnion(uid),
        verifiedVote:{
          for: forVotes,
          against: againstVotes
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }
    else {
      const dataToUpload = {
        verifiedVotes: Number(investments[i].quantity),
        users: [uid],
        verifiedVote:{
          for: 0,
          against: 1
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }

    const proposals = profileData.proposalsVotedOn
    if (proposals) {
      let newArrayofSlugs = proposals.push(slug)
      let slugs = {
        proposalsVotedOn: arrayUnion(slug),
      }

      updateOrAddProfileData(uid, slugs)
    }
    else {
      let slugs = {
        proposalsVotedOn: [slug],
      }

      updateOrAddProfileData(uid, slugs)
    }

  }

  function userDoesNotOwnSharesAgainst() {
    let currentVotes = campaign.unverifiedVotes
    let users = campaign.unverifiedUsers

    let forVotes = 0;
    let againstVotes = 1;

    if(campaign.unverifiedVote) {
      forVotes = Number(campaign.unverifiedVote.for) + 1
    }
    else {
      forVotes = 0;
    }

    if(campaign.unverifiedVote) {
      againstVotes = Number(campaign.unverifiedVote.against) + 1
    }
    else {
      againstVotes = 1;
    }

    if (currentVotes && users) {
      const totalVotes = currentVotes + 1;
      users.push(uid);
      const dataToUpload = {
        unverifiedVotes: increment(1),
        unverifiedUsers: arrayUnion(uid),
        unverifiedVote:{
          for: forVotes,
          against: againstVotes
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }
    else {
      const dataToUpload = {
        unverifiedVotes: 1,
        unverifiedUsers: [uid],
        unverifiedVote:{
          for: 0,
          against: 1
        }
      }

      updateProposalInStore(slug, dataToUpload);
    }

    const proposals = profileData.proposalsVotedOn
    if (proposals) {
      let newArrayofSlugs = proposals.push(slug)
      let slugs = {
        proposalsVotedOn: arrayUnion(slug)
      }

      updateOrAddProfileData(uid, slugs)
    }
    else {
      let slugs = {
        proposalsVotedOn: [slug],
      }

      updateOrAddProfileData(uid, slugs)
    }

  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      {showConfetti && (<Confetti width={width} height={height}/>)}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          {showForAgainst && (
          <Heading as="h2" size="lg" textAlign={"center"}>
            {/*Choose Delegation Type*/}
            Do you own shares in {`${campaign.companyName}`}?
          </Heading>
          )}
          {!showForAgainst && (
          <Heading as="h2" size="lg" textAlign={"center"}>
            {/*Choose Delegation Type*/}
            Thanks for Voting!
          </Heading>
          )}
        </ModalHeader>
        <ModalBody 
          as={Flex}
          justifyContent={"center"}
        >
          {showForAgainst && (
          <>
            <Button w='33%' border="0px" bg='white' as={PlaidLink} onClick={() => {doesUserOwnSharesFor(); theConfetti(); setShowForAgainst(false);}}>
            </Button>
          </>)}
          {showForAgainst && (
          <Button
            w='33%'
            bg='white'
            color='red' border="2px solid #F1F1F1"
            onClick={() => { doesUserOwnSharesFor(); theConfetti(); setShowForAgainst(false); }}
          >No</Button>)}
          {/*<Button
            w='33%'
            bg='purple'
            color='white'
            ml='16px'
  >Abstain</Button>*/}
        </ModalBody>
        {!showForAgainst && (
        <ModalBody>
          <Heading as="h4" size="sm"> Your vote and votes like yours are important for this campaign&apos;s success</Heading>
        </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}

CastVoteModal.propTypes = {
  campaign: propTypes.any.isRequired,
  profileData: propTypes.any.isRequired,
  uid: propTypes.any.isRequired,
  investments: propTypes.any.isRequired,
  slug: propTypes.any.isRequired,
};
