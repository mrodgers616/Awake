import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import {
  Container,
  Flex,
  Box,
  Button,
  Icon,
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
import { useEffect, useState } from "react";
import { Steps } from '../lib/mock-data';
import campaigns from '../data/mockcampaigns.json';
import { useWeb3 } from "../contexts/Web3Context";

const Home: NextPage<{
  featured: any;
  trending: any;
}> = ({
  featured,
  trending
}) => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(true);
  const [ sharesCommited, setSharesCommited ] = useState(0);
  const [ treasury, setTreasury ] = useState(10);
  const [ walletsConnected, setWalletsConnected ] = useState(0);

  const { earthBalance } = useWeb3()

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
        w="100%"
        bgGradient="linear(90deg, seafoam.500 -500%, sage.500 50%, seafoam.500 500%)"
        mt="120px"
        zIndex="500"
        h={{ base: '1000px', lg: "650px" }}
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
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            <Flex
              flexDir={"column"}
              justifyContent="center"
              w={{ base: "100%", md: "50%" }}
              id="banner"
              mr='32px'
              mb='8em'
            >
              <AnimatedMainHeading
                text="Where Activist Investing Meets Web 3"
                color="white"
                fontSize="70px"
                display={"flex"}
                flexWrap={"wrap"}
                fontFamily="DM Sans"
                mb="32px"
              />
              <Flex 
                width={{ base: '100%', md: '80%' }}
                justifyContent="space-between"
                flexDirection={{ base: "column", md: "row" }}
              >
                <Button
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
                </Button>
              </Flex>
            </Flex>
            <Flex
              w="50%"
              h="450px"
              bg="grey"
              borderRadius="10px"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={FaPlayCircle} color="white" w="50px" h="50px"></Icon>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box mt="-64px">
        <Container      
          width="100%"
          overflow="none"
          m="auto"
          zIndex="1000"
        >
          <Stats 
            sharesCommited={sharesCommited}
            walletsConnected={walletsConnected}
            treasury={treasury}
          />
          <StepsSection
            mb='128px'
            steps={Steps}
          />
          <FeaturedCampaigns
            featured={featured}
            trending={trending}
          />
        </Container>
        <TwitterTestimonial />
      </Box>
    </>
  );
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
  // fetch featured campaigns.
  // fetch trending campaigns.

  return {
    props: {
      featured: campaigns[0],
      trending: campaigns.slice(1)
    },
  };
}

export default Home;
