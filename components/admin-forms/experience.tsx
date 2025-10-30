"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PortfolioData } from "@/lib/storage"

interface ExperienceFormProps {
  data: PortfolioData
  onSave: (data: PortfolioData) => void
}

export default function AdminExperience({ data, onSave }: ExperienceFormProps) {
  const [formData, setFormData] = useState(data.experience)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleChange = (index: number, field: string, value: any) => {
    const newExperience = [...formData]
    newExperience[index] = { ...newExperience[index], [field]: value }
    setFormData(newExperience)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...data, experience: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-4">Experience</h2>

      {formData.map((exp, index) => (
        <div key={index} className="p-4 bg-zinc-700/50 rounded space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
              <Input
                value={exp.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="bg-zinc-600 border-zinc-500 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Company</label>
              <Input
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                className="bg-zinc-600 border-zinc-500 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Period</label>
              <Input
                value={exp.period}
                onChange={(e) => handleChange(index, "period", e.target.value)}
                className="bg-zinc-600 border-zinc-500 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              className="w-full bg-zinc-600 border border-zinc-500 text-white rounded p-2 min-h-20"
            />
          </div>
        </div>
      ))}

      <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
        Save Changes
      </Button>
    </form>
  )
}
