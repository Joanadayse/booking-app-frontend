import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, getSpaces } from "../../services/api";
import { DefaultLayout } from "../../styles/DefaultLayout";
import type { Space, Booking } from "../../models/booking"; // importe suas interfaces



const EditarReserva = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState<Space[]>([]);
 const [form, setForm] = useState<Partial<Booking>>({
    title: "",
    description: "",
    date: "",
    turno: "manhã",
    user_id: 0,
    space_id: 0,
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await getSpaces(); // assume que retorna Space[]
        setSpaces(data);
      } catch {
        setMensagem("Erro ao carregar ambientes.");
      }
    };
    fetchSpaces();
  }, []);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await api.get<Booking>(`/bookings/${id}`);
        const data = response.data;
        setForm({
          title: data.title,
          description: data.description,
          date: data.date,
          turno: data.turno,
          user_id: data.user_id,
          space_id: data.space_id,
        });
      } catch {
        setMensagem("Erro ao carregar a reserva.");
      }
    };
    if (id) fetchReserva();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/bookings/${id}`, form);
      setMensagem("Reserva atualizada com sucesso!");
      navigate("/reservas");
    } catch {
      setMensagem("Erro ao atualizar a reserva.");
    }
  };

  return (
    <DefaultLayout>
      <h1>Editar Reserva</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <select name="turno" value={form.turno} onChange={handleChange}>
          <option value="manhã">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="integral">Integral</option>
        </select>
        <select name="space_id" value={form.space_id} onChange={handleChange} required>
          <option value="">Selecione um ambiente</option>
          {spaces.map(space => (
            <option key={space.id} value={space.id}>
              {space.name} - {space.location}
            </option>
          ))}
        </select>
        <button type="submit">Salvar</button>
      </form>
    </DefaultLayout>
  );
};

export default EditarReserva;
