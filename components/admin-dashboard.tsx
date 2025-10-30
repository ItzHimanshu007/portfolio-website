"use client"

import { useState } from "react"
import { getPortfolioData, updatePortfolioData } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AdminPersonalInfo from "@/components/admin-forms/personal-info"
import AdminAbout from "@/components/admin-forms/about"
import AdminExperience from "@/components/admin-forms/experience"
import AdminCredentials from "@/components/admin-forms/credentials"
import AdminSkills from "@/components/admin-forms/skills"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [data, setData] = useState(getPortfolioData())
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (updatedData: any) => {
    setData(updatedData)
    updatePortfolioData(updatedData)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "credentials", label: "Credentials" },
    { id: "skills", label: "Skills" },
  ]

  return (
    <div className="min-h-screen bg-zinc-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-1">Manage your portfolio content</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 bg-transparent"
          >
            Logout
          </Button>
        </div>

        {/* Save Notification */}
        {isSaved && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded text-green-400 text-sm">
            Changes saved successfully!
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "bg-cyan-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <Card className="bg-zinc-800 border-zinc-700">
          <div className="p-6">
            {activeTab === "personal" && <AdminPersonalInfo data={data} onSave={handleSave} />}
            {activeTab === "about" && <AdminAbout data={data} onSave={handleSave} />}
            {activeTab === "experience" && <AdminExperience data={data} onSave={handleSave} />}
            {activeTab === "credentials" && <AdminCredentials data={data} onSave={handleSave} />}
            {activeTab === "skills" && <AdminSkills data={data} onSave={handleSave} />}
          </div>
        </Card>
      </div>
    </div>
  )
}
