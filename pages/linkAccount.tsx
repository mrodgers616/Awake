import type { NextPage, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from 'react';
import Head from "next/head";
import { Configuration, LinkTokenCreateRequest, PlaidApi, PlaidEnvironments, InvestmentsHoldingsGetResponse } from 'plaid';
import {
  PlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  usePlaidLink,
  PlaidLinkOptionsWithLinkToken,
} from 'react-plaid-link';
import { admin } from '../lib/firebaseAdmin';
import { getProfileData, updateOrAddProfileData } from "../lib/firebaseClient";
import { parseCookies } from 'nookies';
import Text from '../components/common/components/Text';
import Image from '../components/common/components/Image';
import Button from '../components/common/components/Button';
import Heading from '../components/common/components/Heading';
import Rating from '../components/common/components/Rating';
import Container from '../components/common/components/UI/Container';
import BannerWrapper, {
  BannerContent,
  RatingInfo,
  BannerImage,
  ButtonGroup,
  VideoGroup,
  VideoWrapper,
  CustomerWrapper,
  ImageWrapper,
} from '../components/AppModern/Banner/banner.style';
import bannerImg from '../public/illustrations/yourdata2.png';
import plaid from '../public/illustrations/Plaid_logo.svg';
import circleBorder from '../components/common/assets/image/appModern/shape.svg';
import { useAuth } from "../contexts/AuthContext";


import { client } from '../components/common/data/AppModern';
import { useRouter } from "next/router";
import { Box, ChakraProvider, Flex, Stack, } from "@chakra-ui/react";

const popStyle = {
  minWidth: "55%",
  maxWidth: "55%",
  marginRight: "220px"
}

const topStyle = {
  maxWidth: "25%",
  marginLeft: "10%"
}

const copstyle = {
  p: "30px"
}

const Banner = () => {
  // // modal handler
  // const handleVideoModal = () => {
  //   openModal({
  //     config: {
  //       className: 'video-modal',
  //       disableDragging: true,
  //       default: {
  //         width: 'auto',
  //         height: 'auto',
  //         x: 0,
  //         y: 0,
  //       },
  //     },
  //     component: ModalContent,
  //     componentProps: {},
  //     closeComponent: CloseModalButton,
  //     closeOnClickOutside: true,
  //   });
  // };

  const imageStyle = {
    margin: '-50px 0 0 0',
  }
}

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
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
  ////console.log("here");
  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
    ////console.log(linkToken);
  } catch (error) {
    ////console.log(error);
  }
}

interface Props { }
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

