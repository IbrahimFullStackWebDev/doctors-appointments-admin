import axios from "axios";
import React, { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { type ResponseType } from "../types/index.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [status, setStatus] = useState<string>("admin");
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  const { backendUrl, setAToken } = useAdminContext();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<ResponseType>(
        `${backendUrl}/api/${status}/login`,
        {
          email,
          password,
        }
      );
      if (data.success) {
        setAToken(data.aToken);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full w-full max-w-[375px] border border-gray-300 rounded-lg shadow-lg m-auto mt-30 py-10 px-6 flex flex-col items-center gap-2"
    >
      <h2 className="text-3xl text-gray-500 font-semibold">
        <span className="text-blue-500">
          {status === "admin" ? "Admin" : "Doctor"}
        </span>{" "}
        Login
      </h2>
      <div className="w-full flex flex-col items-start gap-2">
        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded-md text-sm text-gray-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label className="text-sm text-gray-500" htmlFor="email">
            Password
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-md text-sm text-gray-500"
            type="password"
            id="email"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="w-full bg-blue-500 text-white text-lg cursor-pointer p-2 rounded-md hover:bg-blue-700 transition-all duration-300">
        Login
      </button>
      <div className="w-full flex flex-row items-start">
        <p className="text-gray-500 text-sm">
          {status === "admin" ? "Doctor" : "Admin"} login?{"  "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() =>
              status === "admin" ? setStatus("doctor") : setStatus("admin")
            }
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
