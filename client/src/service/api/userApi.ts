import { jwtDecode } from "jwt-decode";
import { $host, $authHost } from "./index";

interface ITokenData {
  email: string;
  id: number;
  exp: number;
  iat: number;
}

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post("auth/registration", { email, password });
  localStorage.setItem("token", data.token);
  const decodeData = jwtDecode(data.token);
  return { ...decodeData, token: data.token };
};

export const login = async (email: string, password: string) => {
  const { data } = await $host.post("auth/login", { email, password });
  localStorage.setItem("token", data.token);
  const decodeData = jwtDecode(data.token);
  return { ...decodeData, token: data.token };
};

export const check = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodeToken: ITokenData = jwtDecode(token);
    const { data } = await $authHost.get("auth/check", {
      params: {
        email: decodeToken.email,
        id: decodeToken.id,
      },
    });
    localStorage.setItem("token", data.token);
    const decodeData = jwtDecode(data.token);
    return { ...decodeData, token: data.token };
  } else {
    throw "Не авторизован";
  }
};
