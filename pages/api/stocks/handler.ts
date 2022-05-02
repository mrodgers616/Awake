// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const options = {
      method: 'GET',
      url: 'https://yh-finance.p.rapidapi.com/auto-complete',
      headers: {
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_YAHOO_HOST,
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YAHOO_FINANCE_KEY
      }
    }

    const results = await axios.request(options as any);
    res.status(200).json(results.data);
  }
}
