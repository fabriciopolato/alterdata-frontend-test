import React, { createContext, useState, Dispatch, useEffect, SetStateAction } from 'react';
import { getTokenFromLocalStorage } from '../services/localStorage';
import { api } from '../services/api';
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
}
const Context = createContext<IContext>({} as IContext);

const ContextProvider: React.FC = ({ children }) => {
  const [clickedTicket, setClickedTicket] = useState<ITicket>({} as ITicket);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [allOpenTickets, setAllOpenTickets] = useState<ITicket[]>([]);
  const [allClosedTickets, setAllClosedTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (!token) {
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
