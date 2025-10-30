"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PortfolioData } from "@/lib/storage"

interface PersonalInfoFormProps {
  data: PortfolioData
  onSave: (data: PortfolioData) => void
}

export default function AdminPersonalInfo({ data, onSave }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState(data.personal)

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...data, personal: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-zinc-700 border-zinc-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="bg-zinc-700 border-zinc-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
          <Input
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-zinc-700 border-zinc-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-zinc-700 border-zinc-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Location</label>
          <Input
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="bg-zinc-700 border-zinc-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Avatar URL</label>
          <Input
            value={formData.avatar}
            onChange={(e) => handleChange("avatar", e.target.value)}
            className="bg-zinc-700 border-zinc-600 text-white"
          />
        </div>
      </div>

      <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
        Save Changes
      </Button>
    </form>
  )
}
