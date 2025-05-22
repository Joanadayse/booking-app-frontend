import axios from "axios";
import type { LoginData, User } from "../models/auth";
import type { Booking } from "../models/booking";


export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});


export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
};


export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>("/bookings");
  return response.data;
};