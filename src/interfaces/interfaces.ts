export interface ITicket {
  id: string;
  message: string;
  subject: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  username: string;
}

export interface IComment {
  id: string;
  comment: string;
  user_id: number;
  ticket_id: number;
  created_at: string;
  updated_at: string;
}
