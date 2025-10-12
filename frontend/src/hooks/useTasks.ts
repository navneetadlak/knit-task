import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { fetchTasks, createTask, updateTask, deleteTask, clearError } from '../store/taskSlice';

export const useTasks = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks);

    return {
        tasks,
        isLoading,
        error,
        fetchTasks: () => dispatch(fetchTasks()),
        createTask: (taskData: any) => dispatch(createTask(taskData)),
        updateTask: (id: string, taskData: any) => dispatch(updateTask({ id, taskData })),
        deleteTask: (id: string) => dispatch(deleteTask(id)),
        clearError: () => dispatch(clearError()),
    };
};