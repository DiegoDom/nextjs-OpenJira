// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
  method: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log(process.env);

  res.status(200).json({
    success: true,
    message: 'All right',
    method: req.method || 'Sin metodo',
  });
}
