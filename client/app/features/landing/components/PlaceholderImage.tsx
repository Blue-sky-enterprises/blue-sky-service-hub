"use client";

import { Users } from "lucide-react";

export function PlaceholderImage({
  className = "",
  label = "Image",
  aspect = "aspect-video",
}: {
  className?: string;
  label?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} ${className} bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex flex-col items-center justify-center border border-slate-700/50 overflow-hidden relative`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />
      <Users className="w-10 h-10 text-slate-600 mb-2" />
      <span className="text-slate-500 text-xs font-medium">{label}</span>
    </div>
  );
}
