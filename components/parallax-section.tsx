"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useCursorPosition } from "@/hooks/use-cursor-position"

interface ParallaxSectionProps {
  children: React.ReactNode
  intensity?: number
  className?: string
}

export function ParallaxSection({ children, intensity = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { position } = useCursorPosition()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distX = (position.x - centerX) * intensity * 0.01
    const distY = (position.y - centerY) * intensity * 0.01

    setOffset({ x: distX, y: distY })
  }, [position, intensity])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  )
}
