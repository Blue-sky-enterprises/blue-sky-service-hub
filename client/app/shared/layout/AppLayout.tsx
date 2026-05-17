"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { Button } from "@/app/shared/ui/Button";
import { ThemeToggle } from "@/app/shared/components/ThemeToggle";
import { Users, Building2, Clock, LogOut, LayoutDashboard, Zap } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { label: "Dashboard", href: "/home", icon: LayoutDashboard },
    { label: "Employees", href: "/employees", icon: Users },
    { label: "Clients", href: "/clients", icon: Building2 },
    { label: "Attendance", href: "/attendance", icon: Clock },
  ];

  return (
   <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
  {/* Navbar */}
  <header className="sticky top-0 z-40 border-b border-bs bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
      
      {/* Left Section */}
      <div className="flex items-center gap-6 min-w-0">
        
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>

          <span className="font-bold text-lg tracking-tight whitespace-nowrap">
            Blue Sky
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Info */}
        <div className="flex items-center gap-3 border-l pl-3">
          
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-sm font-semibold truncate max-w-[120px]">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs text-muted-foreground capitalize">
              {user?.role || "user"}
            </p>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="rounded-full h-9 w-9 hover:text-red-500"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
    {children}
  </main>
</div>
  );
}
