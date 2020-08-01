import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface StyledProps {
  isFocused?: boolean;
  isErrored: boolean;
}

export const Container = styled.div<StyledProps>`
  width: 100%;
  max-width: 615px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #c8c6e3;
  margin-bottom: 24px;

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #f8a186;
      color: #f8a186;
    `}
  ${props =>
    props.isFocused &&
    css`
      border: 1px solid rgba(54, 66, 125, 0.8);
      box-shadow: 0px 0px 4px 1px rgba(54, 66, 125, 0.7);
    `};
`;

export const StyledInput = styled.input<StyledProps>`
  background: transparent;
  border: 0;
  padding: 15px;
  width: 100%;
  height: 100%;
  color: #171c35
    ${props =>
      props.isFocused
        ? css`
            color: #171c35;
            &::placeholder {
              color: #a4a5a6;
            }
          `
        : css`
            &::placeholder {
              color: #68696a;
            }
          `};
`;

export const Error = styled(Tooltip)`
  height: 20px;
  padding: 12px 10px 0 0;
`;

export const StyledLabel = styled.label`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-variant: small-caps;
  margin-bottom: 8px;
  display: block;
`;
