import React from 'react';
import { Container, Title } from './styles';
import { ITicket } from '../../interfaces/interfaces';
import { Ticket } from '../';

interface IProps {
  title: string;
  backgroundColor: string;
  tickets: ITicket[];
}

const TicketsColumn: React.FC<IProps> = ({ tickets, title, backgroundColor, children }) => {
  return (
    <Container>
      <Title backgroundColor={backgroundColor}>
        <h2>{title}</h2>
      </Title>
      {tickets.length ? tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket} />) : null}
    </Container>
  );
};

export default TicketsColumn;
