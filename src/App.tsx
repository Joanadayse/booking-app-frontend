import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
};

export default App;
