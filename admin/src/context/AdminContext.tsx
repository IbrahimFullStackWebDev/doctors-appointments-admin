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

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointmentsForAdmin, setAppointmentsForAdmin] = useState<
    AppointmentsType[]
  >([]);

  const [aToken, setAToken] = useState<string>(
    localStorage.getItem("aToken") || "",
  );

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/admin/appointments`,
          {},
          { headers: { aToken: aToken } },
        );
        if (data.success) {
          setAppointmentsForAdmin(data.allAppointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
        console.log(error);
      }
    };
    if (aToken) {
      getAllAppointments();
    }
  }, []);

  const value = {
    backendUrl,
    aToken,
    setAToken,
    appointmentsForAdmin,
    setAppointmentsForAdmin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
