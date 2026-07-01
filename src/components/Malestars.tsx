"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

const floatClasses = ["animate-float-slow", "animate-float-medium", "animate-float-fast"]

// ===== Fondo de estrellas (canvas) =====
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

export function Malestars() {
  const sectionRef = useScrollReveal()
  const malestars = useCMSStore((s) => s.malestars)

  const red = malestars.items[0]
  const blue = malestars.items[1]
  const orange = malestars.items[2]

  return (
    <section
      id="malestars"
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, #0c3d6e 0%, #0b2a4a 50%, #0c3d6e 100%)",
      }}
    >
      {/* Estrellas */}
      <StarField />

      {/* Orbes suaves */}
      <div className="pointer-events-none absolute left-16 top-12 h-60 w-60 rounded-full bg-[#0099d6]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 right-16 h-60 w-60 rounded-full bg-[#e31e24]/10 blur-3xl" />

      {/* Lienzo de composición */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="relative mx-auto h-[420px] sm:h-[460px] md:h-[520px] lg:h-[560px] xl:h-[600px]">
          {/* ===== Logo + copy CENTRADOS (recto en el medio) ===== */}
          <div className="scroll-reveal absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <Image
              src={malestars.logoImage || "/images/malestars-logo.png"}
              alt="Malestars logo"
              width={360}
              height={96}
              className="mx-auto w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px]"
              priority
            />
            <p className="mt-4 text-[15px] leading-relaxed text-blue-100/90 max-w-[640px]">
              {malestars.tagline}
            </p>
            <p className="mt-1 text-[13px] text-blue-200/70">
              {malestars.subtitle}
            </p>
          </div>

          {/* ===== Rojo (arriba del logo, centrado) ===== */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-28px] hidden -translate-x-1/2 md:block"
          >
            <div className={`relative w-[200px] lg:w-[240px] xl:w-[260px] ${floatClasses[0]}`}>
              {red && <Image
                src={red.image}
                alt={red.name}
                width={260}
                height={200}
                className="drop-shadow-2xl"
                priority
              />}
            </div>
          </div>

          {/* ===== Azul (izquierda, centrado vertical, asomando) ===== */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute top-1/2 hidden -translate-y-1/2 md:block
              left-[-90px] lg:left-[-80px] xl:left-[-60px]
            "
          >
            <div className={`relative w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px] -rotate-6 ${floatClasses[1]}`}>
              {blue && <Image
                src={blue.image}
                alt={blue.name}
                width={340}
                height={300}
                className="drop-shadow-2xl"
                priority
              />}
            </div>
          </div>

          {/* ===== Amarillo (derecha, arriba, asomando) ===== */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute hidden md:block
              right-[-90px] lg:right-[-80px] xl:right-[-60px] top-[6%]
            "
          >
            <div className={`relative w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px] rotate-6 ${floatClasses[2]}`}>
              {orange && <Image
                src={orange.image}
                alt={orange.name}
                width={340}
                height={300}
                className="drop-shadow-2xl"
                priority
              />}
            </div>
          </div>

          {/* En móviles mostramos personajes más pequeños y controlados */}
          <div className="md:hidden">
            {/* Azul a la izquierda, amarillo a la derecha, rojo arriba pero reducidos */}
            <div className="pointer-events-none absolute left-[-40px] top-1/2 -translate-y-1/2">
              {blue && <Image
                src={blue.image}
                alt={blue.name}
                width={160}
                height={160}
                className="-rotate-6 opacity-90"
                priority
              />}
            </div>
            <div className="pointer-events-none absolute right-[-40px] top-[12%]">
              {orange && <Image
                src={orange.image}
                alt={orange.name}
                width={150}
                height={150}
                className="rotate-6 opacity-90"
                priority
              />}
            </div>
            <div className="pointer-events-none absolute left-1/2 top-[-24px] -translate-x-1/2">
              {red && <Image
                src={red.image}
                alt={red.name}
                width={140}
                height={120}
                className="opacity-95"
                priority
              />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}