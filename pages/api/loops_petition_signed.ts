// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AxiosResponse } from 'axios';

import { 
    petitionSigned,
  } from '../../lib/loops';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json({ name: 'John Doe' })
      case 'POST':
        const response = await petitionSigned(req.body);
        if (true) {
          return res.status(200).json(response);
        } else {
          return res.status(400).send({
            error: 'There was an error with loops register.',
          });
        }
       console.log(response);
       return response;
      default:
        return res.status(200).json({ name: 'John Doe' })
    }  
  } catch (err) {
    return res.status(500).send({
      errors: (err as any).response,
    });
  }
}