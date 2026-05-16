
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CarDetails from "./pages/CarDetails";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Registeration from "./components/Registeration";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Registeration /><Dashboard /></>} />
        <Route path="/admin" element={<><Registeration /><AdminDashboard /></>} />
        <Route path="/add" element={<><Registeration /><AddCar /></>} />
        <Route path="/profile" element={<><Registeration /><Profile /></>} />
        <Route path="/edit/:id" element={<><Registeration /><EditCar /></>} />
        <Route path="/cars/:id" element={<><Registeration /><CarDetails /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}
export default App;
