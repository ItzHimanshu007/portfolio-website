"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { AnimatedSection } from "@/components/animated-section"
import { GlobeIcon, ArrowRight } from "lucide-react"
import { getAllProjects } from "@/lib/data"

export function RecentProjectsSection() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    const allProjects = getAllProjects()
    const mainProjects = allProjects.filter((p) =>
      ["neuronest-ai-vr-therapy", "civic-pulse-ai-governance", "loan-approval-prediction"].includes(p.slug),
    )
    setProjects(mainProjects)
  }, [])

  return (
    <AnimatedSection animation="fade-up" id="projects">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GlobeIcon className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg sm:text-xl font-semibold">Recent Projects</h3>
              </div>
              <Link href="/projects">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-3 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                >
                  View All
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Explore my latest work in AI, machine learning, and innovative technology solutions
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {projects.map((project, index) => (
              <AnimatedSection key={project.id} animation="zoom-in" delay={100 * (index + 1)}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  image={project.thumbnailImage}
                  slug={project.slug}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-zinc-800">
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-cyan-400">{projects.length}</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">Featured Projects</div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-cyan-400">3+</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">Technologies</div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">Completed</div>
              </div>
            </AnimatedSection>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
