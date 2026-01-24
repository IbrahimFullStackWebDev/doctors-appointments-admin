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
  appointmentsForAdmin: AppointmentsType[];
  setAToken: (aToken: string | null) => void;
  setAppointmentsForAdmin: React.Dispatch<
    React.SetStateAction<AppointmentsType[]>
  >;
}
export interface AppContextType {
  currency: string;
  backendUrl: string;
}

export interface DoctorContextType {
  backendUrl: string;
  dToken: string;
  appointmentsForDoctor: AppointmentsType[];
  setDToken: (aToken: string | null) => void;
  setAppointmentsForDoctor: React.Dispatch<
    React.SetStateAction<AppointmentsType[]>
  >;
  doctorInfo: DoctorDataType;
  setDoctorInfo: React.Dispatch<React.SetStateAction<DoctorDataType | null>>;
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
  dToken?: string;
  message: string;
  doctors?: DoctorDataType[];
  doctorInfo?: DoctorDataType;
  allAppointments?: AppointmentsType[];
  statistics?: AdminStatisticsType;
}

export interface ConfirmMessageProps {
  showModal: boolean;
  selectedId: number | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
}
export interface DoctorStatisticsType {
  appointments: {
    total: number;
    scheduled: number;
    cancelled: number;
    completed: number;
  };
  earnings: {
    totalEarnings: number;
    paidEarnings: number;
    cashEarnings: number;
  };
  patients: {
    total_patients: number;
    active_patients: number;
    lost_patients: number;
    complete_patients: number;
  };
}

export interface AdminStatisticsType {
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
