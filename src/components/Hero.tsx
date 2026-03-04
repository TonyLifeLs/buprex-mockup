"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { useCMSStore } from "@/store/cms"

export function Hero() {
  const slides = useCMSStore((s) => s.heroSlides)
  const trustBadges = useCMSStore((s) => s.trustBadges)
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
                className="relative min-h-[480px] md:min-h-[520px] overflow-hidden flex flex-col"
                style={{ backgroundColor: slide.bgColor || "#0c3d6e" }}
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
                        objectPosition: "center",
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
                      {[slide.badge1, slide.badge2].filter(Boolean).map((text, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm"
                        >
                          <Sparkles className="h-4 w-4" />
                          {text}
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
            <div key={badge.id} className="flex flex-1 items-center gap-4 px-5 py-3">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: badge.color + "4D",
                  backgroundColor: badge.color + "1A",
                }}
              >
                <Sparkles className="h-6 w-6" style={{ color: badge.color }} />
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