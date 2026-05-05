import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add" element={<AddCar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<EditCar />} />
      </Routes>
  );
}

export default App;
