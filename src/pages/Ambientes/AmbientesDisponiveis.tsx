import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AmbientesDisponiveis = () => {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("Caldeira"); // Agora com nome, não ID
  const [turno, setTurno] = useState("manhã");
  const [disponibilidade, setDisponibilidade] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (data && location && turno) {
      const fetchDisponibilidade = async () => {
        try {
          const res = await api.get(
            `/bookings/availability?location=${location}&date=${data}&turno=${turno}`
          );
          setDisponibilidade(res.data.availableSpaces);
        } catch (error) {
          console.error("Erro ao buscar disponibilidade", error);
        }
      };
      fetchDisponibilidade();
    }
  }, [data, location, turno]);

  return (
    <div>
      <h2>Consultar Disponibilidade</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Caldeira">Caldeira</option>
          <option value="EQTLAB">EQTLAB</option>
        </select>

        <select value={turno} onChange={(e) => setTurno(e.target.value)}>
          <option value="manhã">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="integral">Integral</option>
        </select>

        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      </div>

      {disponibilidade.length > 0 && (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Sala</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {disponibilidade.map((sala: any) => (
              <tr key={sala.id}>
                <td>{sala.name}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/reservas/novo?spaceId=${sala.id}&spaceName=${sala.name}&date=${data}&turno=${turno}`)
                    }
                  >
                    Reservar aqui
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AmbientesDisponiveis;
