"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, ShieldCheck, Stethoscope, TimerReset } from "lucide-react"
import { useCMSStore } from "@/store/cms"

function getTrustIcon(title: string) {
  if (/rápid|acción|efect/i.test(title)) return TimerReset
  if (/médic|confianza|profesional/i.test(title)) return Stethoscope
  return ShieldCheck
}

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
    <section id="inicio" className="relative pt-24 md:pt-28">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className="relative flex min-h-[680px] flex-col overflow-hidden"
                style={{
                  background: `linear-gradient(120deg, ${slide.bgColor || "#0057B8"} 0%, #06255e 100%)`,
                }}
              >
                {slide.bgImage && (
                  <div className="pointer-events-none absolute inset-0">
                    <Image
                      src={slide.bgImage}
                      alt=""
                      fill
                      priority={index === 0}
                      className={slide.bgMode === "right" ? "object-cover object-center md:object-right" : "object-cover"}
                      style={{ opacity: slide.bgMode === "right" ? 0.42 : slide.bgOpacity ?? 0.16 }}
                      sizes="100vw"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,21,56,0.92)_0%,rgba(5,35,86,0.84)_44%,rgba(7,44,106,0.45)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,rgba(77,166,255,0.24),transparent_58%)] md:block" />
                <div className="pointer-events-none absolute -left-16 top-32 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#4DA6FF]/18 blur-3xl" />

                <div className="buprex-container relative flex min-h-[680px] items-center py-10">
                  <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,460px)]">
                    <div className="max-w-3xl rounded-[2rem] border border-white/14 bg-white/8 p-8 text-white shadow-[0_24px_70px_rgba(4,21,56,0.3)] backdrop-blur-md sm:p-10 md:p-12">
                      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/92">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#4DA6FF]" />
                        {slide.tag}
                      </span>

                      <h1 className="font-[var(--font-heading)] text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl text-balance">
                        {slide.title}{" "}
                        <span className="text-[#A9D4FF]">{slide.highlight}</span>
                      </h1>

                      <p className="mt-5 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
                        {slide.description || "Alivio confiable para el dolor y la fiebre con una experiencia clara, médica y orientada al bienestar familiar."}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        {[slide.badge1, slide.badge2].filter(Boolean).map((text, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-medium text-white/90"
                          >
                            {text}
                          </span>
                        ))}
                      </div>

                      <div className="mt-9 flex flex-wrap gap-3">
                        <a href="#productos" className="buprex-button-primary">
                          Ver productos
                        </a>
                        <a href="#informacion" className="buprex-button-secondary">
                          Información médica
                        </a>
                      </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-[440px] rounded-[2rem] border border-white/16 bg-white/10 p-6 shadow-[0_28px_70px_rgba(4,21,56,0.28)] backdrop-blur-xl">
                        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent" />
                        <div className="rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(241,247,255,0.84))] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                          <div className="relative mx-auto h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
                            <Image
                              src={slide.image}
                              alt={slide.tag}
                              fill
                              className="object-contain drop-shadow-[0_25px_45px_rgba(10,47,115,0.2)]"
                              priority={index === 0}
                              sizes="(max-width: 640px) 260px, 320px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controles */}
        <div className="absolute inset-y-0 left-0 z-20 flex items-center px-3">
          <button
            onClick={scrollPrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/18"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-20 flex items-center px-3">
          <button
            onClick={scrollNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/18"
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
              className={`h-2.5 rounded-full transition-all ${i === current ? "w-10 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Trust Badges Bar */}
      <div className="buprex-container relative z-10 -mt-24 pb-4">
        <div className="grid gap-4 rounded-[2rem] border border-white/70 bg-white/92 p-4 shadow-[0_30px_70px_rgba(10,47,115,0.14)] backdrop-blur-md sm:grid-cols-3">
          {trustBadges.map((badge) => {
            const Icon = getTrustIcon(badge.title)

            return (
              <div
                key={badge.id}
                className="flex items-center gap-4 rounded-[1.5rem] border border-[#dbe5f0] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-5 py-5"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: badge.color + "1F",
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: badge.color }} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-[0.08em] text-[#133161]">
                    {badge.title}
                  </h3>
                  <p className="text-sm leading-snug text-[#5f6f85]">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}