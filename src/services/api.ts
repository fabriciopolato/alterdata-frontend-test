import axios, { AxiosResponse } from 'axios';
import { ITicket } from '../interfaces/interfaces';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjYXJsb3NAZW1haWwuY29tIiwiaWF0IjoxNTk2MTE2MTE4fQ.2WuKZsSX_nLuC0qRIy6Ix4WZR_jSoBhUE1skhHbwToA',
  },
});

export const getAllTickets = async (): Promise<AxiosResponse<ITicket[]>> => {
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
  return await api.put(`/tickets/reopen/${id}`);
};

export const login = async (): Promise<AxiosResponse<any>> => {
  return await api.post('/login');
};
