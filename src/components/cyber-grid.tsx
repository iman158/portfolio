"use client"

import { useEffect, useRef, useCallback } from "react"

interface CyberGridProps {
  isLowPerformance?: boolean
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  connection: number
}

interface Connection {
  from: number
  to: number
  life: number
  maxLife: number
}

export default function CyberGrid({ isLowPerformance = false }: CyberGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  // Performance-based configuration
  const config = {
    particleCount: isLowPerformance ? 30 : 60,
    gridSize: isLowPerformance ? 40 : 30,
    particleSize: isLowPerformance ? { min: 1, max: 2 } : { min: 1, max: 3 },
    connectionDistance: isLowPerformance ? 150 : 200,
    connectionMaxCount: isLowPerformance ? 2 : 3,
    fadeOpacity: isLowPerformance ? 0.2 : 0.1,
    maxFPS: isLowPerformance ? 30 : 60,
    particleSpeed: isLowPerformance ? 0.3 : 0.5,
    mouseInfluenceRadius: 150,
    mouseInfluenceStrength: 0.5,
  }

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      particlesRef.current = []
      for (let i = 0; i < config.particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min,
          speedX: (Math.random() - 0.5) * config.particleSpeed,
          speedY: (Math.random() - 0.5) * config.particleSpeed,
          opacity: Math.random() * 0.5 + 0.2,
          connection: Math.floor(Math.random() * config.connectionMaxCount),
        })
      }
      connectionsRef.current = []
    },
    [config.connectionMaxCount],
  )

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.strokeStyle = "rgba(0, 255, 0, 0.1)"
      ctx.lineWidth = 0.5

      // Draw vertical lines
      for (let x = 0; x <= width; x += config.gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= height; y += config.gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    },
    [config.gridSize],
  )

  const updateConnections = useCallback(() => {
    const particles = particlesRef.current
    const connections = connectionsRef.current

    // Update existing connections
    for (let i = connections.length - 1; i >= 0; i--) {
      connections[i].life--
      if (connections[i].life <= 0) {
        connections.splice(i, 1)
      }
    }

    // Create new connections
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]

      // Count current connections for this particle
      const currentConnections = connections.filter((c) => c.from === i || c.to === i).length

      if (currentConnections < p1.connection) {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < config.connectionDistance) {
            // Check if this connection already exists
            const connectionExists = connections.some(
              (c) => (c.from === i && c.to === j) || (c.from === j && c.to === i),
            )

            if (!connectionExists) {
              const maxLife = Math.floor(Math.random() * 200) + 100
              connections.push({
                from: i,
                to: j,
                life: maxLife,
                maxLife: maxLife,
              })
              break
            }
          }
        }
      }
    }
  }, [config.connectionDistance])

  const animate = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      let lastTime = 0
      const targetFrameTime = 1000 / config.maxFPS

      const frame = (currentTime: number) => {
        if (currentTime - lastTime < targetFrameTime) {
          animationIdRef.current = requestAnimationFrame(frame)
          return
        }
        lastTime = currentTime

        // Clear canvas with fade effect
        ctx.fillStyle = `rgba(0, 0, 0, ${config.fadeOpacity})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw grid
        drawGrid(ctx, canvas.width, canvas.height)

        // Update and draw connections
        updateConnections()

        const connections = connectionsRef.current
        const particles = particlesRef.current

        // Draw connections
        for (const connection of connections) {
          const p1 = particles[connection.from]
          const p2 = particles[connection.to]

          const alpha = (connection.life / connection.maxLife) * 0.8
          ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`
          ctx.lineWidth = 1

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()

          // Draw data packet moving along the connection
          const progress = 1 - connection.life / connection.maxLife
          const packetX = p1.x + (p2.x - p1.x) * progress
          const packetY = p1.y + (p2.y - p1.y) * progress

          ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 2})`
          ctx.beginPath()
          ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
          ctx.fill()
        }

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]

          // Apply mouse influence if active
          if (mouseRef.current.active) {
            const dx = mouseRef.current.x - p.x
            const dy = mouseRef.current.y - p.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < config.mouseInfluenceRadius) {
              const force = (config.mouseInfluenceRadius - distance) / config.mouseInfluenceRadius
              p.speedX += dx * force * config.mouseInfluenceStrength * 0.01
              p.speedY += dy * force * config.mouseInfluenceStrength * 0.01
            }
          }

          // Apply speed limits
          const maxSpeed = 2
          const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY)
          if (speed > maxSpeed) {
            p.speedX = (p.speedX / speed) * maxSpeed
            p.speedY = (p.speedY / speed) * maxSpeed
          }

          // Update position
          p.x += p.speedX
          p.y += p.speedY

          // Boundary check with bounce
          if (p.x < 0) {
            p.x = 0
            p.speedX *= -1
          } else if (p.x > canvas.width) {
            p.x = canvas.width
            p.speedX *= -1
          }

          if (p.y < 0) {
            p.y = 0
            p.speedY *= -1
          } else if (p.y > canvas.height) {
            p.y = canvas.height
            p.speedY *= -1
          }

          // Apply friction
          p.speedX *= 0.99
          p.speedY *= 0.99

          // Draw particle
          const size = p.size
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2)
          gradient.addColorStop(0, `rgba(0, 255, 0, ${p.opacity})`)
          gradient.addColorStop(1, "rgba(0, 255, 0, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
          ctx.fill()

          // Core of the particle
          ctx.fillStyle = `rgba(0, 255, 0, ${p.opacity * 2})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        animationIdRef.current = requestAnimationFrame(frame)
      }

      animationIdRef.current = requestAnimationFrame(frame)
    },
    [config, drawGrid, updateConnections],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      const dpr = isLowPerformance ? 1 : window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      ctx.scale(dpr, dpr)
      initParticles(canvas)
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("mouseenter", () => {
      mouseRef.current.active = true
    })

    // Touch interaction for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          active: true,
        }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)

    resizeCanvas()
    animate(canvas, ctx)

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 250)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [animate, initParticles, isLowPerformance])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full"
      style={{
        width: "100vw",
        height: "100vh",
        willChange: "transform",
        pointerEvents: "auto", // Enable mouse interaction
      }}
    />
  )
}
