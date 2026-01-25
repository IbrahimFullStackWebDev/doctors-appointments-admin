import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import {
  type DoctorContextType,
  type DoctorDataType,
  type ResponseType,
} from "../types/index.ts";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "./AppContext.tsx";
const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { backendUrl, setAppointments } = useAppContext();
  const [doctorInfo, setDoctorInfo] = useState<DoctorDataType | null>(
    localStorage.getItem("doctorInfo")
      ? (JSON.parse(
          localStorage.getItem("doctorInfo") as string,
        ) as DoctorDataType)
      : null,
  );

  const [dToken, setDToken] = useState<string>(
    localStorage.getItem("dToken") || "",
  );

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/doctor/appointments`,
          {},
          { headers: { dToken: dToken } },
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
    if (dToken) {
      getAllAppointments();
    }
  }, [dToken]);

  const value = {
    dToken,
    setDToken,
    doctorInfo,
    setDoctorInfo,
  } as DoctorContextType;

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error(
      "useDoctorContext must be used within an AppDoctorProvider",
    );
  }
  return context;
};
