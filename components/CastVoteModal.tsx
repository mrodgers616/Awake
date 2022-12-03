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
  Link
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
import { useToast } from "@chakra-ui/react";
import useWindowSize from 'react-use/lib/useWindowSize'
import { BiWrench, BiChevronRight } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import { lighten } from '@chakra-ui/theme-tools';
import propTypes from 'prop-types';
import { fetchProposalFromStore, getProfileData, updateProposalInStore, updateOrAddProfileData, addNewsletterSubscriberToStore } from "../lib/firebaseClient";
import { arrayUnion, Timestamp, increment } from "firebase/firestore";
import Confetti from 'react-confetti'
import LinkAccount from './plaidLinkButtonNoRedirect'
import { event } from "nextjs-google-analytics"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import copy from "copy-to-clipboard";

interface Categories {
  title: string;
  field: string;
}

interface InvestmentData {
  error: null;
  holdings: InvestmentsHoldingsGetResponse;
}

const formatCurrency = (
  number: number | null | undefined,
  code: string | null | undefined
) => {
  if (number != null && number !== undefined) {
    return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
  }
  return "no data";
};

const transformInvestmentsData = (data: InvestmentData) => {
  const holdingsData = data.holdings.holdings!.sort(function (a, b) {
    if (a.account_id > b.account_id) return 1;
    return -1;
  });
  return holdingsData.map((holding) => {
    const account = data.holdings.accounts!.filter(
      (acc) => acc.account_id === holding.account_id
    )[0];
    const security = data.holdings.securities!.filter(
      (sec) => sec.security_id === holding.security_id
    )[0];
    const value = holding.quantity * security.close_price!;

    const obj = {
      mask: account.mask!,
      name: security.name!,
      ticker: security.ticker_symbol!,
      quantity: formatCurrency(holding.quantity, ""),
      price: formatCurrency(
        security.close_price!,
        account.balances.iso_currency_code
      ),
      value: formatCurrency(value, account.balances.iso_currency_code),
    };
    return obj;
  });
};

