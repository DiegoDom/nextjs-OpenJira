export interface Entry {
  _id: string;
  createdAt: number;
  description: string;
  status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';
