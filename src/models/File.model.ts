export interface IFiles {
  currentDir: number;
  currentFiles: IFile[];
  stack: IFile[];
  isLoading: boolean;
  selected: number;
}

export interface IFile {
  id: number;
  name: string;
  is_favorite: boolean;
  path: string;
  size: number;
  user_id: number;
  type: string;
  parent_file: number;
  timestamp: string;
  is_trash: boolean;
  is_selected: boolean;
}

export interface IUploadingFiles {
  files: IUploadingFile[];
}

export interface IUploadingFile {
  name: string;
  id: number;
  size: number;
  progress: number;
  type: string;
  error?: string;
}
