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
    background-color: #ccc;
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
    width: 12px;
    height: 12px;
  }

  body::-webkit-scrollbar-track {
    background: rgb(207,216,220,0.5)
  }

  body::-webkit-scrollbar-thumb {
    background-color: rgb(100,100,100, 0.4);
    border-radius: 12px;
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
