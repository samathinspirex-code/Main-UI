'use client'

import { useEffect, useRef } from 'react'

type Flake = { x: number; y: number; size: number; speed: number; sway: number; phase: number; spin: number; angle: number; alpha: number; kind: number }

const SPRITE = 96 // px per sprite side before device-pixel scaling

/**
 * Draws one six-armed ice-crystal snowflake (branching arms, hexagon centre) in icy blue
 * onto its own small canvas, so each frame only has to stamp and rotate it.
 */
function makeSprite(kind: number, dpr: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SPRITE * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.translate(SPRITE / 2, SPRITE / 2)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const R = SPRITE / 2 - 4
  // Branch positions along each arm (fraction of arm, branch length fraction) — three crystal styles.
  const styles: Array<Array<[number, number]>> = [
    [[0.32, 0.22], [0.52, 0.26], [0.72, 0.18], [0.88, 0.09]],
    [[0.4, 0.34], [0.7, 0.2]],
    [[0.28, 0.14], [0.45, 0.2], [0.62, 0.22], [0.78, 0.15], [0.9, 0.07]],
  ]
  const branches = styles[kind % styles.length]

  const arm = () => {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -R)
    for (const [at, len] of branches) {
      const y = -R * at
      const l = R * len
      ctx.moveTo(0, y)
      ctx.lineTo(-l * Math.sin(Math.PI / 3), y - l * Math.cos(Math.PI / 3))
      ctx.moveTo(0, y)
      ctx.lineTo(l * Math.sin(Math.PI / 3), y - l * Math.cos(Math.PI / 3))
    }
    ctx.stroke()
    // Pointed crystal tip.
    ctx.beginPath()
    ctx.moveTo(0, -R - 3)
    ctx.lineTo(-2.6, -R + 2)
    ctx.lineTo(0, -R + 5)
    ctx.lineTo(2.6, -R + 2)
    ctx.closePath()
    ctx.fill()
  }
  const hexagon = (r: number) => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i
      ctx[i ? 'lineTo' : 'moveTo'](r * Math.sin(a), -r * Math.cos(a))
    }
    ctx.closePath()
  }

  // Outer deep-blue edge, then a pale icy core on top, like light through ice.
  for (const [width, colour] of [[4.2, 'rgba(38,70,190,0.9)'], [1.6, 'rgba(225,236,255,0.95)']] as const) {
    ctx.lineWidth = width
    ctx.strokeStyle = colour
    ctx.fillStyle = colour
    for (let i = 0; i < 6; i++) {
      ctx.save()
      ctx.rotate((Math.PI / 3) * i)
      arm()
      ctx.restore()
    }
  }
  hexagon(R * 0.2)
  ctx.fillStyle = 'rgba(190,210,255,0.85)'
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'rgba(38,70,190,0.9)'
  ctx.stroke()
  hexagon(R * 0.09)
  ctx.lineWidth = 1.2
  ctx.strokeStyle = 'rgba(255,255,255,0.95)'
  ctx.stroke()
  return canvas
}

/**
 * Light snowfall over the whole site while the CMS Christmas theme is on: slowly turning
 * six-armed crystal snowflakes (no round dots). One fixed canvas that ignores clicks;
 * fewer flakes on phones; pauses in hidden tabs; not rendered for reduced-motion visitors.
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
    let sprites: HTMLCanvasElement[] = []
    const spawn = (anywhere: boolean): Flake => {
      const size = 10 + Math.random() * (width < 768 ? 12 : 18)
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : -size,
        size,
        speed: 22 + size * 1.4 + Math.random() * 18,
        sway: 10 + Math.random() * 24,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.2,
        angle: Math.random() * Math.PI,
        alpha: 0.55 + Math.random() * 0.4,
        kind: Math.floor(Math.random() * 3),
      }
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sprites = [0, 1, 2].map((kind) => makeSprite(kind, dpr))
      flakes = Array.from({ length: width < 768 ? 18 : 40 }, () => spawn(true))
    }
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const dpr = canvas.width / width
      for (const f of flakes) {
        f.y += f.speed * dt
        f.phase += dt * 0.8
        f.angle += f.spin * dt
        if (f.y > height + f.size) Object.assign(f, spawn(false))
        ctx.setTransform(dpr, 0, 0, dpr, (f.x + Math.sin(f.phase) * f.sway) * dpr, f.y * dpr)
        ctx.rotate(f.angle)
        ctx.globalAlpha = f.alpha
        ctx.drawImage(sprites[f.kind], -f.size / 2, -f.size / 2, f.size, f.size)
      }
      ctx.globalAlpha = 1
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
