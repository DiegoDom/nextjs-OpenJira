import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { entriesApi } from '../../apis';
import { Entry, EntryApiResp } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    try {
      const {
        data: { data: payload },
      } = await entriesApi.post<EntryApiResp>('/entries', { description });

      dispatch({ type: '[Entry] - AddEntry', payload: payload[0] });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (entry: Entry, showSnackbar: boolean = false) => {
    try {
      const { _id, description, status } = entry;

      const {
        data: { data: payload },
      } = await entriesApi.put<EntryApiResp>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({ type: '[Entry] - UpdateEntry', payload: payload[0] });

      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    try {
      const {
        data: { data: payload },
      } = await entriesApi.get<EntryApiResp>('/entries');
      dispatch({ type: '[Entry] - GetEntries', payload });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

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
