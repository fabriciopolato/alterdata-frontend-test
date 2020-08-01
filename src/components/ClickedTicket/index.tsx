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
        <h4>{subject}</h4>
        <p>{message}</p>
        <div>
          <small>
            Criado em: <Moment format="DD/MM/YYYY HH:mm">{created_at}</Moment>
          </small>
        </div>

        {updated_at ? (
          <div>
            <small>
              Atualizado em: <Moment format="DD/MM/YYYY HH:mm">{updated_at}</Moment>
            </small>
          </div>
        ) : null}

        {deleted_at ? (
          <div>
            <small>
              Encerrado em: <Moment format="DD/MM/YYYY HH:mm">{deleted_at}</Moment>
            </small>
          </div>
        ) : null}
        <small>Por: {username}</small>
      </Content>
    </Container>
  );
};

export default ClickedTicket;
