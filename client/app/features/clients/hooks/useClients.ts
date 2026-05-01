import { useQuery } from '@tanstack/react-query';
import { getclients } from '../api';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getclients,
  });
};
