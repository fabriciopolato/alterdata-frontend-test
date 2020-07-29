import React from 'react';
import { Container, Content } from './styles';
import { Link } from 'react-router-dom';
import { ITicket } from '../../services/api';

interface PropsTickets {
  ticket: ITicket;
}

const Ticket: React.FC<PropsTickets> = ({ ticket }) => {
  const { id, subject, message, created_at, author } = ticket;
  return (
    <Container>
      <Content>
        <h1>{subject}</h1>
        <Link to="/ticket/1">
          <p>{message}</p>
        </Link>
        <span>{created_at}</span>
      </Content>
      <span>{author}</span>
    </Container>
  );
};

export default Ticket;
