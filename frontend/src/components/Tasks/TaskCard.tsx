import React, { useState } from 'react';
import type { Task } from '../../types';
import { useTasks } from '../../hooks/useTasks';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { updateTask, deleteTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description || '',
        status: task.status,
    });

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        'in progress': 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
    };

    const handleSave = async () => {
        try {
            await updateTask(task._id, editedTask);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(task._id);
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border">
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={editedTask.status}
                        onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
                        >
                            {task.status}
                        </span>
                    </div>
                    {task.description && (
                        <p className="text-gray-600 mb-4">{task.description}</p>
                    )}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-800 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;