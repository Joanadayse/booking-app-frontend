import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { createSpace } from "../../services/api";

const AdicionarAmbiente = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSpace({
        name: form.name,
        location: form.location,
        capacity: Number(form.capacity)
      });
      alert("Ambiente adicionado com sucesso!");
      navigate("/ambientes");
    } catch (error) {
      alert("Erro ao adicionar ambiente.");
    }
  };

  return (
    <DefaultLayout>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Adicionar Ambiente</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Nome:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="location"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Local:
          </label>
          <select
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              backgroundColor: "white",
              cursor: "pointer"
            }}
          >
            <option value="">Selecione um local</option>
            <option value="Caldeira">Caldeira</option>
            <option value="EQTLAB">EQTLAB</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="capacity"
            style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}
          >
            Capacidade:
          </label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            min={1}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Adicionar
        </button>
      </form>
    </DefaultLayout>
  );
};

export default AdicionarAmbiente;
