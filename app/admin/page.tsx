"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdminLoggedIn, clearAdminToken } from "@/lib/storage"
import AdminLogin from "@/components/admin-login"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(false)
    setIsLoggedIn(isAdminLoggedIn())
  }, [])

  const handleLogout = () => {
    clearAdminToken()
    setIsLoggedIn(false)
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  )
}
