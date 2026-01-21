import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import {
  type AdminContextType,
  type AppointmentsType,
  type ResponseType,
} from "../types/index.ts";
import axios from "axios";
import { toast } from "react-toastify";
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currency: string = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointments, setAppointments] = useState<AppointmentsType[]>([]);

  const [aToken, setAToken] = useState<string>(
    localStorage.getItem("aToken") || "",
  );

  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/admin/appointments`,
          {},
          { headers: { aToken: aToken } },
        );
        if (data.success) {
          setAppointments(data.allAppointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
        console.log(error);
      }
    };
    getAllAppointments();
  }, []);

  const value = {
    backendUrl,
    aToken,
    setAToken,
    currency,
    appointments,
    setAppointments,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
