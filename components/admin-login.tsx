"use client"

import type React from "react"

import { useState } from "react"
import { validateAdminPassword, setAdminToken } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (validateAdminPassword(password)) {
      setAdminToken()
      onLoginSuccess()
    } else {
      setError("Invalid password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-800 border-zinc-700">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-zinc-400 mb-6">Enter your password to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-zinc-700 border-zinc-600 text-white"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-xs text-zinc-500 mt-4">
            Demo password: <code className="bg-zinc-700 px-2 py-1 rounded">admin123</code>
          </p>
        </div>
      </Card>
    </div>
  )
}
