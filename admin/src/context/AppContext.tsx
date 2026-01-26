import { createContext, type ReactNode, useContext, useState } from "react";
import { type AppContextType, type AppointmentsType } from "../types/index.ts";
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currency: string = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointments, setAppointments] = useState<AppointmentsType[]>([]);

  const value = {
    currency,
    backendUrl,
    appointments,
    setAppointments,
  } as AppContextType;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
