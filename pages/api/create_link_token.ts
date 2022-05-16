// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AxiosResponse } from 'axios';

import { 
    fetchLinkToken,
  } from '../../lib/plaid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json({ name: 'John Doe' })
      case 'POST':
        const response = await fetchLinkToken();
        if (response.status === 200) {
          return res.status(200).json(response.data);
        } else if (response.status === 422) {
          return res.status(422).json(response.data);
        } else {
          return res.status(400).send({
            error: 'There was an getting access token.',
          });
        }
      default:
        return res.status(200).json({ name: 'John Doe' })
    }  
  } catch (err) {
    return res.status(500).send({
      errors: (err as any).response.data.errors,
    });
  }
}