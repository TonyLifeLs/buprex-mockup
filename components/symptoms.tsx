"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const symptoms = [
  {
    image: "/images/dolor-muscular.png",
    title: "Dolor Muscular",
    description: "Alivio efectivo para dolores musculares y articulares.",
    color: "border-[#0099d6]",
    bgColor: "bg-[#0099d6]/10",
  },
  {
    image: "/images/dolor-cabeza.png",
    title: "Dolor de Cabeza",
    description: "Acción rápida contra cefaleas y migñas.",
    color: "border-[#e31e24]",
    bgColor: "bg-[#e31e24]/10",
  },
  {
    image: "/images/dolor-espalda.png",
    title: "Dolor de Espalda",
    description: "Reduce la inflamación y alivia el dolor lumbar.",
    color: "border-[#f5a623]",
    bgColor: "bg-[#f5a623]/10",
  },
  {
    image: "/images/dolor-garganta.png",
    title: "Dolor de Garganta",
    description: "Eficaz contra la inflamación y el dolor faringéo.",
    color: "border-[#0099d6]",
    bgColor: "bg-[#0099d6]/10",
  },
  {
    image: "/images/fiebre.png",
    title: "Fiebre",
    description: "Propiedades antipiréticas para reducir la temperatura.",
    color: "border-[#e31e24]",
    bgColor: "bg-[#e31e24]/10",
  },
  {
    image: "/images/gripe.png",
    title: "Estados Gripales",
    description: "Alivia los síntomas asociados a resfriados y gripe.",
    color: "border-[#0c3d6e]",
    bgColor: "bg-[#0c3d6e]/10",
  },
]

export function Symptoms() {
  const sectionRef = useScrollReveal()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-boom]"))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.boomDelay ?? "0"
            el.style.animationDelay = `${delay}ms`
            el.classList.add("boom-enter")
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="para-que-sirve" ref={sectionRef} className="relative bg-white py-20 md:py-28 overflow-hidden">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-[#0099d6]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#e31e24]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          {/* Left: Mascot */}
          <div className="scroll-reveal-left flex flex-col items-center md:w-1/3">
            <div className="animate-float-slow">
              <Image
                src="/images/malestars.all.png"
                alt="Mascota BUPREX"
                width={300}
                height={300}
                className="drop-shadow-xl"
              />
            </div>
            <h2 className="mt-6 text-center font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {"¿Para qué sirve?"}
            </h2>
            <p className="mt-3 text-center text-base leading-relaxed text-muted-foreground">
              BUPREX posee propiedades analgésicas y antipiréticas, efectivo en múltiples tipos de dolor.
            </p>
          </div>

          {/* Right: Grid with boom cards */}
          <div ref={gridRef} className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {symptoms.map((symptom, i) => (
              <div
                key={symptom.title}
                data-boom
                data-boom-delay={i * 90}
                className="boom-card group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center transition-all hover:shadow-lg hover:border-[#0099d6]/30 hover:-translate-y-1"
              >
                {/* Circular image container */}
                <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 ${symptom.color} ${symptom.bgColor} p-2 transition-transform group-hover:scale-110`}>
                  <Image
                    src={symptom.image}
                    alt={symptom.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <h3 className="font-[var(--font-heading)] text-base font-bold text-foreground">
                  {symptom.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {symptom.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .boom-card {
          opacity: 0;
          transform: scale(0.4) rotate(-6deg);
        }
        @keyframes boom {
          0%   { opacity: 0; transform: scale(0.4) rotate(-6deg); }
          55%  { opacity: 1; transform: scale(1.18) rotate(2deg); }
          72%  { transform: scale(0.93) rotate(-1deg); }
          88%  { transform: scale(1.06) rotate(0.5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .boom-enter {
          animation: boom 0.55s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  )
}

