import { useQuery } from '@tanstack/react-query';
import { getemployees } from '../api';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: getemployees,
  });
};
