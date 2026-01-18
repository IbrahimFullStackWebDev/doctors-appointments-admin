export interface AdminContextType {
  backendUrl: string;
  aToken: string;
  setAToken: (aToken: string | null) => void;
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
}
