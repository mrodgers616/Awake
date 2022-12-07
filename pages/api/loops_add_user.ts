// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AxiosResponse } from 'axios';

import { 
    addUserProfile,
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
        const response = await addUserProfile(req.body);
        console.log(response);
        return response;
      default:
        return res.status(200).json({ name: 'John Doe' })
    }  
  } catch (err) {
    return res.status(500).send({
      errors: (err as any).response.data.errors,
    });
  }
}