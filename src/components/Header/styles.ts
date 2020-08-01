import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 72px;
  background: white;
  padding: 0 48px;
  box-shadow: -1px 3px 12px rgba(12, 11, 14, 0.15);
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    border: 1px solid #36427d;
  }
`;
