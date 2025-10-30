"use client"

import { useState, useEffect } from "react"

export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsMoving(false), 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  return { position, isMoving }
}
