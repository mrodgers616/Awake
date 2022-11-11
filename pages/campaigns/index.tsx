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
  Text,
  Center
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
          >
            <Heading fontFamily={{ base: "28px", sm: "28px", lg: "3em" }} mb="2%" zIndex={1000}>
              Vision
            </Heading>
            <video autoPlay loop muted width={"100%"}>
                <source src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/campaignHub%204K.mp4?alt=media&token=fcca6944-d693-49ea-ba63-5963ec721672" type="video/mp4"/>
          </video>
          <Center>
            <Container zIndex="9000" mt="-350px" mb="250px" >
              <Center>
                <Heading size="2xl">Change this text</Heading>
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
        
      <Box title="page-content" position="relative" zIndex={0}>
        <Container width="100%" mt="2%"> 

          <Box title="">
            <Flex title="" justifyContent="space-between">
              <Heading mb={{ base: "40px", sm: "40px", lg: "64px" }}>Campaigns</Heading>
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
          </Box>
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
