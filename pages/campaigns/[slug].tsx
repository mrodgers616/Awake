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
import { fetchCampaignThreadReplies, fetchCampaignThread } from "../../lib/discourse";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { FaClipboard, FaTwitter, FaFacebook } from "react-icons/fa";
import { getProposalState, getProposalVotes } from "../../lib/web3";
import StepsSection from "../../components/StepsSection";
import { useEffect, useState } from "react";
import { Steps } from "../../lib/mock-data";
import { fetchProposalFromStore, getProfileData, updateProposalInStore, updateOrAddProfileData } from "../../lib/firebaseClient";
import LatestArticles from "../../components/LatestArticles";
import ReactHtmlParser from "react-html-parser";
import { GetServerSidePropsContext } from "next";
import articles from "../../data/articles.json";
import { arrayUnion, Timestamp } from "firebase/firestore";
import CampaignCarousel from "../../components/CampaignCarousel";
import CastVoteModal from "../../components/CastVoteModal";
import { useWeb3 } from "../../contexts/Web3Context";
import { ethers } from "ethers";
import Link from "../../components/Link";
import axios from "axios";
import copy from "copy-to-clipboard";
import { lighten } from "@chakra-ui/theme-tools";
import nookies from 'nookies';
import { admin } from '../../lib/firebaseAdmin';
import Confetti from 'react-confetti'

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
  topicId,
  topicSlug,
  threadReplies,
  stockData,
  investments,
  slug,
  uid,
  profileData,
}: {
  campaign: any;
  topicId: number;
  topicSlug: string;
  threadReplies: any;
  stockData: any;
  investments: any;
  slug: string;
  uid: any;
  profileData: any;
}): JSX.Element {
  const [_votes, setVotes] = useState<string>();
  const [currentState, setCurrentState] = useState<string>();
  const [discussion, _setDiscussion] = useState<any>(
    threadReplies.post_stream.posts
  );
  const [historicalStockPrice, setHistoricalStockPrice] = useState<any>();

  const toast = useToast();

  const { hasEnoughBalance, isConnected } = useWeb3();
  const router = useRouter();

  const {
    isOpen: voteModalIsOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();

  useEffect(() => {
    //const newProvider = new ethers.providers.Web3Provider(window.ethereum);

    // if (isConnected) {
    //   newProvider.getBlockNumber().then((blockNumber) => {
    //     getProposalVotes(blockNumber - 1).then((res) => {
    //       setVotes(res.toString());
    //     });
    //   }).catch((err) => {
    //     console.error(err);
    //   });

    //   getProposalState(campaign.proposalId).then((res) => {
    //     setCurrentState(State[res.toString()]);
    //   }).catch((err) => {
    //     toast({
    //       title: "Error",
    //       description: err.message,
    //       status: "error",
    //       duration: 9000,
    //       isClosable: true,
    //     })
    //   });
    // }

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

  const pageUri = `${router.basePath}${router.asPath}`;
  let userInvestmentQuantity: number;

  function doesUserOwnShares() {
    let campaignTicker = campaign.symbol;

    if(investments) {
      for(let i = 0; i < investments.length; i++) {
        let userInvestmentTicker = investments[i].ticker;
        if(userInvestmentTicker === campaignTicker) {
          userInvestmentQuantity = investments[i].quantity;
          userOwnShares();
          return true;
        }
      }
      return userDoesNotOwnShares();
      return false;
    }
    else {
      userDoesNotOwnShares();
      return false;
    }
    
  }

  function userOwnShares() {
    let currentVotes = campaign.verifiedVotes
    let users = campaign.users

    if(currentVotes && users) {
      const totalVotes = currentVotes + investments.quantity;
      users.push(uid);
      const dataToUpload = {
        verifiedVotes: totalVotes,
        users: arrayUnion(uid),
      }

      updateProposalInStore(slug, dataToUpload);
    }
    else {
      const dataToUpload = {
        verifiedVotes: investments.quantity,
        users: [uid],
      }

      updateProposalInStore(slug, dataToUpload);
    }

    const proposals = profileData.proposalsVotedOn
    if(proposals) {
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

  function userDoesNotOwnShares() {
    let currentVotes = campaign.unverifiedVotes
    let users = campaign.users

    if(currentVotes && users) {
      const totalVotes = currentVotes + 1;
      users.push(uid);
      const dataToUpload = {
        unverifiedVotes: totalVotes,
        unverifiedUsers: arrayUnion(uid),
      }

      updateProposalInStore(slug, dataToUpload);
    }
    else {
      const dataToUpload = {
        unverifiedVotes: 1,
        unverifiedUsers: [uid],
      }

      updateProposalInStore(slug, dataToUpload);
    }

    const proposals = profileData.proposalsVotedOn
    if(proposals) {
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

  function hasUserVoted() {
    const votedproposals = profileData.proposalsVotedOn
    if(votedproposals) {
      for(let i = 0; i < votedproposals.length; i++) {
        if(votedproposals[i] === slug) {
          return true
        }
      }
      return false
    }
    else {
      return false;
    }
    
  }

  const socialMedia = [
    {
      name: "twitter",
      icon: FaTwitter,
      link: encodeURI(
        `https://twitter.com/intent/tweet?text=I just backed the ${campaign.title} campaign on ClimateDAO. learn more here:\n&url=${pageUri}`
      ),
    },
    {
      name: "facebook",
      icon: FaFacebook,
      link: encodeURI(
        `https://www.facebook.com/sharer/sharer.php?u=https://www.crowdfund.it/campaigns/${campaign.slug}`
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
        <title>Proposal {campaign?.id} | ClimateDAO</title>
      </Head>
      <Box
        bg="sage.500"
        mt="120px"
        bgImage="url('https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1259&q=80')"
        bgSize="cover"
        position="relative"
        zIndex={0}
      >
        <Box
          bg="rgba(0,0,0,.8)"
          position="absolute"
          w="100%"
          h="100%"
          zIndex={0}
          top="0"
          left="0"
        />
        <Container p="0 25px" m="0 auto" width={"100%"}>
          <Flex
            position="relative"
            minH="400px"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            zIndex={250}
          >
            <Flex w="100%" alignItems={["flex-start", "center"]}>
              <Badge
                title="Status"
                p="8px 48px"
                fontSize="16px"
                color="black"
                bg="blue.500"
                mr="16px"
                borderRadius="32px"
                marginBottom={3}
              >
                {currentState ?? "Pending"}
              </Badge>
              <Badge
                title="Category"
                p="8px 48px"
                fontSize="16px"
                color="black"
                bg="seafoam.500"
                borderRadius="32px"
                marginBottom={3}
              >
                Say on Climate
              </Badge>
            </Flex>
            <Heading color="white" w="100%">
              {campaign?.title ?? "TITLE!"}
            </Heading>
          </Flex>
        </Container>
      </Box>
      <Container position="relative" mt="-60px" zIndex={1}>
        <Flex
          w="100%"
          mb="32px"
          bg="sage.500"
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
              base: 'column',
              lg: 'row'
            }}
            m='16px'
          >
            <Box color="white" p={{ base: '0', lg: "16px 24px" }}>
              <Heading textAlign={"center"} fontSize="48px" color="seafoam.500">
                13,498
              </Heading>
              <Text fontWeight={500} fontSize="24px">
                Shares commited to Campaign
              </Text>
            </Box>
            <Box color="white" p={{ base: '0', lg: "16px 24px" }}>
              <Heading textAlign={"center"} fontSize="48px" color="seafoam.500">
                50M
              </Heading>
              <Text fontWeight={500} fontSize="24px">
                Campaign Supporters
              </Text>
            </Box>
          </Flex>
          <Flex
            h="100%"
            flexBasis={"50%"}
            justifyContent="center"
            alignItems="center"
          >
{/* -------Disabled Tooltip---------------------- */}
            {/* <Tooltip
              hasArrow
              isDisabled={hasEnoughBalance || !isConnected}
              label={
                !isConnected
                  ? "You need to connect to MetaMask to vote"
                  : "You do not have enough CLIMATE to vote"
              }
              shouldWrapChildren
            > */}
              <Button
                {...hasUserVoted() ? {bg:"gray", disabled:true} : {bg:"seafoam.500", disabled:false}}
                bg="seafoam.500"
                color="white"
                fontSize="1.4em"
                w="350px"
                mr="16px"
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
                onClick={() => { doesUserOwnShares(); onVoteModalOpen()}}
              >
                {hasUserVoted() ? "Already Supported!" : "Support Campaign"}
              </Button>
            {/* </Tooltip> */}
            <CastVoteModal
              isOpen={voteModalIsOpen}
              onClose={onVoteModalClose}
              onOpen={onVoteModalOpen}
            />
            {/* <Button
              bg="seafoam.500"
              color="white"
              w="64px"
              h="64px"
              disabled={!isConnected}
            >
              <Icon
                w={6}
                h={6}
                as={BiBookmark}
              />
            </Button> */}
          </Flex>
        </Flex>
{/* -------------Deleting camapaing Carousel-------------------- */}
        {/* <CampaignCarousel
          w="100%"
          h={{
            base: 'fit-content',
            md: "400px"
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          my="64px"
          images={images}
        />
        <Flex mt="64px" w="100%"
          flexDir={{
            base: 'column-reverse',
            md: 'row'
          }}
        >
          <Flex mb="64px" flexDir={"column"} w={{ base: '100%', md:"55%" }}mr="32px">
        /> */}
{/*Adding the about campaign content on the left*/}  
        <Flex mt="64px" w="100%">
          <Flex mb="64px" flexDir={"column"} w="60%" mr="32px">
            <Box mb="32px">
              <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                About Campaign
              </Heading>
              <Box
                title="company graph"
                w="100%"
                bg="grey"
                h="430px"
                borderRadius="16px"
                mb="8px"
              >
                <Image w="100%" height="100%" src={campaign.image ? campaign.image : "/nature/lakeside.png"} alt="campaign image" />
              </Box>
              {campaign?.description && (<Text>
                {campaign?.description}
              </Text>)}
            </Box>

            <Box>
              <Flex justifyContent="space-between">
                <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                  discussion
                </Heading>
                <Text>
                  Click{" "}
                  <Link
                    color="seafoam.500"
                    href={`https://forum.climatedao.xyz/t/${topicSlug}/${topicId}`}
                    target="_blank"
                  >
                    here
                  </Link>{" "}
                  to join the discussion
                </Text>
              </Flex>
              <Flex
                as={Link}
                href={`https://forum.climatedao.xyz/t/${topicSlug}/${topicId}`}
                target="_blank"
                position="relative"
                borderRadius="16px"
                boxShadow="4px 4px 62px -9px rgba(0, 0, 0, 0.15)"
                flexDir={"column"}
                overflow="hidden"
                textDecoration="none !important"
                marginBottom={16}
                _hover={{
                  "& .join-discussion": {
                    transition: "opacity 0.2s ease-in-out",
                    opacity: 1,
                  },
                }}
                p="16px"
              >
                <Flex
                  className="join-discussion"
                  width="100%"
                  height="100%"
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                  top="0"
                  left="0"
                  bg="rgb(0,0,0,.8)"
                  color="white"
                  zIndex={200}
                  opacity="0"
                  transition="opacity 0.2s ease-in-out"
                >
                  <Text fontSize="1.8em">Join the Discussion</Text>
                </Flex>
                {discussion &&
                  discussion.map((post: any, index: number) => {
                    if (index < 10) {
                      return (
                        <Flex key={index} m="16px">
                          <Image
                            w="auto"
                            h="64px"
                            mr="32px"
                            borderRadius={"100%"}
                            src={post.avatar_template.replace("{size}", "45")}
                            alt={`${post.username}'s discourse avatar`}
                          />
                          <Flex
                            flexDir={"column"}
                            position="relative"
                            __css={{
                              "& h2": {
                                fontSize: "1.2em",
                                fontWeight: "600",
                                textDecoration: "none",
                              },
                              "& ol li": {
                                position: "relative",
                                left: "16px",
                              },
                            }}
                          >
                            {ReactHtmlParser(post.cooked)}
                          </Flex>
                        </Flex>
                      );
                    }
                  })}
              </Flex>
            </Box>
          </Flex>
          <Flex mb="63px" flexDir={"column"} w={{ base: '100%', md:"45%" }}>
            {/* <Box mb="32px">
              <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                Company Information
              </Heading>
              <Box
                title="company graph"
                w="100%"
                mb="8px"
                bg="#313341"
                p="16px"
                borderRadius="10px"
                position="relative"
              >
                <Box position="absolute" color="white">
                  <Text>{campaign.companyName}</Text>
                </Box>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={historicalStockPrice}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#1CD0A7"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
                duis at tellus at urna condimentum mattis pellentesque. In nisl
                nisi scelerisque eu ultrices vitae auctor eu augue. READ MORE
              </Text>
            </Box> */}
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
                mt = '12px'
                mb="50%"
                ml="30px"
              >
                <Image height="125px" width="250px" />
                <Text fontSize="xl" fontWeight="bold" mb={4} mt={4}>
                    {campaign?.title}
                </Text>
                <Button
                  variant="solid"
                  size="lg"
                  width={48}
                  backgroundColor="seafoam.500"
                  mb = '10px'
                >
                  Support Campaign
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
          
        <StepsSection steps={Steps} />
        <Flex flexDir={"column"}>
          <LatestArticles title="latest news" climateDAOArticles={articles} />
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

  let stockData;
  let investments;
  let uid;
  let profileData;

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


    if(profileData.investments) {
      investments = await profileData.investments;

    }
    else {
      investments = null;
    }
    
  }
  catch(e) {
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

  const thread = await fetchCampaignThread(campaign.threadId);
  const threadReplies = await fetchCampaignThreadReplies(thread.topic_id);

  return {
    props: {
      topicId: thread.topic_id,
      topicSlug: thread.topic_slug,
      campaign,
      threadReplies,
      stockData,
      investments: investments,
      slug: slug as string,
      uid: uid,
      profileData: profileData,
    },
  };
}
