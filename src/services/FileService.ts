import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/Auth.model";
import $api from "../api/AxiosApi";
import { IFile, IFiles } from "../models/File.model";
import { useAppDispatch } from "../hooks/redux";
import { setCurrentFiles } from "../redux/fileSlice";
import { IUser } from "../models/User.model";

export default class FileService {
  static async deleteFile(file: IFile) {
    try {
      const response = await $api.delete(`/deletefile?id=${file.id}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async switchFavorite(file: IFile) {
    try {
      const response = await $api.put("/changevalue", {
        id: file.id,
        prop: "is_favorite",
        value: !file.is_favorite,
      });
      return response.data;
    } catch (error) {
      return false;
    }
  }

  static async switchTrash(file: IFile) {
    try {
      const response = await $api.put("/changevalue", {
        id: file.id,
        prop: "is_trash",
        value: !file.is_trash,
      });
      return response.data;
    } catch (error) {
      return false;
    }
  }

  static async getFiles(parent_file: number) {
    const response = await $api.get<IFile[]>(`/getfiles?parent_file=${parent_file}`);
    // console.log(response.data);

    return response.data;
  }

  static async createDir(parent_file: number, name: string): Promise<IFile> {
    const response: AxiosResponse<IFile> = await $api.post("/createdir", {
      parent_file,
      name,
    });
    return response.data;
  }
}
