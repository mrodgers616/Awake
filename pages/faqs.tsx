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
      <Container>
        <Box title="values" my={{ base: "60px", sm: "60px", lg: "120px" }}>

          <Flex
            borderRadius="16px"
            flexDir="column"
            mb="64px"
            color="black"
            // bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
            p={{ base: "32px", sm: "32px", lg: "64px" }}
            h={{ base: "fit-content", lg: "400px" }}
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
            width={"80%"}
            mx={"auto"}
          >
            <Heading zIndex={250} fontFamily={{ base: "28px", sm: "28px", lg: "2em" }} mb="2%">
              Mission
            </Heading>
            <Text zIndex={250} fontSize={{ base: "16px", sm: "16px", lg: "1em" }}>
              Our mission is to empower everyday investors to have their voices heard at the companies they own. Whether you own stock through a brokerage, a pension or a 401k, you should have a say. For too long, everyday shareholders have sat on the sidelines while the real decisions were being made behind closed doors. We are building a world where the actions of the most influential corporations are directed by us, the people who own them.
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
          {/*<Flex
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
          </Flex>*/}
        </Box>
        <Faq faqs={faqs} />
      </Container>
    </>
  );
};

About.layout = "layout";

export default About;
