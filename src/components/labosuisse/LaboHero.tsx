"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function LaboHero() {
  const { heroSlides } = useLaboSuisseStore()
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides = heroSlides.length > 0 ? heroSlides : []

  const goTo = useCallback(
    (idx: number) => {
      if (animating || slides.length === 0) return
      setAnimating(true)
      setTimeout(() => {
        setCurrent((idx + slides.length) % slides.length)
        setAnimating(false)
      }, 280)
    },
    [animating, slides.length]
  )

  useEffect(() => {
    if (slides.length === 0) return
    timerRef.current = setInterval(() => goTo(current + 1), 7000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [current, goTo, slides.length])

  if (slides.length === 0) return null

  const slide = slides[current]
  const isDark = !slide.textDark

  return (
    <section
      id="inicio"
      aria-label="Presentación principal"
      className="relative overflow-hidden"
      style={{
        backgroundColor: slide.bg,
        minHeight: "100svh",
        transition: "background-color 0.4s",
      }}
    >
      <div
        className="ls-container ls-hero-save flex flex-col items-center gap-12 pt-24 md:flex-row md:gap-16"
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.28s ease" }}
      >
        {/* Left infobox */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <span
            className="mb-5 inline-block px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{ backgroundColor: slide.badgeBg, color: "var(--ls-gray-900)" }}
          >
            {slide.badge}
          </span>

          <p
            className="ls-p-sm mb-5 font-semibold tracking-[0.18em] uppercase truncate max-w-sm"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "var(--ls-gray-500)" }}
          >
            {slide.tag}
          </p>

          <h1
            className="ls-h1 mb-4"
            style={{
              color: isDark ? "var(--ls-white, #fff)" : "var(--ls-black, #000)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {slide.title}
          </h1>

          <p
            className="ls-h5 mb-5 font-light"
            style={{ color: isDark ? "rgba(255,255,255,0.65)" : "var(--ls-gray-700)" }}
          >
            {slide.subtitle}
          </p>

          <p
            className="ls-p mb-10 max-w-md"
            style={{
              color: isDark ? "rgba(255,255,255,0.6)" : "var(--ls-gray-700)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {slide.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href={slide.ctaHref} className="ls-btn ls-btn-primary group gap-2">
              {slide.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={slide.ctaSecondaryHref}
              className="ls-btn ls-btn-tertiary"
              style={{ color: isDark ? "rgba(255,255,255,0.6)" : "var(--ls-gray-700)" }}
            >
              {slide.ctaSecondary}
            </a>
          </div>

          {/* Pagination dots */}
          <div className="mt-12 flex items-center gap-2" role="tablist" aria-label="Diapositivas">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                onClick={() => goTo(i)}
                aria-label={`Diapositiva ${i + 1}`}
                aria-selected={i === current}
                style={{
                  height: "2px",
                  width: i === current ? "36px" : "14px",
                  backgroundColor:
                    i === current
                      ? isDark ? "var(--ls-white, #fff)" : "var(--ls-black, #000)"
                      : isDark ? "rgba(255,255,255,0.25)" : "var(--ls-gray-300)",
                  transition: "width 0.3s",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: product image */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative h-72 w-72 sm:h-96 sm:w-96 md:h-[500px] md:w-[500px]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width:640px) 18rem, (max-width:768px) 24rem, 31rem"
              priority={current === 0}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0" }}
            />
          </div>

          <button
            onClick={() => goTo(current - 1)}
            aria-label="Diapositiva anterior"
            className="absolute left-0 flex h-10 w-10 items-center justify-center border transition-all"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "var(--ls-gray-300)",
              color: isDark ? "var(--ls-white, #fff)" : "var(--ls-gray-900)",
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.7)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Diapositiva siguiente"
            className="absolute right-0 flex h-10 w-10 items-center justify-center border transition-all"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "var(--ls-gray-300)",
              color: isDark ? "var(--ls-white, #fff)" : "var(--ls-gray-900)",
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.7)",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
