import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Reserva } from "../../types/reservas";
import { DefaultLayout } from "../../styles/DefaultLayout";

export const ReservasPorLocal = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchReservas = async () => {
      try {
         console.log("Buscando reservas para:", locationId);
       const response = await axios.get(`http://localhost:5000/api/bookings/location/${locationId}`);
        console.log("Dados recebidos:", response.data);
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [locationId]);

  return (
    <DefaultLayout>
    <div style={{ padding: "2rem" }}>
      <h2>Reservas do Local ID {locationId}</h2>
      {loading ? (
        <p>Carregando reservas...</p>
      ) : (
        <>
          {reservas.length === 0 ? (
            <p>Nenhuma reserva encontrada para este local.</p>
          ) : (
            <ul>
             {reservas.map(reserva => (
  <div key={reserva.id}>
    <h3>{reserva.title}</h3>
    <p>Espaço: {reserva.Space?.name}</p>
    <p>Usuário: {reserva.User?.name}</p>
    <p>Data: {reserva.date}</p>
  </div>
))}

            </ul>
          )}
        </>
      )}
    </div>
    </DefaultLayout>
  );
};
