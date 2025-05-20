import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Reservas } from "./pages/Bookings/Reservas";
import Ambientes from "./pages/Ambientes/Ambientes";
import Historico from "./pages/Historico/Historico";
import { Dashboard } from "./pages/Dashboard/Dashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reservas" element={<Reservas />} />
        
        <Route path="/ambientes" element={<Ambientes />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
