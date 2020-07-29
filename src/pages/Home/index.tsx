import React, { useEffect, useState } from 'react';
import { Ticket, Modal, ClickedTicket } from '../../components';
import { Container, OpenTickets, ClosedTickets } from './styles';
import { getAllTickets, getAllClosedTickets } from '../../services/api';
import { ITicket } from '../../interfaces/interfaces';

const Home: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [allOpenTickets, setAllOpenTickets] = useState<ITicket[]>([]);
  const [allClosedTickets, setAllClosedTickets] = useState<ITicket[]>([]);
  const [clickedTicket, setClickedTicket] = useState<ITicket>({} as ITicket);

  useEffect(() => {
    (async () => {
      const openTickets = await getAllTickets();
      const closedTickets = await getAllClosedTickets();
      setAllOpenTickets(openTickets.data);
      setAllClosedTickets(closedTickets.data);
    })();
  }, []);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleClickTicket = (clickedTicket: ITicket) => {
    setClickedTicket(clickedTicket);
  };

  return (
    <>
      <Modal toggle={toggleMenu} handleToggle={handleToggleMenu} id={clickedTicket?.id}>
        <ClickedTicket ticket={clickedTicket} />
      </Modal>
      <Container>
        <OpenTickets>
          {allOpenTickets.map(ticket => {
            return (
              <Ticket
                onClick={() => {
                  handleToggleMenu();
                  handleClickTicket(ticket);
                }}
                key={ticket.id}
                ticket={ticket}
              />
            );
          })}
        </OpenTickets>
        <ClosedTickets>
          {allClosedTickets.map(ticket => {
            return (
              <Ticket
                onClick={() => {
                  handleToggleMenu();
                  handleClickTicket(ticket);
                }}
                key={ticket.id}
                ticket={ticket}
              />
            );
          })}
        </ClosedTickets>
      </Container>
    </>
  );
};

export default Home;
