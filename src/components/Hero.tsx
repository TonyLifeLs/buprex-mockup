"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, Circle } from "lucide-react"
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
    <section id="inicio" className="relative pt-16 md:pt-20">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className="relative flex min-h-[520px] flex-col overflow-hidden border-y border-slate-200 md:min-h-[600px]"
                style={{
                  background: `linear-gradient(120deg, ${slide.bgColor || "#0c3d6e"} 0%, #0f172a 100%)`,
                }}
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/20" />

                {/* Elementos decorativos */}
                <div className="pointer-events-none absolute -top-40 right-20 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />

                <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-8 px-6 py-14 md:flex-row md:gap-12 md:py-16">
                  {/* Texto */}
                  <div className="flex min-h-[300px] flex-1 flex-col justify-center text-center md:items-start md:text-left">
                    <span className="mb-5 inline-flex items-center gap-2 self-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white md:self-start">
                      <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      {slide.tag}
                    </span>

                    <h1 className="font-[var(--font-heading)] text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl text-balance">
                      {slide.title}{" "}
                      <span className="inline-block rounded-md bg-white/15 px-3 py-1 text-cyan-100 ring-1 ring-white/20">
                        {slide.highlight}
                      </span>
                    </h1>

                    {slide.description && (
                      <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-100/90 sm:text-base md:text-lg">
                        {slide.description}
                      </p>
                    )}

                    {/* Badges */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                      {[slide.badge1, slide.badge2].filter(Boolean).map((text, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/30 px-4 py-2 text-xs font-medium text-slate-100 backdrop-blur-sm"
                        >
                          <Circle className="h-2.5 w-2.5 fill-current" />
                          {text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Imagen de producto – solo cuando bgMode NO es "right" (en ese caso la bg ya llena el panel) */}
                  {slide.bgMode !== "right" && (
                    <div className="relative flex flex-1 items-center justify-center w-full md:w-auto">
                      <div className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64 md:h-[360px] md:w-[360px]">
                        <Image
                          src={slide.image}
                          alt={slide.tag}
                          fill
                          className="object-contain drop-shadow-[0_18px_48px_rgba(15,23,42,0.5)]"
                          priority={index === 0}
                          sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, 360px"
                        />
                      </div>
                    </div>
                  )}

                  {/* Para bgMode "right": imagen de producto superpuesta encima del fondo derecho */}
                  {slide.bgMode === "right" && (
                    <div className="relative z-10 flex w-full flex-1 items-end justify-center md:w-auto md:items-center">
                      <div className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64 md:h-[360px] md:w-[360px]">
                        <Image
                          src={slide.image}
                          alt={slide.tag}
                          fill
                          className="object-contain drop-shadow-[0_18px_48px_rgba(15,23,42,0.5)]"
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-900/40 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-900/70"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-20 flex items-center px-3">
          <button
            onClick={scrollNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-900/40 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-900/70"
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
              className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Trust Badges Bar */}
      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-6 pb-4">
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:grid-cols-3">
          {trustBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-slate-50/70 px-4 py-4"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: badge.color + "1F",
                }}
              >
                <Circle className="h-4 w-4 fill-current" style={{ color: badge.color }} />
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-wide text-slate-900">
                  {badge.title}
                </h3>
                <p className="text-xs leading-snug text-slate-600">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}