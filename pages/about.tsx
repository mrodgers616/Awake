import type { NextPage } from "next";
import Head from "next/head";
import {
  Container,
  Heading,
  Box,
  Button,
  Image,
  Link,
  Text,
  Icon,
  Flex,
} from "@chakra-ui/react";
import Faq from "../components/Faq";
import { FaArrowRight } from "react-icons/fa";
import faqs from "../data/faqs.json";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Climate DAO | About us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box
        title="membership-cta"
        mt="120px"
        bgPosition={"center"}
        position="relative"
        bgSize="cover"
        bgImage={`url('https://images.unsplash.com/photo-1521405785232-7a56b029191e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80')`}
      >
        <Box
          bg="rgba(0,0,0,.4)"
          position="absolute"
          w="100%"
          h="100%"
          zIndex={0}
        />
        <Container>
          <Flex
            flexDir="column"
            h="400px"
            justifyContent={"center"}
            zIndex={200}
          >
            <Heading
              as="h1"
              size="xl"
              fontSize="60px"
              color="white"
              mb="64px"
              zIndex={250}
            >
              Untapped Value for Retail Investors
            </Heading>
            <Box>
              <Button
                as={Link}
                bg="seafoam.500"
                color="white"
                h="48px"
                href="/campaigns"
                _disabled={{
                  pointerEvents: "none",
                }}
              >
                Campaigns
                <Icon as={FaArrowRight} ml="15px" />
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container>
        <Box title="values" my="120px">
          {/* <Flex
            className="value"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Image
              w="40%"
              h="auto"
              src="/illustrations/Link your Accounts.png"
              alt="Analytics team"
            />
            <Box className="value-content" w="55%">
              <Heading fontSize="48px" mb="28px">
                link your brokerage account
              </Heading>
              <Text fontSize="1.5em">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
                duis at tellus at urna condimentum mattis pellentesque.
              </Text>
            </Box>
          </Flex>
          <Flex
            className="value"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Box className="value-content" w="55%">
              <Heading fontSize="48px" mb="28px">
                holding corporations to their word
              </Heading>
              <Text fontSize="1.5em">
              Climate DAO intends to create value by holding corporations accountable to its shareholders and its stakeholders.
              </Text>
            </Box>
            <Image
              w="40%"
              h="auto"
              src="/illustrations/Analytics team_Two Color 1.png"
              alt="Analytics team"
            />
          </Flex>
          <Flex
            className="value"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Image
              w="40%"
              h="auto"
              src="/illustrations/Data storage_Two Color 1.png"
              alt="Analytics image"
            />
            <Box className="value-content" w="55%">
              <Heading fontSize="48px" mb="28px">
                link your borkerage accounts
              </Heading>
              <Text fontSize="1.5em">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
                duis at tellus at urna condimentum mattis pellentesque.
              </Text>
            </Box>
          </Flex>
          <Flex
            className="value"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Box className="value-content" w="55%">
              <Heading fontSize="48px" mb="28px">
                vote with your values
              </Heading>
              <Text fontSize="1.5em">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
                duis at tellus at urna condimentum mattis pellentesque.
              </Text>
            </Box>
            <Image
              w="40%"
              h="auto"
              src="/illustrations/Analytics team_Two Color 1.png"
              alt="Analytics image"
            />
          </Flex>
          <Flex
            className="value"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Image
              w="40%"
              h="auto"
              src="/illustrations/Data storage_Two Color 1.png"
              alt="Analytics image"
            />
            <Box className="value-content" w="55%">
              <Heading fontSize="48px" mb="28px">
                join our community
              </Heading>
              <Text fontSize="1.5em">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
                duis at tellus at urna condimentum mattis pellentesque.
              </Text>
            </Box>
          </Flex> */}
          <Flex
            borderRadius="16px"
            flexDir="column"
            mb="64px"
            color="white"
            bgSize="cover"
            bgImage="https://images.unsplash.com/photo-1588552070639-772396abbde5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
            p="64px"
            h="600px"
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
          >
            <Heading zIndex={250} fontFamily="2em">
              Mission
            </Heading>
            <Text zIndex={250} fontSize="1.6em">
              Climate DAO is on a mission to mitigate the causes and symptoms of
              human-caused climate change, democratize shareholder activism for
              the &sqout;everyday&sqout; retail investor and increase adoption
              of blockchain technology for social good
            </Text>
            <Box
              bg="rgba(0,0,0,.4)"
              position="absolute"
              w="100%"
              h="100%"
              zIndex={0}
              top="0"
              left="0"
            />
          </Flex>
          <Flex
            borderRadius="16px"
            flexDir="column"
            mb="64px"
            color="white"
            bg='url("https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")'
            p="64px"
            h="600px"
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
          >
            <Heading fontFamily="2em" zIndex={250}>
              Values
            </Heading>
            <Text fontSize="1.6em" zIndex={250}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
              duis at tellus at urna condimentum mattis pellentesque.
            </Text>
            <Box
              bg="rgba(0,0,0,.4)"
              position="absolute"
              w="100%"
              h="100%"
              top="0"
              left="0"
              zIndex={0}
            />
          </Flex>
          <Flex
            title="join"
            h="600px"
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            mb="64px"
            position="relative"
            my="120px"
          >
            <Image
              position={"absolute"}
              h="100%"
              w="auto"
              src="/illustrations/Join ClimateDAO Community.png"
              top="0"
            />
            <Heading
              fontSize="4.5em"
              textAlign={"center"}
              w="70%"
              textTransform={"revert"}
              mb="16px"
            >
              A growing ClimateDAO community
            </Heading>
            <Text mb="32px">
              Join a community of creatives, artists, experts, and activits tied
              by our love of the planet.
            </Text>
            <Button
              as={Link}
              color="white"
              bg="seafoam.500"
              px="86px"
              py="18px"
              target="_blank"
              href="https://discord.gg/xfRTsxVA4d"
              _disabled={{
                pointerEvents: "none",
              }}
            >
              Join ClimateDAO
            </Button>
          </Flex>
        </Box>
        <Faq faqs={faqs} />
      </Container>
    </>
  );
};

export default About;
