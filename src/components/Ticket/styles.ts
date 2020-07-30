import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  margin: 0 10px 10px 0;
  width: 300px;
  min-height: 150px;
  font-size: 1.5rem;
  padding: 8px;
  border: 1px solid #666666;
  border-radius: 4px;
`;

export const Content = styled.div`
  border: 1px solid #666666;
  min-height: 100px;
  margin-bottom: 10px;

  > span {
    display: block;
  }

  > h1 {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export const ButtonsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  border: 1px solid #666666;
`;
