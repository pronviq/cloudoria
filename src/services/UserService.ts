import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import $api from "../api/AxiosApi";
import { IUser } from "../models/IUser";

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/getdata");
  }
}
