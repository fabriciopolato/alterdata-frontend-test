import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';
import { Container, Content, ButtonsSection, LastComment } from './styles';
import { ITicket, IComment } from '../../interfaces/interfaces';
import { Button } from '../';
import { Context } from '../../context/context';
import Moment from 'react-moment';

import { ReactComponent as AnswerIcon } from '../../assets/answer.svg';
import { ReactComponent as PlaneIcon } from '../../assets/plane.svg';
import { ReactComponent as ClosedFileIcon } from '../../assets/closed-file.svg';
import { ReactComponent as OpenFileIcon } from '../../assets/open-file.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';

import { getCommentsFromClickedTicket } from '../../services/api';

interface PropsTickets extends HTMLAttributes<HTMLDivElement> {
  ticket: ITicket;
  closedTicket?: boolean;
}

const Ticket: React.FC<PropsTickets> = ({ closedTicket = false, ticket, ...rest }) => {
  const { id, subject, message, created_at, username, deleted_at, updated_at } = ticket;
  const {
    handleClickTicket,
    handleToggleModalTicket,
    handleCloseTicket,
    handleReopenTicket,
    handleCommentsTicket,
  } = useContext(Context);

  const [lastComment, setLastComment] = useState({} as IComment);

  useEffect(() => {
    setLastComment({} as IComment);
    (async () => {
      try {
        const allComments = await getCommentsFromClickedTicket(id);
        if (!allComments.data.length) {
          return;
        }
        const lastIndex = allComments.data.length - 1;
        const lastCommentFromApi = allComments.data[lastIndex];
        setLastComment(lastCommentFromApi);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <Container {...rest}>
      <Content>
        <h4>{subject}</h4>
        <p>{message}</p>

        {lastComment.comment && (
          <LastComment deleted_at={deleted_at}>
            <small>
              <strong>{username}</strong> em{' '}
              <Moment format="DD/MM/YYYY HH:mm">{lastComment.created_at}</Moment>
            </small>
            <small>{lastComment.comment}</small>
          </LastComment>
        )}

        <small>
          Criado em: <Moment format="DD/MM/YYYY HH:mm">{created_at}</Moment>
        </small>
        {new Date(created_at).getTime() !== new Date(updated_at).getTime() && (
          <small>
            Atualizado em: <Moment format="DD/MM/YYYY HH:mm">{updated_at}</Moment>
          </small>
        )}
        {deleted_at && (
          <small>
            Encerrado em: <Moment format="DD/MM/YYYY HH:mm">{deleted_at}</Moment>
          </small>
        )}
        <small>Por: {username}</small>
      </Content>
      <ButtonsSection>
        {deleted_at ? (
          <>
            <Button
              isArchive
              onClick={() => {
                handleClickTicket(ticket);
                handleCommentsTicket(ticket.id);
                handleToggleModalTicket();
              }}
            >
              <EyeIcon />
              Visualizar
            </Button>
            <Button
              isTransparent
              onClick={() => {
                handleReopenTicket(ticket.id);
              }}
            >
              <OpenFileIcon />
              Reabrir
            </Button>
          </>
        ) : new Date(created_at).getTime() !== new Date(updated_at).getTime() ? (
          <>
            <Button
              isComment
              onClick={() => {
                handleClickTicket(ticket);
                handleCommentsTicket(ticket.id);
                handleToggleModalTicket();
              }}
            >
              <PlaneIcon />
              Responder
            </Button>
            <Button
              isComment
              isTransparent
              onClick={() => {
                handleCloseTicket(ticket.id);
              }}
            >
              <ClosedFileIcon />
              Encerrar
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              handleClickTicket(ticket);
              handleCommentsTicket(ticket.id);
              handleToggleModalTicket();
            }}
          >
            <AnswerIcon />
            Responder
          </Button>
        )}
      </ButtonsSection>
    </Container>
  );
};

export default Ticket;
