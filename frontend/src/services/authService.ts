import type { AuthResponse, LoginFormData, RegisterFormData } from '../types';
import { api } from './api';

export const authService = {
    async register(userData: RegisterFormData): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/register', {
            username: userData.username,
            password: userData.password,
        });
        return data;
    },

    async login(credentials: LoginFormData): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getStoredUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    storeAuthData(token: string, user: any): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
};