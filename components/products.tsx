"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const products = [
  {
    name: "BUPREX",
    subtitle: "(SUSPENSION PEDIATRICA)",
    image: "/images/buprex-pediatrico.png",
    mascot: "/images/mascot-blue.png",
    description: "Contiene 100 mg de ibuprofeno por cada 5 ml de suspension",
    accentColor: "#0099d6",
    bgGradient: "from-[#1a4a7a]/60 to-[#0c3d6e]/80",
  },
  {
    name: "BUPREX FORTE",
    subtitle: "(SUSPENSION)",
    image: "/images/buprex-forte.png",
    mascot: "/images/mascot-orange.png",
    description: "Contiene 200 mg de ibuprofeno por cada 5 ml de suspension.",
    accentColor: "#f5a623",
    bgGradient: "from-[#0c3d6e]/80 to-[#1a4a7a]/60",
  },
  {
    name: "BUPREX",
    subtitle: "(GOTAS SUSPENSION)",
    image: "/images/buprex-gotas.png",
    mascot: "/images/mascot-red.png",
    description: "Contiene 40 mg de ibuprofeno por 1 ml.",
    accentColor: "#e31e24",
    bgGradient: "from-[#1a4a7a]/60 to-[#0c3d6e]/80",
  },
]

const adultProducts = [
  {
    name: "BUPREX Flash Mini",
    variant: "Capsulas 200mg y 400mg",
    image: "/images/woman-capsule.png",
    description:
      "Capsula blanda mas pequena del pais. Accion ultrarrapida para alivio del dolor, fiebre e inflamacion.",
    color: "border-[#e31e24]",
    tagColor: "bg-[#e31e24]",
  },
  {
    name: "BUPREX Migra",
    variant: "Comprimidos Recubiertos",
    image: "/images/buprex-migra.png",
    description:
      "Ibuprofeno 400mg + Cafeina 100mg. 20 comprimidos recubiertos para el alivio del dolor de cabeza intenso y migrana.",
    color: "border-[#0c3d6e]",
    tagColor: "bg-[#0c3d6e]",
  },
]

function ProductStarField() {
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

    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.004 + 0.001,
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

export function Products() {
  return (
    <section id="productos" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#e31e24] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Nuestra linea
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Productos BUPREX
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Si los malestares hacen su aparicion, BUPREX los calma con su gran accion.
          </p>
        </div>

        {/* Pediatric products - vertical stacked layout */}
        <div
          className="relative mt-14 overflow-hidden rounded-3xl"
          style={{ background: "linear-gradient(135deg, #0c3d6e 0%, #0b2a4a 50%, #0c3d6e 100%)" }}
        >
          <ProductStarField />

          <div className="relative z-10 flex flex-col divide-y divide-white/10">
            {products.map((product) => (
              <div
                key={product.name + product.subtitle}
                className="group flex flex-col items-center gap-6 p-8 transition-colors hover:bg-white/5 md:flex-row md:gap-10 md:p-10"
              >
                {/* Product image */}
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm md:h-44 md:w-52">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Mascot */}
                <div className="relative hidden h-32 w-32 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 md:block">
                  <Image
                    src={product.mascot}
                    alt="Mascota BUPREX"
                    fill
                    className="object-contain drop-shadow-xl"
                  />
                </div>

                {/* Product info */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <h3 className="font-[var(--font-heading)] text-2xl font-bold text-white md:text-3xl">
                    {product.name}
                  </h3>
                  <span
                    className="mt-1 text-lg font-bold"
                    style={{ color: product.accentColor }}
                  >
                    {product.subtitle}
                  </span>
                  <p className="mt-3 text-base leading-relaxed text-blue-100/70">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adult products - card layout */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {adultProducts.map((product) => (
            <div
              key={product.name}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 ${product.color} bg-card transition-all hover:shadow-xl`}
            >
              <div className="relative flex h-56 items-center justify-center bg-secondary/30 p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={220}
                  height={220}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span
                  className={`mb-2 inline-block w-fit rounded-full ${product.tagColor} px-3 py-1 text-xs font-bold text-white`}
                >
                  {product.variant}
                </span>
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
