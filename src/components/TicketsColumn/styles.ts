import styled from 'styled-components';

interface IProps {
  backgroundColor: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafc;
  margin: 0 10px;
`;

export const Title = styled.div<IProps>`
  background-color: ${props => props.backgroundColor};
  border-radius: 6px 6px 0px 0px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;
