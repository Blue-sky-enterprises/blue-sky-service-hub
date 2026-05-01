import { useQuery } from '@tanstack/react-query';
import { getauth } from '../api';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getauth,
  });
};
