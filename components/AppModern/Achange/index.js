import React from 'react'
import {
  ChakraProvider,
  Container,
  Flex,
  Box,
  Link,
  Highlight,
  Image,
  Text,
  Heading
} from '@chakra-ui/react'
// import { motion, useAnimation, easeIn } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useEffect } from "react";

// const boxVariant = {
//   visible: { opacity: 1, scale: 1, transition: { duration: 2, easeIn } },
//   hidden: { opacity: 0, scale: 0 }
// };

// const boxVariant2 = {
//   visible: { opacity: 1, scale: 1, transition: { duration: 2, easeIn } },
//   hidden: { opacity: 0, scale: 0 }
// };

// const boxVariant3 = {
//   visible: { opacity: 1, scale: 1, transition: { duration: 2, easeIn } },
//   hidden: { opacity: 0, scale: 0 }
// };

// const boxVariant4 = {
//   visible: { opacity: 1, scale: 1, transition: { duration: 2, easeIn } },
//   hidden: { opacity: 0, scale: 0 }
// };

const NewContent = () => {

  // const control = useAnimation();
  // const [ref, inView] = useInView();

  // const control2 = useAnimation();
  // const [ref2, inView2] = useInView();

  // const control3 = useAnimation();
  // const [ref3, inView3] = useInView();

  // const control4 = useAnimation();
  // const [ref4, inView4] = useInView();

  // useEffect(() => {
  //   if (inView) {
  //     control.start("visible");
  //   }

  //   if (inView2) {
  //     control2.start("visible");
  //   }

  //   if (inView3) {
  //     control3.start("visible");
  //   }

  //   if (inView4) {
  //     control4.start("visible");
  //   }
  // }, [control, inView, control2, inView2, control3, inView3, control4, inView4]);

  return (

  <ChakraProvider resetCSS>
      <Flex justifyContent="space-between" alignItems="center" width="100%" mt={"80px"}>
        <Image
          //height={{base: "15px", base: "400px", base: "400px"}}
          width={{base: "150px", md: "450px", lg: "500px"}}
          alt="group of investors"
          // width="400px"
          display="inline-block"
          // minWidth={{base: "15px", base: "100px", base: "100px"}}
          // minHeight={{base: "15px", base: "100px", base: "100px"}}
          ml={{base: "3%", md: "10%", lg: "10%"}}
          mr={{base: "3%", md: "0px", lg: "0px"}}
          src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FFriends.png?alt=media&token=7db49963-3527-4ce9-a2a6-079a096d6566"
        />
        <Heading 
          mr={{base: "5%", md: "10%", lg: "10%"}}
          as="h1"
          maxWidth={"600px"} 
          display="inline-block" 
          textAlign="right" 
          size="2xl"
          fontSize={{base: "20px", md: "5xl", lg: "5xl"}}
        >
          <Highlight
            query='profit AND purpose.'
            styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
            >
            Join a community of like-minded investors in profit AND purpose.
          </Highlight>
        </Heading>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" width="100%" mt={20}>
      <Heading 
          ml={{base: "3%", md: "10%", lg: "10%"}}
          mr={{base: "3%", md: "0px", lg: "0px"}}
          as="h1"
          maxWidth={"600px"} 
          display="inline-block" 
          textAlign="left" 
          size="2xl"
          fontSize={{base: "20px", md: "5xl", lg: "5xl"}}
        ><Highlight
        query='change.'
        styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
      >
        Vote on campaigns for companies in your portfolio to change.
      </Highlight>
          
        </Heading>
        <Image
          boxSize={{base: "150px", md: "400px", lg: "400px"}}
          alt="a picture of an apple campaign on the platform"
          // height="400px"
          // width="400px"
          display="inline-block"
          // minWidth="100px"
          // minHeight="100px"
          mr={{base: "5%", md: "10%", lg: "10%"}}
          src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGroup%20366.png?alt=media&token=5be820fa-fa97-470f-9cca-0fa936e076dc"
        />
      </Flex>
      

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
          <Highlight
            query='real impact'
            styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
          >
            Join forces with other investors to have real impact
          </Highlight>
        </Heading>
      </Flex>

      <Box textAlign="center" ml="5%" mr="5%" mt="75px">
      <Flex justifyContent="space-around" alignItems="center" width="100%" mt={20}>
              <Box
                width="25%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='lock'
                  boxSize={{base: "50px", md: "150px", lg: "150px"}}
                  // height="150px"
                  // width="125px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Flock.png?alt=media&token=1515b250-2374-4d95-85be-26d91fc95f43"
                />
                <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "30px"}}>
                  Link your Broker
                </Text>
                <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                  In order to prove you own shares, we ask that you link your broker after making an account.
                </Text>
              </Box>
              <Box
                width="25%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='papers'
                  boxSize={{base: "50px", md: "150px", lg: "150px"}}
                  // height="150px"
                  // width="100px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Green%20Papers.png?alt=media&token=7c813e0b-964c-4b78-81cf-4e9a35d97e6b"
                />
                <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "30px"}}>
                   Sign a Petition
                </Text>
                <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                  Sign a petition for a company in your portfolio to take action on an issue you care about. 
                </Text>
              </Box>
              <Box
                width="25%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='megaphone'
                  boxSize={{base: "50px", md: "150px", lg: "150px"}}
                  // height="150px"
                  // width="150px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Megaphone.png?alt=media&token=d71c6a33-e24b-406c-b99e-487f5360932a"
                />
                <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold" fontSize={{base: "12px", md: "30px", lg: "30px"}}>
                  We Do the Rest
                </Text>
                <Text fontSize={{base: "xs", md: "md", lg: "md"}}>
                  We&#39;ll advocate for change at the target companies on behalf of you and other investors.
                </Text>
              </Box>
            </Flex>
          </Box>
  </ChakraProvider>
)}

export default NewContent