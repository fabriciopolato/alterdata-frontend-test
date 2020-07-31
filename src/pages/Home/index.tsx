import React, { useEffect, useContext } from 'react';
import { Ticket, Modal, ClickedTicket, Button } from '../../components';
import {
  Container,
  OpenTickets,
  ClosedTickets,
  CommentSection,
  ButtonsSection,
  Form,
} from './styles';
import { getAllOpenTickets, getAllClosedTickets } from '../../services/api';
import { Context } from '../../context/context';
import Moment from 'react-moment';

const Home: React.FC = () => {
  const {
    clickedTicket,
    toggleModalTicket,
    handleToggleModalTicket,
    toggleModalNewTicket,
    handleToggleModalNewTicket,
    allOpenTickets,
    setAllOpenTickets,
    allClosedTickets,
    setAllClosedTickets,
    refreshApi,
    comment,
    setComment,
    handleSubmit,
    setCommentsFromClickedTicket,
    commentsFromClickedTicket,
    handleCommentsTicket,
    handleDeleteComment,
    setMessage,
    message,
    setSubject,
    subject,
    handleCreateTicket,
  } = useContext(Context);

  useEffect(() => {
    (async () => {
      const openTickets = await getAllOpenTickets();
      const closedTickets = await getAllClosedTickets();
      setAllOpenTickets(openTickets.data);
      setAllClosedTickets(closedTickets.data);
    })();
  }, [
    setAllClosedTickets,
    setAllOpenTickets,
    refreshApi,
    setComment,
    setCommentsFromClickedTicket,
  ]);

  return (
    <>
      <Modal
        toggle={toggleModalTicket}
        handleToggle={handleToggleModalTicket}
        id={clickedTicket?.id}
      >
        <ClickedTicket ticket={clickedTicket} />
        <CommentSection>
          <div>
            {commentsFromClickedTicket.map(oneComment => {
              return (
                <div key={oneComment.created_at}>
                  <p>{oneComment.comment}</p>
                  <Moment format="DD/MM/YYYY HH:mm:ss">{oneComment.created_at}</Moment>
                  {!clickedTicket.deleted_at ? (
                    <button onClick={() => handleDeleteComment(clickedTicket.id, oneComment.id)}>
                      Deletar Comentário
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
          {!clickedTicket.deleted_at ? (
            <>
              <label htmlFor="comment">Comentário:</label>
              <textarea
                onChange={e => {
                  const { value } = e.target;
                  setComment(value);
                }}
                value={comment}
                name="comment"
                id="comment"
                cols={30}
                rows={10}
              />
            </>
          ) : null}
        </CommentSection>
        <ButtonsSection>
          <Button
            onClick={async () => {
              if (comment) {
                handleSubmit(clickedTicket.id);
              }
              handleCommentsTicket(clickedTicket.id);
            }}
          >
            Responder
          </Button>
          <Button>Cancelar</Button>
        </ButtonsSection>
      </Modal>

      <Modal
        toggle={toggleModalNewTicket}
        handleToggle={handleToggleModalNewTicket}
        id="new-ticket"
      >
        <Form onSubmit={handleCreateTicket}>
          <label htmlFor="subject">Assunto:</label>
          <input
            onChange={e => {
              const { value } = e.target;
              setSubject(value);
            }}
            value={subject}
            id="subject"
            type="text"
          />
          <label htmlFor="message">Mensagem:</label>
          <textarea
            onChange={e => {
              const { value } = e.target;
              setMessage(value);
            }}
            value={message}
            name="message"
            id="message"
            cols={30}
            rows={10}
          />
          <ButtonsSection>
            <Button type="button" onClick={handleToggleModalNewTicket}>
              Cancelar
            </Button>
            <Button type="submit">Abrir Chamado</Button>
          </ButtonsSection>
        </Form>
      </Modal>

      <Container>
        <Button onClick={handleToggleModalNewTicket}>Criar Ticket</Button>
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
