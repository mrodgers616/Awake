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
        <title>Awake | FAQs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container>
        <Box title="values" my={{ base: "60px", sm: "60px", lg: "120px" }}>
          <Flex
            flexDir="column"
            mb={{base:"24px",sm:"24px", lg:"64px"}}
            color="black"
            p={{ base: "0px", sm: "0px", lg: "64px" }}
            h={{ base: "fit-content", lg: "400px" }}
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
            width={"80%"}
            mx={"auto"}
          >
            <Container maxW="6xl" px={{ base: 0, md: 3 }} mt="10%">
              <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center">
                <Box mr={{ base: 0, md: 5 }} pos="relative">
                  <DottedBox />
                  <Image
                    backgroundColor="white"
                    w="100%"
                    h="100%"
                    minW={{ base: 'auto', md: '30rem' }}
                    maxH="20rem"
                    objectFit="cover"
                    src={`https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FFriends%20(1).png?alt=media&token=bccfb534-7455-4ea3-be92-e94f7c915611`}
                    rounded="md"
                    fallback={<Skeleton />}
                    alt="mission image"
                  />
                </Box>
                <Stack direction="column" spacing={6} justifyContent="center">
                  <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
                    Our Mission
                  </chakra.h1>
                  <Box>
                    <Content>
                    Our mission is to empower everyday investors to have their voices heard at the companies they own. 
                    Whether you own stock through a brokerage, a pension or a 401k, you should have a say. 
                    For too long, everyday shareholders have sat on the sidelines while the real decisions were being made behind closed doors. 
                    </Content>
                    <Content mt={4}>
                    We are building a world where the actions of the most influential corporations are directed by us, the people who own them.
                    </Content>
                  </Box>
                </Stack>
              </Stack>
            </Container>
          </Flex>
        </Box>
        <Faq faqs={faqs} />
      </Container>
    </>
  );
};

About.layout = "layout";

export default About;
