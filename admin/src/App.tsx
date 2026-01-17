import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Appointments from "./pages/admin/Appointments";
import AddDoctor from "./pages/admin/AddDoctor";
import Doctors from "./pages/admin/Doctors";

function App() {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <ToastContainer />
      <Navbar />
      <div className="w-full flex flex-row items-start gap-6">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
