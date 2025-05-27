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

input,
  select {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
    outline: none;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}



`;
