import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import theme from "../theme/styles";
import Head from "next/head";
import {
  Container,
  Flex,
  Box,
  Button,
  Icon,
  Image,
  Stack,
  Text
} from "@chakra-ui/react";
import {
  FaPlayCircle
} from "react-icons/fa";
import Link from "../components/Link";
import FeaturedCampaigns from "../components/FeaturedCampaigns";
import StepsSection from '../components/StepsSection';
import AnimatedMainHeading from "../components/AnimatedMainHeading";
import TwitterTestimonial from "../components/TwitterTestimonials";
import Stats from "../components/Stats";
import {
  CLIMATEDAO_TOKEN_ADDRESS
} from "../lib/web3";
import copy from "copy-to-clipboard";
import { FaClipboard, FaTwitter, FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Steps } from '../lib/mock-data';
//import campaigns from '../data/mockcampaigns.json';
import { useWeb3 } from "../contexts/Web3Context";
import { fetchFeaturedProposalFromStore } from "../lib/firebaseClient";


const Home: NextPage<{
  featured: any;
  trending: any;
}> = ({
  featured,
  trending
}) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(true);
    const [sharesCommited, setSharesCommited] = useState(0);
    const [treasury, setTreasury] = useState(10);
    const [walletsConnected, setWalletsConnected] = useState(0);

    //const { earthBalance } = useWeb3()

    const copyToClipboard = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      setShowCopyTooltip(true);
      copy(CLIMATEDAO_TOKEN_ADDRESS);
    };

    useEffect(() => {
      // Fetch share, treasury, and wallet data.
      setSharesCommited(0);
      setTreasury(10);
      setWalletsConnected(1);
    }, []);

    useEffect(() => {
      setTimeout(() => {
        setShowCopyTooltip(false);
      }, 2000);
    }, [showCopyTooltip]);

    return (
      <>
        <Head>
          <title>ClimateDAO | Home</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Box
          w="98%"
          mx={"1%"}
          bgGradient="linear-gradient(sage.500, seafoam.500)"
          mt="120px"
          zIndex="500"
          borderRadius={"30px"}
          h={{ base: 'fit-content', lg: "650px" }}
        >
          <Container
            width="100%"
            overflow="auto"
            height="100%"
            m="auto"
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              height="calc(100% - 60px)"
              flexDirection={{
                base: "column-reverse",
                lg: "row"
              }}
            >
              <Flex
                flexDir={"column"}
                justifyContent="center"
                w={{ base: "100%", lg: "100%" }}
                id="banner"
                mr='32px'
                ml='32px'
                mb={{
                  base: '5em',
                  md: '8em',
                  lg: '8em'
                }}
              >
                <Image
                  ml="auto"
                  mr="auto"
                  mb="5%"
                  mt="13%"
                  src="/illustrations/ClimateDAO Logo.png"
                  width="60%"
                  alt="Climate DAO Logo"
                >
                </Image>
                <AnimatedMainHeading
                  text="Align Your Money with Your Values"//"Where Activist Investing Meets Web 3"
                  textAlign="center"
                  color="white"
                  fontSize={{ base: "32px", sm: "32px", md: "42px", lg: "70px" }}
                  display={"flex"}
                  flexWrap={"wrap"}
                  mx={"auto"}
                  w={{ base: "80%", sm: "80%", lg: "60%" }}
                  fontFamily="DM Sans"
                  borderColor={"red"}
                  borderWidth={"thick"}
                  mb="32px"
                />
                <Flex
                  width={{ base: '100%', md: '80%' }}
                  justifyContent="space-between"
                  flexDirection={{ base: "column", md: "row" }}
                >
                  {/* <Button
                  as={Link}
                  color="white"
                  bg="seafoam.500"
                  h="50px"
                  minW='33%'                  
                  mx={{ base: '0', md: '1em' }}
                  mb={{ base: '1em', md: '0' }}      
                  target="_blank"
                  href='https://discord.gg/xfRTsxVA4d'
                  _first={{
                    ml: 0
                  }}
                  _disabled={{
                    pointerEvents: 'none'
                  }}
                >
                  Discord
                </Button>
                <Button
                  as={Link}
                  color="white"
                  bg="seafoam.500"
                  h="50px"
                  mx={{ base: '0', md: '1em' }}
                  mb={{ base: '1em', md: '0' }}      
                  minW='33%'
                  target="_blank"
                  href='https://docs.google.com/document/d/1xdR38Y6xEO_C3NpPUk7gLTGdMYOUTIP0BKmJ4Cz8YF8/edit?usp=sharing'
                  _disabled={{
                    pointerEvents: 'none'
                  }}
                >
                  Whitepaper
                </Button>
                <Button
                  as={Link}
                  color="white"
                  bg="seafoam.500"
                  mx={{ base: '0', md: '1em' }}
                  mb={{ base: '1em', md: '0' }}    
                  h="50px"
                  minW='33%'
                  target="_blank"
                  href='https://twitter.com/Climate_DAO'
                  _last={{
                    mr: 0,
                  }}
                  _disabled={{
                    pointerEvents: 'none'
                  }}
                >
                  Twitter
                </Button> */}
                </Flex>
              </Flex>
              {/* <Flex
              w={{
                base: "100%",
                lg: '50%'
              }}
              mb={{
                base: '32px',
                lg: '0'
              }}
              mt={{
                base: '32px',
                lg: '0'
              }}
              h="400px"
              bg="grey"
              borderRadius="16px"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={FaPlayCircle} color="white" w="50px" h="50px"></Icon>
            </Flex> */}
            </Flex>
          </Container>
        </Box>

        <Box mt="100px" mr="3%">
          <Container
            width="100%"
            overflow="none"
            m="auto"
            zIndex="1000"
          >
            {/* <Stats 
            sharesCommited={sharesCommited}
            walletsConnected={walletsConnected}
            treasury={treasury}
          /> */}
            <StepsSection
              mb='128px'
              steps={Steps}
            />
            <Box ml="5%" mr="5%" mb="10%" height="100%">
              <Text display="block" ml="2%" mr="2%" textAlign="center" fontSize="2xl" mb="10%">
                At ClimateDAO we empower like-minded investors to collectively advocate
                for changes they want to see at public companies.
              </Text>
              <Flex ml={{ base: "-10%", sm: "-10%", lg: "-20%" }} mr={{ base: "-10%", sm: "-10%", lg: "-20%" }} mt="4%" bgGradient="linear(to bottom, #348477,#17CFA5)" borderRadius="30px" height="400px">
                <Stack spacing={2} mr={{ base: "0%", sm: "0%", lg: "15%" }} height="300px" mt="auto" mb="auto">
                  <Text
                    textAlign="left"
                    fontSize={{ base: "32px", sm: "32px", lg: "6xl" }}
                    mt="5%"
                    display="block"
                    fontWeight="bold"
                    ml={{ base: "10px", sm: "0%", lg: "15%" }}
                  >
                    What happens to my data?
                  </Text>
                  <Text display="block" fontSize={{ base: "16px", sm: "24px", lg: "2xl" }} ml={{ base: "20px", sm: "0%", lg: "0px" }} paddingLeft={{ base: "0%", sm: "0%", lg: "15%" }}>
                    Don&apos;t worry, your data is safe with us! <b>All of your investment data is securely stored and encrypted. </b>
                    {' '}
                  </Text>
                </Stack>
                {/* <Image
                  height={{ base: "75px", sm: "75px", lg: "300px" }}
                  width={{ base: "100", sm: "100px", lg: "400px" }}
                  mr="6%"
                  mt="auto" mb="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2039.png?alt=media&token=14c1cae2-5cf6-4ded-b1c9-ab8138e93409"
                /> */}
              </Flex>
              <Flex mt="15%" ml="-20%" mr="-20%">
                <Image
                  height={{ base: "150px", sm: "75px", lg: "300px" }}
                  width={{ base: "200px", sm: "100px", lg: "400px" }}
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FLink%20your%20Accounts.png?alt=media&token=54176198-7c1c-4287-b36d-2046d45c187a"
                  ml=" 5%"
                />
                <Stack spacing={2} ml={{ base: "5px", sm: "10px", lg: "17%" }} height="300px" mr="6%">
                  <Text textAlign="left" fontSize={{ base: "32px", sm: "32px", lg: "6xl" }} fontWeight="bold">
                    Why it’s important
                  </Text>
                  <Text textAlign="left" fontSize={{ base: "16px", sm: "24px", lg: "2xl" }}>
                    Linking your brokerage accounts allows us to show
                    companies that its OWNERS have
                    supported these proposed campaigns.
                  </Text>
                </Stack>
              </Flex>
              <Flex mt="15%" ml={{ base: "-10%", sm: "-10%", lg: "-20%" }} mr={{ base: "-10%", sm: "-10%", lg: "-20%" }} bgGradient="linear(to bottom, #348477,#17CFA5)" borderRadius="30px" height="400px">
                <Stack spacing={2} ml="10%" height="300px" mt="auto" mb="auto">
                  <Text fontWeight="bold" fontSize={{ base: "32px", sm: "32px", lg: "6xl" }}>
                    Strength in numbers
                  </Text>
                  <Text fontSize={{ base: "12px", sm: "12px", lg: "2xl" }} ml={"15px"}
                    paddingLeft={{ base: "0px", sm: "0px", lg: "15%" }}
                  >
                    After verifying that you own shares and signaling your support for
                    campaigns, we can approach companies with much more leverage. Whether you own stocks or not, public companies have a huge impact
                    on our everyday lives. Everything from the food we eat, to how we
                    connect, and the environment we live in is impacted by
                    public companies.
                  </Text>
                </Stack>
                <Image
                  height={{ base: "100", sm: "100px", lg: "250px" }}
                  width="400px"
                  mt="auto" mb="auto"
                  mr="6%"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2041.png?alt=media&token=134d5014-8b72-45ea-a293-d2d0d823297f"
                />
              </Flex>
            </Box>
            <FeaturedCampaigns
              featured={featured}
              trending={trending}
            />
          </Container>
          <TwitterTestimonial />
        </Box >
      </>
    );
  };

export async function getServerSideProps(_context: GetServerSidePropsContext) {
  // fetch featured campaigns.
  // fetch trending campaigns.
  let campaigns: any = await fetchFeaturedProposalFromStore();

  return {
    props: {
      featured: campaigns[0],
      trending: campaigns.slice(1)
    },
  };
}

export default Home;
