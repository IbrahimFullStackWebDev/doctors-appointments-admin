export interface AdminContextType {
  backendUrl: string;
  aToken: string;
  setAToken: (aToken: string) => void;
}
export interface ResponseType {
  success: boolean;
  aToken: string;
  message?: string;
}
