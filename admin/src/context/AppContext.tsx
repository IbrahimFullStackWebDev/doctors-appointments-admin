import { createContext, ReactNode, useContext } from "react";
import { type AppContextType } from "../types/index.ts";
const AdminContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currency: string = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    currency,
    backendUrl,
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
