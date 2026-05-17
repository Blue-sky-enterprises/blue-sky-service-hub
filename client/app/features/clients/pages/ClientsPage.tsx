"use client";
import { useClients } from '../hooks';
import { ClientsList } from '../components';

export const ClientsPage = () => {
  const { isLoading, error } = useClients();
  
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <ClientsList />
    </div>
  );
};
