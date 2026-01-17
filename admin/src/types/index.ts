export interface AdminContextType {
  backendUrl: string;
  aToken: string;
  setAToken: (aToken: string | null) => void;
}
export interface ResponseType {
  success: boolean;
  aToken?: string;
  message?: string;
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
  id?: string;
  name: string;
  email: string;
  password?: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: Address;
  image: string;
}
