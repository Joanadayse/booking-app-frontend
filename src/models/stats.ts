export type Stats = {
  totalReservasPorSala: { Space: { name: string }; total: number }[];
  totalReservasPorTurno: { turno: string; total: number }[];
  totalReservasPorMes: { mes: string; total: number }[];
};


