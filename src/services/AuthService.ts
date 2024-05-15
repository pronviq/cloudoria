import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import $api from "../api/AxiosApi";

export default class AuthService {
  static async login(user_info: string, password: string): Promise<AxiosResponse> {
    const response = await $api.post<AuthResponse>("/login", {
      user_info,
      password,
    });

    return response;
  }

  static async refresh(): Promise<AxiosResponse> {
    const response = await $api.get<AuthResponse>("/refresh");
    return response;
  }

  static async registration(
    email: string,
    username: string,
    password: string,
    gender: string
  ): Promise<AxiosResponse> {
    const response = await $api.post<AuthResponse>("/registration", {
      email,
      username,
      password,
      gender,
    });
    return response;
  }

  static async logout(): Promise<AxiosResponse> {
    localStorage.removeItem("token");
    const response = await $api.post("/logout");
    return response;
  }
}
