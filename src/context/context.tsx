import React, { createContext, useState, Dispatch, useEffect, SetStateAction } from 'react';
import { getTokenFromLocalStorage } from '../services/localStorage';
import { api, closeTicket, reopenTicket, createCommentInClickedTicket } from '../services/api';
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
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  handleSubmit(ticket_id: string, comment: string): void;
}

const Context = createContext<IContext>({} as IContext);

const ContextProvider: React.FC = ({ children }) => {
  const [clickedTicket, setClickedTicket] = useState<ITicket>({} as ITicket);
  const [toggleModal, setToggleModal] = useState(false);
  const [allOpenTickets, setAllOpenTickets] = useState<ITicket[]>([]);
  const [allClosedTickets, setAllClosedTickets] = useState<ITicket[]>([]);
  const [refreshApi, setRefreshApi] = useState(false);
  const [comment, setComment] = useState('');

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

  const handleSubmit = (ticket_id: string, comment: string) => {
    createCommentInClickedTicket(ticket_id, comment);
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
        comment,
        setComment,
        handleSubmit,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
