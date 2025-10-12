import React from 'react';
import type { UseFormRegister, FieldError } from 'react-hook-form';

interface InputProps {
    label: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type = 'text',
    register,
    error,
    placeholder,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                {...register(name)}
                type={type}
                id={name}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default Input;