'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthMode } from '../types/auth'
import { AuthRightPanel, AuthLeftPanel } from '../components'
import { useAuthStore } from '@/app/store/authStore'

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const user = {
          id: payload.sub,
          email: payload.email,
          role: payload.role,
          firstName: payload.firstName || '',
          lastName: payload.lastName || ''
        }
        setAuth(user, token)
        router.push('/')
      } catch (err) {
        console.error("Failed to parse token", err)
      }
    }
  }, [searchParams, router, setAuth])

  return (
    <div className="min-h-screen bg-bs-bg flex">
      <AuthLeftPanel />
      <AuthRightPanel mode={mode} />
    </div>
  )
}