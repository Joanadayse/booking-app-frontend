export interface Space {
  id: number;
  name: string;
  type: string;
  location: string;
  capacity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Booking {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  turno: string; // <-- adicione aqui
  user_id: number;
  space_id: number;
  createdAt: string;
  updatedAt: string;
  Space?: { name: string; location: string; };
  User?: { name: string; email: string; };
}

