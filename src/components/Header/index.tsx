import React, { useContext } from 'react';
import { Button } from '../';
import { Container, Content } from './styles';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { Context } from '../../context/context';
import { useAuth } from '../../hooks/auth';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const { handleToggleModalNewTicket } = useContext(Context);
  const history = useHistory();

  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <Button onClick={handleToggleModalNewTicket}>Criar Ticket</Button>
        <HomeIcon />
        <Button
          onClick={() => {
            signOut();
            history.push('/');
          }}
          isBlue
          isTransparent
        >
          Logout
        </Button>
      </Content>
    </Container>
  );
};

export default Header;
