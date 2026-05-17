import { useQuery } from '@tanstack/react-query';
import { getattendance } from '../api';

export const useAttendance = () => {
  return useQuery({
    queryKey: ['attendance'],
    queryFn: getattendance,
  });
};
