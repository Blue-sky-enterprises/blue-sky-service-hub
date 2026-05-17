import { api } from '@/app/core/api';
// Replace with actual OpenAPI types later
export const getclients = async () => {
  const { data } = await api.get('/clients');
  return data;
};
