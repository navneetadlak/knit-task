import React from 'react';
import type { UseFormRegister, FieldError } from 'react-hook-form';

interface SelectProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({
    label,
    name,
    register,
    error,
    options,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                {...register(name)}
                id={name}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default Select;