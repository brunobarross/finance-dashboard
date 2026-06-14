import { apiClient } from '../services/apiClient';

export default ({ app }) => {
  app.config.globalProperties.$api = apiClient;
};

export { apiClient };
