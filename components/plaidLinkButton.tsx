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
import Button from '../components/common/components/Button';
import { parseCookies } from 'nookies';
import Link from "next/Link"


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

  
  class LinkAccount extends React.Component<Props, State> {
  
    constructor(props: Props) {
      super(props);
      this.state = {
        token: null,
        uid: null,
        isPlaidConnectedBefore: null,
      };
    }
    
    async createLinkToken() {
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
  
    async getInvestmentData(accessToken: any) {
      try {
        const response = await fetch("/api/get_investment_data/", { method: 'POST', body: accessToken });
        return await response.json();
      }
      catch (e) {
        //console.log(e);
      }
    }
  
    async getAccessToken(publicToken: any) {
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
  
    async storeInvestmentData(data: any) {
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
        const uid = await this.getProfileUID()
        updateOrAddProfileData(uid, finalData);
      }
      catch (e) {
        //console.log(e);
      }
    }
  
    async getProfileUID() {
      const cookie = parseCookies();
      const uid = cookie.userUID;
      ////console.log(uid);
      return uid;
    }
  
    isPlaidConnectedAlready() {
      if (this.state.isPlaidConnectedBefore) {
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

      this.setState({
        token: token,
        isPlaidConnectedBefore: profileData.plaidPublicToken
      });
      

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
      //console.log(error, metadata);
    };
    

  
    render() {
      return (
        <>
            {this.state.isPlaidConnectedBefore ? (
                //@ts-ignore
                <Button className="primary" title="Campaigns" href="/campaigns" />
            ) : (
                //@ts-ignore
                <Button className="primary" title="Connect Your Brokerage Account" as={PlaidLink} 
                token={this.state.token}
                onSuccess={this.onSuccess}
                onEvent={this.onEvent}
                onExit={this.onExit}>
                </Button>
            )}
            
        </>
      );
  
  }
}
  
  export default LinkAccount;
