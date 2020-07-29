import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  html, body, #root {
    width: 100vw;
    max-width: 100%;
    min-height: 100vh;
  }

  html {
    font-size: 10px;
    font-family: 'Raleway', serif;
    letter-spacing: 1px;
  }

  body {
    -webkit-font-smoothing: antialiased;
    scrollbar-width: thin;
    scrollbar-color: #90A4AE #CFD8DC;
  }

  body::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  body::-webkit-scrollbar-track {
    background: #CFD8DC
  }

  body::-webkit-scrollbar-thumb {
    background-color: #90A4AE  ;
    border-radius: 12px;
    border: 4px solid #CFD8DC
  }

  body, input, button {
    font: 1.6rem 'Raleway', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
