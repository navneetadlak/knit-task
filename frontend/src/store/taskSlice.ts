import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Task, TaskFormData } from '../types';
import { taskService } from '../services/taskService';

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            return await taskService.getTasks();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: TaskFormData, { rejectWithValue }) => {
        try {
            return await taskService.createTask(taskData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create task');
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, taskData }: { id: string; taskData: Partial<TaskFormData> }, { rejectWithValue }) => {
        try {
            return await taskService.updateTask(id, taskData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update task');
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id: string, { rejectWithValue }) => {
        try {
            await taskService.deleteTask(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete task');
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create task
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Update task
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;