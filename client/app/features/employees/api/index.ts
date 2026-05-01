import { api } from '@/app/core/api';
// Replace with actual OpenAPI types later
export const getemployees = async () => {
  const { data } = await api.get('/employees');
  return data;
};
