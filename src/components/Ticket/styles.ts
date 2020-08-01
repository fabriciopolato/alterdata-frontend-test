import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: 24px 16px;
  width: 96%;
  min-height: 150px;
  font-size: 1.5rem;
  border: 1px solid #f2f1fd;
  box-shadow: -1px 3px 12px rgba(12, 11, 14, 0.15);
  border-radius: 3px;
`;

export const Content = styled.div`
  min-height: 100px;
  margin-bottom: 10px;

  > p {
    padding-bottom: 16px;
  }

  > small {
    display: block;
    margin-bottom: 8px;
  }

  > small:first-of-type {
    display: block;
    padding-top: 16px;
  }

  > small:last-of-type {
    display: block;
    margin-bottom: 32px;
  }

  > span {
    display: block;
  }

  > h1 {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export const ButtonsSection = styled.div`
  svg {
    margin-right: 8px;
    align-self: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 8px;
  }
`;

interface IProps {
  deleted_at: string;
}

export const LastComment = styled.div<IProps>`
  border: 1px solid ${props => (props.deleted_at ? '#7D6536' : '#30a697')};
  border-radius: 3px;
  padding: 8px 16px;

  > small {
    display: block;
    line-height: 20px;
  }
`;
