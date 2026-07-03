import api from '../api/axios';
import type { FinanceDashboardDTO } from '../types/api';

interface FinanceDashboardFilters {
  month?: number;
  year?: number;
}

class FinanceDashboardService {
  async getSummary(filters?: FinanceDashboardFilters): Promise<FinanceDashboardDTO> {
    try {
      const params = new URLSearchParams();

      if (filters?.month !== undefined) {
        const monthStr = (filters.month + 1).toString().padStart(2, '0');
        params.append('month', monthStr);
      }

      if (filters?.year !== undefined) {
        params.append('year', filters.year.toString());
      }

      const queryString = params.toString();
      const url = `/transactions/summary${queryString ? `?${queryString}` : ''}`;
      const response = await api.get<FinanceDashboardDTO>(url);

      return response.data;
    } catch (error) {
      console.error('Error fetching finance dashboard summary:', error);
      throw error;
    }
  }
}

export default new FinanceDashboardService();
