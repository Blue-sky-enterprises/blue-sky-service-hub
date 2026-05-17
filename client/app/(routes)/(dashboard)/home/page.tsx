"use client";

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/app/store/authStore';
import { Button } from '@/app/shared/ui/Button';
import { Users, Building2, Clock, Zap, Activity, UserCheck } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuthStore();

  console.log("User: ", user)
  const stats = [
    { label: "Vetted Professionals", value: "254", description: "240 Active, 14 Pending", icon: UserCheck, color: "text-green-400 bg-green-500/10" },
    { label: "Active Client Contracts", value: "18", description: "8 Hospitality, 10 Medical/Care", icon: Building2, color: "text-violet-400 bg-violet-500/10" },
    { label: "Active Clock-Ins Today", value: "186", description: "GPS & FaceID verified", icon: Clock, color: "text-blue-400 bg-blue-500/10" },
  ];

  const recentActivity = [
    { id: 1, staff: "Maria Santos", action: "Clocked In", site: "Grand Ritz Resort", time: "10 mins ago", type: "in" },
    { id: 2, staff: "Dr. James Lim", action: "Completed Shift", site: "Mercy Health Group", time: "45 mins ago", type: "out" },
    { id: 3, staff: "Aisha Khan", action: "Clocked In", site: "Kaiser Family Estate", time: "1 hour ago", type: "in" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Welcome banner */}
      <div className="bg-bs-card border border-bs rounded-bs-lg p-8 shadow-bs-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-gradient-to-l from-violet-500 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-bs-primary mb-2">
            Welcome back, {user?.firstName || 'Workforce Specialist'}!
          </h1>
          <p className="text-bs-secondary text-sm max-w-xl leading-relaxed">
            Manage B2B human resource operations, track employee profiles, audit daily geofenced check-ins, and configure partner institution scaling structures.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-bs-card border border-bs rounded-bs-lg p-6 shadow-bs-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-bs flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase text-bs-muted block tracking-wide font-semibold">{stat.label}</span>
                <span className="text-2xl font-bold text-bs-primary mt-0.5 block">{stat.value}</span>
                <span className="text-[11px] text-bs-secondary mt-0.5 block">{stat.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick actions cards */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-bs-primary flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-500" /> Core Operations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Employees */}
            <div className="bg-bs-card border border-bs rounded-bs-lg p-6 flex flex-col justify-between shadow-bs-sm hover:border-bs-accent/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-bs bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-violet-500" />
                </div>
                <h3 className="text-base font-bold text-bs-primary mb-1">Employees</h3>
                <p className="text-bs-secondary text-xs mb-6 leading-relaxed">
                  Audit vetting dossiers, check credentials, background status, and ratings.
                </p>
              </div>
              <Link href="/employees">
                <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-full text-xs">
                  Manage Employees
                </Button>
              </Link>
            </div>

            {/* Clients */}
            <div className="bg-bs-card border border-bs rounded-bs-lg p-6 flex flex-col justify-between shadow-bs-sm hover:border-bs-accent/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-bs bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-violet-500" />
                </div>
                <h3 className="text-base font-bold text-bs-primary mb-1">Clients</h3>
                <p className="text-bs-secondary text-xs mb-6 leading-relaxed">
                  Configure corporate scaling, B2B contract terms, and deployed staff.
                </p>
              </div>
              <Link href="/clients">
                <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-full text-xs">
                  Manage Clients
                </Button>
              </Link>
            </div>

            {/* Attendance */}
            <div className="bg-bs-card border border-bs rounded-bs-lg p-6 flex flex-col justify-between shadow-bs-sm hover:border-bs-accent/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-bs bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-violet-500" />
                </div>
                <h3 className="text-base font-bold text-bs-primary mb-1">Attendance</h3>
                <p className="text-bs-secondary text-xs mb-6 leading-relaxed">
                  Monitor active shift clock-ins, GPS coordinates, and FaceID check-ins.
                </p>
              </div>
              <Link href="/attendance">
                <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-full text-xs">
                  Track Attendance
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Live feed */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-bs-primary flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-500 animate-pulse" /> Live Deployment Logs
          </h2>

          <div className="bg-bs-card border border-bs rounded-bs-lg p-6 shadow-bs-sm space-y-4">
            {recentActivity.map((act) => (
              <div key={act.id} className="flex justify-between items-start text-xs border-b border-bs pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="font-semibold text-bs-primary">{act.staff}</p>
                  <p className="text-bs-muted">
                    {act.action} @ <span className="text-bs-secondary">{act.site}</span>
                  </p>
                </div>
                <span className="text-[10px] text-bs-secondary bg-bs-subtle/50 px-2 py-0.5 rounded font-mono">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
