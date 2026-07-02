"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

const floatClasses = ["animate-float-slow", "animate-float-medium", "animate-float-fast"]

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const { offsetWidth, offsetHeight } = canvas
      canvas.width = offsetWidth * 2
      canvas.height = offsetHeight * 2
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(2, 2)
    }

    resize()

    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    const stars: { x: number; y: number; r: number; opacity: number; speed: number }[] = []
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.005 + 0.002,
      })
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const time = Date.now()
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * star.speed)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${star.opacity * twinkle})`
        ctx.fill()
      }
      frame = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => resize()
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

interface MalestarCardProps {
  item: { id: string; name: string; image: string; description: string }
  index: number
  accentColor: string
  glowColor: string
}

function MalestarCard({ item, index, accentColor, glowColor }: MalestarCardProps) {
  const delayClass = index === 0 ? "delay-100" : index === 1 ? "delay-200" : "delay-300"

  return (
    <div
      className={`
        scroll-reveal-scale group relative
        flex flex-col items-center
        rounded-3xl p-6 sm:p-8
        transition-all duration-500 ease-out
        hover:scale-[1.03]
        ${delayClass}
      `}
      style={{
        background: `linear-gradient(165deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 100%)`,
        boxShadow: `
          0 4px 24px rgba(0, 0, 0, 0.12),
          0 1px 3px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${glowColor}25 0%, transparent 70%)`,
        }}
      />

      {/* Dynamic shadow layer */}
      <div
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[32px] opacity-0 transition-all duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(180deg, ${glowColor}15 0%, transparent 60%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Character container */}
      <div
        className={`
          relative z-10 mb-6
          transition-transform duration-500 ease-out
          group-hover:scale-110 group-hover:-translate-y-2
          ${floatClasses[index]}
        `}
      >
        {/* Character glow ring */}
        <div
          className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${glowColor}30 0%, transparent 70%)`,
            transform: "scale(1.4)",
          }}
        />

        {/* Character image */}
        <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-60 lg:w-60">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain drop-shadow-xl"
            sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
            priority
          />
        </div>
      </div>

      {/* Malestar name */}
      <h3
        className="relative z-10 text-center text-xl font-bold tracking-wide sm:text-2xl md:text-2xl lg:text-3xl"
        style={{ color: accentColor }}
      >
        {item.name}
      </h3>

      {/* Interactive indicator */}
      <div className="relative z-10 mt-4 flex items-center gap-2">
        <div
          className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:h-2 group-hover:w-2"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="h-1 w-8 rounded-full transition-all duration-300 group-hover:w-10"
          style={{ backgroundColor: `${accentColor}50` }}
        />
        <div
          className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:h-2 group-hover:w-2"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Subtle bottom border accent */}
      <div
        className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full transition-all duration-500 group-hover:w-16"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  )
}

export function Malestars() {
  const sectionRef = useScrollReveal()
  const malestars = useCMSStore((s) => s.malestars)

  const items = malestars.items
  const colorSchemes = [
    { accent: "#E31E24", glow: "#E31E24" },    // Fiebrin - red
    { accent: "#0099D6", glow: "#0099D6" },    // Inflamon - blue
    { accent: "#F5A623", glow: "#F5A623" },    // Dolores - orange/yellow
  ]

  return (
    <section
      id="malestars"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
      style={{
        background:
          "linear-gradient(160deg, #0c3d6e 0%, #0b2a4a 45%, #0a2440 70%, #0c3d6e 100%)",
      }}
    >
      {/* Star field */}
      <StarField />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-[#0099d6]/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-32 h-96 w-96 rounded-full bg-[#e31e24]/8 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[#F5A623]/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="scroll-reveal mb-12 text-center md:mb-16 lg:mb-20">
          <Image
            src={malestars.logoImage || "/images/malestars-logo.png"}
            alt="Malestars"
            width={320}
            height={85}
            className="mx-auto w-[200px] sm:w-[260px] md:w-[280px] lg:w-[320px]"
            priority
          />
          <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-[15px] leading-relaxed text-blue-100/90">
            {malestars.tagline}
          </p>
          <p className="mt-2 text-xs sm:text-[13px] text-blue-200/60">
            {malestars.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {items.map((item, index) => (
            <MalestarCard
              key={item.id}
              item={item}
              index={index}
              accentColor={colorSchemes[index]?.accent ?? "#0099D6"}
              glowColor={colorSchemes[index]?.glow ?? "#0099D6"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
