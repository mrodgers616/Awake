import Head from "next/head";
import { useRouter } from "next/router";
import {
  Image,
  Text,
  Flex,
  Heading,
  Button,
  Box,
  Icon,
  Container,
  useDisclosure,
  useToast,
  Highlight,
  Stack,
  Tooltip,
  Center
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import useWindowSize from 'react-use/lib/useWindowSize'
import { FaClipboard, FaTwitter, FaFacebook } from "react-icons/fa";
import { useState, useEffect } from "react";
import { fetchProposalFromStore, getProfileData, updateProposalInStore, updateOrAddProfileData } from "../../lib/firebaseClient";
import { GetServerSidePropsContext } from "next";
import { arrayUnion, Timestamp, increment } from "firebase/firestore";
import CastVoteModal from "../../components/CastVoteModal";
import Link from "../../components/Link"; 
import copy from "copy-to-clipboard";
import nookies from 'nookies';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { admin } from '../../lib/firebaseAdmin';
import { useAuth } from "../../contexts/AuthContext";
import MasterCommentThread from "../../components/comments/masterCommentThread";
import Confetti from 'react-confetti'
import LoginModal from '../../components/LoginModal';
import Faq from "../../components/FaqSlug";
import faqs from "../../data/slugFAQ.json";
import Testimonial from "../../components/AppModern/Testimonial";
import { event } from "nextjs-google-analytics";
import url from 'url';
import * as FullStory from '@fullstory/browser';

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
  investments,
  slug,
  profileData,
  email,
}: {
  campaign: any;
  investments: any;
  slug: string;
  profileData: any;
  email: any;
}): JSX.Element {
  const [modalClose, setModalClose] = useState(false);
  const [currentState, setCurrentState] = useState<string>();
  const [historicalStockPrice, setHistoricalStockPrice] = useState<any>();
  const [_votes, setVotes] = useState<string>();
  const [showConfetti, setShowConfetti] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [referral, setReferral] = useState<string>()

  const toast = useToast();

  const router = useRouter();
  const { userid }: any= useAuth();
  const { width, height } = useWindowSize()
  const [scrollPosition, setScrollPosition] = useState(0);
  const pageUri = `https://awakeinvest.com${router.basePath}${router.asPath}`;

  const handleScroll = () => {
      let position = window.pageYOffset;
      setScrollPosition(position);
      if(position == 0) {
        try {
          event("Slug_Scroll_0%", {
            category: "Slug_Page_Scroll",
            label: "percentage of page scroll",
            uid: userid ? userid : "not logged in or before entered name and email",
          });
        }
        catch(e) {
          console.log(e)
        }
      }
      else {
        try {
          event("Slug_Scroll_" + String((position/2230) * 100).substring(0,4) +"%", {
            category: "Slug_Page_Scroll",
            label: "percentage of page scroll",
            uid: userid ? userid : "not logged in or before entered name and email",
          });
        }
        catch(e) {
          console.log(e)
        }
      }
  };

  const currencyFormatter = new Intl.NumberFormat();

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

  async function checkForReferralURL() {
    let parsedURL = url.parse(pageUri, true);

    const query = parsedURL.query;

    if(query?.ref) {
      setCookie(null, 'referralCode', String(query?.ref), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    }
  }

  function reportClickOutOfSignPetition() {
    try {
      event("Sign_Petition_Modal_Closed", {
        category: "Petition_Modal",
        label: "Closed Petition Modal",
        uid: userid ? userid : "not logged in or before entered name and email",
      });
    }
    catch(e) {
      console.log(e)
    }
  }

  function reportOpenSignPetitionModal() {
    try {
      event("Sign_Petition_Modal_Opened", {
        category: "Petition_Modal",
        label: "User Opened Petition Modal",
        uid: userid,
      });
    }
    catch(e) {
      console.log(e)
    }
  }

  function reportOpenLoginModal() {
    try {
      event("Login_Petition_Modal_Opened", {
        category: "Login_Modal",
        label: "User Opened Login Modal",
      });
    }
    catch(e) {
      console.log(e)
    }
  }

  function doesUserOwnSharesFor() { 
    let campaignTicker = campaign?.symbol;

    if (investments) {
      for (let i = 0; i < investments?.length; i++) {
        let userInvestmentTicker = investments[i]?.ticker;
        if (userInvestmentTicker == campaignTicker) {
          userInvestmentQuantity = investments[i]?.quantity;
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
    let currentVotes = campaign?.verifiedVotes
    let users = campaign?.users

    let forVotes = 1;
    let againstVotes = 0;

    if(campaign?.verifiedVote) {
      againstVotes = campaign?.verifiedVote.against
    }
    else {
      againstVotes = 0;
    }

    if(campaign?.verifiedVote) {
      forVotes = Number(campaign?.verifiedVote.for) + 1
    }
    else {
      forVotes = 1;
    }

    if (currentVotes && users) {
      const totalVotes = currentVotes + investments[i]?.quantity;
      users?.push(userid);
      if(Number.isNaN(Number(investments[i]?.quantity))) {
        const dataToUpload = {
          verifiedVotes: campaign?.verifiedVotes,
          users: arrayUnion(userid),
          verifiedVote:{
            for: forVotes,
            against: againstVotes
          }
      }
      updateProposalInStore(slug, dataToUpload);
      }
      else {
        const dataToUpload = {
          verifiedVotes: increment(Number(investments[i]?.quantity)),
          users: arrayUnion(userid),
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
        verifiedVotes: Number(investments[i]?.quantity),
        users: [userid],
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

      updateOrAddProfileData(userid, slugs)
    }
    else {
      let slugs = {
        proposalsVotedOn: [slug],
      }

      updateOrAddProfileData(userid, slugs)
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
      users.push(userid);
      const dataToUpload = {
        unverifiedVotes: increment(1),
        unverifiedUsers: arrayUnion(userid),
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
        unverifiedUsers: [userid],
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

      updateOrAddProfileData(userid, slugs)
    }
    else {
      let slugs = {
        proposalsVotedOn: [slug],
      }

      updateOrAddProfileData(userid, slugs)
    }

  }

  function checkAndVote() {
    if(profileData?.investments) {
      doesUserOwnSharesFor();
      theConfetti();
    }
  }

  function hasUserVoted() {
    try {
      const votedproposals = profileData?.proposalsVotedOn
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

  function howManyUsers(addition: any) {
    if(campaign?.unverifiedUsers && campaign?.users) {
      return (addition + campaign.unverifiedUsers.length + campaign.users.length)
    }
    else if(campaign?.unverifiedUsers) {
      return addition + campaign.unverifiedUsers.length;
    }
    else if(campaign?.users) {
      return addition + campaign.users.length;
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
        userid ?
        `https://twitter.com/intent/tweet?text=I just backed the ${campaign?.title} campaign on @AwakeInvest. learn more here:\n&url=${pageUri}?ref=${userid}`
        :
        `https://twitter.com/intent/tweet?text=I just backed the ${campaign?.title} campaign on @AwakeInvest. learn more here:\n&url=${pageUri}`
      ),
    },
    {
      name: "facebook",
      icon: FaFacebook,
      link: encodeURI(
        userid ?
        `https://www.facebook.com/sharer/sharer.php?u=https://www.awakeinvest.com/campaigns/${campaign?.slug}?ref=${userid}`
        :
        `https://www.facebook.com/sharer/sharer.php?u=https://www.awakeinvest.com/campaigns/${campaign?.slug}`
      ),
    },
    {
      name: "clipboard",
      icon: FaClipboard,
      link: userid ? encodeURI(pageUri + "?ref=" + String(userid)) : encodeURI(pageUri),
    },
  ];

  useEffect(() => {
    FullStory.init({ orgId: 'o-1FCF9K-na1' });
    window.addEventListener('scroll', handleScroll, { passive: true });
    checkForReferralURL()

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

  return (
    <>
    {campaign?.symbol == "AAPL" && ( <> 
      <Head>
        <title>Proposal {campaign?.symbol} | Awake</title>
        <meta
          name="keywords"
          content="Awake, awake, AwakeInvest, awakeInvest, awakeinvest, awake invest, shareholder collective action, awake finance, shareholder proposals, petitions, climte change, democratizing shareholder acitivism, campaigns for corporate action, awake campaigns, advocate for change with stocks, awakeinvest.com "
        />
        <meta property="og:title" content="Hold Apple Accountable: Awake" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FBroken%20mac.png?alt=media&token=de2b9751-253b-4f72-93fc-06ec230b542a" />
      </Head>
      {showConfetti && (<Confetti width={width} height={height}/>)}
      <Box
        mt="0px"
        //bg="rgb(164,191,217)"
        //bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
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
          {/* <Button leftIcon={<IoArrowBackOutline />} bgColor="white" border="1px" onClick={() => goBack()} mt="2%" ml="-12%" position="fixed" paddingLeft="20px" display={{ base: "none", sm: "none" }}>
            All Campaigns
          </Button> */}
          <Flex
            position="relative"
            minH="80px"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            zIndex={250}
          >
          </Flex>
        </Container>
      </Box>

        <Flex justifyContent="space-between" alignItems="center" width="100%" flexDir={{base:"column",lg:"row"}} mt={{base:"12px",lg:"20px"}}>
          <Flex flexDir="column">
                  <Heading 
                      ml={{base: "3%", md: "10%", lg: "20%"}}
                      mr={{base: "3%", md: "10%", lg: "10%"}}
                      as="h1"
                      maxWidth={"900px"} 
                      display="inline-block" 
                      textAlign="left" 
                      size="2xl"
                      fontSize={{base: "3xl", md: "5xl", lg: "5xl"}}
                  >
                    <Highlight
                      query='Toxic Electronic Waste'
                      styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                      >
                      Hold Apple Accountable for Toxic Electronic Waste
                    </Highlight>
                  </Heading>
                          {userid ? ( <>
                      <Button
                        {...hasUserVoted() ? { bg: "gray", disabled: true } : { bg: "rgb(164,191,217)", disabled: false }}
                        bg="rgb(100, 43, 115)"
                        color="white"
                        fontSize="1.4em"
                        w={{ lg: "200px" }}
                        mx={{base: "3%", md: "10%", lg: "25%"}}
                        mb={{
                          base: '0px',
                          md: '0'
                        }}
                        mt={{
                          base: '16px',
                          md: '20px',
                          lg: '40px'
                        }}
                        borderRadius="3xl"
                        h="64px"
                        onClick={() => { onVoteModalOpen(); setModalClose(false); checkAndVote();}}
                      >
                        {hasUserVoted() ? "Already Signed!" : "Sign Petition"}
                      </Button>
                      { !modalClose && <CastVoteModal
                        isOpen={voteModalIsOpen}
                        onClose={ () => {onVoteModalClose; setModalClose(true); reportClickOutOfSignPetition();}}
                        onOpen={() => {reportOpenSignPetitionModal(); onVoteModalOpen(); }}
                        campaign={campaign}
                        profileData={profileData}
                        uid={userid}
                        investmentsOld={investments || undefined}
                        slug={slug}
                        referralLink={(pageUri + "?ref=" + String(userid))}
                      /> } </>)
                      : 
                      (<>
                      <Button
                        bg="#32006b"
                        color="white"
                        fontSize="1.4em"
                        w={{ lg: "200px" }}
                        mx={{base: "3%", md: "10%", lg: "25%"}}
                        mb={{
                          base: '0px',
                          md: '0'
                        }}
                        mt={{
                          base: '16px',
                          md: '20px',
                          lg: '40px'
                        }}
                        borderRadius="3xl"
                        h="64px"
                        onClick={() => { onVoteModalOpen(); setLoginModal(true);}}
                        >
                        {"Sign Petition"}
                        </Button>
                      
                        {loginModal && 
                          <LoginModal 
                            isOpen={voteModalIsOpen}
                            onClose={ () => {onVoteModalClose; setLoginModal(false); reportClickOutOfSignPetition();}}
                            onOpen={() => {onVoteModalOpen; reportOpenLoginModal();}}
                          />
                        }
                        </>
                      )
                    }
                </Flex>
                
                <Flex
                    w={{base:"100%",lg:"30%"}}
                    boxShadow='2xl' p='1'
                    mb="32px"
                    mt="50px"
                    mr={{lg:"15%"}}
                    bg='#FFFFF'
                    height={{
                      base: 'fit-content',
                      lg: "200px"
                    }}
                    // borderRadius="16px"
                    justifyContent="center"
                    alignItems="center"
                    zIndex={500}
                    flexDir={{
                      base: "row",
                      md: "row"
                    }}
                  > 
                      <Box color="white" p={{ base: '6', lg: "16px 24px" }} borderRight={{
                        base: 'none',
                        md: "2px solid #eaeaea"
                      }}>
                        <Heading textAlign={"center"} fontSize={{ base: "24px", sm: "24px", lg: "42px" }} color="black">
                          {campaign?.verifiedVotes ? "$" + String(currencyFormatter.format((Math.round(Number(campaign?.verifiedVotes) * 100) /100) * 151)) : "0"}
                        </Heading>
                        <Text color="black" fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
                          <Center>
                          Our Holdings &nbsp; <Tooltip label="This number tracks the collective number of shares in the company petition signers own"><QuestionOutlineIcon/></Tooltip>
                          </Center>
                        </Text>
                      </Box>
                      <Box color="black" p={{ base: '4', lg: "16px 24px" }}>
                        <Heading textAlign={"center"}
                          fontSize={{ base: "24px", sm: "24px", lg: "42px" }}
                          color="black">
                          {String(howManyUsers(250))}
                        </Heading>
                        <Text fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
                          Petition Signers
                        </Text>
                      </Box>
                    </Flex>   
          </Flex>

{/* THIS IS THE IMAGES SECTION THAT COMES AFTER THE BANNER */}
          <Flex 
          mx={{lg:"10%"}}
          mt={{lg:"10%"}}
          justifyContent='space-between'
          alignItems={"center"}
          display="inline-block" flexDir={"row"} w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste1.png?alt=media&token=b7964255-2134-49dd-b88e-19aa067d770a"
              height="350px"
              width="300px"
              display={{base:"none",lg:"inline-block"}}
              mb={16}
              p={2}
              alt="campaign image"
            />
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste2.png?alt=media&token=29d93a02-5b0c-41da-aeda-27e099ca1054"
              height="350px" 
              width="300px" 
              display={{base:"none",lg:"inline-block"}}
              p={2} 
              alt="campaign image"
              />
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste3.png?alt=media&token=e9075046-c9fe-456c-b5bd-c9656f517711"
              height="350px"
              width="300px"
              display={{base:"none",lg:"inline-block"}}
              mb={16}
              p={2}
              alt="campaign image"
            />
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste4.png?alt=media&token=89bc7ddb-d199-45ea-b859-18626f43a469"
              height="350px" 
              width="300px" 
              display={{base:"none",lg:"inline-block"}} 
              p={2} 
              alt="campaign image"
              />
          </Flex>   
      
      
      <Container position="relative" mt="0" zIndex={1} w={{base:"95%",lg:"65%"}}>
        <Flex mt={{base:"0px",lg:"128px"}} w="100%" justifyContent="space-between" alignItems="center">
          <Flex mb="0px" flexDir={"column"} 
            w={{ base: "100%", sm: "100%", md: "60%", lg: "50%" }} mr="32px">
            <Box mb="32px">
              <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" ml={{base:"20px"}}>
                    <Highlight
                      query='IMPORTANT'
                      styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                      >
                      WHY IT&apos;S IMPORTANT
                    </Highlight>
              </Heading>
              {campaign?.companyName == "Apple" ? 


                campaign?.description && (<Text align="justify"  ml={{base:"20px"}}>
                  <Text as='b'>Electronic waste leaches toxic-materials into the environment, and puts people at risk of developing cancers. With your help, we can get Apple to take a stronger stance.</Text>
                  <br/>
                  <br/>
                    <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" >
                      <Highlight
                        query='Want'
                        styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                        >
                        What we want
                      </Highlight>
                    </Heading>  
                  <Text>We want Apple to disclose total electronic waste figures* and provide additional information on their plans to mitigate waste.</Text> 
                  <br/>
                  <br/>
                  <Container display={{ base: "block", sm: "none", lg: "none" }}>
                    <Faq faqs={faqs}></Faq>
                  </Container>
                  <br/>
                </Text>) 
                : 
                campaign?.description && (<Text>
                  {campaign?.description}
                </Text>)}
            </Box>
          
            </Flex>
              {/* START OF THE FAQ SECTION */}
              <Flex mb={{base:"0px",lg:"20px"}} flexDir={"column"} 
                w={{ base: '100%', lg:"50%" }} 
                display=   {{  base: "none", sm: "none", lg: "block" }}>
                <Flex mb="20px" flexDir={"column"} w="25%">
                  <Container 
                  paddingTop="20px" w="400%" paddingLeft={{base:"0px",lg:"50px"}}
                  >
                    <Faq faqs={faqs}></Faq>
                  </Container>
                </Flex>
              </Flex>
        </Flex>

{/* ATTEMPT TO ADD BACK STORY */}
    {/* BACK STORY */}
    <Container w={"100%"}>
      <Heading fontSize="28px" textTransform={"uppercase"} mb="16px">
        Back Story
      </Heading>
      <Text>In 2019, approximately ‎
      <Text  as='b'><Link href="https://ewastemonitor.info/gem-2020/#:~:text=A%20record%2053.6%20million%20metric,waste%20Monitor%202020%2C%20released%20today." isExternal>
      53.6 million ‎
      </Link></Text>
      metric tons (Mt) of e-waste was generated, most of which is undocumented (likely dumped or traded in a damaging way). The undocumented waste alone equates to over 4,000 Eiffel towers worth 🤯.</Text>
      {/* {String(campaign?.description).substring(332,1333)} */}
      <br/>
      <br/>      
      <Text>Inevitably, as one of the largest technology companies in the world, Apple makes and manages a LOT of the world&apos;s E-waste. But how much? That&apos;s the thing, we don&apos;t know. Apple&apos;s hardware produced ‎
      <b><Link href="https://www.zdnet.com/article/apples-colossal-e-waste-timebomb/" isExternal>1.65 billion</Link></b>
      ‎ devices by the end of 2020. Apple doesn&apos;t publish figures on hardware recycling, outlining how many materials are <b>not</b> recovered.</Text>
      <br/>
      <br/>
      <Text>A billion of anything is huge. A billion grains of rice weigh 25 metric tons and take up about three full sized dump trucks. </Text>
      <br/>
      <br/>
      <Text>But Apple doesn&apos;t sell rice. It sells iPhones and iPads and Macs.</Text>
      <br/>
      <Text>“Apple has a historic commitment to planned obsolescence, a policy whereby products are designed with an artificially restricted lifetime.”, sites a ‎
      
      <b><Link href="https://globuswarwick.com/2021/01/21/the-e-waste-problem-a-case-study-of-apple/">case study.</Link></b>
      ‎ Across almost all product lines, Apple&apos;s products are irreparable or uneconomical to repair (coercing customers into just purchasing another device).</Text>
      <br/>
      <br/>

      <Text> 
      We&apos;d like to see Apple publish an evaluation of its TOTAL contribution to electronic waste. Getting concrete numbers on Apple&apos;s contribution is the first step towards creating total waste targets and setting an industry standard. 
      </Text>
      <br/>
      <br/>
    </Container>
    {/* END OF BACKSTORY */}
    <Flex mb="64px" flexDir={"column"} 
            w={{ base: "100%", sm: "100%", md: "60%", lg: "50%" }} mr="32px">

            {/* <Box display={{ base: "none", sm: "none", lg: "block" }} ml="3.2%">
              <Flex justifyContent="space-between">
                <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" mt="32px"> 
                  Discussion
                </Heading>
              </Flex>
              <br></br>
              <Box mb="2%">
                <MasterCommentThread type="deal" slug={slug} userIdForComment={userid} maxThreadDepth={3}></MasterCommentThread>
              </Box>
            </Box> */}
    </Flex> 
{/* ADDING THE HOW IT WORKS SECTION AFTER THE DISCUSSION */}
    <Flex justifyContent="space-between" alignItems="center" width="100%" mb={'20px'}>
          <Heading 
            mr="10%" 
            as="h1"
            maxWidth={"900px"} 
            display="inline-block" 
            textAlign="center" 
            size="4xl"
            mx={"auto"}
            fontSize={{base: "20px", md: "4xl", lg: "4xl"}}
          >
            <Highlight
              query='real impact'
              styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
            >
              Join forces with other investors to have real impact
            </Highlight>
          </Heading>
        </Flex>
        <Box textAlign="center" ml="5%" mr="5%" mt="75px" display={{ base: "none", sm: "none", md:"block", lg: "block" }}>
        <Flex justifyContent="space-around" alignItems="center" width="100%" mt={20}>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Flock.png?alt=media&token=1515b250-2374-4d95-85be-26d91fc95f43"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    Link your Broker
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    In order to prove you own shares, we ask that you link your broker after making an account.
                  </Text>
                </Box>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Green%20Papers.png?alt=media&token=7c813e0b-964c-4b78-81cf-4e9a35d97e6b"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    Sign a Petition
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    Sign a petition for a company in your portfolio to take action on an issue you care about. 
                  </Text>
                </Box>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Megaphone.png?alt=media&token=d71c6a33-e24b-406c-b99e-487f5360932a"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    We Do the Rest
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    We&#39;ll advocate for change at the target companies on behalf of you and other investors.
                  </Text>
                </Box>
              </Flex>
            </Box>
{/* EXPERIMENTING WITH SWIPER HERE */}
      <Container display={{ base: "block", sm: "block", md:"none", lg: "none" }}>
        <Testimonial ></Testimonial>
      </Container>

{/* BULK BLOCK WITH SHARE THIS CAMPAIGN AND SIGN PETITION STARTS HERE */}
          
        <Flex
          w="100%"
          my="32px"
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
            <Stack>
              <Flex
                position="relative"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                width={{base: 284, md: 400, lg: 400}}
                backgroundColor="FFFFFF"
                boxShadow='2xl' p='0'
                borderRadius="16px"
                mt='auto'
                mb="auto"
                ml="auto"
                mr='auto'
                border="0px solid gray"
                
              >
                
                <Text fontSize="xl" fontWeight="bold" mb={0} mt={4}>
                  {"Share this campaign"}
                </Text>
                <Flex justifyContent="center" alignItems="space-around" width={48}>
                  <Box>
                    <Flex alignItems={"center"} justifyContent={"flex-start"}>
                      {socialMedia?.map((social: any, index: number) => {
                        if (social?.name === "clipboard") {
                          return (
                            <Button
                              key={index}
                              name={social.name}
                              w="48px"
                              h="48px"
                              onClick={() => copy(social?.link)}
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
                                copy(social?.link, {
                                  message: "Copied to clipboard",
                                });
                              }}
                              p="8px"
                            >
                              <Icon
                                w={8}
                                h={8}
                                _hover={{ color: "purple" }}
                                as={social?.icon}
                              />
                            </Link>
                          );
                        }
                      })}

                      
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Stack>
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
                borderRadius="3xl"
                fontSize="1.4em"
                w={{ lg: "150px" }}
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
                {hasUserVoted() ? "Already Signed!" : "Sign Petition"}
              </Button>
              { !modalClose && <CastVoteModal
                isOpen={voteModalIsOpen}
                onClose={ () => {onVoteModalClose; setModalClose(true); reportClickOutOfSignPetition();}}
                onOpen={() => {reportOpenSignPetitionModal(); onVoteModalOpen;}}
                campaign={campaign}
                profileData={profileData}
                uid={userid}
                investmentsOld={investments}
                slug={slug}
                referralLink={(pageUri + "?ref=" + String(userid))}
              /> } </>)
              : 
              (<>
              <Button
                bg="rgb(100, 43, 115)"
                color="white"
                borderRadius="3xl"
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
                {"Sign Petition"}
                </Button>
              
                {loginModal && 
                  <LoginModal 
                    isOpen={voteModalIsOpen}
                    onClose={ () => {onVoteModalClose; setLoginModal(false); reportClickOutOfSignPetition();}}
                    onOpen={() => {onVoteModalOpen; reportOpenLoginModal();}}
                  />
                }
                </>
              )
            }
          </Flex>
        </Flex>
      </Container>
      </>)}

      {/* //////////  CHANGE BELOW FOR CAMPAIGN 2      //////////// */}
      {/* //////////  CHANGE BELOW FOR CAMPAIGN 2      //////////// */}
      {/* //////////  CHANGE BELOW FOR CAMPAIGN 2      //////////// */}
      {/* //////////  CHANGE BELOW FOR CAMPAIGN 2      //////////// */}




      {/* ///// CHANGE THIS SYMBOL ON THE NEXT LINE FROM "CHANGETHIS" TO THE NEW COMPANY TICKET      //////////// */}
      {campaign?.symbol == "CHANGETHIS" && ( <> 
      <Head>
        <title>Proposal {campaign?.symbol} | Awake</title>
        <meta property="og:title" content="Stop Toyota from Fueling Climate Change" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Polutta.webp?alt=media&token=e681070b-15b2-4938-918c-6a5e28bdd2d5" />
      </Head>
      {showConfetti && (<Confetti width={width} height={height}/>)}
      <Box
        mt="0px"
        //bg="rgb(164,191,217)"
        //bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
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
          {/* <Button leftIcon={<IoArrowBackOutline />} bgColor="white" border="1px" onClick={() => goBack()} mt="2%" ml="-12%" position="fixed" paddingLeft="20px" display={{ base: "none", sm: "none" }}>
            All Campaigns
          </Button> */}
          <Flex
            position="relative"
            minH="80px"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            zIndex={250}
          >
          </Flex>
        </Container>
      </Box>

        <Flex justifyContent="space-between" alignItems="center" width="100%" flexDir={{base:"column",lg:"row"}} mt={{base:"12px",lg:"20px"}}>
          <Flex flexDir="column">
                  <Heading 
                      ml={{base: "3%", md: "10%", lg: "20%"}}
                      mr={{base: "3%", md: "10%", lg: "10%"}}
                      as="h1"
                      maxWidth={"900px"} 
                      display="inline-block" 
                      textAlign="left" 
                      size="2xl"
                      fontSize={{base: "3xl", md: "5xl", lg: "5xl"}}
                  >
                    <Highlight
                      query='Toxic Electronic Waste'
                      styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                      >
                      Hold Apple Accountable for Toxic Electronic Waste
                    </Highlight>
                  </Heading>
                          {userid ? ( <>
                      <Button
                        {...hasUserVoted() ? { bg: "gray", disabled: true } : { bg: "rgb(164,191,217)", disabled: false }}
                        bg="rgb(100, 43, 115)"
                        color="white"
                        fontSize="1.4em"
                        w={{ lg: "200px" }}
                        mx={{base: "3%", md: "10%", lg: "25%"}}
                        mb={{
                          base: '0px',
                          md: '0'
                        }}
                        mt={{
                          base: '16px',
                          md: '20px',
                          lg: '40px'
                        }}
                        borderRadius="3xl"
                        h="64px"
                        onClick={() => { onVoteModalOpen(); setModalClose(false); checkAndVote();}}
                      >
                        {hasUserVoted() ? "Already Signed!" : "Sign Petition"}
                      </Button>
                      { !modalClose && <CastVoteModal
                        isOpen={voteModalIsOpen}
                        onClose={ () => {onVoteModalClose; setModalClose(true); reportClickOutOfSignPetition();}}
                        onOpen={() => {reportOpenSignPetitionModal(); onVoteModalOpen; }}
                        campaign={campaign}
                        profileData={profileData}
                        uid={userid}
                        investmentsOld={investments || undefined}
                        slug={slug}
                        referralLink={(pageUri + "?ref=" + String(userid))}
                      /> } </>)
                      : 
                      (<>
                      <Button
                        bg="#32006b"
                        color="white"
                        fontSize="1.4em"
                        w={{ lg: "200px" }}
                        mx={{base: "3%", md: "10%", lg: "25%"}}
                        mb={{
                          base: '0px',
                          md: '0'
                        }}
                        mt={{
                          base: '16px',
                          md: '20px',
                          lg: '40px'
                        }}
                        borderRadius="3xl"
                        h="64px"
                        onClick={() => { onVoteModalOpen(); setLoginModal(true);}}
                        >
                        {"Sign Petition"}
                        </Button>
                      
                        {loginModal && 
                          <LoginModal 
                            isOpen={voteModalIsOpen}
                            onClose={ () => {onVoteModalClose; setLoginModal(false); reportClickOutOfSignPetition();}}
                            onOpen={() => {onVoteModalOpen; reportOpenLoginModal();}}
                          />
                        }
                        </>
                      )
                    }
                </Flex>
                
                <Flex
                    w={{base:"100%",lg:"30%"}}
                    boxShadow='2xl' p='1'
                    mb="32px"
                    mt="50px"
                    mr={{lg:"15%"}}
                    bg='#FFFFF'
                    height={{
                      base: 'fit-content',
                      lg: "200px"
                    }}
                    // borderRadius="16px"
                    justifyContent="center"
                    alignItems="center"
                    zIndex={500}
                    flexDir={{
                      base: "row",
                      md: "row"
                    }}
                  > 
                      <Box color="white" p={{ base: '6', lg: "16px 24px" }} borderRight={{
                        base: 'none',
                        md: "2px solid #eaeaea"
                      }}>
                        <Heading textAlign={"center"} fontSize={{ base: "24px", sm: "24px", lg: "42px" }} color="black">
                          {campaign?.verifiedVotes ? "$" + String(currencyFormatter.format((Math.round(Number(campaign?.verifiedVotes) * 100) /100) * 146)) : "0"}
                        </Heading>
                        <Text color="black" fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
                          <Center>
                          Our Holdings &nbsp; <Tooltip label="This number tracks the collective number of shares in the company petition signers own"><QuestionOutlineIcon/></Tooltip>
                          </Center>
                        </Text>
                      </Box>
                      <Box color="black" p={{ base: '4', lg: "16px 24px" }}>
                        <Heading textAlign={"center"}
                          fontSize={{ base: "24px", sm: "24px", lg: "42px" }}
                          color="black">
                          {String(howManyUsers(250))}
                        </Heading>
                        <Text fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
                          Petition Signers
                        </Text>
                      </Box>
                    </Flex>   
          </Flex>

{/* THIS IS THE IMAGES SECTION THAT COMES AFTER THE BANNER */}
          <Flex 
          mx={{lg:"10%"}}
          mt={{lg:"10%"}}
          justifyContent='space-between'
          alignItems={"center"}
          display="inline-block" flexDir={"row"} w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste1.png?alt=media&token=b7964255-2134-49dd-b88e-19aa067d770a"
              height="350px"
              width="300px"
              display={{base:"none",lg:"inline-block"}}
              mb={16}
              p={2}
              alt="campaign image"
            />
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste2.png?alt=media&token=29d93a02-5b0c-41da-aeda-27e099ca1054"
              height="350px" 
              width="300px" 
              display={{base:"none",lg:"inline-block"}}
              p={2} 
              alt="campaign image"
              />
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste3.png?alt=media&token=e9075046-c9fe-456c-b5bd-c9656f517711"
              height="350px"
              width="300px"
              display={{base:"none",lg:"inline-block"}}
              mb={16}
              p={2}
              alt="campaign image"
            />
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Ewaste4.png?alt=media&token=89bc7ddb-d199-45ea-b859-18626f43a469"
              height="350px" 
              width="300px" 
              display={{base:"none",lg:"inline-block"}} 
              p={2} 
              alt="campaign image"
              />
          </Flex>   
      
      
      <Container position="relative" mt="0" zIndex={1} w={{base:"95%",lg:"65%"}}>
        <Flex mt={{base:"0px",lg:"128px"}} w="100%" justifyContent="space-between" alignItems="center">
          <Flex mb="0px" flexDir={"column"} 
            w={{ base: "100%", sm: "100%", md: "60%", lg: "50%" }} mr="32px">
            <Box mb="32px">
              <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" ml={{base:"20px"}}>
                    <Highlight
                      query='IMPORTANT'
                      styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                      >
                      WHY IT&apos;S IMPORTANT
                    </Highlight>
              </Heading>
              {campaign?.companyName == "Apple" ? 


                campaign?.description && (<Text align="justify"  ml={{base:"20px"}}>
                  <Text as='b'>Electronic waste leaches toxic-materials into the environment, and puts people at risk of developing cancers. With your help, we can get Apple to take a stronger stance.</Text>
                  <br/>
                  <br/>
                    <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" >
                      <Highlight
                        query='Want'
                        styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                        >
                        What we want
                      </Highlight>
                    </Heading>  
                  <Text>We want Apple to disclose total electronic waste figures* and provide additional information on their plans to mitigate waste.</Text> 
                  <br/>
                  <br/>
                  <Container display={{ base: "block", sm: "none", lg: "none" }}>
                    <Faq faqs={faqs}></Faq>
                  </Container>
                  <br/>
                </Text>) 
                : 
                campaign?.description && (<Text>
                  {campaign?.description}
                </Text>)}
            </Box>
          
            </Flex>
              {/* START OF THE FAQ SECTION */}
              <Flex mb={{base:"0px",lg:"20px"}} flexDir={"column"} 
                w={{ base: '100%', lg:"50%" }} 
                display=   {{  base: "none", sm: "none", lg: "block" }}>
                <Flex mb="20px" flexDir={"column"} w="25%">
                  <Container 
                  paddingTop="20px" w="400%" paddingLeft={{base:"0px",lg:"50px"}}
                  >
                    <Faq faqs={faqs}></Faq>
                  </Container>
                </Flex>
              </Flex>
        </Flex>

{/* ATTEMPT TO ADD BACK STORY */}
    {/* BACK STORY */}
    <Container w={"100%"}>
      <Heading fontSize="28px" textTransform={"uppercase"} mb="16px">
        Back Story
      </Heading>
      <Text>In 2019, approximately ‎
      <Text  as='b'><Link href="https://ewastemonitor.info/gem-2020/#:~:text=A%20record%2053.6%20million%20metric,waste%20Monitor%202020%2C%20released%20today." isExternal>
      53.6 million ‎
      </Link></Text>
      metric tons (Mt) of e-waste was generated, most of which is undocumented (likely dumped or traded in a damaging way). The undocumented waste alone equates to over 4,000 Eiffel towers worth 🤯.</Text>
      {/* {String(campaign?.description).substring(332,1333)} */}
      <br/>
      <br/>      
      <Text>Inevitably, as one of the largest technology companies in the world, Apple makes and manages a LOT of the world&apos;s E-waste. But how much? That&apos;s the thing, we don&apos;t know. Apple&apos;s hardware produced ‎
      <b><Link href="https://www.zdnet.com/article/apples-colossal-e-waste-timebomb/" isExternal>1.65 billion</Link></b>
      ‎ devices by the end of 2020. Apple doesn&apos;t publish figures on hardware recycling, outlining how many materials are <b>not</b> recovered.</Text>
      <br/>
      <br/>
      <Text>A billion of anything is huge. A billion grains of rice weigh 25 metric tons and take up about three full sized dump trucks. </Text>
      <br/>
      <br/>
      <Text>But Apple doesn&apos;t sell rice. It sells iPhones and iPads and Macs.</Text>
      <br/>
      <Text>“Apple has a historic commitment to planned obsolescence, a policy whereby products are designed with an artificially restricted lifetime.”, sites a ‎
      
      <b><Link href="https://globuswarwick.com/2021/01/21/the-e-waste-problem-a-case-study-of-apple/">case study.</Link></b>
      ‎ Across almost all product lines, Apple&apos;s products are irreparable or uneconomical to repair (coercing customers into just purchasing another device).</Text>
      <br/>
      <br/>

      <Text> 
      We&apos;d like to see Apple publish an evaluation of its TOTAL contribution to electronic waste. Getting concrete numbers on Apple&apos;s contribution is the first step towards creating total waste targets and setting an industry standard. 
      </Text>
      <br/>
      <br/>
    </Container>
    {/* END OF BACKSTORY */}
    <Flex mb="64px" flexDir={"column"} 
            w={{ base: "100%", sm: "100%", md: "60%", lg: "50%" }} mr="32px">

            {/* <Box display={{ base: "none", sm: "none", lg: "block" }} ml="3.2%">
              <Flex justifyContent="space-between">
                <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" mt="32px"> 
                  Discussion
                </Heading>
              </Flex>
              <br></br>
              <Box mb="2%">
                <MasterCommentThread type="deal" slug={slug} userIdForComment={userid} maxThreadDepth={3}></MasterCommentThread>
              </Box>
            </Box> */}
    </Flex> 
{/* ADDING THE HOW IT WORKS SECTION AFTER THE DISCUSSION */}
    <Flex justifyContent="space-between" alignItems="center" width="100%" mb={'20px'}>
          <Heading 
            mr="10%" 
            as="h1"
            maxWidth={"900px"} 
            display="inline-block" 
            textAlign="center" 
            size="4xl"
            mx={"auto"}
            fontSize={{base: "20px", md: "4xl", lg: "4xl"}}
          >
            <Highlight
              query='real impact'
              styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
            >
              Join forces with other investors to have real impact
            </Highlight>
          </Heading>
        </Flex>
        <Box textAlign="center" ml="5%" mr="5%" mt="75px" display={{ base: "none", sm: "none", md:"block", lg: "block" }}>
        <Flex justifyContent="space-around" alignItems="center" width="100%" mt={20}>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Flock.png?alt=media&token=1515b250-2374-4d95-85be-26d91fc95f43"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    Link your Broker
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    In order to prove you own shares, we ask that you link your broker after making an account.
                  </Text>
                </Box>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Green%20Papers.png?alt=media&token=7c813e0b-964c-4b78-81cf-4e9a35d97e6b"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    Sign a Petition
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    Sign a petition for a company in your portfolio to take action on an issue you care about. 
                  </Text>
                </Box>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Megaphone.png?alt=media&token=d71c6a33-e24b-406c-b99e-487f5360932a"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    We Do the Rest
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    We&#39;ll advocate for change at the target companies on behalf of you and other investors.
                  </Text>
                </Box>
              </Flex>
            </Box>
{/* EXPERIMENTING WITH SWIPER HERE */}
      <Container display={{ base: "block", sm: "block", md:"none", lg: "none" }}>
        <Testimonial ></Testimonial>
      </Container>

{/* BULK BLOCK WITH SHARE THIS CAMPAIGN AND SIGN PETITION STARTS HERE */}
          
        <Flex
          w="100%"
          my="32px"
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
            <Stack>
              <Flex
                position="relative"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                width={{base: 284, md: 400, lg: 400}}
                backgroundColor="FFFFFF"
                boxShadow='2xl' p='0'
                borderRadius="16px"
                mt='auto'
                mb="auto"
                ml="auto"
                mr='auto'
                border="0px solid gray"
                
              >
                
                <Text fontSize="xl" fontWeight="bold" mb={0} mt={4}>
                  {"Share this campaign"}
                </Text>
                <Flex justifyContent="center" alignItems="space-around" width={48}>
                  <Box>
                    <Flex alignItems={"center"} justifyContent={"flex-start"}>
                      {socialMedia?.map((social: any, index: number) => {
                        if (social?.name === "clipboard") {
                          return (
                            <Button
                              key={index}
                              name={social.name}
                              w="48px"
                              h="48px"
                              onClick={() => copy(social?.link)}
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
                                copy(social?.link, {
                                  message: "Copied to clipboard",
                                });
                              }}
                              p="8px"
                            >
                              <Icon
                                w={8}
                                h={8}
                                _hover={{ color: "purple" }}
                                as={social?.icon}
                              />
                            </Link>
                          );
                        }
                      })}

                      
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Stack>
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
                borderRadius="3xl"
                fontSize="1.4em"
                w={{ lg: "150px" }}
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
                {hasUserVoted() ? "Already Signed!" : "Sign Petition"}
              </Button>
              { !modalClose && <CastVoteModal
                isOpen={voteModalIsOpen}
                onClose={ () => {onVoteModalClose; setModalClose(true); reportClickOutOfSignPetition();}}
                onOpen={() => {reportOpenSignPetitionModal(); onVoteModalOpen;}}
                campaign={campaign}
                profileData={profileData}
                uid={userid}
                investmentsOld={investments}
                slug={slug}
                referralLink={(pageUri + "?ref=" + String(userid))}
              /> } </>)
              : 
              (<>
              <Button
                bg="rgb(100, 43, 115)"
                color="white"
                borderRadius="3xl"
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
                {"Sign Petition"}
                </Button>
              
                {loginModal && 
                  <LoginModal 
                    isOpen={voteModalIsOpen}
                    onClose={ () => {onVoteModalClose; setLoginModal(false); reportClickOutOfSignPetition();}}
                    onOpen={() => {onVoteModalOpen; reportOpenLoginModal();}}
                  />
                }
                </>
              )
            }
          </Flex>
        </Flex>
      </Container>
      </>)}

      {/* //////////  CHANGE BELOW FOR CAMPAIGN 3      //////////// */}
      {/* //////////  CHANGE BELOW FOR CAMPAIGN 3      //////////// */}
      {/* //////////  CHANGE BELOW FOR CAMPAIGN 3      //////////// */}
      {/* //////////  CHANGE BELOW FOR CAMPAIGN 3      //////////// */}




      {/* ///// CHANGE THIS SYMBOL ON THE NEXT LINE FROM "CHANGETHIS" TO THE NEW COMPANY TICKER      //////////// */}
      {campaign?.symbol == "TM" && ( <> 
      <Head>
        <title>Proposal {campaign?.symbol} | Awake</title>
        <meta property="og:title" content="Stop Toyota from Fueling Climate Change" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Polutta.webp?alt=media&token=e681070b-15b2-4938-918c-6a5e28bdd2d5" />
      </Head>
      {showConfetti && (<Confetti width={width} height={height}/>)}
      <Box
        mt="0px"
        //bg="rgb(164,191,217)"
        //bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
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
          {/* <Button leftIcon={<IoArrowBackOutline />} bgColor="white" border="1px" onClick={() => goBack()} mt="2%" ml="-12%" position="fixed" paddingLeft="20px" display={{ base: "none", sm: "none" }}>
            All Campaigns
          </Button> */}
          <Flex
            position="relative"
            minH="80px"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            zIndex={250}
          >
          </Flex>
        </Container>
      </Box>

        <Flex justifyContent="space-between" alignItems="center" width="100%" flexDir={{base:"column",lg:"row"}} mt={{base:"12px",lg:"20px"}}>
          <Flex flexDir="column">
                  <Heading 
                      ml={{base: "3%", md: "10%", lg: "20%"}}
                      mr={{base: "3%", md: "10%", lg: "10%"}}
                      as="h1"
                      maxWidth={"900px"} 
                      display="inline-block" 
                      textAlign="left" 
                      size="2xl"
                      fontSize={{base: "3xl", md: "5xl", lg: "5xl"}}
                  >
                    <Highlight
                      query='Fueling Climate Change'
                      styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                      >
                      Stop Toyota from Fueling Climate Change
                    </Highlight>
                  </Heading>
                          {userid ? ( <>
                      <Button
                        {...hasUserVoted() ? { bg: "gray", disabled: true } : { bg: "rgb(164,191,217)", disabled: false }}
                        bg="rgb(100, 43, 115)"
                        color="white"
                        fontSize="1.4em"
                        w={{ lg: "200px" }}
                        mx={{base: "3%", md: "10%", lg: "25%"}}
                        mb={{
                          base: '0px',
                          md: '0'
                        }}
                        mt={{
                          base: '16px',
                          md: '20px',
                          lg: '40px'
                        }}
                        borderRadius="3xl"
                        h="64px"
                        onClick={() => { onVoteModalOpen(); setModalClose(false); checkAndVote();}}
                      >
                        {hasUserVoted() ? "Already Signed!" : "Sign Petition"}
                      </Button>
                      { !modalClose && <CastVoteModal
                        isOpen={voteModalIsOpen}
                        onClose={ () => {onVoteModalClose; setModalClose(true); reportClickOutOfSignPetition();}}
                        onOpen={() => {reportOpenSignPetitionModal(); onVoteModalOpen; }}
                        campaign={campaign}
                        profileData={profileData}
                        uid={userid}
                        investmentsOld={investments || undefined}
                        slug={slug}
                        referralLink={(pageUri + "?ref=" + String(userid))}
                      /> } </>)
                      : 
                      (<>
                      <Button
                        bg="#32006b"
                        color="white"
                        fontSize="1.4em"
                        w={{ lg: "200px" }}
                        mx={{base: "3%", md: "10%", lg: "25%"}}
                        mb={{
                          base: '0px',
                          md: '0'
                        }}
                        mt={{
                          base: '16px',
                          md: '20px',
                          lg: '40px'
                        }}
                        borderRadius="3xl"
                        h="64px"
                        onClick={() => { onVoteModalOpen(); setLoginModal(true);}}
                        >
                        {"Sign Petition"}
                        </Button>
                      
                        {loginModal && 
                          <LoginModal 
                            isOpen={voteModalIsOpen}
                            onClose={ () => {onVoteModalClose; setLoginModal(false); reportClickOutOfSignPetition();}}
                            onOpen={() => {onVoteModalOpen; reportOpenLoginModal();}}
                          />
                        }
                        </>
                      )
                    }
                </Flex>
                
                <Flex
                    w={{base:"100%",lg:"30%"}}
                    boxShadow='2xl' p='1'
                    mb="32px"
                    mt="50px"
                    mr={{lg:"15%"}}
                    bg='#FFFFF'
                    height={{
                      base: 'fit-content',
                      lg: "200px"
                    }}
                    // borderRadius="16px"
                    justifyContent="center"
                    alignItems="center"
                    zIndex={500}
                    flexDir={{
                      base: "row",
                      md: "row"
                    }}
                  > 
                      <Box color="white" p={{ base: '6', lg: "16px 24px" }} borderRight={{
                        base: 'none',
                        md: "2px solid #eaeaea"
                      }}>
                        <Heading textAlign={"center"} fontSize={{ base: "24px", sm: "24px", lg: "42px" }} color="black">
                          {campaign?.verifiedVotes ? "$" + String(currencyFormatter.format((Math.round(Number(campaign?.verifiedVotes) * 100) /100) * 146)) : "0"}
                        </Heading>
                        <Text color="black" fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
                          <Center>
                          Our Holdings &nbsp; <Tooltip label="This number tracks the collective number of shares in the company petition signers own"><QuestionOutlineIcon/></Tooltip>
                          </Center>
                        </Text>
                      </Box>
                      <Box color="black" p={{ base: '4', lg: "16px 24px" }}>
                        <Heading textAlign={"center"}
                          fontSize={{ base: "24px", sm: "24px", lg: "42px" }}
                          color="black">
                          {String(howManyUsers(141))}
                        </Heading>
                        <Text fontWeight={500} fontSize={{ base: "16px", lg: "16px" }}>
                          Petition Signers
                        </Text>
                      </Box>
                    </Flex>   
          </Flex>

{/* THIS IS THE IMAGES SECTION THAT COMES AFTER THE BANNER */}
          <Flex 
          mx={{lg:"10%"}}
          mt={{lg:"10%"}}
          justifyContent='space-between'
          alignItems={"center"}
          display="inline-block" flexDir={"row"} w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Ftoytota1.png?alt=media&token=fd186490-d796-4d4c-a0f3-2c1f495ebb8c"
              height="350px"
              width="300px"
              display={{base:"none",lg:"inline-block"}}
              mb={16}
              p={2}
              alt="campaign image"
            />
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Ftoytota2.png?alt=media&token=ed2e15b7-2750-4d28-8893-113b547a05a5"
              height="350px" 
              width="300px" 
              display={{base:"none",lg:"inline-block"}}
              p={2} 
              alt="campaign image"
              />
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Ftoytota3.png?alt=media&token=9da3c1d1-6139-4031-9176-c9d2146b9272"
              height="350px"
              width="300px"
              display={{base:"none",lg:"inline-block"}}
              mb={16}
              p={2}
              alt="campaign image"
            />
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Ftoytota4.png?alt=media&token=57233505-27b7-49ff-b219-e484e8002b1f"
              height="350px" 
              width="300px" 
              display={{base:"none",lg:"inline-block"}} 
              p={2} 
              alt="campaign image"
              />
          </Flex>   
      
      
      <Container position="relative" mt="0" zIndex={1} w={{base:"95%",lg:"65%"}}>
        <Flex mt={{base:"0px",lg:"128px"}} w="100%" justifyContent="space-between" alignItems="center">
          <Flex mb="0px" flexDir={"column"} 
            w={{ base: "100%", sm: "100%", md: "60%", lg: "50%" }} mr="32px">
            <Box mb="32px">
              <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" ml={{base:"20px"}}>
                    <Highlight
                      query='IMPORTANT'
                      styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                      >
                      WHY IT&apos;S IMPORTANT
                    </Highlight>
              </Heading>
              {campaign?.companyName == "Toyota Motors" ? 


                campaign?.description && (<Text align="justify"  ml={{base:"20px"}}>
                  <Text as='b'>Toyota lobbies againts climate policies more than any other auto company and is ranked the company with the third most negative impact in the world on climate policy, just behind oil giants ExxonMobil and Chevron.</Text>
                  <br/>
                  <br/>
                    <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" >
                      <Highlight
                        query='Want'
                        styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
                        >
                        What we want
                      </Highlight>
                    </Heading>  
                  <Text>We want Toyota Motors to stop lobbying against climate positive policies and publicly disclose its lobbying behavior.</Text> 
                  <br/>
                  <br/>
                  <Container display={{ base: "block", sm: "none", lg: "none" }}>
                    <Faq faqs={faqs}></Faq>
                  </Container>
                  <br/>
                </Text>) 
                : 
                campaign?.description && (<Text>
                  {campaign?.description}
                </Text>)}
            </Box>
          
            </Flex>
              {/* START OF THE FAQ SECTION */}
              <Flex mb={{base:"0px",lg:"20px"}} flexDir={"column"} 
                w={{ base: '100%', lg:"50%" }} 
                display=   {{  base: "none", sm: "none", lg: "block" }}>
                <Flex mb="20px" flexDir={"column"} w="25%">
                  <Container 
                  paddingTop="20px" w="400%" paddingLeft={{base:"0px",lg:"50px"}}
                  >
                    <Faq faqs={faqs}></Faq>
                  </Container>
                </Flex>
              </Flex>
        </Flex>

{/* ATTEMPT TO ADD BACK STORY */}
    {/* BACK STORY */}
    <Container w={"100%"}>
      <Heading fontSize="28px" textTransform={"uppercase"} mb="16px">
        Back Story
      </Heading>
      <Text>Toyota earned an eco-friendly reputation for the first modern mass-market hybrid car in year 2000. Decades later,
      <Text  as='b'><Link href="https://www.greenpeace.org.au/wp/wp-content/uploads/2022/09/GREENPEACE-Under-The-Hood_The-Truth-About-Toyota-v1.pdf" isExternal>
      499 out of every 500 ‎
      </Link></Text>
      Toyotas sold is powered by fossil fuels.</Text>
      <br/>
      <br/>      
      <Text>It&apos;s ranked as the auto maker with the <b>worst</b> record on climate. &quot;Not even factored into Toyota’s terrible ranking is its 
      <Link href="https://www.citizen.org/news/toyotas-lobbying-hurts-our-health-and-climate/"><Text>cheating</Text></Link> on fuel emissions tests.&quot; For this, Toyota was fined <b>$180 million</b> last year by the EPA for violating regulations, which protect public health from pollution.</Text>
      <br/>
      <br/>
      <Text>You may wonder why Toyota hasn&apos;t already shifted to electronic vehicles and phased out its aggressive lobbying. It comes down to ill-advised bets and competition. &quot;Toyota bet its future on the development of hydrogen fuel cells — a costlier technology that has fallen far behind electric batteries — with greater use of hybrids in the near term.&quot;, the Times<Link href="https://www.nytimes.com/2021/07/25/climate/toyota-electric-hydrogen.html">reports.</Link></Text>
      <br/>
      <br/>
      <Text>Toyota&apos;s Indian subsidiary criticized India’s target for 100 percent electric vehicle sales by 2030, and also sided with the Trump administration in a battle with California over the Clean Air Act.</Text>
      <br/>
      <br/>

      <Text>In an attempt to undermine it&apos;s competition which bet on fully electric vehicles, it&apos;s come to undermine the energy transition.</Text>
      <br/>

      <Text> 
      We don&apos;t have time for companies like Toyota lobby for a competitive edge when our future is at stake. Sign the petition (especially if you own Toyota shares) to send a message to leadership that we won&apos;t stand for this!
      </Text>
      <br/>
      <br/>
    </Container>
    {/* END OF BACKSTORY */}
    <Flex mb="64px" flexDir={"column"} 
            w={{ base: "100%", sm: "100%", md: "60%", lg: "50%" }} mr="32px">

            {/* <Box display={{ base: "none", sm: "none", lg: "block" }} ml="3.2%">
              <Flex justifyContent="space-between">
                <Heading fontSize="28px" textTransform={"uppercase"} mb="16px" mt="32px"> 
                  Discussion
                </Heading>
              </Flex>
              <br></br>
              <Box mb="2%">
                <MasterCommentThread type="deal" slug={slug} userIdForComment={userid} maxThreadDepth={3}></MasterCommentThread>
              </Box>
            </Box> */}
    </Flex> 
{/* ADDING THE HOW IT WORKS SECTION AFTER THE DISCUSSION */}
    <Flex justifyContent="space-between" alignItems="center" width="100%" mb={'20px'}>
          <Heading 
            mr="10%" 
            as="h1"
            maxWidth={"900px"} 
            display="inline-block" 
            textAlign="center" 
            size="4xl"
            mx={"auto"}
            fontSize={{base: "20px", md: "4xl", lg: "4xl"}}
          >
            <Highlight
              query='real impact'
              styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
            >
              Join forces with other investors to have real impact
            </Highlight>
          </Heading>
        </Flex>
        <Box textAlign="center" ml="5%" mr="5%" mt="75px" display={{ base: "none", sm: "none", md:"block", lg: "block" }}>
        <Flex justifyContent="space-around" alignItems="center" width="100%" mt={20}>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Flock.png?alt=media&token=1515b250-2374-4d95-85be-26d91fc95f43"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    Link your Broker
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    In order to prove you own shares, we ask that you link your broker after making an account.
                  </Text>
                </Box>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Green%20Papers.png?alt=media&token=7c813e0b-964c-4b78-81cf-4e9a35d97e6b"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    Sign a Petition
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    Sign a petition for a company in your portfolio to take action on an issue you care about. 
                  </Text>
                </Box>
                <Box
                  width="32%"
                  fontSize="xl"
                  backgroundColor="whiteAlpha.500"
                  m={1}
                  padding="4px"
                >
                  <Image
                    alt="campaign image"
                    boxSize={{base: "50px", md: "150px", lg: "150px"}}
                    ml="auto"
                    mr="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Megaphone.png?alt=media&token=d71c6a33-e24b-406c-b99e-487f5360932a"
                  />
                  <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "24px"}}>
                    We Do the Rest
                  </Text>
                  <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                    We&#39;ll advocate for change at the target companies on behalf of you and other investors.
                  </Text>
                </Box>
              </Flex>
            </Box>
{/* EXPERIMENTING WITH SWIPER HERE */}
      <Container display={{ base: "block", sm: "block", md:"none", lg: "none" }}>
        <Testimonial ></Testimonial>
      </Container>

{/* BULK BLOCK WITH SHARE THIS CAMPAIGN AND SIGN PETITION STARTS HERE */}
          
        <Flex
          w="100%"
          my="32px"
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
            <Stack>
              <Flex
                position="relative"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                width={{base: 284, md: 400, lg: 400}}
                backgroundColor="FFFFFF"
                boxShadow='2xl' p='0'
                borderRadius="16px"
                mt='auto'
                mb="auto"
                ml="auto"
                mr='auto'
                border="0px solid gray"
                
              >
                
                <Text fontSize="xl" fontWeight="bold" mb={0} mt={4}>
                  {"Share this campaign"}
                </Text>
                <Flex justifyContent="center" alignItems="space-around" width={48}>
                  <Box>
                    <Flex alignItems={"center"} justifyContent={"flex-start"}>
                      {socialMedia?.map((social: any, index: number) => {
                        if (social?.name === "clipboard") {
                          return (
                            <Button
                              key={index}
                              name={social.name}
                              w="48px"
                              h="48px"
                              onClick={() => copy(social?.link)}
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
                                copy(social?.link, {
                                  message: "Copied to clipboard",
                                });
                              }}
                              p="8px"
                            >
                              <Icon
                                w={8}
                                h={8}
                                _hover={{ color: "purple" }}
                                as={social?.icon}
                              />
                            </Link>
                          );
                        }
                      })}

                      
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Stack>
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
                borderRadius="3xl"
                fontSize="1.4em"
                w={{ lg: "150px" }}
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
                {hasUserVoted() ? "Already Signed!" : "Sign Petition"}
              </Button>
              { !modalClose && <CastVoteModal
                isOpen={voteModalIsOpen}
                onClose={ () => {onVoteModalClose; setModalClose(true); reportClickOutOfSignPetition();}}
                onOpen={() => {reportOpenSignPetitionModal(); onVoteModalOpen;}}
                campaign={campaign}
                profileData={profileData}
                uid={userid}
                investmentsOld={investments}
                slug={slug}
                referralLink={(pageUri + "?ref=" + String(userid))}
              /> } </>)
              : 
              (<>
              <Button
                bg="rgb(100, 43, 115)"
                color="white"
                borderRadius="3xl"
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
                {"Sign Petition"}
                </Button>
              
                {loginModal && 
                  <LoginModal 
                    isOpen={voteModalIsOpen}
                    onClose={ () => {onVoteModalClose; setLoginModal(false); reportClickOutOfSignPetition();}}
                    onOpen={() => {onVoteModalOpen; reportOpenLoginModal();}}
                  />
                }
                </>
              )
            }
          </Flex>
        </Flex>
      </Container>
      </>)}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context?.query;
  const campaignDoc = await fetchProposalFromStore(slug as string);
  let campaign = null;

  try {
    campaign = {
      ...campaignDoc?.data(),
    };
  }
  catch(e) {
    console.log(e)
  }

  let stockData  = null;
  let investments = null;
  let uid  = null;
  let profileData  = null;
  let email = null;

  context.res.setHeader(
    "Cache-Control",
    'public, s-maxage=15, stale-while-revalidate=59'
  );

  try {
    const cookies = nookies?.get(context);
    const token = await admin?.auth().verifyIdToken(cookies.__session);

    uid = token?.uid;

    const profile: any = await getProfileData(uid);

    profileData = {
      ...profile!.data()
    };


    if (profileData?.investments) {
      investments = profileData?.investments;

    }
    else {
      investments = null;
    }

  }
  catch (e) {
    //console.log(e);
  } 

  if (campaign?.createdAt instanceof Timestamp) {
    campaign.createdAt = new Date(campaign.createdAt.seconds).toString();
  }

  if (campaign?.deadline instanceof Timestamp) {
    campaign.deadline = new Date(campaign.deadline.seconds).toString();
  }

  return {
    props: {
      campaign,
      stockData,
      investments,
      slug: slug as string,
      profileData: profileData,
      email: email,
    },
  };
}
