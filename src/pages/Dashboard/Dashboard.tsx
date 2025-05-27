import { useEffect, useState } from "react";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { api } from "../../services/api";
import { Bar, Line, Pie } from "react-chartjs-2";
import type { Stats } from "../../types/reservas";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
} from "chart.js";

ChartJS.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);


// import type { Stats } from "../../models/stats";


// export type Stats = {
//   totalReservasPorSala: { Space: { name: string }; total: number }[];
//   totalReservasPorTurno: { turno: string; total: number }[];
//   totalReservasPorMes: { mes: string; total: number }[];
// };


export const Dashboard = () => {
  const [location, setLocation] = useState("Caldeira");
  const [stats, setStats] = useState<Stats | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setLocation(event.target.value);
};


useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await api.get(`/bookings/stats/location/${location}`);
      console.log("📊 Dados recebidos:", response.data); // 🔹 Verificar os dados da API
      setStats(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar dados:", error);
    }
  };

  fetchStats();
}, [location]);

const barData = stats ? {
  labels: stats.totalReservasPorSala.map(s => s.Space.name),
  datasets: [{ label: "Reservas por Sala", data: stats.totalReservasPorSala.map(s => s.total), backgroundColor: "rgba(75, 192, 192, 0.6)" }]
} : { labels: [], datasets: [] };

const pieData = stats ? {
  labels: stats.totalReservasPorTurno.map(t => t.turno),
  datasets: [{ label: "Reservas por Turno", data: stats.totalReservasPorTurno.map(t => t.total), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }]
} : { labels: [], datasets: [] };

const lineData = stats ? {
  labels: stats.totalReservasPorMes.map(m => m.mes.slice(0, 10)),
  datasets: [{
    label: "Reservas por Mês",
    data: stats.totalReservasPorMes.map(m => Number(m.total)), // 🔹 Convertendo para número
    borderColor: "#007bff",
    fill: false
  }]
} : { labels: [], datasets: [] };




  return (
 <DefaultLayout>
  <div>
    <h1>Dashboard de Reservas</h1>

    <label>Filtrar por Local:</label>
    <select value={location} onChange={handleChange}>
      <option value="Caldeira">Caldeira</option>
      <option value="EQTLAB">EQTLAB</option>
    </select>
  </div>

  <h2>Reservas por Sala ({location})</h2>

  {/* ✅ As props key abaixo garantem a recriação do gráfico ao trocar de local */}
  {/* <Bar key={`bar-${location}`} data={barData} />
  <Pie key={`pie-${location}`} data={pieData} />
  <Line key={`line-${location}`} data={lineData} /> */}

  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
  <Bar key={`bar-${location}`} data={barData}  />
</div>

<h2>Reservas por Turno ({location})</h2>

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
  <Pie key={`pie-${location}`} data={pieData}  />
</div>

<h2>Reservas por Mês ({location})</h2>

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
  <Line key={`line-${location}`} data={lineData}  />
</div>

</DefaultLayout>

  );
};
