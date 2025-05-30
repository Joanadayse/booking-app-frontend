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
import { AmbientesDisponiveis } from "./pages/Ambientes/AmbientesDisponiveis";
import RequireAuth from "./services/RequireAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/reservas"
          element={
            <RequireAuth>
              <ListaReservas />
            </RequireAuth>
          }
        />
        <Route
          path="/reservas/novo"
          element={
            <RequireAuth>
              <AdicionarReservas />
            </RequireAuth>
          }
        />
        <Route
          path="/reservas/editar/:id"
          element={
            <RequireAuth>
              <EditarReserva />
            </RequireAuth>
          }
        />
        <Route
          path="/reservas/local/:locationId"
          element={
            <RequireAuth>
              <ReservasPorLocal />
            </RequireAuth>
          }
        />
        <Route
          path="/reservas/relatorio"
          element={
            <RequireAuth>
              <RelatorioReservas />
            </RequireAuth>
          }
        />

        <Route
          path="/ambientes"
          element={
            <RequireAuth>
              <Ambientes />
            </RequireAuth>
          }
        />
        <Route
          path="/ambientes/novo"
          element={
            <RequireAuth>
              <AdicionarAmbiente />
            </RequireAuth>
          }
        />
        <Route
          path="/disponibilidade"
          element={
            <RequireAuth>
              <AmbientesDisponiveis />
            </RequireAuth>
          }
        />

        <Route
          path="/historico"
          element={
            <RequireAuth>
              <Historico />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
