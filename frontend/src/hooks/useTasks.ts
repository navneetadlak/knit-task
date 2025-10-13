import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import type { RootState, AppDispatch } from '../store/store';
import { fetchTasks, createTask, updateTask, deleteTask, clearError } from '../store/taskSlice';

export const useTasks = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks);

    // Wrap dispatch functions with useCallback
    const fetchTasksCallback = useCallback(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const createTaskCallback = useCallback((taskData: any) => {
        dispatch(createTask(taskData));
    }, [dispatch]);

    const updateTaskCallback = useCallback((id: string, taskData: any) => {
        dispatch(updateTask({ id, taskData }));
    }, [dispatch]);

    const deleteTaskCallback = useCallback((id: string) => {
        dispatch(deleteTask(id));
    }, [dispatch]);

    const clearErrorCallback = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        tasks,
        isLoading,
        error,
        fetchTasks: fetchTasksCallback,
        createTask: createTaskCallback,
        updateTask: updateTaskCallback,
        deleteTask: deleteTaskCallback,
        clearError: clearErrorCallback,
    };
};