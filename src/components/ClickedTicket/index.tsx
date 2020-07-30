import React, { HTMLAttributes } from 'react';
import { Container, Content } from './styles';
import { ITicket } from '../../interfaces/interfaces';
import Moment from 'react-moment';

interface PropsTickets extends HTMLAttributes<HTMLDivElement> {
  ticket: ITicket;
}

const ClickedTicket: React.FC<PropsTickets> = ({ ticket, ...rest }) => {
  const { subject, message, created_at, username, deleted_at, updated_at } = ticket;

  return (
    <Container {...rest}>
      <Content>
        <h1>{subject}</h1>
        <p>{message}</p>
        <span>{username}</span>
        <div>
          <span>Criado em: </span>
          <Moment format="DD/MM/YYYY HH:mm">{created_at}</Moment>
        </div>

        {updated_at ? (
          <div>
            <span>Atualizado em: </span>
            <Moment format="DD/MM/YYYY HH:mm">{updated_at}</Moment>
          </div>
        ) : null}

        {deleted_at ? (
          <div>
            <span>Encerrado em: </span>
            <Moment format="DD/MM/YYYY HH:mm">{deleted_at}</Moment>
          </div>
        ) : null}
      </Content>
    </Container>
  );
};

export default ClickedTicket;
