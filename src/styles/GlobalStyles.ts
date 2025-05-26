import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  table {
  width: 100%;
  border-collapse: collapse; /* Remove espaços internos entre as bordas */
  margin-bottom: 2rem; /* Adiciona espaço entre tabelas */
}

th, td {
  border: 1px solid #ddd; /* Adiciona borda fina */
  padding: 12px; /* Aumenta espaçamento interno */
  text-align: left; /* Alinha o texto para esquerda */
}

th {
  background-color: #f4f4f4; /* Dá um destaque ao cabeçalho */
  font-weight: bold;
}



`;
