import { AxiosResponse } from "axios";
import $api from "../api/AxiosApi";
import { IFile } from "../models/File.model";
import { deleteFile, switchFavorite, switchTrash } from "../redux/fileSlice";
import { updateSize } from "../redux/userSlice";
import store from "../redux/store";

const dispatch = store.dispatch;

export default class FileService {
  static async setDirectory(file: IFile) {}

  static async searchFiles(q: string): Promise<AxiosResponse<IFile[]>> {
    return await $api.get<IFile[]>(`/searchfiles?q=${q}`);
  }

  static async getTrash(): Promise<AxiosResponse<IFile[]>> {
    return await $api.get<IFile[]>("/gettrash");
  }

  static async getFavorites(): Promise<AxiosResponse<IFile[]>> {
    return await $api.get<IFile[]>("/getfavorites");
  }

  static async uploadFile(file: File, parent_id: number) {
    try {
      const formData = new FormData();
      console.log(file);

      formData.append("file", file);
      formData.append("parent_file", parent_id.toString());
      formData.append("name", file.name);
      // console.log(file);

      const response = await $api.post<IFile>("/uploadfile", formData, {
        onUploadProgress: (progressEvent) => {
          // @ts-ignore
          const totalLength = progressEvent.total;

          // console.log("total", totalLength);
          if (totalLength) {
            let progress = Math.round((progressEvent.loaded * 100) / totalLength);
            // console.log(progress);
          }
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async deleteFile(file: IFile, index: number) {
    try {
      dispatch(deleteFile({ index }));
      dispatch(updateSize(file.size * -1));
      const response = await $api.delete(`/deletefile?id=${file.id}`);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async switchFavorite(file: IFile, index: number) {
    try {
      dispatch(switchFavorite({ index }));
      const response = await $api.put("/changevalue", {
        id: file.id,
        prop: "is_favorite",
        value: !file.is_favorite,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  static async switchTrash(file: IFile, index: number) {
    try {
      dispatch(switchTrash({ index }));

      const response = await $api.put("/changevalue", {
        id: file.id,
        prop: "is_trash",
        value: !file.is_trash,
      });

      return true;
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
