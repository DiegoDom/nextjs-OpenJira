// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      success: false,
      message: 'Este endpoint es solo para desarrollo',
    });
  }

  await db.connect();
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await db.disconnect();

  res.status(200).json({
    success: true,
    message: 'Proceso del seed realizado correctamente',
  });
}
