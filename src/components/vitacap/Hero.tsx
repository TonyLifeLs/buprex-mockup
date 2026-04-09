"use client"

import Image from "next/image"
import { Button } from "./Button"
import { vitacapFontAccent } from "./theme"

interface HeroProps {
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  support?: string
}

export function Hero({ eyebrow, title, subtitle, ctaLabel, ctaHref, support }: HeroProps) {
  return (
    <section
      id="vitacap"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--brand-900)" }}
    >
      {/* Subtle radial light for depth */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(241,223,0,0.08) 0%, transparent 60%)" }}
        aria-hidden
      />
      <div
        className="ls-container relative z-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div className="space-y-6">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.18em]"
            style={{ backgroundColor: "var(--brand-accent)", color: "var(--neutral-900)" }}
          >
            {eyebrow}
          </span>
          <h1
            className="text-[34px] font-bold leading-[38px] md:text-[48px] md:leading-[56px] xl:text-[58px] xl:leading-[66px]"
            style={{ color: "#fff", fontFamily: vitacapFontAccent }}
          >
            {title}
          </h1>
          <p
            className="text-[16px] leading-[26px] md:text-[18px] md:leading-[28px]"
            style={{ color: "rgba(255,255,255,0.85)", maxWidth: "580px" }}
          >
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" onClick={() => { window.location.href = ctaHref }}>
              {ctaLabel}
            </Button>
            <Button variant="ghost" size="lg">
              Explorar beneficios
            </Button>
          </div>
          {support && (
            <p className="text-[14px] leading-[19px]" style={{ color: "rgba(255,255,255,0.7)" }}>{support}</p>
          )}
        </div>

        <div
          className="relative overflow-hidden rounded-[32px] p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="relative h-[220px] w-[180px] md:h-[280px] md:w-[220px] drop-shadow-2xl">
              <Image
                src="/images/crescina-product.webp"
                alt="Botella Vitacap G"
                fill
                sizes="(max-width: 768px) 220px, 260px"
                className="object-contain"
                priority
              />
            </div>
            <div className="relative h-[220px] w-[180px] md:h-[280px] md:w-[220px] drop-shadow-2xl">
              <Image
                src="/images/fillerina-product.webp"
                alt="Suplemento Vitacap"
                fill
                sizes="(max-width: 768px) 220px, 260px"
                className="object-contain"
                priority
              />
            </div>
          </div>
          {/* Decorative yellow stripe */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[4px] rounded-b-[32px]"
            style={{ background: "linear-gradient(90deg, var(--brand-accent), var(--surface-gold))" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
