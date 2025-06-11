import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import RequireAuth from "./services/RequireAuth";
import Login from "./pages/Login/Login";
// import { ReservasPorLocal } from "./pages/Reservas/ReservasPorLocal ";

// 🚀 Agora carregamos os componentes dinamicamente!
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Ambientes = lazy(() => import("./pages/Ambientes/Ambientes"));
const Historico = lazy(() => import("./pages/Historico/Historico"));
const AdicionarReservas = lazy(() => import("./pages/Reservas/AdicionarReservas"));
const EditarReserva = lazy(() => import("./pages/Reservas/EditarReserva"));
const AdicionarAmbiente = lazy(() => import("./pages/Ambientes/AdicionarAmbiente"));
const ListaReservas = lazy(() => import("./pages/Reservas/ListaReservas"));
const ReservasPorLocal = lazy(() => import("./pages/Reservas/ReservasPorLocal "));
const RelatorioReservas = lazy(() => import("./pages/Reservas/RelatorioReservas"));
const AmbientesDisponiveis = lazy(() => import("./pages/Ambientes/AmbientesDisponiveis"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/reservas" element={<RequireAuth><ListaReservas /></RequireAuth>} />
          <Route path="/reservas/novo" element={<RequireAuth><AdicionarReservas /></RequireAuth>} />
          <Route path="/reservas/editar/:id" element={<RequireAuth><EditarReserva /></RequireAuth>} />
          <Route path="/reservas/local/:locationId" element={<RequireAuth><ReservasPorLocal/></RequireAuth>} />
          <Route path="/reservas/relatorio" element={<RequireAuth><RelatorioReservas /></RequireAuth>} />

          <Route path="/ambientes" element={<RequireAuth><Ambientes /></RequireAuth>} />
          <Route path="/ambientes/novo" element={<RequireAuth><AdicionarAmbiente /></RequireAuth>} />
          <Route path="/disponibilidade" element={<RequireAuth><AmbientesDisponiveis /></RequireAuth>} />

          <Route path="/historico" element={<RequireAuth><Historico /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;