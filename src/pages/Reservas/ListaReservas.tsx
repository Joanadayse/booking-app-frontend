import { useEffect, useState } from "react";
import { DefaultLayout } from "../../styles/DefaultLayout";

import type { Booking } from "../../models/booking";
import { api, getBookings } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

 const ListaReservas = () => {
    const navigate = useNavigate();
  const [reservas, setBookings] = useState<Booking[]>([]);
  const [reservaSelecionada, setReservaSelecionada] = useState<Booking | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [salaFiltro, setSalaFiltro] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookings();
      setBookings(data);
    };
    fetchData();
  }, []);

  function normalizeTime(time: string): string {
    return time?.slice(0, 5);
  }

  function getTurno(start_time: string, end_time: string): "manh\u00e3" | "tarde" | "integral" | "personalizado" {
    const start = normalizeTime(start_time);
    const end = normalizeTime(end_time);
    if (start === "08:00" && end === "12:00") return "manh\u00e3";
    if (start === "13:00" && end === "17:00") return "tarde";
    if (start === "08:00" && end === "17:00") return "integral";
    return "personalizado";
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar esta reserva?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(reservas.filter(r => r.id !== id));
    } catch {
      alert("Erro ao deletar a reserva.");
    }
  };

  function abrirModal(reserva: Booking) {
    setReservaSelecionada(reserva);
    setModalAberto(true);
  }

  function fecharModal() {
    setReservaSelecionada(null);
    setModalAberto(false);
  }

  const reservasFiltradas = reservas.filter(reserva => {
    const salaOk = salaFiltro === "" || reserva.Space?.name === salaFiltro;
    const dataOk =
      (dataInicio === "" || reserva.date >= dataInicio) &&
      (dataFim === "" || reserva.date <= dataFim);
    return salaOk && dataOk;
  });

  return (
    <DefaultLayout>
      <h1>Todas as Reservas</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select value={salaFiltro} onChange={(e) => setSalaFiltro(e.target.value)}>
          <option value="">Todas as salas</option>
          {Array.from(new Set(reservas.map(reserva => reserva.Space?.name))).map((sala) => (
            <option key={sala} value={sala}>{sala}</option>
          ))}
        </select>
        <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Sala</th>
              <th>Responsável</th>
              <th>Data</th>
              <th>Titulo</th>
              <th>Turno</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.Space ? reserva.Space.name : "Sala n\u00e3o definida"}</td>
                <td>{reserva.User ? reserva.User.name : "Respons\u00e1vel n\u00e3o definido"}</td>
                <td>{reserva.date}</td>
                <td>{reserva.title}</td>
                <td>{getTurno(reserva.start_time, reserva.end_time)}</td>
                <td style={{ display: "flex", gap: "0.5rem" }}>
                  <FaEye style={{ cursor: "pointer", color: "#28a745" }} title="Visualizar reserva" onClick={() => abrirModal(reserva)} />
                  <Link to={`/reservas/editar/${reserva.id}`}>
                    <FaEdit style={{ cursor: "pointer", color: "#007bff" }} title="Editar reserva" />
                  </Link>
                  <FaTrash style={{ cursor: "pointer", color: "#dc3545" }} title="Excluir reserva" onClick={() => handleDelete(reserva.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/reservas/novo">
          <button style={{ marginBottom: "1rem" , marginLeft: "1rem" }}>Nova Reserva</button>
        </Link>
        <Link to="/reservas/relatorio">
          <button style={{ marginBottom: "1rem", marginLeft: "1rem" }}>Relatorio</button>
        </Link>
         <button style={{ marginBottom: "1rem", marginLeft: "1rem" }} onClick={() => navigate("/disponibilidade")}>
        Ver Ambientes Disponíveis
      </button>
      </div>

      {modalAberto && reservaSelecionada && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            backgroundColor: "white", padding: "2rem", borderRadius: "8px", width: "90%", maxWidth: "500px"
          }}>
            <h2>Detalhes da Reserva</h2>
            <p><strong>Sala:</strong> {reservaSelecionada.Space?.name}</p>
            <p><strong>Data:</strong> {reservaSelecionada.date}</p>
            <p><strong>Turno:</strong> {getTurno(reservaSelecionada.start_time, reservaSelecionada.end_time)}</p>
            <p><strong>Descrição</strong> {reservaSelecionada.description}</p>
            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};


export default ListaReservas;
