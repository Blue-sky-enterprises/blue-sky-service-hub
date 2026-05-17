"use client";

import { Star } from "lucide-react";

export function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
      ))}
    </div>
  );
}
