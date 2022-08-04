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
  Tooltip
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
import LatestArticles from "../../components/LatestArticles";
import LeaderboardTable from "../../components/LeaderboardTable";
import { useWeb3 } from "../../contexts/Web3Context";
import { getAllProposals } from "../../lib/firebaseClient";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Timestamp } from "firebase/firestore";
import supporters from '../../data/supporters.json';
import articles from '../../data/articles.json';
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { NextPageWithLayout } from "../../lib/types/next";
import Router from "next/router";

type Props = {
  campaigns: any;
  treasury: any;
};

const Campaigns: NextPageWithLayout<Props> = ({ campaigns, treasury: test }) => {
  /**
   * display the form to create proposals.
   */
  const { walletAddress, isConnected, hasEnoughBalance } = useWeb3();
  const [proposals, setProposals] = useState(campaigns);
  const [totalProposals, setTotalProposals] = useState(0);
  const [treasuryBalance, setTreasuryBalance] = useState(0);

  const { userid } = useAuth();

  const supporterColumns = useMemo((): any => [
    {
      Header: 'Address',
      accessor: 'address'
    }, {
      Header: 'Campaigns Supported',
      accessor: 'campaignsSupported',
    }
  ], [])

  /*
  const tData = useMemo((): any => {
    if (test === null) return [];
    const [entries] = Object.entries(test);
    const [value] = (entries[1] as any).products;

    const totalBalance = value.assets.map((item: any) => item.balance).reduce((a: any, b: any) => a + b, 0);
    setTreasuryBalance(totalBalance);

    const percentOfHoldings = value.assets.map((item: any) => (item.balance /totalBalance) * 100);

    for (const asset of value.assets) {
      asset.percentage = percentOfHoldings.shift();
    }
    
    return value.assets;
  }, []);
  */

  const supporterData = useMemo((): any => [...supporters], []);
  
  const treasuryColumns = useMemo((): any => [{
    Header: 'Market',
    accessor: 'symbol'
  }, {
    Header: '% of Holdings',
    accessor: 'percentage',
    Cell: ({ value }: any) => <Box>{ value.toFixed(3) }%</Box>
  }, {
    Header: 'Balance',
    accessor: 'balance',
    Cell: ({ value }: any) => <Box>{ value.toFixed(3) }</Box>
  }, {
    Header: 'Total Value',
    accessor: 'balanceUSD',
    Cell: ({ value }: any) => <Box>${ value.toFixed(2) }</Box>,
    Footer: () => <Box fontWeight={800}>${treasuryBalance.toFixed(2)}</Box>
  }], []);

  const treasuryBoardStyles = {
    titleStyles: {
      fontSize: '24px',
      bg: 'sage.500',
      color: "white",
      pl: '24px',
      pt: '24px',
      pb: '24px'
    },
    containerStyles: {
      borderRadius: '8px',
      overflow: 'hidden',
      mb: '120px'
    },
    headerStyles: {
      bg: 'transparent',
    },
    thStyles: {
      bg: 'sage.500',
      color:'white',
    },
    tdStyles: {
      borderBottom: 'none',
      h: '86px'
    },
    trStyles: {
      bg: 'transparent',
      border: 'none'
    }
  }
  
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
        pageSize: 9,
        isDisabled: false,
        currentPage: 1,
      },
    });

  
  const PaginatorProps = {
    pagesCount: pagesCount,
    currentPage: currentPage,
    onPageChange: setCurrentPage,
    activeStyles: activeStyles ,
    normalStyles: normalStyles,
    separatorStyles: separatorStyles
  }

  useEffect(() => {
    setProposals(campaigns.slice(offset, offset + pageSize));
    setTotalProposals(campaigns.length);
  }, []);

  useEffect(() => {
    setProposals(campaigns.slice(offset, offset + pageSize));
    setTotalProposals(campaigns.length);
  }, [currentPage, pageSize, offset]);

  return (
    <>
      <Head>
        <title>Climate DAO | Proposals</title>
      </Head>
      <Box
        bg="sage.500"
        mt="120px"
        bgGradient="linear-gradient(sage.500, seafoam.500)"
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
          h="400px"
          overflow="auto"
          marginX="auto"
          zIndex={200}
        >
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Heading color="white" textAlign="center" fontSize="64px">
              Back a Campaign for Corporate Action
            </Heading>
          </Flex>
        </Container>
      </Box>
      <Box title="page-content" position="relative" zIndex={0}>
        <Container width="100%">
          <Flex
            title="page-cta"
            bg="sage.500"
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
            p="64px"
            mb="80px"
            flexDirection={{
              base: 'column',
              md: 'row'
            }}
          >
            <Heading
              fontSize="36px"
              mb={{ 
                base: '32px',
                md: '0px' 
              }}
              textAlign={{
                base: 'center',
                md: 'left'
              }}
            >
              Want to create your own movement and campaign?
            </Heading>
            <Tooltip
              // label={ !isConnected ? 'Connect to Metamask' : !hasEnoughBalance ? 'You do not have enough CLIMATE tokens.' : 'Create a new campaign'}
              // shouldWrapChildren
            >
              <Button
                color="white"
                bg="seafoam.500"
                as={Link}
                href={userid ? "campaigns/create" : "/login"}
                p="32px 64px"
                borderRadius="16px"
                fontSize="1.3em"
// Enabling Button regardless of connect wallet status------------------------
                // disabled={!isConnected || !hasEnoughBalance}
                _hover={{
                  textDecoration: "none",
                }}
                _disabled={{
                  pointerEvents: 'none'
                }}
              >
                Create Proposal
              </Button>
            </Tooltip>
          </Flex>
          <Box title="proposals-list">
            <Flex title="proposals-list-header" justifyContent="space-between">
              <Heading mb="64px">Proposals</Heading>
              {/* <Flex w="33%" mb="36px">
                <Select
                  placeholder="Filter By"
                  mr="16px"
                  bg="seafoam.500"
                  color="white"
                  borderRadius="20px"
                  fontSize="24px"
                >
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
                </Select>
                <Select
                  placeholder="Sort By"
                  mr="16px"
                  bg="seafoam.500"
                  color="white"
                  borderRadius="20px"
                  fontSize="24px"
                >
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
                </Select>
              </Flex> */}
            </Flex>
            <Grid
              title="proposals-list-content"
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
                  mx: "8px",
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
                      {...{ isConnected }}
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
          {/* <LeaderboardTable
            data={supporterData}
            columns={supporterColumns} 
            title='Leaderboard'
            sortBy='campaignsSupported'
            {...treasuryBoardStyles}
          />  */}
          {/* <LeaderboardTable
            data={tData}
            columns={treasuryColumns} 
            title='Treasury'
            sortBy='total_value'
            {...treasuryBoardStyles}
          />  */}

          <Box title="latest news">
            <LatestArticles
              title="Latest News"
              climateDAOArticles={articles}
            />
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

  /*
  const options = {
    method: "GET",
    url: `https://api.zapper.fi/v1/protocols/tokens/balances?addresses[]=${process.env.NEXT_PUBLIC_GNOSIS_VAULT_ADDRESS}&api_key=${process.env.NEXT_PUBLIC_ZAPPER_API_KEY}`,
  };

  let treasuryInfo;

  try {

    treasuryInfo = (await axios.request(options as any)).data;
  
  
    return {
      props: {
        campaigns,
        treasury: treasuryInfo,
      },
    };
  } catch (err) {
    console.error(err as any);
    treasuryInfo = null;
  }
  */

  return {
    props: {
      campaigns,
      //treasury: treasuryInfo,
    },
  };
}

export default Campaigns;
