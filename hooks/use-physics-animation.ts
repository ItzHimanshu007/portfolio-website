"use client"

import { useState, useEffect, useRef } from "react"

interface PhysicsConfig {
  friction?: number
  tension?: number
  mass?: number
}

export function usePhysicsAnimation(targetValue: number, config: PhysicsConfig = {}) {
  const { friction = 0.1, tension = 0.2, mass = 1 } = config
  const [value, setValue] = useState(targetValue)
  const velocityRef = useRef(0)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const animate = () => {
      setValue((currentValue) => {
        const distance = targetValue - currentValue
        const force = distance * tension
        velocityRef.current += force / mass
        velocityRef.current *= 1 - friction

        const newValue = currentValue + velocityRef.current

        if (Math.abs(distance) > 0.01 || Math.abs(velocityRef.current) > 0.01) {
          animationFrameRef.current = requestAnimationFrame(animate)
        }

        return newValue
      })
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [targetValue, friction, tension, mass])

  return value
}
