import React from 'react';
import { Container, Content } from './styles';

interface IProps {
  toggle: boolean;
  handleToggle: () => void;
  id: any;
  closeIconLeft?: boolean;
}

const Modal: React.FC<IProps> = ({ toggle, handleToggle, id, children }) => {
  return (
    <Container toggle={toggle}>
      <Content id={id}>{children}</Content>
    </Container>
  );
};

export default Modal;
