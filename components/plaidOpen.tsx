import React from 'react';
import { Configuration, LinkTokenCreateRequest, PlaidApi, PlaidEnvironments, InvestmentsHoldingsGetResponse } from 'plaid';
import {
  PlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  usePlaidLink,
  PlaidLinkOptionsWithLinkToken,
} from 'react-plaid-link';
import { getProfileData, updateOrAddProfileData } from "../lib/firebaseClient";
import { useAuth } from "../contexts/AuthContext";
import Button from './common/components/Button';
import { parseCookies } from 'nookies';

let theLinkToken: any;

const configuration = new Configuration({
    basePath: PlaidEnvironments.production,
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

  async function createLinkToken() {
    // get a link_token from your server
    //console.log("link token begin")
    try {
      // get a link_token from your server
      const response = await fetch('/api/create_link_token', { method: 'POST' });
      const { link_token } = await response.json();
      return link_token;
    }
    catch (e) {
      //console.log(e);
    }
  }
  
  async function linkPlaid() {
    //console.log("here");
    try {
      const response = await plaidClient.linkTokenCreate(request);
      const linkToken = response.data.link_token;
      //console.log(linkToken);
    } catch (error) {
      //console.log(error);
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


async function getInvestmentData(accessToken: any) {
  try {
    const response = await fetch("/api/get_investment_data/", { method: 'POST', body: accessToken });
    return await response.json();
  }
  catch (e) {
    //console.log(e);
  }
}


async function getAccessToken(publicToken: any) {
  try {
    const response = await fetch("/api/get_access_token/", { method: 'POST', body: publicToken });
    //console.log(response);
    const accessToken = await response.json();
    return accessToken.access_token;

  }
  catch (e) {
    //console.log(e);
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
  ////console.log(uid);
  return uid;
}

const onSuccess: PlaidLinkOnSuccess = (publicToken, metadata) => {
  const finalPublicToken = {
    plaidPublicToken: publicToken
  }

  const uid = getProfileUID().then(profileUID => {
    updateOrAddProfileData(profileUID, finalPublicToken);
  });

  const accessToken = getAccessToken(publicToken).then(value => {
    const data = getInvestmentData(value).then(dataValue => {
      storeInvestmentData(dataValue).then(() => {
        window.location.reload();
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
  //console.log(error, metadata);
};




  
export function LinkAccount(token: any) {
  
  const config: PlaidLinkOptionsWithLinkToken = {
    onSuccess,
    onExit,
    onEvent,
    token: token,
  };

  const { open, exit, ready } = usePlaidLink(config);
  console.log("try link open")
  open();
  
}