import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Reserva } from "../../types/reservas";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { FaTrash } from "react-icons/fa";

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

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta reserva?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      // Atualiza a lista após deletar
      setReservas(prev => prev.filter(reserva => reserva.id !== id));
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    }
  };

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
    <p>{reserva.id}</p>
    <p>Espaço: {reserva.Space?.name}</p>
    <p>Usuário: {reserva.User?.name}</p>
    <p>Data: {reserva.date}</p>
      {/* <button
                onClick={() => handleDelete(reserva.id)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <FaTrash /> Excluir
              </button> */}
      <button onClick={() => handleDelete(reserva.id)} style={{ color: "red",  padding: "0.5rem", border: "none", cursor: "pointer" }}>
         <FaTrash />
        </button> 
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
