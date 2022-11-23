import type { NextPage, GetServerSidePropsContext } from "next";
import Head from "next/head";
import {
  ButtonProps,
  Container,
  GridItem,
  Heading,
  Button,
  Grid,
  Flex,
  Image,
  Highlight,
  Link,
  Icon,
  Box,
  Tooltip,
  Stack,
  Text,
  Center,
  Divider
} from "@chakra-ui/react";
import {
  Pagination as Paginator,
  PaginationContainer as PaginatorContainer,
  PaginationPrevious as Previous,
  usePagination as usePaginator,
  PaginationNext as Next,
  PaginationPageGroup as PageGroup,
} from "@ajna/pagination";
import { useState, useEffect, useMemo } from "react";
// import {Player} from 'video-react';
import ProposalCard from "../../components/ProposalCard";
import { getAllProposals } from "../../lib/firebaseClient";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { forEach } from "lodash";
import Newsletter from "../../components/AppModern/Newsletter";
import Testimonial from "../../components/AppModern/Testimonial";
import NewContent from "../../components/AppModern/Achange";
// import DemoFootage from "../../pages/campaigns/assets/DemoFootage.mp4";


type Props = {
  campaigns: any;
  treasury: any;
};

const Campaigns: NextPage<Props> = ({ campaigns, treasury: test }) => {
  /**
   * display the form to create proposals.
   */
  const [proposals, setProposals] = useState(campaigns);
  const [totalProposals, setTotalProposals] = useState(0);

  const { userid } = useAuth();

  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: "sm",
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      color: "blue.500",
    },
    bg: "transparent",
    color: "blue.500",
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      color: "blue.500",
    },
    bg: "transparent",
    color: "blue.500",
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: "green.200",
  };

  const { pagesCount, offset, currentPage, setCurrentPage, pageSize } =
    usePaginator({
      total: totalProposals,
      initialState: {
        pageSize: 3,
        isDisabled: false,
        currentPage: 1,
      },
    });


  const PaginatorProps = {
    pagesCount: pagesCount,
    currentPage: currentPage,
    onPageChange: setCurrentPage,
    activeStyles: activeStyles,
    normalStyles: normalStyles,
    separatorStyles: separatorStyles
  }

  useEffect(() => {
    let verifiedCampaigns = [];
    for (let i = 0; i < campaigns.length; i++) {
      if (campaigns[i].verified) {
        verifiedCampaigns.push(campaigns[i])
      }
      else {
        continue;
      }
    }
    setProposals(verifiedCampaigns.slice(offset, offset + pageSize));
    setTotalProposals(campaigns.length);
  }, [currentPage, pageSize, offset]);

  return (
    <>
      <Head>
        <title>Awake | Campaigns</title>
      </Head>
      <Flex
            flexDir="column"
            color="white"
            bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
            p={{ base: "0px", sm: "0px", lg: "0px" }}
            h={{ base: "fit-content", lg: "fit-content" }}
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
            display={{base:"none", sm:"none", md:"inline-block", lg:"inline-block"}}
          >
            <video autoPlay loop muted width={"100%"}>
                <source src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/campaignHub%204K.mp4?alt=media&token=fcca6944-d693-49ea-ba63-5963ec721672" type="video/mp4"/>
            </video>
                <Center>
                  <Container zIndex={{base: "9000", md: "9000", lg: "9000"}} mt={{base: "-90px", md: "-350px", lg: "-600px"}} mb={{base: "50px", md: "250px", lg: "0"}} >
                    <Center>
                      <Text fontSize="3em" mt="20%">By joining forces, we can demand change at the companies we own. Make history with us.</Text>
                    </Center>
                  </Container>
                </Center>
              <Box
                bg="rgba(0,0,0,.7)"
                position="absolute"
                w="100%"
                h="100%"
                top="0"
                left="0"
                zIndex={0}
              />
          </Flex>
        {/* TRYING TO GET THE MOBILE VIEW FOR BANNER       */}
        <Flex
            flexDir="column"
            color="white"
            bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
            p={{ base: "0px", sm: "0px", lg: "0px" }}
            h={{ base: "fit-content", lg: "fit-content" }}
            justifyContent={"center"}
            bgPosition={"center"}
            position="relative"
            display={{base:"inline-block", sm:"inline-block", md:"none", lg:"none"}}
          >
            <video autoPlay loop muted width={"100%"}>
                <source src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/d67b3e2f-0d36-4e06-9b48-01e788b6d081.mp4?alt=media&token=d4da57fc-1d04-445a-9ddb-c55094125a20" type="video/mp4"/>
            </video>
                <Center>
                  <Container zIndex={{base: "9000", md: "9000", lg: "9000"}} mt={{base: "-600px", md: "-350px", lg: "-600px"}} mb={{base: "50px", md: "250px", lg: "0"}} >
                    <Center>
                      <Heading size="xl">By joining forces as shareholders we can demand change at the companies we own. Make history with us.</Heading>
                    </Center>
                  </Container>
                </Center>
              <Box
                bg="rgba(0,0,0,.7)"
                position="absolute"
                w="100%"
                h="100%"
                top="0"
                left="0"
                zIndex={0}
              />
          </Flex>
      <Newsletter></Newsletter>
        
      <Box title="page-content" position="relative" zIndex={0}>
        <Container width="100%" mt="8%"> 

          <Box title="">
            <Grid
              title=""
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={4}
            >

              {proposals.map((proposal: any, index: number) => {
                const styles = {
                  borderRadius: "16px",
                  padding: "16px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  mx: "0px",
                  mb: "16px",
                  w: "100%",
                  h: "100%",
                };

                return (
                  <GridItem key={index}>
                    <ProposalCard
                      image="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      {...proposal}
                      {...styles}
                    />
                  </GridItem>
                );
              })}
            </Grid>
            <Paginator {...PaginatorProps}>
              <Flex justifyContent="flex-end" mb="60px">
                <PaginatorContainer
                  justify="space-between"
                  w="fit-content"
                  p={4}
                >
                  <Previous
                    bg="transparent"
                    _hover={{
                      bg: "transparent",
                      color: "blue",
                    }}
                  >
                    <Icon as={FiChevronLeft} />
                  </Previous>
                  <PageGroup isInline align="center" />
                  <Next
                    bg="transparent"
                    _hover={{
                      bg: "transparent",
                      color: "blue",
                    }}
                  >
                    <Icon as={FiChevronRight} />
                  </Next>
                </PaginatorContainer>
              </Flex>
            </Paginator>
          </Box>
        </Container>
        <Box textAlign="center" ml="5%" mr="5%" mt="0px" mb="40px" display={{ base: "none", sm: "none", md:"block", lg: "block" }}>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Heading 
            mr="10%" 
            maxWidth={"800px"} 
            display="inline-block" 
            textAlign="center" 
            mx={"auto"}
            fontSize={{base: "xl", md: "2xl", lg: "5xl"}}
          >
            <Highlight
              query='real impact'
              styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
            >
              Join forces with other investors to have real impact
            </Highlight>
          </Heading>
        </Flex>
        <Flex justifyContent="space-around" alignItems="center" width="100%" mt={20}>
              <Box
                width="28%"
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
                width="28%"
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
                width="28%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  alt='megaphone'
                  boxSize={{base: "50px", md: "150px", lg: "150px"}}
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
          {/* EXPERIMENTING WITH SWIPER HERE */}
          <Container display={{ base: "block", sm: "block", md:"none", lg: "none" }}>
                 <Testimonial ></Testimonial>
          </Container>
          
          <Flex
            w="80%"
            mx="10%"
            my="32px"
            bg='#08152E'
            height={{
              base: 'fit-content',
              lg: "175px"
            }}
            borderRadius="16px"
            justifyContent="center"
            alignItems="center"
            boxShadow="4px 4px 62px -9px rgba(0, 0, 0, 0.15)"
            zIndex={500}
            flexDir={{
              base: "column",
              md: "row"
            }}
          >
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexBasis="50%"
            borderRight={{
              base: 'none',
              md: "1px solid #eaeaea"
            }}
            flexDirection={{
              base: 'row',
              sm: "row",
              lg: 'row'
            }}
            m='16px'
          >
            <Box color="white" p={{ base: '6', lg: "16px 24px" }}>
            <Stack>
              <Flex
                position="relative"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                width={{base: 284, md: 400, lg: 400}}
                backgroundColor="FFFFFF"
                boxShadow='2xl' p='0'
                borderRadius="16px"
                mt='auto'
                mb="auto"
                ml="auto"
                mr='auto'
                border="0px solid gray"
                
              >
                
                <Text fontSize="xl" fontWeight="bold" mb={0} mt={4}>
                  {"Have an issue you care about not listed above? Create your own campaign to hold corporations to a higher standard."}
                </Text>
                <Flex justifyContent="center" alignItems="space-around" width={48}>
                  <Box>
                    <Flex alignItems={"center"} justifyContent={"flex-start"}>
                      
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Stack>
            </Box>
          </Flex>
          <Flex
            h="100%"
            flexBasis={"50%"}
            justifyContent="center"
            alignItems="center"
          >
            
              <Button
                as={Link}
                href="create"
                bg="rgb(100, 43, 115)"
                color="white"
                borderRadius="3xl"
                fontSize="1.4em"
                w={{ lg: "fit-content" }}
                mr={{
                  base: "0px", sm: "0", lg: "16px"
                }}
                mb={{
                  base: '32px',
                  md: '0'
                }}
                h="64px"
              >
                Create Your Own 
              </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {

  let campaigns: any[] = [];
  try {
    const data = await getAllProposals();

    // fetch all campaigns
    data.forEach((datum: any) => {
      campaigns.push({
        id: datum.id,
        ...datum.data(),
      });
    });
  } catch (error) {
    console.error(error);
  }

  // normalize data. May not need this in the future.
  campaigns.forEach((campaign: any) => {
    if (campaign.createdAt instanceof Timestamp) {
      campaign.createdAt = new Date(campaign.createdAt.seconds).toString();
    }
    if (campaign.deadline instanceof Timestamp) {
      campaign.deadline = new Date(campaign.deadline.seconds).toString();
    }
  });

  return {
    props: {
      campaigns,
    },
  };
}

export default Campaigns;
