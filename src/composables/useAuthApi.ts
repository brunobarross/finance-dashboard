import { authService } from '../services/authService';
import type { LoginRequest } from '../types';

export function useAuthApi() {
  const login = (credentials: LoginRequest) => authService.login(credentials);

  return {
    login,
  };
}
