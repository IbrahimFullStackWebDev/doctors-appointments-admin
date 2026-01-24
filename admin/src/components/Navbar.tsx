import React from "react";
import { assets } from "../assets/assets.ts";
import { useAdminContext } from "../context/AdminContext.tsx";
import { useNavigate } from "react-router-dom";
import { useDoctorContext } from "../context/DoctorContext.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { aToken, setAToken } = useAdminContext();
  const { dToken, setDToken, setDoctorInfo } = useDoctorContext();
  return (
    (aToken || dToken) && (
      <nav className="w-full flex flex-row items-center justify-between px-4 md:px-10 py-2 border-b border-gray-300 bg-white">
        <div className="flex flex-row gap-6 items-center">
          <img src={assets.admin_logo} className="w-40" alt="admin logo" />
          <p className="text-xs text-gray-500 border border-gray-300 px-2 py-1 rounded-full">
            {aToken ? "Admin" : "Doctor"}
          </p>
        </div>
        <button
          onClick={() => {
            setAToken(null);
            setDToken(null);
            setDoctorInfo(null);

            localStorage.removeItem("aToken");
            localStorage.removeItem("doctorInfo");
            localStorage.removeItem("dToken");

            navigate("/");
          }}
          className="bg-blue-500 text-sm px-14 py-3 rounded-full text-white transition-all hover:bg-blue-700 duration-300 cursor-pointer"
        >
          Logout
        </button>
      </nav>
    )
  );
};

export default Navbar;
