import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminAppointmentsPage from "./pages/admin/Appointments";
import AddDoctor from "./pages/admin/AddDoctor";
import Doctors from "./pages/admin/Doctors";
import { useAdminContext } from "./context/AdminContext";
import { useDoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/Dashboard";
import DoctorAppointments from "./pages/Doctor/Appointments";
import Profile from "./pages/Doctor/Profile";

function App() {
  const { aToken } = useAdminContext();
  const { dToken } = useDoctorContext();
  return (
    <div
      className={`w-[100vw] h-[100vh]  flex flex-col items-center overflow-y-hidden ${aToken || dToken ? "bg-blue-50" : "bg-white"}`}
    >
      <ToastContainer />

      <Navbar />
      <div className="w-full overflow-auto flex flex-row items-start gap-2 md:gap-6">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Login />} />

          {aToken && (
            <>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/appointments" element={<AdminAppointmentsPage />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctors" element={<Doctors />} />
            </>
          )}

          {dToken && (
            <>
              <Route path="/dashboard" element={<DoctorDashboard />} />
              <Route path="/appointments" element={<DoctorAppointments />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