export default function CastVoteModal({
  onOpen,
  onClose,
  isOpen,
  campaign,
  profileData,
  uid,
  investmentsOld,
  slug,
  referralLink,
}: {
  onOpen?: () => void;
  onClose: () => void;
  isOpen: boolean;
  campaign: any;
  profileData: any;
  uid: any;
  investmentsOld: any;
  slug: any;
  referralLink: any;
}): JSX.Element {

  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false);
  const [showForAgainst, setShowForAgainst] = useState(profileData?.investments ? false : true);
  const [showModal, setShowModal] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [investments, setInvestments] = useState(investmentsOld);
  const toast = useToast();
  const theConfetti: any = async () => {
    setShowConfetti(true);
    await sleep(7000);
    setShowConfetti(false); 

  }

  function sleep(ms: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  let userInvestmentQuantity: number;

  function plaidOpened() {
    try {
      event("PlaidOpened", {
        category: "Plaid",
        label: "User successfully linked Plaid",
        uid: uid ? uid : "not logged in",
      });
    }
    catch(e) {

    }
  }

  async function doesUserOwnSharesFor(inc: any) {
    let campaignTicker = campaign?.symbol;

    const cookies = parseCookies();

    if(cookies?.referralCode) {
      let data = {
        referral: increment(inc)
      };

      await updateOrAddProfileData(cookies.referralCode, data);

      destroyCookie(null, 'referralCode',{
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }

    let profile = await getProfileData(uid);
    const profileData = {
      ...profile.data()
    };

    const pullNewInvestments = profileData?.investments ? profileData.investments : null;
    setInvestments(pullNewInvestments);


    if (pullNewInvestments) {
      for (let i = 0; i < pullNewInvestments.length; i++) {
        let userInvestmentTicker = pullNewInvestments[i].ticker;
        if (userInvestmentTicker == campaignTicker) {
          userInvestmentQuantity = pullNewInvestments[i].quantity;
          userOwnSharesFor(i, pullNewInvestments);
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

  function userOwnSharesFor(i: number, invest: any) {
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
      //const totalVotes = currentVotes + invest[i].quantity;
      users.push(uid);
      if(Number.isNaN(Number(invest[i].quantity))) {
        const dataToUpload = {
          verifiedVotes: campaign.verifiedVotes,
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
          verifiedVotes: increment(Number(invest[i].quantity)),
          users: arrayUnion(uid),
          verifiedVote:{
            for: forVotes,
            against: againstVotes
          }
      }
      updateProposalInStore(slug, dataToUpload);
      
      }
    }
    else {
      const dataToUpload = {
        verifiedVotes: Number(invest[i].quantity),
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

    const proposals = profileData?.proposalsVotedOn
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
      for (let i = 0; i < investments?.length; i++) {
        let userInvestmentTicker = investments[i]?.ticker;
        if (userInvestmentTicker == campaignTicker) {
          userInvestmentQuantity = investments[i]?.quantity;
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
    let currentVotes = campaign?.verifiedVotes
    let users = campaign?.users
    let forVotes = 0;
    let againstVotes = 1;

    if(campaign?.verifiedVote) {
      forVotes = Number(campaign?.verifiedVote.for) + 1
    }
    else {
      forVotes = 0;
    }

    if(campaign.verifiedVote) {
      againstVotes = Number(campaign?.verifiedVote.against) + 1
    }
    else {
      againstVotes = 1;
    }

    if (currentVotes && users) {
      const totalVotes = currentVotes + investments[i]?.quantity;
      users.push(uid);
      const dataToUpload = {
        verifiedVotes: increment(Number(investments[i]?.quantity)),
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
        verifiedVotes: Number(investments[i]?.quantity),
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

  const [theToken, setTheToken] = useState(null);
  const [isPlaidConnectedBefore, setIsPlaidConnectedBefore] = useState(String);
  let plaidConnectedBefore: any;



  async function loadOnPageLoad() {
    const token = await createLinkToken();
    const profile = await getProfileData(uid);
    const profileData = {
      ...profile.data()
    };
    setTheToken(token);
    setIsPlaidConnectedBefore(profileData.plaidPublicToken);
    plaidConnectedBefore = profileData.plaidPublicToken;
    
  }


  async function createLinkToken() {
    // get a link_token from your server
    ////console.log("link token begin")
    try {
      // get a link_token from your server
      const response = await fetch('/api/create_link_token', { method: 'POST', body: uid });
      const { link_token } = await response.json();
      return link_token;
    }
    catch (e) {
      console.log(e);
    }
  }

  async function getInvestmentData(accessToken: any) {
    try {
      const response = await fetch("/api/get_investment_data/", { method: 'POST', body: accessToken });
      return await response.json();
    }
    catch (e) {
      ////console.log(e);
    }
  }

  async function getAccessToken(publicToken: any) {
    try {
      const response = await fetch("/api/get_access_token/", { method: 'POST', body: publicToken });
      ////console.log(response);
      const accessToken = await response.json();
      return accessToken.access_token;

    }
    catch (e) {
      ////console.log(e);
    }
  }

  async function storeInvestmentData(data: any) {
    //console.log(data);
    let data2: InvestmentData = {
      error: null,
      holdings: data,
    }

    const transformedData = transformInvestmentsData(data2);

    const finalData = {
      investments: transformedData
    }
    //console.log("here")
    try {
      await updateOrAddProfileData(uid, finalData);
    }
    catch (e) {
      //console.log(e);
    }
  }

  function isPlaidConnectedAlready() {
    if (isPlaidConnectedBefore) {
      return true;
    }
    else {
      return false;
    }
  }

  const onSuccess: PlaidLinkOnSuccess = (publicToken, metadata) => {
    const accessToken = getAccessToken(publicToken).then(value => {
      const finalPublicToken = {
        plaidPublicToken: publicToken,
        accessToken: value
      }
      updateOrAddProfileData(uid, finalPublicToken);
      
      const data = getInvestmentData(value).then(dataValue => {
        storeInvestmentData(dataValue).then(() => {
          doesUserOwnSharesFor(100); 
          theConfetti(); 
          setShowForAgainst(false); 
          setShowModal(true);
          try {
            event("Plaid_Success", {
              category: "Plaid",
              label: "User successfully linked Plaid",
              uid: uid,
            });
          }
          catch(e) {

          }
        })
      });
    });
  };

  const onEvent: PlaidLinkOnEvent = (eventName, metadata) => {
    try {
      event("Plaid_Usage", {
        category: "Plaid",
        label: "User used Plaid",
        uid: uid,
      });
    }
    catch(e) {

    }
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
  };

  const onExit: PlaidLinkOnExit = (error, metadata) => {
    setShowModal(true);
    try {
      event("Plaid_Connect_Click_Out", {
        category: "Plaid",
        label: "Closed Plaid without linking",
        uid: uid,
      });
    }
    catch(e) {
      
    }
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    ////console.log(error, metadata);
  };

  const config: PlaidLinkOptionsWithLinkToken = {
    onSuccess,
    onExit,
    onEvent,
    token: theToken,
  };

  const handleOnClick = () => {
    console.log("here")
    setShowModal(false)

  }

  const handleYesClick = () => {
    setShowDisclaimer(true);
  }

  const handleNewsLetter = async () => {
    let profile = await getProfileData(uid);
    const profileData = {
      ...profile.data()
    };

    const email = profileData.email
    let data = {
      email: email
    }
    addNewsletterSubscriberToStore(data);

    toast({
      title: "Success",
      description:
        "Thanks for signing up for the newsletter!",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  }

  const handleReferral = async () => {
    copy(referralLink);

    toast({
      title: "",
      description:
        "Link Copied to Clipboard!",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  }

  useEffect(() => {
    loadOnPageLoad();
    
  }, []);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      trapFocus={false}
    >
      {showConfetti && (<Confetti width={width} height={height}/>)}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          {showForAgainst && (
            <>
            {showDisclaimer ? 
              (<>
              
              <Heading as="h2" size="lg" textAlign={"center"}>
              Link Your Investment Account
              </Heading>
              <ModalBody>
                <Text fontSize="md" textAlign={"left"}>
                  Linking a brokerage account and proving you own shares gives us, as a community, much more leverage and increases the likelihood of this campaign succeeding
                </Text>
                <br/>
                <Heading as="h2" size="lg" textAlign={"center"} textColor="#8C74E7">Facts About Your Data:</Heading>
                <br/>
                <Text fontSize="md" textAlign={"left"}>
                  1. Your Data is securely stored and is only used anonymously to calculate an aggregate number of shares committed to this campaign.
                </Text>
                <br/>
                <Text fontSize="md" textAlign={"left"}>
                  2. Awake only tracks basic information like how many shares you own. This data is not visible to anyone else including Awake employees.
                </Text>
                <br/>
                <Text fontSize="md" textAlign={"left"}>
                  3. Awake will never sell your data.
                </Text>
              </ModalBody>
              
              </>)
              :
              (<Heading as="h2" size="lg" textAlign={"center"}>
                Do you own shares in {`${campaign.companyName}`}?
              </Heading>)
            }
          </>
          )}
          {!showForAgainst && (
          <Heading as="h2" size="lg" textAlign={"center"} color="green" mt="20px">
            {/*Choose Delegation Type*/}
            You&apos;re the Absolute Best!
          </Heading>
          )}
        </ModalHeader>
        <ModalBody 
          as={Flex}
          justifyContent={"center"}
        >
          {showForAgainst && (
          <>
            {showDisclaimer ? (<>
              <Button w='33%' mr="5%" border="0px" as={PlaidLink} bg='white' color="green"
              onClick={handleOnClick}
              token={theToken}
              onSuccess={onSuccess}
              onEvent={onEvent}
              onExit={onExit}
              >Continue
              </Button>
            </>) :
            (<>
            <Button w='33%' mr="5%" border="2px solid #F1F1F1" bg='white' color="green"
                onClick={() => {handleYesClick(); plaidOpened()}}
                >Yes
            </Button>
            <Button
              w='33%'
              bg='white'
              color='red' border="2px solid #F1F1F1"
              onClick={() => { doesUserOwnSharesFor(1); theConfetti(); setShowForAgainst(false); }}
            >No
            </Button></>
            )}
          </>
          )}
          {/*<Button
            w='33%'
            bg='purple'
            color='white'
            ml='16px'
  >Abstain</Button>*/}
        </ModalBody>
        {!showForAgainst && (
        <ModalBody mx="20px" mb="20px">
          <Center>
            <Stack>
            <Heading as="h4" size="sm" color='black'> Your vote helps us fight for corporate accountability! Check out our <Text as='mark'><b>$2000 referral raffle</b></Text> and read what happens next:</Heading>
            <br></br>
                <ol>
                  <Text><b>1.</b> Awake will write to the company&apos;s corporate sectretary once we reach 5,000 signatures to push for change!</Text>
                  <br></br>
                  <Text><b>2. </b><Button variant='link' colorScheme='blue' onClick={handleReferral}> Here&apos;s your personal referral link.</Button> You earn 1 raffle ticket for each person you refer, 100 If they connect a brokerage account through Plaid.</Text>
                  <br></br>
                  
                  <Text><b>3. </b> We&apos;ll reach out to you to share major updates on the campaign and other ways to get involved.</Text>
                </ol>
            </Stack>
          </Center>
        </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}

CastVoteModal.propTypes = {
  campaign: propTypes.any,
  profileData: propTypes.any,
  uid: propTypes.any,
  investmentsOld: propTypes.any,
  slug: propTypes.any.isRequired,
  referralLink: propTypes.any,
};
