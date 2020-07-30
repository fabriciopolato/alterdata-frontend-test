import React, { HTMLAttributes, useContext } from 'react';
import { Container, Content, ButtonsSection } from './styles';
import { ITicket } from '../../interfaces/interfaces';
import { Button } from '../';
import { Context } from '../../context/context';

interface PropsTickets extends HTMLAttributes<HTMLDivElement> {
  ticket: ITicket;
}

const Ticket: React.FC<PropsTickets> = ({ ticket, ...rest }) => {
  const { subject, message, created_at, user_id, deleted_at } = ticket;
  const context = useContext(Context);
  const { handleClickTicket, handleToggleModal } = context;

  return (
    <Container {...rest}>
      <Content>
        <h1>{subject}</h1>
        <p>{message}</p>
        <span>{created_at}</span>
        <span>{deleted_at}</span>
      </Content>
      <span>{user_id}</span>
      <ButtonsSection>
        <Button
          onClick={() => {
            handleToggleModal();
            handleClickTicket(ticket);
          }}
        >
          Responder
        </Button>
        <Button>Arquivar</Button>
      </ButtonsSection>
    </Container>
  );
};

export default Ticket;
