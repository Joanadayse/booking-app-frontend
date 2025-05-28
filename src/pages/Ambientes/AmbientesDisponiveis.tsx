import { useState, useEffect } from "react";
import { api } from "../../services/api";


export const AmbientesDisponiveis = () => {
  const [data, setData] = useState("");
  const [locationId, setLocationId] = useState("2"); // EQTLAB por padrão
  const [disponibilidade, setDisponibilidade] = useState([]);

  useEffect(() => {
    if (data) {
      const fetchDisponibilidade = async () => {
        const res = await api.get(`/availability?location_id=${locationId}&date=${data}`);
        setDisponibilidade(res.data);
      };
      fetchDisponibilidade();
    }
  }, [data, locationId]);

  return (
    <div>
      <h2>Consultar Disponibilidade</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
          <option value="1">Caldeira</option>
          <option value="2">EQTLAB</option>
        </select>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      </div>

      {disponibilidade.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Sala</th>
              <th>Horários Disponíveis</th>
              <th>Horários Ocupados</th>
            </tr>
          </thead>
          <tbody>
            {disponibilidade.map((sala: any) => (
              <tr key={sala.space_id}>
                <td>{sala.space_name}</td>
                <td>{sala.available_hours.join(", ") || "Nenhum horário disponível"}</td>
                <td>{sala.booked_hours.join(", ") || "Nenhuma reserva"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
