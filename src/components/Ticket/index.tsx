import React, { HTMLAttributes, useContext } from 'react';
import { Container, Content, ButtonsSection } from './styles';
import { ITicket } from '../../interfaces/interfaces';
import { Button } from '../';
import { Context } from '../../context/context';
import Moment from 'react-moment';

interface PropsTickets extends HTMLAttributes<HTMLDivElement> {
  ticket: ITicket;
  closedTicket?: boolean;
}

const Ticket: React.FC<PropsTickets> = ({ closedTicket = false, ticket, ...rest }) => {
  const { subject, message, created_at, username, deleted_at } = ticket;
  const {
    handleClickTicket,
    handleToggleModal,
    handleCloseTicket,
    handleReopenTicket,
  } = useContext(Context);

  return (
    <Container {...rest}>
      <Content>
        <h1>{subject}</h1>
        <p>{message}</p>
        <span>Criado em:</span>
        <Moment format="DD/MM/YYYY">{created_at}</Moment>
        {closedTicket ? (
          <>
            <span>Encerrado em:</span>
            <Moment format="DD/MM/YYYY">{deleted_at}</Moment>
          </>
        ) : null}
      </Content>
      <span>{username}</span>
      <ButtonsSection>
        {closedTicket ? (
          <>
            <Button
              onClick={() => {
                handleClickTicket(ticket);
                handleToggleModal();
              }}
            >
              Visualizar
            </Button>
            <Button
              onClick={() => {
                handleReopenTicket(ticket.id);
              }}
            >
              Desarquivar
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                handleClickTicket(ticket);
                handleToggleModal();
              }}
            >
              Responder
            </Button>

            <Button
              onClick={() => {
                handleCloseTicket(ticket.id);
              }}
            >
              Arquivar
            </Button>
          </>
        )}
      </ButtonsSection>
    </Container>
  );
};

export default Ticket;
