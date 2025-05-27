export interface Reserva {
  id: number;
  user_id: number;
  space_id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  turno: string;
  createdAt: string;
  updatedAt: string;
  Space?: {
    name: string;
    location: string;
  };
  User?: {
    name: string;
    email: string;
  };
}


export interface Stats {
  totalReservasPorSala: { space_id: number; total: number; Space: { name: string } }[];
  totalReservasPorTurno: { turno: string; total: number }[];
  totalReservasPorMes: { mes: string; total: number }[];
}


// export type Stats = {
//   totalReservasPorSala: { Space: { name: string }; total: number }[];
//   totalReservasPorTurno: { turno: string; total: number }[];
//   totalReservasPorMes: { mes: string; total: number }[];
// };
