// src/styles/theme.ts



// Defina as cores da sua paleta
const colors = {
  // Primary - Extendida
  primary: {
    default: '#8C2B8F', // primary-default
    dark: '#762077',    // primary-dark
    mediumLight: '#AE24C3', // primary-medium-light (ajustado de #AE24C3 para ser mais fiel à imagem)
    light: '#FF3EFB',   // primary-light (ajustado de #FF3EFB para ser mais fiel à imagem)
  },
  // Secondary - Extendida
  secondary: {
    default: '#5AF2FF', // secondary-default (ajustado para o roxo do figma)
    dark: '#5AF2FF',    // secondary-dark (ajustado para o roxo mais escuro)
    light: '#5AF2FF',   // secondary-light (ajustado para o roxo mais claro)
  },
  // Neutral Colors
  neutral: {
    '700': '#000000', // neutral-700 (preto)
    '600': '#314156', // neutral-600 (cinza escuro)
    '500': '#4D5D6E', // neutral-500 (cinza médio)
    '400': '#738196', // neutral-400 (cinza claro)
    '300': '#A0AABB', // neutral-300 (cinza muito claro)
    '200': '#C1C8D2', // neutral-200 (cinza quase branco)
    '100': '#E1E6ED', // neutral-100 (cinza bem claro)
    '50': '#F0F3F7',  // neutral-50 (cinza mais claro ainda, quase branco)
    white: '#FFFFFF',
  },
  // Auxiliary Palette (Feedback)
  feedback: {
    negative: '#F27474',
    warning: '#F8BC74',
    informational: '#74B9F2',
    successful: '#41B24B',
  },
  // Card Colors
  cards: {
    purple: {
      default: '#9B51E0', // purple-default
      medium: '#C0CCF4', // purple-medium
      light: '#E7F2FF',  // purple-light
    },
    yellow: {
      default: '#FFC107', // yellow-default
      medium: '#FFE59B', // yellow-medium
      light: '#FFF9D9',  // yellow-light
    },
    blue: {
      default: '#327EFF', // blue-default
      medium: '#D3E6FF', // blue-medium
      light: '#B0D8FF',  // blue-light (ajustado de #E6F3FF para algo mais próximo do Figma)
    },
  },
};

// Se você tiver outros valores de tema (fontes, tamanhos, breakpoints), pode adicioná-los aqui
const theme = {
  colors,
  // fonts: {
  //   primary: 'Roboto, sans-serif',
  //   secondary: 'Open Sans, sans-serif',
  // },
  // breakpoints: {
  //   mobile: '768px',
  //   tablet: '1024px',
  // },
};

export default theme;