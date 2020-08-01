import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #171c35;
    text-align: center;
    margin-bottom: 80px;
    line-height: 56px;
    font-weight: 600;
    font-size: 42px;
    letter-spacing: -0.02em;
  }

  h4 {
    text-align: center;
    margin-bottom: 40px;
  }

  input {
    margin-bottom: 16px;
  }

  form {
    width: 100%;
    max-width: 400px;
    padding: 0 40px;
    background: white;
    box-shadow: -1px 3px 12px rgba(12, 11, 14, 0.25);
    border-radius: 3px;
    padding: 40px 48px 24px;

    span {
      display: block;
      margin: 0 auto;
      color: brown;
    }
  }

  button {
    display: block;
    margin: 0 auto;
    margin-top: 40px;
    width: 97px;
  }
`;
