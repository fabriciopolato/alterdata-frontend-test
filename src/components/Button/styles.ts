import styled, { css } from 'styled-components';

interface StyledButton {
  isArchive?: boolean;
  isComment?: boolean;
  isTransparent?: boolean;
  isBlue?: boolean;
}

export const StyledButton = styled.button<StyledButton>`
  svg {
    display: inline-block;
    margin-right: 8px;
    align-self: center;
    /* stroke: ${props => (props.isArchive ? '#91794a' : 'white')}; */
  }

  ${props =>
    props.isArchive
      ? css`
          background-color: #7d6536;

          :hover {
            background-color: #91794a;
          }

          :active {
            background-color: #5f4718;
          }
        `
      : props.isTransparent
      ? css`
          color: #36427d;
          background-color: transparent;

          :hover {
            color: ${props.isBlue ? '#36427d' : props.isComment ? '#7d6536' : '#30A697'};
            border: 1px solid ${props.isBlue ? '#36427d' : props.isComment ? '#7d6536' : '#30A697'};
            background-color: transparent;
          }

          :active {
            color: white;
            background-color: ${props.isBlue ? '#18245F' : props.isComment ? '#5f4718' : '#128879'};
          }
        `
      : props.isComment
      ? css`
          background-color: #30a697;

          :hover {
            background-color: #44baab;
          }

          :active {
            background-color: #128879;
          }
        `
      : css`
          background-color: #36427d;

          :hover {
            background-color: #404c87;
          }

          :active {
            background-color: #18245f;
          }
        `}
`;
