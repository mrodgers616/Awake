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
  Link,
  Icon,
  Box,
  Tooltip,
  Stack,
  Text
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
import ProposalCard from "../../components/ProposalCard";
import { getAllProposals } from "../../lib/firebaseClient";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { forEach } from "lodash";

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
        <title>Awake | Proposals</title>
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
          h="300px"
          overflow="auto"
          marginX="auto"
          zIndex={200}
        >
          <Flex justifyContent="center" alignItems="center" h="100%" paddingTop="80px">
            <Stack>
              <Heading color="white" textAlign="center" fontSize={{ base: "2em", lg: "3em" }}>
                <Text fontSize='3xl'>
                  Vote With Your Investments
                </Text>
              </Heading>

              <Button
                color="white"
                // bg="rgb(100, 43, 115)"
                bg="#000000"
                as={Link}
                // href={userid ? "campaigns/" : "/login"}
                p="32px 64px"
                borderRadius="16px"
                fontSize="1.3em"
                // Enabling Button regardless of connect wallet status------------------------
                // disabled={!isConnected || !hasEnoughBalance}
                _hover={{
                  textDecoration: "none",
                }}
                // _disabled={{
                //   pointerEvents: 'none'
                // }}
                disabled={true}
              >
                Featured Campaign (Coming Soon)
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Box>
      <Box title="page-content" position="relative" zIndex={0}>
        <Container width="100%" mt="2%">
          {/* <Flex
            title=""
            bg="#08152E"
            w="100%"
            h={{
              base: "fit-content",
              md: '200px'
            }}
            mt="-100px"
            borderRadius="20px"
            alignItems="center"
            justifyContent="space-between"
            color="white"
            p={{ base: "28px", sm: "28px", lg: "64px" }}
            mb={{ base: "40px", sm: "40px", lg: "80px" }}
            flexDirection={{
              base: 'column',
              md: 'row'
            }}
          >
            <Heading
              fontSize={{
                base: "22px",
                sm: "22px",
                lg: "36px"
              }}
              mb={{
                base: '16px',
                md: '0px'
              }}
              textAlign={{
                base: 'center',
                md: 'left'
              }}
            >
              Check out our featured campaign
            </Heading>
            <Tooltip
            // label={ !isConnected ? 'Connect to Metamask' : !hasEnoughBalance ? 'You do not have enough CLIMATE tokens.' : 'Create a new campaign'}
            // shouldWrapChildren
            >
            </Tooltip> 
          </Flex> */}


          {/* ADD BACK AFTER THE FIRST CAMPAIGN IS DECIDED */}

          {/* <Box title="">
            <Flex title="" justifyContent="space-between">
              <Heading mb={{ base: "40px", sm: "40px", lg: "64px" }}>Proposals</Heading>
            </Flex>
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
              <Flex justifyContent="flex-end" mb="120px">
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
          </Box> */}
        </Container>
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
