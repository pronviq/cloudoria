// export interface AuthResponse {}

export interface AuthResponse {
  id: boolean;
  username: string;
  email: string;
  access: string;
  refresh: string;
  disk_space: number;
  used_space: number;
  avatar_path: string;
  gender: string;
}
