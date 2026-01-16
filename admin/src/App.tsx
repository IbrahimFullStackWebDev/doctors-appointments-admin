import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-start">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
