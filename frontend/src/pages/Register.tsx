import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterFormData } from '../types';
import { registerSchema } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Forms/Input';

const Register: React.FC = () => {
    const { register: registerUser, isLoading, error, clearError, user } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
    });

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200">

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm">Join us and start your journey</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Username"
                        name="username"
                        register={register}
                        error={errors.username}
                        placeholder="Enter your username"
                        className="peer border-b border-gray-300 focus:border-blue-500 text-gray-700 bg-transparent placeholder-transparent transition-colors"
                        floating
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        register={register}
                        error={errors.password}
                        placeholder="Enter your password"
                        className="peer border-b border-gray-300 focus:border-blue-500 text-gray-700 bg-transparent placeholder-transparent transition-colors"
                        floating
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        register={register}
                        error={errors.confirmPassword}
                        placeholder="Confirm your password"
                        className="peer border-b border-gray-300 focus:border-blue-500 text-gray-700 bg-transparent placeholder-transparent transition-colors"
                        floating
                    />

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md animate-pulse text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transform transition-all disabled:opacity-50"
                    >
                        {isLoading ? 'Creating account...' : 'Create account'}
                    </button>

                    <div className="text-center text-sm text-gray-500">
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;