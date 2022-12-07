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
  Stack,
  chakra,
  useColorModeValue,
  Skeleton,
  TextProps
} from "@chakra-ui/react";
import Faq from "../components/Faq";
import { FaArrowRight } from "react-icons/fa";
import faqs from "../data/faqs.json";
import type { NextPageWithLayout } from './_app'
import { useEffect, PropsWithChildren } from "react";
import * as FullStory from '@fullstory/browser';


const About: NextPageWithLayout = () => {

  function DottedBox() {
    return (
      <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
        <svg
          color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
          width="350"
          height="420"
          fill="none"
        >
          <defs>
            <pattern
              id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
        </svg>
      </Box>
    );
  }

  const Content = ({ children, ...props }: PropsWithChildren<TextProps>) => {
    return (
      <Text
        fontSize="md"
        textAlign="left"
        lineHeight="1.375"
        fontWeight="400"
        color="gray.500"
        {...props}
      >
        {children}
      </Text>
    );
  };

  useEffect(() => {
    FullStory.init({ orgId: 'o-1FCF9K-na1' });


    
  }, []);
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
            <Container maxW="6xl" px={{ base: 6, md: 3 }} py={14} mt="10%">
              <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center">
                <Box mr={{ base: 0, md: 5 }} pos="relative">
                  <DottedBox />
                  <Image
                    boxShadow="lg"
                    w="100%"
                    h="100%"
                    minW={{ base: 'auto', md: '30rem' }}
                    maxH="20rem"
                    objectFit="cover"
                    src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80`}
                    rounded="md"
                    fallback={<Skeleton />}
                    alt="mission image"
                  />
                </Box>
                <Stack direction="column" spacing={6} justifyContent="center">
                  <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
                    On a mission to empower Front end developers
                  </chakra.h1>
                  <Box>
                    <Content>
                      Building products is hard. We&apos;ve built our fair share and we&apos;ve noticed the problems
                      you always run into.
                    </Content>
                    <Content mt={4}>
                      TemplatesKart provides the best ChakraUI templates. Now you can focus on your
                      business, not on the boilerplate.
                    </Content>
                    <Content mt={4}>
                      You want to build a product and we want to help you. Building products has changed our
                      lives in ways we couldn&apos;t imagine and we want to help you achieve that success too.
                    </Content>
                  </Box>
                  <Link href="#" fontSize="sm" color="blue.400">
                    See how people are using our components →
                  </Link>
                </Stack>
              </Stack>
            </Container>
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
