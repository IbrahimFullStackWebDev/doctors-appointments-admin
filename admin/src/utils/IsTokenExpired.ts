import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentDate = Date.now();
    return currentDate > decoded.exp;
  } catch (error) {
    console.log(error);
    return true;
  }
};
