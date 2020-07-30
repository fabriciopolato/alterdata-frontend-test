import React, { useEffect, useContext } from 'react';
import { Ticket, Modal, ClickedTicket } from '../../components';
import { Container, OpenTickets, ClosedTickets } from './styles';
import { getAllTickets, getAllClosedTickets } from '../../services/api';
import { Context } from '../../context/context';

const Home: React.FC = () => {
  const context = useContext(Context);
  const {
    clickedTicket,
    toggleModal,
    handleToggleModal,
    allOpenTickets,
    setAllOpenTickets,
    allClosedTickets,
    setAllClosedTickets,
  } = context;

  useEffect(() => {
    (async () => {
      const openTickets = await getAllTickets();
      const closedTickets = await getAllClosedTickets();
      setAllOpenTickets(openTickets.data);
      setAllClosedTickets(closedTickets.data);
    })();
  }, [setAllClosedTickets, setAllOpenTickets]);

  return (
    <>
      <Modal toggle={toggleModal} handleToggle={handleToggleModal} id={clickedTicket?.id}>
        <ClickedTicket ticket={clickedTicket} />
      </Modal>
      <Container>
        <OpenTickets>
          {allOpenTickets.map(ticket => {
            return <Ticket key={ticket.id} ticket={ticket} />;
          })}
        </OpenTickets>
        <ClosedTickets>
          {allClosedTickets.map(ticket => {
            return <Ticket key={ticket.id} ticket={ticket} />;
          })}
        </ClosedTickets>
      </Container>
    </>
  );
};

export default Home;
