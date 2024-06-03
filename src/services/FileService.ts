import { AxiosError, AxiosResponse } from "axios";
import $api from "../api/AxiosApi";
import { IFile, IUploadingFile } from "../models/File.model";
import { deleteFile, switchFavorite, switchTrash } from "../redux/fileSlice";
import { updateSize } from "../redux/userSlice";
import store from "../redux/store";
import { changeProgress, makeError, pushUFile } from "../redux/uploadSlice";

const dispatch = store.dispatch;

export default class FileService {
  static async uploadAvatar(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await $api.post("/uploadavatar", formData, {
      // onUploadProgress: (progressEvent) => {
      //   const totalLength = progressEvent.total;
      //   if (totalLength) {
      //     let progress = Math.round((progressEvent.loaded * 100) / totalLength);
      //     console.log(progress);
      //   }
      // },
    });

    return response.data;
  }

  static async downloadFile(file_id: string | number) {
    const response = await $api.get(`/download?file_id=${file_id}`, {
      responseType: "blob",
    });

    const blob = response.data;
    return blob;
  }

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
    const i_file: IUploadingFile = {
      name: file.name,
      id: Date.now(),
      size: file.size,
      progress: 0,
      type: file.type,
    };
    dispatch(pushUFile(i_file));

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("parent_file", parent_id.toString());
      formData.append("name", file.name);

      const response = await $api.post<IFile>("/uploadfile", formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.total;
          if (totalLength) {
            let progress = Math.round((progressEvent.loaded * 100) / totalLength);
            dispatch(changeProgress({ id: i_file.id, progress }));
          }
        },
      });

      return response.data;
    } catch (error: any) {
      let message = await error.response?.data;
      if (!["Файл уже существует", "Недостаточно места"].includes(message) || !message)
        message = "Попробуйте еще раз";
      dispatch(makeError({ file: i_file, err: message }));
      // return false;
    }
  }

  static async deleteFile(file: IFile, index: number, needDispatch: boolean = true) {
    try {
      needDispatch && dispatch(deleteFile({ index }));
      needDispatch && dispatch(updateSize(file.size * -1));
      $api.delete(`/deletefile?id=${file.id}`);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async switchFavorite(file: IFile, index: number) {
    try {
      dispatch(switchFavorite({ index }));
      $api.put("/changevalue", {
        id: file.id,
        prop: "is_favorite",
        value: !file.is_favorite,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  static async switchTrash(file: IFile, index: number, needDispatch: boolean = true) {
    try {
      needDispatch && dispatch(switchTrash({ index }));

      $api.put("/changevalue", {
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
