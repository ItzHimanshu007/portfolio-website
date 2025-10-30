"use client"

import type React from "react"

import { useRef, useState } from "react"
import { usePhysicsAnimation } from "@/hooks/use-physics-animation"

interface PhysicsCardProps {
  children: React.ReactNode
  className?: string
}

export function PhysicsCard({ children, className = "" }: PhysicsCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const rotX = usePhysicsAnimation(rotation.x, { friction: 0.2, tension: 0.15 })
  const rotY = usePhysicsAnimation(rotation.y, { friction: 0.2, tension: 0.15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientY - centerY) / 10
    const y = -(e.clientX - centerX) / 10

    setRotation({ x, y })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  )
}
