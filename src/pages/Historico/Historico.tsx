import { useEffect, useState } from "react";
import { DefaultLayout } from "../../styles/DefaultLayout";
import type { Stats } from "../../types/reservas";
import { api } from "../../services/api";




const Historico = () => {

  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get("/bookings/stats");
      setStats(response.data);
    };

    fetchStats();
  }, []);

  return (
      <DefaultLayout>
        <h2 style={{ borderBottom: "2px solid #007bff", paddingBottom: "5px", marginBottom: "20px" }}>
  Reservas por Sala
</h2>

<table>
  <thead>
    <tr><th>Sala</th><th>Total de Reservas</th></tr>
  </thead>
  <tbody>
    {stats?.totalReservasPorSala.map(({ Space, total }) => (
      <tr key={Space.name}>
        <td>{Space.name}</td>
        <td>{total}</td>
      </tr>
    ))}
  </tbody>
</table>

<h2 style={{ borderBottom: "2px solid #28a745", paddingBottom: "5px", marginBottom: "20px" }}>
  Reservas por Turno
</h2>

<table>
  <thead>
    <tr><th>Turno</th><th>Total de Reservas</th></tr>
  </thead>
  <tbody>
    {stats?.totalReservasPorTurno.map(({ turno, total }) => (
      <tr key={turno}>
        <td>{turno}</td>
        <td>{total}</td>
      </tr>
    ))}
  </tbody>
</table>

<h2 style={{ borderBottom: "2px solid #dc3545", paddingBottom: "5px", marginBottom: "20px" }}>
  Reservas por Mês
</h2>

<table>
  <thead>
    <tr><th>Mês</th><th>Total de Reservas</th></tr>
  </thead>
  <tbody>
    {stats?.totalReservasPorMes.map(({ mes, total }) => (
      <tr key={mes}>
        <td>{mes.slice(0, 10)}</td>
        <td>{total}</td>
      </tr>
    ))}
  </tbody>
</table>
      </DefaultLayout>
  );
};

export default Historico;
