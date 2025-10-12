export interface User {
  id: string;
  username: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in progress' | 'completed';
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status: 'pending' | 'in progress' | 'completed';
}