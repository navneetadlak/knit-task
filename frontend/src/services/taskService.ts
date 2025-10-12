import type { Task, TaskFormData } from '../types';
import { api } from './api';

export const taskService = {
    async getTasks(): Promise<Task[]> {
        const { data } = await api.get<Task[]>('/tasks');
        return data;
    },

    async createTask(taskData: TaskFormData): Promise<Task> {
        const { data } = await api.post<{ task: Task; message: string }>('/tasks', taskData);
        return data.task;
    },

    async updateTask(id: string, taskData: Partial<TaskFormData>): Promise<Task> {
        const { data } = await api.put<{ task: Task; message: string }>(`/tasks/${id}`, taskData);
        return data.task;
    },

    async deleteTask(id: string): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },
};