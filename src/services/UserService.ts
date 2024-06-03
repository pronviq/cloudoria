import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/Auth.model";
import $api from "../api/AxiosApi";
import { IUser } from "../models/User.model";
import { ThemeType } from "../contexts/theme/Theme.model";
import store from "../redux/store";
import { updateAvatar } from "../redux/userSlice";

const dispatch = store.dispatch;

export default class UserService {
  static async getAvatar() {
    const response = await $api.get("/getavatar", { responseType: "arraybuffer" });

    if (!response.data.byteLength) return;

    const imgUrl = URL.createObjectURL(new Blob([response.data], { type: "image/jpeg" }));

    dispatch(updateAvatar(imgUrl));
  }

  static async changeEmail(email: string) {
    return await $api.put("/changeemail", { email });
  }

  static async changeUsername(username: string) {
    return await $api.put("/changeusername", { username });
  }

  static async changePassword(password: string, newPassword: string) {
    return await $api.put("/changepassword", { password, newPassword });
  }

  static async deleteAccount(password: string) {
    return await $api.put("/deleteaccount", { password });
  }

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
      avatar: response.data.avatar,
    };
    return user;
  }
}
