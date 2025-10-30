"use client"

import { useCursorPosition } from "@/hooks/use-cursor-position"
import { usePhysicsAnimation } from "@/hooks/use-physics-animation"

export function CursorFollower() {
  const { position } = useCursorPosition()
  const x = usePhysicsAnimation(position.x, { friction: 0.15, tension: 0.3 })
  const y = usePhysicsAnimation(position.y, { friction: 0.15, tension: 0.3 })

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
        }}
      />
      {/* Outer glow ring */}
      <div
        className="fixed w-8 h-8 border border-cyan-400/30 rounded-full pointer-events-none z-50"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}
