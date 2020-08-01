import React, { useEffect, useContext, useRef } from 'react';
import { Modal, ClickedTicket, Button, Header, TicketsColumn, Input } from '../../components';
import {
  Container,
  CommentSection,
  ButtonsSection,
  ModalHeader,
  Form,
  FormGroup,
  CardComment,
  Wrapper,
} from './styles';
import { getAllOpenTickets, getAllClosedTickets } from '../../services/api';
import { Context } from '../../context/context';
import Moment from 'react-moment';
import { FormHandles } from '@unform/core';

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

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
      const closedTickets = await getAllClosedTickets();
      setAllClosedTickets(closedTickets.data);
      try {
        const openTickets = await getAllOpenTickets();
        setAllOpenTickets(
          openTickets.data.filter(
            ticket =>
              new Date(ticket.created_at).getTime() === new Date(ticket.updated_at).getTime()
          )
        );
        setAllAnsweredTickets(
          openTickets.data.filter(
            ticket =>
              new Date(ticket.created_at).getTime() !== new Date(ticket.updated_at).getTime()
          )
        );
      } catch (error) {
        setAllOpenTickets([]);
        setAllAnsweredTickets([]);
        return;
      }
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
        {clickedTicket.deleted_at ? (
          <ModalHeader color="#7D6536">
            <h2>Visualizar</h2>
          </ModalHeader>
        ) : new Date(clickedTicket.created_at).getTime() ===
          new Date(clickedTicket.updated_at).getTime() ? (
          <ModalHeader color="#36427D">
            <h2>Responder</h2>
          </ModalHeader>
        ) : (
          <ModalHeader color="#30A697">
            <h2>Comentar</h2>
          </ModalHeader>
        )}
        <Wrapper>
          <ClickedTicket ticket={clickedTicket} />
          <CommentSection>
            <div>
              {commentsFromClickedTicket.map(oneComment => {
                return (
                  <CardComment key={oneComment.id}>
                    <small>
                      Em <Moment format="DD/MM/YYYY HH:mm">{oneComment.created_at}</Moment>:
                    </small>
                    <p>{oneComment.comment}</p>
                    {!clickedTicket.deleted_at ? (
                      <button onClick={() => handleDeleteComment(clickedTicket.id, oneComment.id)}>
                        Deletar Comentário
                      </button>
                    ) : null}
                  </CardComment>
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
            {clickedTicket.deleted_at ? (
              <>
                <Button
                  style={{ display: 'block', margin: '0 auto' }}
                  isArchive
                  onClick={handleToggleModalTicket}
                >
                  Cancelar
                </Button>
              </>
            ) : new Date(clickedTicket.created_at).getTime() ===
              new Date(clickedTicket.updated_at).getTime() ? (
              <>
                <Button isTransparent isBlue onClick={handleToggleModalTicket}>
                  Cancelar
                </Button>
                <Button
                  onClick={async () => {
                    if (comment) {
                      handleCreateComment(clickedTicket.id);
                    }
                    handleCommentsTicket(clickedTicket.id);
                  }}
                >
                  Comentar
                </Button>
              </>
            ) : (
              <>
                <Button isTransparent onClick={handleToggleModalTicket}>
                  Cancelar
                </Button>
                <Button
                  isComment
                  onClick={async () => {
                    if (comment) {
                      handleCreateComment(clickedTicket.id);
                    }
                    handleCommentsTicket(clickedTicket.id);
                  }}
                >
                  Comentar
                </Button>
              </>
            )}
          </ButtonsSection>
        </Wrapper>
      </Modal>

      <Modal
        toggle={toggleModalNewTicket}
        handleToggle={handleToggleModalNewTicket}
        id="new-ticket"
      >
        <ModalHeader color="#36427d">
          <h2>Abrir chamado</h2>
        </ModalHeader>
        <Form ref={formRef} onSubmit={handleCreateTicket}>
          <FormGroup>
            <label htmlFor="subject">Assunto</label>
            <Input name="subject" type="text" placeholder="Digite aqui" />
          </FormGroup>
          <FormGroup>
            <label>Mensagem</label>
            <Input name="message" type="text" placeholder="Digite aqui"></Input>
          </FormGroup>
          <ButtonsSection>
            <Button onClick={handleToggleModalNewTicket} isBlue isTransparent type="button">
              Cancelar
            </Button>
            <Button type="submit">Abrir chamado</Button>
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
