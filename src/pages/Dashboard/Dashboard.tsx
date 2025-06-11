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
        console.log("📊 Dados recebidos:", response.data); // 🔹 Depuração
        setStats(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar dados:", error);
      }
    };

    fetchStats();
  }, [location]);

  // 🔹 Normalização dos turnos (para evitar erro entre "manha" e "manhã")
  const normalizeTurno = (turno: string) =>
    turno.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 🔹 Configuração do gráfico de Barras (Reservas por Sala)
 const barData = stats?.totalReservasPorSala?.length ? {
  labels: stats.totalReservasPorSala.map((s) => s.Space?.name || "Sem Nome"),
  datasets: [{
    label: "Reservas por Sala",
    data: stats.totalReservasPorSala.map((s) => Number(s.total)), 
    backgroundColor: "rgba(75, 192, 192, 0.6)"
  }]
} : { labels: ["Nenhum dado"], datasets: [{ label: "Sem dados", data: [1], backgroundColor: ["#CCCCCC"] }] };

const pieData = stats ? {
  labels: stats.totalReservasPorTurno.map(t => t.turno),
  datasets: [{ label: "Reservas por Turno", data: stats.totalReservasPorTurno.map(t => t.total), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }]
} : { labels: [], datasets: [] };

  // 🔹 Configuração do gráfico de Linhas (Reservas por Mês)
const lineData = stats?.totalReservasPorMes && stats.totalReservasPorMes.length > 0 ? {
  labels: stats.totalReservasPorMes.map(m => 
    new Date(m.mes).toLocaleDateString("pt-BR", { year: "numeric", month: "long" })
  ),
  datasets: [{
    label: "Reservas por Mês",
    data: stats.totalReservasPorMes.map(m => Number(m.total)), // 🔹 Garantindo que os valores sejam números
    borderColor: "#007bff",
    backgroundColor: "rgba(0, 123, 255, 0.2)", 
    fill: true,
    tension: 0.4, // 🔹 Adicionando suavização para melhor exibição
    pointRadius: stats.totalReservasPorMes.length === 1 ? 5 : 3 // 🔹 Garante que um único ponto fique visível
  }]
} : { labels: ["Nenhum dado"], datasets: [{ label: "Sem dados", data: [0], borderColor: "#CCCCCC", fill: false }] };

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
        <Bar key={`bar-${location}`} data={barData} />
      </div>

      <h2>Reservas por Turno ({location})</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <Pie key={`pie-${location}`} data={pieData} />
      </div>

      <h2>Reservas por Mês ({location})</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <Line key={`line-${location}`} data={lineData} />
      </div>
    </DefaultLayout>
  );
};