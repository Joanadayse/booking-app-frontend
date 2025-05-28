import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DefaultLayout } from "../../styles/DefaultLayout";
import { FaTrash } from "react-icons/fa";
import { api } from "../../services/api";
import type { Booking } from "../../models/booking";

export const ReservasPorLocal = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [reservas, setReservas] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  


  
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        console.log("Buscando reservas para:", locationId);
        const response = await api.get(`/bookings/location/${locationId}`);
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
      await api.delete(`/bookings/${id}`);
      setReservas(prev => prev.filter(reserva => reserva.id !== id));
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    }
  };

  return (
    <DefaultLayout>
      <div style={{ padding: "2rem" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Reservas do Local ID {locationId}</h2>

        {loading ? (
          <p>Carregando reservas...</p>
        ) : reservas.length === 0 ? (
          <p>Nenhuma reserva encontrada para este local.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {reservas.map(reserva => (
              <div
                key={reserva.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  position: "relative"
                }}
              >
                <h3 style={{ marginBottom: "0.5rem" }}>{reserva.title}</h3>
                <p><strong>ID:</strong> {reserva.id}</p>
                <p><strong>Espaço:</strong> {reserva.Space?.name}</p>
                <p><strong>Usuário:</strong> {reserva.User?.name}</p>
                <p><strong>Data:</strong> {reserva.date}</p>

                <button
                  onClick={() => handleDelete(reserva.id)}
                  title="Excluir reserva"
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    color: "#d9534f",
                    cursor: "pointer",
                    fontSize: "1.2rem"
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </DefaultLayout>
  );
};
