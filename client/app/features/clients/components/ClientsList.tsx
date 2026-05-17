"use client";

import React, { useState } from "react";
import { Search, Building, Users } from "lucide-react";
import { Button } from "@/app/shared/ui/Button";

interface ClientContract {
  id: string;
  name: string;
  category: "Hospitality" | "Healthcare" | "Home Care";
  status: "Active Partner" | "On-Demand Scaled" | "Under Review" | "Pending Setups";
  staffDeployed: number;
  location: string;
  satisfaction: number;
}

const MOCK_CLIENTS: ClientContract[] = [
  { id: "CL001", name: "Grand Ritz Plaza & Resort", category: "Hospitality", status: "Active Partner", staffDeployed: 48, location: "Beverly Hills, CA", satisfaction: 5 },
  { id: "CL002", name: "Mercy Health Medical Group", category: "Healthcare", status: "On-Demand Scaled", staffDeployed: 34, location: "Los Angeles, CA", satisfaction: 5 },
  { id: "CL003", name: "The Waldorf Astoria Hotel", category: "Hospitality", status: "Active Partner", staffDeployed: 62, location: "Las Vegas, NV", satisfaction: 5 },
  { id: "CL004", name: "Saint Jude Pediatric Clinic", category: "Healthcare", status: "Under Review", staffDeployed: 12, location: "San Diego, CA", satisfaction: 4 },
  { id: "CL005", name: "Kaiser Family Estate Nursing", category: "Home Care", status: "On-Demand Scaled", staffDeployed: 4, location: "Palo Alto, CA", satisfaction: 5 },
  { id: "CL006", name: "Sheraton Bay Resort & Spa", category: "Hospitality", status: "Pending Setups", staffDeployed: 0, location: "Miami, FL", satisfaction: 4 },
];

export const ClientsList = () => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_CLIENTS.filter((cli) => 
    cli.name.toLowerCase().includes(search.toLowerCase()) ||
    cli.location.toLowerCase().includes(search.toLowerCase()) ||
    cli.id.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status: ClientContract["status"]) => {
    switch (status) {
      case "Active Partner":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "On-Demand Scaled":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      case "Under Review":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Pending Setups":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bs-secondary" />
        <input
          type="text"
          placeholder="Search partner institutions and locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-bs-input border border-bs rounded-bs text-sm text-bs-primary placeholder-bs-muted focus:outline-none focus:border-bs-accent/50 transition-colors"
        />
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((cli) => (
            <div
              key={cli.id}
              className="bg-bs-card border border-bs rounded-bs-lg p-6 shadow-bs-sm hover:border-bs-accent/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-bs bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                    <Building className="w-5 h-5 text-violet-500" />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${getStatusStyle(cli.status)}`}>
                    {cli.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-bs-primary mb-1">{cli.name}</h3>
                <p className="text-xs text-bs-muted mb-4">{cli.location}</p>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-bs mb-6">
                  <div>
                    <span className="text-[10px] uppercase text-bs-muted block tracking-wide">Category</span>
                    <span className="text-xs font-semibold text-bs-secondary mt-0.5 block">{cli.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-bs-muted block tracking-wide">Deployed Staff</span>
                    <span className="text-xs font-semibold text-bs-secondary mt-0.5 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-violet-400" /> {cli.staffDeployed} Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-bs-muted font-mono">{cli.id}</span>
                <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 text-xs px-3 py-1">
                  Manage Contract
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-bs-muted text-sm bg-bs-card border border-bs rounded-bs-lg">
            No matching client contracts found.
          </div>
        )}
      </div>
    </div>
  );
};
