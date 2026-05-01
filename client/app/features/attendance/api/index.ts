import { api } from '@/app/core/api';
// Replace with actual OpenAPI types later
export const getattendance = async () => {
  const { data } = await api.get('/attendance');
  return data;
};
