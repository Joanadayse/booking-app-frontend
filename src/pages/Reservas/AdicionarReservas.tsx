import { useEffect, useState } from "react";
import type { Booking } from "../../models/booking";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { api, getSpaces } from "../../services/api";
import type { Space } from "../../models/space";
import { useSearchParams } from "react-router-dom";

const AdicionarReservas = () => {
  const [searchParams] = useSearchParams();

  const [spaces, setSpaces] = useState<Space[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: searchParams.get("date") || "",
    turno: "manha",
    user_id: 1, // ou o ID real do usuário logado
    space_id: Number(searchParams.get("spaceId")) || 0
  });

  const [mensagem, setMensagem] = useState("");
  const spaceNameFromURL = searchParams.get("spaceName");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
  ...prev,
  [name]: (name === "space_id" || name === "user_id") ? Number(value) : value
}));

  };

  // console.log("📦 Reservas retornadas da API:", reservas);


  // Lógica de conflito de turno igual ao backend
const normalizeTurno = (turno: string): "manha" | "tarde" | "integral" => {
  const normalizado = turno
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (["manha", "tarde", "integral"].includes(normalizado)) {
    return normalizado as "manha" | "tarde" | "integral";
  }

  return "manha";
};



const haConflitoDeTurno = (turnoNovo: string, turnoExistente: string): boolean => {
  const turnosEquivalentes: Record<"manha" | "tarde" | "integral", string[]> = {
    manha: ["manha", "integral"],
    tarde: ["tarde", "integral"],
    integral: ["manha", "tarde", "integral"]
  };

  const novo = normalizeTurno(turnoNovo);
  const existente = normalizeTurno(turnoExistente);

  console.log(`🆚 Comparação de conflito no front-end: novo = ${novo}, existente = ${existente}`);

  return turnosEquivalentes[novo]?.includes(existente) && novo !== existente;
};


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
     setCarregando(true); 
console.log("Tentando enviar reserva com dados:");
console.log("Data:", form.date);
console.log("Turno:", form.turno);
console.log("Espaço ID:", form.space_id);


  // Validar ambiente selecionado
  if (!form.space_id) {
    setMensagem("Por favor, selecione um ambiente válido.");
    return;
  }

  try {
    // Buscar reservas já existentes no mesmo espaço e data
    const response = await api.get<Booking[]>("/bookings", {
      params: {
        date: form.date,
        space_id: form.space_id
      }
    });

    console.log("📋 Reservas existentes para essa data e espaço:", response.data);

    // Verificar conflito de turno usando função já definida
 const haConflito = response.data.some((reserva) => {
  console.log("🆚 Comparando com reserva existente:", reserva.turno);
  return haConflitoDeTurno(form.turno, reserva.turno);
});

    console.log("🔍 Turno do formulário:", form.turno);


if (haConflito) {
  setMensagem("Já existe uma reserva para esse espaço, data e turno conflitante.");
  console.warn("❌ Tentativa bloqueada devido a conflito.");
  return;
}


    // Criar reserva
    await api.post<Booking>("/bookings", form);

    setMensagem("Reserva criada com sucesso!");
    setForm({
      title: "",
      description: "",
      date: "",
      turno: "manha",
      user_id: 1,
      space_id: 0
    });
  } catch (error) {
    setMensagem("Erro ao criar a reserva.");
    setCarregando(false);
  }
};


  return (
    <DefaultLayout>
      <h1>Nova Reserva</h1>

      {mensagem && (
  <div style={{
    padding: "1rem",
    backgroundColor: mensagem.includes("sucesso") ? "#d4edda" : "#f8d7da",
    color: mensagem.includes("sucesso") ? "#155724" : "#721c24",
    borderRadius: "4px",
    border: "1px solid",
    borderColor: mensagem.includes("sucesso") ? "#c3e6cb" : "#f5c6cb"
  }}>
    {mensagem}
  </div>
)}

      {spaceNameFromURL && (
        <p><strong>Ambiente Selecionado:</strong> {spaceNameFromURL}</p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px"
        }}
      >
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
  <option value="manha">Manhã</option>
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

        <button type="submit" disabled={carregando}>
  {carregando ? "Enviando..." : "Criar Reserva"}
</button>

      </form>
    </DefaultLayout>
  );
};

export default AdicionarReservas;
