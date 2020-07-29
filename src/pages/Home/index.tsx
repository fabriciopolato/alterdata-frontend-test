import React from 'react';
import { Ticket } from '../../components';
import { Container, OpenTickets, ClosedTickets } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <OpenTickets>{/* <Ticket ticket={} /> */}</OpenTickets>
      <ClosedTickets>{/* <Ticket ticket={} /> */}</ClosedTickets>
    </Container>
  );
};

export default Home;
