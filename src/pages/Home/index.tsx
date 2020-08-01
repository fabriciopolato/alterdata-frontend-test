import React, { useEffect, useContext } from 'react';
import { Modal, ClickedTicket, Button, Header, TicketsColumn } from '../../components';
import { Container, CommentSection, ButtonsSection, Form } from './styles';
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
    allAnsweredTickets,
    setAllAnsweredTickets,
    refreshApi,
    comment,
    setComment,
    handleCreateComment,
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
      setAllOpenTickets(
        openTickets.data.filter(
          ticket => new Date(ticket.created_at).getTime() === new Date(ticket.updated_at).getTime()
        )
      );
      setAllClosedTickets(closedTickets.data);
      setAllAnsweredTickets(
        openTickets.data.filter(
          ticket => new Date(ticket.created_at).getTime() !== new Date(ticket.updated_at).getTime()
        )
      );
    })();
  }, [
    setAllClosedTickets,
    setAllOpenTickets,
    refreshApi,
    setComment,
    setCommentsFromClickedTicket,
    setAllAnsweredTickets,
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
                <div key={oneComment.id}>
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
                handleCreateComment(clickedTicket.id);
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

      <Header />
      <Container>
        <TicketsColumn
          title="Em aberto"
          backgroundColor="#36427D"
          tickets={allOpenTickets}
        ></TicketsColumn>
        <TicketsColumn title="Respondidos" backgroundColor="#30A697" tickets={allAnsweredTickets} />
        <TicketsColumn title="Encerrado" backgroundColor="#7D6536" tickets={allClosedTickets} />
      </Container>
    </>
  );
};

export default Home;
