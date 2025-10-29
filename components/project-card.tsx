import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  category: string
  image: string
  slug: string
}

export function ProjectCard({ title, category, image, slug }: ProjectCardProps) {
  const getProjectImage = (projectTitle: string) => {
    const imageMap: { [key: string]: string } = {
      Neuronest: "/ai-startup-dashboard-with-neural-network-visualiza.jpg",
      "Civic Pulse": "/community-engagement-platform-dashboard-with-metri.jpg",
      "Loan Approval Prediction": "/ai-machine-learning-loan-approval-prediction-syste.jpg",
    }
    return imageMap[projectTitle] || `/placeholder.svg?height=192&width=400&query=${projectTitle} project`
  }

  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-cyan-500/50 transition-all h-full">
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <Image
            src={getProjectImage(title) || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            <div className="text-xs text-cyan-400 mb-1">{category}</div>
            <h3 className="font-medium text-sm sm:text-base">{title}</h3>
          </div>
        </div>
      </Card>
    </Link>
  )
}
