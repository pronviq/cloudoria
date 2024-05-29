// export interface AuthResponse {}

import { ThemeType } from "../contexts/theme/Theme.model";

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  access: string;
  refresh: string;
  disk_space: number;
  used_space: number;
  avatar_path: string;
  gender: string;
  root_directory: number;
  theme: ThemeType;
}

export interface ISession {
  id: number;
  token: string;
  ip: string;
  user_id: number;
  email: string;
  browser: string;
  os: string;
  isCurrent: boolean;
  timestamp: string;
}
