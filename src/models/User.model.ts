import { ThemeType } from "../contexts/theme/Theme.model";

export interface IUser {
  id: number;
  username: string;
  email: string;
  disk_space: number;
  used_space: number;
  gender: string;
  isAuth: boolean;
  root_directory: number;
  theme: ThemeType;
}

export interface IUserProperty {
  property: string;
  value: any;
}
