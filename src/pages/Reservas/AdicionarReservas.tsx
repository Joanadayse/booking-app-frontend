import { useEffect, useState } from "react";
import type { Booking} from "../../models/booking";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { api, getSpaces } from "../../services/api";
import type { Space } from "../../models/space";

const AdicionarReservas = () => {
 const [spaces, setSpaces] = useState<Space[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    turno: "manhã",
    user_id: 1, // ajustar de acordo com o usuário logado
    space_id: 0
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await getSpaces();
        setSpaces(data);
      } catch (error) {
        setMensagem("Erro ao carregar ambientes.");
      }
    };
    fetchSpaces();
  }, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: (name === "space_id" || name === "user_id") ? Number(value) : value
  }));
};



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Verifica se já existe reserva para o mesmo espaço, data e turno
    const response = await api.get<Booking[]>("/bookings", {
      params: {
        date: form.date,
        space_id: form.space_id,
        turno: form.turno
      }
    });

    if (response.data.length > 0) {
      setMensagem("Já existe uma reserva para esse espaço, data e turno.");
      return;
    }

    await api.post<Booking>("/bookings", form);
    setMensagem("Reserva criada com sucesso!");
    setForm({
      title: "",
      description: "",
      date: "",
      turno: "manhã",
      user_id: 1,
      space_id: 0
    });
  } catch (error) {
    setMensagem("Erro ao criar a reserva.");
  }
};


  return (
    <DefaultLayout>
      <h1>Nova Reserva</h1>

      {mensagem && <p>{mensagem}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
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

        <button type="submit">Criar Reserva</button>
      </form>
      </DefaultLayout>
  );
};

export default AdicionarReservas;