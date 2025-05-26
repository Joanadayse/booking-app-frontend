import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Reserva } from "../types/reservas";

interface FiltroParams {
  startDate?: string;
  endDate?: string;
  turno?: string;
  spaceId?: string;
}

interface FiltroReservasProps {
  onFiltrar: (params: FiltroParams) => void;
reservas: Reserva[];
}

interface Espaco {
  id: number;
  name: string;
  location: string;
}

const FiltroReservas: React.FC<FiltroReservasProps> = ({ onFiltrar }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [turno, setTurno] = useState("");
  const [spaceId, setSpaceId] = useState("");
  const [espacos, setEspacos] = useState<Espaco[]>([]); // <-- tipado corretamente

useEffect(() => {
  axios.get("/api/spaces").then((res) => {
    const data = Array.isArray(res.data) ? res.data : res.data.data;
    setEspacos(data);
  });
}, []);



  const handleFiltrar = () => {
    const params: FiltroParams = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (turno) params.turno = turno;
    if (spaceId) params.spaceId = spaceId;

    onFiltrar(params);
  };

  return (
    <div>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <select value={turno} onChange={(e) => setTurno(e.target.value)}>
        <option value="">Todos os turnos</option>
        <option value="manhã">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="integral">Integral</option>
      </select>
      <select value={spaceId} onChange={(e) => setSpaceId(e.target.value)}>
        <option value="">Todos os espaços</option>
        {espacos.map((espaco) => (
          <option key={espaco.id} value={espaco.id}>
            {espaco.name} - {espaco.location}
          </option>
        ))}
      </select>
      <button onClick={handleFiltrar}>Filtrar</button>
    </div>
  );
};

export default FiltroReservas;
