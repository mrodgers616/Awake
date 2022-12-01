import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import NextImage from './common/components/NextImage';
import {
  Heading, 
  Button, 
  Text, 
  Container,
  Flex,
  Image,
  Box,
  Link,
  Progress,
  ProgressLabel,
  Tooltip,
  Icon,
  AspectRatio,
 } from '@chakra-ui/react'
import { teamportfolio } from './common/data/AppModern';
import { useRouter } from "next/router";
import theme from '../theme'
import { FaTwitter,FaLinkedinIn } from "react-icons/fa";


const title = "HEllo is this on?"
const description = "zoinks scoob!"
const NewTeamSec = () => {
    const [hover, setHover] = useState({
      active: 6, // active item when start
    });

    const imgStyle = {
      width: "200px",
      height: "200px",
    }
  
    const router = useRouter();
    
    return (
        <ChakraProvider theme={theme}>
          <Flex justifyContent="space-between" alignItems="center" width="100%" mt={20}>
            <Heading 
              mr="10%" 
              as="h1"
              maxWidth={"800px"} 
              display="inline-block" 
              textAlign="center" 
              size="3xl"
              mx={"auto"}
              mt="20px"
              fontSize={{base: "20px", md: "6xl", lg: "6xl"}}
            >
                <u>The humans behind Awake</u> 
            </Heading>
          </Flex>
            <Box textAlign="center" ml="5%" mr="5%" mt="75px"  display={{ base: "none", sm: "none", md:"block", lg: "inline-block" }}>
            <Flex justifyContent="space-around" alignItems="center" width="100%" display={"flex"} flexWrap={"wrap"} mt={10} mb={20}>
              
          {/* ELLIOT  */}
              <Box
                maxWidth="20%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fme.jpeg?alt=media&token=89010be0-e08b-46d9-8832-e676d769b2a2"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={"1em"}>
                  Elliot Waxman
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".9em"}>
                  Co-Founder & CEO
                </Text>
                <Text fontSize={".7em"} mb={"5px"} mx={"2px"}>
                  Elliot has worked at the intersection of social impact and technology for years and was a member of KPMG's Innovation Lab before Awake. 
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/WaxmanElliot"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/WaxmanElliot"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>

        {/* MATTHEW   */}
              <Box
                maxWidth="20%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fmatthew.jpeg?alt=media&token=ebdc4431-4ad4-4238-903e-4c2eb0ba6ab1"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={"1em"}>
                  Matthew Rodgers
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".9em"}>
                  Co-Founder & CTO
                </Text>
                <Text fontSize={".7em"} mb={"5px"} mx={"2px"}>
                  Matthew brings years of software engineering experience coming from Amazon's EC2 Core Platform team. 
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/TheMattyBaby"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/matthew-rodgers-0bbab6178/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
          {/* MICHAEL */}
              <Box
                maxWidth="20%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fmichael.jpeg?alt=media&token=553c6a56-3001-4f7e-ba81-14cf737bcc6b"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={"1em"}>
                  Michael Levin
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".9em"}>
                  Shareholder Engagment Expert
                </Text>
                <Text fontSize={".7em"} mb={"5px"} mx={"2px"}>
                  Michael joined the Awake team with over 20 years experience in shareholder engagement.
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/activistinvestr"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/michaelrlevin/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
            {/* Johnny */}
              <Box
                maxWidth="20%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fjohnny.jpeg?alt=media&token=c0b7b884-db92-46c2-b77d-eaf7bc3a0dbc"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={"1em"}>
                  Johny Gabrielle
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".9em"}>
                  Brilliant Operator
                </Text>
                <Text fontSize={".7em"} mb={"5px"} mx={"2px"}>
                  Johny joins the Awake team while running a political consulting firm. He is skilled in digital marketing and 'making stuff happen'.
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/johnny-gabriele-8791a634/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
            {/* ELI */}
              <Box
                maxWidth="20%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FEli.jpeg?alt=media&token=356361de-3d6f-493b-8639-69e68796c8a9"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={"1em"}>
                  Eli Danziger
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".9em"}>
                  Technology Wiz
                </Text>
                <Text fontSize={".7em"} mb={"5px"} mx={"2px"}>
                  Eli joins Awake as with over a decade experience shipping digital products to millions of users at Google. 
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/elidanziger"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/elidanziger/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>

              <Box
                maxWidth="20%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fsigal.jpeg?alt=media&token=d0f1d9ee-7b8a-4e05-8d3a-cf37afe3fbfe"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={"1em"}>
                  Sigal Shemesh
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".9em"}>
                  Strategic Contributor
                </Text>
                <Text fontSize={".7em"} mb={"5px"} mx={"2px"}>
                  Sigal is a sustainability subject matter expert who leverages her strategic and operational skills for Awake. 
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/sigal-shemesh-9b714691/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
            </Flex>
          </Box>

          {/* START OF THE MOBILE CONTENT */}
          <Box textAlign="center" ml="5%" mr="5%" mt="20px"  display={{ base: "block", sm: "inline-block", md:"none", lg: "none" }}>
            <Flex justifyContent="space-around" alignItems="center" width="100%" display={"flex"} flexWrap={"wrap"} mt={10} mb={20}>
              
          {/* ELLIOT  */}
              <Box
                maxWidth="40%"
                minWidth="40%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fme.jpeg?alt=media&token=89010be0-e08b-46d9-8832-e676d769b2a2"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={".8em"}>
                  Elliot Waxman
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".6em"}>
                  Co-Founder & CEO
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/WaxmanElliot"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/WaxmanElliot"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>

        {/* MATTHEW   */}
              <Box
                maxWidth="40%"
                minWidth="40%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fmatthew.jpeg?alt=media&token=ebdc4431-4ad4-4238-903e-4c2eb0ba6ab1"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={".8em"}>
                  Matthew Rodgers
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".6em"}>
                  Co-Founder & CTO
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/TheMattyBaby"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/matthew-rodgers-0bbab6178/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
          {/* MICHAEL */}
              <Box
                maxWidth="40%"
                minWidth="40%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fmichael.jpeg?alt=media&token=553c6a56-3001-4f7e-ba81-14cf737bcc6b"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={".8em"}>
                  Michael Levin
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".6em"}>
                  Shareholder Engagment Expert
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/activistinvestr"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/michaelrlevin/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
            {/* Johnny */}
              <Box
                maxWidth="40%"
                minWidth="40%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fjohnny.jpeg?alt=media&token=c0b7b884-db92-46c2-b77d-eaf7bc3a0dbc"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={".8em"}>
                  Johny Gabrielle
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".6em"}>
                  Brilliant Operator
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/johnny-gabriele-8791a634/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
            {/* ELI */}
              <Box
                maxWidth="40%"
                minWidth="40%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FEli.jpeg?alt=media&token=356361de-3d6f-493b-8639-69e68796c8a9"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={".8em"}>
                  Eli Danziger
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".6em"}>
                  Technology Wiz
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://twitter.com/elidanziger"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaTwitter}
                    />
                  </Link>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/elidanziger/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>

              <Box
                maxWidth="40%"
                minWidth="40%"
                fontSize="xl"
                borderRadius={"20px"}
                borderColor={"gray.100"}
                borderWidth={"thin"}
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "100px", lg: "100px"}}
                  borderRadius="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fsigal.jpeg?alt=media&token=d0f1d9ee-7b8a-4e05-8d3a-cf37afe3fbfe"
                />
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="bold" fontSize={".8em"}>
                  Sigal Shemesh
                </Text>
                <Text ml="auto" mr="auto" textAlign="center" fontWeight="light" fontSize={".6em"}>
                  Strategic Contributor
                </Text>
                  <Link
                  w="48px"
                  h="48px"
                  href= "https://www.linkedin.com/in/sigal-shemesh-9b714691/"
                  background="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                  p="8px"
                  >
                    <Icon
                      w={5}
                      h={5}
                      _hover={{ color: "purple" }}
                      as={FaLinkedinIn}
                    />
                  </Link>
              </Box>
            </Flex>
          </Box>
        </ChakraProvider>
    );
  };
  
  export default NewTeamSec;
  