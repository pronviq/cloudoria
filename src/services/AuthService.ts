import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import $api from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";

export default class AuthService {
  static async login(user_info: string, password: string): Promise<AxiosResponse> {
    // console.log(user_info, password);

    const response = await $api.post<AuthResponse>("/login", {
      user_info,
      password,
    });

    return response;
  }

  static async refresh() {
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

  static async logout() {
    localStorage.removeItem("token");
    return await $api.post("/logout");
  }
}
