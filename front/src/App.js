import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CarDetails from "./pages/CarDetails";
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add" element={<AddCar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<EditCar />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  );
}

export default App;
