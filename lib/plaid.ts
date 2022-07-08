import axios, { AxiosResponse } from 'axios';
import { Configuration, LinkTokenCreateRequest, PlaidApi, PlaidEnvironments } from 'plaid';
const util = require('util');
const moment = require('moment');

const baseURL = 'https://forum.climatedao.xyz';

const configuration = new Configuration({
    basePath: PlaidEnvironments.development,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    },
  });
  
const plaidClient = new PlaidApi(configuration);
const plaidProducts = (process.env.PLAID_PRODUCTS || 'investments').split(',',);
const plaidCountryCodes = (process.env.PLAID_COUNTRY_CODES || 'US').split(',',);

const configs = {
    user: {
    // This should correspond to a unique id for the current user.
    //remember to fix this id when the trad login and user data structure are complete
    client_user_id: 'user-id',
    },
    client_name: 'ClimateDAO Connect',
    products: plaidProducts,
    country_codes: plaidCountryCodes,
    language: 'en',
};

export async function fetchLinkToken () { 
    // @ts-ignore
    const response = await plaidClient.linkTokenCreate(configs);
    const linkToken = response;
    return linkToken;
}

export async function getAcccessToken(PUBLIC_TOKEN: any) {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
        public_token: PUBLIC_TOKEN,
    });
    const access_token = tokenResponse;
    return access_token;
}

export async function getInvestmentData(token: any) {
    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    const ACCESS_TOKEN = await token;
    //console.log(ACCESS_TOKEN)
    const holdingsConfigs = {
        access_token: ACCESS_TOKEN
      };
    const investmentHoldingsResponse = await plaidClient.investmentsHoldingsGet(holdingsConfigs);
    return investmentHoldingsResponse;
}