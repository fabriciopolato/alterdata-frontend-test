import React, { createContext, useState, Dispatch, useEffect, SetStateAction } from 'react';
import { getTokenFromLocalStorage } from '../services/localStorage';
import { api, closeTicket, reopenTicket } from '../services/api';
import { ITicket } from '../interfaces/interfaces';

export interface IContext {
  clickedTicket: ITicket;
  setClickedTicket: Dispatch<SetStateAction<ITicket>>;
  handleClickTicket(clickedTicket: ITicket): void;
  toggleModal: boolean;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
  handleToggleModal(): void;
  allOpenTickets: ITicket[];
  setAllOpenTickets: Dispatch<SetStateAction<ITicket[]>>;
  allClosedTickets: ITicket[];
  setAllClosedTickets: Dispatch<SetStateAction<ITicket[]>>;
  handleCloseTicket(id: string): void;
  handleReopenTicket(id: string): void;
  refreshApi: boolean;
  setRefreshApi: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<IContext>({} as IContext);

const ContextProvider: React.FC = ({ children }) => {
  const [clickedTicket, setClickedTicket] = useState<ITicket>({} as ITicket);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [allOpenTickets, setAllOpenTickets] = useState<ITicket[]>([]);
  const [allClosedTickets, setAllClosedTickets] = useState<ITicket[]>([]);
  const [refreshApi, setRefreshApi] = useState<boolean>(false);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    // else {
    // }
  }, []);

  const handleClickTicket = (clickedTicket: ITicket) => {
    setClickedTicket(clickedTicket);
  };

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleCloseTicket = async (id: string) => {
    await closeTicket(id);
    setRefreshApi(!refreshApi);
  };

  const handleReopenTicket = async (id: string) => {
    await reopenTicket(id);
    setRefreshApi(!refreshApi);
  };

  return (
    <Context.Provider
      value={{
        clickedTicket,
        setClickedTicket,
        handleClickTicket,
        toggleModal,
        setToggleModal,
        handleToggleModal,
        allOpenTickets,
        setAllOpenTickets,
        allClosedTickets,
        setAllClosedTickets,
        handleCloseTicket,
        handleReopenTicket,
        refreshApi,
        setRefreshApi,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
