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
  Link,
  Icon,
  Container,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { ethers } from "ethers";
import { getProposalState, getProposalVotes } from "../../lib/web3";
import StepsSection from "../../components/StepsSection";
import { useEffect, useState } from "react";
import { Steps } from "../../lib/mock-data";
import firebase from "../../lib/firebase";
import LatestArticles from "../../components/LatestArticles";
import ReactHtmlParser from "react-html-parser";
import { GetServerSidePropsContext } from "next";
import articles from "../../data/articles.json";
import {
  fetchCampaignThread,
  fetchCampaignThreadReplies,
} from "../../lib/discourse";
import { Timestamp } from "firebase/firestore";
import { FaClipboard, FaTwitter, FaFacebook } from "react-icons/fa";
import CampaignCarousel from "../../components/CampaignCarousel";
import CastVoteModal from "../../components/CastVoteModal";
import axios from "axios";
import { useWeb3 } from "../../contexts/Web3Context";
import copy from "copy-to-clipboard";
import { lighten } from "@chakra-ui/theme-tools";



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
}: {
  campaign: any;
  topicId: number;
  topicSlug: string;
  threadReplies: any;
  stockData: any;
}): JSX.Element {
  const [_votes, setVotes] = useState<string>();
  const [currentState, setCurrentState] = useState<string>();
  const [discussion, _setDiscussion] = useState<any>(
    threadReplies.post_stream.posts
  );
  const [historicalStockPrice, setHistoricalStockPrice] = useState<any>();

  const { hasEnoughBalance, isConnected } = useWeb3();
  const router = useRouter();

  const {
    isOpen: voteModalIsOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();

  useEffect(() => {
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);

    newProvider.getBlockNumber().then((blockNumber) => {
      getProposalVotes(blockNumber - 1).then((res) => {
        setVotes(res.toString());
      });
    });

    getProposalState(campaign.proposalId).then((res) => {
      setCurrentState(State[res.toString()]);
    });

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
        <title>Proposal {campaign?.id} | Climate DAO</title>
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
                color="white"
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
                color="white"
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
      <Container position="relative" mt="-60px" zIndex={500}>
        <Flex
          w="100%"
          mb="32px"
          bg="sage.500"
          height="175px"
          borderRadius="16px"
          justifyContent="center"
          alignItems="center"
          boxShadow="4px 4px 62px -9px rgba(0, 0, 0, 0.15)"
          zIndex={500}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexBasis="50%"
            borderRight="1px solid #eaeaea"
          >
            <Box color="white" p="16px 24px">
              <Heading textAlign={"center"} fontSize="48px" color="seafoam.500">
                13,498
              </Heading>
              <Text fontWeight={500} fontSize="24px">
                Shares commited to Campaign
              </Text>
            </Box>
            <Box color="white" p=" 16px 24px">
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
            <Tooltip
              hasArrow
              isDisabled={hasEnoughBalance || !isConnected}
              label={
                !isConnected
                  ? "You need to connect to MetaMask to vote"
                  : "You do not have enough CLIMATE to vote"
              }
              shouldWrapChildren
            >
              <Button
                bg="seafoam.500"
                color="white"
                fontSize="1.4em"
                w="350px"
                mr="16px"
                h="64px"
                // enabling users to support the campaign if they have enough balance
                    // change made in the "testing waters" commit
                // disabled={!hasEnoughBalance}
                // textDecoration="none"
                // _hover={{
                //   textDecoration: "none",
                //   bg: lighten("seafoam.500", 0.8),
                // }}
                onClick={() => onVoteModalOpen()}
              >
                Support Campaign
              </Button>
            </Tooltip>
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
        <CampaignCarousel
          w="100%"
          h="400px"
          justifyContent={"space-between"}
          alignItems={"center"}
          my="64px"
          images={images}
        />
        <Flex mt="64px" w="100%">
          <Flex mb="64px" flexDir={"column"} w="55%" mr="32px">
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
                    <a>here</a>
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
          <Flex mb="63px" flexDir={"column"} w="45%">
            <Box mb="32px">
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
                  {historicalStockPrice && (
                    <Text>
                      ${" "}
                      {historicalStockPrice[
                        historicalStockPrice.length - 1
                      ].price.toFixed(2)}
                    </Text>
                  )}
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
            </Box>
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
              ></Box>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
                duis at tellus at urna condimentum mattis pellentesque. In nisl
                nisi scelerisque eu ultrices vitae auctor eu augue. READ MORE
              </Text>
            </Box>
            <Box>
              <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                team
              </Heading>
              <Flex flexWrap={"wrap"}>
                <Flex alignItems={"center"} w="50%" mb="16px">
                  <Box
                    bg="grey"
                    w="64px"
                    h="64px"
                    mr="16px"
                    borderRadius={"100%"}
                  />
                  <Box>
                    <Heading fontSize="18px">Guy</Heading>
                    <Text>Founder</Text>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} w="50%" mb="16px">
                  <Box
                    bg="grey"
                    w="64px"
                    h="64px"
                    mr="16px"
                    borderRadius={"100%"}
                  />
                  <Box>
                    <Heading fontSize="18px">Guy</Heading>
                    <Text>Founder</Text>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} w="50%" mb="16px">
                  <Box
                    bg="grey"
                    w="64px"
                    h="64px"
                    mr="16px"
                    borderRadius={"100%"}
                  />
                  <Box>
                    <Heading fontSize="18px">Guy</Heading>
                    <Text>Founder</Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Box>
              <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                share
              </Heading>
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
  const campaignDoc = await firebase.fetchProposalFromStore(slug as string);

  const campaign = {
    ...campaignDoc!.data(),
  };

  const options = {
    method: "GET",
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${campaign.symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_KEY}&outputsize=compact`,
  };

  let stockData;

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
    },
  };
}
