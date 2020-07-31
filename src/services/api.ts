import axios, { AxiosResponse } from 'axios';
import { ITicket, IComment } from '../interfaces/interfaces';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjYXJsb3NAZW1haWwuY29tIiwiaWF0IjoxNTk2MTYzMzA1fQ.LaTzyryDcLATaMTmylE7YiZbSlGx1ddsBz-Qh0X2i4I',
  },
});

export const login = async (): Promise<AxiosResponse<any>> => {
  return await api.post('/login');
};

export const getAllOpenTickets = async (): Promise<AxiosResponse<ITicket[]>> => {
  return await api.get('/tickets');
};

export const getAllClosedTickets = async (): Promise<AxiosResponse<ITicket[]>> => {
  return await api.get('/tickets/archived');
};

export const createTicket = async (): Promise<AxiosResponse<ITicket>> => {
  return await api.post(`/tickets`);
};

export const answerTicket = async (id: string): Promise<AxiosResponse<ITicket>> => {
  return await api.put(`/tickets/${id}`);
};

export const closeTicket = async (id: string): Promise<AxiosResponse<ITicket>> => {
  return await api.delete(`/tickets/${id}`);
};

export const reopenTicket = async (id: string): Promise<AxiosResponse<ITicket>> => {
  return await api.put(`/tickets/${id}/reopen`);
};

export const createCommentInClickedTicket = async (
  ticket_id: string,
  comment: string
): Promise<AxiosResponse<IComment>> => {
  return await api.post(`/tickets/${ticket_id}/comments`, { comment });
};

export const getCommentsFromClickedTicket = async (
  ticket_id: string
): Promise<AxiosResponse<IComment[]>> => {
  return await api.get(`/tickets/${ticket_id}/comments`);
};

export const deleteCommentFromClickedTicket = async (
  ticket_id: string,
  comment_id: string
): Promise<AxiosResponse<IComment>> => {
  return await api.delete(`/tickets/${ticket_id}/comments/${comment_id}`);
};
