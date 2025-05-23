import { useEffect, useState } from "react";

import { DefaultLayout } from "../../styles/DefaultLayout";
import type { Space } from "../../models/booking";
import { getSpaces } from "../../services/api";

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
  <h1>PÁGINA DE AMBIENTES</h1>
  {error && <p>{error}</p>}
  {spaces?.map(space => (
    <div key={space.id}>
      <h2>{space.name}</h2>
      <p>Local: {space.location}</p>
      <p>Capacidade: {space.capacity}</p>
    </div>
  ))}
</DefaultLayout>

  );
};

export default Ambientes;
