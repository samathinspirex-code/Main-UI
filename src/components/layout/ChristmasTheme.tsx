'use client'

import { useEffect, useRef } from 'react'

type Flake = { x: number; y: number; r: number; speed: number; sway: number; phase: number; alpha: number }

/**
 * Light snowfall over the whole site while the CMS Christmas theme is on.
 * One fixed canvas that ignores clicks; fewer flakes on phones; pauses in hidden tabs;
 * not rendered at all for visitors who prefer reduced motion.
 */
export default function ChristmasTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    let flakes: Flake[] = []
    const spawn = (anywhere: boolean): Flake => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -10,
      r: 1.2 + Math.random() * 2.6,
      speed: 18 + Math.random() * 38,
      sway: 8 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.45 + Math.random() * 0.45,
    })
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      flakes = Array.from({ length: width < 768 ? 30 : 70 }, () => spawn(true))
    }
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, width, height)
      // White flakes with a faint lavender rim and glow so they read on white pages as well as purple ones.
      ctx.shadowColor = 'rgba(110,80,180,0.55)'
      ctx.shadowBlur = 4
      ctx.lineWidth = 0.8
      for (const f of flakes) {
        f.y += f.speed * dt
        f.phase += dt * 0.8
        if (f.y > height + 10) Object.assign(f, spawn(false))
        ctx.beginPath()
        ctx.arc(f.x + Math.sin(f.phase) * f.sway, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${f.alpha})`
        ctx.fill()
        ctx.strokeStyle = `rgba(140,110,205,${f.alpha * 0.55})`
        ctx.stroke()
      }
      frame = requestAnimationFrame(tick)
    }
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }
    resize()
    frame = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="xmas-snow" aria-hidden="true" />
}
