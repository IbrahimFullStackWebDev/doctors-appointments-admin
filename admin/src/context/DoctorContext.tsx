import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import {
  type AppointmentsType,
  type DoctorContextType,
  type DoctorDataType,
  type ResponseType,
} from "../types/index.ts";
import axios from "axios";
import { toast } from "react-toastify";
const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointmentsForDoctor, setAppointmentsForDoctor] = useState<
    AppointmentsType[]
  >([]);
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
          setAppointmentsForDoctor(data.allAppointments);
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
  }, []);

  const value = {
    backendUrl,
    dToken,
    setAToken: setDToken,
    appointmentsForDoctor,
    setAppointmentsForDoctor,
    doctorInfo,
    setDoctorInfo,
    setDToken,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
