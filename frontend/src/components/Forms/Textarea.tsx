import React from 'react';
import type { UseFormRegister, FieldError } from 'react-hook-form';

interface TextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 3,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        {...register(name)}
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default Textarea;