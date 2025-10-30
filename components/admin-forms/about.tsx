"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PortfolioData } from "@/lib/storage"

interface AboutFormProps {
  data: PortfolioData
  onSave: (data: PortfolioData) => void
}

export default function AdminAbout({ data, onSave }: AboutFormProps) {
  const [formData, setFormData] = useState(data.about)

  const handleBioChange = (value: string) => {
    setFormData({ ...formData, bio: value })
  }

  const handleFocusChange = (index: number, value: string) => {
    const newFocus = [...formData.focus]
    newFocus[index] = value
    setFormData({ ...formData, focus: newFocus })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...data, about: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">About Section</h2>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleBioChange(e.target.value)}
          className="w-full bg-zinc-700 border border-zinc-600 text-white rounded p-2 min-h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Focus Areas</label>
        <div className="space-y-2">
          {formData.focus.map((item, index) => (
            <Input
              key={index}
              value={item}
              onChange={(e) => handleFocusChange(index, e.target.value)}
              className="bg-zinc-700 border-zinc-600 text-white"
            />
          ))}
        </div>
      </div>

      <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
        Save Changes
      </Button>
    </form>
  )
}
