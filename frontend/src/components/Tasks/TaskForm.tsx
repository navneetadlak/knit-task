import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { TaskFormData } from '../../types';
import { taskSchema } from '../../utils/validation';
import Input from '../Forms/Input';
import Textarea from '../Forms/Textarea';
import Select from '../Forms/Select';

interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    isLoading?: boolean;
    initialData?: Partial<TaskFormData>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isLoading = false, initialData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TaskFormData>({
        resolver: yupResolver(taskSchema),
        defaultValues: initialData || {
            status: 'pending',
        },
    });

    const handleFormSubmit = (data: TaskFormData) => {
        onSubmit(data);
        reset();
    };

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'in progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
    ];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

            <Input
                label="Title"
                name="title"
                register={register}
                error={errors.title}
                placeholder="Enter task title"
            />

            <Textarea
                label="Description"
                name="description"
                register={register}
                error={errors.description}
                placeholder="Enter task description (optional)"
            />

            <Select
                label="Status"
                name="status"
                register={register}
                error={errors.status}
                options={statusOptions}
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
                {isLoading ? 'Creating...' : 'Create Task'}
            </button>
        </form>
    );
};

export default TaskForm;