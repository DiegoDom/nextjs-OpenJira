import { createContext } from 'react';

export interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;

  startDragging: () => void;
  endDragging: () => void;

  setIsAddingEntry: (status: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
