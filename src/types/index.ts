export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  files: Record<string, string>; // path -> content
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  autoSave: boolean;
  autoSaveInterval: number; // in milliseconds
}

export interface User {
  id: string;
  username: string;
  email: string;
}

