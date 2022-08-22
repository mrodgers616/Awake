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
import type { NextPageWithLayout } from './_app'


const About: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Awake | About us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box
        bg="sage.500"
        bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
        // bgImage="url(https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
        bgSize="cover"
        zIndex={0}
        position="relative"
      >
        <Box
          // bg="rgba(0,0,0,.4)"
          position="absolute"
          w="100%"
          h="100%"
          zIndex={0}
          top="0"
          left="0"
        />
        <Container
          position="relative"
          width="100%"
          h={{ base: "200px", sm: "200px", lg: "400px" }}
          overflow="auto"
          marginX="auto"
          zIndex={200}
        >
          <Flex
            flexDir="column"
            h="200px"
            justifyContent={"center"}
            zIndex={200}
          >
            <Heading
              as="h1"
              size="xl"
              fontSize={{ base: "24px", sm: "24px", lg: "60px" }}
              color="white"
              ml="auto"
              mr="auto"
              mt={{ base: "60px", lg: "60" }}
              zIndex={250}
            >
              Activating the Power of Retail Investors
            </Heading>
            <Box>
              {/* <Button
                as={Link}
                bg="rgb(164,191,217)"
                color="white"
                h="48px"
                ml="6%"
                mt="6%"
                href="/campaigns"
                _disabled={{
                  pointerEvents: "none",
                }}
              >
                Campaigns
                <Icon as={FaArrowRight} ml="15px" />
              </Button> */}
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container>
        <Box title="values" my={{ base: "60px", sm: "60px", lg: "120px" }}>
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
            bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
            p={{ base: "32px", sm: "32px", lg: "64px" }}
            h={{ base: "fit-content", lg: "400px" }}
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
          >
            <Heading zIndex={250} fontFamily={{ base: "28px", sm: "28px", lg: "3em" }} mb="2%">
              Mission
            </Heading>
            <Text zIndex={250} fontSize={{ base: "16px", sm: "16px", lg: "1.6em" }}>
              Awake is empowering everyday investors to be activists. Voting on shareholder proposals is a complicated and tedious process. Awakemakes it easy for investors to have their voices heard at the companies they own. Whether you own stock through a brokerage, a pension or a 401k, you should have a say. We act as the missing link between shareholders who care about complex issues and the fund managers voting on their behalf. The data we aggregate from users will be used to engage fund managers with their investors&#39; sentiment so that they can make more informed decisions.
            </Text>
            <Box
              bg="rgba(0,0,0,.0)"
              borderRadius="20px"
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
            bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
            p={{ base: "32px", sm: "32px", lg: "64px" }}
            h={{ base: "fit-content", lg: "400px" }}
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
          >
            <Heading fontFamily={{ base: "28px", sm: "28px", lg: "3em" }} mb="2%" zIndex={250}>
              Vision
            </Heading>
            <Text fontSize={{ base: "16px", sm: "16px", lg: "1.6em" }} zIndex={250}>
              We envision a world in which the wisdom of the crowds is used for social good, a world in which companies
              are held accountable for their actions. As a community, we will leverage our collective capital, expertise,
              and we will move mountains.
            </Text>
            <Box
              bg="rgba(0,0,0,.0)"
              borderRadius="20px"
              position="absolute"
              w="100%"
              h="100%"
              top="0"
              left="0"
              zIndex={0}
            />
          </Flex>
          <Flex
            borderRadius="16px"
            flexDir="column"
            mb="64px"
            color="white"
            bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
            p={{ base: "32px", sm: "32px", lg: "64px" }}
            h={{ base: "fit-content", lg: "400px" }}
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
          >
            <Heading fontFamily={{ base: "28px", sm: "28px", lg: "3em" }} mb="2%" zIndex={250}>
              Tactics
            </Heading>
            <Text fontSize={{ base: "16px", sm: "16px", lg: "1.6em" }} zIndex={250}>
              We plan to get retail investors small and large alike to link their brokerage accounts and express what they want to see at the public companies they own. We can wield our collective voice to get public companies to take action. After getting campaign or proposal backers, we reach out to the corporations we&#39;re trying to get to take action and share what we&#39;ve gathered from our community.
            </Text>
            <Box
              bg="rgba(0,0,0,.0)"
              borderRadius="20px"
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
            my={{ base: "60px", sm: "60px", lg: "120px" }}
            display={{ base: "none", sm: "none", lg: "" }}
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
              A growing Awake community
            </Heading>
            <Text mb="32px">
              Join a community of creatives, artists, experts, and activits tied
              by our love of the planet.
            </Text>
            <Button
              as={Link}
              color="white"
              bg="rgb(164,191,217)"
              px="86px"
              py="18px"
              //target="_blank"
              href="/campaigns"
              _disabled={{
                pointerEvents: "none",
              }}
            >
              Browse Campaigns
            </Button>
          </Flex>
        </Box>
        <Faq faqs={faqs} />
      </Container>
    </>
  );
};

About.layout = "layout";

export default About;
