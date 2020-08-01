import styled from 'styled-components';

export const Container = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ButtonsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
`;

export const Form = styled.form`
  > label {
    display: block;
  }

  > input {
    margin: 10px;
  }
`;
