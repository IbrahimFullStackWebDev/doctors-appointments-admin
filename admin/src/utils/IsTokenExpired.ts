import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentDate = Date.now() / 1000;
    return currentDate > decoded.exp;
  } catch (error) {
    console.log(error);
    return true;
  }
};
