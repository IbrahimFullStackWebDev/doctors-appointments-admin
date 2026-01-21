export interface AppointmentsType {
  AppointmentInfo: {
    id: number;
    payment: boolean;
    slotDate: string;
    slotTime: string;
    status: string;
    amount: number;
  };

  patientInfo: {
    name: string;
    image: string;
    dob: number;
  };
  doctorInfo: {
    name: string;
    image: string;
  };
}
export interface AdminContextType {
  backendUrl: string;
  aToken: string;
  currency: string;
  appointments: AppointmentsType[];
  setAToken: (aToken: string | null) => void;
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentsType[]>>;
}

export interface SidebarItemsType {
  path: string;
  lable: string;
  image: string;
}
export interface SpecialityDataType {
  id: number;
  speciality: string;
}
interface Address {
  line1: string;
  line2: string;
}
export interface DoctorDataType {
  id?: number;
  name: string;
  email: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  available?: boolean;
  fees: number;
  address: Address;
  image: string;
}

export interface ResponseType {
  success: boolean;
  aToken?: string;
  message: string;
  doctors?: DoctorDataType[];
  allAppointments?: AppointmentsType[];
  statistics?: StatisticsType;
}

export interface ConfirmMessageProps {
  showModal: boolean;
  selectedId: number | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface StatisticsType {
  appointments: {
    total: number;
    scheduled: number;
    cancelled: number;
    completed: number;
  };
  doctors: {
    total: number;
    available: number;
    notAvailable: number;
  };
  users: {
    total: number;
    active: number;
    notActive: number;
  };
}
