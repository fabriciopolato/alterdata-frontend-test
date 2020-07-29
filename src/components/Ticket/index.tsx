import React, { HTMLAttributes } from 'react';
import { Container, Content } from './styles';
import { ITicket } from '../../interfaces/interfaces';

interface PropsTickets extends HTMLAttributes<HTMLDivElement> {
  ticket: ITicket;
}

const Ticket: React.FC<PropsTickets> = ({ ticket, ...rest }) => {
  const { subject, message, created_at, author, deleted_at } = ticket;
  return (
    <Container {...rest}>
      <Content>
        <h1>{subject}</h1>
        <p>{message}</p>
        <span>{created_at}</span>
      </Content>
      <span>{author}</span>
      <span>{deleted_at}</span>
    </Container>
  );
};

export default Ticket;
