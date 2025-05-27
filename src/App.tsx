import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

import Ambientes from "./pages/Ambientes/Ambientes";
import Historico from "./pages/Historico/Historico";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import AdicionarReservas from "./pages/Reservas/AdicionarReservas";
import EditarReserva from "./pages/Reservas/EditarReserva";
import AdicionarAmbiente from "./pages/Ambientes/AdicionarAmbiente";
import { ListaReservas } from "./pages/Reservas/ListaReservas";
import { ReservasPorLocal } from "./pages/Reservas/ReservasPorLocal ";
import { RelatorioReservas } from "./pages/Reservas/RelatorioReservas";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/reservas" element={<ListaReservas />} />
        <Route  path="/reservas/novo" element={<AdicionarReservas/>}  />
        <Route  path="/reservas/editar/:id" element={<EditarReserva/>} />
        <Route path="/reservas/local/:locationId" element={<ReservasPorLocal />} />
        <Route path="/reservas/relatorio" element={<RelatorioReservas />} />


        
        <Route path="/ambientes" element={<Ambientes />} />
        <Route  path="/ambientes/novo" element={<AdicionarAmbiente/>}  />

        <Route path="/historico" element={<Historico />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
