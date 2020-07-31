import React, {
  createContext,
  useState,
  Dispatch,
  useEffect,
  SetStateAction,
  FormEvent,
} from 'react';
import { getTokenFromLocalStorage } from '../services/localStorage';
import {
  api,
  closeTicket,
  reopenTicket,
  createCommentInClickedTicket,
  getCommentsFromClickedTicket,
  deleteCommentFromClickedTicket,
  createTicket,
} from '../services/api';
import { ITicket, IComment } from '../interfaces/interfaces';

export interface IContext {
  clickedTicket: ITicket;
  setClickedTicket: Dispatch<SetStateAction<ITicket>>;
  handleClickTicket(clickedTicket: ITicket): void;
  toggleModalTicket: boolean;
  setToggleModalTicket: Dispatch<SetStateAction<boolean>>;
  handleToggleModalTicket(): void;
  toggleModalNewTicket: boolean;
  setToggleModalNewTicket: Dispatch<SetStateAction<boolean>>;
  handleToggleModalNewTicket(): void;
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
  handleCreateComment(ticket_id: string): void;
  commentsFromClickedTicket: IComment[];
  setCommentsFromClickedTicket: Dispatch<SetStateAction<IComment[]>>;
  handleCommentsTicket(ticket_id: string): void;
  handleDeleteComment(ticket_id: string, comment_id: string): void;
  subject: string;
  setSubject: Dispatch<SetStateAction<string>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  handleCreateTicket(e: FormEvent): void;
}

const Context = createContext<IContext>({} as IContext);

const ContextProvider: React.FC = ({ children }) => {
  const [clickedTicket, setClickedTicket] = useState<ITicket>({} as ITicket);
  const [toggleModalTicket, setToggleModalTicket] = useState(false);
  const [toggleModalNewTicket, setToggleModalNewTicket] = useState(false);
  const [allOpenTickets, setAllOpenTickets] = useState<ITicket[]>([]);
  const [allClosedTickets, setAllClosedTickets] = useState<ITicket[]>([]);
  const [refreshApi, setRefreshApi] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsFromClickedTicket, setCommentsFromClickedTicket] = useState<IComment[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

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

  const handleToggleModalTicket = () => {
    setToggleModalTicket(!toggleModalTicket);
    setComment('');
  };

  const handleToggleModalNewTicket = () => {
    setToggleModalNewTicket(!toggleModalNewTicket);
    setMessage('');
    setSubject('');
  };

  const handleCloseTicket = async (id: string) => {
    await closeTicket(id);
    setRefreshApi(!refreshApi);
  };

  const handleReopenTicket = async (id: string) => {
    await reopenTicket(id);
    setRefreshApi(!refreshApi);
  };

  const handleCreateComment = async (ticket_id: string) => {
    createCommentInClickedTicket(ticket_id, comment);

    try {
      const createdComment = await createCommentInClickedTicket(ticket_id, comment);
      setCommentsFromClickedTicket(prevState => [...prevState, createdComment.data]);
    } catch (error) {
      console.log(error);
    }

    setComment('');
  };

  const handleCommentsTicket = async (ticket_id: string) => {
    const foundComments = await getCommentsFromClickedTicket(ticket_id);
    setCommentsFromClickedTicket(foundComments.data);
  };

  const handleDeleteComment = async (ticket_id: string, comment_id: string) => {
    try {
      await deleteCommentFromClickedTicket(ticket_id, comment_id);
      const updatedComments = commentsFromClickedTicket.filter(
        comment => comment.id !== comment_id
      );
      setCommentsFromClickedTicket(updatedComments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTicket = async (e: FormEvent) => {
    e.preventDefault();
    await createTicket(subject, message);
    setRefreshApi(!refreshApi);
    setToggleModalNewTicket(!toggleModalNewTicket);
  };

  return (
    <Context.Provider
      value={{
        clickedTicket,
        setClickedTicket,
        handleClickTicket,
        toggleModalTicket,
        setToggleModalTicket,
        handleToggleModalTicket,
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
        handleCreateComment,
        commentsFromClickedTicket,
        setCommentsFromClickedTicket,
        handleCommentsTicket,
        handleDeleteComment,
        toggleModalNewTicket,
        setToggleModalNewTicket,
        handleToggleModalNewTicket,
        subject,
        setSubject,
        message,
        setMessage,
        handleCreateTicket,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
