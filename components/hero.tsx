"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  Shield,
  Star,
  Baby,
  Heart,
  CheckCircle,
  Stethoscope,
} from "lucide-react"

type Slide = {
  tag: string
  title: string
  highlight: string
  description?: string
  badges: { icon: React.ComponentType<{ className?: string }>; text: string }[]
  // Imagen del producto (primer plano)
  image: string
  // Fondo (imagen)
  bgImage?: string
  // Color de respaldo del fondo (por si no hay imagen o mientras carga)
  bgFallback?: string // tailwind color class, p.ej. "bg-[#0099d6]"
  // Opacidad de la imagen de fondo (0–1)
  bgOpacity?: number
  // Posición de la imagen de fondo (css object-position)
  bgPosition?: string
  // "full" = cubre todo (default) | "right" = solo panel derecho visible
  bgMode?: "full" | "right"
}

const slides: Slide[] = [
  {
    tag: "BUPREX ES IBUPROFENO",
    title: "TENEMOS LA CÁPSULA BLANDA MÁS PEQUEÑA",
    highlight: "DEL PAÍS",
    badges: [
      { icon: Zap, text: "Acción Rápida" },
      { icon: Star, text: "La más pequeña" },
    ],
    image: "/images/buprex-flash.png",
    bgImage: "/images/capsula-buprex.png",
    bgFallback: "bg-[#0099d6]",
    bgOpacity: 0.15,
    bgPosition: "center",
    bgMode: "right",
  },
  {
    tag: "LINEA PEDIATRICA",
    title: "BUPREX PARA TODA LA FAMILIA",
    highlight: "Adultos y Niños",
    description:
      "Suspensión pediátrica 100 mg / 5 ml. Gotas 40 mg / ml. Forte 200 mg / 5 ml. Para cada etapa de la vida.",
    badges: [
      { icon: Baby, text: "Desde 6 meses" },
      { icon: Shield, text: "Para toda la familia" },
    ],
    image: "/images/buprex-mini.png",
    bgImage: "/images/malestars.all.png",
    bgFallback: "bg-[#0c3d6e]",
    bgOpacity: 0.10,
    bgPosition: "center",
    bgMode: "right",
  },
  {
    tag: "BUPREX MIGRA",
    title: "ALIVIO EFECTIVO CONTRA LA",
    highlight: "MIGRAÑA",
    badges: [
      { icon: Zap, text: "Doble acción" },
      { icon: Clock, text: "Alivio prolongado" },
    ],
    image: "/images/buprex-migra.png",
    bgImage: "/images/dolor-cabeza-buprex.jpg",
    bgFallback: "bg-[#0099d6]",
    bgOpacity: 0.18,
    bgPosition: "center top",
    bgMode: "right",
  },
]

const trustBadges = [
  {
    icon: Heart,
    title: "ALIVIO RÁPIDO",
    description: "Cápsula blanda de acción rápida",
    color: "text-[#e31e24]",
    bgColor: "bg-[#e31e24]/10",
    borderColor: "border-[#e31e24]/30",
  },
  {
    icon: CheckCircle,
    title: "PIONEROS",
    description: "32 Años tratando el dolor, fiebre e inflamación",
    color: "text-[#0099d6]",
    bgColor: "bg-[#0099d6]/10",
    borderColor: "border-[#0099d6]/30",
  },
  {
    icon: Stethoscope,
    title: "CONFIANZA MÉDICA",
    description: "Recomendados por médicos y profesionales de la salud en Ecuador",
    color: "text-[#0c3d6e]",
    bgColor: "bg-[#0c3d6e]/10",
    borderColor: "border-[#0c3d6e]/30",
  },
]

