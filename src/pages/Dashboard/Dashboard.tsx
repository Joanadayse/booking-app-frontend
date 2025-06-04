import { useEffect, useState } from "react";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { api } from "../../services/api";
import { Bar, Line, Pie } from "react-chartjs-2";


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
import type { Stats } from "../../models/stats";


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




export const Dashboard = () => {
  const [location, setLocation] = useState("Caldeira");
  const [stats, setStats] = useState<Stats | null>(null);


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setLocation(event.target.value);
};


useEffect(() => {
 const fetchStats = async () => {
  try {
    const response = await api.get(`/bookings/stats?location=${location}`);
    console.log("📊 Dados recebidos no frontend:", response.data); // 🔹 Depuração
    setStats(response.data);
  } catch (error) {
    console.error("❌ Erro ao buscar dados:", error);
  }
};

  fetchStats();
}, [location]);

const barData = stats?.totalReservasPorSala?.length > 0 ? {
  labels: stats.totalReservasPorSala.map(s => s.Space?.name || "Sem Nome"), // 🔹 Garantindo que Space existe
  datasets: [{
    label: "Reservas por Sala",
    data: stats.totalReservasPorSala.map(s => Number(s.total)), 
    backgroundColor: "rgba(75, 192, 192, 0.6)"
  }]
} : { labels: ["Nenhum dado"], datasets: [{ label: "Sem dados", data: [1], backgroundColor: ["#CCCCCC"] }] };

const normalizeTurno = (turno) => turno.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const turnosAgrupados = stats?.totalReservasPorTurno?.reduce((acc, t) => {
  const turnoNormalizado = normalizeTurno(t.turno);
  acc[turnoNormalizado] = (acc[turnoNormalizado] || 0) + Number(t.total);
  return acc;
}, {});

const pieData = turnosAgrupados && Object.keys(turnosAgrupados).length > 0 ? {
  labels: Object.keys(turnosAgrupados),
  datasets: [{
    label: "Reservas por Turno",
    data: Object.values(turnosAgrupados),
    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
  }]
} : { labels: ["Nenhum dado"], datasets: [{ label: "Sem dados", data: [1], backgroundColor: ["#CCCCCC"] }] };

const lineData = stats?.totalReservasPorMes?.length > 0 ? {
  labels: stats.totalReservasPorMes.map(m => 
    new Date(m.mes).toLocaleDateString("pt-BR", { year: "numeric", month: "long" })
  ),
  datasets: [{
    label: "Reservas por Mês",
    data: stats.totalReservasPorMes.map(m => Number(m.total)), 
    borderColor: "#007bff",
    fill: false
  }]
} : { labels: ["Nenhum dado"], datasets: [{ label: "Sem dados", data: [1], borderColor: "#CCCCCC" }] };







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
