'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    color: string
    alpha: number
}

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -1000, y: -1000 })
    const particlesRef = useRef<Particle[]>([])
    const animationRef = useRef<number>(0)
    const dimensionsRef = useRef({ width: 0, height: 0 })

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 30 : 80
    const CONNECTION_DISTANCE = isMobile ? 100 : 150
    const MOUSE_RADIUS = 180
    const COLORS = [
        'rgba(59, 130, 246,',   // blue-500
        'rgba(139, 92, 246,',   // purple-500
        'rgba(236, 72, 153,',   // pink-500
        'rgba(14, 165, 233,',   // sky-500
        'rgba(168, 85, 247,',   // purple-400
    ]

    const createParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = []
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                alpha: Math.random() * 0.5 + 0.3,
            })
        }
        return particles
    }, [])

    const animate = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const { width, height } = dimensionsRef.current
        ctx.clearRect(0, 0, width, height)

        const particles = particlesRef.current
        const mouse = mouseRef.current

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]

            // Mouse interaction — gentle push away
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < MOUSE_RADIUS && dist > 0) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
                p.vx += (dx / dist) * force * 0.3
                p.vy += (dy / dist) * force * 0.3
            }

            // Apply velocity with damping
            p.vx *= 0.98
            p.vy *= 0.98
            p.x += p.vx
            p.y += p.vy

            // Wrap around edges
            if (p.x < -10) p.x = width + 10
            if (p.x > width + 10) p.x = -10
            if (p.y < -10) p.y = height + 10
            if (p.y > height + 10) p.y = -10

            // Draw particle
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
            ctx.fillStyle = `${p.color} ${p.alpha})`
            ctx.fill()

            // Draw glow
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
            ctx.fillStyle = `${p.color} ${p.alpha * 0.15})`
            ctx.fill()
        }

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x
                const dy = particles[i].y - particles[j].y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < CONNECTION_DISTANCE) {
                    const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.2
                    ctx.beginPath()
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                }
            }
        }

        // Draw mouse connections
        for (let i = 0; i < particles.length; i++) {
            const dx = particles[i].x - mouse.x
            const dy = particles[i].y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < MOUSE_RADIUS) {
                const opacity = (1 - dist / MOUSE_RADIUS) * 0.4
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(mouse.x, mouse.y)

                const gradient = ctx.createLinearGradient(
                    particles[i].x, particles[i].y, mouse.x, mouse.y
                )
                gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
                gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity})`)
                ctx.strokeStyle = gradient
                ctx.lineWidth = 0.8
                ctx.stroke()
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            const parent = canvas.parentElement
            if (!parent) return
            const { width, height } = parent.getBoundingClientRect()
            canvas.width = width
            canvas.height = height
            dimensionsRef.current = { width, height }

            // Recreate particles if needed (first time or resize)
            if (particlesRef.current.length === 0) {
                particlesRef.current = createParticles(width, height)
            } else {
                // Reposition out-of-bounds particles
                particlesRef.current.forEach(p => {
                    if (p.x > width) p.x = Math.random() * width
                    if (p.y > height) p.y = Math.random() * height
                })
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('resize', handleResize)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationRef.current)
        }
    }, [animate, createParticles])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'auto' }}
        />
    )
}

export default ParticleBackground