const LinkAccount: NextPage = () => {

  const [theToken, setTheToken] = useState(null);
  const [isPlaidConnectedBefore, setIsPlaidConnectedBefore] = useState(String);
  let plaidConnectedBefore: any;
  const [uid, setUid] = useState(String);
  const { userid } = useAuth();
  const router = useRouter();



  async function loadOnPageLoad() {
    const token = await createLinkToken();
    const uid = await getProfileUID();
    const profile = await getProfileData(uid);
    const profileData = {
      ...profile.data()
    };
    setTheToken(token);
    setIsPlaidConnectedBefore(profileData.plaidPublicToken);
    setUid(uid);
    plaidConnectedBefore = profileData.plaidPublicToken;

  }


  async function createLinkToken() {
    // get a link_token from your server
    ////console.log("link token begin")
    try {
      // get a link_token from your server
      const response = await fetch('/api/create_link_token', { method: 'POST' });
      const { link_token } = await response.json();
      return link_token;
    }
    catch (e) {
      ////console.log(e);
    }
  }

  async function getInvestmentData(accessToken: any) {
    try {
      const response = await fetch("/api/get_investment_data/", { method: 'POST', body: accessToken });
      return await response.json();
    }
    catch (e) {
      ////console.log(e);
    }
  }

  async function getAccessToken(publicToken: any) {
    try {
      const response = await fetch("/api/get_access_token/", { method: 'POST', body: publicToken });
      ////console.log(response);
      const accessToken = await response.json();
      return accessToken.access_token;

    }
    catch (e) {
      ////console.log(e);
    }
  }

  async function storeInvestmentData(data: any) {
    //console.log(data);
    let data2: InvestmentData = {
      error: null,
      holdings: data,
    }

    const transformedData = transformInvestmentsData(data2);

    const finalData = {
      investments: transformedData
    }
    //console.log("here")
    try {
      const uid = await getProfileUID()
      updateOrAddProfileData(uid, finalData);
    }
    catch (e) {
      //console.log(e);
    }
  }

  async function getProfileUID() {
    const cookie = parseCookies();
    const uid = cookie.userUID;
    //console.log(uid);
    return uid;
  }

  function isPlaidConnectedAlready() {
    if (isPlaidConnectedBefore) {
      return true;
    }
    else {
      return false;
    }
  }

  const onSuccess: PlaidLinkOnSuccess = (publicToken, metadata) => {

    const accessToken = getAccessToken(publicToken).then(value => {
      const finalPublicToken = {
        plaidPublicToken: publicToken,
        accessToken: value
      }
      const uid = getProfileUID().then(profileUID => {
        updateOrAddProfileData(profileUID, finalPublicToken);
      });
      const data = getInvestmentData(value).then(dataValue => {
        storeInvestmentData(dataValue).then(() => {
          router.push(`/campaigns/PVQFakOIwa7jgQRLeXWo`);
        })
      });
    });
  };

  const onEvent: PlaidLinkOnEvent = (eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
  };

  const onExit: PlaidLinkOnExit = (error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    ////console.log(error, metadata);
  };

  const config: PlaidLinkOptionsWithLinkToken = {
    onSuccess,
    onExit,
    onEvent,
    token: theToken,
  };

  const { open, exit, ready } = usePlaidLink(config);

  useEffect(() => {
    loadOnPageLoad();
    //open();

  }, []);

  if (ready) {
    if (!isPlaidConnectedAlready()) {
      open();
    }
  }


  return (
    <>
      <head>
        <title>Awake | Link Account</title>
      </head>
      <BannerWrapper id="home">
        {/*@ts-ignore*/}
        <Container>
          <BannerContent>
            <Heading
              as="h1"
              content={"Link Your Account"}
            />
            <Text
              content="By linking your account and signaling your support for
              campaigns, we can approach companies with much more leverage. We use bank-level encryption for connecting to brokers, never store user credentials on our servers, and encrypt all user data."
            />
            <ButtonGroup>
              {/*@ts-ignore*/}
              {isPlaidConnectedBefore ? (<Button className="primary" title="Account Already Linked" disabled={true}>

              </Button>

              ) : (
                /*@ts-ignore*/
                <Button className="primary" title="Connect Your Brokerage Account" as={PlaidLink}
                  token={theToken}
                  onSuccess={onSuccess}
                  onEvent={onEvent}
                  onExit={onExit}>

                </Button>

              )}

              {/* <Button
                className="text"
                variant="textButton"
                icon={<Icon icon={playCircle} />}
                iconPosition="left"
                title="Watch Video"
              /> */}
            </ButtonGroup>
          </BannerContent>
          <BannerImage>
            <Image src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Safedata.png?alt=media&token=2227059e-ed77-4e97-88b7-ddbcbb3c436b" style={topStyle} alt="Banner" />
          </BannerImage>
        </Container>
        <img
          className="bannerBottomShape"
          src={circleBorder?.src}
          alt="Bottom Circle"
        />
      </BannerWrapper>

      <Box ml="15%" mr="15%" mb="10%" height="100%">

        <Flex justify-content="space-around" ml="0%" mr="0%" mt="8%" bgGradient="linear(to bottom, #9EAED4,#9EAED4)" borderRadius="30px" height="300px">
          <Stack>
            <Text
              textAlign="left"
              fontSize="48px"
              mt="5%"
              display="block"
              fontWeight="bold"
              ml="15%" content="What happens to my data?">
            </Text>
            <Text display="block" fontSize="2xl" paddingLeft="15%" content="Awake analyzes data about how many voters there are, how many shares were voted, and what campaigns were supported. This allows us to advocate for change without violating your privacy.">
            </Text>
          </Stack>
          <Image
            height="200px"
            width="300px"
            m="64px"
            src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Plaid_logo.svg?alt=media&token=380cdb7c-d0c1-41e1-bfa5-5af0bc2e9f46" alt={undefined} />
        </Flex>

        <Flex justify-content="space-around" ml="0%" mr="0%" mt="8%" borderRadius="30px" height="300px">
          <Image
            height="200px"
            width="300px"
            m="64px"
            src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/security-icon-encryption.webp?alt=media&token=b8046807-a840-4463-878e-8cb32fa134bd" alt={undefined} />
          <Stack>
            <Text
              textAlign="left"
              fontSize="48px"
              mt="5%"
              display="block"
              fontWeight="bold"
              ml="15%" content="Data Encryption">
            </Text>
            <Text display="block" fontSize="2xl" paddingLeft="15%" content="The combination of the Advanced Encryption Standard (AES-256) and Transport Layer Security (TLS) help keep your personal information safe. Plaid also uses multi-factor authentication for added security in its systems.">
            </Text>
          </Stack>
        </Flex>

<<<<<<< HEAD
=======

>>>>>>> 836b008ab975b373febb4858db3346720139d058
        <Flex justify-content="space-around" ml="0%" mr="0%" mt="8%" bgGradient="linear(to bottom, #9EAED4,#9EAED4)" borderRadius="30px" height="300px">
          <Stack>
            <Text
              textAlign="left"
              fontSize="48px"
              mt="5%"
              display="block"
              fontWeight="bold"
              ml="15%" content="What happens to my data?">
            </Text>
            <Text display="block" fontSize="2xl" paddingLeft="15%" content="Now that you know your data will be safe and that no one else will be able to see your information, link your account to help us advocate for change!">
            </Text>

          <ButtonGroup>
            {/*@ts-ignore*/}
            {isPlaidConnectedBefore ? (<Button className="primary" title="Account Already Linked" disabled={true} mt="10px" ml="15%">
            </Button>
            ) : (
              /*@ts-ignore*/
              <Button
<<<<<<< HEAD
=======
                mt="10px" ml="15%"
>>>>>>> 836b008ab975b373febb4858db3346720139d058
                className="primary" title="Connect Your Brokerage Account" as={PlaidLink}
                token={theToken}
                onSuccess={onSuccess}
                onEvent={onEvent}
                onExit={onExit}>
              </Button>
            )}
          </ButtonGroup>
          </Stack>
        </Flex>
      </Box >
    </>)
}
export default LinkAccount;