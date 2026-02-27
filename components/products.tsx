"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

/** Datos */
const products = [
  {
    name: "BUPREX",
    subtitle: "(SUSPENSIÓN PEDIÁTRICA)",
    image: "/images/buprex-suspension.png",
    mascot: "/images/inflamon-suspension.png",
    description: "Contiene 100 mg de ibuprofeno por cada 5 ml de suspensión.",
    accentColor: "#00b2ff", // tono azul brillante para títulos/subtítulos
    floatClass: "animate-float-slow",
  },
  {
    name: "BUPREX FORTE",
    subtitle: "(SUSPENSIÓN)",
    image: "/images/dolores-suspension.png",
    mascot: "/images/dolores.png",
    description: "Contiene 200 mg de ibuprofeno por cada 5 ml de suspensión.",
    accentColor: "#f5a623",
    floatClass: "animate-float-medium",
  },
  {
    name: "BUPREX",
    subtitle: "(GOTAS SUSPENSIÓN)",
    image: "/images/buprex-mini.png",
    mascot: "/images/inflamon.png",
    description: "Contiene 40 mg de ibuprofeno por 1 ml.",
    accentColor: "#e31e24",
    floatClass: "animate-float-fast",
  },
]

const adultProducts = [
  {
    name: "BUPREX Flash Mini",
    variant: "Cápsulas 200mg y 400mg",
    image: "/images/woman-capsule.png",
    description:
      "Cápsula blanda más pequeña del país. Acción ultrarrápida para alivio del dolor, fiebre e inflamación.",
    color: "border-[#e31e24]",
    tagColor: "bg-[#e31e24]",
  },
  {
    name: "BUPREX Migra",
    variant: "Comprimidos Recubiertos",
    image: "/images/buprex-migra.png",
    description:
      "Ibuprofeno 400mg + Cafeína 100mg. 20 comprimidos recubiertos para el alivio del dolor de cabeza intenso y migraña.",
    color: "border-[#0c3d6e]",
    tagColor: "bg-[#0c3d6e]",
  },
]

/** Fondo estrellado opcional (decorativo) */
function ProductStarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const stars: { x: number; y: number; r: number; opacity: number; speed: number }[] = []
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.004 + 0.001,
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

/** Componente principal */
export function Products() {
  const sectionRef = useScrollReveal()

  return (
    <section id="productos" ref={sectionRef} className="overflow-hidden">
      {/* ======== BLOQUE AZUL ÚNICO ======== */}
      <div className="relative w-full py-20 md:py-28">
        {/* Fondo: blanco en la parte de adultos → azul oscuro en la pediátrica */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, #ffffff 0%, #daeef9 10%, #8ec8e8 22%, #3a7fb5 34%, #0c3d6e 46%, #0b2a4a 70%, #0c3d6e 100%)",
          }}
        />
        <div className="absolute inset-0 -z-10 opacity-40">
          <ProductStarField />
        </div>

        <div className="mx-auto max-w-7xl px-6">

          {/* ── Encabezado ── */}
          <div className="scroll-reveal mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-[#e31e24] via-[#c0306a] to-[#00b2ff] px-6 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
              Nuestra línea
            </span>
            <div className="mt-1">
              <Image
                src="/images/buprex-ibuprofeno.png"
                alt="Productos BUPREX"
                width={400}
                height={80}
                className="mx-auto h-16 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,178,255,0.35)] md:h-20"
              />
            </div>
            <div className="mx-auto mt-5 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {/* ── Cards adultos ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {adultProducts.map((product, i) => (
              <div
                key={product.name}
                className="scroll-reveal relative grid items-center gap-4 rounded-[28px] border border-white/15 p-6 shadow-[0_10px_28px_rgba(0,0,0,0.28)]"
                style={{
                  transitionDelay: `${i * 150}ms`,
                  gridTemplateColumns: "210px 1fr",
                  background:
                    "linear-gradient(180deg, rgba(22,74,124,0.85) 0%, rgba(12,61,110,0.95) 60%, rgba(6,42,80,0.98) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 28px rgba(0,0,0,0.28)",
                }}
              >
                <div className="relative flex h-48 items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`mb-2 inline-block w-fit rounded-full ${product.tagColor} px-3 py-1 text-xs font-bold text-white`}
                  >
                    {product.variant}
                  </span>
                  <h3 className="font-[var(--font-heading)] text-lg font-bold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* divisor */}
          <div className="mx-auto my-10 h-px w-full max-w-2xl rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* ── Cards pediátricos ── */}
          <div className="flex flex-col gap-6">
            {products.map((product, i) => (
              <div
                key={product.name + product.subtitle}
                className="scroll-reveal relative grid items-center gap-4 rounded-[28px] border border-white/15 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.28)] md:grid-cols-[240px_auto_1fr] md:gap-6 md:p-7"
                style={{
                  transitionDelay: `${i * 150}ms`,
                  // Fondo azulito dentro de cada pastilla
                  background:
                    "linear-gradient(180deg, rgba(22,74,124,0.85) 0%, rgba(12,61,110,0.95) 60%, rgba(6,42,80,0.98) 100%)",
                  // Sutil brillo interno para efecto “glass”
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 28px rgba(0,0,0,0.28)",
                }}
              >
                {/* Columna Producto */}
                <div className="relative flex h-36 w-full items-center justify-center md:h-40 md:w-[240px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="object-contain drop-shadow-lg"
                    priority={i === 0}
                  />
                </div>

                {/* Mascota PEGADA al producto (overlap con margen negativo) */}
                <div className={`relative z-10 ml-[-22px] md:ml-[-40px] ${product.floatClass}`}>
                  <Image
                    src={product.mascot}
                    alt="Mascota BUPREX"
                    width={140}
                    height={140}
                    className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                  />
                </div>

                {/* Información (texto claro sobre azul) */}
                <div className="min-w-0">
                  <h3
                    className="font-[var(--font-heading)] text-2xl font-extrabold leading-tight md:text-3xl"
                    style={{ color: product.accentColor }}
                  >
                    {product.name}
                  </h3>
                  <span
                    className="mt-0.5 block text-base font-extrabold tracking-wide md:text-lg"
                    style={{ color: product.accentColor }}
                  >
                    {product.subtitle}
                  </span>
                  <p className="mt-2 text-base leading-relaxed text-white/85">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="py-4" />
        </div>
      </div>
      {/* ================== FIN BLOQUE AZUL ================== */}

      {/* Animaciones locales */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .animate-float-slow { animation: float 5s ease-in-out infinite; }
        .animate-float-medium { animation: float 4s ease-in-out infinite; }
        .animate-float-fast { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
``