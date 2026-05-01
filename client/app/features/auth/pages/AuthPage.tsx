"use client";
import { useAuth } from '../hooks';
import { AuthList } from '../components';

export const AuthPage = () => {
  const { data, isLoading, error } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Auth</h1>
      <AuthList />
    </div>
  );
};
