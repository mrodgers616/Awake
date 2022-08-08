// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import type { AxiosResponse } from 'axios';
// import { 
//   createCampaignThread,
// } from '../../../lib/discourse';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     switch (req.method) {
//       case 'GET':
//         return res.status(200).json({ name: 'John Doe' })
//       case 'POST':
//         const response = await createCampaignThread(req.body);
//         if (response.status === 200) {
//           return res.status(200).json(response.data);
//         } else if (response.status === 422) {
//           return res.status(422).json(response.data);
//         } else {
//           return res.status(400).send({
//             error: 'There was an error creating the thread.',
//           });
//         }
//       default:
//         return res.status(200).json({ name: 'John Doe' })
//     }  
//   } catch (err) {
//     return res.status(500).send({
//       errors: (err as any).response.data.errors,
//     });
//   }
// }
