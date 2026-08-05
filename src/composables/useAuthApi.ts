import { authService } from '../services/authService';
import Cookies from 'js-cookie';
import type { LoginRequest } from '../types';

export function useAuthApi() {
  const login = (credentials: LoginRequest) => authService.login(credentials);
  const logout = () => {
    Cookies.remove('accessToken');
  };

  return {
    login,
    logout,
  };
}
