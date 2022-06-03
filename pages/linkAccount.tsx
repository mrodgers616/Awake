import type { NextPage, GetServerSidePropsContext } from "next";
import React from 'react';
import Head from "next/head";
import { Configuration, LinkTokenCreateRequest, PlaidApi, PlaidEnvironments, InvestmentsHoldingsGetResponse } from 'plaid';
import {
  PlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
} from 'react-plaid-link';
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
  ChakraProvider,
  Stack
} from "@chakra-ui/react";
import { admin } from '../lib/firebaseAdmin';
import { getProfileData, updateOrAddProfileData} from "../lib/firebaseClient";
import {parseCookies} from 'nookies';
import { getServerSideProps } from ".";
import { profile } from "console";

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  });
  
const plaidClient = new PlaidApi(configuration);
const plaidProducts = (process.env.PLAID_PRODUCTS || 'investments').split(',',);
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',',);

const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: 'user-id',
    },
    client_name: 'Plaid Test App',
    // @ts-ignore
    products: plaidProducts,
    // @ts-ignore
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
    redirect_uri: '',
};

async function linkPlaid() {
  console.log("here");
    try {
        const response = await plaidClient.linkTokenCreate(request);
        const linkToken = response.data.link_token;
        console.log(linkToken);
      } catch (error) {
       console.log(error);
      }
}

interface Props {}
interface State {
  token: null;
  uid: null;
  isPlaidConnectedBefore: null;
}

interface InvestmentsDataItem {
  mask: string;
  quantity: string;
  price: string;
  value: string;
  name: string;
}

interface Categories {
  title: string;
  field: string;
}

interface InvestmentData {
  error: null;
  holdings: InvestmentsHoldingsGetResponse;
}

const formatCurrency = (
  number: number | null | undefined,
  code: string | null | undefined
) => {
  if (number != null && number !== undefined) {
    return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
  }
  return "no data";
};

const transformInvestmentsData = (data: InvestmentData) => {
  const holdingsData = data.holdings.holdings!.sort(function (a, b) {
    if (a.account_id > b.account_id) return 1;
    return -1;
  });
  return holdingsData.map((holding) => {
    const account = data.holdings.accounts!.filter(
      (acc) => acc.account_id === holding.account_id
    )[0];
    const security = data.holdings.securities!.filter(
      (sec) => sec.security_id === holding.security_id
    )[0];
    const value = holding.quantity * security.close_price!;

    const obj = {
      mask: account.mask!,
      name: security.name!,
      ticker: security.ticker_symbol!,
      quantity: formatCurrency(holding.quantity, ""),
      price: formatCurrency(
        security.close_price!,
        account.balances.iso_currency_code
      ),
      value: formatCurrency(value, account.balances.iso_currency_code),
    };
    return obj;
  });
};

const investmentsCategories: Array<Categories> = [
  {
    title: "Account Mask",
    field: "mask",
  },
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Quantity",
    field: "quantity",
  },
  {
    title: "Close Price",
    field: "price",
  },
  {
    title: "Value",
    field: "value",
  },
];

