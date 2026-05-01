'use client'

import { AuthMode } from '../types/auth'
import { AuthRightPanel, AuthLeftPanel } from '../components'

export default function AuthPage({ mode }: { mode: AuthMode }) {
  return (
    <div className="min-h-screen bg-bs-bg flex">
      <AuthLeftPanel />
      <AuthRightPanel mode={mode} />
    </div>
  )
}