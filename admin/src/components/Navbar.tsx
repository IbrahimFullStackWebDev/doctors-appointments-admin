import React from "react";
import { assets } from "../assets/assets.ts";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { aToken, setAToken } = useAdminContext();
  return (
    aToken && (
      <nav className="w-full flex flex-row items-center justify-between px-10 py-2 border-b border-gray-300 bg-white">
        <div className="flex flex-row gap-6 items-center">
          <img src={assets.admin_logo} className="w-40" alt="admin logo" />
          <p className="text-xs text-gray-500 border border-gray-300 px-2 py-1 rounded-full">
            {aToken ? "Admin" : "Doctor"}
          </p>
        </div>
        <button
          onClick={() => {
            setAToken(null);
            navigate("/");
          }}
          className="bg-blue-500 px-14 py-3 rounded-full text-white transition-all hover:bg-blue-700 duration-300 cursor-pointer"
        >
          Logout
        </button>
      </nav>
    )
  );
};

export default Navbar;
