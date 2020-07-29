import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvQGVtYWlsLmNvbSIsImlhdCI6MTU5NjAyOTc2M30.I4d3YDC1Ba2NJbi868oR4eySf2nXCVaDomq12bkaYNc',
  },
});

// if() {

//   api.defaults.headers.Authorization = `Bearer ${token}`;
// }

export interface ITicket {
  id: number;
  message: string;
  subject: string;
  author: string;
  created_at: string;
}

export const getAllTickets = async (): Promise<AxiosResponse<ITicket[]>> => {
  return await api.get('/tickets');
};
