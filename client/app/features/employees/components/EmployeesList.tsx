"use client";

import React, { useState } from "react";
import { Search, UserCheck, ShieldAlert, Star, Filter } from "lucide-react";
import { Button } from "@/app/shared/ui/Button";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: "Hospitality" | "Healthcare" | "Home Care";
  status: "Active" | "Vetted" | "In Training" | "Pending";
  rating: number;
  vettedDate: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: "EMP001", name: "Maria Santos", role: "Hospitality Team Lead", department: "Hospitality", status: "Active", rating: 5, vettedDate: "12 May 2024" },
  { id: "EMP002", name: "Dr. James Lim", role: "Sanitation Specialist", department: "Healthcare", status: "Vetted", rating: 5, vettedDate: "18 Aug 2024" },
  { id: "EMP003", name: "Aisha Khan", role: "Lead Caregiver & Home Nurse", department: "Home Care", status: "Active", rating: 5, vettedDate: "05 Nov 2024" },
  { id: "EMP004", name: "David Rodriguez", role: "Clinical Sanitation Lead", department: "Healthcare", status: "In Training", rating: 4, vettedDate: "20 Jan 2025" },
  { id: "EMP005", name: "Sarah Chen", role: "Front Office Representative", department: "Hospitality", status: "Pending", rating: 4, vettedDate: "02 Feb 2025" },
  { id: "EMP006", name: "Elena Rostova", role: "Senior ICU Care Specialist", department: "Healthcare", status: "Active", rating: 5, vettedDate: "14 Apr 2024" },
];

export const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState<string>("All");

  const filtered = MOCK_EMPLOYEES.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                          emp.role.toLowerCase().includes(search.toLowerCase()) ||
                          emp.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept === "All" || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const getStatusStyle = (status: Employee["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Vetted":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      case "In Training":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Pending":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="bg-bs-card border border-bs rounded-bs-lg p-6 shadow-bs-sm w-full">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bs-secondary" />
          <input
            type="text"
            placeholder="Search employee directory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-bs-input border border-bs rounded-bs text-sm text-bs-primary placeholder-bs-muted focus:outline-none focus:border-bs-accent/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto self-stretch sm:self-auto justify-end">
          <Filter className="w-4 h-4 text-bs-secondary" />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="px-3 py-2 bg-bs-input border border-bs rounded-bs text-xs text-bs-secondary focus:outline-none focus:border-bs-accent/50"
          >
            <option value="All">All Departments</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Home Care">Home Care</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-bs text-bs-muted text-xs font-semibold uppercase tracking-wider bg-bs-subtle/30">
              <th className="py-3 px-4">Employee ID</th>
              <th className="py-3 px-4">Full Name</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Vetting Status</th>
              <th className="py-3 px-4">Performance</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bs text-sm">
            {filtered.length > 0 ? (
              filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-bs-subtle/25 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs text-bs-muted">{emp.id}</td>
                  <td className="py-4 px-4 font-semibold text-bs-primary">{emp.name}</td>
                  <td className="py-4 px-4 text-bs-secondary">{emp.role}</td>
                  <td className="py-4 px-4 text-xs font-medium text-bs-secondary">{emp.department}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-medium ${getStatusStyle(emp.status)}`}>
                      {emp.status === "Active" || emp.status === "Vetted" ? (
                        <UserCheck className="w-3 h-3" />
                      ) : (
                        <ShieldAlert className="w-3 h-3" />
                      )}
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            idx < emp.rating ? "fill-violet-400 text-violet-400" : "text-bs-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 px-3 py-1 text-xs">
                      View Dossier
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-bs-muted text-sm">
                  No matching vetted professionals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
