import axios from "axios";
import type { LoginData, User } from "../models/auth";
import type {  Booking} from "../models/booking";
import type { CreateSpaceData, Space } from "../models/space";

console.log("API URL:", import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona o token em todas as requisições se estiver presente
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login ou exibir alerta
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);



export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
};


export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>("/bookings");
  return response.data;
};

export const getSpaces = async (): Promise<Space[]> => {
  const response = await api.get<Space[]>("/spaces");
  return response.data;
};

export const createSpace = async (space: CreateSpaceData): Promise<Space> => {
  const response = await api.post<Space>("/spaces", space);
  return response.data;
};
