"use client";
import { useEmployees } from '../hooks';
import { EmployeesList } from '../components';

export const EmployeesPage = () => {
  const { data, isLoading, error } = useEmployees();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <EmployeesList />
    </div>
  );
};
