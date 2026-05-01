import { api } from '@/app/core/api';
// Replace with actual OpenAPI types later
export const getauth = async () => {
  const { data } = await api.get('/auth');
  return data;
};
