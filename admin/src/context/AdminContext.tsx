import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { type AdminContextType } from "../types/index.ts";
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [aToken, setAToken] = useState<string>(
    localStorage.getItem("aToken") || ""
  );

  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  const value = {
    backendUrl,
    aToken,
    setAToken,
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
