"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Activity, HeartPulse, Pill, FlaskConical } from "lucide-react"

export type CarouselItem = {
  title: string
  description: string
  tag?: string
  tone?: "gold" | "sand"
  Icon?: typeof Sparkles
}

interface CarouselProps {
  items: CarouselItem[]
  interval?: number
}

export function Carousel({ items, interval = 7000 }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [animateIn, setAnimateIn] = useState(true)

  useEffect(() => {
    if (items.length <= 1) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  useEffect(() => {
    setAnimateIn(false)
    const t = setTimeout(() => setAnimateIn(true), 10)
    return () => clearTimeout(t)
  }, [current])

  if (items.length === 0) return null

  const slide = items[current]
  const bg = slide.tone === "sand" ? "var(--surface-sand)" : "var(--surface-gold)"
  const iconMap: Record<string, typeof Sparkles> = {
    "Formula completa": FlaskConical,
    "Uso sugerido": Activity,
    Vitalidad: HeartPulse,
    "Modo de uso": Pill,
  }
  const Icon = slide.Icon || (slide.tag ? iconMap[slide.tag] : undefined) || Sparkles

  return (
    <div
      className="relative overflow-hidden rounded-3xl border shadow-lg"
      style={{ borderColor: "var(--line-soft)", backgroundColor: bg }}
    >
      <div className="grid gap-6 p-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div
          className={`space-y-3 text-[var(--neutral-900)] transition-all duration-400 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {slide.tag && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.18em]">
              <Icon className="h-4 w-4" />
              {slide.tag}
            </span>
          )}
          <h3 className="text-[26px] leading-[34px] font-semibold md:text-[30px] md:leading-[38px]">{slide.title}</h3>
          <p className="text-[16px] leading-[24px] opacity-90">{slide.description}</p>
        </div>

        <div className="grid gap-3 text-[15px] leading-[22px] text-[var(--neutral-900)]">
          {items.map((item, idx) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setCurrent(idx)}
              className="group flex items-start gap-3 rounded-2xl border bg-white/70 px-4 py-3 text-left transition"
              style={{
                borderColor: idx === current ? "var(--brand-900)" : "rgba(3,1,0,0.08)",
                boxShadow: idx === current ? "0 10px 20px rgba(0,0,0,0.12)" : "none",
                transform: idx === current ? "translateY(-2px)" : "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (idx === current) return
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)"
              }}
              onMouseLeave={(e) => {
                if (idx === current) return
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <span
                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--brand-900)] shadow-sm transition"
                style={{
                  border: "1px solid rgba(3,1,0,0.08)",
                  backgroundColor: idx === current ? "var(--brand-900)" : "var(--neutral-100)",
                  color: idx === current ? "#fff" : "var(--brand-900)",
                }}
              >
                {(() => {
                  const ItemIcon = item.Icon || Icon
                  return <ItemIcon className="h-4 w-4" />
                })()}
              </span>
              <div className="space-y-1">
                <p className="font-semibold">{item.title}</p>
                <p className="opacity-80">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => setCurrent((current - 1 + items.length) % items.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--neutral-900)] shadow"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => setCurrent((current + 1) % items.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--neutral-900)] shadow"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
