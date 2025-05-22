import { useEffect, useState } from "react";
import { DefaultLayout } from "../../styles/DefaultLayout";

import type { Booking } from "../../models/booking";
import { getBookings } from "../../services/api";






export const ListaReservas = () => {
  const [reservas, setBookings] = useState<Booking[]>([]);




  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookings();
      setBookings(data);
    };

    fetchData();
  }, []);

function normalizeTime(time: string): string {
  return time?.slice(0, 5); // pega apenas os 5 primeiros caracteres (ex: "08:00")
}

function getTurno(start_time: string, end_time: string): "manhã" | "tarde" | "integral" | "personalizado" {
  const start = normalizeTime(start_time);
  const end = normalizeTime(end_time);

  if (start === "08:00" && end === "12:00") return "manhã";
  if (start === "13:00" && end === "17:00") return "tarde";
  if (start === "08:00" && end === "17:00") return "integral";
  return "personalizado";
}




  return (
    <DefaultLayout>
      <h1>Reservas</h1>
  
  {/* Evitar que <tbody> esteja direto dentro de <main> */}
  <div>
    <table>
      <thead>
        <tr>
          <th>Sala</th>
          <th>Responsável</th>
          <th>Data</th>
          <th>Turno</th>
        </tr>
      </thead>
    
  <tbody>
  {reservas.map((reserva) => (
    <tr key={reserva.id}>
       <td>{reserva.Space ? reserva.Space.name : "Sala não definida"}</td>
       <td>{reserva.User ? reserva.User.name : "Responsável não definido"}</td>
      <td>{reserva.date}</td>
      <td>{getTurno(reserva.start_time, reserva.end_time)}</td>




    </tr>
  ))}

</tbody>
    </table>
  </div>


     

    </DefaultLayout>
        
     
  );
};
