"use client";
import { useAttendance } from '../hooks';
import { AttendanceList } from '../components';

export const AttendancePage = () => {
  const { isLoading, error } = useAttendance();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <AttendanceList />
    </div>
  );
};
