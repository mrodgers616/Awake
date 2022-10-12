import Head from "next/head";
import { useRouter } from "next/router";
import {
  Image,
  Text,
  Flex,
  Heading,
  Button,
  Badge,
  Box,
  Icon,
  Container,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import useWindowSize from 'react-use/lib/useWindowSize'
import { FaClipboard, FaTwitter, FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchProposalFromStore, getProfileData, updateProposalInStore, updateOrAddProfileData } from "../../lib/firebaseClient";
import { GetServerSidePropsContext } from "next";
import { arrayUnion, Timestamp, increment } from "firebase/firestore";
import CastVoteModal from "../../components/CastVoteModal";
import Link from "../../components/Link"; 
import axios from "axios";
import copy from "copy-to-clipboard";
import nookies from 'nookies';
import { admin } from '../../lib/firebaseAdmin';
import { IoArrowBackOutline } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import MasterCommentThread from "../../components/comments/masterCommentThread";
import plaidLink from "../../components/plaidLinkButton"
import Confetti from 'react-confetti'
import ewaste from '../../public/illustrations/ewaste2.jpeg'

const images = [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1445887374063-34abd495852c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1535&q=80",
];

enum State {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

export default function Proposal({
  campaign,
  stockData,
  investments,
  slug,
  uid,
  profileData,
}: {
  campaign: any;
  stockData: any;
  investments: any;
  slug: string;
  uid: any;
  profileData: any;
}): JSX.Element {
  const [modalClose, setModalClose] = useState(false);
  const [currentState, setCurrentState] = useState<string>();
  const [historicalStockPrice, setHistoricalStockPrice] = useState<any>();
  const [_votes, setVotes] = useState<string>();
  const [showConfetti, setShowConfetti] = useState(false);

  const toast = useToast();

  const router = useRouter();
  const { userid } = useAuth();
  const { width, height } = useWindowSize()

  let userInvestmentQuantity: number;

  const {
    isOpen: voteModalIsOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();

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

  function checkAndVote() {
    if(profileData.investments) {
      doesUserOwnSharesFor();
      theConfetti();
    }
  }

  useEffect(() => {

    if (stockData !== null) {
      const lineData = [];
      const timeSeriesDaily = stockData["Time Series (Daily)"];
      for (const series in timeSeriesDaily) {
        for (const data in timeSeriesDaily[series]) {
          if (data === "1. open") {
            lineData.push({
              date: series,
              price: parseFloat(timeSeriesDaily[series][data]),
            });
          }
        }
      }
      setHistoricalStockPrice(lineData);
    }
  }, []);

  const pageUri = `https://awakeinvest.com${router.basePath}${router.asPath}`;

  function hasUserVoted() {
    try {
      const votedproposals = profileData.proposalsVotedOn
      if (votedproposals) {
        for (let i = 0; i < votedproposals.length; i++) {
          if (votedproposals[i] === slug) {
            return true
          }
        }
        return false
      }
      else {
        return false;
      }
    }
    catch (err) {
      //router.push("/login");
    }


  }

  function goBack() {
    router.push("/campaigns");
  }

  function howManyUsers() {
    if(campaign.unverifiedUsers && campaign.users) {
      return (campaign.unverifiedUsers.length + campaign.users.length)
    }
    else if(campaign.unverifiedUsers) {
      return campaign.unverifiedUsers.length;
    }
    else if(campaign.users) {
      return campaign.users.length;
    }
    else {
      return 0;
    }
  }

  const socialMedia = [
    {
      name: "twitter",
      icon: FaTwitter,
      link: encodeURI(
        `https://twitter.com/intent/tweet?text=I just backed the ${campaign.title} campaign on Awake. learn more here:\n&url=${pageUri}`
      ),
    },
    {
      name: "facebook",
      icon: FaFacebook,
      link: encodeURI(
        `https://www.facebook.com/sharer/sharer.php?u=https://www.awakeinvest.com/campaigns/${campaign.slug}`
      ),
    },
    {
      name: "clipboard",
      icon: FaClipboard,
      link: encodeURI(pageUri),
    },
  ];

  return (
    <>
      <Head>
        {/* <title>Proposal {campaign?.id} | Awake</title> */}
      </Head>
      {showConfetti && (<Confetti width={width} height={height}/>)}
      <Box
        mt="0px"
        bg="rgb(164,191,217)"
        bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
        //bgImage="url('https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1259&q=80')"
        bgSize="cover"
        position="relative"
        zIndex={0}
      >

        <Box
          position="absolute"
          w="100%"
          h="100%"
          zIndex={0}
          top="0"
          left="0"
        />
        <Container p="0 25px" m="0 auto" width={"100%"}>
          <Button leftIcon={<IoArrowBackOutline />} bgColor="white" border="1px" onClick={() => goBack()} mt="2%" ml="-12%" position="fixed" paddingLeft="20px" display={{ base: "none", sm: "none" }}>
            All Campaigns
          </Button>
          <Flex
            position="relative"
            minH="300px"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            zIndex={250}
          >
            <Heading fontSize="42px" mt="20" color="white" w="100%">
              {campaign?.title ?? "TITLE!"}
            </Heading>
          </Flex>
        </Container>
      </Box>
      <Container position="relative" mt="-60px" zIndex={1}>
        <Flex
          w="100%"
          mb="32px"
          bg='#08152E'
          height={{
            base: 'fit-content',
            lg: "120px"
          }}
          borderRadius="16px"
          justifyContent="center"
          alignItems="center"
          boxShadow="4px 4px 62px -9px rgba(0, 0, 0, 0.15)"
          zIndex={500}
          flexDir={{
            base: "column",
            md: "row"
          }}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexBasis="50%"
            borderRight={{
              base: 'none',
              md: "1px solid #eaeaea"
            }}
            flexDirection={{
              base: 'row',
              sm: "row",
              lg: 'row'
            }}
            m='16px'
          >
            <Box color="white" p={{ base: '6', lg: "16px 24px" }}>
              <Heading textAlign={"center"} fontSize={{ base: "24px", sm: "24px", lg: "48px" }} color="White">
                {campaign.verifiedVotes ? String(Math.round(campaign.verifiedVotes * 100) /100) : "0"}
              </Heading>
              <Text fontWeight={500} fontSize={{ base: "16px", lg: "24px" }}>
                Shares Commited
              </Text>
            </Box>
            <Box color="white" p={{ base: '4', lg: "16px 24px" }}>
              <Heading textAlign={"center"}
                fontSize={{ base: "24px", sm: "24px", lg: "48px" }}
                color="White">
                {String(howManyUsers())}
              </Heading>
              <Text fontWeight={500} fontSize={{ base: "16px", lg: "24px" }}>
                Supporters
              </Text>
            </Box>
          </Flex>
          <Flex
            h="100%"
            flexBasis={"50%"}
            justifyContent="center"
            alignItems="center"
          >
            {userid ? ( <>
              <Button
                {...hasUserVoted() ? { bg: "gray", disabled: true } : { bg: "rgb(164,191,217)", disabled: false }}
                bg="rgb(100, 43, 115)"
                color="white"
                fontSize="1.4em"
                w={{ lg: "350px" }}
                mr={{
                  base: "0px", sm: "0", lg: "16px"
                }}
                mb={{
                  base: '32px',
                  md: '0'
                }}
                h="64px"
                onClick={() => { onVoteModalOpen(); setModalClose(false); checkAndVote();}}
              >
                {hasUserVoted() ? "Already Voted!" : "Vote"}
              </Button>
              { !modalClose && <CastVoteModal
                isOpen={voteModalIsOpen}
                onClose={ () => {onVoteModalClose; setModalClose(true)}}
                onOpen={onVoteModalOpen}
                campaign={campaign}
                profileData={profileData}
                uid={uid}
                investments={investments}
                slug={slug}
              /> } </>)
              : 
              (<Button
                bg="rgb(100, 43, 115)"
                color="white"
                fontSize="1.4em"
                w={{ lg: "350px" }}
                mr={{
                  base: "0px", sm: "0", lg: "16px"
                }}
                mb={{
                  base: '32px',
                  md: '0'
                }}
                h="64px"
                // enabling users to support the campaign if they have enough balance
                // change made in the "testing waters" commit
                // disabled={!hasEnoughBalance}
                // textDecoration="none"
                // _hover={{
                //   textDecoration: "none",
                //   bg: lighten("seafoam.500", 0.8),
                // }}
                // What is the 
                // onClick={() => {/*onVoteModalOpen(); doesUserOwnShares();*/}}
                onClick={() => { router.push('/login'); }}
              >
               {"Support Campaign"}
              </Button>) 
            }
            
            
          </Flex>
        </Flex>
        <Flex mt="64px" w="100%">
          <Flex mb="64px" flexDir={"column"} w={{ base: "100%", sm: "100%", md: "60%", lg: "60 %" }} mr="32px">
            <Box mb="32px">
              <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                About Campaign
              </Heading>
              {campaign?.companyName == "Apple" ? 


                campaign?.description && (<Text>
                  {String(campaign?.description).substring(0,268)}
                  <br/>
                  <Image mt="20px" mb="10px" alt="Image of e-waste" src="https://cdn.who.int/media/images/default-source/children-s-environmental-health/dangerous-methods-are-used-to-recycle-e-waste.jpg?sfvrsn=1bbd20b5_23"></Image>
                  <br/>
                  {String(campaign?.description).substring(268,1385)}
                  <br/>
                  <br/>
                  {String(campaign?.description).substring(1385)}
                </Text>) 


                : 


                campaign?.description && (<Text>
                  {campaign?.description}
                </Text>)}
              
            </Box>

            <Box display={{ base: "none", sm: "none", lg: "block" }}>
              <Flex justifyContent="space-between">
                <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                  discussion
                </Heading>
              </Flex>
              <br></br>
              <Box mt="2%" mb="2%">
                <MasterCommentThread type="deal" slug={slug} userIdForComment={uid} maxThreadDepth={3}></MasterCommentThread>
              </Box>
            </Box>
          </Flex>
          <Flex mb="63px" flexDir={"column"} w={{ base: '100%', md: "45%" }} display={{ base: "none", sm: "none", lg: "block" }}>

            <Flex mb="63px" flexDir={"column"} w="25%">
              <Flex
                position="absolute"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                // width={60}
                backgroundColor="FFFFFF"
                boxShadow='2xl' p='6'
                borderRadius="16px"
                mt='12px'
                mb="50%"
                ml="30px"
                border="3px solid gray"
              >
                {/* <Image height="125px" width="250px" /> */}
                <Image w="50%" height="70%" src={campaign.image ? campaign.image : "/nature/lakeside.png"} alt="campaign image" />
                <Text fontSize="xl" fontWeight="bold" mb={4} mt={4}>
                  {campaign?.title}
                </Text>
                <Button
                  {...hasUserVoted() ? { bg: "gray", disabled: true } : { bg: "rgb(164,191,217)", disabled: false }}
                  variant="solid"
                  size={{ base: "sm", sm: "sm", lg: "lg" }}
                  width={48}
                  backgroundColor="rgb(164,191,217)"
                  mb='10px'
                  onClick={() => { onVoteModalOpen(); }}
                >
                  {hasUserVoted() ? "Already Supported!" : "Support Campaign"}
                </Button>
                <Flex justifyContent="center" alignItems="space-around" width={48}>
                  <Box>
                    <Flex alignItems={"center"} justifyContent={"flex-start"}>
                      {socialMedia.map((social: any, index: number) => {
                        if (social.name === "clipboard") {
                          return (
                            <Button
                              key={index}
                              name={social.name}
                              w="48px"
                              h="48px"
                              onClick={() => copy(social.link)}
                              background="transparent"
                              _hover={{
                                background: "transparent",
                              }}
                              p="8px"
                            >
                              <Icon
                                w={8}
                                h={8}
                                _hover={{ color: "seafoam.500" }}
                                as={social.icon}
                              />
                            </Button>
                          );
                        } else {
                          return (
                            <Link
                              key={index}
                              href={social.link}
                              target="_blank"
                              background="transparent"
                              _hover={{
                                background: "transparent",
                              }}
                              w="48px"
                              h="48px"
                              onClick={() => {
                                copy(social.link, {
                                  message: "Copied to clipboard",
                                });
                              }}
                              p="8px"
                            >
                              <Icon
                                w={8}
                                h={8}
                                _hover={{ color: "seafoam.500" }}
                                as={social.icon}
                              />
                            </Link>
                          );
                        }
                      })}
                    </Flex>
                  </Box>
                </Flex>
              </Flex>

            </Flex>

          </Flex>
        </Flex>
        {/* I've commented out the steps section and the latest articles section for simplicity */}
        {/* <StepsSection steps={Steps} />
        <Flex flexDir={"column"}>
          <LatestArticles title="latest news" climateDAOArticles={articles} />
        </Flex> */}
        <Flex
          w="100%"
          mb="32px"
          bg='#08152E'
          height={{
            base: 'fit-content',
            lg: "175px"
          }}
          borderRadius="16px"
          justifyContent="center"
          alignItems="center"
          boxShadow="4px 4px 62px -9px rgba(0, 0, 0, 0.15)"
          zIndex={500}
          flexDir={{
            base: "column",
            md: "row"
          }}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexBasis="50%"
            borderRight={{
              base: 'none',
              md: "1px solid #eaeaea"
            }}
            flexDirection={{
              base: 'row',
              sm: "row",
              lg: 'row'
            }}
            m='16px'
          >
            <Box color="white" p={{ base: '6', lg: "16px 24px" }}>
              <Text fontWeight={500} fontSize={{ base: "16px", lg: "32px" }}>
                Want to create your own campaign?
              </Text>
            </Box>
          </Flex>
          <Flex
            h="100%"
            flexBasis={"50%"}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              bg="rgb(100, 43, 115)"
              color="white"
              fontSize="1.4em"
              w={{ lg: "350px" }}
              mr={{
                base: "0px", sm: "0", lg: "16px"
              }}
              mb={{
                base: '32px',
                md: '0'
              }}
              h="64px"
              // href={"/campaigns/create"}
              onClick={() => { router.push("/campaigns/create"); }}
            >
              Start Your Own
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  const campaignDoc = await fetchProposalFromStore(slug as string);

  const campaign = {
    ...campaignDoc!.data(),
  };

  const options = {
    method: "GET",
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${campaign.symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_KEY}&outputsize=compact`,
  };

  let stockData  = null;
  let investments = null;
  let uid  = null;
  let profileData  = null;

  context.res.setHeader(
    "Cache-Control",
    'public, s-maxage=15, stale-while-revalidate=59'
  );

  try {
    const cookies = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies.__session);

    uid = token.uid;

    const profile: any = await getProfileData(uid);

    profileData = {
      ...profile.data()
    };


    if (profileData.investments) {
      investments = await profileData.investments;

    }
    else {
      investments = null;
    }

  }
  catch (e) {
    //console.log(e);
  }

  try {
    stockData = (await axios.request(options as any)).data;
  } catch (err) {
    console.error(err as Error);
    stockData = null;
  }

  if (campaign.createdAt instanceof Timestamp) {
    campaign.createdAt = new Date(campaign.createdAt.seconds).toString();
  }

  if (campaign.deadline instanceof Timestamp) {
    campaign.deadline = new Date(campaign.deadline.seconds).toString();
  }

  return {
    props: {
      campaign,
      stockData,
      investments: investments,
      slug: slug as string,
      uid: uid,
      profileData: profileData,
    },
  };
}
