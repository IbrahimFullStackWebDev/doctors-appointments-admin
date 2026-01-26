import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useContext,
} from "react";
import { type AdminContextType, type ResponseType } from "../types/index.ts";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "./AppContext.tsx";
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const { backendUrl, setAppointments } = useAppContext();

  const [aToken, setAToken] = useState<string>(
    localStorage.getItem("aToken") || "",
  );

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/admin/appointments`,
          {},
          { headers: { aToken } },
        );
        if (data.success) {
          setAppointments(data.allAppointments || []);
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
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
  } as AdminContextType;

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext must be used within an AdminContextProvider",
    );
  }
  return context;
};
