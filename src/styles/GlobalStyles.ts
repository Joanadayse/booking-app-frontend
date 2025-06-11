// src/styles/global.ts

import { createGlobalStyle } from 'styled-components';
// import theme from './theme'; // Não precisa mais importar o tema aqui se não tiver background

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: transparent; /* Garante que não haja fundo padrão */
    /* REMOVA qualquer background gradiente ou cor aqui */
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* REMOVA qualquer background-color aqui */
    color: ${props => props.theme.colors.neutral['700']}; /* Mantenha a cor do texto padrão */
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;