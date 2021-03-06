import styled from 'styled-components';

interface IProps {
  toggle: boolean;
}

export const Container = styled.div<IProps>`
  visibility: ${props => (props.toggle ? 'visible' : 'hidden')};
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 4000px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 10;
  animation: ${props => (props.toggle ? 'fadeIn' : 'fadeOut')} 400ms ease forwards;
  transition: visibility 400ms linear;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  width: 536px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  z-index: 20;

  & > h2 {
    font-family: 'Museo';
    font-weight: 600;
    font-size: 2.4rem;
    color: ${props => props.theme.white};
    margin-bottom: 24px;
  }
  & > ul {
    height: calc(100% - 51px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    & > li {
      font-family: 'Work Sans', sans-serif;
      font-weight: normal;
      font-size: 1.6rem;
      color: ${props => props.theme.white};
    }
  }
`;
