"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PortfolioData } from "@/lib/storage"

interface CredentialsFormProps {
  data: PortfolioData
  onSave: (data: PortfolioData) => void
}

export default function AdminCredentials({ data, onSave }: CredentialsFormProps) {
  const [formData, setFormData] = useState(data.credentials)

  const handleCertChange = (index: number, field: string, value: string) => {
    const newCerts = [...formData.certifications]
    newCerts[index] = { ...newCerts[index], [field]: value }
    setFormData({ ...formData, certifications: newCerts })
  }

  const handleEduChange = (index: number, field: string, value: string) => {
    const newEdu = [...formData.education]
    newEdu[index] = { ...newEdu[index], [field]: value }
    setFormData({ ...formData, education: newEdu })
  }

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills]
    newSkills[index] = value
    setFormData({ ...formData, skills: newSkills })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...data, credentials: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-4">Credentials</h2>

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Certifications</h3>
        <div className="space-y-3">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="p-3 bg-zinc-700/50 rounded space-y-2">
              <Input
                value={cert.name}
                onChange={(e) => handleCertChange(index, "name", e.target.value)}
                placeholder="Certification name"
                className="bg-zinc-600 border-zinc-500 text-white"
              />
              <Input
                value={cert.issuer}
                onChange={(e) => handleCertChange(index, "issuer", e.target.value)}
                placeholder="Issuer"
                className="bg-zinc-600 border-zinc-500 text-white"
              />
              <Input
                value={cert.date}
                onChange={(e) => handleCertChange(index, "date", e.target.value)}
                placeholder="Date"
                className="bg-zinc-600 border-zinc-500 text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Education</h3>
        <div className="space-y-3">
          {formData.education.map((edu, index) => (
            <div key={index} className="p-3 bg-zinc-700/50 rounded space-y-2">
              <Input
                value={edu.degree}
                onChange={(e) => handleEduChange(index, "degree", e.target.value)}
                placeholder="Degree"
                className="bg-zinc-600 border-zinc-500 text-white"
              />
              <Input
                value={edu.institution}
                onChange={(e) => handleEduChange(index, "institution", e.target.value)}
                placeholder="Institution"
                className="bg-zinc-600 border-zinc-500 text-white"
              />
              <Input
                value={edu.year}
                onChange={(e) => handleEduChange(index, "year", e.target.value)}
                placeholder="Year"
                className="bg-zinc-600 border-zinc-500 text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
        <div className="space-y-2">
          {formData.skills.map((skill, index) => (
            <Input
              key={index}
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
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
