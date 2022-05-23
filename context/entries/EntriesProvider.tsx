import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      createdAt: Date.now(),
      description:
        'Pendiente: Pariatur incididunt mollit et consequat Lorem in tempor cillum consectetur occaecat et sit dolore.',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 1000000,
      description:
        'En Progreso: Ut tempor consequat dolor aliquip quis aliquip nulla enim ex eiusmod cillum aliquip ut ullamco.',
      status: 'in-progress',
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 100000,
      description:
        'Completada: Adipisicing qui exercitation reprehenderit nulla.Qui velit magna consectetur minim sint sunt do aute fugiat magna.',
      status: 'finished',
    },
  ],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      createdAt: Date.now(),
      description,
      status: 'pending',
    };
    dispatch({ type: '[Entry] - AddEntry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - UpdateEntry', payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
