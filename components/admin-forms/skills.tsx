"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PortfolioData } from "@/lib/storage"

interface SkillsFormProps {
  data: PortfolioData
  onSave: (data: PortfolioData) => void
}

export default function AdminSkills({ data, onSave }: SkillsFormProps) {
  const [formData, setFormData] = useState(data.technicalSkills)

  const handleSkillChange = (category: string, index: number, value: string) => {
    const newSkills = { ...formData }
    const categorySkills = [...(newSkills[category as keyof typeof formData] as string[])]
    categorySkills[index] = value
    newSkills[category as keyof typeof formData] = categorySkills as any
    setFormData(newSkills)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...data, technicalSkills: formData })
  }

  const categories = [
    { key: "design", label: "Design" },
    { key: "development", label: "Development" },
    { key: "aiAndMl", label: "AI & ML" },
    { key: "softSkills", label: "Soft Skills" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-4">Technical Skills</h2>

      {categories.map((cat) => (
        <div key={cat.key}>
          <h3 className="text-lg font-semibold text-white mb-3">{cat.label}</h3>
          <div className="space-y-2">
            {(formData[cat.key as keyof typeof formData] as string[]).map((skill, index) => (
              <Input
                key={index}
                value={skill}
                onChange={(e) => handleSkillChange(cat.key, index, e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            ))}
          </div>
        </div>
      ))}

      <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
        Save Changes
      </Button>
    </form>
  )
}
