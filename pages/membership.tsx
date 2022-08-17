import type { NextPage } from "next";
import Head from "next/head";
import {
  Container,
  Heading,
  Box,
  Flex,
  Image,
  Button,
  Icon,
  Text,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  chakra,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { memberTypes } from "../lib/mock-data";

const Membership: NextPage = () => {
  return (
    <>
      <Head>
        <title>Awake | Proposals</title>
      </Head>
      <Box
        bg="sage.500"
        mt="120px"
        bgImage="url(https://images.unsplash.com/photo-1602163699155-603b68af0d0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwbGFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60)"
        bgSize="cover"
        zIndex={0}
      >
        <Container width="100%" h="600px" overflow="auto" marginX="auto">
          <Flex
            justifyContent="center"
            alignItems="center"
            h="calc(100% - 120px)"
          >
            <Heading color="white" textAlign="center" fontSize="64px">
              Become a Member
            </Heading>
          </Flex>
        </Container>
      </Box>
      <Box title="page-content">
        <Container width="100%">
          <Flex
            title="page-cta"
            bg="sage.500"
            w="100%"
            h="200px"
            mt="-150px"
            zIndex={1000}
            borderRadius="20px"
            alignItems="center"
            justifyContent="space-between"
            color="white"
            p="64px"
            mb="120px"
          >
            <Heading fontSize="36px" w="60%">
              There are many ways to get involved. Find the path that works for
              you.
            </Heading>
          </Flex>
          <Flex title="membership-types" flexDir={"column"} mb="120px">
            <Heading mb="32px" textTransform={"uppercase"} fontSize={"24px"}>
              Which one are you most like?
            </Heading>
            <Flex justifyContent={"space-between"}>
              {memberTypes.map(({ src, title, description }, index) => (
                <Flex
                  key={index}
                  flexDir="column"
                  p="16px"
                  bg="sage.500"
                  borderRadius="20px"
                  color="white"
                  maxW="30%"
                >
                  <Image src={src} alt={`Artwork of ${title}`} />
                  <Heading mt="4px" mb="8px">
                    {title}
                  </Heading>
                  <Text mb="36px">{description}</Text>
                  <Button
                    borderRadius="18px"
                    color="white"
                    bg="seafoam.500"
                    w="55%"
                    justifyContent={"space-between"}
                    textAlign={"left"}
                    mb="16px"
                    fontWeight="normal"
                  >
                    That&apos;s Me <Icon as={FaArrowRight} />
                  </Button>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box
        w="100%"
        bgImage="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        bgSize="cover"
      >
        <Container>
          <Flex
            h="1200px"
            w="100%"
            flexDir="column"
            color="white"
            alignItems="center"
            justifyContent="center"
            mb="8px"
          >
            <Image
              src="illustrations/Awake Logo dark.png"
              alt="Awake Logo Dark"
            />
            <Heading
              color="white"
              fontSize="36px"
              mb="100px"
              textAlign="center"
              fontWeight="normal"
            >
              A decentralized activist network focued on climate change
              mitigation.
            </Heading>
            <Text textAlign="center" mb="64px">
              Add your email to sign up for our new newletter.
            </Text>
            <chakra.form w="33%">
              <Flex alignItems="center">
                <FormControl>
                  <FormLabel m="0" mr="8px">
                    <Input
                      bg="white"
                      borderRadius="0"
                      h="64px"
                      id="email"
                      type="email"
                      placeholder="Email Address"
                    />
                  </FormLabel>
                  <FormErrorMessage>from input required</FormErrorMessage>
                </FormControl>
                <Button
                  bg="white"
                  color="black"
                  borderRadius="0"
                  p="32px 48px"
                  type="submit"
                >
                  Add me
                </Button>
              </Flex>
            </chakra.form>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Membership;
