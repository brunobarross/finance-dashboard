import { apiClient } from './apiClient';
import type { LoginRequest, LoginResponse } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.instance.post<LoginResponse>('/authenticate', credentials);
    return response.data;
  },
};

export default authService;
