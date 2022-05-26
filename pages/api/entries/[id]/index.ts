import type { NextApiRequest, NextApiResponse } from 'next';
import { Entry, IEntry } from '../../../../models';
import { db } from '../../../../database';

type Data =
  | { success: boolean; data: IEntry[] }
  | { success: boolean; error: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(400).json({
        error: 'El método enviado no es soportado...',
        success: false,
      });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entry = await Entry.findById(id);
    await db.disconnect();

    if (!entry) {
      return res.status(400).json({
        error: 'La entrada solicitada no existe en la base de datos...',
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: [entry],
    });
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      error:
        error.errors.status.message ||
        'Lo sentimos ocurrio un error inesperado en el servidor',
      success: false,
    });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      error: 'La entrada solicitada no existe en la base de datos...',
      success: false,
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    await db.disconnect();

    res.status(200).json({
      success: true,
      data: [updatedEntry!],
    });
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      error:
        error.errors.status.message ||
        'Lo sentimos ocurrio un error inesperado en el servidor',
      success: false,
    });
  }
};
