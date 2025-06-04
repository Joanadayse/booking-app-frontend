import { useEffect, useState } from "react";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { api } from "../../services/api";
import type { Stats } from "../../models/stats";




const Historico = () => {

  const [stats, setStats] = useState<Stats | null>(null);
const [location, setLocation] = useState("Caldeira");


  useEffect(() => {
const fetchStats = async () => {
  try {
    const response = await api.get(`/bookings/stats?location=${location}`);
    console.log("📊 Dados recebidos no frontend:", response.data);
    setStats(response.data);
  } catch (error) {
    console.error("❌ Erro ao buscar dados:", error);
  }
};

  fetchStats();
}, [location]); // 🔹 A cada mudança de `location`, a API é consultada novamente

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setLocation(event.target.value);
};


  return (
      <DefaultLayout>
        <h1 style={{ borderBottom: "2px solid #007bff", paddingBottom: "5px", marginBottom: "20px" }}>
 Histórico
</h1>

 <div>
    <label>Filtrar por Local:</label>
    <select value={location} onChange={handleChange}>
      <option value="Caldeira">Caldeira</option>
      <option value="EQTLAB">EQTLAB</option>
    </select>
  </div>


<h2>Reservas por Sala ({location})</h2>
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

<h2>Reservas por Turno ({location})</h2>
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

<h2>Reservas por Mês ({location})</h2>
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
