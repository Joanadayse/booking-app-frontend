/// <reference types="vite/client" />


// src/vite-env.d.ts ou src/types.d.ts

/// <reference types="vite/client" />

// Declaração para módulos de imagem
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.bmp' {
  const value: string;
  export default value;
}

declare module '*.tiff' {
  const value: string;
  export default value;
}

declare module '*.ico' {
  const value: string;
  export default value;
}

// Se você estiver usando SVGs como componentes, pode precisar de algo assim
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
