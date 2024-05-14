import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import $api from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";

export default class AuthService {
  static async login(email: string, password: string) {
    const response = await $api.post<AuthResponse>("/login", {
      email,
      password,
    });
    return response;
  }

  static async refresh() {
    const response = await $api.get<AuthResponse>("/refresh");
    return response;
  }

  static async registration(email: string, password: string, sex: string) {
    const response = await $api.post<AuthResponse>("/registration", { email, password, sex });
    return response;
  }

  static async logout() {
    localStorage.removeItem("token");
    return await $api.get("/logout");
  }
}
