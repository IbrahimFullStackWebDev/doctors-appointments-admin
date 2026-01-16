export interface AdminContextType {
  backendUrl: string;
  aToken: string;
  setAToken: (aToken: string | null) => void;
}
export interface ResponseType {
  success: boolean;
  aToken: string;
  message?: string;
}
export interface SidebarItems {
  path: string;
  lable: string;
  image: string;
}