export function Hero() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  useEffect(() => {
    if (!api) return
    const interval = setInterval(() => {
      api.scrollNext()
    }, 6000)
    return () => clearInterval(interval)
  }, [api])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  return (
    <section id="inicio" className="relative pt-14">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className={`relative min-h-[480px] md:min-h-[520px] overflow-hidden flex flex-col ${slide.bgFallback ?? ""}`}
              >
                {/* Fondo: modo "full" (cubre todo) */}
                {slide.bgImage && slide.bgMode !== "right" && (
                  <div className="pointer-events-none absolute inset-0">
                    <Image
                      src={slide.bgImage}
                      alt=""
                      fill
                      priority={index === 0}
                      className="object-cover"
                      style={{
                        opacity: slide.bgOpacity ?? 0.15,
                        objectPosition: slide.bgPosition || "center",
                      }}
                      sizes="100vw"
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Fondo: modo "right" – imagen visible en panel derecho */}
                {slide.bgImage && slide.bgMode === "right" && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-1/2">
                    <Image
                      src={slide.bgImage}
                      alt=""
                      fill
                      priority={index === 0}
                      className="object-contain"
                      style={{
                        opacity: slide.bgOpacity ?? 0.7,
                        objectPosition: "center",
                      }}
                      sizes="(max-width:768px) 100vw, 50vw"
                      aria-hidden="true"
                    />
                    {/* Fade lateral izquierdo para blend suave con el texto */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0c3d6e] to-transparent" />
                  </div>
                )}

                {/* Overlay/gradiente para mejorar contraste del texto */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/10" />

                {/* Elementos decorativos */}
                <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/5" />

                <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-6 px-6 py-14 md:flex-row md:gap-12 md:py-20">
                  {/* Texto */}
                  <div className="flex flex-1 flex-col items-center text-center justify-center md:items-start md:text-left md:justify-start md:min-h-[280px]">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-white" />
                      {slide.tag}
                    </span>

                    <h1 className="font-[var(--font-heading)] text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl text-balance">
                      {slide.title}{" "}
                      <span className="inline-block rounded-lg bg-[#e31e24] px-3 py-1 text-white">
                        {slide.highlight}
                      </span>
                    </h1>

                    {slide.description && (
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
                        {slide.description}
                      </p>
                    )}

                    {/* Badges */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                      {slide.badges.map((badge, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm"
                        >
                          <badge.icon className="h-4 w-4" />
                          {badge.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Imagen de producto – solo cuando bgMode NO es "right" (en ese caso la bg ya llena el panel) */}
                  {slide.bgMode !== "right" && (
                    <div className="relative flex flex-1 items-center justify-center w-full md:w-auto">
                      <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-[360px] md:w-[360px] mx-auto">
                        <Image
                          src={slide.image}
                          alt={slide.tag}
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority={index === 0}
                          sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, 360px"
                        />
                      </div>
                    </div>
                  )}

                  {/* Para bgMode "right": imagen de producto superpuesta encima del fondo derecho */}
                  {slide.bgMode === "right" && (
                    <div className="relative flex flex-1 items-end justify-center w-full md:items-center md:w-auto z-10">
                      <div className="relative h-52 w-52 sm:h-64 sm:w-64 md:h-[360px] md:w-[360px] mx-auto">
                        <Image
                          src={slide.image}
                          alt={slide.tag}
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority={index === 0}
                          sizes="(max-width: 640px) 13rem, (max-width: 768px) 16rem, 360px"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controles */}
        <div className="absolute inset-y-0 left-0 z-20 flex items-center px-3">
          <button
            onClick={scrollPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/60"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-20 flex items-center px-3">
          <button
            onClick={scrollNext}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/60"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-3 rounded-full transition-all ${i === current ? "w-9 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Trust Badges Bar */}
      <div className="relative z-10 mx-auto mt-6 max-w-5xl px-6 pb-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 shadow-xl sm:flex-row sm:items-stretch sm:gap-0 sm:divide-x sm:divide-border sm:p-2">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="flex flex-1 items-center gap-4 px-5 py-3">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 ${badge.borderColor} ${badge.bgColor}`}
              >
                <badge.icon className={`h-6 w-6 ${badge.color}`} />
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-heading)] text-sm font-bold text-foreground">
                  {badge.title}
                </h3>
                <p className="text-xs leading-snug text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}