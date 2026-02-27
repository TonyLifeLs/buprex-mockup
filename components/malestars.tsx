"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const characters = [
  {
    name: "Fiebrex",
    image: "/images/mascot-red.png",
    description: "Representa la fiebre. BUPREX lo combate con su accion antipiretica.",
    glow: "shadow-[0_0_40px_rgba(227,30,36,0.3)]",
    floatClass: "animate-float-slow",
  },
  {
    name: "Dolorex",
    image: "/images/mascot-blue.png",
    description: "Representa el dolor. BUPREX lo vence con su accion analgesica rapida.",
    glow: "shadow-[0_0_40px_rgba(0,153,214,0.3)]",
    floatClass: "animate-float-medium",
  },
  {
    name: "Inflamex",
    image: "/images/mascot-orange.png",
    description: "Representa la inflamacion. BUPREX la reduce con su accion antiinflamatoria.",
    glow: "shadow-[0_0_40px_rgba(245,166,35,0.3)]",
    floatClass: "animate-float-fast",
  },
]

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()

    const stars: { x: number; y: number; r: number; opacity: number; speed: number }[] = []
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.005 + 0.002,
      })
    }

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const time = Date.now()
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * star.speed)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
      }
      frame = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      resize()
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}

export function Malestars() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="malestars"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, #0c3d6e 0%, #0b2a4a 50%, #0c3d6e 100%)" }}
    >
      {/* Animated star field */}
      <StarField />

      {/* Soft glow orbs */}
      <div className="pointer-events-none absolute top-20 left-20 h-60 w-60 rounded-full bg-[#0099d6]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-20 h-60 w-60 rounded-full bg-[#e31e24]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="scroll-reveal mx-auto max-w-2xl text-center">
          <Image
            src="/images/malestars-logo.png"
            alt="Malestars logo"
            width={340}
            height={90}
            className="mx-auto mb-4"
          />
          <p className="mt-4 text-lg leading-relaxed text-blue-100/80">
            Si los MALESTARS hacen su aparicion, BUPREX los calma con su gran accion.
          </p>
          <p className="mt-2 text-sm text-blue-200/60">
            Conoce a los villanos que BUPREX combate con su triple accion: analgesica, antipiretica y antiinflamatoria.
          </p>
        </div>

        {/* Characters grid - with floating animations */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {characters.map((char, i) => (
            <div
              key={char.name}
              className={`scroll-reveal group flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-sm transition-all hover:bg-white/10 ${char.glow} hover:scale-[1.02]`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Floating mascot - circular */}
              <div className={`relative mb-8 h-44 w-44 overflow-hidden rounded-full border-4 border-white/20 bg-white/10 ${char.floatClass}`}>
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  className="object-contain p-3 drop-shadow-2xl"
                />
              </div>
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-white">
                {char.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100/70">
                {char.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tagline with image */}
        <div className="scroll-reveal mt-16 flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <div className="animate-float-medium">
            <Image
              src="/images/malestars-3d.png"
              alt="MALESTARS 3D logo"
              width={240}
              height={80}
              className="drop-shadow-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-white">Triple accion BUPREX</p>
            <p className="text-sm text-blue-200/70">
              Baja la fiebre - Alivia el dolor - Desinflama
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
