"use client";

import React, { useState } from "react";
import { Play, CheckCircle2, AlertTriangle, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/app/shared/ui/Button";

interface ShiftLog {
  id: string;
  employeeName: string;
  siteName: string;
  checkIn: string;
  checkOut: string;
  status: "Active" | "Completed" | "Late" | "Absent";
  verification: string;
}

const MOCK_ATTENDANCE: ShiftLog[] = [
  { id: "ATT781", employeeName: "Maria Santos", siteName: "Grand Ritz Resort", checkIn: "08:00 AM", checkOut: "--:--", status: "Active", verification: "GPS Verified" },
  { id: "ATT782", employeeName: "Dr. James Lim", siteName: "Mercy Health Group", checkIn: "07:45 AM", checkOut: "04:45 PM", status: "Completed", verification: "FaceID Vetted" },
  { id: "ATT783", employeeName: "Aisha Khan", siteName: "Kaiser Family Estate", checkIn: "09:00 AM", checkOut: "--:--", status: "Active", verification: "GPS Verified" },
  { id: "ATT784", employeeName: "David Rodriguez", siteName: "Mercy Health Group", checkIn: "08:30 AM", checkOut: "05:30 PM", status: "Completed", verification: "PIN Authenticated" },
  { id: "ATT785", employeeName: "Elena Rostova", siteName: "Saint Jude Clinic", checkIn: "08:15 AM", checkOut: "--:--", status: "Late", verification: "GPS Override" },
  { id: "ATT786", employeeName: "Sarah Chen", siteName: "Sheraton Bay Resort", checkIn: "--:--", checkOut: "--:--", status: "Absent", verification: "No Clock In Logged" },
];

export const AttendanceList = () => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_ATTENDANCE.filter((att) => 
    att.employeeName.toLowerCase().includes(search.toLowerCase()) ||
    att.siteName.toLowerCase().includes(search.toLowerCase()) ||
    att.id.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status: ShiftLog["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Completed":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      case "Late":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Absent":
        return "bg-red-500/10 text-red-400 border-red-500/20";
    }
  };

  const getStatusIcon = (status: ShiftLog["status"]) => {
    switch (status) {
      case "Active":
        return <Play className="w-3 h-3 text-green-400 animate-pulse" />;
      case "Completed":
        return <CheckCircle2 className="w-3 h-3 text-violet-400" />;
      case "Late":
      case "Absent":
        return <AlertTriangle className="w-3 h-3 text-amber-400" />;
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
            placeholder="Search shift logs by staff or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-bs-input border border-bs rounded-bs text-sm text-bs-primary placeholder-bs-muted focus:outline-none focus:border-bs-accent/50 transition-colors"
          />
        </div>

        <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white rounded-full text-xs px-5 py-2">
          Export Logs
        </Button>
      </div>

      {/* Shifts Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-bs text-bs-muted text-xs font-semibold uppercase tracking-wider bg-bs-subtle/30">
              <th className="py-3 px-4">Shift ID</th>
              <th className="py-3 px-4">Staff Member</th>
              <th className="py-3 px-4">Site / Institution</th>
              <th className="py-3 px-4">Check In</th>
              <th className="py-3 px-4">Check Out</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Verification</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bs text-sm">
            {filtered.length > 0 ? (
              filtered.map((log) => (
                <tr key={log.id} className="hover:bg-bs-subtle/25 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs text-bs-muted">{log.id}</td>
                  <td className="py-4 px-4 font-semibold text-bs-primary">{log.employeeName}</td>
                  <td className="py-4 px-4 text-bs-secondary">{log.siteName}</td>
                  <td className="py-4 px-4 font-mono text-xs text-bs-secondary">{log.checkIn}</td>
                  <td className="py-4 px-4 font-mono text-xs text-bs-secondary">{log.checkOut}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${getStatusStyle(log.status)}`}>
                      {getStatusIcon(log.status)}
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-bs-secondary">
                    <span className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-violet-400" /> {log.verification}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 px-3 py-1 text-xs">
                      Audit Log
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-bs-muted text-sm">
                  No matching shift records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
