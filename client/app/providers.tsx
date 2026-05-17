"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { useState, useEffect } from "react"
import { ThemeTransitionProvider } from "./shared/components/ThemeTransition"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <QueryClientProvider client={queryClient}>

      <ThemeTransitionProvider>
        {children}
      </ThemeTransitionProvider>
    </QueryClientProvider>
  )
}