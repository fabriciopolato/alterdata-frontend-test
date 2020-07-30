import React, { useEffect, useContext } from 'react';
import { Ticket, Modal, ClickedTicket } from '../../components';
import { Container, OpenTickets, ClosedTickets } from './styles';
import { getAllTickets, getAllClosedTickets } from '../../services/api';
import { Context } from '../../context/context';

const Home: React.FC = () => {
  const {
    clickedTicket,
    toggleModal,
    handleToggleModal,
    allOpenTickets,
    setAllOpenTickets,
    allClosedTickets,
    setAllClosedTickets,
  } = useContext(Context);

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
          {allOpenTickets.length
            ? allOpenTickets.map(ticket => {
                return <Ticket key={ticket.id} ticket={ticket} />;
              })
            : null}
        </OpenTickets>
        <ClosedTickets>
          {allClosedTickets.length
            ? allClosedTickets.map(ticket => {
                return <Ticket closedTicket key={ticket.id} ticket={ticket} />;
              })
            : null}
        </ClosedTickets>
      </Container>
    </>
  );
};

export default Home;
