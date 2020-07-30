import React, { HTMLAttributes, useContext } from 'react';
import { Container, Content, ButtonsSection } from './styles';
import { ITicket } from '../../interfaces/interfaces';
import { Button } from '../';
import { Context } from '../../context/context';

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
        <span>{created_at}</span>
        <span>{deleted_at}</span>
      </Content>
      <span>{username}</span>
      <ButtonsSection>
        {closedTicket ? (
          <Button
            onClick={() => {
              handleReopenTicket(ticket.id);
            }}
          >
            Desarquivar
          </Button>
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
