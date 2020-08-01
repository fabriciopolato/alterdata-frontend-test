import React, { useContext } from 'react';
import { Button } from '../';
import { Container, Content } from './styles';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { Context } from '../../context/context';

const Header: React.FC = () => {
  const { handleToggleModalNewTicket } = useContext(Context);

  return (
    <Container>
      <Content>
        <Button onClick={handleToggleModalNewTicket}>Criar Ticket</Button>
        <HomeIcon />
        <Button isBlue isTransparent>
          Logout
        </Button>
      </Content>
    </Container>
  );
};

export default Header;
