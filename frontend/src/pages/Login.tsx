import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import type { LoginFormData } from '../types';
import { loginSchema } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Forms/Input';

const Login: React.FC = () => {
    const { login, isLoading, error, clearError, user } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                duration: 12000,
                position: 'top-right',
                style: {
                    background: '#ffe4e6',
                    color: '#b91c1c',
                    fontWeight: '500',
                },
                icon: '⚠️',
            });
            clearError();
        }
    }, [error, clearError]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
        } catch (err: any) {
            toast.error(err?.message || 'Login failed', {
                duration: 8000,
                position: 'top-right',
                style: { background: '#ffe4e6', color: '#b91c1c', fontWeight: '500' },
                icon: '⚠️',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <Toaster /> {/* container for toasts */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm">Sign in to continue to your dashboard</p>
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transform transition-all disabled:opacity-50"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div className="text-center text-sm text-gray-500">
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
