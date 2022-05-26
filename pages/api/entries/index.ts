import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { success: boolean; data: IEntry[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return createEntry(req, res);
    default:
      return res.status(400).json({ data: [], success: false });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const data = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({
      data: [],
      success: false,
    });
  }
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body;

  const newEntry = new Entry({
    createdAt: Date.now(),
    description,
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    res.status(201).json({
      success: true,
      data: [newEntry],
    });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({
      data: [],
      success: false,
    });
  }
};
