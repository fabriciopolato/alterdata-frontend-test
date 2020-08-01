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
    background-color: rgb(237,239,247);
  }

  html {
    color: #171C35;
    font-size: 10px;
    font-family: 'Work Sans', sans-serif;
    letter-spacing: -0.3px;
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
    font: 1.6rem 'Work Sans', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    color: white;
    font-weight: 600;
    font-size: 38px;
    line-height: 48px;
  }

  h4 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }

  small {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
  }

  button {
    cursor: pointer;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 4px;
    color: white;
    text-transform: uppercase;
    padding: 8px 0;
    width: 220px;
    font-weight: 600;
    line-height: 24px;
  }
`;
