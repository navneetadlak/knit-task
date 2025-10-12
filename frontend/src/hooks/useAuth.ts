import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { login, register, logout, clearError } from '../store/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, token, isLoading, error } = useSelector((state: RootState) => state.auth);

    return {
        user,
        token,
        isLoading,
        error,
        login: (credentials: any) => dispatch(login(credentials)),
        register: (userData: any) => dispatch(register(userData)),
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError()),
    };
};