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
import LoginModal from '../../components/LoginModal'

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
  const [loginModal, setLoginModal] = useState(false);

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

  function test() {
    console.log("hereewe")
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
            <Heading fontSize={{base: "22px", md: "42", lg: "42px"}} mt="20" color="white" w="100%">
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
              <Heading textAlign={"center"} fontSize={{ base: "24px", sm: "24px", lg: "36px" }} color="White">
                {campaign.verifiedVotes ? String(Math.round(campaign.verifiedVotes * 100) /100) : "0"}
              </Heading>
              <Text fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
                Shares Commited
              </Text>
            </Box>
            <Box color="white" p={{ base: '4', lg: "16px 24px" }}>
              <Heading textAlign={"center"}
                fontSize={{ base: "24px", sm: "24px", lg: "36px" }}
                color="White">
                {String(howManyUsers())}
              </Heading>
              <Text fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
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
                {hasUserVoted() ? "Already Supported!" : "Support Campaign"}
              </Button>
              { !modalClose && <CastVoteModal
                isOpen={voteModalIsOpen}
                onClose={ () => {onVoteModalClose; setModalClose(true)}}
                onOpen={onVoteModalOpen}
                campaign={campaign}
                profileData={profileData}
                uid={uid}
                investmentsOld={investments}
                slug={slug}
              /> } </>)
              : 
              (<>
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
                onClick={() => { onVoteModalOpen(); setLoginModal(true);}}
                >
                {"Support Campaign"}
                </Button>
              
                {loginModal && 
                  <LoginModal 
                    isOpen={voteModalIsOpen}
                    onClose={ () => {onVoteModalClose; setLoginModal(false);}}
                    onOpen={onVoteModalOpen}
                  />
                }
                </>
              )
            }
            
            
          </Flex>
        </Flex>
        <Flex mt="64px" w="100%">
          <Flex mb="64px" flexDir={"column"} w={{ base: "100%", sm: "100%", md: "60%", lg: "60 %" }} mr="32px">
            <Box mb="32px">
              <Heading fontSize="18px" textTransform={"uppercase"} mb="16px" ml={{base:"20px"}}>
                OUR ASK
              </Heading>
              {campaign?.companyName == "Apple" ? 


                campaign?.description && (<Text align="justify"  ml={{base:"20px"}}>
                  {/* Taking out the substring below to edit easier */}
                  {/* {String(campaign?.description).substring(0,332)} */}
                  <text><b>We’re calling for Apple to address its contribution to the fastest growing waste stream on the planet. We want Apple to disclose electronic waste figures and address how it plans to mitigate waste in future sustainability reports.</b></text>
                  <br/>
                  <Image mt="20px" mb="10px" alt="Image of e-waste" src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FBroken%20mac.png?alt=media&token=de2b9751-253b-4f72-93fc-06ec230b542a"></Image>
                  <br/>
                  <Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                    WHY IT&apos;S IMPORTANT
                  </Heading>
                  <text>Electronic waste leaches toxic-materials into the environment, and puts people at risk of developing cancers. In 2019, approximately </text>
                  <b><Link href="https://ewastemonitor.info/gem-2020/#:~:text=A%20record%2053.6%20million%20metric,waste%20Monitor%202020%2C%20released%20today." isExternal>
                   53.6 million 
                  </Link></b>
                  <text> metric tons (Mt) of e-waste was generated, most of which is undocumented (likely dumped or traded in a damaging way). The undocumented waste alone equates to over 4,000 Eiffel towers worth 🤯.</text>
                  {/* {String(campaign?.description).substring(332,1333)} */}
                  <br/>
                  <br/>
                  
                  <text>Inevitably, as one of the largest technology companies in the world, Apple makes and manages a LOT of the world’s E-waste. But how much? That’s the thing, we don’t know. Apple&apos;s hardware produced </text>
                   <b><Link href="https://www.zdnet.com/article/apples-colossal-e-waste-timebomb/" isExternal>1.65 billion</Link></b>
                  <text> devices by the end of 2020. Apple doesn&apos;t publish figures on hardware recycling, outlining how much materials are recovered.</text>
                  <br/>
                  <br/>
                  <text>A billion of anything is huge. A billion grains of rice weigh 25 metric tons and take up about three full sized dump trucks. </text>
                  <br/>
                  <br/>
                  <text>But Apple doesn&apos;t sell rice. It sells iPhones and iPads and Macs.</text>
                  <Image mt="20px" mb="10px" alt="Image of e-waste" src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Frice.png?alt=media&token=f8dcf69f-69cf-4425-a0fc-9bbfb323f7d2"></Image>
                  <br/>
                  <text>“Apple has a historic commitment to planned obsolescence, a policy whereby products are designed with an artificially restricted lifetime.”, sites a </text>
                  
                  <b><Link href="https://globuswarwick.com/2021/01/21/the-e-waste-problem-a-case-study-of-apple/">case study.</Link></b>
                  <text> Across almost all product lines, Apple’s products are irreparable or uneconomical to repair (coercing customers into just purchasing another device).</text>

                  <Image mt="20px" mb="10px" alt="Image of e-waste" src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fbreakdifferent.png?alt=media&token=5b79a1b1-b1fc-4fad-a7b0-ea81e8b252c2"></Image>
                  <br/>
                  {/* {String(campaign?.description).substring(1333)} */}
                  <text>As it stands, the company’s </text>
                  <b><Link href="https://support.apple.com/irp-program"isExternal>Independent Repair Program</Link></b>
                  <text> only allows approved technicians to repair Apple products. We want to see Apple expand access, so that we can keep millions of tons of E-waste from being generated. At the very least, we’d like to see Apple commit to publishing a report, at reasonable cost, on how it intends to mitigate its contribution to E-Waste.</text>
                  <br/>
                  <br/>
                  <u><Heading fontSize="18px" textTransform={"uppercase"} mb="16px">
                    More Information
                  </Heading></u>
                  <b><Link href="https://ewastemonitor.info/wp-content/uploads/2020/11/GEM_2020_def_july1_low.pdf"isExternal textColor="blue"> E-waste Monitor Report 2020</Link></b>
                  <br/>
                  <b><Link href="https://globuswarwick.com/2021/01/21/the-e-waste-problem-a-case-study-of-apple/"isExternal textColor="blue"> Apple Case Study</Link></b>
                  <br/>
                  <b><Link href="https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2022.pdf"isExternal textColor="blue"> Apple Sustainability Report 2022</Link></b>


                  {/* <iframe width="480" height="270" src="https://www.youtube.com/embed/ZzS2vwDUO9U?start=18" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
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
                width={484}
                backgroundColor="FFFFFF"
                boxShadow='2xl' p='0'
                borderRadius="16px"
                mt='12px'
                mb="50%"
                ml="30px"
                border="3px solid gray"
              >
                
                <Text fontSize="xl" fontWeight="bold" mb={0} mt={4}>
                  {"Share this campaign with a friend"}
                </Text>
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
                                _hover={{ color: "purple" }}
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
                                _hover={{ color: "purple" }}
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
                Help us hold Apple Accountable
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
                {hasUserVoted() ? "Already Supported!" : "Support Campaign"}
              </Button>
              { !modalClose && <CastVoteModal
                isOpen={voteModalIsOpen}
                onClose={ () => {onVoteModalClose; setModalClose(true)}}
                onOpen={onVoteModalOpen}
                campaign={campaign}
                profileData={profileData}
                uid={uid}
                investmentsOld={investments}
                slug={slug}
              /> } </>)
              : 
              (<>
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
                onClick={() => { onVoteModalOpen(); setLoginModal(true);}}
                >
                {"Support Campaign"}
                </Button>
              
                {loginModal && 
                  <LoginModal 
                    isOpen={voteModalIsOpen}
                    onClose={ () => {onVoteModalClose; setLoginModal(false);}}
                    onOpen={onVoteModalOpen}
                  />
                }
                </>
              )
            }
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
