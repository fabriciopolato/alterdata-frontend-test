import React, { useEffect, useContext } from 'react';
import { Ticket, Modal, ClickedTicket, Button } from '../../components';
import { Container, OpenTickets, ClosedTickets, CommentSection, ButtonsSection } from './styles';
import { getAllOpenTickets, getAllClosedTickets } from '../../services/api';
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
    refreshApi,
    comment,
    setComment,
    handleSubmit,
  } = useContext(Context);

  useEffect(() => {
    (async () => {
      const openTickets = await getAllOpenTickets();
      const closedTickets = await getAllClosedTickets();
      setAllOpenTickets(openTickets.data);
      setAllClosedTickets(closedTickets.data);
      setComment('');
    })();
  }, [setAllClosedTickets, setAllOpenTickets, refreshApi, setComment]);

  return (
    <>
      <Modal toggle={toggleModal} handleToggle={handleToggleModal} id={clickedTicket?.id}>
        <ClickedTicket ticket={clickedTicket} />
        <CommentSection>
          {!clickedTicket.deleted_at ? (
            <>
              <label htmlFor="comment">Comentário:</label>
              <textarea
                onChange={e => {
                  setComment(e.target.value);
                }}
                value={comment}
                name="comment"
                id="comment"
                cols={30}
                rows={10}
              ></textarea>
            </>
          ) : null}
        </CommentSection>
        <ButtonsSection>
          <Button onClick={() => handleSubmit(clickedTicket.id, comment)}>Responder</Button>
          <Button>Cancelar</Button>
        </ButtonsSection>
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
