"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, Zap, Clock, Shield, Star, Baby, Heart, CheckCircle, Stethoscope } from "lucide-react"

const slides = [
  {
    tag: "BUPREX ES IBUPROFENO",
    title: "TENEMOS LA CAPSULA BLANDA MAS PEQUENA",
    highlight: "DEL PAIS",
    description:
      "Capsula de gelatina blanda de accion ultrarrapida. Absorcion mas rapida que el comprimido convencional.",
    badges: [
      { icon: Zap, text: "Accion Rapida" },
      { icon: Star, text: "La mas pequena" },
    ],
    image: "/images/woman-capsule.png",
    bg: "bg-[#0099d6]",
  },
  {
    tag: "LINEA PEDIATRICA",
    title: "BUPREX PARA TODA LA FAMILIA",
    highlight: "Adultos y Ninos",
    description:
      "Suspension pediatrica 100 mg / 5 ml. Gotas 40 mg / ml. Forte 200 mg / 5 ml. Para cada etapa de la vida.",
    badges: [
      { icon: Baby, text: "Desde 6 meses" },
      { icon: Shield, text: "Para toda la familia" },
    ],
    image: "/images/mascot-orange.png",
    bg: "bg-[#0c3d6e]",
  },
  {
    tag: "BUPREX MIGRA",
    title: "ALIVIO EFECTIVO CONTRA LA",
    highlight: "MIGRANA",
    description:
      "Ibuprofeno 400 mg + Cafeina 100 mg. Comprimidos recubiertos para el alivio rapido del dolor de cabeza intenso.",
    badges: [
      { icon: Zap, text: "Doble accion" },
      { icon: Clock, text: "Alivio prolongado" },
    ],
    image: "/images/buprex-migra.png",
    bg: "bg-[#0099d6]",
  },
]

const trustBadges = [
  {
    icon: Heart,
    title: "ALIVIO RAPIDO",
    description: "Capsula blanda de accion rapida",
    color: "text-[#e31e24]",
    bgColor: "bg-[#e31e24]/10",
    borderColor: "border-[#e31e24]/30",
  },
  {
    icon: CheckCircle,
    title: "PIONEROS",
    description: "32 Anos tratando el dolor, fiebre e inflamacion",
    color: "text-[#0099d6]",
    bgColor: "bg-[#0099d6]/10",
    borderColor: "border-[#0099d6]/30",
  },
  {
    icon: Stethoscope,
    title: "CONFIANZA MEDICA",
    description: "Recomendados por medicos y profesionales de la salud en Ecuador",
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
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className={`relative min-h-[550px] md:min-h-[650px] ${slide.bg} overflow-hidden`}
              >
                {/* Full bleed watermark image */}
                <div className="pointer-events-none absolute inset-0">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    className="object-contain opacity-[0.08] scale-150"
                    aria-hidden="true"
                  />
                </div>

                {/* Decorative elements */}
                <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/5" />

                <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 pt-16 pb-12 md:flex-row md:gap-12 md:pt-20 md:pb-16">
                  {/* Text Content */}
                  <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-white" />
                      {slide.tag}
                    </span>

                    <h1 className="font-[var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
                      {slide.title}{" "}
                      <span className="inline-block rounded-lg bg-[#e31e24] px-4 py-1 text-white">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
                      {slide.description}
                    </p>

                    {/* Badges */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
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

                    {/* CTA */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href="#productos"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0099d6] shadow-lg transition-all hover:shadow-xl hover:scale-105"
                      >
                        Ver productos
                        <ChevronRight className="h-4 w-4" />
                      </a>
                      <a
                        href="#para-que-sirve"
                        className="inline-flex rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                      >
                        Prospecto
                      </a>
                    </div>
                  </div>

                  {/* Product image - NOT watermark, visible */}
                  <div className="relative flex flex-1 items-center justify-center">
                    <div className="relative h-72 w-72 md:h-[380px] md:w-[380px]">
                      <Image
                        src={slide.image}
                        alt={slide.tag}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
          <button
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === current
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Ir a slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Carousel>

      {/* Trust Badges Bar - circles like reference */}
      <div className="relative z-10 mx-auto mt-6 max-w-5xl px-6 pb-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 shadow-xl sm:flex-row sm:items-stretch sm:gap-0 sm:divide-x sm:divide-border sm:p-2">
          {trustBadges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-1 items-center gap-4 px-5 py-3"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 ${badge.borderColor} ${badge.bgColor}`}>
                <badge.icon className={`h-6 w-6 ${badge.color}`} />
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-heading)] text-sm font-bold text-foreground">
                  {badge.title}
                </h3>
                <p className="text-xs leading-snug text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
