// src/types/styled.d.ts

import 'styled-components'; // Importa styled-components para estender sua interface

// Importa o tipo do seu tema para que o TypeScript saiba a estrutura
// Você pode importar o tema diretamente ou definir a estrutura aqui
import type theme from '../styles/theme'; // Ajuste o caminho se necessário

// Crie uma interface que represente a estrutura do seu tema
// Isso é o que o TypeScript usará para inferir os tipos
type CustomTheme = typeof theme;

declare module 'styled-components' {
  // Extende a interface DefaultTheme
  // Agora, qualquer componente que use o tema terá essas propriedades tipadas
  export interface DefaultTheme extends CustomTheme {}
}