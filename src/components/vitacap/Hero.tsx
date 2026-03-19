"use client"

import Image from "next/image"
import { Button } from "./Button"

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
      style={{ backgroundColor: "var(--neutral-100)" }}
    >
      <div
        className="ls-container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div className="space-y-5">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ backgroundColor: "var(--surface-gold)", color: "var(--neutral-900)" }}
          >
            {eyebrow}
          </span>
          <h1
            className="text-[34px] font-semibold leading-[38px] md:text-[46px] md:leading-[54px] xl:text-[56px] xl:leading-[64px]"
            style={{ color: "var(--neutral-900)", fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h1>
          <p
            className="text-[16px] leading-[24px] md:text-[18px] md:leading-[26px] text-[var(--neutral-900)]"
            style={{ maxWidth: "640px" }}
          >
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" onClick={() => { window.location.href = ctaHref }}>
              {ctaLabel}
            </Button>
            <Button variant="secondary" size="lg">
              Explorar beneficios
            </Button>
          </div>
          {support && (
            <p className="text-[14px] leading-[19px] text-[var(--neutral-900)] opacity-80">{support}</p>
          )}
        </div>

        <div className="relative overflow-hidden rounded-[28px] border bg-white/80" style={{ borderColor: "var(--line-soft)" }}>
          <div className="absolute inset-0 -z-10 blur-3xl" style={{ background: "radial-gradient(circle at 30% 40%, rgba(186,73,53,0.22), transparent 55%)" }} />
          <div className="flex items-center justify-center gap-4 p-6 md:gap-8">
            <div className="relative h-[220px] w-[180px] md:h-[280px] md:w-[220px] drop-shadow-xl">
              <Image
                src="/images/crescina-product.webp"
                alt="Botella Vitacap G"
                fill
                sizes="(max-width: 768px) 220px, 260px"
                className="object-contain"
                priority
              />
            </div>
            <div className="relative h-[220px] w-[180px] md:h-[280px] md:w-[220px] drop-shadow-xl">
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
        </div>
      </div>
    </section>
  )
}