class linkAccount extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { token: null,
                   uid: null,
                   isPlaidConnectedBefore: null,
                   };
  }
  async createLinkToken() {
    // get a link_token from your server
    console.log("link token begin")
    try {
      // get a link_token from your server
      const response = await fetch('/api/create_link_token', { method: 'POST' });
      const { link_token } = await response.json();
      return link_token;
    }
    catch(e) {
      console.log(e);
    }
  }

  async getInvestmentData(accessToken: any) {
    try {
      const response = await fetch("/api/get_investment_data/", {method: 'POST', body: accessToken});
      return await response.json();
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAccessToken(publicToken: any) {
    try {
      const response = await fetch("/api/get_access_token/", {method: 'POST', body: publicToken});
      console.log(response);
      const accessToken = await response.json();
      return accessToken.access_token;
      
    }
    catch(e) {
      console.log(e);
    }
  }

  async storeInvestmentData(data: any) {
    console.log(data);
    let data2: InvestmentData = {
      error: null,
      holdings: data,
    }

    const transformedData = transformInvestmentsData(data2);

    const finalData = {
      investments: transformedData
    }
    
    try {
      const uid = await this.getProfileUID()
      updateOrAddProfileData(uid, finalData);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getProfileUID() {
    const cookie = parseCookies();
    const uid = cookie.userUID;
    console.log(uid);
    return uid;
  }

  isPlaidConnectedAlready() {
    if(this.state.isPlaidConnectedBefore) {
      return true;
    }
    else {
      return false;
    }
  }

  async componentDidMount() {
    const token = await this.createLinkToken();
    
    const uid = await this.getProfileUID();
    const profile = await getProfileData(uid);
    const profileData = {
      ...profile.data()
    };
    this.setState({ token: token,
                    isPlaidConnectedBefore: profileData.plaidPublicToken});
  }

  onSuccess: PlaidLinkOnSuccess = (publicToken, metadata) => {
    const finalPublicToken = {
      plaidPublicToken: publicToken
    }

    const uid = this.getProfileUID().then(profileUID => {
      updateOrAddProfileData(profileUID, finalPublicToken);
    });
    
    const accessToken = this.getAccessToken(publicToken).then(value => {
      const data = this.getInvestmentData(value).then(dataValue => {
        this.storeInvestmentData(dataValue).then(() => {
          window.location.reload();
        })
      });
    });
  };

  onEvent: PlaidLinkOnEvent = (eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
  };

  onExit: PlaidLinkOnExit = (error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata);
  };

  render() {
    return (
      <>
      <Head>
        <title>Climate DAO | Link Account</title>
      </Head>
      <Box
        bg="sage.500"
        mt="120px"
        bgGradient="linear-gradient(sage.500, seafoam.500)"
        // bgImage="url(https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FTitle.png?alt=media&token=a6ed1e7f-09b9-4987-bd63-6efa39d4c46a)"
        bgSize="cover"
        zIndex={0}
      >
        <Container width="100%" h="400px" overflow="auto" marginX="auto">
          <Flex
            justifyContent="center"
            alignItems="center"
            h="calc(100% - 120px)"
          >
            <Heading color="white" textAlign="center" fontSize="64px">
                Link Your Brokerage Accounts
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
            mt="-100px"
            zIndex={1000}
            borderRadius="20px"
            alignItems="center"
            justifyContent="space-between"
            color="white"
            p="64px"
            mb="120px"
          >
            <Heading fontSize="2.0em" w="60%">
                Link your brokerage account to take the first step towards climate impact!
            </Heading>
          {/* BEGINNING OF TESTING PLAID LINK */} 
              <Button
                {...this.isPlaidConnectedAlready() ? {bg:"gray", disabled:true} : {bg:"seafoam.500" }}
                  color="white"
                  _disabled={{
                    pointerEvents: 'none'
                  }}
                  
                  p="32px 64px"
                  borderRadius="16px"
                  fontSize="1.3em"
                  id="plaidB"
                  _hover={{
                    textDecoration: "none",
                  }}
                  
                >            
                  <PlaidLink
                    style={{ padding: '0px', fontSize: '1.3em', cursor: 'pointer', color: 'white', backgroundColor: 'transparent',border:"none" }}
                    token={this.state.token}
                    onSuccess={this.onSuccess}
                    onEvent={this.onEvent}
                    onExit={this.onExit}
                >
                    {this.isPlaidConnectedAlready() ? "Account Linked Already!" : "Link Brokerage Account"}
                  </PlaidLink>
              </Button>
          {/* END OF TESTING PLAID LINK */}
            {/* <PlaidLink
              // style={{ padding: '40px', fontSize: '1.3em', cursor: 'pointer', color: 'white', backgroundColor: 'black', }}
              token={this.state.token}
              onSuccess={this.onSuccess}
              onEvent={this.onEvent}
              onExit={this.onExit}
            >
              Link Brokerage Account
            </PlaidLink> */}
          </Flex>
          <ChakraProvider resetCSS>
    <Box ml="3%" mr="3%" mb="10%" height="110%">
      <Text display="block" ml="2%" mr="2%" textAlign="center" fontSize="2xl" mb="10%">
        At ClimateDAO we empower like-minded investors to collectively advocate
        for changes they want to see at public companies. Linking your brokerage
        accounts, allows us to prove to the companies we’re approaching that
        verified shareholders supported the proposed campaings.
      </Text>
      <Flex mt="4%">
        <Stack spacing={2} mr="10%" height="400px">
          <Text
            textAlign="left"
            fontSize="6xl"
            mt="5%"
            display="block"
            fontWeight="bold"
          >
            What happens to my data?
          </Text>
          <Text display="block" fontSize="2xl">
            Whether you own stocks or not, public companies have a huge impact
            on our everyday lives. Everything from the food we eat, to how we
            connect, and the environment we live in is impacted by the hands of
            public companies.{' '}
          </Text>
        </Stack>
        <Image
          height="400px"
          width="400px"
          mr="3%"
          src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2039.png?alt=media&token=14c1cae2-5cf6-4ded-b1c9-ab8138e93409"
        />
      </Flex>
      <Flex mt="15%">
        <Image
          height="400px"
          width="400px"
          src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FLink%20your%20Accounts.png?alt=media&token=54176198-7c1c-4287-b36d-2046d45c187a"
          ml=" 5%"
        />
        <Stack spacing={2} ml="10%" height="400px">
          <Text textAlign="left" fontSize="6xl" fontWeight="bold">
            Why it’s important
          </Text>
          <Text textAlign="left" fontSize="2xl">
            Linking your brokerage accounts allows ClimateDAO to prove to the
            companies that its approaches that verfiied shareholders have
            supported these proposed campaigns. In short, by linking your
            brokerage account- it shows that we mean business.
          </Text>
        </Stack>
      </Flex>
      <Flex mt="15%">
        <Stack spacing={2} mr="15%">
          <Text fontWeight="bold" fontSize="6xl">
            Strength in numbers
          </Text>
          <Text fontSize="2xl">
            After verifying that you own shares and signaling your support for
            campaigns, we can approach companies with much more leverage. Us to
            companies: “We all want to see this change, and this many of your
            shareholders said so.”
          </Text>
        </Stack>
        <Image
          height="200px"
          width="400px"
          src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2041.png?alt=media&token=134d5014-8b72-45ea-a293-d2d0d823297f"
        />
      </Flex>
      <Button
        {...this.isPlaidConnectedAlready() ? {bg:"gray", disabled:true} : {bg:"seafoam.500", disabled: false}}
          color="white"
          _disabled={{
            pointerEvents: 'none'
          }}
          
          p="32px 64px"
          mt="150px"
          mx="30%"
          borderRadius="16px"
          fontSize="1.3em"
          id="plaidB"
          _hover={{
            textDecoration: "none",
          }}
          
        >            
          <PlaidLink
            style={{ padding: '0px', fontSize: '1.3em', cursor: 'pointer', color: 'white', backgroundColor: 'transparent',border:"none" }}
            token={this.state.token}
            onSuccess={this.onSuccess}
            onEvent={this.onEvent}
            onExit={this.onExit}
        >
            {this.isPlaidConnectedAlready() ? "Account Linked Already!" : "Link Brokerage Account"}
          </PlaidLink>
      </Button>
    </Box>
  </ChakraProvider>
        </Container>
      </Box>
    </>
    )
  }
  
  
}

export default linkAccount;