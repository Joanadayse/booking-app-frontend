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
  };
}
