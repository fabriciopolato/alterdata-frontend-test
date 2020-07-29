import React from 'react';
import { Container, Content } from './styles';
import { Link } from 'react-router-dom';

interface ITicket {
  message: string;
  subject: string;
  author: string;
  created_at: string;
}

interface PropsTickets {
  ticket: ITicket;
}

const Ticket: React.FC<PropsTickets> = ({ ticket }) => {
  const { subject, message, created_at, author } = ticket;

  return (
    <Container>
      <Content>
        <h1>{subject}</h1>
        <Link to="/">
          <p>{message}</p>
        </Link>
        <span>{created_at}</span>
      </Content>
      <span>{author}</span>
    </Container>
  );
};

export default Ticket;
