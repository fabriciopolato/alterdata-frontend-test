import React, { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './styles';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isArchive?: boolean;
  isComment?: boolean;
  isTransparent?: boolean;
  isBlue?: boolean;
}

const Button: React.FC<IButton> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
