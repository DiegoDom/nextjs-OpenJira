import { EntriesState } from './';
import { Entry } from '../../interfaces';

type EntriesActionType =
  | { type: '[Entry] - AddEntry'; payload: Entry }
  | { type: '[Entry] - UpdateEntry'; payload: Entry }
  | { type: '[Entry] - GetEntries'; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case '[Entry] - AddEntry':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case '[Entry] - UpdateEntry':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case '[Entry] - GetEntries':
      return {
        ...state,
        entries: [...action.payload],
      };
    default:
      return state;
  }
};
