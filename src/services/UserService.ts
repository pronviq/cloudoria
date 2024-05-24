import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/Auth.model";
import $api from "../api/AxiosApi";
import { IUser } from "../models/User.model";
import { ThemeType } from "../contexts/theme/Theme.model";
import { IFiles } from "../models/File.model";

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return await $api.get<IUser[]>("/getdata");
  }

  static async updateTheme(theme: ThemeType): Promise<AxiosResponse> {
    return await $api.post("/updatetheme", { theme });
  }

  static responseToUser(response: AxiosResponse<AuthResponse>): IUser {
    const user: IUser = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      disk_space: response.data.disk_space,
      used_space: response.data.used_space,
      gender: response.data.gender,
      isAuth: true,
      root_directory: response.data.root_directory,
      theme: response.data.theme,
    };
    return user;
  }
}
