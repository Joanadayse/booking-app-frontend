// export type Stats = {
//   totalReservasPorSala: { Space: { name: string }; total: number }[];
//   totalReservasPorTurno: { turno: string; total: number }[];
//   totalReservasPorMes: { mes: string; total: number }[];
// };

export interface Stats {
  totalReservasPorSala: { space_id: number; total: number; Space: { name: string } }[];
  totalReservasPorTurno: { turno: string; total: number }[];
  totalReservasPorMes: { mes: string; total: number }[];
}

