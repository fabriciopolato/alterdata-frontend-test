import styled from 'styled-components';
import { Form as StyledForm } from '@unform/web';

interface IProps {
  color: string;
}

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

export const Form = styled(StyledForm)`
  padding: 0 40px 24px;
  width: 100%;
  /* 
  > label {
    display: block;
  }

  > input {
    margin: 10px;
  } */
`;
export const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

export const CardComment = styled.div`
  small {
    font-size: 1.4rem;
    line-height: 20px;
  }

  margin: 8px 0;
  border: 1px solid #dedcfc;
  border-radius: 3px;
  padding: 8px;
  color: #171c35;
  line-height: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    font-family: Work Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    align-items: center;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
    color: #171c35;
  }

  textarea {
    display: block;
    width: 100%;
    padding: 15px;
    background: #ffffff;
    border: 1px solid #c8c6e3;
    border-radius: 3px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 1.6rem;
    line-height: 20px;
    /* letter-spacing: -0.02em; */
    color: #68696a;
    resize: none;

    ::placeholder {
    }
  }
`;

export const ModalHeader = styled.header<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 536px;
  height: 80px;
  background: ${props => props.color};
  border-radius: 3px 3px 0px 0px;
  margin-bottom: 32px;
`;
