import { useEffect, useState } from "react";
import { DefaultLayout } from "../../styles/DefaultLayout";
import { getSpaces } from "../../services/api";
import { Link } from "react-router-dom";
import type { Space } from "../../models/space";
import SpaceCard from "../../componets/SpaceCard";

const Ambientes = () => {
  const [spaces, setSpaces] = useState<Space[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await getSpaces();
        setSpaces(data);
      } catch (error) {
        setError("Erro ao carregar os ambientes.");
      }
    };

    fetchSpaces();
  }, []);

  return (
    <DefaultLayout>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>
          Página de Ambientes
        </h1>

        <Link to="/ambientes/novo">
          <button style={{ marginBottom: "20px" }}>Adicionar Novo Ambiente</button>
        </Link>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {spaces?.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Ambientes;
