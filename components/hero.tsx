"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, Zap, Clock, Shield, Star, Baby } from "lucide-react"

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
    imageStyle: "object-contain p-6",
    circleBg: "bg-white/15",
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
    imageStyle: "object-contain p-4",
    circleBg: "bg-white/10",
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
    imageStyle: "object-contain p-6",
    circleBg: "bg-white/15",
  },
]

const trustStats = [
  { value: "32", label: "Anos", sub: "de trayectoria", icon: Clock },
  { value: "", label: "Confianza", sub: "medica nacional", icon: Shield },
  { value: "", label: "Pioneros", sub: "en Ecuador", icon: Star },
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
    <section id="inicio" className="relative pt-20">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className={`relative min-h-[600px] md:min-h-[700px] ${slide.bg} overflow-hidden`}
              >
                {/* Decorative elements */}
                <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-card/5" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-card/5" />

                <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 pt-16 pb-12 md:flex-row md:gap-12 md:pt-20 md:pb-16">
                  {/* Text Content */}
                  <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-card/20 bg-card/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-card backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-card" />
                      {slide.tag}
                    </span>

                    <h1 className="font-[var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight text-card md:text-5xl lg:text-6xl text-balance">
                      {slide.title}{" "}
                      <span className="inline-block rounded-lg bg-[#e31e24] px-4 py-1 text-card">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-relaxed text-card/80 md:text-lg">
                      {slide.description}
                    </p>

                    {/* Badges */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {slide.badges.map((badge, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 rounded-full border border-card/15 bg-card/10 px-4 py-2 text-xs font-semibold text-card backdrop-blur-sm"
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
                        className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-bold text-[#0099d6] shadow-lg transition-all hover:shadow-xl hover:scale-105"
                      >
                        Ver productos
                        <ChevronRight className="h-4 w-4" />
                      </a>
                      <a
                        href="#para-que-sirve"
                        className="inline-flex rounded-full border-2 border-card/40 px-7 py-3.5 text-sm font-bold text-card transition-all hover:bg-card/10"
                      >
                        Prospecto
                      </a>
                    </div>
                  </div>

                  {/* Round Image */}
                  <div className="relative flex flex-1 items-center justify-center">
                    <div className="relative">
                      {/* Outer ring */}
                      <div className="absolute -inset-5 rounded-full border-2 border-dashed border-card/15 animate-[spin_30s_linear_infinite]" />
                      {/* Inner decorative ring */}
                      <div className="absolute -inset-2 rounded-full border border-card/10" />
                      {/* Main circle container */}
                      <div className={`relative h-72 w-72 overflow-hidden rounded-full border-4 border-card/25 ${slide.circleBg} shadow-2xl backdrop-blur-sm md:h-[380px] md:w-[380px]`}>
                        <Image
                          src={slide.image}
                          alt={slide.tag}
                          fill
                          className={slide.imageStyle}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Stats Bar */}
                <div className="relative mx-auto max-w-7xl px-6 pb-8">
                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    {trustStats.map((stat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-card/10 bg-card/5 px-5 py-3 backdrop-blur-sm"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-card/20 bg-card/10">
                          {stat.value ? (
                            <span className="text-sm font-extrabold text-card">
                              {stat.value}
                            </span>
                          ) : (
                            <stat.icon className="h-5 w-5 text-card" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-card">
                            {stat.label}
                          </p>
                          <p className="text-xs text-card/60">{stat.sub}</p>
                        </div>
                      </div>
                    ))}
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
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card/40 bg-card/10 text-card backdrop-blur-sm transition-all hover:bg-card/20"
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
                    ? "w-8 bg-card"
                    : "w-2.5 bg-card/40 hover:bg-card/60"
                }`}
                aria-label={`Ir a slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card/40 bg-card/10 text-card backdrop-blur-sm transition-all hover:bg-card/20"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Carousel>
    </section>
  )
}
