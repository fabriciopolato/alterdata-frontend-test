import React, { createContext, useState, Dispatch, useEffect, SetStateAction } from 'react';
import { getTokenFromLocalStorage } from '../services/localStorage';
import {
  api,
  closeTicket,
  reopenTicket,
  createCommentInClickedTicket,
  getCommentsFromClickedTicket,
  deleteCommentFromClickedTicket,
} from '../services/api';
import { ITicket, IComment } from '../interfaces/interfaces';

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
  commentsFromClickedTicket: IComment[];
  setCommentsFromClickedTicket: Dispatch<SetStateAction<IComment[]>>;
  handleCommentsTicket(ticket_id: string): void;
  handleDeleteComment(ticket_id: string, comment_id: string): void;
}

const Context = createContext<IContext>({} as IContext);

const ContextProvider: React.FC = ({ children }) => {
  const [clickedTicket, setClickedTicket] = useState<ITicket>({} as ITicket);
  const [toggleModal, setToggleModal] = useState(false);
  const [allOpenTickets, setAllOpenTickets] = useState<ITicket[]>([]);
  const [allClosedTickets, setAllClosedTickets] = useState<ITicket[]>([]);
  const [refreshApi, setRefreshApi] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsFromClickedTicket, setCommentsFromClickedTicket] = useState<IComment[]>([]);

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

  const handleCommentsTicket = async (ticket_id: string) => {
    const foundComments = await getCommentsFromClickedTicket(ticket_id);
    setCommentsFromClickedTicket(foundComments.data);
  };

  const handleDeleteComment = async (ticket_id: string, comment_id: string) => {
    await deleteCommentFromClickedTicket(ticket_id, comment_id);
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
        commentsFromClickedTicket,
        setCommentsFromClickedTicket,
        handleCommentsTicket,
        handleDeleteComment,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
