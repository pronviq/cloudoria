import axios, { AxiosResponse } from "axios";
import { AuthResponse, ISession } from "../models/Auth.model";
import $api, { API_URL } from "../api/AxiosApi";

interface ILogin {
  (user_info: string, password: string): Promise<AxiosResponse<AuthResponse>>;
}

interface IRegistration {
  (email: string, username: string, password: string, gender: string): Promise<
    AxiosResponse<AuthResponse>
  >;
}

export default class AuthService {
  static login: ILogin = async (user_info, password) => {
    const response = await $api.post<AuthResponse>("/login", {
      user_info,
      password,
    });

    return response;
  };

  static refresh: () => Promise<AxiosResponse<AuthResponse>> = async () => {
    const response = await axios.get<AuthResponse>(API_URL + "/refresh", {
      withCredentials: true,
    });
    // console.log(response);

    return response;
  };

  static registration: IRegistration = async (email, username, password, gender) => {
    const response = await $api.post<AuthResponse>("/registration", {
      email,
      username,
      password,
      gender,
    });
    return response;
  };

  static logout: () => Promise<AxiosResponse<void>> = async () => {
    localStorage.removeItem("token");
    const response = await $api.post<void>("/logout");
    return response;
  };

  static getSessions = async (): Promise<AxiosResponse<ISession[]>> => {
    const response = await $api.get<ISession[]>("/getsessions");
    return response;
  };

  static terminateSession = async (id: number): Promise<AxiosResponse<any>> => {
    const response = await $api.get(`/terminate?id=${id}`);
    return response;
  };
}
